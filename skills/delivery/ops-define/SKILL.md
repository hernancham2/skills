---
name: ops-define
description: "Use to define how a system is delivered and operated and save it in OPERATIONS.md: environments, CI/CD pipeline and its gates, deployment strategy, how to roll back, database migrations, configuration and secrets, logging, metrics and alerts, backup and recovery, and incident process. Applies when asked to set up or document deployment, a pipeline, a runbook, the versioning strategy, monitoring or the recovery plan. Do not use to gather the constraints (ops-discover) or to check whether it is ready for production (ops-validate)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "delivery"
  reads: "PRODUCT.md, ARCHITECTURE.md, SECURITY.md, TESTING.md, OPERATIONS.md, docs/delivery/environment.md, docs/delivery/review.md"
  writes: "OPERATIONS.md"
---

# Delivery and operations definition

You decide how each change reaches production and how the system is kept up, and you leave it in `OPERATIONS.md` so that anyone on the team, or an agent, can deploy, roll back and diagnose without asking.

## Principles

- **Rolling back is defined before the first deployment.** A deployment without a tested rollback procedure is not finished.
- **The same in every environment.** A single artifact is promoted from environment to environment; the configuration changes, not the artifact.
- **Every alert has an action.** If whoever receives it can do nothing, it is noise: it becomes a dashboard or is removed.
- **The simplest thing the team can operate.** The platform the team already knows wins, unless it fails to meet an objective.
- **Commands are real.** None is written that is not in the repository or has not been run.
- Respond in the user's language.

If there are no objectives with a number (`docs/delivery/environment.md` or `PRODUCT.md`), say so and suggest `ops-discover`.

## Process

Fill in [assets/OPERATIONS.template.md](assets/OPERATIONS.template.md).

### 1. Environments

The minimum the project needs. By default: local, one pre-production as similar as possible to production, and production. For each: purpose, address, who deploys and with what data.

### 2. Pipeline

| Stage | What it does | If it fails |
| :--- | :--- | :--- |
| Verify | Lint, unit and integration tests (`TESTING.md`) | Blocks |
| Analyze | Dependencies and secrets (`SECURITY.md`) | Blocks if critical |
| Build | One versioned, immutable artifact | Blocks |
| Deploy to pre-production | Automatic from the main branch | Blocks |
| Check | Smoke and end-to-end tests | Blocks |
| Deploy to production | With manual approval, unless the team already deploys continuously | |
| Verify in production | Health check and metrics for a few minutes | Rolls back |

### 3. Deployment and rollback

- Strategy: by default, gradual replacement without downtime. State another (staged to a percentage of users, duplicated environment) only if an objective demands it.
- **Rolling back:** the exact steps, how long it takes, who can do it and what happens with the data written in the meantime.
- **Database migrations:** backward compatible. First the schema is expanded, then the code that uses it is deployed, and only later is what is old removed. That way the previous code keeps working if you have to roll back.

### 4. Configuration and secrets

Table of variables: name, what it is for, mandatory or optional, and where it is defined in each environment. Names only. The values of secrets live where `SECURITY.md` says.

### 5. Observability

- **Logging:** structured, with an identifier that follows each request between components, and without the data that `SECURITY.md` forbids.
- **Metrics:** latency, traffic, errors and saturation of each component, plus the business ones that matter.
- **Health checks:** one that says whether the process is alive and another that says whether it can serve (dependencies included).
- **Alerts:** one for each objective in `PRODUCT.md`, with a threshold, who receives it and the procedure to follow.

### 6. Backup and recovery

What is backed up, how often, where, how long it is kept and **how it is restored**, with the time it takes. It must meet the defined maximum data loss and recovery time. Set how often a restore is tested.

### 7. Incidents

Severity levels with criteria, who responds, through which channel to communicate and when a post-incident analysis is written (`ops-incident`).

### 8. Versions

Versioning scheme, how it is tagged and who publishes. The detail of the change log belongs to `mnt-changelog`.

When finished, check:

- [ ] Each objective (availability, recovery, data loss) has a mechanism and an alert or test.
- [ ] There is a rollback procedure with concrete steps.
- [ ] Each alert has a recipient and a procedure.
- [ ] No secret value appears in the file.

## Gotchas

- Do not recommend from memory the syntax of a CI provider or a platform: consult its current documentation before writing configuration.
- A health check that answers fine as long as the web server is alive, even if the database is down, hides real outages.
- Migrations that rename or delete a column in the same deployment as the code break the rollback.
- Alerting on CPU or memory use unrelated to what the user perceives creates fatigue. Alert on symptoms: errors and slowness.
- A backup stored in the same place as the original data disappears along with it.

## Project context

- **Read before asking:** `docs/delivery/environment.md`, `ARCHITECTURE.md`, `TESTING.md`, `SECURITY.md` and the objectives in `PRODUCT.md`. If `docs/delivery/review.md` exists (the output of `ops-validate`), its blocking conditions come first.
- **Write** `OPERATIONS.md` at the root. Modify only the affected sections; changing an already-defined objective or procedure requires confirmation.
- If you create or change deployment commands, say that `AGENTS.md` must be updated with `pm-context`.
- If there is no repository or files cannot be written, deliver the content in the conversation under that file name.

## Closing every response

End with what was left undefined, what must be tested before trusting it (rollback, restore, alerts) and the next step: `ops-validate` before going to production.
