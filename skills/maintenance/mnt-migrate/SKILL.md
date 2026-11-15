---
name: mnt-migrate
description: "Use to plan a large technical change without stopping the product: upgrading a major version of a language, framework or dependency, changing database, vendor or library, migrating data, retiring a version of an API or removing a feature. It produces a plan of reversible steps with verification, a point of no return and a deprecation calendar. Applies when a migration plan, how to upgrade something with breaking changes, how to deprecate or retire something or how to replace an old system is requested. Do not use to record the changes of a release (mnt-changelog)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "maintenance"
  reads: "ARCHITECTURE.md, TESTING.md, OPERATIONS.md, CHANGELOG.md, docs/maintenance/migrations/"
  writes: "docs/maintenance/migrations/"
---

# Migrations and deprecations

You plan how to move from the old to the new in small steps, each checkable and reversible, with the system working the whole time.

## Principles

- **Incremental by default.** The old and the new coexist until the new proves it works. A big-bang change is only justified if the scope is small and it can be reversed in minutes.
- **Safety net before starting.** Without tests that cover what is going to be migrated, the first step is to write them.
- **Each step leaves the system deployable** and says how it is checked and how it is undone.
- **The official guide rules.** The breaking changes of a version are read in its current documentation and release notes, not remembered.
- **Retiring something is a process with dates,** not a deletion.
- Respond in the user's language.

## Process

### 1. Define the destination and the reason

What is migrated, from which version or system to which, why now (end of support, vulnerability, needed feature, cost) and what happens if it is not done. If the reason is not clear, say so: a migration without a reason is new debt.

### 2. Measure the scope

- **Usages:** search the repository for everything that depends on what changes (imports, calls, configuration, scripts, CI, documentation). Give the number of files and points of use.
- **External consumers:** who uses the API, the format or the function that changes, and how to notify them.
- **Data:** volume, format and how long it takes to convert.
- **Breaking changes:** consult the official migration guide and the release notes of each intermediate version and list those that affect this project, with the point of use of each.

### 3. Choose the strategy

| Strategy | When |
| :--- | :--- |
| Expand, migrate, contract | Schema or interface changes: the new is added, usages are moved little by little and in the end the old is removed |
| Gradual replacement | Replacing a module or system: a layer routes more and more cases to the new one |
| Feature flag | The new is deployed switched off and activated by percentage or by group |
| Dual write | Store migration: both are written, compared and then the read is switched |
| Version by version | An upgrade that skips several major versions: one at a time, with the system stable between jumps |
| All at once | Only if there are few points of use, there are tests and the rollback is immediate |

### 4. Write the plan

Save it to `docs/maintenance/migrations/migration-name.md`.

| Step | What is done | How it is checked | How it is undone | Deployable |
| :--- | :--- | :--- | :--- | :--- |
| 0 | Complete the tests of what is affected | Suite green | Not applicable | yes |
| 1 | | | | |

Also include:

- **Point of no return:** the step after which going back implies data loss or considerable work, and what must be met before crossing it.
- **Success criterion** of the complete migration, measurable.
- **What is watched** during the coexistence: errors, differences between the old and the new, performance.
- **Cleanup:** removing the old code, the flags and the dual write is part of the plan, with a date. A half-finished migration costs double to maintain.

### 5. If something that others use is retired

1. **Announce** in advance: what is retired, when and what the alternative is. Record it as *Deprecated* in `CHANGELOG.md` (`mnt-changelog`).
2. **Warn on use:** a warning in the response, in the log or in the interface.
3. **Measure** who still uses it before the date.
4. **Retire** in a major version and record it as *Removed* with the steps to adapt.

The period between the announcement and the removal is decided by a person; propose one based on how many consumers there are and how much it costs them to adapt.

## Gotchas

- Do not take the breaking changes of a version for granted: guides change and memory fails. Cite the source consulted.
- Transitive dependencies also change with a major upgrade; check the lock file.
- Migrating data without a verified restorable backup is not reversible, whatever the plan says.
- If the migration touches the schema, each step must coexist with the previous version of the code (`OPERATIONS.md`).
- Do not run the migration: you deliver the plan. The steps are implemented with `dev-implement`, one per change.

## Project context

- **Read** `ARCHITECTURE.md` (what depends on what), `TESTING.md` (safety net), `OPERATIONS.md` (deployment, rollback and database migrations) and `CHANGELOG.md`.
- **Write** one file per migration in `docs/maintenance/migrations/`, and update in it the status of each step as it progresses.
- When finished, indicate which primitives change: `ARCHITECTURE.md` and an ADR if a decision changes (`arch-define`), `AGENTS.md` if versions or commands change (`pm-context`).
- If there is no repository or files cannot be written, deliver the plan in the conversation under the suggested file name.

## Closing every response

End with the first step, the point of no return, what remains to be confirmed and who must approve the plan.
