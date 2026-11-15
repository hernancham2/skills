#!/usr/bin/env node
// Generates, from the existing skills:
//   - .claude-plugin/marketplace.json  (one plugin per phase)
//   - the phase overview in README.md      (between the PHASES markers)
//   - the full catalog in docs/en/README.md (between the CATALOG markers)
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

// --- generated documentation blocks ----------------------------------------
const cell = (t) => String(t ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ').trim();
const withSkills = byPhase.filter((g) => g.skills.length);

// Full catalog (docs/en/README.md): one table per phase. Links are relative to that file.
const catalog = byPhase
  .map((g) => {
    const header = `### ${g.phase.title} (\`${g.phase.prefix}-\`) → \`${g.phase.primitive}\`\n\n${g.phase.description}.\n\n`;
    if (!g.skills.length) return `${header}_No skills yet._`;
    const paths = (value) => contextPaths(value).map((p) => `\`${p}\``).join('<br>') || '—';
    const rows = g.skills.map(
      (s) =>
        `| [\`${s.folder}\`](../../${s.relative}/SKILL.md) | ${cell(s.data.description)} | ${paths(s.data.metadata?.reads)} | ${paths(s.data.metadata?.writes)} | ${cell(s.data.metadata?.version)} |`,
    );
    return `${header}| Skill | Description | Reads | Writes | Version |\n| --- | --- | --- | --- | --- |\n${rows.join('\n')}`;
  })
  .join('\n\n');

// Compact phase overview (README.md): which file each phase decides and which skills it has.
const phaseRows = withSkills.map(
  (g) =>
    `| ${g.phase.title} | \`${g.phase.primitive}\` | ${g.skills.map((s) => `[\`${s.folder}\`](${s.relative}/SKILL.md)`).join(' · ')} |`,
);
const phases = `**${skills.length} skills** in **${withSkills.length} phases**.\n\n| Phase | Decides | Skills |\n| --- | --- | --- |\n${phaseRows.join('\n')}`;

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

// Replaces what is between two markers in a file; the rest of the file is hand-written.
function syncBlock(relativePath, name, content) {
  const START = `<!-- ${name}:START -->`;
  const END = `<!-- ${name}:END -->`;
  const path = join(ROOT, relativePath);
  if (!existsSync(path)) return;
  const text = readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
  const a = text.indexOf(START);
  const b = text.indexOf(END);
  if (a === -1 || b === -1 || b < a) {
    console.log(`ERROR  ${relativePath}: the markers ${START} and ${END} are missing`);
    process.exit(1);
  }
  sync(relativePath, `${text.slice(0, a + START.length)}\n\n${content}\n\n${text.slice(b)}`);
}

syncBlock('README.md', 'PHASES', phases);
syncBlock('docs/en/README.md', 'CATALOG', catalog);

if (!outOfDate.length) {
  console.log('Manifests and catalogs are up to date.');
} else if (checkOnly) {
  console.log(`ERROR  Out of date: ${outOfDate.join(', ')}. Run "npm run generate".`);
  process.exit(1);
} else {
  console.log(`Updated: ${outOfDate.join(', ')}`);
}
