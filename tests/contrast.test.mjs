import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const script = fileURLToPath(new URL('../skills/design/des-validate/scripts/contrast.mjs', import.meta.url));
const run = (...args) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8' });

test('black on white is 21:1 and passes', () => {
  const r = run('#000000', '#FFFFFF');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /21\.00 : 1/);
});

test('a low-contrast pair exits with 1', () => {
  assert.equal(run('#777777', '#888888').status, 1);
});

test('#RGB shorthand works and bad input exits with 2', () => {
  assert.equal(run('#000', '#fff').status, 0);
  assert.equal(run('#00', '#fff').status, 2);
  assert.equal(run('#000').status, 2);
});
