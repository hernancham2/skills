# Instructions for agents

This repository contains skills in the Agent Skills format, grouped by software lifecycle phase.

- Skills live in `skills/<phase>/<prefix>-<name>/SKILL.md`. The phases and their prefixes are in `skills.config.json`.
- Create skills with `npm run new -- <phase|prefix> <name>`; do not copy folders by hand.
- Follow `docs/standard.md` when writing or modifying a skill.
- Skills, templates and scripts are written in English; skills tell the agent to respond in the user's language. Documentation is bilingual: the English files in `docs/` are the source of truth and the Spanish copies live in `docs/es/` (overview in `docs/es/README.md`). When you change one, update the other.
- Every skill declares in `metadata` which context files it reads and writes, according to `docs/context.md`. A skill only writes the primitive of its own phase.
- After any change in `skills/`, run `npm run generate` and `npm run check`.
- Do not edit `.claude-plugin/marketplace.json` or the `CATALOG` block of the README by hand: `npm run generate` produces them.
- Do not put loose `.md` files inside `skills/` outside a skill's folder; some agents load them as skills.
- Bump `metadata.version` when you change a skill that has already been published.
