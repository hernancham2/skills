# Operations: [project name]

Version [0.1] · [date]

## Objectives

| Objective | Value | Source |
| :--- | :--- | :--- |
| Availability | | NFR-00 |
| Maximum data loss | | |
| Maximum recovery time | | |
| Release frequency | | |

## Environments

| Environment | Purpose | Address | Who deploys | Data |
| :--- | :--- | :--- | :--- | :--- |
| Local | | | | |
| Pre-production | | | | |
| Production | | | | |

## Pipeline

| Stage | What it does | If it fails |
| :--- | :--- | :--- |
| | | |

Configuration: [path of the CI file]

## Deploy

```bash
[command or steps]
```

- Strategy:
- Who approves:
- Post-deployment verification:

## Roll back

```bash
[command or steps]
```

- How long it takes:
- Who can do it:
- What happens with the data written since the deployment:

## Database migrations

- How they are run:
- Compatibility rule:

## Configuration

| Variable | What for | Mandatory | Where it is defined |
| :--- | :--- | :--- | :--- |
| | | | |

The values of secrets are not written here. See [SECURITY.md](SECURITY.md).

## Observability

- Logging (format, where it is queried):
- Metrics and dashboards:
- Health checks:

| Alert | Condition | Who receives it | What to do |
| :--- | :--- | :--- | :--- |
| | | | |

## Backup and recovery

| What | Frequency | Where | Retention |
| :--- | :--- | :--- | :--- |
| | | | |

Restore:

```bash
[command or steps]
```

- Last restore tested:
- Test frequency:

## Incidents

| Severity | Criteria | Who responds | Response time |
| :--- | :--- | :--- | :--- |
| 1 | | | |
| 2 | | | |
| 3 | | | |

- Communication channel:
- Post-incident analyses: [docs/delivery/incidents/](docs/delivery/incidents/)

## Versions

- Scheme:
- How it is tagged and published:

## Source

- Constraints: [docs/delivery/environment.md](docs/delivery/environment.md)
- Who approves changes to this file:
