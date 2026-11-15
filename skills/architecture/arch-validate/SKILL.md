---
name: arch-validate
description: "Use to review an architecture before building on it or when there are doubts it will hold: check that ARCHITECTURE.md or a technical proposal meets the quality requirements, find single points of failure, performance, data consistency and integration risks, unjustified complexity, and differences between what is documented and the code. Applies when an architecture review, a second opinion on a technical design, or whether the system will scale is requested. Do not use to review code line by line (dev-review)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "architecture"
  reads: "ARCHITECTURE.md, PRODUCT.md, docs/architecture/drivers.md, docs/architecture/adr/"
  writes: "docs/architecture/review.md"
---

# Architecture validation

You review the architecture as someone who will have to operate it at three in the morning: you look for where it breaks, which requirement is not covered and which complexity has not earned its place. You do not redesign; you point out and propose the smallest correction.

## Principles

- **Walk through, don't opine.** A finding comes from following a concrete scenario through the components and seeing where it fails, not from a technology preference.
- **Against the project's drivers**, not against an ideal architecture. What breaks no driver and creates no concrete risk is not a finding.
- **Evidence.** Each finding cites the section, the ADR or the code file.
- **Smallest correction.** Propose the smallest change that removes the risk.
- Respond in the user's language.

## Process

### 1. Requirements coverage

For each non-functional requirement in `PRODUCT.md` and each main driver: is there a mechanism that meets it and a way to verify it? Mark those without a mechanism, those with a mechanism that is insufficient for the requested number, and those that cannot be verified.

### 2. Scenario walk-through

Pick the three most critical flows of the product and the main quality scenarios. Follow each one step by step through the components and ask at each hop:

- What happens if this component does not respond or takes ten times longer?
- What happens if the operation runs twice? And if it is left half done?
- What happens with ten times the expected load? What saturates first?
- Who can call this and how is it checked that they have permission?

### 3. Usual risks

| Risk | Sign |
| :--- | :--- |
| Single point of failure | A component without redundancy that all critical flows depend on |
| Chain of synchronous calls | A user request waits for three or more services in series |
| No timeouts or retries | Integrations without a maximum wait, without bounded retries or without idempotent operations |
| Data consistency | One piece of data written to two stores with no reconciliation mechanism; transactions that span services |
| Shared database | Several components write the same tables |
| In-memory state | Local sessions or caches that prevent having more than one instance |
| Growth without a ceiling | Tables, queues or files that grow without a retention policy |
| Data migration | There is existing data and no plan to bring it to the new schema |
| Secrets and permissions | Credentials shared between environments; components with more permissions than needed |
| Third-party dependency | A critical function tied to a vendor with no alternative or degraded mode |

### 4. Complexity

For each deployable component, data store and technology: which driver justifies it? Whatever has no answer is a candidate to remove or postpone. Also point out the opposite: a demanding driver solved with something too simple.

### 5. Decisions

- Decisions costly to reverse without an ADR, or with an ADR without compared alternatives.
- ADRs that contradict each other, or `ARCHITECTURE.md` contradicting an accepted ADR.

### 6. Correspondence with the code (if it exists)

Check that the documented components, paths and dependencies exist, and look for violations of the dependency rules (imports that cross a forbidden boundary). What the code does and the document does not mention is also a finding.

## Output

1. **Verdict** in one line: ready to build / ready with corrections / needs another round.
2. **Findings**, by severity:

   | ID | Severity | Where | Finding | Scenario in which it fails | Proposed correction |
   | :--- | :--- | :--- | :--- | :--- | :--- |

   **Blocking:** a must-have requirement is not met or there is a risk of data loss. **Important:** it will fail under foreseeable conditions or will be expensive to fix later. **Minor:** documentation, names, clarity.
3. **Trade-offs**: decisions that favor one attribute at the expense of another, so that someone confirms the exchange is the desired one.
4. **Requirements without coverage** and **questions** for the decision maker.
5. **What was not reviewed** and why (no code, no drivers, no load data).

## Gotchas

- "It doesn't scale" without a number is not a finding. Say what saturates, from what load and against which requirement.
- Do not propose changing technology out of preference. Only if the chosen one cannot meet a driver, and with the evidence.
- The absence of microservices, cache or queues is not a defect.

## Project context

- **Read** `ARCHITECTURE.md`, the ADRs in `docs/architecture/adr/`, `docs/architecture/drivers.md` and the non-functional requirements in `PRODUCT.md`.
- **Do not modify** `ARCHITECTURE.md` or the ADRs: corrections go through `arch-define`.
- If the user asks to keep the report, save it to `docs/architecture/review.md` with the date.

## Closing every response

End with what to fix first and the next step: `arch-define` for the findings, or `dev-conventions` and `qa-strategy` if the architecture is ready.
