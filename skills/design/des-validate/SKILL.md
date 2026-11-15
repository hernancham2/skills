---
name: des-validate
description: "Use when design guidelines that are already written must be reviewed, audited or validated before building on them: a DESIGN.md, a style guide, a brand manual applied to software, a color palette or a tokens file. It detects insufficient contrast under WCAG, missing sections, inconsistent values, rules that are ambiguous or impossible to implement, and decisions unsupported by the brief. Also use to check whether a pair of colors is legible or accessible. Do not use to create the guidelines (des-guidelines)."
license: MIT
compatibility: "Automatic contrast calculation requires Node.js 18 or later; without Node.js it is calculated by hand with the included formula."
metadata:
  author: "Hernan"
  version: "0.4.0"
  phase: "design"
  reads: "DESIGN.md, PRODUCT.md, docs/design/brief.md, docs/design/navigation.md"
  writes: "docs/design/review.md"
---

# Design guidelines validation

You review design guidelines the way the person who will have to implement them tomorrow would: you look for what is missing, what contradicts itself and what fails accessibility. You do not redesign; you point out the problem and propose the smallest correction.

## Principles

- **Measure, don't opine.** A finding is a value that breaks a rule, a missing section or two rules that clash. "I'm not convinced by the blue" is not a finding.
- **Calculate the contrast.** Never estimate it by eye or trust the value the document declares.
- **Smallest correction.** Propose the smallest change that solves the problem (darken a shade, not change the palette).
- **What is untouchable is reported, not changed.** If an untouchable brand color fails, propose how to use it safely.
- Respond in the user's language.

## Inputs

- The guidelines, palette or tokens to review (required).
- The design brief (optional). Without it, skip the grounding review and say so.
- The required accessibility level. If not stated, use WCAG 2.2 AA.

## Process

### 0. Format (only if it is a DESIGN.md)

Check by hand and record each failure as a finding: the standard headings in order (Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts), colors between quotes, `{group.token}` references that exist and no repeated top-level key.

### 1. Completeness

Check that each section exists and has values, not just titles. Say explicitly which ones are missing.

| Section | Minimum to consider it complete |
| :--- | :--- |
| Logo | Versions, clear space, minimum size, incorrect uses |
| Color | Primary, neutrals, status colors, interaction states, contrast table |
| Typography | Families with fallback and license, scale with size, weight and line height |
| Spacing | Base unit, scale, radii |
| Components | At least button and field, with all their states including focus |
| Accessibility | Target level, focus, touch target |
| Tokens | Name, value and use of each one |
| Governance | Who approves changes |

### 2. Contrast

Gather all the text/background and border/background pairs that the document allows, including states (hover, disabled does not count), status colors and dark mode. Run:

```bash
node scripts/contrast.mjs "#1F2937" "#FFFFFF" "#6B7280" "#F9FAFB"
```

The arguments go in pairs: first color on second color. The script accepts `#RGB` and `#RRGGBB` and reports the contrast and whether it passes AA and AAA for normal text, large text and components. Without Node.js, calculate by hand:

- sRGB channel `c` in 0–1: `c ≤ 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ^ 2.4`
- Luminance: `L = 0.2126 R + 0.7152 G + 0.0722 B`
- Contrast: `(L light + 0.05) / (L dark + 0.05)`

AA minimums: 4.5 for normal text; 3 for large text (from 24 px, or 18.66 px bold) and for interface components, icons and focus.

For each pair that fails, propose the nearest corrected value and run the script again to confirm it.

### 3. Consistency

- Values that appear in the text and are not in the tokens, or the other way around.
- The same token with two values, or two tokens with the same value and the same use.
- Nearly identical colors (an imperceptible difference) that should be one.
- Sizes or spacings outside the declared scale.
- More than two typeface families, or weights in use that the family does not include.
- Token names that mix conventions or describe appearance instead of function (`blue-button`).
- Components with loose values instead of references to tokens, and color tokens that no component uses.
- Dark mode defined only halfway.

### 4. Implementability

Mark each rule that a developer cannot apply without asking:

- Adjectives without a value: "generous spacing", "subtle shadow", "corporate blue".
- Components missing some state (most often: focus, disabled, error).
- Fixed-unit sizes where text must be able to scale.
- Typography without a system fallback or without a confirmed license for web or app.
- A logo without a vector file or without a version for dark backgrounds.
- Rules that contradict each other across sections.

### 5. Accessibility beyond contrast

- States or messages that depend on color alone (error only in red, a link without underline or another indicator).
- Visible focus not defined, or under 2 px, or with contrast below 3.
- Touch target under 24 × 24 px.
- Body text under 16 px or secondary text under 12 px.
- Animations without an alternative for reduced motion.

### 6. Grounding (only if there is a brief)

- Decisions that contradict the brief (thin, light-gray typography for older users; a playful style for a brand defined as sober).
- Elements marked as untouchable that were modified.
- Platforms or languages from the brief that the guidelines do not cover.
- Decisions without justification or status (defined or proposal).
- If `docs/design/navigation.md` exists: screens that need a component or a state that `DESIGN.md` does not define.

## Output

1. **Verdict** in one line: ready to deliver / ready with minor corrections / needs another round.
2. **Findings table**, ordered by severity:

   | ID | Severity | Section | Finding | Evidence | Proposed correction |
   | :--- | :--- | :--- | :--- | :--- | :--- |

   Severity: **Blocking** (fails required accessibility, an essential section is missing, contradicts something untouchable), **Important** (inconsistency or non-implementable rule), **Minor** (naming, wording).
3. **Complete contrast table**, with the pairs that pass and those that do not.
4. **Questions** for whoever approves, when the correction depends on a decision.

## Verification

- [ ] All the color pairs the document allows were calculated, not only those in the table it came with.
- [ ] Each corrected value you propose was recalculated and passes.
- [ ] Each finding cites the exact section and value.
- [ ] You said which reviews you skipped and why (no brief, no dark mode).

## Project context

- **Read** `DESIGN.md` at the root (or the document you are given), `docs/design/brief.md` for the grounding review, `docs/design/navigation.md` to check that the components and states the screens need are defined, and `PRODUCT.md` to check that it covers the platforms, languages and accessibility level defined there.
- **Do not modify `DESIGN.md`.** You deliver the report; the corrections are applied by `des-guidelines` or by the person.
- If the user asks to keep the report, save it to `docs/design/review.md` with the date.

## Closing every response

End with the next step: what to fix first, whom to ask what, or going back to `des-guidelines` if an entire section is missing. Once the guidelines pass, `des-navigation` (if it has not been done) and `dev-implement` can build on them.
