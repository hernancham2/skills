---
name: sec-review
description: "Use to review the security of the project's own code and configuration before releasing or after a sensitive change: access control at every entry point, injection, secrets handling, input validation, vulnerable dependencies, insecure configuration and data exposure, checked against SECURITY.md and the threat model. Applies when a security audit or review, looking for vulnerabilities in the repository, or checking a change that touches authentication, permissions, payments, files or personal data is requested. Do not use for the general review of a change (dev-review)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "security"
  reads: "SECURITY.md, ARCHITECTURE.md, AGENTS.md, docs/security/threats.md"
  writes: "docs/security/review.md"
---

# Security review

You read the project's code and configuration looking for paths by which someone could do what the policy forbids. You report only what you can support with a concrete scenario.

## Principles

- **Only the project's own code and systems.** You review by reading; you do not launch attacks against running systems or third parties.
- **A finding is a path.** From an input that an attacker controls to an effect, citing each file and line. Without a complete path it is a suspicion and is marked *to verify*.
- **The policy rules.** You measure against `SECURITY.md`. What is missing there is reported as a gap in the policy, as well as a finding.
- **No noise.** Ten confirmed findings are worth more than a hundred possible ones.
- Respond in the user's language.

## Inputs

The scope: the whole repository, a module or a change. If it is the whole repository and it is large, prioritize using the threat model and say so.

## Process

### 1. Attack surface

List all the points through which data enters from outside: HTTP routes, forms, file uploads, queues, scheduled tasks that read external data, webhooks, command-line arguments. For each: what authentication it requires and what data it touches.

### 2. Access control

This is where most serious failures appear. For each entry point:

- Does it require authentication? List those that do not and check that it is intentional.
- Does it check that the user can act on **that specific object**, not just that they are authenticated? Search for every access by an identifier received from the client.
- Is the check on the server and before executing the action?
- Contrast with the role matrix in `SECURITY.md`, row by row.

### 3. Inputs and outputs

| Risk | What to look for |
| :--- | :--- |
| Query injection | User text concatenated into queries instead of parameters |
| Command injection | Input that reaches system command execution or code evaluation |
| File paths | User-supplied names or paths used to read or write without normalizing or restricting to a directory |
| HTML output | User data inserted without encoding, or marked as safe by hand |
| Outgoing requests | User-controlled addresses to which the server connects |
| Deserialization | External data converted into objects with formats that execute code |
| Uploaded files | No size limit, real type not validated, stored where they can be executed or served |
| Mass assignment | Client objects dumped into a model without an allowlist of fields (role, price, owner) |

### 4. Secrets and configuration

- Secrets in code, in example files, in tests and in the git history.
- Logs and error messages that include passwords, tokens, personal data or internal traces.
- Permissive configuration: open cross-origin access, debug mode on, missing security headers, session cookies without protection flags, exposed ports or panels.
- Rate limits on sign-in, access recovery and costly operations.

### 5. Dependencies

Run the ecosystem's audit tool if available (the one `SECURITY.md` or `AGENTS.md` indicates) and report the real result. For each vulnerability, check whether the project uses the affected function before rating its severity.

### 6. Cryptography and sessions

Custom or discouraged algorithms, non-cryptographic random values used for tokens, passwords stored reversibly, sessions that do not expire or are not invalidated on sign-out or password change.

## Output

1. **Verdict:** no blocking findings / with findings to fix before releasing / do not release.
2. **Findings**, by severity:

   | ID | Severity | Location | Finding | Attack scenario | Fix | Status |
   | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
   | S-01 | | file and line | | Who, how and what they obtain | | confirmed / to verify |

   **Critical:** exploitable without an account, or gives access to regulated data or control of the system. **High:** exploitable with a normal account. **Medium:** requires infrequent conditions or has limited impact. **Low:** hardening.
3. **Gaps in the policy:** what `SECURITY.md` does not define and should.
4. **Threats from the model without an implemented control.**
5. **What was not reviewed** and why.

## Gotchas

- Before reporting an injection, check that the ORM or the library does not already parameterize that call.
- A secret in an example file with a placeholder value is not a finding; one with a real format is, even if it is on an old branch.
- Do not include the value of any secret found in the report: only its location and type. Recommend rotating it.
- A vulnerable dependency in development tooling does not have the same severity as one in production.
- If you find something critical, put it at the top of the report and say so immediately, not at the end of the review.

## Project context

- **Read** `SECURITY.md`, `docs/security/threats.md`, `ARCHITECTURE.md` and `AGENTS.md` (stack, and the commands for the dependency audit).
- **Do not modify** the code or `SECURITY.md` unless asked. Code fixes go through `dev-implement`; policy fixes, through `sec-define`.
- If the user asks to keep the report, save it to `docs/security/review.md` with the date. If the repository is public and there are unfixed findings, warn that this file must not be published.

## Closing every response

End with what to fix first, which secrets to rotate and what was left to verify. Code fixes go through `dev-implement`; gaps in the policy go through `sec-define`.
