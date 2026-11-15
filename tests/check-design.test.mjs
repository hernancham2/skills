import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { checkDesign } from '../skills/design/des-validate/scripts/check-design.mjs';

const template = readFileSync(new URL('../skills/design/des-guidelines/assets/DESIGN.template.md', import.meta.url), 'utf8');
const errorsOf = (text) => checkDesign(text).errors.join('\n');

test('the template shipped with des-guidelines has no errors', () => {
  assert.deepEqual(checkDesign(template).errors, []);
});

test('detects an unquoted color, a missing primary and a missing unit', () => {
  const broken = template
    .replace('primary: "#000000"', 'primary-x: "#000000"')
    .replace('on-primary: "#FFFFFF"', 'on-primary: #FFFFFF')
    .replace('sm: 4px', 'sm: 4');
  const errors = errorsOf(broken);
  assert.match(errors, /missing the "primary" color/);
  assert.match(errors, /unquoted value starting with #/);
  assert.match(errors, /rounded\.sm/);
});

test('detects a reference to a token that does not exist', () => {
  assert.match(errorsOf(template.replace('{colors.surface}', '{colors.nope}')), /does not exist/);
});

test('detects a repeated key', () => {
  assert.match(errorsOf(template.replace('  surface: "#FFFFFF"', '  surface: "#FFFFFF"\n  surface: "#EEEEEE"')), /"surface" is repeated/);
});

test('detects a missing section and a wrong order', () => {
  assert.match(errorsOf(template.replace('## Shapes', '## Forms')), /missing the section "## Shapes"/);
  const swapped = template.replace('## Colors', '## TMP').replace('## Typography', '## Colors').replace('## TMP', '## Typography');
  assert.match(errorsOf(swapped), /out of order/);
});

test('warns when a component text/background pair is below 4.5:1', () => {
  const poor = template.replace('on-primary: "#FFFFFF"', 'on-primary: "#EEEEEE"').replace('primary: "#000000"', 'primary: "#FFFFFF"');
  assert.ok(checkDesign(poor).warnings.some((w) => w.includes('below 4.5:1')));
});

test('requires a frontmatter block', () => {
  assert.match(errorsOf('# Just a title'), /frontmatter/);
});
