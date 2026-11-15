# Estándar de skills

[English](../en/standard.md) · **Español**

Reglas que debe cumplir toda skill de este repositorio. Las marcadas con ✔ las comprueba `npm run validate`.

Base: la [especificación Agent Skills](https://agentskills.io/specification) y sus [buenas prácticas](https://agentskills.io/skill-creation/best-practices). Lo que añade este repositorio es la organización por fase, el prefijo en el nombre, los campos de `metadata` y el [contexto del proyecto](context.md) que las skills leen y escriben.

## 1. Ubicación y nombre

```text
skills/<fase>/<prefijo>-<nombre>/
├── SKILL.md        obligatorio
├── references/     opcional: documentación que el agente lee solo si la necesita
├── scripts/        opcional: código ejecutable
└── assets/         opcional: plantillas de salida, esquemas, datos
```

- ✔ La carpeta de la fase debe existir en [`skills.config.json`](../../skills.config.json).
- ✔ El nombre empieza con el prefijo de su fase (`req-`, `des-`, `arch-`, `dev-`, `qa-`, `sec-`, `ops-`, `mnt-`, `pm-`).
- ✔ Solo letras minúsculas, números y guiones simples; 64 caracteres como máximo; sin `claude` ni `anthropic`.
- ✔ El `name` del frontmatter = el nombre de la carpeta, y es único en todo el repositorio.
- Tras el prefijo, usa un verbo en forma base o un sustantivo de acción: `req-elicit`, `qa-strategy`.

El prefijo existe porque los agentes instalan todas las skills en una sola carpeta plana: mantiene juntas las de una fase y evita choques de nombres con skills de otros autores.

## 2. Frontmatter

```yaml
---
name: req-elicit
description: "Use at the start of a software project or feature to discover needs: identify stakeholders, prepare interviews and workshops, and process notes from those sessions."
license: MIT
metadata:
  author: "Hernan"
  version: "0.1.0"
  phase: "requirements"
  reads: "PRODUCT.md"
  writes: "docs/requirements/findings.md"
---
```

| Campo | Obligatorio | Regla |
| --- | --- | --- |
| `name` | ✔ | Ver sección 1. |
| `description` | ✔ | 1–1024 caracteres, sin `<` ni `>`. Entre comillas dobles. |
| `license` | | Identificador SPDX. |
| `compatibility` | | Solo si hay requisitos reales de entorno (500 caracteres máx.), p. ej. `"Requires git and Node.js 20+"`. |
| `metadata.author` | | Autor. |
| `metadata.version` | ✔ | Semver entre comillas. |
| `metadata.phase` | ✔ | Igual al nombre de la carpeta de la fase. |
| `metadata.reads` | | Archivos de contexto que consulta, separados por comas. ✔ Primitivas conocidas o rutas bajo `docs/`. |
| `metadata.writes` | | Archivos de contexto que produce. ✔ Solo la primitiva de su propia fase, `AGENTS.md` o rutas bajo `docs/`. |
| `allowed-tools` | | Experimental; el soporte varía entre agentes. |

- ✔ Los valores de `metadata` van entre comillas: la especificación exige texto, y `1.0` sin comillas es un número.
- ✔ No uses campos fuera de la especificación (el validador avisa). Extensiones como `context: fork` solo funcionan en Claude Code.

### Cómo escribir `description`

Es lo único que el agente ve antes de decidir si carga la skill, así que determina si se activa.

- **En imperativo, como una instrucción al agente:** empieza con `Use when ...` o `Use to ...`. El agente decide si actuar; dile cuándo.
- **Desde la intención del usuario**, no desde el mecanismo interno: lo que quiere lograr, con las palabras que usaría al pedirlo.
- **Insistente:** enumera las situaciones en que aplica, también cuando el usuario no nombra el tema (`applies even if they only say they want it to look professional`).
- **Con un límite:** si puede confundirse con otra skill, di cuándo no: `Do not use for ... (other-skill)`.
- Unas pocas frases. El límite duro es 1024 caracteres.

| Mal | Bien |
| --- | --- |
| `Helps with requirements.` | `Use to review requirements that are already written (stories, specification, backlog) before estimating or building: detect ambiguity, contradictions, gaps and non-verifiable requirements.` |

Para comprobar que se activa bien, escribe unas veinte peticiones realistas: la mitad que deberían activarla y la mitad que no. Los negativos útiles son los casi aciertos: comparten palabras con la skill pero necesitan otra cosa. El método completo está en [Optimizing skill descriptions](https://agentskills.io/skill-creation/optimizing-descriptions).

## 3. Cuerpo

Secciones de la [plantilla](../../template/SKILL.template.md), en este orden. Son un punto de partida: adapta la estructura a la tarea (por ejemplo, principios y modos según lo que se te da, como en las skills `req-*` y `des-*`), elimina las que no apliquen y no dejes secciones vacías.

| Sección | Contenido |
| --- | --- |
| Título y objetivo | Una o dos frases: qué resuelve y qué resultado deja. |
| When to use / When not to use | Situaciones concretas y la skill alternativa para casos parecidos. |
| Inputs | Qué necesita el agente y qué hacer si falta. |
| Process | Pasos numerados en imperativo. Explica el porqué de las reglas no obvias. |
| Output | El formato exacto del entregable. |
| Verification | Una lista de comprobaciones objetivas de que el trabajo está completo. |
| Gotchas | Hechos concretos que contradicen lo que el agente asumiría. Suele ser la sección más valiosa: cada corrección que tengas que hacerle a un agente va aquí. |
| Project context | Qué archivos lee antes de preguntar y dónde guarda el resultado. Obligatoria si declara `reads` o `writes`. Ver [context.md](context.md). |

Reglas de redacción:

- ✔ Máximo 500 líneas en `SKILL.md` (unos 5000 tokens). El detalle va en `references/`.
- ✔ Enlaces con rutas relativas a la carpeta de la skill, que existan y no salgan de ella (`..`). Cada skill debe poder instalarse por sí sola.
- ✔ Toda skill mencionada en el cuerpo (`` `req-validate` ``) debe existir en el repositorio. El validador también avisa si una skill lee un archivo que ninguna skill escribe, si una skill escribe un archivo que ninguna lee (callejón sin salida), y si un cuerpo menciona una primitiva o una ruta `docs/` que no forma parte del modelo de contexto (un `FOO.md` desconocido es un error).
- Los archivos de `references/` se enlazan directamente desde `SKILL.md`; no encadenes referencias dentro de referencias.
- Las plantillas de primitivas en `assets/` se llaman `NOMBRE.template.md` (por ejemplo `DESIGN.template.md`), para que ningún agente las confunda con el archivo real del proyecto.
- Los diagramas van en Mermaid dentro del documento del aspecto que modelan. Ver [context.md](context.md#diagramas).
- **Parte de experiencia real.** Una skill generada solo desde conocimiento general produce consejos vagos. Sale de una tarea hecha de verdad, de tus documentos y de las correcciones que tuviste que hacer.
- Escribe solo lo que el agente no sabe ya: tu proceso, tus criterios y tus formatos. Por cada línea pregúntate si el agente se equivocaría sin ella; si no, bórrala.
- **Un camino por defecto, no un menú.** Elige una herramienta o enfoque y menciona la alternativa solo para el caso en que aplique.
- **Prescribe según la fragilidad.** Sé estricto donde importan el orden o el formato (comandos exactos, plantillas); da libertad y explica el porqué donde varios caminos son válidos.
- **Procedimientos, no respuestas.** Enseña cómo abordar la clase de problema, no qué entregar en un caso concreto.
- **Di cuándo cargar cada referencia:** "lee `references/criteria.md` antes de definir el color", no "ver references/".
- **Plantillas para los formatos de salida.** Las cortas dentro de `SKILL.md`; las largas en `assets/`.
- **Bucle de validación:** hacer, comprobar (script, lista o referencia), corregir y repetir hasta que pase.
- Si los agentes reescriben la misma lógica en cada uso, conviértela en un script probado en `scripts/`.
- No dependas de las herramientas de un agente concreto. Si es inevitable, decláralo en `compatibility`.
- El contenido de la skill está en inglés. La propia skill le indica al agente que responda en el idioma del usuario.

## 4. Versionado

Sube `metadata.version` en cada cambio publicado:

- **Parche** (`0.1.1`): correcciones de redacción sin cambio de comportamiento.
- **Menor** (`0.2.0`): pasos, referencias o casos nuevos.
- **Mayor** (`1.0.0`): cambia la salida o cambia el momento en que se activa.

## 5. Antes de publicar

- [ ] `npm run check` pasa sin errores.
- [ ] Probaste la skill con una petición real, sin nombrarla, y el agente la activó.
- [ ] Probaste una petición parecida que **no** debería activarla.
- [ ] Leíste lo que hizo el agente, no solo el resultado, y recortaste lo que le hacía perder tiempo.
- [ ] No contiene secretos, datos de clientes ni rutas de tu equipo.

## Añadir o cambiar una fase

Edita `phases` en [`skills.config.json`](../../skills.config.json) (`id` = nombre de la carpeta, `prefix` = prefijo de las skills, `primitive` = archivo del que es dueña) y ejecuta `npm run generate`. Renombrar un prefijo obliga a renombrar las skills de esa fase.
