---
name: arch-define
description: "Use when the architecture decisions of a software project must be made and written down: system style, stack, components and their boundaries, data model, integrations and how each quality requirement is met, in ARCHITECTURE.md and in decision records (ADRs). Applies when asked to design the architecture, choose between technologies, document a technical decision, write an ADR or design the data schema or an API at a high level. Do not use to gather the conditioning factors (arch-discover) or to review an architecture that is already written (arch-validate)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "architecture"
  reads: "PRODUCT.md, ARCHITECTURE.md, docs/architecture/drivers.md, docs/architecture/review.md"
  writes: "ARCHITECTURE.md, docs/architecture/adr/"
---

# Architecture definition

You turn the drivers into decisions: few, justified and written down where the team and the agents find them. `ARCHITECTURE.md` describes what the system is like today; each ADR explains why.

## Principles

- **The simplest thing that meets the drivers.** Start from a modular monolith, a single database and technology the team already masters. Every additional deployable component, every extra data store and every new technology is justified with a concrete driver.
- **A decision without an alternative is not a decision.** Every decision that is costly to reverse compares at least two options against the drivers.
- **Every quality requirement has a mechanism and a test.** If you cannot say how it is met or how it will be checked, the architecture does not cover it.
- **The document describes the code.** Component and folder names are the real ones. What is aspirational is marked as *planned*.
- Respond in the user's language.

If there are no drivers with a number (`docs/architecture/drivers.md` or non-functional requirements in `PRODUCT.md`), say so and suggest `arch-discover`. If the user wants to move on anyway, record each assumption you use.

## Choose the mode

| You are asked for | Mode |
| :--- | :--- |
| The complete architecture of a project | A. Full architecture |
| Decide or document one single issue | B. One ADR |
| Document a system that already exists | C. Describe what exists |

## A. Full architecture

1. **List the significant decisions**: those that are costly to reverse. They are almost always system style, language and framework, storage, authentication, hosting model, integration style and, if applicable, separation between clients. What can be changed in an afternoon does not need an ADR.
2. **Decide each one** with mode B.
3. **Components.** A context and container diagram in Mermaid, and a table: component, responsibility (one sentence), what it depends on, path in the repository. Add the dependency rules ("the domain layer does not import from infrastructure").
4. **Data model.** Main entities and relationships in a Mermaid entity-relationship diagram, who owns each piece of data and the path to the real schema (migrations or the ORM file). Do not copy all the fields: the schema lives in the code.
5. **Integrations.** System, direction, protocol, contract or documentation, and what the system does when the other one fails or is slow.
6. **Cross-cutting concerns.** Authentication and authorization, error handling, logging, configuration. One decision per concern.
7. **Quality coverage.** Table: requirement (ID) → mechanism → how it is verified. A requirement without a row is a finding.
8. **Risks and accepted debt**, with who accepted it.

Fill in [assets/ARCHITECTURE.template.md](assets/ARCHITECTURE.template.md).

## B. One ADR

Use [assets/adr.template.md](assets/adr.template.md) and save it to `docs/architecture/adr/NNNN-lowercase-title.md`, with four-digit sequential numbering.

1. Write the context: what forces a decision and which drivers apply (by ID).
2. Compare two or three real options in a table, against those drivers. Always include the simplest option and, if it exists, "do nothing".
3. Choose one and say what is gained, what is sacrificed and what becomes harder afterwards.
4. State when the decision should be revisited (the threshold or the fact that would invalidate it).

Rules for ADRs:

- Statuses: *proposed*, *accepted*, *superseded by NNNN*, *rejected*. Only a person with authority marks it as accepted; you leave it as *proposed*.
- An accepted ADR is not edited. If the decision changes, a new one is written that supersedes it and the status of the previous one is updated.
- One ADR, one decision.

## C. Describe what exists

Read the code and fill in the template with what is there, citing paths. Decisions whose reason is recorded nowhere are noted as "reason unknown": do not reconstruct it. Mark separately what looks accidental or inconsistent, without proposing changes yet.

## Gotchas

- Do not recommend a technology from memory as "the current one": check the current version and its support in the official documentation before writing it.
- Microservices, queues and caches solve problems that most new projects do not have. Without a driver that demands them, they go as "revisit when [threshold] is exceeded".
- In Mermaid, identifiers do not take spaces or accents; the visible text goes between brackets or quotes.
- `ARCHITECTURE.md` does not list libraries: that is in the manifest. It lists decisions and structure.
- The design of screens and the user flow do not go here (`des-navigation`); neither do the deployment steps (`ops-define`).

## Project context

- **Read before asking:** `docs/architecture/drivers.md` and `PRODUCT.md`. If `ARCHITECTURE.md` exists, start from it, and if `docs/architecture/review.md` exists (the output of `arch-validate`), address its open findings first.
- **Write** `ARCHITECTURE.md` at the root and the ADRs in `docs/architecture/adr/`. Modify only the affected sections; changing something already accepted requires a new ADR and confirmation.
- If the decision changes commands, folder structure or stack, say that `AGENTS.md` must be updated with `pm-context`.
- If there is no repository or files cannot be written, deliver the content in the conversation under their file names.

## Closing every response

End with the decisions in *proposed* status and who must accept them, the assumptions used and the next step: `arch-validate` before building on the architecture.
