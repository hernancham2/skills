# Contexto del proyecto

[English](../en/context.md) · **Español**

Las skills de este repositorio no funcionan aisladas: cada una lee y escribe un conjunto fijo de archivos en el repositorio del proyecto donde se usa. Esos archivos son el **contexto del proyecto**: lo que cualquier persona o agente necesita leer para trabajar sin volver a preguntar lo que ya se decidió.

## Dos tipos de archivo

| Tipo | Dónde | Qué contiene | Quién lo lee |
| --- | --- | --- | --- |
| **Primitiva** | Raíz del proyecto, en mayúsculas (`DESIGN.md`) | Solo decisiones vigentes sobre un aspecto, breves y con valores exactos | Todo agente, antes de cualquier tarea que toque ese aspecto |
| **Material de trabajo** | `docs/<fase>/` | El camino hasta la decisión: notas, hallazgos, briefs, especificaciones, informes | La skill de la misma fase, cuando lo necesita |

La separación existe por el presupuesto de contexto: una primitiva se carga muchas veces, así que cada línea debe justificar su lugar. El detalle vive en `docs/` y se enlaza.

## Las primitivas

| Fase | Primitiva | Responde | Material de trabajo |
| --- | --- | --- | --- |
| (índice) | `AGENTS.md` | ¿Cómo se trabaja en este repositorio y dónde está todo? | |
| Requisitos | `PRODUCT.md` | ¿Qué se construye, para quién y por qué? | `docs/requirements/` (findings, specification, validation) |
| Diseño | `DESIGN.md` | ¿Cómo se ve y cómo habla? | `docs/design/` (brief, navigation, review) |
| Arquitectura | `ARCHITECTURE.md` | ¿Cómo está construido y por qué así? | `docs/architecture/` (drivers, ADRs, review) |
| Desarrollo | `CONTRIBUTING.md` | ¿Cómo se escribe e integra el código? | `docs/development/` (detected conventions, guides) |
| Pruebas | `TESTING.md` | ¿Qué se prueba, cómo y con qué umbral? | `docs/testing/` (risks, cases, review) |
| Seguridad | `SECURITY.md` | ¿Qué se protege, de quién y cómo se reporta? | `docs/security/` (threats, review) |
| Entrega | `OPERATIONS.md` | ¿Cómo se despliega, se observa y se recupera? | `docs/delivery/` (environment, review, incidents) |
| Mantenimiento | `CHANGELOG.md` | ¿Qué cambió y qué deja de tener soporte? | `docs/maintenance/` (debt, migrations) |
| Gestión | `ROADMAP.md` | ¿Qué viene, en qué orden y con qué riesgos? | `docs/management/` (plan, risks, status) |

La correspondencia fase → primitiva está en [`skills.config.json`](../../skills.config.json). Donde existen nombres establecidos se usan: [`AGENTS.md`](https://agents.md), `CONTRIBUTING.md`, `SECURITY.md` y `CHANGELOG.md` son convenciones de la industria, y `DESIGN.md` tiene una estructura propia, definida por `des-guidelines`: tokens en YAML más prosa en un conjunto fijo de secciones.

`PRODUCT.md` cumple el papel que otros métodos dan a un PRD, y `ARCHITECTURE.md` junto con los requisitos no funcionales de `PRODUCT.md` el de un TRD. La diferencia es que estos archivos están vivos: se actualizan durante todo el proyecto en lugar de escribirse una vez y aprobarse.

## Reglas de una primitiva

1. **Solo decisiones.** Lo que está en discusión va en `docs/`. Una decisión aún no aprobada puede aparecer marcada como *propuesta*, con quién la aprueba.
2. **Valores, no adjetivos.** `#1D4ED8`, "95 % de las respuestas en menos de 2 s", `npm test`.
3. **Breve.** Como guía, menos de 200 líneas. Si crece, se mueve el detalle a `docs/` y se deja el enlace.
4. **Una sola fuente.** Un dato vive en una primitiva; las demás lo enlazan. Las plataformas se definen en `PRODUCT.md`, no se repiten en `DESIGN.md`.
5. **Un solo dueño.** Solo las skills de su fase escriben una primitiva. Las demás la leen.
6. **Actualizada, no reescrita.** Una skill modifica las secciones que le conciernen y conserva el resto. Cambiar una decisión ya *definida* requiere la confirmación de la persona.
7. **Con rastro.** Cada primitiva enlaza el material de trabajo del que salió.
8. **Enlazada desde `AGENTS.md`**, para que cualquier agente la encuentre sin tener las skills instaladas.

## Tres roles por fase

Cada colección de skills repite el mismo recorrido:

| Rol | Hace | Lee | Escribe |
| --- | --- | --- | --- |
| **Discover** (descubrir) | Reúne información y detecta vacíos | Primitivas de fases anteriores | `docs/<fase>/` |
| **Define** (definir) | Convierte lo reunido en decisiones y resuelve los hallazgos del último informe de validación | `docs/<fase>/` (incluido el informe de validación) y primitivas anteriores | La primitiva de la fase |
| **Validate** (validar) | Revisa lo decidido antes de construir sobre ello | La primitiva y su material | Un informe (en la conversación o en `docs/<fase>/`) |

No todas las fases siguen el patrón al pie de la letra: algunas unen descubrir y definir en una skill (`dev-conventions`, `qa-strategy`) y otras añaden skills para tareas recurrentes (`dev-implement`, `dev-document`, `ops-incident`, `mnt-migrate`).

## El recorrido completo

| Fase | Discover | Define | Validate | Otras |
| --- | --- | --- | --- | --- |
| Requisitos | `req-elicit` | `req-specify` → `PRODUCT.md` | `req-validate` | |
| Diseño | `des-discover` | `des-guidelines` → `DESIGN.md` | `des-validate` | `des-navigation` |
| Arquitectura | `arch-discover` | `arch-define` → `ARCHITECTURE.md` | `arch-validate` | |
| Desarrollo | `dev-conventions` | `dev-conventions` → `CONTRIBUTING.md` | `dev-review` | `dev-implement`, `dev-document` |
| Pruebas | `qa-strategy` | `qa-strategy` → `TESTING.md` | `qa-validate` | `qa-cases` |
| Seguridad | `sec-threats` | `sec-define` → `SECURITY.md` | `sec-review` | |
| Entrega | `ops-discover` | `ops-define` → `OPERATIONS.md` | `ops-validate` | `ops-incident` |
| Mantenimiento | `mnt-debt` | `mnt-changelog` → `CHANGELOG.md` | | `mnt-migrate` |
| Gestión | `pm-risks` | `pm-plan` → `ROADMAP.md` | `pm-status` | `pm-context` → `AGENTS.md` |

Orden habitual en un proyecto nuevo:

```text
pm-context                        prepara AGENTS.md y dice qué falta
  └─ req-elicit → req-specify → req-validate               PRODUCT.md
       ├─ des-discover → des-guidelines → des-validate     DESIGN.md
       │    └─ des-navigation                              docs/design/navigation.md
       └─ arch-discover → arch-define → arch-validate      ARCHITECTURE.md
            ├─ sec-threats → sec-define                    SECURITY.md
            ├─ dev-conventions                             CONTRIBUTING.md
            ├─ qa-strategy → qa-cases                      TESTING.md
            └─ ops-discover → ops-define                   OPERATIONS.md
pm-plan → pm-risks                                         ROADMAP.md

Durante la construcción, en cada tarea:
  dev-implement → dev-review → mnt-changelog               CHANGELOG.md
  dev-document                                             README y docs/development/guides/

Antes de publicar:
  qa-validate · sec-review · ops-validate

En operación y evolución:
  pm-status · ops-incident · mnt-debt · mnt-migrate
```

Ninguna skill exige que se hayan usado las anteriores: cada una lee lo que existe, pide lo que falta y dice qué skill produce lo que no encontró.

## Diagramas

Los diagramas no son documentos aparte. Van en Mermaid, como texto, dentro del archivo del aspecto que modelan, para que se versionen con él y un agente pueda leerlos y actualizarlos.

| Diagrama | Dónde va | Skill |
| --- | --- | --- |
| Contexto, procesos o actividades, estados del negocio, modelo conceptual | `docs/requirements/specification.md` | `req-specify` |
| Navegación entre pantallas (estados) | `docs/design/navigation.md` | `des-navigation` |
| Componentes, entidad-relación, secuencia de una integración | `ARCHITECTURE.md` y los ADR | `arch-define` |
| Flujo de datos con límites de confianza | `docs/security/threats.md` | `sec-threats` |
| Despliegue y entornos | `OPERATIONS.md` | `ops-define` |

Solo se dibuja el diagrama que responde una pregunta que el texto no responde. Un diagrama desactualizado confunde más que su ausencia: si el código lo contradice, se corrige o se borra.

## Cómo lo declara una skill

En el frontmatter, dentro de `metadata`, con rutas separadas por comas:

```yaml
metadata:
  reads: "PRODUCT.md, docs/design/brief.md"
  writes: "DESIGN.md"
```

`npm run validate` comprueba que las rutas sean primitivas conocidas o estén bajo `docs/`, y que una skill solo escriba la primitiva de su propia fase. El [catálogo](../en/README.md#catalog) muestra qué lee y escribe cada skill.

En el cuerpo, cada skill que participa lleva una sección **Project context** que indica:

- qué archivos leer antes de preguntar, y que lo ya definido allí no se vuelve a preguntar;
- dónde guardar el resultado y si se añade o se reemplaza;
- qué hacer si no hay repositorio o no se pueden escribir archivos: entregar el resultado en la conversación con el nombre de archivo sugerido.

## Añadir una primitiva

Añade o edita `primitive` en la fase correspondiente de `skills.config.json`, documenta la fila en la tabla de arriba y en [`pm-context`](../../skills/management/pm-context/references/primitives.md), y ejecuta `npm run generate`.
