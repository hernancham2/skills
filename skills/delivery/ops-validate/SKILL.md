---
name: ops-validate
description: "Use before going to production or before a major launch, to check that the system is ready to operate: reproducible deployment, tested rollback, backups that can be restored, alerts that notify, secrets outside the repository, capacity against the expected load and procedures for when something fails, checked against OPERATIONS.md. Applies when a production-readiness review, a launch checklist or knowing whether it can be released is requested. Do not use to define the process (ops-define)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "delivery"
  reads: "OPERATIONS.md, PRODUCT.md, ARCHITECTURE.md, SECURITY.md, TESTING.md"
  writes: "docs/delivery/review.md"
---

# Production readiness

You check, point by point and with evidence, that the system can be deployed, monitored and recovered. What is written down but was never tested counts as pending.

## Principles

- **Evidence or pending.** Each point is marked *verified* (with the proof: command output, date of a rehearsal, path of a file), *declared* (the document says so, nobody tested it) or *missing*. There is no "probably".
- **What was not rehearsed does not work.** A rollback or a restore that was never run is treated as nonexistent.
- **Proportional to the risk.** An internal system does not need the same as a public one. State at the start which level you apply and why.
- **Do not run anything against production** without explicit permission. Read configuration and ask the person to run whatever is needed.
- Respond in the user's language.

## Process

Go through each block. For each point, look for the evidence in the repository; whatever is not there, ask about it in one single message.

### 1. Deployment

- [ ] It can be deployed from scratch following only `OPERATIONS.md`, with no steps that are in someone's head.
- [ ] The pipeline runs the tests that `TESTING.md` requires and blocks when they fail.
- [ ] The same artifact that was tested is the one that reaches production.
- [ ] More than one person can deploy.

### 2. Rollback

- [ ] The procedure is written with exact steps.
- [ ] It was rehearsed at least once; how long it takes is known.
- [ ] Pending migrations are compatible with the previous version of the code.

### 3. Data

- [ ] Backups run on their own and there is a notification if they fail.
- [ ] A backup was restored in a separate environment and the time was measured; it meets the recovery objective.
- [ ] Backups are in a different location from the data and encrypted.
- [ ] If there is data to migrate from a previous system, the migration was rehearsed with a real copy.

### 4. Observability

- [ ] Logs arrive at a queryable place and contain no data forbidden by `SECURITY.md`.
- [ ] There are metrics for errors, latency and traffic per component.
- [ ] Health checks include the dependencies.
- [ ] Each defined alert was triggered at least once on purpose and reached whoever it should.
- [ ] Each alert has a procedure.

### 5. Capacity and performance

- [ ] There is a load test with the peak volume from `PRODUCT.md` and the thresholds are met.
- [ ] It is known what saturates first and at what load.
- [ ] There are rate limits and limits on input size.

### 6. Operational security

- [ ] No secret in the repository or in its history; those in production are different from other environments.
- [ ] Access to production is limited to those who need it, and it is known who they are.
- [ ] TLS everywhere; certificates and domains with automatic renewal or an expiry warning.
- [ ] Debug mode and test accesses disabled.
- [ ] No open critical or high findings from `sec-review`.

### 7. Dependency failures

- [ ] For each integration in `ARCHITECTURE.md`: what happens if it does not respond is defined and tested.
- [ ] There are maximum wait times and bounded retries.

### 8. People and process

- [ ] It is known who responds to a failure, in what schedule and how they are notified.
- [ ] It is defined how and to whom an outage is communicated.
- [ ] There is a plan for launch day: order of the steps, criterion to abort and owner.

## Output

1. **Verdict:** ready / ready with conditions / not ready, with the justification in one sentence.
2. **Checklist table:**

   | Point | Status | Evidence or what is missing | Severity |
   | :--- | :--- | :--- | :--- |
   | | verified / declared / missing / not applicable | | blocking / important / minor |

   These always block: there is no rehearsed rollback, there is no tested restore, there are exposed secrets, there is nobody who receives the alerts, or a must-have objective in `PRODUCT.md` is not met.
3. **Conditions to publish**, as an ordered list.
4. **Risks accepted if it is published this way**, for someone with authority to sign off.

## Gotchas

- Do not mark *verified* just because you read that the document says so. That is *declared*.
- A load test against an environment much smaller than production, or with an empty database, proves nothing.
- Points marked *not applicable* carry the reason; they are the ones most often used to skip work.
- Do not include secret values or internal addresses in the report.

## Project context

- **Read** `OPERATIONS.md` and, to cross-check, the objectives in `PRODUCT.md`, the integrations in `ARCHITECTURE.md`, `SECURITY.md` and `TESTING.md`.
- **Do not modify** `OPERATIONS.md`: corrections go through `ops-define`.
- If the user asks to keep the report, save it to `docs/delivery/review.md` with the date.

## Closing every response

End with the blocking conditions, who must resolve each one and which rehearsal is best done first. Corrections to the process go through `ops-define`; once the conditions are met, the release can proceed.
