# Project context

**English** · [Español](es/context.md)

The skills in this repository do not work in isolation: each one reads and writes a fixed set of files in the repository of the project where it is used. Those files are the **project context**: what any person or agent needs to read in order to work without asking again what has already been decided.

## Two kinds of file

| Kind | Where | What it contains | Who reads it |
| --- | --- | --- | --- |
| **Primitive** | Project root, uppercase (`DESIGN.md`) | Only current decisions about one aspect, brief and with exact values | Every agent, before any task that touches that aspect |
| **Work material** | `docs/<phase>/` | The path to the decision: notes, findings, briefs, specifications, reports | The skill of the same phase, when it needs it |

The separation exists because of the context budget: a primitive is loaded many times, so every line has to earn its place. The detail lives in `docs/` and is linked.

## The primitives

| Phase | Primitive | Answers | Work material |
| --- | --- | --- | --- |
| (index) | `AGENTS.md` | How is work done in this repository and where is everything? | |
| Requirements | `PRODUCT.md` | What is built, for whom and why? | `docs/requirements/` (findings, specification, validation) |
| Design | `DESIGN.md` | How does it look and how does it speak? | `docs/design/` (brief, navigation, review) |
| Architecture | `ARCHITECTURE.md` | How is it built and why that way? | `docs/architecture/` (drivers, ADRs, review) |
| Development | `CONTRIBUTING.md` | How is code written and integrated? | `docs/development/` (detected conventions) |
| Testing | `TESTING.md` | What is tested, how and with what threshold? | `docs/testing/` (risks, cases, review) |
| Security | `SECURITY.md` | What is protected, from whom and how is it reported? | `docs/security/` (threats, review) |
| Delivery | `OPERATIONS.md` | How is it deployed, observed and recovered? | `docs/delivery/` (environment, review, incidents) |
| Maintenance | `CHANGELOG.md` | What changed and what stops being supported? | `docs/maintenance/` (debt, migrations) |
| Management | `ROADMAP.md` | What comes next, in what order and with what risks? | `docs/management/` (plan, risks, status) |

The phase → primitive mapping is in [`skills.config.json`](../skills.config.json). Established names are used where they exist: [`AGENTS.md`](https://agents.md), `CONTRIBUTING.md`, `SECURITY.md` and `CHANGELOG.md` are industry conventions, and `DESIGN.md` has its own structure, defined by `des-guidelines`: tokens in YAML plus prose in a fixed set of sections.

`PRODUCT.md` plays the role that other methods give to a PRD, and `ARCHITECTURE.md` plus the non-functional requirements in `PRODUCT.md` that of a TRD. The difference is that these files are living: they are updated throughout the project instead of being written once and approved.

## Rules of a primitive

1. **Decisions only.** What is under discussion goes in `docs/`. A decision that is not yet approved may appear marked as *proposal*, with who approves it.
2. **Values, not adjectives.** `#1D4ED8`, "95% of responses in under 2 s", `npm test`.
3. **Short.** As a guideline, under 200 lines. If it grows, move detail to `docs/` and leave the link.
4. **One source.** A piece of data lives in one primitive; the others link to it. Platforms are defined in `PRODUCT.md`, not repeated in `DESIGN.md`.
5. **One owner.** Only the skills of its phase write a primitive. The others read it.
6. **Updated, not rewritten.** A skill modifies the sections that concern it and keeps the rest. Changing an already *defined* decision requires the person's confirmation.
7. **With a trail.** Each primitive links the work material it came from.
8. **Linked from `AGENTS.md`**, so that any agent finds it without having the skills installed.

## Three roles per phase

Each skill collection repeats the same journey:

| Role | Does | Reads | Writes |
| --- | --- | --- | --- |
| **Discover** | Gathers information and detects gaps | Primitives of earlier phases | `docs/<phase>/` |
| **Define** | Turns what was gathered into decisions, and resolves the findings of the last validation report | `docs/<phase>/` (including the validation report) and earlier primitives | The primitive of the phase |
| **Validate** | Reviews what was decided before building on it | The primitive and its material | A report (in the conversation or in `docs/<phase>/`) |

Not all phases follow the pattern to the letter: some join discover and define in one skill (`dev-conventions`, `qa-strategy`) and others add skills for recurring tasks (`dev-implement`, `ops-incident`, `mnt-migrate`).

## The complete journey

| Phase | Discover | Define | Validate | Others |
| --- | --- | --- | --- | --- |
| Requirements | `req-elicit` | `req-specify` → `PRODUCT.md` | `req-validate` | |
| Design | `des-discover` | `des-guidelines` → `DESIGN.md` | `des-validate` | `des-navigation` |
| Architecture | `arch-discover` | `arch-define` → `ARCHITECTURE.md` | `arch-validate` | |
| Development | `dev-conventions` | `dev-conventions` → `CONTRIBUTING.md` | `dev-review` | `dev-implement` |
| Testing | `qa-strategy` | `qa-strategy` → `TESTING.md` | `qa-validate` | `qa-cases` |
| Security | `sec-threats` | `sec-define` → `SECURITY.md` | `sec-review` | |
| Delivery | `ops-discover` | `ops-define` → `OPERATIONS.md` | `ops-validate` | `ops-incident` |
| Maintenance | `mnt-debt` | `mnt-changelog` → `CHANGELOG.md` | | `mnt-migrate` |
| Management | `pm-risks` | `pm-plan` → `ROADMAP.md` | `pm-status` | `pm-context` → `AGENTS.md` |

Usual order in a new project:

```text
pm-context                        sets up AGENTS.md and says what is missing
  └─ req-elicit → req-specify → req-validate               PRODUCT.md
       ├─ des-discover → des-guidelines → des-validate     DESIGN.md
       │    └─ des-navigation                              docs/design/navigation.md
       └─ arch-discover → arch-define → arch-validate      ARCHITECTURE.md
            ├─ sec-threats → sec-define                    SECURITY.md
            ├─ dev-conventions                             CONTRIBUTING.md
            ├─ qa-strategy → qa-cases                      TESTING.md
            └─ ops-discover → ops-define                   OPERATIONS.md
pm-plan → pm-risks                                         ROADMAP.md

During construction, on each task:
  dev-implement → dev-review → mnt-changelog               CHANGELOG.md

Before publishing:
  qa-validate · sec-review · ops-validate

In operation and evolution:
  pm-status · ops-incident · mnt-debt · mnt-migrate
```

No skill requires that the earlier ones have been used: each reads what exists, asks for what is missing and says which skill produces what it did not find.

## Diagrams

Diagrams are not documents of their own. They go in Mermaid, as text, inside the file of the aspect they model, so that they are versioned with it and an agent can read and update them.

| Diagram | Where it goes | Skill |
| --- | --- | --- |
| Context, process or activities, business states, conceptual model | `docs/requirements/specification.md` | `req-specify` |
| Navigation between screens (states) | `docs/design/navigation.md` | `des-navigation` |
| Components, entity-relationship, sequence of an integration | `ARCHITECTURE.md` and the ADRs | `arch-define` |
| Data flow with trust boundaries | `docs/security/threats.md` | `sec-threats` |
| Deployment and environments | `OPERATIONS.md` | `ops-define` |

Only the diagram that answers a question the text does not answer is drawn. An outdated diagram confuses more than its absence: if the code contradicts it, it is fixed or deleted.

## How a skill declares it

In the frontmatter, inside `metadata`, with comma-separated paths:

```yaml
metadata:
  reads: "PRODUCT.md, docs/design/brief.md"
  writes: "DESIGN.md"
```

`npm run validate` checks that the paths are known primitives or are under `docs/`, and that a skill only writes the primitive of its own phase. The README catalog shows what each skill reads and writes.

In the body, every skill that takes part carries a **Project context** section that says:

- which files to read before asking, and that what is already defined there is not asked again;
- where to save the result and whether it is added or replaced;
- what to do if there is no repository or files cannot be written: deliver the result in the conversation with the suggested file name.

## Adding a primitive

Add or edit `primitive` in the corresponding phase of `skills.config.json`, document the row in the table above and in [`pm-context`](../skills/management/pm-context/references/primitives.md), and run `npm run generate`.
