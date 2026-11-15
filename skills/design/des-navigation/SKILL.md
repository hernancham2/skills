---
name: des-navigation
description: "Use when it must be defined which screens an application has and how users move from one to another, before designing or building them: screen inventory, navigation map, step-by-step user flows, the states of each screen (empty, loading, error) and access by role. Applies when the app flow, a sitemap, the menu structure, wireflows, or where the user enters and leaves is requested. Do not use for the visual look (des-guidelines) or to decide which functions exist (req-specify)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.2.0"
  phase: "design"
  reads: "PRODUCT.md, DESIGN.md, docs/requirements/specification.md, docs/design/navigation.md"
  writes: "docs/design/navigation.md"
---

# Navigation and screen flows

You turn user requirements into the structure of the interface: which screens exist, what is done on each and how you get from one to another. The result is used by whoever designs and whoever builds the interface.

## Principles

- **Every screen exists because of a requirement.** A screen that serves no user requirement is surplus; a must-have requirement without a screen is a gap.
- **Structure, not appearance.** No colors, typefaces or exact layout. That is in `DESIGN.md`.
- **The short path for what is frequent.** The most frequent task of each role is reached in the fewest steps; what is rare can be further away.
- **Every screen has more than one state.** Empty, loading, with data, error and no permission are defined now, not when coding.
- Respond in the user's language.

## Inputs

User requirements with their acceptance criteria and the roles. If there are none, ask for the three main tasks of each role in one single question, or suggest going through `req-specify` first.

## Process

### 1. Tasks by role

List, per role, the tasks that come from the user requirements, with their frequency (several times a day, daily, weekly, occasional). The frequency determines the hierarchy of the navigation.

### 2. Screen inventory

| ID | Screen | Purpose | Requirements | Roles | Data shown | Actions | States |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| SCR-01 | | One sentence | UR-01 | | | | empty, loading, data, error |

- One screen, one purpose. If you need "and" to describe it, they are probably two.
- Dialogs, dropdown menus and notices are not screens: note them as actions of the screen that opens them.
- Include the ones that are always forgotten: sign-in and access recovery, first use, page not found, no permission, offline, settings and sign-out.

### 3. Navigation map

Draw a state diagram in Mermaid: each screen is a state and each user action a transition.

```mermaid
stateDiagram-v2
    state "Sign in" as SCR01
    state "Order list" as SCR02
    state "Order detail" as SCR03
    [*] --> SCR01
    SCR01 --> SCR02: valid credentials
    SCR02 --> SCR03: choose order
    SCR03 --> SCR02: back
```

State the global navigation separately (what is always available: menu, search, profile) instead of drawing an arrow from every screen.

### 4. Critical flows

For each must-have requirement, write the path as numbered steps: screen, user action and system response. Include the normal path and at least one error path (invalid data, offline, no permission) taken from the acceptance criteria.

### 5. Check

Review and correct before delivering:

- [ ] Each must-have requirement has a complete flow from start to finish.
- [ ] Every screen is reachable from the entry point and has an exit (no dead ends).
- [ ] Each screen in the inventory appears in the map, and the other way around.
- [ ] The most frequent task of each role takes three steps or fewer from the entry point.
- [ ] It is defined what each role sees and what happens if they enter a screen without permission.
- [ ] It is defined what happens on going back, on reloading and on opening a direct link to an internal screen.
- [ ] Each destructive action has a confirmation or a way to undo it.

## Gotchas

- In Mermaid, state identifiers do not allow spaces or accents. Use the ID (`SCR01`) and declare the name with `state "Visible name" as SCR01`.
- A single diagram with more than fifteen screens cannot be read. Split by area (access, operation, administration) and link the areas.
- Platforms change the navigation: on mobile few main sections fit and the back gesture exists; on desktop there is more room and direct links. If `PRODUCT.md` defines more than one platform, state the differences instead of assuming one.
- Do not invent functions to "complete" the navigation (dashboard, notifications, advanced profile). If something seems to be missing, it is a question for `req-specify`.

## Project context

- **Read before asking:** `PRODUCT.md` (roles, capabilities, platforms) and `docs/requirements/specification.md` (acceptance criteria). If `DESIGN.md` exists, respect the components it already defines.
- **Write** `docs/design/navigation.md` with the sections: tasks by role, inventory, map, critical flows and open questions. If it already exists, keep the screen IDs and add or modify only what changes.
- If there is no repository or files cannot be written, deliver the content in the conversation under that file name.

## Closing every response

End with the requirements left without a screen, the screens without a requirement, the open questions and the next step: `des-guidelines` if components still need to be defined, or `dev-implement` if the structure is already approved.
