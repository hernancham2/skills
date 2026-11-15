# Skill standard

**English** · [Español](../es/standard.md)

Rules that every skill in this repository must meet. Those marked ✔ are checked by `npm run validate`.

Base: the [Agent Skills specification](https://agentskills.io/specification) and its [best practices](https://agentskills.io/skill-creation/best-practices). What this repository adds is the organization by phase, the prefix in the name, the `metadata` fields and the [project context](context.md) that skills read and write.

## 1. Location and name

```text
skills/<phase>/<prefix>-<name>/
├── SKILL.md        required
├── references/     optional: documentation the agent reads only if it needs it
├── scripts/        optional: executable code
└── assets/         optional: output templates, schemas, data
```

- ✔ The phase folder must exist in [`skills.config.json`](../../skills.config.json).
- ✔ The name starts with the prefix of its phase (`req-`, `des-`, `arch-`, `dev-`, `qa-`, `sec-`, `ops-`, `mnt-`, `pm-`). The `productivity` group is the exception: it has no prefix, so its skills take a short free name (`grill-me`).
- ✔ Only lowercase letters, numbers and single hyphens; 64 characters maximum; no `claude` or `anthropic`.
- ✔ The frontmatter `name` = the folder name, and it is unique across the whole repository.
- After the prefix, use a verb in the base form or an action noun: `req-elicit`, `qa-strategy`.

The prefix exists because agents install all skills in a single flat folder: it keeps those of one phase together and avoids name clashes with skills from other authors.

## 2. Frontmatter

```yaml
---
name: req-elicit
description: "Use at the start of a software project or feature to discover needs: identify stakeholders, prepare interviews and workshops, and process notes from those sessions."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "requirements"
  reads: "PRODUCT.md"
  writes: "docs/requirements/findings.md"
---
```

| Field | Required | Rule |
| --- | --- | --- |
| `name` | ✔ | See section 1. |
| `description` | ✔ | 1–1024 characters, no `<` or `>`. In double quotes. |
| `license` | | SPDX identifier. |
| `compatibility` | | Only if there are real environment requirements (500 characters max), e.g. `"Requires git and Node.js 20+"`. |
| `metadata.author` | | Author. |
| `metadata.version` | ✔ | Quoted semver. |
| `metadata.phase` | ✔ | Equal to the name of the phase folder. |
| `metadata.reads` | | Context files it consults, separated by commas. ✔ Known primitives or paths under `docs/`. |
| `metadata.writes` | | Context files it produces. ✔ Only the primitive of its own phase, `AGENTS.md` or paths under `docs/`. |
| `allowed-tools` | | Experimental; support varies between agents. |

- ✔ `metadata` values go in quotes: the specification requires text, and `1.0` without quotes is a number.
- ✔ Do not use fields outside the specification (the validator warns). Extensions such as `context: fork` only work in Claude Code.

### How to write `description`

It is the only thing the agent sees before deciding whether to load the skill, so it determines whether the skill gets activated.

- **In the imperative, as an instruction to the agent:** start with `Use when ...` or `Use to ...`. The agent is deciding whether to act; tell it when.
- **From the user's intent**, not from the internal mechanism: what they want to achieve, in the words they would use when asking.
- **Pushy:** list the situations where it applies, also when the user does not name the topic (`applies even if they only say they want it to look professional`).
- **With a boundary:** if it can be confused with another skill, say when not: `Do not use for ... (other-skill)`.
- A few sentences. The hard limit is 1024 characters.

| Bad | Good |
| --- | --- |
| `Helps with requirements.` | `Use to review requirements that are already written (stories, specification, backlog) before estimating or building: detect ambiguity, contradictions, gaps and non-verifiable requirements.` |

To check that it activates well, write about twenty realistic requests, half that should activate it and half that should not. The useful negatives are the near misses: they share words with the skill but need something else. The full method is in [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions).

## 3. Body

Sections of the [template](../../template/SKILL.template.md), in this order. They are a starting point: adapt the structure to the task (for example, principles and modes depending on what you are given, as in the `req-*` and `des-*` skills), remove those that do not apply and leave no empty sections.

| Section | Content |
| --- | --- |
| Title and goal | One or two sentences: what it solves and what result it leaves. |
| When to use / When not to use | Concrete situations and the alternative skill for similar cases. |
| Inputs | What the agent needs and what to do if it is missing. |
| Process | Numbered steps in the imperative. Explain the why of non-obvious rules. |
| Output | The exact format of the deliverable. |
| Verification | A list of objective checks that the work is complete. |
| Gotchas | Concrete facts that contradict what the agent would assume. It is usually the most valuable section: every correction you have to make to an agent goes here. |
| Project context | Which files it reads before asking and where it saves the result. Mandatory if it declares `reads` or `writes`. See [context.md](context.md). |

Writing rules:

- ✔ Maximum 500 lines in `SKILL.md` (about 5000 tokens). Detail goes in `references/`.
- ✔ Links with paths relative to the skill folder, which exist and do not leave it (`..`). Each skill must be installable on its own.
- ✔ Every skill mentioned in the body (`` `req-validate` ``) must exist in the repository. The validator also warns if a skill reads a file that no skill writes, if a skill writes a file that no skill reads (a dead end), and if a body mentions a primitive or a `docs/` path that is not part of the context model (an unknown `FOO.md` is an error).
- Files in `references/` are linked directly from `SKILL.md`; do not chain references inside references.
- Templates of primitives in `assets/` are named `NAME.template.md` (for example `DESIGN.template.md`), so that no agent mistakes them for the real file of the project.
- Diagrams go in Mermaid inside the document of the aspect they model. See [context.md](context.md#diagrams).
- **Start from real experience.** A skill generated only from general knowledge produces vague advice. It comes from a task done for real, from your documents and from the corrections you had to make.
- Write only what the agent does not already know: your process, your criteria and your formats. For each line ask yourself whether the agent would get it wrong without it; if not, delete it.
- **One default path, not a menu.** Pick a tool or approach and mention the alternative only for the case where it applies.
- **Prescribe according to fragility.** Be strict where order or format matter (exact commands, templates); give freedom and explain the why where several paths are valid.
- **Procedures, not answers.** Teach how to approach the class of problem, not what to deliver in a specific case.
- **Say when to load each reference:** "read `references/criteria.md` before defining color", not "see references/".
- **Templates for output formats.** Short ones inside `SKILL.md`; long ones in `assets/`.
- **Validation loop:** do, check (script, list or reference), fix and repeat until it passes.
- If agents rewrite the same logic on every use, turn it into a tested script in `scripts/`.
- Do not depend on the tools of a specific agent. If unavoidable, declare it in `compatibility`.
- The skill's content is in English. The skill itself tells the agent to respond in the user's language.

## 4. Versioning

Bump `metadata.version` on every published change:

- **Patch** (`0.1.1`): wording fixes with no change in behavior.
- **Minor** (`0.2.0`): new steps, references or cases.
- **Major** (`1.0.0`): the output changes or the moment it is activated changes.

## 5. Before publishing

- [ ] `npm run check` passes with no errors.
- [ ] You tried the skill with a real request, without naming it, and the agent activated it.
- [ ] You tried a similar request that should **not** activate it.
- [ ] You read what the agent did, not just the result, and trimmed what made it lose time.
- [ ] It contains no secrets, customer data or paths from your machine.

## Adding or changing a phase

Edit `phases` in [`skills.config.json`](../../skills.config.json) (`id` = folder name, `prefix` = prefix of the skills, `primitive` = file it owns; both may be empty for a group that is not a lifecycle phase, and `plugin` sets the plugin name when it should not be `se-<id>`) and run `npm run generate`. Renaming a prefix requires renaming the skills of that phase.
