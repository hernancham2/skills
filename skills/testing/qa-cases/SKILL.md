---
name: qa-cases
description: "Use to derive test cases from requirements, user stories, acceptance criteria or business rules: normal, error and exception cases, boundary values, combinations of conditions and state transitions, with traceability to each requirement. Applies when asked to design test cases, a traceability matrix, test scenarios, what to test for a specific feature, or to write the tests of a requirement. Do not use to decide levels, tools and thresholds (qa-strategy)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "testing"
  reads: "PRODUCT.md, TESTING.md, docs/requirements/specification.md, docs/testing/cases.md, docs/testing/review.md"
  writes: "docs/testing/cases.md"
---

# Test case design

You turn each requirement into cases that check it, including the ones nobody thought of: the limits, the errors and the combinations. Each case is traced to the requirement it comes from.

## Principles

- **The expected result comes from the requirement, never from the code.** If you read the implementation to know what should happen, you are checking that the code does what it does.
- **One case, one behavior,** with an observable and exact expected result.
- **Failures live at the edges.** For every normal path there are several error and boundary ones.
- **What cannot be tested is a defect of the requirement.** Send it back instead of inventing the expected result.
- Respond in the user's language.

## Process

### 1. List what must be covered

For each requirement in scope, extract: acceptance criteria, the business rules involved, inputs with their valid ranges, states of the object and roles with permission. If a criterion does not say what happens in case of error, it is a question; do not assume it.

### 2. Apply the techniques

| Situation | Technique | Cases it produces |
| :--- | :--- | :--- |
| Criterion in Given / When / Then format | One case per scenario | The normal one, each error and each exception |
| Input with a range or set of values | Equivalence classes | One per valid class and one per invalid class |
| Numeric, date or length input | Boundary values | Just below the minimum, minimum, maximum, just above the maximum |
| Rule with several conditions | Decision table | One row per relevant combination of conditions |
| Object with states | State transitions | Each valid transition and each forbidden transition |
| Action restricted by role | Permission matrix | Each role against each action, including the unauthenticated user |

Always add, when they apply: empty field, whitespace, special characters and accents, duplicate value, double submission of the same action, two users acting at once on the same data, and loss of connection midway through the operation.

### 3. Write the cases

| ID | Requirement | Level | Preconditions | Data | Steps | Expected result | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC-001 | UR-03 | unit / integration / end to end | | | | | high / medium / low |

- The level is decided by `TESTING.md`: the lowest one that can check the case.
- The priority inherits that of the requirement; boundary and error cases of a must-have requirement are high priority.
- The data is concrete (`amount = -1`), not descriptions ("an invalid amount").

### 4. Traceability matrix

| Requirement | Cases | Covers normal | Covers error | Covers limits |
| :--- | :--- | :--- | :--- | :--- |
| UR-03 | TC-001, TC-002 | yes | yes | not applicable |

Review and complete before delivering: every must-have requirement has at least one normal case and one error case; every non-functional requirement with a threshold has a case with its conditions.

### 5. If asked to automate

Write the tests following the conventions, tools and locations of `TESTING.md`, with the case ID in the name or in a comment. Run them and report the real result. A test that fails because the code does not meet the requirement is a defect found: report it, do not adjust the test.

## Gotchas

- "Works correctly" is not an expected result. Write what is seen, what is saved and what message appears.
- Cases that depend on another one running first break in a chain. Each case prepares its own data.
- Do not generate hundreds of combinations: with equivalence classes, one representative per class is enough.
- With dates, test month end, leap year, clock change and time zones if the product handles them.
- Permissions are tested through the direct path (the request to the server), not just by checking that the button does not appear.

## Project context

- **Read before asking:** `docs/requirements/specification.md` and `PRODUCT.md` (requirements and rules) and `TESTING.md` (levels, conventions, tools). If `docs/testing/review.md` exists (the output of `qa-validate`), start with the requirements and risks it lists as uncovered.
- **Write** `docs/testing/cases.md`. If it exists, add the new cases continuing the numbering and update the matrix; do not renumber the existing ones.
- If there is no repository or files cannot be written, deliver the tables in the conversation under that file name.

## Closing every response

End with the requirements that cannot be tested as written (for `req-validate`), those left without cases and the next step.
