# Publishing

**English** · [Español](../es/publishing.md)

The repository is published once, on GitHub, as a public repository. Each platform reads it from there.

Before publishing:

1. If you fork the repository, change `repository` and `author` in [`skills.config.json`](../../skills.config.json) and the owner in the [README](../../README.md) and in the files under `docs/`.
2. `npm run generate` and `npm run check`.
3. Push the changes to the main branch.

## skills.sh

There is no sign-up form. [skills.sh](https://skills.sh) is a ranking fed by the anonymous telemetry of the `skills` CLI: the repository appears when someone installs from it.

```bash
npx skills add hernancham2/skills
```

The CLI finds the skills in `skills/<phase>/<name>/SKILL.md` (it walks `skills/` up to three levels deep) and also reads `.claude-plugin/marketplace.json`. With `-a <agent>` it installs into each agent's folder:

| Agent | `-a` | Project | User (`-g`) |
| --- | --- | --- | --- |
| Claude Code | `claude-code` | `.claude/skills/` | `~/.claude/skills/` |
| Codex / ChatGPT | `codex` | `.agents/skills/` | `~/.agents/skills/` |
| Gemini CLI | `gemini-cli` | `.agents/skills/` | `~/.gemini/skills/` |
| Antigravity | `antigravity` | `.agents/skills/` | `~/.gemini/config/skills/` |
| opencode | `opencode` | `.agents/skills/` | `~/.config/opencode/skills/` |

A skill with `metadata.internal: "true"` is hidden from the CLI; it is useful for drafts.

## Claude Code

The file [`.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json) turns the repository into a marketplace with one plugin per phase (`se-<phase>`) and a `productivity` plugin for the general-purpose skills. `npm run generate` produces it; do not edit it by hand.

```bash
claude plugin validate .
```

```bash
claude plugin marketplace add hernancham2/skills
```

```bash
claude plugin install se-requirements@skills
```

Skills installed this way are invoked as `/se-requirements:req-elicit`. For the Claude app (claude.ai), compress a skill's folder into a `.zip` and upload it from Customize → Skills → **+** → Upload a skill. The folder name must match the skill's `name`, which this repository's standard already guarantees.

## Codex and ChatGPT

Codex and the ChatGPT desktop app read skills from `.agents/skills/` (project) and `~/.agents/skills/` (user). Install with `npx skills add ... -a codex`.

OpenAI recommends plugins for distributing skills to ChatGPT web and mobile. This repository does not yet include that manifest.

## Gemini CLI and Antigravity

```bash
gemini skills install https://github.com/hernancham2/skills.git --path skills/requirements/req-elicit
```

`--scope workspace` installs it only in the current project. Antigravity reads `.agents/skills/` in the project and `~/.gemini/config/skills/` at user level; use `npx skills add ... -a antigravity`.

## opencode

It reads `.opencode/skills/`, `.claude/skills/` and `.agents/skills/` in the project, and `~/.config/opencode/skills/` at user level. Use `npx skills add ... -a opencode`.

## References

- [Agent Skills specification](https://agentskills.io/specification)
- [`skills` CLI: layouts and discovery](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md)
- [Claude Code plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Skills in Codex / ChatGPT](https://learn.chatgpt.com/docs/build-skills)
- [Skills in Gemini CLI](https://geminicli.com/docs/cli/skills/)
- [Skills in Antigravity](https://antigravity.google/docs/skills)
- [Skills in opencode](https://opencode.ai/docs/skills/)
