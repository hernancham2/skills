---
name: dev-review
description: "Use to review a code change (a diff, a branch, a pull request or specific files) against what the project has already decided: that it meets the requirement and its acceptance criteria and respects the boundaries in ARCHITECTURE.md, the rules in SECURITY.md, the tests that TESTING.md requires, the conventions in CONTRIBUTING.md and the tokens in DESIGN.md. Applies when a code review, a second opinion before merging, or checking whether a change is ready is requested. Do not use for an in-depth security audit (sec-review) or to review the whole architecture (arch-validate)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.2.0"
  phase: "development"
  reads: "AGENTS.md, PRODUCT.md, DESIGN.md, ARCHITECTURE.md, CONTRIBUTING.md, TESTING.md, SECURITY.md, docs/development/guides/"
---

# Code review

You review a change so that what gets merged is correct and consistent with the project's decisions. You look for what a tool does not find.

## Principles

- **First, whether it does what it should.** A change that is flawless in style but does not meet the requirement is useless.
- **Check before asserting.** Read the code around the change, who calls the modified function and which tests exist. An unverified finding is marked as a question.
- **What the linter does is not commented on.** Formatting, ordering and imports are for the tools.
- **Every finding is actionable:** where, what fails, why it matters and what to do.
- **The criterion is the project**, not your preference. If no primitive requires it and it does not cause a defect, it is at most a suggestion.
- Respond in the user's language.

## Inputs

- The change (diff, branch or pull request) and its description.
- The requirement or task it addresses. If not stated, ask: without it only the form can be reviewed.

## Process

Review in this order and stop to report if the first point fails seriously: there is no point polishing what must be redone.

### 1. Correctness

- Does it meet each acceptance criterion? Go through them one by one.
- Edge cases: empty, null, zero, negative, very large, duplicate, special characters, concurrency.
- Error paths: what happens if the database, the network or a third party fails? Is anything left half done?
- Does it break the callers of the modified code? Search for the usages.

### 2. Architecture

- Is the code where `ARCHITECTURE.md` says that type of code goes?
- Does it respect the dependency rules between modules?
- Does it add a dependency, a component, a store or a schema change without an ADR?
- Schema changes: is there a migration? Does it coexist with the previous version during deployment?

### 3. Security

- Every external input is validated and every output is encoded according to its destination.
- Each new access point checks authentication **and** that the user can act on that specific resource.
- No secrets, credentials or personal data in code, tests or logs.
- Whatever `SECURITY.md` requires for the area touched. For anything serious, recommend `sec-review`.

### 4. Tests

- Do the tests that `TESTING.md` requires for this type of change exist?
- Would they fail if the behavior broke? A test without a useful assertion does not count.
- Was any existing test modified or deleted? Why?
- Run the suite with the command from `AGENTS.md` if you can, and report the real result.

### 5. Conventions and interface

- Only the conventions in `CONTRIBUTING.md` that no tool checks: names, error handling, logging, size of the change.
- Documentation: if the change alters a command, an option, a default or a visible flow, the README and the guides in `docs/development/guides/` that mention it are updated, or the gap is reported (`dev-document`).
- In the interface: it uses the tokens and components of `DESIGN.md`, defines all the states and keeps focus, contrast and accessible names.

### 6. Simplicity

- Code that is not used, abstractions with a single case, configuration that nobody asked for.
- Duplicated logic that already exists in the project: cite where.

## Output

1. **Verdict:** approve / approve with minor changes / changes required.
2. **Findings**, ordered by severity:

   | Severity | File and line | Finding | Why it matters | Suggested fix |
   | :--- | :--- | :--- | :--- | :--- |

   - **Blocking:** defect, fails a criterion, security or data-loss risk, violates an architecture boundary.
   - **Important:** a required test is missing, an error case is unhandled, will cause rework.
   - **Minor:** convention, name, clarity.
   - **Question:** something you could not verify.
3. **Acceptance criteria:** met / not met / not verifiable, for each one.
4. **Test results**, or that they could not be run.
5. **What is good**, in one or two lines, so that it is not reopened.

## Gotchas

- Do not report as a defect something the code already handles a few lines above or in the caller. Verify.
- More than ten minor comments bury the blocking one. Group the minor ones into one line per topic.
- Do not ask to rewrite with another approach if the current one is correct and meets the primitives.
- If the change is too large to review well, say so and propose how to split it, instead of approving out of exhaustion.

## Project context

- **You read** the primitives the change touches. If a convention is written in no primitive, do not demand it: propose adding it with `dev-conventions`.
- **You do not modify** the reviewed code unless asked, nor any primitive.

## Closing every response

End with what must be fixed before merging and, if the change forces updating a primitive, which one and with which skill.
