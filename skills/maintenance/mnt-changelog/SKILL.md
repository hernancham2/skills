---
name: mnt-changelog
description: "Use when preparing a release or finishing a user-visible change: update CHANGELOG.md, decide the version number according to the type of change, write release notes and the migration instructions for incompatible changes. Applies when asked for the changelog, release notes, which version applies, what changed since the last version or to prepare a release. Do not use to plan a technical migration (mnt-migrate) or for the deployment process (ops-define)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "maintenance"
  reads: "CHANGELOG.md, PRODUCT.md, OPERATIONS.md"
  writes: "CHANGELOG.md"
---

# Changelog and versions

You maintain `CHANGELOG.md`: the history of what changed for whoever uses the product, version by version. It is written for people who decide whether to upgrade and what it affects, not for whoever wrote the code.

## Principles

- **For whoever uses it, not whoever programs it.** Each entry says what changes for the user or the integrator. Internal refactorings with no visible effect do not appear.
- **It is not the git history.** Several commits are one entry; a cleanup commit, none.
- **What is published is not rewritten.** An already-published version is only corrected if it has an error, and that is noted.
- **Every incompatible change says how to migrate.**
- Respond in the user's language.

## Format

That of *Keep a Changelog*, with semantic versioning:

```markdown
# Changelog

## [Unreleased]

### Added
- Export orders to CSV from the order list.

## [1.2.0] - 2026-03-14

### Changed
- Search now ignores case and accents.

### Fixed
- The order total is no longer duplicated when two discounts are applied.
```

- The most recent version goes on top. Dates in `YYYY-MM-DD` format.
- Changes in progress accumulate under **Unreleased** and are moved to a version on release.
- Categories, in this order and only those with content: **Added**, **Changed**, **Deprecated**, **Removed**, **Fixed**, **Security**.

## Choose the mode

| Situation | Mode |
| :--- | :--- |
| A change was finished | A. Add an entry |
| A version is about to be published | B. Prepare the version |
| `CHANGELOG.md` does not exist | C. Create |

## A. Add an entry

1. Decide whether the change is visible to the user or the integrator. If it is not, there is no entry.
2. Choose the category.
3. Write one sentence that starts with what changes, in the product's vocabulary (the glossary in `PRODUCT.md`). Add the identifier of the requirement or the issue if there is one.
4. Add it under **Unreleased**.

| Bad | Good |
| :--- | :--- |
| `Refactor payment service` | (no entry: nothing changes for the user) |
| `Fixed bug in dates` | `Invoices issued on the last day of the month now show the correct date.` |
| `New endpoint` | `API: new resource /orders/{id}/events to query the history of an order.` |

## B. Prepare the version

1. **Gather the changes** since the last version: what has accumulated under **Unreleased** and, so that nothing is left out, the git history since the last tag and the merged pull requests.
2. **Decide the number:**

   | Contains | Bumps | Example |
   | :--- | :--- | :--- |
   | A change that is incompatible for whoever uses or integrates | Major | 1.4.2 → 2.0.0 |
   | Compatible new functionality | Minor | 1.4.2 → 1.5.0 |
   | Only fixes | Patch | 1.4.2 → 1.4.3 |

   Before 1.0.0 the interface is not considered stable: incompatible changes bump the minor version. Follow the scheme defined in `OPERATIONS.md` if it is different.
3. **Incompatible changes:** mark them at the top of the version with what stops working, whom it affects and the steps to adapt.
4. **Deprecated:** what keeps working but will be removed, with the version or date of removal and the alternative.
5. **Move** the entries from **Unreleased** to the new version with the date and leave **Unreleased** empty.
6. **Check:** the number matches that of the project manifest, each incompatible change has migration steps and no entry remains that only the team understands.

If asked, also write the release notes for end users: shorter, with the most relevant first and without jargon.

## C. Create

Create the file with the header and the **Unreleased** section. Do not reconstruct past versions by inventing content: if there are tags in git, add only what the history lets you state and mark where the reliable record begins.

## Gotchas

- You do not decide that it gets published: you prepare the version; tagging and publishing is done by a person or by the pipeline.
- A security fix goes under **Security** without details that let someone who has not yet updated exploit it.
- Changing a default behavior, tightening a validation or renaming an API field is incompatible even if it seems minor.
- Do not mix languages or date formats between versions.

## Project context

- **Read** the existing `CHANGELOG.md`, `PRODUCT.md` (vocabulary) and `OPERATIONS.md` (version scheme).
- **Write** `CHANGELOG.md` at the root. Add on top; do not modify already-published versions.
- If there is no repository or files cannot be written, deliver the entries in the conversation.

## Closing every response

End with the proposed version and its reason, the incompatible changes and whatever remains to be confirmed before publishing.
