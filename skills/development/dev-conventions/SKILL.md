---
name: dev-conventions
description: "Use when starting to code a project or tidying an existing one, to define how code is written and integrated and save it in CONTRIBUTING.md: branching flow, commit and pull request format, naming and structure conventions, error handling, definition of done, and what is automated with lint, formatting and CI. Applies when asked for a code style guide, development standards, rules for the team or for agents, or to detect the conventions a repository already follows. Do not use to review a specific change (dev-review)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "development"
  reads: "AGENTS.md, ARCHITECTURE.md, CONTRIBUTING.md, docs/development/detected-conventions.md"
  writes: "CONTRIBUTING.md, docs/development/detected-conventions.md"
---

# Development conventions

You define the rules by which the team and the agents write and integrate code, and save them in `CONTRIBUTING.md`. Few rules, each with an example, and everything that can be automated left in the hands of a tool.

## Principles

- **What a tool can enforce is not written as a rule: it is configured.** Formatting, import order and style are decided by the formatter and the linter. The document only says which tool and how to run it.
- **What is already done wins.** In an existing project, the convention is the one most of the code follows, not the one you prefer.
- **Few, and with an example.** Fifteen rules that are followed are worth more than sixty that nobody reads. Each non-obvious rule carries a correct example and an incorrect one.
- **The ecosystem's standard by default.** Use the language's and framework's usual style guide, formatter and structure. Depart from them only with a reason, and write it down.
- Respond in the user's language.

## Choose the mode

| Situation | Mode |
| :--- | :--- |
| New project, with no code or very little | A. Define |
| Project with code and no written conventions | B. Detect, then A |
| There is a `CONTRIBUTING.md` and something must change | C. Update |

## A. Define

Fill in [assets/CONTRIBUTING.template.md](assets/CONTRIBUTING.template.md). Decide each point with these defaults and change them only if the team or the project gives a reason:

| Topic | Default |
| :--- | :--- |
| Branches | A main branch that is always deployable; short branches per task that live less than two days |
| Integration | Pull request with at least one review and green CI; squash merge |
| Commits | Conventional Commits (`type(scope): summary`), in the imperative, one logical change per commit |
| Pull request size | What can be reviewed in fifteen minutes; if it does not fit, it is split |
| Format and lint | The ecosystem's standard tools, run on save, before the commit and in CI |
| Tests | Whatever `TESTING.md` says; every behavior change carries its test |
| Language | One for identifiers and another, if desired, for comments and documentation; state it |

Then write only the conventions that no tool covers:

- **Names:** of files, modules, functions, tests and branches.
- **Structure:** where each type of code goes, according to `ARCHITECTURE.md`.
- **Errors:** how they are created, propagated and logged; what is never silenced.
- **Logging:** levels, format and what data is never logged.
- **Comments:** explain the why, not the what.
- **Dependencies:** who approves adding one and by what criterion.
- **Definition of done:** a verifiable list.

## B. Detect

Read before proposing. Record each convention with evidence in `docs/development/detected-conventions.md`:

1. Tool configuration: formatter, linter, editor, commit hooks, CI.
2. Five to ten representative files, from different modules and recently modified.
3. The last thirty commits and, if there is access, recent pull requests: message format, size, branch names.
4. Folder structure and how tests are named.

Table: Topic | Observed convention | Evidence (paths) | Consistency (always / mostly / mixed).

Where the consistency is *mixed*, do not choose: present the variants with how many cases each has and ask. What most of the code follows goes into `CONTRIBUTING.md` as a rule; the rest goes as a pending decision.

## C. Update

Modify only the requested rule. State how much of the existing code breaks it and propose what to do: migrate everything, migrate when touched, or apply it only to new code.

## Gotchas

- Do not write a command in `CONTRIBUTING.md` without having found it in the manifest or having run it.
- Do not copy a full style guide: link the official one and write only the differences.
- A rule with no way of being checked (automatically or in review) will not be followed. Say who or what verifies it.
- If GitHub already shows a project `CONTRIBUTING.md` with content for external contributors, extend it instead of replacing it.
- Rules for agents that do not apply to people (which commands to run when finishing, what not to touch) go in `AGENTS.md`, not here.

## Project context

- **Read before asking:** `AGENTS.md` (stack and commands), `ARCHITECTURE.md` (structure and boundaries) and the existing `CONTRIBUTING.md`; when updating (mode C), also `docs/development/detected-conventions.md` so that already-detected conventions are not rediscovered.
- **Write** `CONTRIBUTING.md` at the root and, in mode B, `docs/development/detected-conventions.md`. Modify only what changes.
- If there is no repository or files cannot be written, deliver the content in the conversation under their file names.

## Closing every response

End with the pending decisions, what is worth automating and is not yet, and the next step: `qa-strategy` if `TESTING.md` is missing, or `dev-implement` to start building.
