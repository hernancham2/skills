import assert from 'node:assert/strict';
import { test } from 'node:test';
import { contextPaths, findPhase, parseSkill } from '../scripts/lib.mjs';

const SKILL = `---
name: req-demo
description: >
  Use when a demo is needed.
  Second line.
metadata:
  version: "1.0.0"
  reads: "PRODUCT.md, docs/x.md"
---

# Body
`;

test('parseSkill reads scalars, folded blocks and one-level maps', () => {
  const { data, body, warnings } = parseSkill(SKILL);
  assert.equal(data.name, 'req-demo');
  assert.equal(data.description, 'Use when a demo is needed. Second line.');
  assert.equal(data.metadata.version, '1.0.0');
  assert.match(body, /# Body/);
  assert.deepEqual(warnings, []);
});

test('parseSkill warns about unquoted numbers and returns null without frontmatter', () => {
  const { warnings } = parseSkill('---\nname: x\nmetadata:\n  version: 1.0\n---\nbody');
  assert.ok(warnings.some((w) => w.includes('quote it')));
  assert.equal(parseSkill('no frontmatter'), null);
});

test('contextPaths splits and trims a comma-separated list', () => {
  assert.deepEqual(contextPaths('A.md, docs/x.md ,'), ['A.md', 'docs/x.md']);
  assert.deepEqual(contextPaths(undefined), []);
});

test('findPhase accepts an id or a prefix', () => {
  assert.equal(findPhase('requirements').prefix, 'req');
  assert.equal(findPhase('req').id, 'requirements');
  assert.equal(findPhase('nope'), undefined);
});
