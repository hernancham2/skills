---
version: alpha
name: "[Project name]"
description: "[One sentence: visual character of the product]"
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  primary-hover: "#000000"
  accent: "#000000"
  background: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#000000"
  on-surface-muted: "#000000"
  outline: "#000000"
  focus: "#000000"
  success: "#000000"
  warning: "#000000"
  error: "#000000"
  info: "#000000"
typography:
  heading-1:
    fontFamily: "[Family], system-ui, sans-serif"
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.2
  heading-2:
    fontFamily: "[Family], system-ui, sans-serif"
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "[Family], system-ui, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "[Family], system-ui, sans-serif"
    fontSize: 0.875rem
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 4px
  md: 8px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: 12px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    padding: 12px
---

# Design guidelines: [project name]

Version [0.1] · [date] · Scope: essential / full

Status of each decision: **Defined** (approved or inherited from the brand) · **Proposal** (pending approval).

## Overview

[Two or three sentences on the visual character and whom it serves. Audience and platforms: see PRODUCT.md.]

| Principle | This means | This does not mean | Comes from |
| :--- | :--- | :--- | :--- |
| | | | |

## Colors

[Why this palette. The role of each color and in what proportion.]

| Token | Use | Status |
| :--- | :--- | :--- |
| `primary` | Main actions, links | |
| `accent` | | |
| `background` / `surface` | Page background / cards and panels | |
| `on-surface` / `on-surface-muted` | Main / supporting text | |
| `outline` | Field borders and dividers | |
| `success` `warning` `error` `info` | States; always with an icon or text | |

Calculated contrast:

| Text | Background | Contrast | Minimum | Passes |
| :--- | :--- | :--- | :--- | :--- |
| `on-surface` | `background` | | 4.5 | |
| `on-surface-muted` | `background` | | 4.5 | |
| `on-primary` | `primary` | | 4.5 | |
| `outline` | `background` | | 3 | |
| `focus` | `background` | | 3 | |

Dark mode: applies / does not apply. [If it applies, dark theme values and contrasts.]

## Typography

[Families, why, license and system fallback.]

- Maximum line length:
- Use of uppercase and italics:

## Layout

- Base unit and spacing scale: see `spacing`.
- Grid (columns, margins and gutters per screen size):
- Breakpoints:

## Elevation & Depth

[Elevation levels, what shadow or surface expresses each one, and when it is used.]

## Shapes

[Which radius each type of element uses and what it expresses.]

## Components

For each component: variants, sizes and states (rest, hover, focus, pressed, disabled, loading, error).

### Button

### Form field

## Do's and Don'ts

- Do:
- Don't:

## Logo

| Version | File | When it is used |
| :--- | :--- | :--- |
| Primary | | |
| Reduced | | |
| One color (positive / negative) | | |

- Clear space:
- Minimum size:
- Allowed backgrounds:
- Incorrect uses:

## Iconography and imagery

- Icon family, style and sizes:
- Photography or illustration style and usage rights:

## Motion

- Durations and curves:
- Reduced motion:

## Accessibility

- Target level:
- Visible focus:
- Minimum touch target:
- Information that does not depend on color alone:

## Voice

- Form of address (formal / informal):
- Tone:
- Error messages (correct and incorrect example):
- Date, currency and number formats:

## Pending decisions

| Decision | Section | Who approves |
| :--- | :--- | :--- |
| | | |

## Source

- Brief: [docs/design/brief.md](docs/design/brief.md)
- Who approves changes to this file:
