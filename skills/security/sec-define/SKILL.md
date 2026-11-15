---
name: sec-define
description: "Use to define a software project's security policy and save it in SECURITY.md: how to report vulnerabilities, data classification, authentication, role-based authorization, secrets handling, input validation, dependencies, audit logging, encryption and applicable regulation. Applies when a security policy or guidelines, security requirements for the team, defining roles and permissions, or how to handle credentials and personal data is requested. Do not use to discover the threats (sec-threats) or to audit code (sec-review)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "security"
  reads: "PRODUCT.md, ARCHITECTURE.md, SECURITY.md, docs/security/threats.md, docs/security/review.md"
  writes: "SECURITY.md"
---

# Security policy

You turn the identified threats into rules that the team and the agents apply when building. `SECURITY.md` says what is protected, with which control and how it is checked.

## Principles

- **Every control answers a threat.** A control without a threat is bureaucracy; a high threat without a control is a hole. Cite the threat ID.
- **Deny by default.** What is not explicitly allowed is forbidden: permissions, origins, file types.
- **Do not build what already exists.** Authentication, sessions and cryptography come from the framework or from an identity provider. No custom algorithms or schemes.
- **Verifiable.** Each rule says how it is checked: a test, a tool or a point in the code review.
- **Do not claim regulatory compliance.** You state which regulation might apply and what it broadly requires; confirming that it is met is for someone with legal competence.
- Respond in the user's language.

If `docs/security/threats.md` does not exist, say so and suggest `sec-threats`. If the user wants to move on, define the baseline controls and mark the policy as provisional.

## Process

Fill in [assets/SECURITY.template.md](assets/SECURITY.template.md) section by section.

| Section | What is decided | Default |
| :--- | :--- | :--- |
| Reporting a vulnerability | Private channel, response time, what not to publish | A private email or form; never a public issue |
| Data | Classification and handling of each class | What is in `docs/security/threats.md` |
| Authentication | Mechanism, password requirements, second factor, session duration, lockout on attempts | The framework's or an identity provider's; second factor for privileged roles |
| Authorization | Model and role matrix per resource and action | By role, with an ownership check on each object on the server |
| Secrets | Where they live, who accesses them, rotation | Secrets manager or environment variables; never in the repository or in logs |
| Inputs and outputs | Validation and encoding | Validate on the server against an allowlist; parameterized queries; encode according to the destination |
| Dependencies | Audit and updating | Automatic scanning in CI; security patches within a defined time |
| Logging and audit | Which events are logged and which never are | Accesses, permission changes and sensitive actions; never passwords, tokens or regulated data |
| Encryption | In transit and at rest | TLS everywhere; encryption at rest for sensitive data and backups |
| Regulation | Which regulations might apply | Open question until someone competent confirms it |

For the **authorization matrix**, use the roles from `PRODUCT.md`:

| Resource | Action | Anonymous | [Role A] | [Role B] | Administrator |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Order | View | no | own only | all | all |

Each cell is *yes*, *no* or a condition. An empty cell means *no*.

When finished, check and correct:

- [ ] Every threat of high likelihood and impact has a control or an accepted risk with a name.
- [ ] Every role in `PRODUCT.md` appears in the matrix and every sensitive resource has a row.
- [ ] Each control says how it is verified.
- [ ] The file reveals nothing that helps an attacker.

## Gotchas

- GitHub shows `SECURITY.md` as the repository's public policy. The first section is how to report a vulnerability, and the file contains no internal server names, known unfixed vulnerabilities or infrastructure details. Those go somewhere private.
- "Passwords are encrypted" is incorrect: they are stored with a derivation function designed for passwords, which the framework already includes. Do not specify an algorithm from memory; refer to the framework's mechanism and check its current documentation.
- Authorization in the interface (hiding a button) is not a control. The rule is always on the server side.
- Password requirements with many composition rules and forced periodic changes produce worse passwords. Prefer minimum length, checking against leaked passwords and a second factor.
- A secret that was ever pushed to the repository is compromised even if deleted: it must be rotated.

## Project context

- **Read before asking:** `docs/security/threats.md`, `PRODUCT.md` (roles, data) and `ARCHITECTURE.md` (authentication, integrations). If `docs/security/review.md` exists (the output of `sec-review`), its policy gaps are the first thing to resolve.
- **Write** `SECURITY.md` at the root. If it already exists, keep the reporting section and modify only what changes; relaxing an already-defined control requires confirmation.
- Incident response is defined in `OPERATIONS.md` (`ops-define`); here it is only linked.
- If there is no repository or files cannot be written, deliver the content in the conversation under that file name.

## Closing every response

End with the threats without a control, the risks pending acceptance, the open regulatory questions and the next step: `sec-review` once there is code to check against the policy.
