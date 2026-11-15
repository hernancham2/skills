# Documentación

[English](../en/README.md) · **Español** · [Volver a la página del proyecto](../../README.md)

Todo sobre cómo está organizado este repositorio y cómo se escriben sus skills. Los archivos en inglés son la fuente de verdad; cada uno tiene su copia en español en esta carpeta.

Las skills están escritas en inglés y responden en el idioma de quien las usa, así que puedes pedirles cosas en español.

## Guías

| Guía | Léela para |
| --- | --- |
| [Estándar de skills](standard.md) | Escribir o cambiar una skill: nombres, frontmatter, cómo redactar la descripción, secciones del cuerpo, versionado. |
| [Contexto del proyecto](context.md) | Entender qué archivos leen y escriben las skills, quién es dueño de cada uno y en qué orden se producen. |
| [Publicación e instalación](publishing.md) | Instalar las skills en cada agente o publicar tu propio fork. |

## Catálogo

El catálogo completo, con la descripción de cada skill, qué lee y qué escribe, se genera automáticamente y está en la [sección Catalog de la documentación en inglés](../en/README.md#catalog). Las fases son:

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

## Estructura del repositorio

```text
skills/<fase>/<prefijo>-<nombre>/SKILL.md   las skills, agrupadas por fase
template/SKILL.template.md                  plantilla base de una skill
skills.config.json                          fases, prefijos y datos del marketplace
scripts/                                    crear, validar y generar manifiestos
tests/                                      pruebas de los scripts (node --test)
assets/logo.svg                             logo del proyecto
.claude-plugin/marketplace.json             generado; no se edita a mano
docs/en/                                    documentación en inglés (fuente de verdad)
docs/es/                                    documentación en español
```

## Crear una skill

```bash
npm run new -- req elicit
```

Eso crea `skills/requirements/req-elicit/SKILL.md` a partir de la plantilla. Después:

1. Completa los `TODO` siguiendo el [estándar](standard.md).
2. `npm run validate` comprueba la especificación y el estándar de este repositorio.
3. `npm run generate` actualiza el marketplace de Claude, el resumen de fases del README principal y el catálogo.

`npm run check` ejecuta la validación, falla si los archivos generados están desactualizados y corre las pruebas de `tests/` (`npm test` ejecuta solo esas). Ejecútalo antes de cada commit y de cada pull request.
