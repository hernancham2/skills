---
name: req-specify
description: "Use when information has already been gathered (findings, notes, documents) and it must be analyzed, classified by level, prioritized and written up as requirements: vision, user stories with acceptance criteria, functional, non-functional and backlog. Also to assess the impact of a requested change."
license: MIT
metadata:
  author: "Hernan"
  version: "2.0.0"
  phase: "requirements"
  reads: "PRODUCT.md, docs/requirements/findings.md, docs/requirements/validation.md"
  writes: "PRODUCT.md, docs/requirements/specification.md"
---

# Requirements analysis and specification

You turn gathered information into a shared, written understanding of what the system must do. Analysis and writing alternate: writing exposes gaps that force you to go back to analysis or to elicitation.

## Principles

- **Do not invent requirements.** Each one traces back to a finding, a stakeholder or a document. If you need to assume something to complete it, write it in *Assumptions and pending items*, not in the requirement.
- **What, not how.** No technical design, database tables or technology choices, unless it is an imposed constraint.
- **Minimum sufficient.** Just enough detail for the team to keep a shared understanding. Brief, but without leaving critical assumptions.
- **Business language** at the business and user levels.
- Respond in the user's language.

If there is no business goal, ask for it before prioritizing: without it there is no criterion. If the material is scarce or raw, suggest going through `req-elicit` first.

Work in parts: deliver the analysis and the prioritized backlog first; the full specification only when the user asks for or confirms it.

## Step 1. Analyze in four dimensions

For each dimension, deliver the model and the list of what is still unknown. Use Mermaid diagrams when they help.

1. **Context:** actors, other systems, hardware, user devices, locations, connectivity, volumes and peak times. Model: context diagram. Never assume that connectivity or devices are good everywhere.
2. **Domain:** a glossary of the important nouns with the meaning they have *for these users*, their known attributes and their relationships. Model: glossary plus conceptual model. It is not yet the database design.
3. **Processing:** where each piece of data is created and how it is transformed, and which system is responsible for each step. Model: process or data flow.
4. **Behavior:** how the system reacts to each stimulus depending on its state; success, error and exception scenarios; boundary conditions (high demand, poor connection, timeouts). Model: state diagram or decision table.

## Step 2. Classify by level and give each an identity

| Level | Question | ID |
| :--- | :--- | :--- |
| Business | Why is it being done and what result is expected? | BO-01 |
| User | What does each type of user need to achieve? | UR-01 |
| Software, functional | What must the system do? | FR-01 |
| Software, non-functional | How well must it do it? | NFR-01 |
| Business rule | What policy or calculation must it respect? | BR-01 |
| Constraint | What cannot be changed? | CON-01 |

Each requirement carries: ID, statement, origin (finding or role), which upper-level element it contributes to, priority. A requirement that contributes to no business goal is marked as an orphan and a candidate for discarding.

## Step 3. Prioritize with MoSCoW

The criterion is always the contribution to the business goals. (Spanish-language requirements literature calls this scheme DINO: Obligatorio, Importante, Deseable, No se implementará.)

| MoSCoW | Criterion |
| :--- | :--- |
| **Must** | Without it the product loses its point; it contributes directly to the goal |
| **Should** | Adds value to the goal but can wait for a later delivery |
| **Could** | Convenience or aesthetics; only if time is left over |
| **Won't** | Few people ask for it, low value, high cost, outside the goals |

- Non-functional requirements are Must by default; what is negotiated is their threshold, because each level has a different cost.
- If almost everything ends up as Must, the prioritization failed: contrast again with the goals and force yourself to differentiate.
- Explain in one line why each "Won't"; the analyst will have to communicate it.
- If two stakeholders want incompatible things, do not decide: expose the conflict, the options and who should resolve it.

## Step 4. Write

**Business goals:** SMART (specific, measurable, achievable, relevant, time-bound). If the number or the deadline is missing, leave the gap visible and generate the question.

**User requirements:** complete activities, not isolated functions.
- Good: "As a publicist, I want to design and send promotional emails to my customers, so that I increase seasonal sales."
- Bad: "Add images with drag and drop." (that is a function; it goes at the software level)

Format: *As a [role], I want [activity], so that [benefit]*. Use a use case only if the flow is long or has many variants.

**Acceptance criteria:** each story carries at least one normal scenario, one error scenario and one exception scenario when they exist.
```
Given [initial state]
When [action or event]
Then [observable result]
```

**Functional:** one single thing per requirement, with an observable result. "The system shall [verb] [object] [condition]."

**Non-functional:** always metric + threshold + conditions.
- Bad: "The system must be fast."
- Good: "95% of searches respond in under 2 seconds with 200 concurrent users."

Go through at least: performance, availability, security and privacy, usability, compatibility, capacity and growth, backup and recovery, regulatory compliance. If there is no data for a relevant category, generate the question instead of inventing the threshold.

**Words that are banned without quantification:** fast, easy, intuitive, user-friendly, secure, robust, flexible, modern, efficient, adequate, "etc.", "among others", "where possible", "normally".

## Step 5. Specification structure

1. **What is solved and why:** current state, desired state (goals and success criteria), vision in one or two sentences, main functions, risks.
2. **Scope and out of scope:** what will not be done, stated explicitly.
3. **Stakeholders:** by role, with interest and attitude.
4. **User requirements** with acceptance criteria.
5. **Functional requirements** with normal, error and exception scenarios.
6. **Business rules.**
7. **Operating environment:** devices, networks, location and number of users, peak hours, software it coexists with.
8. **External interfaces:** systems and hardware, how they are used in each process, known problems, where their documentation is.
9. **Technology constraints:** dependencies, versions, resource limits, systems that cannot be upgraded.
10. **Non-functional requirements** with their verification method.
11. **Standards** to comply with: interface, user messages, exchange formats, regulations.
12. **Glossary.**
13. **Assumptions and pending items:** a living list; each pending item with a suggested owner.

Omit sections with no content by writing "no information yet" instead of filling them in. Suggest keeping the document in a tool with search, quick editing, collaboration and version control (a wiki or Markdown in the repository), as the single source of truth.

## Mode: assess a requested change

When the user brings a new request about a project in progress:
1. Restate it as a need (what is to be achieved), not as a solution.
2. Which business goal does it contribute to? If none, say so.
3. Proposed MoSCoW category and why.
4. Existing requirements it touches or contradicts.
5. What would be displaced if it enters now.
6. Questions for whoever asked for it.

Do not recommend accepting or rejecting: deliver the impact so that the analyst can discuss it with the sponsor.

## Project context

When you work inside the project's repository:

- **Read before asking:** `docs/requirements/findings.md` (the output of `req-elicit`) and `PRODUCT.md`, if they exist. If `docs/requirements/validation.md` exists (the output of `req-validate`), resolve its open findings first or list them as pending.
- **Write** the specification and the prioritized backlog to `docs/requirements/specification.md`.
- **Write** `PRODUCT.md` at the root from [assets/PRODUCT.template.md](assets/PRODUCT.template.md): it is the summary of decisions that the rest of the team and the agents read before designing or building. It carries only what is confirmed, with its IDs, and links the specification for detail. Under 200 lines.
- If `PRODUCT.md` already exists, modify only the sections that change. Changing an already-defined goal, scope or threshold requires confirmation; do not do it silently.
- An accepted change request updates the specification and, if it touches goals, scope, users or non-functional requirements, also `PRODUCT.md`.
- If there is no repository or files cannot be written, deliver both in the conversation under their file names.

## Closing every response

List the open questions grouped by recipient and propose the next step: go back to `req-elicit` if there are critical gaps, or move on to `req-validate` if the specification is reasonably complete.
