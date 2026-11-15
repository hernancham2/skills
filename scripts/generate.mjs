#!/usr/bin/env node
// Generates, from the existing skills:
//   - .claude-plugin/marketplace.json  (one plugin per phase)
//   - the catalog in README.md         (between the CATALOG markers)
// With --check it writes nothing and exits with code 1 if something is out of date.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { config, contextPaths, listSkills, readSkill, ROOT } from './lib.mjs';

const checkOnly = process.argv.includes('--check');
const { skills } = listSkills();

const byPhase = config.phases.map((phase) => ({
  phase,
  skills: skills
    .filter((s) => s.phase.id === phase.id)
    .map((s) => ({ ...s, data: readSkill(s)?.data ?? {} })),
}));

// --- .claude-plugin/marketplace.json ---------------------------------------
const marketplace = {
  name: config.marketplace.name,
  description: config.marketplace.description,
  version: config.marketplace.version,
  owner: { name: config.author.name },
  plugins: byPhase
    .filter((g) => g.skills.length)
    .map((g) => ({
      name: `${config.pluginPrefix}-${g.phase.id}`,
      description: g.phase.description,
      source: './',
      strict: false,
      skills: g.skills.map((s) => `./${s.relative}`),
    })),
};

// --- README catalog ---------------------------------------------------------
const START = '<!-- CATALOG:START -->';
const END = '<!-- CATALOG:END -->';
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();

const catalog = byPhase
  .map((g) => {
    const header = `### ${g.phase.title} (\`${g.phase.prefix}-\`) → \`${g.phase.primitive}\`\n\n${g.phase.description}.\n\n`;
    if (!g.skills.length) return `${header}_No skills yet._`;
    const paths = (value) => contextPaths(value).map((p) => `\`${p}\``).join('<br>') || '—';
    const rows = g.skills.map(
      (s) =>
        `| [\`${s.folder}\`](${s.relative}/SKILL.md) | ${cell(s.data.description)} | ${paths(s.data.metadata?.reads)} | ${paths(s.data.metadata?.writes)} | ${cell(s.data.metadata?.version)} |`,
    );
    return `${header}| Skill | Description | Reads | Writes | Version |\n| --- | --- | --- | --- | --- |\n${rows.join('\n')}`;
  })
  .join('\n\n');

// --- write / check ----------------------------------------------------------
const outOfDate = [];

function sync(relativePath, content) {
  const path = join(ROOT, relativePath);
  const current = existsSync(path) ? readFileSync(path, 'utf8').replace(/\r\n/g, '\n') : null;
  if (current === content) return;
  outOfDate.push(relativePath);
  if (!checkOnly) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
}

sync('.claude-plugin/marketplace.json', `${JSON.stringify(marketplace, null, 2)}\n`);

const readmePath = join(ROOT, 'README.md');
if (existsSync(readmePath)) {
  const readme = readFileSync(readmePath, 'utf8').replace(/\r\n/g, '\n');
  const a = readme.indexOf(START);
  const b = readme.indexOf(END);
  if (a === -1 || b === -1 || b < a) {
    console.log(`ERROR  README.md: the markers ${START} and ${END} are missing`);
    process.exit(1);
  }
  sync('README.md', `${readme.slice(0, a + START.length)}\n\n${catalog}\n\n${readme.slice(b)}`);
}

if (!outOfDate.length) {
  console.log('Manifests and catalog are up to date.');
} else if (checkOnly) {
  console.log(`ERROR  Out of date: ${outOfDate.join(', ')}. Run "npm run generate".`);
  process.exit(1);
} else {
  console.log(`Updated: ${outOfDate.join(', ')}`);
}
