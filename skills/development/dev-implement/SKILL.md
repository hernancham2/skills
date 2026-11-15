---
name: dev-implement
description: "Use when implementing a feature, story, task or fix in a project that has context files (AGENTS.md, PRODUCT.md, ARCHITECTURE.md, CONTRIBUTING.md, TESTING.md, DESIGN.md): read what is already decided, plan in small increments, build with tests, verify against the acceptance criteria and warn when the change requires updating the context. Applies when asked to build, program, add or develop something of the product. Do not use for trivial one-line changes or for only reviewing someone else's code (dev-review)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "development"
  reads: "AGENTS.md, PRODUCT.md, DESIGN.md, ARCHITECTURE.md, CONTRIBUTING.md, TESTING.md, SECURITY.md, docs/requirements/specification.md, docs/design/navigation.md"
---

# Implementation guided by the context

You build what was asked while respecting what the project has already decided. Your advantage over programming blind is that the decisions are written down: use them instead of making them again.

## Principles

- **What is decided is not decided again.** If a primitive defines something, it is followed. If you think it is wrong, you say so before writing code; you do not change it silently.
- **Done means verified.** A task is finished when each acceptance criterion has evidence and the tests pass, not when the code compiles.
- **Increments that leave the system working.** Each step can be tested and reverted on its own.
- **Only what was asked.** No refactoring on the side, no "just in case" functions, no new dependencies that nobody approved.
- Respond in the user's language.

## Process

### 1. Read the context the task touches

Always start with `AGENTS.md`: it gives the commands and links the rest. Then read only what applies:

| If the task touches | Read |
| :--- | :--- |
| Anything | `AGENTS.md`, `CONTRIBUTING.md`, `TESTING.md` |
| Product behavior | `PRODUCT.md` and the requirement in `docs/requirements/specification.md` |
| Interface | `DESIGN.md` and `docs/design/navigation.md` |
| Structure, data or integrations | `ARCHITECTURE.md` and the related ADRs |
| Authentication, permissions, sensitive data, external inputs | `SECURITY.md` |

If a file does not exist, do not invent it: follow the conventions you observe in neighboring code and note it as a gap at the end.

### 2. Fix what done means

Identify the requirement (by ID if it has one) and its acceptance criteria. If there are no criteria, write them in *Given / When / Then* format, including at least one error case, and ask for confirmation before building. Without criteria there is no way to know whether you finished.

### 3. Plan before touching code

Deliver a brief plan:

- Files that are created or modified, and why.
- Increments, in order, each with how it is checked.
- **Conflicts with the context**: anything the task needs that a primitive does not allow or does not contemplate (a new dependency, a new component, a schema change, a color or component outside `DESIGN.md`). Raise them now and wait for an answer if any of them changes an already-defined decision.

### 4. Build in increments

For each increment:

1. Write the test first when the criterion can be checked automatically, at the level `TESTING.md` indicates.
2. Implement the minimum for it to pass.
3. Run the tests and the lint with the commands from `AGENTS.md`.
4. If something fails, fix it and run again. Do not move on with red tests.

### 5. Verify against the criteria

Go through the acceptance criteria one by one and note the evidence for each: the test that covers it, or what you checked by hand and how. A criterion without evidence is pending work and is declared as such.

### 6. Feed back into the context what changed

If the change introduced something that a primitive should reflect, say so, with the file and the skill that updates it. Do not edit primitives of other phases on your own.

| What changed | Primitive | Skill |
| :--- | :--- | :--- |
| Command, folder or tool | `AGENTS.md` | `pm-context` |
| Component, major dependency, schema, integration | `ARCHITECTURE.md` | `arch-define` |
| Token, visual component or screen | `DESIGN.md`, `docs/design/navigation.md` | `des-guidelines`, `des-navigation` |
| Environment variable, deployment step, migration | `OPERATIONS.md` | `ops-define` |
| User-visible behavior | `CHANGELOG.md` | `mnt-changelog` |

## Gotchas

- Do not run commands you assume exist. If `AGENTS.md` does not give them, look in the manifest; if they are not there, ask.
- Never weaken, skip or delete a test to make the suite pass. If an existing test contradicts the requirement, report it.
- In the interface, use the tokens and components of `DESIGN.md`; a hand-written color or spacing is a defect even if it looks the same.
- Configuration values and secrets do not go in the code or in the tests. The names of the variables are defined by `OPERATIONS.md`.
- A database schema change needs a migration and must coexist with the previous version of the code while the deployment lasts.
- If midway through the task you discover that the requirement is ambiguous or contradictory, stop and ask: guessing produces code that will have to be redone.

## Project context

- **You read** the primitives in the table of step 1.
- **You do not write primitives.** Your output is code and tests; what must change in the context you indicate in the closing.
- If the project has no `AGENTS.md`, suggest `pm-context` before large tasks.

## Closing every response

End with this summary:

1. **What changed**, per file.
2. **Acceptance criteria**, each with its evidence or marked as pending.
3. **Result of tests and lint**, with the command run. If you could not run them, say so.
4. **Context to update**, according to the table in step 6.
5. **Gaps found** in the primitives.
