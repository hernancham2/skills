---
name: qa-validate
description: "Use to evaluate the tests a project already has and know whether they can be trusted: which requirements and risks remain uncovered, tests that could never fail, unstable or slow tests, excess mocking, non-functional thresholds without verification and differences from what TESTING.md requires. Applies when asked to audit the test suite, to know whether coverage is sufficient, why the tests do not catch errors or whether the project is ready to ship from a quality standpoint. Do not use to define the strategy (qa-strategy) or to design new cases (qa-cases)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "testing"
  reads: "TESTING.md, PRODUCT.md, AGENTS.md, docs/testing/risks.md, docs/testing/cases.md"
  writes: "docs/testing/review.md"
---

# Test validation

You check whether the project's tests really protect what matters. A green suite is only worth something if it would turn red when something breaks.

## Principles

- **Run, don't assume.** The state of the suite is reported after running it, with the command and the real result.
- **Requirements coverage before line coverage.** 90% line coverage with the payment flow untested is an insufficient suite.
- **A test is worth what it would detect.** If it cannot fail, it does not count.
- **Evidence:** each finding cites the test file or the uncovered requirement.
- Respond in the user's language.

## Process

### 1. Real state

Run the suite with the commands from `TESTING.md` or `AGENTS.md`. Record: how many pass, fail and are skipped, how long each level takes and the coverage if there is a tool. If you can, run it twice: a test that changes its result with no changes in the code is unstable. If you cannot run it, say so at the start of the report and limit the conclusions.

### 2. Coverage of what matters

- Each must-have requirement in `PRODUCT.md`: does it have a test of the normal path and of at least one error?
- Each high risk in `docs/testing/risks.md`: is there a test that would detect it?
- Each non-functional requirement with a threshold: does the test exist, does it run periodically and what was its last result?
- Each business rule and each calculation: are their limits tested?
- Permissions: is it tested that each role **cannot** do what it should not?

### 3. Quality of the tests

Read a sample of each level, starting with those that cover what is critical.

| Problem | Sign |
| :--- | :--- |
| Cannot fail | No assertions, or it only checks that there was no exception or that the result is not null |
| Tests the mock | What is mocked is exactly what was meant to be tested |
| Coupled to the implementation | Verifies internal calls instead of the result; breaks with every refactoring |
| Unstable | Depends on the time, the order, the network, fixed waits or shared data |
| Too broad | A failure does not say what broke |
| Skipped | Marked to be skipped, with no reason or date |
| Duplicates another | The same behavior tested at three levels |

When in doubt whether a test detects anything, temporarily change a condition in the code that should break it, run it and restore the code. Report whether it failed or not.

### 4. Shape of the suite

- Proportion between levels: are most of them fast, low-level tests, or are there more end-to-end than unit tests?
- Total time: does it run in a time the team tolerates on each pull request?
- Does CI run everything `TESTING.md` says, and does it block the merge when it fails?

### 5. Differences from TESTING.md

What the document requires and is not done, and what is done and the document does not mention.

## Output

1. **Verdict:** reliable / reliable with gaps / not reliable, with one sentence of justification.
2. **State of the run:** command, result and times.
3. **Findings**, by severity:

   | ID | Severity | Where | Finding | What failure it would let through | Proposed correction |
   | :--- | :--- | :--- | :--- | :--- | :--- |

   **Blocking:** a must-have requirement or a high risk without a test; the suite fails or does not run in CI. **Important:** tests that detect nothing in critical areas, instability, a threshold without verification. **Minor:** names, duplicates, organization.
4. **Requirements and risks without coverage**, as a list for `qa-cases`.
5. **What could not be checked** and why.

## Gotchas

- The coverage percentage says what code was executed, not what was checked. Do not use it as the verdict.
- Do not propose raising global coverage: propose the specific tests that are missing.
- A test skipped "temporarily" months ago is an uncovered requirement.
- If you modify code to check that a test fails, always restore it and verify that it is as it was.

## Project context

- **Read** `TESTING.md`, `PRODUCT.md`, `AGENTS.md` (commands to run the suite), `docs/testing/risks.md` and `docs/testing/cases.md`.
- **Do not modify** `TESTING.md` or the tests unless asked.
- If the user asks to keep the report, save it to `docs/testing/review.md` with the date.

## Closing every response

End with the three tests that would remove the most risk if written first and the next step: `qa-cases` for what is missing, or `qa-strategy` if the problem is one of approach.
