---
name: pm-context
description: "Use when starting a software project or picking one back up, to set up and maintain its context: create or update AGENTS.md as the index, diagnose which base files exist, are missing or are outdated (PRODUCT.md, DESIGN.md, ARCHITECTURE.md, CONTRIBUTING.md, TESTING.md, SECURITY.md, OPERATIONS.md, CHANGELOG.md, ROADMAP.md) and say which skill to use next. Also use when the user asks where to start, what documentation the project needs, how to give context to an AI agent or what is left to define, even if they do not name any file."
license: MIT
metadata:
  author: "Hernan"
  version: "0.3.0"
  phase: "management"
  reads: "AGENTS.md, PRODUCT.md, DESIGN.md, ARCHITECTURE.md, CONTRIBUTING.md, TESTING.md, SECURITY.md, OPERATIONS.md, CHANGELOG.md, ROADMAP.md"
  writes: "AGENTS.md"
---

# Project context

You maintain the map of the project: a fixed set of files at the root (the **primitives**) that say what was decided in each aspect, and an index, `AGENTS.md`, that leads to them. You do not decide the content of the primitives; you say which ones exist, which are missing and which skill produces them.

## Principles

- **Do not fill in.** An empty primitive is better than an invented one: a file with plausible but false content reads as a decision made. If it is missing, report it as missing.
- **Each primitive has an owner.** You only write `AGENTS.md`. The others are written by the skills of their phase.
- **One piece of data, one place.** `AGENTS.md` links; it does not copy the content of the other primitives.
- **The minimum to move forward.** Not every project needs all ten. Recommend only those that unblock the next step.
- Respond in the user's language.

## The primitives

| File | Answers | Produced by |
| :--- | :--- | :--- |
| `AGENTS.md` | How work is done here and where everything is | This skill |
| `PRODUCT.md` | What is being built, for whom and why | `req-specify` |
| `DESIGN.md` | How it looks and how it speaks | `des-guidelines` |
| `ARCHITECTURE.md` | How it is built and why that way | `arch-define` |
| `CONTRIBUTING.md` | How code is written and integrated | `dev-conventions` |
| `TESTING.md` | What is tested, how and with what threshold | `qa-strategy` |
| `SECURITY.md` | What is protected and how it is reported | `sec-define` |
| `OPERATIONS.md` | How it is deployed, observed and recovered | `ops-define` |
| `CHANGELOG.md` | What changed | `mnt-changelog` |
| `ROADMAP.md` | What comes next and with what risks | `pm-plan` |

Work material (notes, findings, briefs, reports) goes in `docs/<phase>/`, never at the root. Read [references/primitives.md](references/primitives.md) when you need to know which minimum sections a primitive carries or how to judge whether it is complete.

## Choose the mode based on the situation

| Situation | Mode |
| :--- | :--- |
| New project or one without `AGENTS.md` | A. Start |
| Project in progress; you want to know what is missing | B. Diagnose |
| Something changed (new primitive, commands, structure) | C. Synchronize |

## A. Start

1. Check what exists: list the root and `docs/`, and read `README.md`, the manifests (`package.json`, `pyproject.toml` or others) and the CI configuration. The stack and the real commands come from there.
2. Create `AGENTS.md` from [assets/AGENTS.template.md](assets/AGENTS.template.md). Fill in only what you can verify in the repository; the rest stays as "Undefined".
3. In the context table of `AGENTS.md`, link the primitives that exist and mark the others as "pending".
4. Deliver the diagnosis from mode B.

If the repository is empty, `AGENTS.md` carries only the project name and the context table; the first recommended step is `req-elicit`.

## B. Diagnose

Read each primitive that exists and classify it:

| Status | Criterion |
| :--- | :--- |
| **Current** | Has the minimum sections with concrete values and matches the code |
| **Incomplete** | Missing minimum sections or has "Undefined" in something that already blocks |
| **Outdated** | Contradicts the code, the configuration or another primitive |
| **Missing** | Does not exist |
| **Not applicable** | The project does not need it yet; say why |

Deliver:

1. **Status table:** Primitive | Status | Evidence (file and line, or what is missing) | Skill that resolves it.
2. **Contradictions between primitives**, quoting each side. The usual ones: platforms in `PRODUCT.md` that `DESIGN.md` does not cover; non-functional thresholds in `PRODUCT.md` with no test in `TESTING.md`; commands in `AGENTS.md` that do not exist in the manifest.
3. **Next step:** one single skill, the one that unblocks the most. When everything is missing, follow this order and name the first skill of the phase concerned:

   | Order | Missing | Start with |
   | :--- | :--- | :--- |
   | 1 | `PRODUCT.md` | `req-elicit` (or `req-specify` if there is already material) |
   | 2 | `DESIGN.md`, if there is an interface | `des-discover` |
   | 2 | `ARCHITECTURE.md` | `arch-discover` |
   | 3 | `SECURITY.md`, if there is sensitive data or public access | `sec-threats` |
   | 3 | `CONTRIBUTING.md` | `dev-conventions` |
   | 3 | `TESTING.md` | `qa-strategy` |
   | 4 | `ROADMAP.md` | `pm-plan` |
   | 5 | `OPERATIONS.md`, before the first deployment | `ops-discover` |
   | 5 | `CHANGELOG.md`, before the first release | `mnt-changelog` |

   A project that already has code and no primitives starts by describing what exists: `arch-discover` and `dev-conventions` in their inventory modes.

If the skill that produces a primitive is not installed, say so and offer to create only the skeleton of sections from [references/primitives.md](references/primitives.md), with "Undefined" in each one.

## C. Synchronize

1. Update in `AGENTS.md` the context table and the commands. Verify each command against the manifest before writing it.
2. Keep everything that did not change; do not reorder or rewrite sections unrelated to the change.
3. Report which lines you changed and why.

## Gotchas

- `AGENTS.md` is not a README: it does not explain what the product is (that is `PRODUCT.md`), it says how to work in the repository.
- Not every agent reads `AGENTS.md` by default. Claude Code reads it only when there is no `CLAUDE.md` in the working directory or above it (and only in recent versions); as soon as a `CLAUDE.md` exists, it reads that one alone. So if the project has or will have a `CLAUDE.md`, make it a single line, `@AGENTS.md`, and put nothing else in it. Gemini CLI loads `GEMINI.md` by default; to make it read `AGENTS.md`, add `AGENTS.md` to `context.fileName` in its `settings.json`. Never duplicate the content into a second file.
- A command copied from another project and not verified makes every agent that reads it fail. If you cannot run it or find it in the manifest, do not write it.
- Do not move or rename existing documentation to fit this convention without asking; link it from `AGENTS.md` and propose the change.
- `SECURITY.md` and `CONTRIBUTING.md` have meaning for GitHub (it shows them in the interface). If they already exist with another purpose, respect them and extend them instead of replacing them.

## Project context

- **You read** all the primitives at the root and the structure of `docs/`.
- **You write** only `AGENTS.md` (and, if applicable, a one-line `CLAUDE.md` containing `@AGENTS.md`). Update the affected sections; do not replace the file if it already exists.
- If there is no repository or files cannot be written, deliver the content of `AGENTS.md` in the conversation.

## Closing every response

End with the status table (or what changed) and the concrete skill that comes next, with the reason in one line.
