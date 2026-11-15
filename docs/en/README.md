# Documentation

**English** · [Español](../es/README.md) · [Back to the project page](../../README.md)

Everything about how this repository is organized and how its skills are written. The English files are the source of truth; each one has a Spanish copy in [`docs/es/`](../es/README.md).

## Guides

| Guide | Read it to |
| --- | --- |
| [Skill standard](standard.md) | Write or change a skill: naming, frontmatter, how to write the description, body sections, versioning. |
| [Project context](context.md) | Understand which files skills read and write, who owns each one and in which order they are produced. |
| [Publishing and installation](publishing.md) | Install the skills in each agent or publish your own fork. |

## Catalog

<!-- CATALOG:START -->

### Requirements (`req-`) → `PRODUCT.md`

Elicitation, analysis, specification and validation of requirements.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`req-elicit`](../../skills/requirements/req-elicit/SKILL.md) | Use at the start of a software project or feature to discover needs: identify stakeholders, prepare interviews, workshops, surveys or observation, and process raw notes or transcripts from those sessions. | `PRODUCT.md`<br>`docs/requirements/findings.md` | `docs/requirements/findings.md` | 2.0.0 |
| [`req-specify`](../../skills/requirements/req-specify/SKILL.md) | Use when information has already been gathered (findings, notes, documents) and it must be analyzed, classified by level, prioritized and written up as requirements: vision, user stories with acceptance criteria, functional, non-functional and backlog. Also to assess the impact of a requested change. | `PRODUCT.md`<br>`docs/requirements/findings.md`<br>`docs/requirements/validation.md` | `PRODUCT.md`<br>`docs/requirements/specification.md` | 2.0.0 |
| [`req-validate`](../../skills/requirements/req-validate/SKILL.md) | Use to review requirements that are already written (stories, specification, backlog, client document) before estimating or building: detect ambiguity, contradictions, gaps and non-verifiable requirements, and plan how to validate them with stakeholders. | `PRODUCT.md`<br>`docs/requirements/specification.md` | `docs/requirements/validation.md` | 2.0.0 |

### Visual design and brand (`des-`) → `DESIGN.md`

Design discovery, visual guidelines (logo, color, typography, components), screen navigation and their validation.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`des-discover`](../../skills/design/des-discover/SKILL.md) | Use at the start of a software project or product when it is not yet decided how it will look: to gather what is needed before choosing a logo, colors, typography or visual style, prepare questions for the client about design or brand, inventory an existing brand, or organize brand manuals, screenshots, references and notes into a design brief. Applies even if the user only says they want the app to look good or professional. Do not use to write the guidelines (des-guidelines) or for functional requirements (req-elicit). | `PRODUCT.md` | `docs/design/brief.md` | 0.3.0 |
| [`des-guidelines`](../../skills/design/des-guidelines/SKILL.md) | Use when the design guidelines of a software project must be defined or completed and saved in DESIGN.md: color palette, type scale, spacing, shapes, components and their states, logo usage rules, iconography, motion, accessibility, voice and design tokens. Applies when a style guide, a visual identity manual for software, an initial design system or a DESIGN.md is requested, from a brief or from an existing brand. Do not use to gather the starting information (des-discover) or to review guidelines that are already written (des-validate). | `PRODUCT.md`<br>`docs/design/brief.md`<br>`docs/design/review.md` | `DESIGN.md` | 0.4.0 |
| [`des-navigation`](../../skills/design/des-navigation/SKILL.md) | Use when it must be defined which screens an application has and how users move from one to another, before designing or building them: screen inventory, navigation map, step-by-step user flows, the states of each screen (empty, loading, error) and access by role. Applies when the app flow, a sitemap, the menu structure, wireflows, or where the user enters and leaves is requested. Do not use for the visual look (des-guidelines) or to decide which functions exist (req-specify). | `PRODUCT.md`<br>`DESIGN.md`<br>`docs/requirements/specification.md`<br>`docs/design/navigation.md` | `docs/design/navigation.md` | 0.2.0 |
| [`des-validate`](../../skills/design/des-validate/SKILL.md) | Use when design guidelines that are already written must be reviewed, audited or validated before building on them: a DESIGN.md, a style guide, a brand manual applied to software, a color palette or a tokens file. It detects insufficient contrast under WCAG, missing sections, inconsistent values, rules that are ambiguous or impossible to implement, and decisions unsupported by the brief. Also use to check whether a pair of colors is legible or accessible. Do not use to create the guidelines (des-guidelines). | `DESIGN.md`<br>`PRODUCT.md`<br>`docs/design/brief.md`<br>`docs/design/navigation.md` | `docs/design/review.md` | 0.4.0 |

### Architecture and technical design (`arch-`) → `ARCHITECTURE.md`

Architecture decisions, system design, APIs and data models.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`arch-define`](../../skills/architecture/arch-define/SKILL.md) | Use when the architecture decisions of a software project must be made and written down: system style, stack, components and their boundaries, data model, integrations and how each quality requirement is met, in ARCHITECTURE.md and in decision records (ADRs). Applies when asked to design the architecture, choose between technologies, document a technical decision, write an ADR or design the data schema or an API at a high level. Do not use to gather the conditioning factors (arch-discover) or to review an architecture that is already written (arch-validate). | `PRODUCT.md`<br>`ARCHITECTURE.md`<br>`docs/architecture/drivers.md`<br>`docs/architecture/review.md` | `ARCHITECTURE.md`<br>`docs/architecture/adr/` | 0.1.0 |
| [`arch-discover`](../../skills/architecture/arch-discover/SKILL.md) | Use before deciding the architecture or technology of a software project, to gather what conditions those decisions: quality attributes with numbers, constraints, volumes, integrations, existing data and team capabilities. Also use to inventory the architecture of an existing system from its code. Applies when the user asks which stack to use, whether they need microservices, which database to pick or how to start the technical design: first you must know what conditions it. Do not use to make the decisions (arch-define). | `PRODUCT.md`<br>`docs/requirements/specification.md` | `docs/architecture/drivers.md` | 0.1.0 |
| [`arch-validate`](../../skills/architecture/arch-validate/SKILL.md) | Use to review an architecture before building on it or when there are doubts it will hold: check that ARCHITECTURE.md or a technical proposal meets the quality requirements, find single points of failure, performance, data consistency and integration risks, unjustified complexity, and differences between what is documented and the code. Applies when an architecture review, a second opinion on a technical design, or whether the system will scale is requested. Do not use to review code line by line (dev-review). | `ARCHITECTURE.md`<br>`PRODUCT.md`<br>`docs/architecture/drivers.md`<br>`docs/architecture/adr/` | `docs/architecture/review.md` | 0.1.0 |

### Development (`dev-`) → `CONTRIBUTING.md`

Coding conventions, implementation, refactoring, code review and debugging.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`dev-conventions`](../../skills/development/dev-conventions/SKILL.md) | Use when starting to code a project or tidying an existing one, to define how code is written and integrated and save it in CONTRIBUTING.md: branching flow, commit and pull request format, naming and structure conventions, error handling, definition of done, and what is automated with lint, formatting and CI. Applies when asked for a code style guide, development standards, rules for the team or for agents, or to detect the conventions a repository already follows. Do not use to review a specific change (dev-review). | `AGENTS.md`<br>`ARCHITECTURE.md`<br>`CONTRIBUTING.md`<br>`docs/development/detected-conventions.md` | `CONTRIBUTING.md`<br>`docs/development/detected-conventions.md` | 0.1.0 |
| [`dev-implement`](../../skills/development/dev-implement/SKILL.md) | Use when implementing a feature, story, task or fix in a project that has context files (AGENTS.md, PRODUCT.md, ARCHITECTURE.md, CONTRIBUTING.md, TESTING.md, DESIGN.md): read what is already decided, plan in small increments, build with tests, verify against the acceptance criteria and warn when the change requires updating the context. Applies when asked to build, program, add or develop something of the product. Do not use for trivial one-line changes or for only reviewing someone else's code (dev-review). | `AGENTS.md`<br>`PRODUCT.md`<br>`DESIGN.md`<br>`ARCHITECTURE.md`<br>`CONTRIBUTING.md`<br>`TESTING.md`<br>`SECURITY.md`<br>`docs/requirements/specification.md`<br>`docs/design/navigation.md` | — | 0.1.0 |
| [`dev-review`](../../skills/development/dev-review/SKILL.md) | Use to review a code change (a diff, a branch, a pull request or specific files) against what the project has already decided: that it meets the requirement and its acceptance criteria and respects the boundaries in ARCHITECTURE.md, the rules in SECURITY.md, the tests that TESTING.md requires, the conventions in CONTRIBUTING.md and the tokens in DESIGN.md. Applies when a code review, a second opinion before merging, or checking whether a change is ready is requested. Do not use for an in-depth security audit (sec-review) or to review the whole architecture (arch-validate). | `AGENTS.md`<br>`PRODUCT.md`<br>`DESIGN.md`<br>`ARCHITECTURE.md`<br>`CONTRIBUTING.md`<br>`TESTING.md`<br>`SECURITY.md` | — | 0.1.0 |

### Testing and quality (`qa-`) → `TESTING.md`

Test strategy, test cases, automation and quality assurance.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`qa-cases`](../../skills/testing/qa-cases/SKILL.md) | Use to derive test cases from requirements, user stories, acceptance criteria or business rules: normal, error and exception cases, boundary values, combinations of conditions and state transitions, with traceability to each requirement. Applies when asked to design test cases, a traceability matrix, test scenarios, what to test for a specific feature, or to write the tests of a requirement. Do not use to decide levels, tools and thresholds (qa-strategy). | `PRODUCT.md`<br>`TESTING.md`<br>`docs/requirements/specification.md`<br>`docs/testing/cases.md`<br>`docs/testing/review.md` | `docs/testing/cases.md` | 0.1.0 |
| [`qa-strategy`](../../skills/testing/qa-strategy/SKILL.md) | Use when defining how a software project will be tested and saving it in TESTING.md: which risks to cover, which test levels to use (unit, integration, end-to-end, performance, accessibility), which tools, which thresholds, which data and when each thing runs. Applies when a test strategy or test plan is requested, to decide what to test and what not to, to set the minimum coverage or to set up the testing base of a new project or one without tests. Do not use to write the specific cases (qa-cases) or to evaluate existing tests (qa-validate). | `PRODUCT.md`<br>`ARCHITECTURE.md`<br>`AGENTS.md`<br>`TESTING.md`<br>`docs/requirements/specification.md`<br>`docs/testing/review.md` | `TESTING.md`<br>`docs/testing/risks.md` | 0.1.0 |
| [`qa-validate`](../../skills/testing/qa-validate/SKILL.md) | Use to evaluate the tests a project already has and know whether they can be trusted: which requirements and risks remain uncovered, tests that could never fail, unstable or slow tests, excess mocking, non-functional thresholds without verification and differences from what TESTING.md requires. Applies when asked to audit the test suite, to know whether coverage is sufficient, why the tests do not catch errors or whether the project is ready to ship from a quality standpoint. Do not use to define the strategy (qa-strategy) or to design new cases (qa-cases). | `TESTING.md`<br>`PRODUCT.md`<br>`AGENTS.md`<br>`docs/testing/risks.md`<br>`docs/testing/cases.md` | `docs/testing/review.md` | 0.1.0 |

### Security (`sec-`) → `SECURITY.md`

Threat modeling, security policy and security review.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`sec-define`](../../skills/security/sec-define/SKILL.md) | Use to define a software project's security policy and save it in SECURITY.md: how to report vulnerabilities, data classification, authentication, role-based authorization, secrets handling, input validation, dependencies, audit logging, encryption and applicable regulation. Applies when a security policy or guidelines, security requirements for the team, defining roles and permissions, or how to handle credentials and personal data is requested. Do not use to discover the threats (sec-threats) or to audit code (sec-review). | `PRODUCT.md`<br>`ARCHITECTURE.md`<br>`SECURITY.md`<br>`docs/security/threats.md`<br>`docs/security/review.md` | `SECURITY.md` | 0.1.0 |
| [`sec-review`](../../skills/security/sec-review/SKILL.md) | Use to review the security of the project's own code and configuration before releasing or after a sensitive change: access control at every entry point, injection, secrets handling, input validation, vulnerable dependencies, insecure configuration and data exposure, checked against SECURITY.md and the threat model. Applies when a security audit or review, looking for vulnerabilities in the repository, or checking a change that touches authentication, permissions, payments, files or personal data is requested. Do not use for the general review of a change (dev-review). | `SECURITY.md`<br>`ARCHITECTURE.md`<br>`AGENTS.md`<br>`docs/security/threats.md` | `docs/security/review.md` | 0.1.0 |
| [`sec-threats`](../../skills/security/sec-threats/SKILL.md) | Use to identify what can go wrong in a system's security before building it or when adding something sensitive: threat modeling with assets, data flows, trust boundaries, threats by category (STRIDE), abuse cases and prioritized mitigations. Applies when a threat model, a security risk analysis, or knowing what to protect is requested, or when the design includes authentication, payments, personal data, user-uploaded files or third-party integrations. Do not use to review code that is already written (sec-review). | `PRODUCT.md`<br>`ARCHITECTURE.md`<br>`SECURITY.md`<br>`docs/security/threats.md` | `docs/security/threats.md` | 0.1.0 |

### Delivery and operations (`ops-`) → `OPERATIONS.md`

CI/CD, deployment, versioning, observability and incident response.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`ops-define`](../../skills/delivery/ops-define/SKILL.md) | Use to define how a system is delivered and operated and save it in OPERATIONS.md: environments, CI/CD pipeline and its gates, deployment strategy, how to roll back, database migrations, configuration and secrets, logging, metrics and alerts, backup and recovery, and incident process. Applies when asked to set up or document deployment, a pipeline, a runbook, the versioning strategy, monitoring or the recovery plan. Do not use to gather the constraints (ops-discover) or to check whether it is ready for production (ops-validate). | `PRODUCT.md`<br>`ARCHITECTURE.md`<br>`SECURITY.md`<br>`TESTING.md`<br>`OPERATIONS.md`<br>`docs/delivery/environment.md`<br>`docs/delivery/review.md` | `OPERATIONS.md` | 0.1.0 |
| [`ops-discover`](../../skills/delivery/ops-discover/SKILL.md) | Use before deciding how a system is deployed and operated, to gather what conditions it: where it must run, who operates it, required environments, availability and recovery objectives, release frequency, budget, regulation on data location and what automation already exists. Also use to inventory how a project is deployed today from its configuration. Applies when the user asks where to host the application, how to set up CI/CD or what is needed to go to production. Do not use to define the process (ops-define). | `PRODUCT.md`<br>`ARCHITECTURE.md`<br>`SECURITY.md`<br>`AGENTS.md` | `docs/delivery/environment.md` | 0.1.0 |
| [`ops-incident`](../../skills/delivery/ops-incident/SKILL.md) | Use during or after a production failure: to organize the response while it happens (mitigate, record the timeline, communicate) and, once resolved, to write the blameless post-incident analysis with impact, timeline, causes, what worked and actions with owners. Applies when the system is down or degraded, when a postmortem, an incident report or a root cause analysis is requested, or to understand why something failed in production. Do not use to debug a defect in development or to define the incident process (ops-define). | `OPERATIONS.md`<br>`ARCHITECTURE.md`<br>`docs/delivery/incidents/` | `docs/delivery/incidents/` | 0.1.0 |
| [`ops-validate`](../../skills/delivery/ops-validate/SKILL.md) | Use before going to production or before a major launch, to check that the system is ready to operate: reproducible deployment, tested rollback, backups that can be restored, alerts that notify, secrets outside the repository, capacity against the expected load and procedures for when something fails, checked against OPERATIONS.md. Applies when a production-readiness review, a launch checklist or knowing whether it can be released is requested. Do not use to define the process (ops-define). | `OPERATIONS.md`<br>`PRODUCT.md`<br>`ARCHITECTURE.md`<br>`SECURITY.md`<br>`TESTING.md` | `docs/delivery/review.md` | 0.1.0 |

### Maintenance and evolution (`mnt-`) → `CHANGELOG.md`

Changelog, technical debt, migrations and deprecations.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`mnt-changelog`](../../skills/maintenance/mnt-changelog/SKILL.md) | Use when preparing a release or finishing a user-visible change: update CHANGELOG.md, decide the version number according to the type of change, write release notes and the migration instructions for incompatible changes. Applies when asked for the changelog, release notes, which version applies, what changed since the last version or to prepare a release. Do not use to plan a technical migration (mnt-migrate) or for the deployment process (ops-define). | `CHANGELOG.md`<br>`PRODUCT.md`<br>`OPERATIONS.md` | `CHANGELOG.md` | 0.1.0 |
| [`mnt-debt`](../../skills/maintenance/mnt-debt/SKILL.md) | Use to inventory and prioritize a project's technical debt: locate shortcuts, fragile code, unsupported dependencies, missing tests in critical areas and provisional decisions, estimate what each costs today and what it would cost to resolve, and propose what to pay first. Applies when asked for a diagnosis of the state of the code, a technical debt register, why the team keeps getting slower, what to refactor or how to justify time for internal improvements. Do not use to review a specific change (dev-review) or to plan an already-decided migration (mnt-migrate). | `ARCHITECTURE.md`<br>`TESTING.md`<br>`ROADMAP.md`<br>`docs/maintenance/debt.md`<br>`docs/delivery/incidents/` | `docs/maintenance/debt.md` | 0.1.0 |
| [`mnt-migrate`](../../skills/maintenance/mnt-migrate/SKILL.md) | Use to plan a large technical change without stopping the product: upgrading a major version of a language, framework or dependency, changing database, vendor or library, migrating data, retiring a version of an API or removing a feature. It produces a plan of reversible steps with verification, a point of no return and a deprecation calendar. Applies when a migration plan, how to upgrade something with breaking changes, how to deprecate or retire something or how to replace an old system is requested. Do not use to record the changes of a release (mnt-changelog). | `ARCHITECTURE.md`<br>`TESTING.md`<br>`OPERATIONS.md`<br>`CHANGELOG.md`<br>`docs/maintenance/migrations/` | `docs/maintenance/migrations/` | 0.1.0 |

### Project management (`pm-`) → `ROADMAP.md`

Project context, planning, estimation, risks and progress tracking.

| Skill | Description | Reads | Writes | Version |
| --- | --- | --- | --- | --- |
| [`pm-context`](../../skills/management/pm-context/SKILL.md) | Use when starting a software project or picking one back up, to set up and maintain its context: create or update AGENTS.md as the index, diagnose which base files exist, are missing or are outdated (PRODUCT.md, DESIGN.md, ARCHITECTURE.md, CONTRIBUTING.md, TESTING.md, SECURITY.md, OPERATIONS.md, CHANGELOG.md, ROADMAP.md) and say which skill to use next. Also use when the user asks where to start, what documentation the project needs, how to give context to an AI agent or what is left to define, even if they do not name any file. | `AGENTS.md`<br>`PRODUCT.md`<br>`DESIGN.md`<br>`ARCHITECTURE.md`<br>`CONTRIBUTING.md`<br>`TESTING.md`<br>`SECURITY.md`<br>`OPERATIONS.md`<br>`CHANGELOG.md`<br>`ROADMAP.md` | `AGENTS.md` | 0.3.1 |
| [`pm-plan`](../../skills/management/pm-plan/SKILL.md) | Use to turn what has to be built into a plan: split the scope into small deliveries that provide value, order them by risk and dependency, define milestones with an exit criterion, break down tasks and estimate with ranges, and save it in ROADMAP.md. Applies when a work or implementation plan, a roadmap, a schedule, how long it will take, where to start building or how to distribute the backlog into deliveries is requested. Do not use to decide which requirements are included (req-specify) or to report progress (pm-status). | `PRODUCT.md`<br>`ARCHITECTURE.md`<br>`ROADMAP.md`<br>`docs/requirements/specification.md`<br>`docs/maintenance/debt.md`<br>`docs/management/risks.md` | `ROADMAP.md`<br>`docs/management/plan.md` | 0.2.0 |
| [`pm-risks`](../../skills/management/pm-risks/SKILL.md) | Use to identify and track the risks of a software project: what can prevent delivering it on time, with the agreed scope or with the agreed quality, with likelihood, impact, response, owner and warning sign. Applies when a risk register or matrix, an analysis of what can go wrong in the project, a contingency plan or a review of the risks before a milestone is requested. Do not use for security threats to the system (sec-threats) or for architecture risks (arch-validate). | `PRODUCT.md`<br>`ARCHITECTURE.md`<br>`ROADMAP.md`<br>`docs/management/risks.md`<br>`docs/management/plan.md` | `ROADMAP.md`<br>`docs/management/risks.md` | 0.2.0 |
| [`pm-status`](../../skills/management/pm-status/SKILL.md) | Use to know and communicate how a software project is going: compare the plan with what was actually finished, detect deviations and blockers, project when the next milestone will be reached with a range, prepare a status report and propose adjustments to the plan. Applies when a progress report, the project status, whether the date will be met, an iteration review or updating the roadmap with what happened is requested. Do not use to create the initial plan (pm-plan). | `ROADMAP.md`<br>`CHANGELOG.md`<br>`docs/management/plan.md`<br>`docs/management/risks.md`<br>`docs/management/status.md` | `ROADMAP.md`<br>`docs/management/plan.md`<br>`docs/management/status.md` | 0.2.0 |

<!-- CATALOG:END -->

## Repository structure

```text
skills/<phase>/<prefix>-<name>/SKILL.md     the skills, grouped by phase
template/SKILL.template.md                  base template for a skill
skills.config.json                          phases, prefixes and marketplace data
scripts/                                    create, validate and generate manifests
assets/logo.svg                             project logo
.claude-plugin/marketplace.json             generated; do not edit by hand
docs/en/                                    documentation in English (source of truth)
docs/es/                                    documentation in Spanish
```

## Creating a skill

```bash
npm run new -- req elicit
```

That creates `skills/requirements/req-elicit/SKILL.md` from the template. Then:

1. Fill in the `TODO`s following the [standard](standard.md).
2. `npm run validate` checks the specification and this repository's standard.
3. `npm run generate` updates the Claude marketplace, the phase overview in the main README and the catalog on this page.

`npm run check` runs the validation and fails if the generated files are out of date; it is what runs in CI.
