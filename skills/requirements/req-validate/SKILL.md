---
name: req-validate
description: "Use to review requirements that are already written (stories, specification, backlog, client document) before estimating or building: detect ambiguity, contradictions, gaps and non-verifiable requirements, and plan how to validate them with stakeholders."
license: MIT
metadata:
  author: "Hernan"
  version: "2.0.0"
  phase: "requirements"
  reads: "PRODUCT.md, docs/requirements/specification.md"
  writes: "docs/requirements/validation.md"
---

# Requirements verification and validation

The goal is to find misunderstandings while it is still cheap to fix them. There are two distinct questions:

- **Verification:** are the requirements well written? You can check this yourself on the text.
- **Validation:** do they describe the right product? Only the stakeholders can confirm this; you prepare how.

Validating is not asking people to read a document and sign it.

## Principles

- Act as an external, skeptical reviewer: your job is to find problems, not to approve.
- **Do not fix silently.** Propose a rewrite only when it does not change the meaning; if fixing requires a decision, formulate the question for the stakeholder.
- Do not invent thresholds, rules or behaviors to cover a gap.
- Quote the ID or the exact text of each requirement you comment on.
- Respond in the user's language.

## Part 1. Verification

Read the whole set before giving an opinion: several defects only appear when requirements are compared with each other.

### Individual review

| Quality | Control question | Defect signs |
| :--- | :--- | :--- |
| Correct | Does it answer a real need of an identified stakeholder? | No origin; describes a solution without a problem |
| Necessary | Does it trace to a business goal or a regulation? | "It would be nice if…"; requested by only one person |
| Feasible | Does it fit the known technology, time and budget? | "100% availability", undefined "real time", "all browsers" |
| Unambiguous | Would two people read it the same way? | Adjectives without numbers; "and/or"; "etc."; pronouns without a referent; passive voice without an actor |
| Verifiable | Can I write a test with a pass / fail result? | No metric or condition; no acceptance criteria |
| Atomic | Does it express one single thing? | Several "and" joining different functions |
| Complete | Does it say what happens on error and on exception? | Only the happy path; "to be defined"; unspecified actor or data |
| Prioritized | Does it have a justified priority? | Everything is a Must |
| Traceable | Does it have an ID and an origin? | Nobody knows who asked for it |
| Design-free | Does it say what and not how? | Names tables, specific screens or technologies without being a constraint |

**Verifiability test:** for each requirement, try to write a one-line test. If you cannot, it is a defect.

**Warning words:** fast, easy, intuitive, user-friendly, secure, robust, flexible, efficient, modern, adequate, sufficient, normally, generally, where possible, etc., among others, support, handle, manage (without saying which operations).

### Review of the set

- **Contradictions:** two incompatible requirements. Typical case: a role authorized to do something its permissions table forbids.
- **Duplicates** and overlaps with different wording.
- **Inconsistent terms:** the same concept with two names, or one name with two meanings.
- **Orphans:** software requirements without a user story; stories without a business goal.
- **Goals without coverage:** business goals that no requirement addresses.
- **Usual gaps:** user sign-up and removal, permissions per role, editing and deleting what is created, intermediate states, what happens offline, migration of existing data, audit, reports, backup, languages and time zones, failed notifications.
- **Non-functional:** is there at least performance, availability, security and capacity, each with a metric, threshold and conditions?
- **Assumptions without an owner:** critical assumptions that nobody has committed to confirming.

### Verification report

1. **Verdict:** *Ready to build* / *Ready with remarks* / *Not ready*, with one sentence of justification.
2. **Findings**, ordered by severity:

   ID or quote | Defect | Severity | Proposed rewrite or question

   - **Blocking:** building on this will almost certainly produce the wrong product (contradiction, gap in the main flow, critical non-functional requirement without a threshold).
   - **Major:** will cause rework or arguments (ambiguity, missing error case).
   - **Minor:** wording, format, terminology.
3. **Questions for stakeholders**, grouped by whom to ask.
4. **What is good**, in one or two lines, so that what is already resolved is not reopened.

If the document is long, review what is marked as must-have first and say so.

## Part 2. Validation plan

Propose only what fits the level and the risk; a small project does not need everything.

| Level | What is confirmed | How |
| :--- | :--- | :--- |
| Business | That the solution serves the goal | At the start: a throwaway prototype (paper, clickable slides) as proof of concept. When development begins: an MVP with the essentials, under real conditions. Requires measurable success criteria and complete stakeholder profiles |
| User | That the flows reflect their work | Collaborative whiteboard modeling; mockups or paper prototypes that users annotate directly; step-by-step walkthrough of scenarios |
| Software, functional | That the behavior is the expected one | Review of acceptance criteria with users and testers; test cases derived before coding; demo at the end of each iteration |
| Non-functional | That the architecture holds | Early architecture test: a minimal working prototype with all components and interfaces integrated, deployed in a production-like environment, measured for load, security, interoperability and performance |
| General quality | That there are no internal errors | Peer review by the team; inspection by experts outside the project |

For each activity state: which requirements it covers (by ID), with whom, what material to prepare, what result counts as approval, and when to do it. Order by risk: first what would be most expensive to discover late.

## Part 3. Prepare a validation session

When the user is going to show a prototype or walk through requirements with stakeholders, deliver:
- The goal of the session and the concrete hypotheses to confirm or discard.
- Tasks for the user to try on the prototype (not a guided demo): "Book an appointment for tomorrow", not "here is the book button".
- What to observe: where they hesitate, what they look for and cannot find, what they ask, what they ignore.
- Neutral closing questions: "What did you expect to happen here?", "What is missing for you to do your job?", "What is unnecessary?".
- A format to record the result: confirmed / fix / discard, per requirement.

Remind them that discarding what is unnecessary is as valuable a result as confirming.

## After a validation

If the user brings the results of a session, classify each observation: confirmed requirement, requirement to fix (with the fix), new requirement (goes through `req-specify` to be classified and prioritized), requirement to remove, or a doubt that requires more elicitation (`req-elicit`).

## Project context

When you work inside the project's repository:

- **Read** `docs/requirements/specification.md` and `PRODUCT.md`. Also check that they match: a goal, scope or threshold that differs between them is a blocking finding.
- **Do not modify** the specification or `PRODUCT.md`: corrections go through `req-specify`.
- If the user asks to keep the report or the results of a session, save them to `docs/requirements/validation.md` with the date.

## Closing every response

End with the next step: whom to ask what, what to fix first (corrections go through `req-specify`), or which validation activity to run beforehand. When the verdict is *Ready to build*, the next phases start with `des-discover` and `arch-discover`.
