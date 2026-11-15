---
name: arch-discover
description: "Use before deciding the architecture or technology of a software project, to gather what conditions those decisions: quality attributes with numbers, constraints, volumes, integrations, existing data and team capabilities. Also use to inventory the architecture of an existing system from its code. Applies when the user asks which stack to use, whether they need microservices, which database to pick or how to start the technical design: first you must know what conditions it. Do not use to make the decisions (arch-define)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "architecture"
  reads: "PRODUCT.md, docs/requirements/specification.md"
  writes: "docs/architecture/drivers.md"
---

# Architecture discovery

You gather the **architectural drivers**: the few facts that truly force one architecture and not another. The result feeds `arch-define`.

## Principles

- **No deciding yet.** Do not recommend a language, framework, database or style. If the user already brings a preference, record it as a constraint or as a preference, with who asks for it and why.
- **Without a number there is no driver.** "It must scale" conditions nothing; "500 orders per minute at peak hour" does. Ask for an order of magnitude when there is no exact figure.
- **The team is a constraint.** What the team knows how to operate weighs as much as what is technically ideal.
- **Never invent.** Each piece of data has a source; the rest is an assumption or an open question.
- Respond in the user's language.

## Choose the mode

| Situation | Mode |
| :--- | :--- |
| New project | A. Gather drivers |
| Existing system, with code | B. Inventory what exists, then A for what is missing |

## A. Gather drivers

Go through the six blocks. Take from `PRODUCT.md` what is already defined and ask only what is missing, grouped in one single message.

| Block | What you must leave knowing |
| :--- | :--- |
| 1. Quality attributes | Performance, availability, security, changeability and whichever apply, each as a measurable scenario |
| 2. Load and data | Concurrent users, operations per unit of time, peaks, data volume and its growth, retention time |
| 3. Integrations | External systems, who controls them, protocol, usage limits, how reliable they are |
| 4. Constraints | Imposed technology, mandatory hosting, regulation and data residency, budget, date |
| 5. Team and operations | Size, languages and platforms they master, who operates in production and in what schedule |
| 6. Evolution | What is likely to change in one or two years: users, features, countries, clients with different needs |

Write each quality attribute as a scenario:

> **When** [stimulus] **under** [conditions], **the system** [response] **within** [measure].
> When 200 users search at the same time at peak hour, the system answers 95% of searches in under 2 s.

If a relevant attribute has no number, do not invent it: propose a usual range as a question ("is 99.5% availability per month enough, about 3.6 hours of downtime?").

## B. Inventory what exists

Read the repository before asking. Record, with the path each piece of data comes from:

- Languages, frameworks and versions (manifests and lock files).
- Entry points and deployable components.
- Data stores and where the schema is defined.
- External integrations (HTTP clients, queues, SDKs, environment variables).
- Folder structure and dependencies between modules.
- How it is built, tested and deployed (CI, containers, infrastructure as code).
- Warning signs: huge modules, circular dependencies, unsupported dependencies, absence of tests in what is critical.

Do not evaluate yet; describe. Whatever you cannot verify in the code is a question.

## Output

1. **Drivers table**, ordered by how much they condition:

   | ID | Type | Driver | Measure | Source | Certainty |
   | :--- | :--- | :--- | :--- | :--- | :--- |
   | D-01 | Quality / Load / Integration / Constraint / Team / Evolution | | | | fact / assumption |

2. **The three to five main drivers**: those that, if they changed, would change the architecture. Explain why in one line each.
3. **Tensions** between drivers (low cost versus high availability; short deadline versus technology that is new to the team).
4. **Open questions**, by recipient, indicating which ones block deciding.

## Gotchas

- Functional requirements rarely condition the architecture; quality attributes and constraints do. Do not copy the backlog as drivers.
- "Real time" means different things: ask how many milliseconds or seconds of delay are acceptable.
- The requested availability usually ignores maintenance windows and the real hours of use. Ask when it is used and what happens if it is not available.
- A technology preference of the sponsor is not a constraint until someone confirms it is not negotiable.

## Project context

- **Read before asking:** `PRODUCT.md` (non-functional requirements, platforms, constraints, operating environment) and `docs/requirements/specification.md`. If a needed non-functional requirement is not there, it is a gap that goes back to `req-specify`.
- **Write** `docs/architecture/drivers.md`. If it exists, update the rows that change and keep the IDs.
- If there is no repository or files cannot be written, deliver the content in the conversation under that file name.

## Closing every response

End with the questions that block and the next step: `arch-define` once the main drivers have a number and a source.
