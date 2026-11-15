# Security: [project name]

## Reporting a vulnerability

Do not open a public issue. Write to [private channel]. We respond within [time] and keep you informed until it is fixed.

## Data that is protected

| Class | Examples | Handling |
| :--- | :--- | :--- |
| Regulated | | |
| Sensitive | | |
| Internal | | |
| Public | | |

## Authentication

- Mechanism:
- Second factor:
- Sessions (duration, closing, renewal):
- Failed attempts:
- Access recovery:

## Authorization

Model: [by role / by attributes]. Everything is checked on the server; what is not listed is forbidden.

| Resource | Action | Anonymous | [Role] | [Role] | Administrator |
| :--- | :--- | :--- | :--- | :--- | :--- |
| | | | | | |

## Secrets

- Where they live:
- Who accesses them:
- Rotation:
- Never in: the repository, logs, error messages, tests.

## Inputs and outputs

- Validation:
- Data access:
- Output encoding:
- Uploaded files:

## Dependencies

- Scanning tool and when it runs:
- Time limit for applying security patches:

## Logging and audit

- Events that are logged:
- Data that is never logged:
- Retention and who accesses it:

## Encryption

- In transit:
- At rest:
- Backups:

## Regulation

| Regulation | Why it might apply | Confirmed by |
| :--- | :--- | :--- |
| | | |

## Controls and how they are verified

| Control | Threat | How it is verified |
| :--- | :--- | :--- |
| | TH-01 | |

## Accepted risks

| Risk | Accepted by | Date | Revisit when |
| :--- | :--- | :--- | :--- |
| | | | |

## Source

- Threat model: [docs/security/threats.md](docs/security/threats.md)
- Incident response: [OPERATIONS.md](OPERATIONS.md)
- Who approves changes to this file:
