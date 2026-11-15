---
name: dev-document
description: "Use to write or update the documentation that the people who use or install a software product read: the project README, getting-started and installation instructions, how-to guides for a task, reference for an API, a CLI or configuration, and the review of docs that have gone stale. Applies when asked for a README, user documentation, a user guide, API documentation, a tutorial, help content or to check whether the docs still match the code, even if the user does not say who the reader is. Do not use for how the team writes code (dev-conventions), for architecture decisions (arch-define), for release notes (mnt-changelog) or for the incident runbook (ops-define)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "development"
  reads: "PRODUCT.md, DESIGN.md, ARCHITECTURE.md, CONTRIBUTING.md, OPERATIONS.md, docs/development/guides/"
  writes: "docs/development/guides/"
---

# User documentation

You write what a person needs to install, use or integrate the product, and you keep it true. The result is a README and guides that a reader can follow without asking anyone, and that match the code on the day they are written.

## Principles

- **A reader and a task, not the code.** Every page answers one question from one kind of reader ("I want to install it", "how do I export my data"). If you cannot name the reader and the task, the page is not ready to be written.
- **Every command was run.** A command, path, flag or output you did not verify against the manifest, the code or a real run does not go in. An invented command is worse than a missing one.
- **Say what the reader will see.** After a step with a visible result, give the expected result, so the reader knows whether it worked.
- **One place per fact.** Link to `PRODUCT.md`, `ARCHITECTURE.md` and `OPERATIONS.md` instead of copying them; copies go stale first.
- **Plain and concrete.** No marketing adjectives. Prefer the reader's words (the ones in `PRODUCT.md`) over internal names.
- Respond in the user's language; write the documents in the language of **their readers** (see `PRODUCT.md`), which may be different.

## Choose the mode based on what you are given

| You are given | Mode |
| :--- | :--- |
| A project with no README, or a README that does not help someone start | A. README |
| A task users do ("export a report", "invite a teammate") | B. How-to guide |
| An API, a CLI, a configuration file or a set of options | C. Reference |
| Existing docs, and doubt whether they are still right | D. Audit |

If it is not clear who reads the documentation, ask one question: who is the reader and what are they trying to do first?

## A. README

1. Read `PRODUCT.md` (what it is and for whom), the manifest (`package.json`, `pyproject.toml` or similar) and the CI and run configuration. The real commands come from there.
2. Write these sections, in this order, and only the ones that apply:

   | Section | Content |
   | :--- | :--- |
   | Title and one line | What it is and who it is for, in the reader's words |
   | Quick start | The shortest verified path to see it working: install, run, expected result |
   | Usage | The two or three most common tasks, each linking to its guide |
   | Configuration | Only what a user must set, with the default of each option |
   | Contributing and license | Link to `CONTRIBUTING.md`, license name |

3. Run the quick start from a clean state, or say you could not. A quick start that fails on the first line loses the reader.
4. Keep it short: what is not needed to get started goes into a guide and is linked.

## B. How-to guide

Use this skeleton:

```markdown
# [Goal in the reader's words: "Export a report"]

Before you start: [prerequisites, permissions, data]

1. [Action]. You will see [visible result].
2. [Action]. 

If something goes wrong: [the two most likely errors and what to do]
```

- One goal per guide; one action per step; the exact name of each button, field or flag, as it appears in the product (check `DESIGN.md` for the voice and the code for the labels).
- Put the most common error right where it happens, not in a separate troubleshooting chapter.
- Save it to `docs/development/guides/<goal>.md`.

## C. Reference

- If the code already describes itself (OpenAPI, type definitions, `--help`, a schema), **generate or link that** instead of writing it by hand; a hand-written copy drifts.
- Otherwise list each item with: name, type, whether it is required, default, a one-line meaning and one example. Order by how often it is used, not alphabetically, unless it is long enough to need lookup.
- Each example is runnable as written. State the version it applies to.

## D. Audit

1. List the documents and, for each, what it promises: commands, options, screenshots, versions, links.
2. Check each promise against the code: run the commands, grep the option names, open the links.
3. Deliver a table: Document | Claim | Reality | Fix, ordered by how likely a new reader is to hit it.
4. Fix only what you are sure of; mark the rest as questions.

## Verification

- [ ] Each page names its reader and the task it solves.
- [ ] Each command was run or checked against the manifest; those you could not check are marked.
- [ ] Each step with a visible result says what the reader will see.
- [ ] Nothing duplicates `PRODUCT.md`, `ARCHITECTURE.md` or `OPERATIONS.md`; it links to them.
- [ ] Names of buttons, fields and flags match the product exactly.

## Gotchas

- **Screenshots go stale first.** Use them only where words cannot describe the screen, and say which version they show.
- **A README that explains the architecture is not a README.** The reader who just arrived wants to see it run; the design belongs in `ARCHITECTURE.md`.
- **The default in the docs must be the default in the code.** Check the option's real default before writing it.
- `README.md`, `CONTRIBUTING.md` and `SECURITY.md` are shown by GitHub. If they already exist, extend them instead of replacing them, and do not move existing documentation without asking.
- Documentation that tells the reader to "see the code" has not been written yet.

## Project context

- **Read before asking:** `PRODUCT.md` for the reader, goals and language; `ARCHITECTURE.md` for how it is run; `OPERATIONS.md` for installation, configuration and environments; `CONTRIBUTING.md` for the contributor section; `DESIGN.md` for the voice and the exact names in the interface; and what already exists in `docs/development/guides/`.
- **Write** guides to `docs/development/guides/<name>.md`. The project `README.md` is updated in place; it is not a context primitive, so edit only the sections you are asked to change.
- If a fact you need is in no primitive (the install command, a default), find it in the code; if you cannot, leave it marked as unknown instead of guessing.
- If there is no repository or files cannot be written, deliver the text in the conversation under the suggested file name.

## Closing every response

End with which documents were written or updated and where, which commands you verified and which you could not, and the next step: usually running the quick start once more on a clean machine, or `dev-review` on the change that made the docs necessary.
