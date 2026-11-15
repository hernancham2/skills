# Publicación

[English](../en/publishing.md) · **Español**

El repositorio se publica una sola vez, en GitHub, como repositorio público. Cada plataforma lo lee desde ahí.

Antes de publicar:

1. Si haces un fork, cambia `repository` y `author` en [`skills.config.json`](../../skills.config.json) y el propietario en el [README](../../README.md) y en los archivos de `docs/`.
2. `npm run generate` y `npm run check`.
3. Sube los cambios a la rama principal.

## skills.sh

No hay formulario de alta. [skills.sh](https://skills.sh) es un ranking alimentado por la telemetría anónima de la CLI `skills`: el repositorio aparece cuando alguien instala desde él.

```bash
npx skills add hernancham2/software-engineering-skills
```

La CLI encuentra las skills en `skills/<fase>/<nombre>/SKILL.md` (recorre `skills/` hasta tres niveles de profundidad) y también lee `.claude-plugin/marketplace.json`. Con `-a <agente>` instala en la carpeta de cada agente:

| Agente | `-a` | Proyecto | Usuario (`-g`) |
| --- | --- | --- | --- |
| Claude Code | `claude-code` | `.claude/skills/` | `~/.claude/skills/` |
| Codex / ChatGPT | `codex` | `.agents/skills/` | `~/.agents/skills/` |
| Gemini CLI | `gemini-cli` | `.agents/skills/` | `~/.gemini/skills/` |
| Antigravity | `antigravity` | `.agents/skills/` | `~/.gemini/config/skills/` |
| opencode | `opencode` | `.agents/skills/` | `~/.config/opencode/skills/` |

Una skill con `metadata.internal: "true"` queda oculta para la CLI; sirve para borradores.

## Claude Code

El archivo [`.claude-plugin/marketplace.json`](../../.claude-plugin/marketplace.json) convierte el repositorio en un marketplace con un plugin por fase (`se-<fase>`). `npm run generate` lo produce; no se edita a mano.

```bash
claude plugin validate .
```

```bash
claude plugin marketplace add hernancham2/software-engineering-skills
```

```bash
claude plugin install se-requirements@software-engineering-skills
```

Las skills instaladas así se invocan como `/se-requirements:req-elicit`. Para la app de Claude (claude.ai), comprime la carpeta de una skill en un `.zip` y súbelo desde Customize → Skills → **+** → Upload a skill. El nombre de la carpeta debe coincidir con el `name` de la skill, algo que el estándar de este repositorio ya garantiza.

## Codex y ChatGPT

Codex y la app de escritorio de ChatGPT leen las skills de `.agents/skills/` (proyecto) y `~/.agents/skills/` (usuario). Instala con `npx skills add ... -a codex`.

OpenAI recomienda plugins para distribuir skills a ChatGPT web y móvil. Este repositorio todavía no incluye ese manifiesto.

## Gemini CLI y Antigravity

```bash
gemini skills install https://github.com/hernancham2/software-engineering-skills.git --path skills/requirements/req-elicit
```

`--scope workspace` la instala solo en el proyecto actual. Antigravity lee `.agents/skills/` en el proyecto y `~/.gemini/config/skills/` a nivel de usuario; usa `npx skills add ... -a antigravity`.

## opencode

Lee `.opencode/skills/`, `.claude/skills/` y `.agents/skills/` en el proyecto, y `~/.config/opencode/skills/` a nivel de usuario. Usa `npx skills add ... -a opencode`.

## Referencias

- [Especificación Agent Skills](https://agentskills.io/specification)
- [CLI `skills`: estructuras y descubrimiento](https://github.com/vercel-labs/skills/blob/main/docs/creating-skills.md)
- [Marketplaces de plugins de Claude Code](https://code.claude.com/docs/en/plugin-marketplaces)
- [Skills en Codex / ChatGPT](https://learn.chatgpt.com/docs/build-skills)
- [Skills en Gemini CLI](https://geminicli.com/docs/cli/skills/)
- [Skills en Antigravity](https://antigravity.google/docs/skills)
- [Skills en opencode](https://opencode.ai/docs/skills/)
