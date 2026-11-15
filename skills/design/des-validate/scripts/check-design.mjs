#!/usr/bin/env node
// Checks the format of a DESIGN.md: YAML frontmatter with design tokens plus the eight
// standard sections. No dependencies.
//   node check-design.mjs DESIGN.md
// Exits with code 1 if there are errors, 2 if the file cannot be read.
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const HEADINGS = ['Overview', 'Colors', 'Typography', 'Layout', 'Elevation & Depth', 'Shapes', 'Components', "Do's and Don'ts"];
const HEX = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;
const DIMENSION = /^(?:0|-?\d+(?:\.\d+)?(?:px|rem|em|%))$/;
const REFERENCE = /^\{([a-z0-9-]+)\.([A-Za-z0-9-]+)\}$/;

/** Reads the subset of YAML a DESIGN.md uses: nested maps and scalars. */
export function parseFrontmatter(lines) {
  const root = {};
  const errors = [];
  const stack = [{ indent: -1, node: root }];
  lines.forEach((line, i) => {
    if (!line.trim() || /^\s*#/.test(line)) return;
    const m = line.match(/^(\s*)([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) {
      errors.push(`frontmatter line ${i + 1}: cannot be read ("${line.trim()}")`);
      return;
    }
    const indent = m[1].length;
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) stack.pop();
    const parent = stack[stack.length - 1].node;
    const [, , key, raw] = m;
    if (key in parent) errors.push(`frontmatter line ${i + 1}: the key "${key}" is repeated`);
    if (raw === '') {
      parent[key] = {};
      stack.push({ indent, node: parent[key] });
    } else if (raw.startsWith('#')) {
      errors.push(`frontmatter line ${i + 1}: "${key}" has an unquoted value starting with #; YAML reads it as a comment. Put it in quotes`);
      parent[key] = '';
    } else if (/^["']/.test(raw)) {
      const quote = raw[0];
      const end = raw.indexOf(quote, 1);
      parent[key] = end === -1 ? raw.slice(1) : raw.slice(1, end);
    } else {
      parent[key] = raw.replace(/\s+#.*$/, '').trim();
    }
  });
  return { tree: root, errors };
}

function luminance(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join('');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/** Returns { errors, warnings } for the text of a DESIGN.md. */
export function checkDesign(text) {
  const errors = [];
  const warnings = [];
  const clean = text.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  const m = clean.match(/^---\n([\s\S]*?)\n---[ \t]*(?:\n([\s\S]*))?$/);
  if (!m) return { errors: ['the file must start with a YAML frontmatter block between "---" lines'], warnings };

  const { tree, errors: parseErrors } = parseFrontmatter(m[1].split('\n'));
  errors.push(...parseErrors);
  const body = m[2] ?? '';

  // tokens
  const colors = tree.colors ?? {};
  if (!tree.colors) errors.push('missing the "colors" group in the frontmatter');
  if (!('primary' in colors)) errors.push('missing the "primary" color');
  for (const [name, value] of Object.entries(colors)) {
    if (typeof value === 'string' && !HEX.test(value)) errors.push(`colors.${name}: "${value}" is not a hexadecimal color (#RGB or #RRGGBB)`);
  }
  for (const group of ['rounded', 'spacing']) {
    for (const [name, value] of Object.entries(tree[group] ?? {})) {
      if (typeof value === 'string' && !DIMENSION.test(value)) errors.push(`${group}.${name}: "${value}" must carry a unit (px, rem, em or %)`);
    }
  }
  for (const [name, style] of Object.entries(tree.typography ?? {})) {
    if (typeof style !== 'object') continue;
    if (style.fontSize !== undefined && !DIMENSION.test(style.fontSize)) errors.push(`typography.${name}.fontSize: "${style.fontSize}" must carry a unit`);
    if (style.fontWeight !== undefined && !/^[1-9]00$/.test(style.fontWeight)) errors.push(`typography.${name}.fontWeight: "${style.fontWeight}" must be 100 to 900`);
  }

  // references and component contrast
  const used = new Set();
  const resolve = (value) => {
    const ref = typeof value === 'string' && value.match(REFERENCE);
    if (!ref) return null;
    const [, group, token] = ref;
    used.add(`${group}.${token}`);
    return tree[group]?.[token] ?? undefined;
  };
  for (const [component, props] of Object.entries(tree.components ?? {})) {
    if (typeof props !== 'object') continue;
    for (const [prop, value] of Object.entries(props)) {
      if (resolve(value) === undefined) errors.push(`components.${component}.${prop}: the reference ${value} points to a token that does not exist`);
    }
    const bg = resolve(props.backgroundColor) ?? props.backgroundColor;
    const fg = resolve(props.textColor) ?? props.textColor;
    if (HEX.test(bg ?? '') && HEX.test(fg ?? '')) {
      const ratio = contrast(fg, bg);
      if (ratio < 4.5) warnings.push(`components.${component}: text ${fg} on ${bg} has contrast ${ratio.toFixed(2)}:1, below 4.5:1`);
    }
  }
  for (const name of Object.keys(colors)) {
    if (!used.has(`colors.${name}`)) warnings.push(`colors.${name} is not used by any component`);
  }

  // sections: the eight standard headings, exactly as written and in this order, before any custom section
  const headings = [...body.replace(/```[\s\S]*?```/g, '').matchAll(/^## (.+?)\s*$/gm)].map((h) => h[1]);
  for (const expected of HEADINGS) {
    if (!headings.includes(expected)) errors.push(`missing the section "## ${expected}"`);
  }
  const standard = headings.filter((h) => HEADINGS.includes(h));
  if (standard.join('|') !== HEADINGS.filter((h) => standard.includes(h)).join('|')) {
    errors.push(`the standard sections are out of order; the order is: ${HEADINGS.join(', ')}`);
  }
  const firstCustom = headings.findIndex((h) => !HEADINGS.includes(h));
  const lastStandard = Math.max(...standard.map((h) => headings.indexOf(h)), -1);
  if (firstCustom !== -1 && firstCustom < lastStandard) warnings.push('a custom section appears before the last standard one; custom sections go after them');

  return { errors, warnings };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2];
  if (!file) {
    console.error('Usage: node check-design.mjs <path to DESIGN.md>');
    process.exit(2);
  }
  let text;
  try {
    text = readFileSync(file, 'utf8');
  } catch (error) {
    console.error(`Cannot read ${file}: ${error.message}`);
    process.exit(2);
  }
  const { errors, warnings } = checkDesign(text);
  for (const w of warnings) console.log(`WARN   ${w}`);
  for (const e of errors) console.log(`ERROR  ${e}`);
  console.log(`\n${file}: ${errors.length} error(s), ${warnings.length} warning(s).`);
  process.exit(errors.length ? 1 : 0);
}
