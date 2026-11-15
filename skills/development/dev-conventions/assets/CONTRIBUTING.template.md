# How to contribute to [project name]

## Set up the environment

Requirements: [language and tool versions]

```bash
[install command]
```

```bash
[command to run locally]
```

## Workflow

1. Create a branch from `main`: `[type]/[short-description]`.
2. Make small changes and atomic commits.
3. Open a pull request; it must pass CI and have [n] approval(s).
4. It is merged by [squash / merge / rebase].

## Commits

Format: `type(scope): summary in the imperative`

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`.

| Correct | Incorrect |
| :--- | :--- |
| `fix(payments): reject negative amounts` | `various fixes` |

## Pull requests

- Guideline maximum size:
- The description says what changes, why and how it was tested, and links the requirement or task.
- What a person reviews: [list]. What CI reviews: [list].

## Automatic tools

| What | Tool | Command | When it runs |
| :--- | :--- | :--- | :--- |
| Format | | | On save, before commit, in CI |
| Lint | | | |
| Tests | | | |

## Conventions the tools do not cover

### Names

| Element | Convention | Example |
| :--- | :--- | :--- |
| Files | | |
| Functions | | |
| Tests | | |

### Structure

[Where each type of code goes. See ARCHITECTURE.md.]

### Errors and logging

- How errors are created and propagated:
- What is never silenced:
- What data is never logged:

### Dependencies

- Who approves a new dependency and by what criterion:

## Definition of done

- [ ] Meets the acceptance criteria of the requirement.
- [ ] Has the tests that TESTING.md requires and all of them pass.
- [ ] Format and lint with no errors.
- [ ] The documentation and context files affected are updated.
- [ ]

## Source

- Detected conventions: [docs/development/detected-conventions.md](docs/development/detected-conventions.md)
- Who approves changes to this file:
