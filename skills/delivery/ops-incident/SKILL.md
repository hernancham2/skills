---
name: ops-incident
description: "Use during or after a production failure: to organize the response while it happens (mitigate, record the timeline, communicate) and, once resolved, to write the blameless post-incident analysis with impact, timeline, causes, what worked and actions with owners. Applies when the system is down or degraded, when a postmortem, an incident report or a root cause analysis is requested, or to understand why something failed in production. Do not use to debug a defect in development or to define the incident process (ops-define)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "delivery"
  reads: "OPERATIONS.md, ARCHITECTURE.md, docs/delivery/incidents/"
  writes: "docs/delivery/incidents/"
---

# Incident response and analysis

You help an incident be resolved in an orderly way and leave learning behind. During the incident, the first thing is to restore the service; understanding why comes after.

## Principles

- **Mitigate before diagnosing.** Rolling back, disabling the feature or redirecting traffic comes before finding the cause.
- **Blameless.** People acted with the information they had. The question is what allowed the failure to happen and not be detected earlier, never who caused it. "Human error" is not a cause: it is the point where the analysis begins.
- **Facts with a time.** Each statement in the timeline has a source: a log, an alert, a message, a deployment.
- **Actions have an owner and a date,** or they will not be done.
- **Do not make changes in production** unless the person asks explicitly. Propose the command and explain its effect.
- Respond in the user's language.

## Choose the mode

| Situation | Mode |
| :--- | :--- |
| The failure is happening | A. During the incident |
| It has already been resolved | B. Post-incident analysis |

## A. During the incident

Keep responses short. In this order:

1. **What is seen:** symptom, since when, whom it affects. Set the severity with the criteria in `OPERATIONS.md`.
2. **What changed:** last deployment, configuration change, migration, traffic peak, third-party failure. Most incidents follow a change.
3. **Fastest and safest mitigation:** almost always, rolling back with the procedure in `OPERATIONS.md`. State the effect and the risk of each option.
4. **Live timeline:** note each fact and each action with its time. It is the hardest thing to reconstruct afterwards.
5. **Communication:** a short message for those affected with what is happening, whom it affects, what is being done and when the next update will be. Without speculating about the cause.
6. **Preserve the evidence** before restarting or cleaning up: logs, metrics, state.

When the service is restored, say so, record the time and move on to mode B within the following days, while the memory is fresh.

## B. Post-incident analysis

Fill in [assets/incident.template.md](assets/incident.template.md) and save it to `docs/delivery/incidents/YYYY-MM-DD-short-title.md`.

1. **Gather the facts:** logs, alerts, history of deployments and changes, team messages. Ask for what is missing; do not fill gaps in the timeline with assumptions.
2. **Impact, with numbers:** whom it affected, how many users or operations, how long it lasted, what data was lost or altered, which objective in `OPERATIONS.md` was missed.
3. **Timeline**, with a single declared time zone: start, detection, first response, mitigation, resolution. Calculate the time to detect and to mitigate.
4. **Causes.** Ask "why" repeatedly until you reach something that can be changed in the system or in the process. There are usually several contributing causes; list them all:
   - What triggered the failure?
   - Why did the system allow it? (missing validation, test, limit)
   - Why was it not detected earlier? (missing or ignored alert)
   - Why did it take long to mitigate? (missing procedure, access, slow rollback)
5. **What worked** and is worth keeping.
6. **Actions**, each classified as *prevent*, *detect* or *mitigate*, with an owner (role) and a date. Prefer few actions that change the system over many that ask to "be more careful".

After the document, say which primitives should change and with which skill: a new alert or procedure in `OPERATIONS.md` (`ops-define`), a regression test (`qa-cases`), a control in `SECURITY.md` (`sec-define`), a risk in the register (`pm-risks`).

## Gotchas

- "Be more careful", "review better" and "train the team" are not actions: they change nothing verifiable. Look for which automatic control would have stopped the failure.
- The cause is not the last change that was made, but why that change could reach production and break something.
- Do not name people in the document; use roles.
- If the incident exposed personal data or was an attack, there are notification obligations that you do not decide: say so at the start and recommend involving whoever is responsible.
- Do not publish secrets, customer data or details that make it easier to repeat an attack in the document.

## Project context

- **Read** `OPERATIONS.md` (severities, rollback, alerts), `ARCHITECTURE.md` and the earlier incidents in `docs/delivery/incidents/` to detect repetitions.
- **Write** one file per incident in `docs/delivery/incidents/`. You do not modify `OPERATIONS.md`: you propose the changes.
- If there is no repository or files cannot be written, deliver the analysis in the conversation under the suggested file name.

## Closing every response

During the incident: the immediate next step and the time of the next update. Afterwards: the actions with owners and the primitives to update.
