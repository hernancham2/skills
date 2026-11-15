# Decision criteria by section

Reasonable starting values. Adjust when the brief gives a reason, and write the reason down.

## Color

**Palette structure**

- **Primary**: the brand color; main actions and identity elements.
- **Accent** (optional): a single color to highlight; it never competes with the primary on the same screen.
- **Neutrals**: a scale of 9 to 11 steps (from near white to near black). They carry most of the interface: backgrounds, borders, text. Tint the neutrals slightly toward the primary so they do not look foreign.
- **Status colors**: success (green), warning (amber), error (red), information (blue). Each with three values: soft background, border or icon, text.
- **States** of the interactive color: rest, hover, pressed, focus, disabled.

**Rules**

- Guideline proportion 60 / 30 / 10: dominant neutral, secondary color or surfaces, accent.
- Name each color by its function (`primary`, `surface`, `on-surface`, `outline`), not by its appearance (`blue-500`). The `on-` prefix indicates the color of the text that goes on top of another (`on-primary` over `primary`).
- If the brand's primary does not reach contrast on white, create a darker variant for text and buttons and keep the original for large surfaces and the logo.
- Error is never communicated with red alone: it carries an icon or text.
- Dark mode: do not invert the values. Use very dark gray backgrounds (not pure black), lower the saturation of the colors and recalculate all contrasts.
- Avoid red and green as the only differentiator (color blindness).

**Contrast (WCAG 2.2, level AA)**

| Pair | Minimum |
| :--- | :--- |
| Normal text on its background | 4.5 : 1 |
| Large text (from 24 px, or from 18.66 px bold) | 3 : 1 |
| Interface components and graphics (field borders, icons, focus) | 3 : 1 |
| Disabled text and logotypes | No requirement |

Calculation: for each sRGB channel `c` in 0–1, `c ≤ 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ^ 2.4`. Luminance `L = 0.2126 R + 0.7152 G + 0.0722 B`. Contrast `(L light + 0.05) / (L dark + 0.05)`.

## Typography

**Choice**

- Two families at most: one for interface and body, an optional one for headings. One is usually enough.
- For interface, prioritize families with good legibility at small sizes, tabular figures and weights 400, 500/600 and 700.
- Verify that it covers the languages in the brief (accents, other alphabets).
- Confirm the license for web and for apps. Without a confirmed license, it does not go in the document as defined.
- Always define the fallback stack with system fonts.

**Scale**

- Base body size: 16 px. Do not go below 14 px for secondary text or 12 px for labels.
- Modular scale with a ratio between 1.2 (dense interfaces) and 1.25–1.333 (content sites). Six to eight steps are enough.
- Define sizes in `rem` to respect the user's setting.
- Line height: 1.5 for body, 1.2–1.3 for headings.
- Line length: 45 to 75 characters in running text.
- Each step of the scale has a functional name (`body`, `heading-1`, `label`), size, weight and line height.
- Do not use sustained uppercase in long texts; if used in labels, add letter spacing.

## Spacing and structure

- Base unit of 4 px; usual scale: 4, 8, 12, 16, 24, 32, 48, 64.
- Use only values from the scale. A spacing outside it is an error, not an exception.
- More space between groups than within a group: proximity communicates relationship.
- Grid: 4 columns on mobile, 8 on tablet, 12 on desktop, with margins and gutters taken from the scale.
- Breakpoints: define them by content; as a starting point, 640, 768, 1024 and 1280 px.
- Radii: two or three values (small for fields, medium for cards, full for pills). The radius expresses personality: square is formal, rounded is friendly.
- Elevation: three levels at most (surface, floating element, modal). In dark mode, elevation is expressed with lighter surfaces, not with shadow.

## Logo

- Minimum versions: primary, reduced (symbol or monogram), one-color in positive and negative.
- Clear space: define it with a measurement from the logo itself (for example, the height of a letter).
- Minimum size: the smallest size at which the logo text is legible; below that the reduced version is used.
- List of incorrect uses: distorting, changing colors, adding shadows or outlines, rotating, placing on backgrounds without contrast, rearranging its elements.
- App icon and favicon: start from the reduced version, with inner margin, tested at 16 px.
- Formats to deliver: SVG for screen, PNG with transparency at 1x, 2x and 3x, and the icon in each platform's sizes.

## Iconography

- A single family and a single style (stroke or fill). Mixing families shows.
- Constant stroke weight, consistent with the weight of the typography.
- Sizes tied to the scale: 16, 20, 24 px.
- An icon without text only when its meaning is universal (close, search, menu); in other cases it carries a visible label or, at the very least, an accessible name.

## Components

For each component define: anatomy, variants, sizes and states. The mandatory states of any interactive element are: rest, hover, focus, pressed, disabled, plus loading and error where applicable.

- A single primary action per screen; the others are secondary or text-only.
- Focus is always visible: an outline of at least 2 px with 3 : 1 contrast against what surrounds it.
- Minimum touch target of 24 × 24 px (AA requirement); 44 × 44 px recommended on touch screens.
- Form fields carry a visible label; placeholder text inside the field does not replace it.
- Error messages say what happened and how to resolve it, next to the field.

## Motion

- Durations: 100–150 ms for small changes (hover, pressed), 200–300 ms for entrances and exits, up to 400–500 ms for full-screen transitions.
- Curves: deceleration for what enters, acceleration for what exits.
- Animate to explain a change (where it comes from, where it goes), not to decorate.
- Respect the system's reduced-motion preference: replace movement with fades or remove the animation.

## Tokens

- Tokens live in the frontmatter of `DESIGN.md`, in lowercase with hyphens: `colors.primary`, `typography.body`, `spacing.md`, `rounded.sm`.
- Components reference tokens (`"{colors.primary}"`), they do not repeat values. A loose value inside a component is a future inconsistency.
- Each state is its own component entry: `button-primary`, `button-primary-hover`, `button-primary-disabled`.
- A color that no component uses is surplus or is missing its component.
- Dark mode changes the values of the tokens, not their names.
- To bring them into code: `npx @google/design.md export --format css-tailwind DESIGN.md` (Tailwind v4), `--format tailwind` (v3) or `--format dtcg` (standard tokens JSON).
