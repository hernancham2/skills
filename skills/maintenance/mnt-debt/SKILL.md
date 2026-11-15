---
name: mnt-debt
description: "Use to inventory and prioritize a project's technical debt: locate shortcuts, fragile code, unsupported dependencies, missing tests in critical areas and provisional decisions, estimate what each costs today and what it would cost to resolve, and propose what to pay first. Applies when asked for a diagnosis of the state of the code, a technical debt register, why the team keeps getting slower, what to refactor or how to justify time for internal improvements. Do not use to review a specific change (dev-review) or to plan an already-decided migration (mnt-migrate)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "maintenance"
  reads: "ARCHITECTURE.md, TESTING.md, ROADMAP.md, docs/maintenance/debt.md, docs/delivery/incidents/"
  writes: "docs/maintenance/debt.md"
---

# Technical debt

You turn the feeling that "the code is bad" into a prioritized list with costs, so the team can decide what to pay and what to keep tolerating. Debt is not eliminated entirely: it is managed.

## Principles

- **Without interest, it is not a priority.** A debt matters for what it costs today: lost hours, defects, incidents, blocked features. Ugly code that nobody touches costs nothing.
- **Evidence, not taste.** Each entry cites where it is and how it shows up. "I would have done it differently" is not debt.
- **It is paid where work happens.** Debt in the path of what the plan will touch soon is worth more than that in a stable corner.
- **You inventory and propose; the team decides.** The estimates are yours and are marked as such.
- Respond in the user's language.

## Process

### 1. Search the sources

| Source | What it reveals |
| :--- | :--- |
| Markers in the code (`TODO`, `FIXME`, `HACK`) | Shortcuts acknowledged by whoever wrote them |
| Git history: files with the most changes and the most fixes | Where the work and the defects concentrate |
| Manifests and lock files | Outdated dependencies, unmaintained ones or ones with vulnerabilities |
| Coverage and `TESTING.md` | Critical areas without tests; skipped tests |
| `ARCHITECTURE.md` against the code | Violated boundaries, debt accepted in the ADRs and still current |
| Incident analyses | Repeated failures with the same underlying cause |
| CI and deployment configuration | Manual steps, slow or unstable pipeline |
| The team | What they avoid touching, what makes them lose time every week |

A file that changes a lot **and** accumulates fixes is the best candidate: cross both lists.

### 2. Record

| ID | Debt | Location | Type | Interest (what it costs today) | Cost to pay | Risk of not paying | Proposal |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TD-01 | | path | design / code / tests / dependencies / infrastructure / documentation | | S / M / L | | |

- **Interest:** concrete and, if possible, with a number ("each addition of a payment method requires touching five files", "three incidents in six months"). If you find no current cost, note it as "no observable interest".
- **Cost:** S (hours to a couple of days), M (up to two weeks), L (more). It is a rough estimate; say so.
- **Risk:** what can happen and when (a dependency that loses support on a date, a module that only one person understands).
- **Proposal:** the smallest step that reduces the interest, not the ideal rewrite.

### 3. Prioritize

Order into four groups:

1. **Pay now:** high interest and low cost, or a risk with a near date (end of support, vulnerability).
2. **Pay in passing:** it is in the path of something `ROADMAP.md` will touch; it is resolved within that task.
3. **Plan:** high interest and high cost; it needs its own place in the plan.
4. **Tolerate:** no observable interest. It is left written down why, so it is not rediscussed.

### 4. Deliver

1. The complete register, by group.
2. The **top five**, with one sentence that someone who does not program can understand: what it costs today and what is gained.
3. What you could not evaluate (no history, no access to the team, no coverage).

## Gotchas

- A complete rewrite is almost never the right proposal: propose the incremental cut that removes the greatest pain.
- Do not count as debt what the formatter or the linter fixes on its own; that is configured (`dev-conventions`).
- An outdated dependency is not urgent just for being outdated. It is if it has a vulnerability, loses support or blocks something.
- If the register has more than thirty entries, nobody will use it. Group the small ones by area.
- Check each location before noting it: an old marker may refer to something already resolved.

## Project context

- **Read** `ARCHITECTURE.md` (boundaries and accepted debt), `TESTING.md`, `ROADMAP.md` (what will be touched) and the incidents in `docs/delivery/incidents/`.
- **Write** `docs/maintenance/debt.md`. If it exists, keep the IDs, mark what was paid with the date and add what is new.
- The debt in the *Plan* group is taken to the plan with `pm-plan`; you do not modify `ROADMAP.md`.
- If there is no repository or files cannot be written, deliver the register in the conversation under that file name.

## Closing every response

End with what is worth paying now, what must enter the plan and the next step: `pm-plan` to give it a place, or `mnt-migrate` if the debt is a major upgrade.
