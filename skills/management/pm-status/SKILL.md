---
name: pm-status
description: "Use to know and communicate how a software project is going: compare the plan with what was actually finished, detect deviations and blockers, project when the next milestone will be reached with a range, prepare a status report and propose adjustments to the plan. Applies when a progress report, the project status, whether the date will be met, an iteration review or updating the roadmap with what happened is requested. Do not use to create the initial plan (pm-plan)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.2.0"
  phase: "management"
  reads: "ROADMAP.md, CHANGELOG.md, docs/management/plan.md, docs/management/risks.md, docs/management/status.md"
  writes: "ROADMAP.md, docs/management/plan.md, docs/management/status.md"
---

# Status tracking

You compare what was planned with what actually happened and report it without embellishment, so that whoever decides can correct in time.

## Principles

- **Finished or not finished.** A task is finished when it meets the definition of done and is integrated. "90% done" is not finished.
- **Evidence before declaration.** The status comes from the repository (what is merged, deployed, the tests) and from the plan, not only from what someone says.
- **Bad news first and early.** A deviation is reported when it is detected, with its cause and with options.
- **No silent re-planning.** You propose moving a date or cutting scope; a person decides.
- Respond in the user's language.

## Process

### 1. Gather the facts

- `docs/management/plan.md` and `ROADMAP.md`: what should be done by this date.
- The repository, if you have access: what has been merged since the last report, what has been deployed, the state of the test suite.
- `docs/management/status.md`: the previous report and what was committed then.
- What you cannot verify, ask in one single message: what is blocked and why, and what changed in the team's capacity.

### 2. Classify each task of the current milestone

*Finished* (with the evidence), *in progress*, *blocked* (why and by whom) or *not started*. Point out tasks that have been in progress for more than double their estimated size: they are usually bigger than thought or blocked without anyone saying so.

### 3. Measure the real pace

How many tasks, by size, were finished per week over the last two to four weeks. That number, and not the one in the original plan, is the basis of the projection.

### 4. Project

With what is left of the milestone and the real pace, calculate a range for reaching it: the optimistic one with the best recent week and the pessimistic one with the worst. Compare it with the range committed in `ROADMAP.md`. If there is little data (less than two weeks), say so and do not project.

### 5. Analyze the deviations

For each relevant difference between plan and reality: the cause (underestimation, external blocker, added scope, lower capacity, rework due to defects) and whether it is a one-off or will repeat. Added scope without removing anything is always pointed out, with who asked for it.

### 6. Propose adjustments

If the projected range does not fit what was committed, present the options with their consequence: cut scope (what, by priority), move the date (to when), add capacity (with its cost and its start-up delay) or accept the risk. Do not choose.

### 7. Report and update

Add a dated entry at the end of `docs/management/status.md`:

```markdown
## 2026-03-14

**Status:** on track / at risk / off track
**Current milestone:** M2, exit criterion: [criterion]

**Finished since the last report**
- T-012 Order registration (merged and deployed to staging)

**In progress**
- T-014 Card payment

**Blocked**
- T-015 Reconciliation: provider credentials missing (requested on 03-02)

**Projection:** M2 between 04-01 and 04-15; committed: 03-31.

**Deviations and cause**
- ...

**Decisions needed**
- ...

**Risks that changed**
- ...
```

Status criterion: *on track* if the projected range fits within what was committed; *at risk* if only the optimistic one fits; *off track* if neither fits.

Then update the status of the tasks in `docs/management/plan.md` and, in `ROADMAP.md`, move only what has already happened (milestones met, what went from *next* to *now*). Changes of date or scope are applied when someone approves them.

If you are asked for a version for people outside the team, reduce it to: status, what was delivered, what is next, and what is needed from them.

## Gotchas

- Do not add up progress percentages: count finished tasks.
- A milestone is not met because its tasks are closed, but when its exit criterion is met.
- Projecting with the pace of the plan instead of the real one repeats the estimation error.
- Do not hide a blocker inside "in progress".
- If you did not have access to the repository and the status comes only from what you were told, say so in the report.

## Project context

- **Read** `ROADMAP.md`, `docs/management/plan.md`, `docs/management/risks.md`, `docs/management/status.md` and `CHANGELOG.md`.
- **Write** a new entry in `docs/management/status.md` (do not modify the earlier ones), the status of the tasks in `docs/management/plan.md` and, in `ROADMAP.md`, only what has already happened or been approved.
- If there is no repository or files cannot be written, deliver the report in the conversation.

## Closing every response

End with the decisions that are needed, from whom and by when, and with the risk signals worth reviewing with `pm-risks`.
