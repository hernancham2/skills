---
name: qa-strategy
description: "Use when defining how a software project will be tested and saving it in TESTING.md: which risks to cover, which test levels to use (unit, integration, end-to-end, performance, accessibility), which tools, which thresholds, which data and when each thing runs. Applies when a test strategy or test plan is requested, to decide what to test and what not to, to set the minimum coverage or to set up the testing base of a new project or one without tests. Do not use to write the specific cases (qa-cases) or to evaluate existing tests (qa-validate)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "testing"
  reads: "PRODUCT.md, ARCHITECTURE.md, AGENTS.md, TESTING.md, docs/requirements/specification.md, docs/testing/review.md"
  writes: "TESTING.md, docs/testing/risks.md"
---

# Test strategy

You decide where to put the testing effort so that expensive failures are found early and cheaply. The result is `TESTING.md`: what is tested, at which level, with what and with what threshold.

## Principles

- **Test by risk, not by coverage.** What would do the most damage if it failed gets the most tests; what is trivial gets none.
- **At the cheapest level that detects the failure.** A business rule is tested in a unit test, not by launching a browser.
- **Every threshold in the product has a test.** A non-functional requirement without automatic or scheduled verification is a wish.
- **The ecosystem tools the project already uses.** Do not introduce a new test framework without a reason.
- Respond in the user's language.

## Process

### 1. Risk inventory

From `PRODUCT.md` and `ARCHITECTURE.md`, list what can fail and record it in `docs/testing/risks.md`:

| ID | What can fail | Origin | Likelihood | Impact | Level that detects it |
| :--- | :--- | :--- | :--- | :--- | :--- |
| R-01 | | UR-03, BR-02 | high / medium / low | high / medium / low | |

Mandatory sources: must-have requirements, business rules and calculations, each non-functional requirement with a threshold, each external integration, permissions per role, data migrations and everything that handles money or personal data.

### 2. Levels

Assign each risk to the cheapest level that detects it:

| Level | Detects | Use for |
| :--- | :--- | :--- |
| Unit | Incorrect logic | Business rules, calculations, validations, transformations, edge cases |
| Integration | Pieces that do not fit | Queries to the real database, calls to your own APIs, contracts with third parties, permissions |
| End to end | The complete flow does not work | Between three and seven critical user flows, no more |
| Performance | A load threshold is not met | Each non-functional performance or capacity requirement, with its number |
| Accessibility | Barriers to use | Automatic review of the main screens, plus the manual review that the required level asks for |
| Security | Vulnerabilities | What `SECURITY.md` defines: dependency scanning, permission tests |

Most tests should be at the first two levels. If a risk can only be detected end to end, ask yourself whether the design allows testing it lower down.

### 3. What is not tested

Write it explicitly: generated code, configuration without logic, trivial wrappers of libraries, the behavior of external dependencies.

### 4. Thresholds

- **Coverage:** a minimum in the critical modules (those of highest risk), not a global target. Say which modules those are and the number.
- **Non-functional:** one row per threshold in `PRODUCT.md`, with the test that verifies it and when it runs.
- **What blocks a merge** and what only warns.

### 5. Data and environments

- Where test data comes from (factories, seeds, never real production data with personal information).
- Each test creates what it needs and does not depend on order or on another test.
- What is simulated (payment providers, email) and what is used for real (the database).

### 6. When each thing runs

| Moment | What runs | Maximum time |
| :--- | :--- | :--- |
| Before commit | Lint and the affected unit tests | Seconds |
| On each pull request | Unit and integration | A few minutes |
| Before deploying | End to end | |
| Scheduled | Performance, security, accessibility | |

Fill in [assets/TESTING.template.md](assets/TESTING.template.md) with the result.

## Gotchas

- A high global coverage target produces tests that execute code without checking anything. Measure where it matters.
- Mocking the database in integration tests hides precisely the failures that level must find.
- Many end-to-end tests make the suite slow and unstable, and the team stops trusting it.
- Do not write in `TESTING.md` a command that does not exist in the project. If the test framework is not yet installed, say so as a pending step.
- A performance threshold without conditions (how many users, what data, what environment) cannot be tested: send it back to `req-specify`.

## Project context

- **Read before asking:** `PRODUCT.md` (must-haves, rules, non-functional requirements), `ARCHITECTURE.md` (components and integrations), `AGENTS.md` (commands and stack), `docs/requirements/specification.md` (acceptance criteria) and the existing `TESTING.md`. If `docs/testing/review.md` exists (the output of `qa-validate`), start from the problems of approach it reports.
- **Write** `TESTING.md` at the root and `docs/testing/risks.md`. Modify only what changes.
- If there is no repository or files cannot be written, deliver the content in the conversation under their file names.

## Closing every response

End with the risks without an assigned level, the thresholds without a test, what is left to install or configure and the next step: `qa-cases` to derive the cases from the must-have requirements.
