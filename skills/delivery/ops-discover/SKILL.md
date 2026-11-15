---
name: ops-discover
description: "Use before deciding how a system is deployed and operated, to gather what conditions it: where it must run, who operates it, required environments, availability and recovery objectives, release frequency, budget, regulation on data location and what automation already exists. Also use to inventory how a project is deployed today from its configuration. Applies when the user asks where to host the application, how to set up CI/CD or what is needed to go to production. Do not use to define the process (ops-define)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "delivery"
  reads: "PRODUCT.md, ARCHITECTURE.md, SECURITY.md, AGENTS.md"
  writes: "docs/delivery/environment.md"
---

# Delivery and operations discovery

You gather what needs to be known before deciding how the software gets to production and how it is kept running. The result feeds `ops-define`.

## Principles

- **No choosing a provider or tool yet.** Record preferences with who asks for them and why.
- **Who operates decides almost everything.** A team of two people with no on-call cannot sustain what a platform team can. Ask this before anything else.
- **Availability objectives have a number and a cost.** Each additional nine costs; whoever asks for it must know that.
- **Never invent.** Each piece of data has a source; the rest is an assumption or an open question.
- Respond in the user's language.

## Choose the mode

| Situation | Mode |
| :--- | :--- |
| A project that is not yet deployed | A. Gather |
| A project already deployed or with automation | B. Inventory, then A for what is missing |

## A. Gather

Take from the primitives what is already defined and ask only what is missing, in one single message.

| Block | What you must leave knowing |
| :--- | :--- |
| 1. Operations | Who deploys, who handles failures and in what schedule, with what experience |
| 2. Hosting | Imposed provider or infrastructure, existing accounts, region and data location constraints |
| 3. Environments | Which ones are needed (development, test, staging, production) and for whom |
| 4. Availability | Real hours of use, how long it can be down, possible maintenance windows |
| 5. Recovery | How much data can be lost at most and how long until operations must resume |
| 6. Releases | How often they want to publish, who approves, whether staged releases or quick rollback are needed |
| 7. Budget | Monthly cap for infrastructure and tools |
| 8. What exists | CI, artifact repository, monitoring, secrets manager, domains and certificates |
| 9. Data | Size, growth, current backups, data to migrate |

Translate availability into time so that what is being asked for is understood: 99% is about 7 hours of downtime per month; 99.9%, about 43 minutes; 99.99%, about 4 minutes.

## B. Inventory

Read the repository before asking and cite the path of each piece of data:

- CI configuration and what each stage does.
- Container, orchestration and infrastructure-as-code files.
- Deployment and database scripts (migrations, seeds).
- Environment variables the code expects (names only, never values).
- Configuration of logging, metrics, alerts and health checks.
- Existing deployment documentation, and whether it matches the above.

Point out manual steps, what depends on one person's machine and what nobody knows how it was done.

## Output

1. **Constraints table:** ID | Block | Data | Measure | Source | Certainty (fact / assumption).
2. **Objectives**, each with a number: availability, maximum data loss, maximum recovery time, release frequency.
3. **Current state** (mode B): what is automated, what is manual and what does not exist.
4. **Tensions:** objectives that the team or the budget cannot sustain.
5. **Open questions**, by recipient, indicating which ones block.

## Gotchas

- "Always available" is almost never what is needed. Ask what really happens if it does not work for an hour on a Sunday.
- Having backups is not being able to recover: ask when one was last restored.
- Secrets, domains and certificates are often in one person's name. Find out who has the access.
- Do not record secret values or credentials in any file; only where they live and who administers them.

## Project context

- **Read before asking:** `PRODUCT.md` (availability, volumes, operating environment), `ARCHITECTURE.md` (deployable components, stores, integrations), `SECURITY.md` (secrets, regulation) and `AGENTS.md` (stack and commands).
- **Write** `docs/delivery/environment.md`. If it exists, update the rows that change and keep the IDs.
- If there is no repository or files cannot be written, deliver the content in the conversation under that file name.

## Closing every response

End with the questions that block and the next step: `ops-define` once the objectives have a number and it is known who operates.
