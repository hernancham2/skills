#!/usr/bin/env node
// Validates every skill against the Agent Skills specification
// (https://agentskills.io/specification) and this repository's standard
// (docs/standard.md). Exits with code 1 if there are errors.
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { config, contextPaths, listSkills, NAME_REGEX, PRIMITIVES, readSkill } from './lib.mjs';

const ALLOWED_FIELDS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools']);
const MAX_BODY_LINES = 500;

const { skills, problems } = listSkills();
const errors = [...problems];
const warnings = [];
const seenNames = new Map();

for (const skill of skills) {
  const error = (msg) => errors.push(`${skill.relative}: ${msg}`);
  const warn = (msg) => warnings.push(`${skill.relative}: ${msg}`);

  const parsed = readSkill(skill);
  if (!parsed) {
    error('SKILL.md must start with a YAML frontmatter block between "---" lines');
    continue;
  }
  const { data, body } = parsed;
  parsed.warnings.forEach(error);

  // name
  const name = data.name;
  if (typeof name !== 'string' || !name) {
    error('missing "name" field');
  } else {
    if (!NAME_REGEX.test(name)) error(`"name" only allows lowercase letters, numbers and single hyphens (got: "${name}")`);
    if (name.length > 64) error(`"name" is longer than 64 characters (${name.length})`);
    if (name !== skill.folder) error(`"name" (${name}) must match the folder name (${skill.folder})`);
    if (!name.startsWith(`${skill.phase.prefix}-`)) error(`"name" must start with the phase prefix: "${skill.phase.prefix}-"`);
    if (/claude|anthropic/.test(name)) error('"name" cannot contain "claude" or "anthropic" (reserved words)');
    if (seenNames.has(name)) error(`duplicate "name"; already used in ${seenNames.get(name)}`);
    else seenNames.set(name, skill.relative);
  }

  // description
  const description = data.description;
  if (typeof description !== 'string' || !description.trim()) {
    error('missing "description" field');
  } else {
    if (description.length > 1024) error(`"description" is longer than 1024 characters (${description.length})`);
    if (/[<>]/.test(description)) error('"description" cannot contain the characters < or >');
    if (description.length < 60) warn('"description" is very short; say what it does and when to use it');
    if (!/\buse\b/i.test(description)) warn('"description" should say when to activate the skill ("Use when ...")');
  }

  // optional fields
  if (data.compatibility !== undefined && String(data.compatibility).length > 500) {
    error('"compatibility" is longer than 500 characters');
  }
  for (const key of Object.keys(data)) {
    if (!ALLOWED_FIELDS.has(key)) warn(`field "${key}" is outside the specification; it may not be portable across agents`);
  }

  // repository metadata
  const meta = data.metadata;
  if (!meta || typeof meta !== 'object') {
    error('missing "metadata" (author, version, phase)');
  } else {
    if (meta.phase !== skill.phase.id) error(`"metadata.phase" must be "${skill.phase.id}" (got: "${meta.phase ?? ''}")`);
    if (!/^\d+\.\d+\.\d+$/.test(meta.version ?? '')) error('"metadata.version" must be a quoted semver, e.g. "0.1.0"');
    if (!meta.author) warn('missing "metadata.author"');

    // project context (docs/context.md)
    for (const field of ['reads', 'writes']) {
      for (const path of contextPaths(meta[field])) {
        const isPrimitive = PRIMITIVES.has(path);
        if (!isPrimitive && !path.startsWith(`${config.context.workDir}/`)) {
          error(`"metadata.${field}": "${path}" is not a known primitive and is not under ${config.context.workDir}/`);
        } else if (field === 'writes' && isPrimitive && path !== skill.phase.primitive && path !== config.context.index) {
          error(`"metadata.writes": ${path} belongs to another phase; this skill may only write ${skill.phase.primitive}`);
        }
      }
    }
    if ((meta.reads || meta.writes) && !/^## Project context/m.test(body)) {
      warn('declares "reads" or "writes" but has no "## Project context" section');
    }
  }

  // body
  if (!body.trim()) error('the SKILL.md body is empty');
  const lineCount = body.split('\n').length;
  if (lineCount > MAX_BODY_LINES) {
    warn(`the body has ${lineCount} lines; move detail to references/ (recommended maximum: ${MAX_BODY_LINES})`);
  }
  // Only template markers ("TODO:" or a "TODO" value); a skill may talk about TODO comments.
  if (/TODO:|"TODO"|\{\{\w+\}\}/.test(`${JSON.stringify(data)}\n${body}`)) {
    error('template markers were left unfilled (TODO: or {{...}})');
  }

  // relative links
  for (const [, target] of body.matchAll(/\]\(([^)\s]+)\)/g)) {
    if (/^(https?:|mailto:|#)/.test(target)) continue;
    const filePath = target.split('#')[0];
    if (filePath.includes('..')) error(`the link "${target}" leaves the skill folder; a skill must be self-contained`);
    else if (!existsSync(join(skill.path, filePath))) error(`the link "${target}" points to a file that does not exist`);
  }
}

// --- cross-skill checks -----------------------------------------------------
const prefixes = config.phases.map((p) => p.prefix).join('|');
const mentionRegex = new RegExp('`((?:' + prefixes + ')-[a-z0-9]+(?:-[a-z0-9]+)*)`', 'g');
const parsedSkills = skills.map((s) => ({ skill: s, parsed: readSkill(s) })).filter((x) => x.parsed);
const written = parsedSkills.flatMap((x) => contextPaths(x.parsed.data.metadata?.writes));

for (const { skill, parsed } of parsedSkills) {
  // every skill mentioned in the body must exist
  const mentioned = new Set([...parsed.body.matchAll(mentionRegex)].map((m) => m[1]));
  for (const name of mentioned) {
    if (!seenNames.has(name)) errors.push(`${skill.relative}: mentions the skill \`${name}\`, which does not exist`);
  }
  // everything a skill reads must be produced by some skill
  for (const path of contextPaths(parsed.data.metadata?.reads)) {
    const someoneWritesIt = written.some((w) => w === path || path.startsWith(w) || w.startsWith(path));
    if (!someoneWritesIt) warnings.push(`${skill.relative}: reads ${path}, which no skill writes`);
  }
}

for (const phase of config.phases) {
  if (phase.primitive && !written.includes(phase.primitive) && skills.some((s) => s.phase.id === phase.id)) {
    warnings.push(`phase ${phase.id}: no skill writes its primitive ${phase.primitive}`);
  }
}

// Everything a skill writes should be read by some skill; otherwise the file is a dead end
// (this is how the validate -> define feedback loop was found to be open).
const allReads = parsedSkills.flatMap((x) => contextPaths(x.parsed.data.metadata?.reads));
for (const path of new Set(written)) {
  const someoneReadsIt = allReads.some((r) => r === path || r.startsWith(path) || path.startsWith(r));
  if (!someoneReadsIt) warnings.push(`${path} is written by a skill but read by none`);
}

// File names mentioned in skill bodies must exist in the context model, so that renaming a
// primitive or a work file in skills.config.json or in a skill cannot leave stale text behind.
const NOT_PRIMITIVES = new Set(['README.md', 'SKILL.md', 'LICENSE.md', 'CLAUDE.md', 'GEMINI.md']);
const normalize = (p) => p.replace(/\/+$/, '');
for (const { skill, parsed } of parsedSkills) {
  for (const [, file] of parsed.body.matchAll(/\b([A-Z]{3,}\.md)\b/g)) {
    if (!PRIMITIVES.has(file) && !NOT_PRIMITIVES.has(file)) errors.push(`${skill.relative}: mentions ${file}, which is not a known primitive`);
  }
  for (const [path] of parsed.body.matchAll(/\bdocs\/[a-z][a-z0-9_\-/.]*[a-z0-9/]/g)) {
    const p = normalize(path);
    const owned = written.some((w) => normalize(w) === p || normalize(w).startsWith(`${p}/`) || p.startsWith(`${normalize(w)}/`));
    if (!owned) warnings.push(`${skill.relative}: mentions ${path}, which no skill writes`);
  }
}

for (const w of warnings) console.log(`WARN   ${w}`);
for (const e of errors) console.log(`ERROR  ${e}`);
console.log(`\n${skills.length} skill(s) checked: ${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
