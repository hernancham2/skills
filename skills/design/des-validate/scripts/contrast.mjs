#!/usr/bin/env node
// Calculates the WCAG 2.x contrast ratio between pairs of colors.
//   node contrast.mjs <color> <background> [<color> <background> ...]
//   node contrast.mjs "#1F2937" "#FFFFFF" "#6B7280" "#F9FAFB"
// Exits with code 1 if any pair is below 4.5 (AA for normal text),
// and with code 2 if the arguments are invalid.

function toRgb(text) {
  let hex = text.trim().replace(/^#/, '');
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = [...hex].map((c) => c + c).join('');
  if (!/^[0-9a-f]{6}$/i.test(hex)) return null;
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
}

function luminance(rgb) {
  const [r, g, b] = rgb.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const args = process.argv.slice(2);
if (args.length === 0 || args.length % 2 !== 0) {
  console.error('Usage: node contrast.mjs <color> <background> [<color> <background> ...]\nColors go in pairs, in #RGB or #RRGGBB format.');
  process.exit(2);
}

const yes = (ok) => (ok ? 'yes' : 'NO');
let failures = 0;

console.log('| Color | Background | Contrast | AA text (4.5) | AA large text and components (3) | AAA text (7) |');
console.log('| :--- | :--- | :--- | :--- | :--- | :--- |');
for (let i = 0; i < args.length; i += 2) {
  const [a, b] = [toRgb(args[i]), toRgb(args[i + 1])];
  if (!a || !b) {
    console.error(`Invalid color in the pair "${args[i]}" / "${args[i + 1]}". Use #RGB or #RRGGBB.`);
    process.exit(2);
  }
  // Truncated to two decimals: rounding up could pass a 4.499 as 4.5.
  const value = Math.floor(contrast(a, b) * 100) / 100;
  if (value < 4.5) failures++;
  console.log(`| ${args[i]} | ${args[i + 1]} | ${value.toFixed(2)} : 1 | ${yes(value >= 4.5)} | ${yes(value >= 3)} | ${yes(value >= 7)} |`);
}

console.log(`\n${args.length / 2} pair(s) evaluated; ${failures} below AA for normal text.`);
process.exit(failures ? 1 : 0);
