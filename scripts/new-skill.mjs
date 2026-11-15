#!/usr/bin/env node
// Creates a new skill from template/SKILL.template.md.
//   npm run new -- <phase|prefix> <name>
//   npm run new -- req elicit   ->  skills/requirements/req-elicit/SKILL.md
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { config, findPhase, NAME_REGEX, ROOT, SKILLS_DIR } from './lib.mjs';

const [phaseArg, nameArg] = process.argv.slice(2);
const availablePhases = config.phases.map((p) => `  ${(p.prefix || '-').padEnd(5)} ${p.id}`).join('\n');

function fail(message) {
  console.error(`${message}\n\nUsage: npm run new -- <phase|prefix> <name>\n\nAvailable phases:\n${availablePhases}`);
  process.exit(1);
}

if (!phaseArg || !nameArg) fail('Missing arguments.');
const phase = findPhase(phaseArg);
if (!phase) fail(`Unknown phase: "${phaseArg}".`);

const base = phase.prefix && nameArg.startsWith(`${phase.prefix}-`) ? nameArg.slice(phase.prefix.length + 1) : nameArg;
const name = phase.prefix ? `${phase.prefix}-${base}` : base;
if (!NAME_REGEX.test(name) || name.length > 64) {
  fail(`Invalid name: "${name}". Use lowercase letters, numbers and single hyphens (64 characters max).`);
}

const target = join(SKILLS_DIR, phase.id, name);
if (existsSync(target)) fail(`skills/${phase.id}/${name} already exists.`);

const title = base.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase());
const values = { name, title, phase: phase.id, author: config.author.name, license: config.license };
const content = readFileSync(join(ROOT, 'template', 'SKILL.template.md'), 'utf8').replace(
  /\{\{(\w+)\}\}/g,
  (_, key) => values[key] ?? `{{${key}}}`,
);

mkdirSync(target, { recursive: true });
writeFileSync(join(target, 'SKILL.md'), content);

console.log(`Created skills/${phase.id}/${name}/SKILL.md

Next steps:
  1. Fill in the TODOs (start with "description").
  2. npm run validate
  3. npm run generate`);
