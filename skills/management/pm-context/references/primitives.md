# Minimum sections of each primitive

A primitive is **complete** when each minimum section has concrete values. All of them end with a "Source" section that links the work material in `docs/<phase>/`.

## AGENTS.md

- Context table with the link and status of each primitive.
- Stack with versions.
- Verified commands: install, run, test, lint, build.
- Folder structure.
- Rules that cannot be deduced from the code.

## PRODUCT.md

- Vision in one or two sentences.
- Measurable business goals (with a number and a deadline).
- Users by role and what each one needs to achieve.
- Scope and, explicitly, out of scope.
- Platforms, languages and operating environment.
- Key non-functional requirements with a metric and a threshold.
- Constraints and business rules that condition everything.
- Short glossary.
- Link to the full specification and to the backlog.

Sign that it is incomplete: goals without a number, empty "out of scope", users described as "everyone".

## DESIGN.md

Follows the structure defined in `des-guidelines`: tokens in the YAML frontmatter (`colors`, `typography`, `rounded`, `spacing`, `components`) and sections in this order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. It may add its own sections (logo, accessibility, voice).

Sign that it is incomplete: colors without an exact value, no `primary`, components without a focus state, text/background pairs without a calculated contrast.

## ARCHITECTURE.md

- Diagram or list of components and how they communicate.
- Main decisions with their reason (or a link to each ADR in `docs/architecture/adr/`).
- High-level data model.
- External integrations and their contracts.
- How each key non-functional requirement of `PRODUCT.md` is met.
- Boundaries: what must not depend on what.

Sign that it is outdated: it names modules, services or dependencies that do not exist in the code.

## CONTRIBUTING.md

- Branching and review flow.
- Commit and pull request format.
- Code conventions that the lint does not cover (names, organization, error handling).
- Definition of done.
- How to set up the local environment.

## TESTING.md

- Test levels in use and what each one covers.
- Tools and commands.
- What must always have a test and what does not need one.
- Thresholds (coverage, performance) and where they are verified.
- Test data and environments.

## SECURITY.md

- How to report a vulnerability.
- Assets and sensitive data that are protected.
- Authentication, authorization and secrets handling.
- Applicable regulatory requirements.
- Link to the threat model in `docs/security/`.

## OPERATIONS.md

- Environments and how to deploy to each.
- How to roll back a deployment.
- Configuration variables (names, never secret values).
- What is monitored, alerts and who receives them.
- Backup and recovery, with target times.

## CHANGELOG.md

- One entry per version, the most recent on top, with a date.
- Changes grouped: added, changed, deprecated, removed, fixed, security.
- Incompatible changes flagged with how to migrate.

## ROADMAP.md

- Milestones with a date or quarter and what each delivers.
- What is in progress, what comes next and what was discarded.
- Open risks with an owner.
- External dependencies.

## What does not go in a primitive

- Discussions, discarded alternatives and meeting notes: they go in `docs/<phase>/`.
- Long lists (the full backlog, all the test cases): they go in `docs/` and are linked.
- Secrets, credentials or personal data: in no file of the repository.
