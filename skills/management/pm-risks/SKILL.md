---
name: pm-risks
description: "Use to identify and track the risks of a software project: what can prevent delivering it on time, with the agreed scope or with the agreed quality, with likelihood, impact, response, owner and warning sign. Applies when a risk register or matrix, an analysis of what can go wrong in the project, a contingency plan or a review of the risks before a milestone is requested. Do not use for security threats to the system (sec-threats) or for architecture risks (arch-validate)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.2.0"
  phase: "management"
  reads: "PRODUCT.md, ARCHITECTURE.md, ROADMAP.md, docs/management/risks.md, docs/management/plan.md"
  writes: "ROADMAP.md, docs/management/risks.md"
---

# Project risks

You maintain the register of what can divert the project, so that each risk has someone watching it and a response thought out before it happens.

## Principles

- **A risk is something that has not happened yet.** If it already happened, it is a problem: it is resolved, not recorded here.
- **Cause, event, consequence.** "Delay" is not a risk, it is the consequence of one. Without the cause there is nothing to be done about it.
- **Every risk has an owner and a signal.** A role that watches it and an observable fact that warns that it is materializing.
- **Few and alive.** Ten risks that get reviewed are worth more than fifty that were written once.
- Respond in the user's language.

## Process

### 1. Identify

Go through the categories against what the primitives and the plan say. Say explicitly when one does not apply.

| Category | Where to look | Examples |
| :--- | :--- | :--- |
| Requirements | Pending items and assumptions in `PRODUCT.md` | Scope not closed, the decision maker is unavailable, goals without a number |
| Technical | Demanding drivers, ADRs and risks in `ARCHITECTURE.md` | Technology new to the team, an undocumented integration, unverified performance |
| People | Capacity and assumptions of the plan | Knowledge concentrated in one person, part-time dedication, turnover |
| External | External dependencies in `ROADMAP.md` | A vendor, another team, an approval, an access that does not arrive |
| Schedule | Ranges in the plan against imposed dates | Fixed date with fixed scope, critical path without slack |
| Legal and security | `SECURITY.md` and regulation | Unconfirmed regulatory requirement, sensitive data without controls |
| Operations | `OPERATIONS.md` | Nobody to operate, data migration not rehearsed |

### 2. Formulate

> **If** [cause], **then** [event], **which causes** [consequence on schedule, scope, cost or quality].
>
> If the payment provider does not deliver the test credentials before milestone 2, then the charging cannot be integrated, which delays the milestone by two to four weeks.

### 3. Assess and respond

| ID | Risk | Category | Likelihood | Impact | Exposure | Response | Owner | Warning sign | Review |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| RSK-01 | | | 1–3 | 1–3 | L × I | | role | | date |

- **Likelihood:** 1 unlikely, 2 possible, 3 probable. **Impact:** 1 is absorbed, 2 moves a milestone, 3 compromises the project.
- **Response**, one of four, with the concrete action:
  - *Avoid:* change the plan so that it cannot happen.
  - *Mitigate:* reduce the likelihood or the impact now (an early proof of concept, a second vendor).
  - *Transfer:* have a third party take it on (contract, insurance, managed service).
  - *Accept:* do nothing for now, with a contingency plan and someone with authority who accepts it.
- **Warning sign:** a fact with a date or threshold that can be checked ("no credentials two weeks before the milestone").
- The assessment is your proposal; whoever knows the project adjusts it.

### 4. Take the main ones to the plan

Copy the five with the highest exposure to the **Open risks** section of `ROADMAP.md`. If the response to a risk requires work (a proof of concept, a mitigation task), indicate it so that it enters the plan with `pm-plan`.

### 5. Review

At each review: update likelihood and impact, close those that no longer apply (with a date and reason), turn into problems those that occurred and add the new ones. If a warning sign has already been met, say so first.

## Gotchas

- "Lack of time", "poor communication" and "scope changes" are generic. Look for the specific cause in this project.
- A risk whose response is "stay alert" has no response.
- Risks with likelihood 3 and impact 3 are not risks to watch: they are problems in the plan that must be resolved now.
- Do not use personal names as owner; use roles.
- Security threats to the system go in `docs/security/threats.md`. Only their effect on the project enters here.

## Project context

- **Read before asking:** `ROADMAP.md` and `docs/management/plan.md` (assumptions, dependencies, dates), `PRODUCT.md` (pending items) and `ARCHITECTURE.md` (risks and accepted debt).
- **Write** `docs/management/risks.md` and the **Open risks** section of `ROADMAP.md`; do not touch the rest of that file. Keep the IDs and the history of closed risks.
- If there is no repository or files cannot be written, deliver the register in the conversation under that file name.

## Closing every response

End with the warning signs already met, the risks that need a decision and the date of the next review.
