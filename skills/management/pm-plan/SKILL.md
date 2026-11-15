---
name: pm-plan
description: "Use to turn what has to be built into a plan: split the scope into small deliveries that provide value, order them by risk and dependency, define milestones with an exit criterion, break down tasks and estimate with ranges, and save it in ROADMAP.md. Applies when a work or implementation plan, a roadmap, a schedule, how long it will take, where to start building or how to distribute the backlog into deliveries is requested. Do not use to decide which requirements are included (req-specify) or to report progress (pm-status)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.2.0"
  phase: "management"
  reads: "PRODUCT.md, ARCHITECTURE.md, ROADMAP.md, docs/requirements/specification.md, docs/maintenance/debt.md, docs/management/risks.md"
  writes: "ROADMAP.md, docs/management/plan.md"
---

# Planning

You turn the scope into an order of work: what is delivered first, what each delivery demonstrates and how long it is reasonable to expect it to take. `ROADMAP.md` carries the milestones; `docs/management/plan.md`, the breakdown into tasks.

## Principles

- **Vertical increments.** Each increment cuts through all the layers and serves someone. "Build the whole database" is not an increment; "a customer can register an order" is.
- **The most uncertain first.** What can sink the project (an unknown integration, a demanding performance requirement) is attacked at the start, when changing is cheap.
- **Ranges, not exact dates.** An estimate is a range with assumptions. A single number becomes a commitment without anyone deciding it.
- **Whoever does the work estimates.** You propose; the team adjusts. Without capacity data you give no dates: you give sizes and order.
- **What is left out is written down.** What is discarded and what is postponed appear in the plan with their reason.
- Respond in the user's language.

## Inputs

- The prioritized scope (`PRODUCT.md` and the specification). If there are no priorities, suggest `req-specify` first.
- The capacity: how many people, with what dedication and until when. If unknown, ask in one question; without it, deliver the plan without dates.
- Imposed dates, if any, and what happens if they are not met.

## Process

### 1. Cut into increments

1. The **first increment** is the skeleton that works end to end: the simplest main flow, deployed, with one test, even if it does very little. It proves that the architecture and the pipeline work.
2. The next ones add complete capabilities, taking must-have requirements before important ones.
3. Each increment is small enough to finish in one or two weeks. If it does not fit, it is split by case (normal first, then exceptions), by role or by rule.

### 2. Order

Apply these criteria, in this order:

1. **Dependencies:** what other increments need.
2. **Risk:** the most uncertain or what addresses a demanding driver in `ARCHITECTURE.md`.
3. **Value:** the must-have that someone real can use soonest.
4. **Cost of waiting:** what has an external date.

If there is debt in the *Plan* group of `docs/maintenance/debt.md` that gets in the way of an increment, place it before that increment.

### 3. Define milestones

Group the increments into milestones. Each milestone has:

| Milestone | Goal | Increments | Exit criterion | Estimated range |
| :--- | :--- | :--- | :--- | :--- |
| M1 | What can be done at the end | I1, I2 | Checkable by someone outside the team | |

The exit criterion is observable ("a real customer completed an order in staging"), not a list of finished tasks.

### 4. Break down the tasks of the next milestone

Only for the milestone that is coming; later ones are detailed when they get close. In `docs/management/plan.md`:

| ID | Task | Increment | Requirement | Depends on | Size | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| T-001 | | I1 | UR-03 | | S / M / L | pending |

- A task is finished in two days at most. If not, it is split.
- Include the tasks that are not code and are always forgotten: setting up environments, test data, review, deployment, documentation, data migration.

### 5. Estimate

- Relative sizes per task (S: up to half a day; M: up to a day; L: up to two days).
- Per milestone, an optimistic and a pessimistic range. What is uncertain gets a wider range, not an intermediate number.
- Write the **assumptions** each range depends on (capacity, availability of a third party, a decision being made on time).
- Explicitly reserve time for the unexpected, review and fixes; say how much and why.
- If there is an imposed date and the range does not fit, do not compress the estimate: show what fits, what is left out and what the options are (reduce scope, move the date, add capacity with its cost).

### 6. Write ROADMAP.md

Fill in [assets/ROADMAP.template.md](assets/ROADMAP.template.md): now, next, later, discarded; milestones; open risks; external dependencies.

## Gotchas

- Phases by layer (database, then server, then interface) delay all learning until the end. Cut by feature.
- Progress percentages and sizes converted into exact hours give a precision that does not exist.
- Do not give a date from sizes without real capacity: subtract vacations, support and meetings before calculating.
- Detailing the tasks of a milestone three months away is work that will be thrown away. Keep what is far away coarse.
- A plan without a list of what is left out reads as "everything is in".

## Project context

- **Read before asking:** `PRODUCT.md` and `docs/requirements/specification.md` (priorities), `ARCHITECTURE.md` (components, drivers, risks), `docs/maintenance/debt.md`, `docs/management/risks.md` and the existing `ROADMAP.md`.
- **Write** `ROADMAP.md` at the root and `docs/management/plan.md`. If they exist, keep the milestone and task IDs, and do not change dates or scope already agreed without confirmation: propose the change.
- If there is no repository or files cannot be written, deliver the content in the conversation under their file names.

## Closing every response

End with the assumptions that someone must confirm, the decisions that block the first milestone and the next step: `pm-risks` if there is no risk register, or `dev-implement` for the first task.
