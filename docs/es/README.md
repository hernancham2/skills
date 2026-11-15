# Software Engineering Skills

[English](../../README.md) · **Español**

Skills de ingeniería de software para agentes de IA, organizadas por fase del ciclo de vida.

Siguen el formato abierto [Agent Skills](https://agentskills.io/specification), así que funcionan en Claude Code, Codex / ChatGPT, Gemini CLI, Antigravity, opencode, Cursor, GitHub Copilot y cualquier agente compatible.

Las skills están escritas en inglés y responden en el idioma de quien las usa, por lo que puedes pedirles cosas en español. La documentación del repositorio está disponible en inglés y en español.

## Instalación

**Cualquier agente** (la CLI de [skills.sh](https://skills.sh), requiere Node.js):

```bash
npx skills add hernancham2/software-engineering-skills
```

Opciones útiles: `--list` para ver las skills sin instalar, `--skill req-elicit` para instalar una sola, `-a claude-code` (o `codex`, `gemini-cli`, `antigravity`, `opencode`) para elegir el agente y `-g` para instalar a nivel de usuario.

**Claude Code** (marketplace de plugins, un plugin por fase):

```bash
claude plugin marketplace add hernancham2/software-engineering-skills
```

```bash
claude plugin install se-requirements@software-engineering-skills
```

**Gemini CLI** (una skill concreta):

```bash
gemini skills install https://github.com/hernancham2/software-engineering-skills.git --path skills/requirements/req-elicit
```

Más detalle por plataforma en [publishing.md](publishing.md).

## Cómo se encadenan

Las skills acompañan un proyecto de principio a fin y dejan sus decisiones en archivos fijos en la raíz del proyecto (`PRODUCT.md`, `DESIGN.md`, `ARCHITECTURE.md`…), enlazados desde `AGENTS.md`. Cada fase reúne información en `docs/<fase>/`, la convierte en decisiones en su archivo y la valida; la fase siguiente lee esos archivos en lugar de volver a preguntar. El modelo completo, con el recorrido por todas las skills, está en [context.md](context.md). Para empezar o retomar un proyecto usa `pm-context`: prepara `AGENTS.md`, dice qué falta y qué skill usar a continuación.

## Catálogo

El catálogo completo, con la descripción de cada skill, qué lee y qué escribe, se genera automáticamente y está en la sección [Catalog del README en inglés](../../README.md#catalog). Las fases son:

| Fase | Prefijo | Archivo que decide |
| --- | --- | --- |
| Requisitos | `req-` | `PRODUCT.md` |
| Diseño visual y marca | `des-` | `DESIGN.md` |
| Arquitectura y diseño técnico | `arch-` | `ARCHITECTURE.md` |
| Desarrollo | `dev-` | `CONTRIBUTING.md` |
| Pruebas y calidad | `qa-` | `TESTING.md` |
| Seguridad | `sec-` | `SECURITY.md` |
| Entrega y operación | `ops-` | `OPERATIONS.md` |
| Mantenimiento y evolución | `mnt-` | `CHANGELOG.md` |
| Gestión del proyecto | `pm-` | `ROADMAP.md` |

## Estructura

```text
skills/<fase>/<prefijo>-<nombre>/SKILL.md   las skills, agrupadas por fase
template/SKILL.md                           plantilla base de una skill
skills.config.json                          fases, prefijos y datos del marketplace
scripts/                                    crear, validar y generar manifiestos
.claude-plugin/marketplace.json             generado; no se edita a mano
docs/standard.md                            el estándar de redacción (en español: docs/es/)
docs/context.md                             qué archivos del proyecto leen y escriben las skills
docs/publishing.md                          cómo publicar en cada plataforma
```

## Crear una skill

```bash
npm run new -- req elicit
```

Eso crea `skills/requirements/req-elicit/SKILL.md` a partir de la plantilla. Después:

1. Completa los `TODO` siguiendo [standard.md](standard.md).
2. `npm run validate` comprueba la especificación y el estándar de este repositorio.
3. `npm run generate` actualiza el marketplace de Claude y el catálogo del README.

`npm run check` ejecuta la validación y falla si los archivos generados están desactualizados; es lo que corre en CI.

## Licencia

[MIT](../../LICENSE)
