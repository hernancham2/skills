// Helpers shared by the repository scripts. No external dependencies.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const SKILLS_DIR = join(ROOT, 'skills');
export const config = JSON.parse(readFileSync(join(ROOT, 'skills.config.json'), 'utf8'));

export const NAME_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** Project-context files that skills may read or write (see docs/context.md). */
export const PRIMITIVES = new Set([config.context.index, ...config.phases.map((p) => p.primitive).filter(Boolean)]);

/** Turns "A.md, docs/x.md" into ["A.md", "docs/x.md"]. */
export const contextPaths = (value) =>
  String(value ?? '').split(',').map((p) => p.trim()).filter(Boolean);

/** Finds a phase by id or by prefix. */
export function findPhase(text) {
  return config.phases.find((p) => p.id === text || p.prefix === text);
}

const subdirectories = (path) =>
  existsSync(path)
    ? readdirSync(path).filter((n) => statSync(join(path, n)).isDirectory()).sort()
    : [];

/**
 * Walks skills/<phase>/<skill>/ and returns the skills found plus any
 * structure problems (misplaced folders).
 */
export function listSkills() {
  const skills = [];
  const problems = [];
  for (const phaseFolder of subdirectories(SKILLS_DIR)) {
    const phase = config.phases.find((p) => p.id === phaseFolder);
    if (!phase) {
      problems.push(`skills/${phaseFolder}: folder does not match any phase in skills.config.json`);
      continue;
    }
    if (existsSync(join(SKILLS_DIR, phaseFolder, 'SKILL.md'))) {
      problems.push(`skills/${phaseFolder}/SKILL.md: a phase folder cannot be a skill; move it to skills/${phaseFolder}/<name>/`);
    }
    for (const folder of subdirectories(join(SKILLS_DIR, phaseFolder))) {
      const path = join(SKILLS_DIR, phaseFolder, folder);
      const relative = `skills/${phaseFolder}/${folder}`;
      if (!existsSync(join(path, 'SKILL.md'))) {
        problems.push(`${relative}: missing SKILL.md`);
        continue;
      }
      skills.push({ phase, folder, path, relative });
    }
  }
  return { skills, problems };
}

/**
 * Reads the YAML frontmatter of a SKILL.md. Supports the subset the standard
 * uses: scalars, block scalars (> and |) and one-level maps (metadata).
 * Returns null when there is no frontmatter.
 */
export function parseSkill(text) {
  const clean = text.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = clean.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n([\s\S]*))?$/);
  if (!m) return null;

  const lines = m[1].split('\n');
  const data = {};
  const warnings = [];
  const isContinuation = (l) => l.trim() === '' || /^\s/.test(l);

  const scalar = (raw, key) => {
    const v = raw.trim();
    if (v.length >= 2 && v.startsWith('"') && v.endsWith('"')) {
      try {
        return JSON.parse(v);
      } catch {
        warnings.push(`"${key}": double-quoted value has an invalid escape`);
        return v.slice(1, -1);
      }
    }
    if (v.length >= 2 && v.startsWith("'") && v.endsWith("'")) return v.slice(1, -1).replace(/''/g, "'");
    if (/: | #/.test(v) || /^[[\]{}&*!|>%@`"']/.test(v)) {
      warnings.push(`"${key}": the value contains YAML special characters; wrap it in double quotes`);
    } else if (/^(-?\d+(\.\d+)?|true|false|yes|no|null|~)$/i.test(v)) {
      warnings.push(`"${key}": quote it so it is read as text ("${v}")`);
    }
    return v;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) {
      i++;
      continue;
    }
    const field = line.match(/^([A-Za-z0-9_-]+):(.*)$/);
    if (!field) {
      warnings.push(`unrecognized frontmatter line: "${line}"`);
      i++;
      continue;
    }
    const key = field[1];
    const rest = field[2].trim();
    i++;
    if (/^[>|][+-]?$/.test(rest)) {
      const parts = [];
      while (i < lines.length && isContinuation(lines[i])) parts.push(lines[i++].trim());
      data[key] = rest[0] === '>' ? parts.join(' ').replace(/\s+/g, ' ').trim() : parts.join('\n').trim();
    } else if (rest === '') {
      const map = {};
      while (i < lines.length && isContinuation(lines[i])) {
        const sub = lines[i++].trim();
        if (!sub || sub.startsWith('#')) continue;
        const sm = sub.match(/^([^:\s]+):(.*)$/);
        if (sm) map[sm[1]] = scalar(sm[2], `${key}.${sm[1]}`);
        else warnings.push(`"${key}": unrecognized entry "${sub}"`);
      }
      data[key] = map;
    } else {
      data[key] = scalar(rest, key);
    }
  }
  return { data, body: m[2] ?? '', warnings };
}

export function readSkill(skill) {
  return parseSkill(readFileSync(join(skill.path, 'SKILL.md'), 'utf8'));
}
