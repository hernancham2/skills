---
name: des-guidelines
description: "Use when the design guidelines of a software project must be defined or completed and saved in DESIGN.md: color palette, type scale, spacing, shapes, components and their states, logo usage rules, iconography, motion, accessibility, voice and design tokens. Applies when a style guide, a visual identity manual for software, an initial design system or a DESIGN.md is requested, from a brief or from an existing brand. Do not use to gather the starting information (des-discover) or to review guidelines that are already written (des-validate)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.4.0"
  phase: "design"
  reads: "PRODUCT.md, docs/design/brief.md, docs/design/review.md"
  writes: "DESIGN.md"
---

# Design guidelines

You turn a design brief into `DESIGN.md`: the file at the project root that people and agents read before building any interface. It holds concrete rules, exact values and tokens that tools can read.

## Principles

- **Every decision has a reason.** Each choice is justified with a piece of data from the brief (audience, personality, constraint). If there is no data, it is a *proposal* and is marked as such.
- **Values, not adjectives.** "Corporate blue" is not a guideline; `primary: "#1D4ED8"` with its use is.
- **Fewer options, more consistency.** Two typeface families at most, a short scale, one accent color. Every extra option is a future inconsistency.
- **Accessibility is not negotiable.** No color or size pair goes in unless it meets WCAG 2.2 AA. Calculate the contrast; do not eyeball it.
- **What is untouchable is respected.** What the brief marks as untouchable is documented as is. If it fails accessibility, do not change it: define how to use it safely (only in large titles, only as a background) and report it.
- **You do not design the logo.** You document its use. If it does not exist, you deliver the brief for whoever will design it.
- Respond in the user's language.

## Choose the mode based on what you are given

| You are given | Mode |
| :--- | :--- |
| A complete or nearly complete design brief | A. Full guidelines |
| An existing brand (manual, site, files) without guidelines for software | B. Formalize what exists |
| A request for just one part (palette, typography, components) | C. A single section |
| Only an idea, no brief | Use `des-discover` first |

If the audience, platforms or personality attributes are missing, look for them in `PRODUCT.md` and in the brief; if they are not there, ask for them in one single question. If the user wants to move on anyway, continue and mark as *proposal* everything that depends on them.

Choose the scope based on the project and say so at the start:

- **Essential** (small project or first version): tokens, Overview, Colors, Typography, Layout, Components (button and field) and Accessibility.
- **Full**: all the sections of the template.

## The DESIGN.md format

`DESIGN.md` has a fixed structure defined by this repository: tokens go in the YAML frontmatter and the explanation in prose below. Always start from [assets/DESIGN.template.md](assets/DESIGN.template.md).

| Part | Content |
| :--- | :--- |
| Frontmatter | `colors`, `typography`, `rounded`, `spacing`, `components` |
| `## Overview` | Visual character and design principles |
| `## Colors` | Role of each color, contrast table, dark mode |
| `## Typography` | Families, license, usage rules |
| `## Layout` | Grid, breakpoints |
| `## Elevation & Depth` | Elevation levels |
| `## Shapes` | Radii and what they express |
| `## Components` | Variants and states of each component |
| `## Do's and Don'ts` | Correct and incorrect uses |
| Custom sections | Logo, Iconography and imagery, Motion, Accessibility, Voice, Pending decisions, Source |

Format rules that are not obvious:

- The eight standard headings go **exactly as written and in that order**, so that every `DESIGN.md` is read the same way by people, agents and `des-validate`. Custom sections go after them.
- Token names are lowercase with hyphens (`primary`, `on-surface`), so they map unchanged to CSS custom properties, the Tailwind theme or design-token JSON.
- Each top-level YAML key appears only once in the whole file.
- A token is referenced between braces and quotes: `"{colors.primary}"`. A reference to a token that does not exist is an error.
- Colors go in hexadecimal between quotes (`"#1D4ED8"`); without quotes, YAML reads `#` as a comment and the value ends up empty.
- Dimensions carry a unit (`px`, `rem`, `em`).
- Define a `primary` color: every other color role is described relative to it.
- Each state of a component is its own entry: `button-primary`, `button-primary-hover`.

## A. Full guidelines

The decision rules for each topic are in [references/criteria.md](references/criteria.md); read them before defining color, typography or spacing.

1. Write the principles in Overview. Everything else is justified against them.
2. Define color and typography in the frontmatter. Calculate each text/background pair with the formula in [references/criteria.md](references/criteria.md) and fill the contrast table with the resulting number.
3. Define spacing and shapes and, with those bases, the components with all their states.
4. Complete the custom sections: logo, iconography, motion, accessibility and voice.
5. List under "Pending decisions" everything marked as *proposal*, with who approves it.
6. Check the file against the format rules above, one by one: headings in order, quoted colors, references that resolve, units on dimensions, no repeated top-level key. Fix what fails and check again. Then recommend running `des-validate` for an independent review, and say which checks you could not run.

## B. Formalize what exists

1. Extract the real values from the files or from the current product: colors, families, sizes, spacing. Cite where each one comes from.
2. Group duplicates (three nearly identical blues) and propose which one stays, without deciding on your own.
3. Mark what the brand manual does not cover for software: interaction states, status colors, neutrals, on-screen typography, dark mode.
4. Fill in the template with what exists as *defined* and what you add as *proposal*.

## C. A single section

Modify only the requested tokens and section, and also deliver:

- the data from the brief that you used and the data you assumed;
- the tokens that change and the components that reference them;
- the neighboring sections it affects (changing `primary` affects states, links, focus and the contrast table).

## Format of decisions

In the prose, each non-obvious decision is written like this, so that it can be discussed and approved:

> **Decision:** `primary` is `#1D4ED8`.
> **Because:** the brief asks for "trustworthy, but not cold" and the competitors use green.
> **Status:** proposal, pending approval by [role].

## Project context

- **Read before asking:** `docs/design/brief.md` (personality, existing brand, constraints) and `PRODUCT.md` (audience, platforms, languages). What is already defined there is not asked again or repeated: it is linked. If `docs/design/review.md` exists (the output of `des-validate`), address its open findings first.
- **Write** `DESIGN.md` at the project root. If it already exists, modify only what changes and keep the rest; changing a value marked as *defined* requires confirmation.
- If `AGENTS.md` exists and does not link `DESIGN.md`, point it out so that it is updated with `pm-context`.
- If there is no repository or files cannot be written, deliver the full content in the conversation under the name `DESIGN.md`.

## Closing every response

End with: the decisions pending approval and who approves them, the data missing from the brief, and the next step, which is normally to review the file with `des-validate` before building on it.
