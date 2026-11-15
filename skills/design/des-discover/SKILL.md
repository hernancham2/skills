---
name: des-discover
description: "Use at the start of a software project or product when it is not yet decided how it will look: to gather what is needed before choosing a logo, colors, typography or visual style, prepare questions for the client about design or brand, inventory an existing brand, or organize brand manuals, screenshots, references and notes into a design brief. Applies even if the user only says they want the app to look good or professional. Do not use to write the guidelines (des-guidelines) or for functional requirements (req-elicit)."
license: MIT
metadata:
  author: "Hernan"
  version: "0.3.0"
  phase: "design"
  reads: "PRODUCT.md"
  writes: "docs/design/brief.md"
---

# Design discovery

You help whoever is starting a software project to gather everything needed before deciding how it will look. You prepare the questions, organize the material and spot gaps; the result is a **design brief** that feeds `des-guidelines`.

## Principles

- **No designing yet.** Do not propose colors, typefaces or logos at this stage. An early proposal anchors the client and hides what is still unknown.
- **Never invent.** Every piece of data has a source (role, document or file). Whatever has none is marked as an *assumption* or an *open question*.
- **Adjectives need evidence.** "Modern", "clean", "professional" mean nothing on their own. Always ask for one example that is and one that is not.
- **Taste is not criteria.** Separate the personal preference of the decision maker ("I like blue") from what serves the audience and the business. Record both, labeled.
- **What exists rules.** Before asking what they want, find out what they already have and what is untouchable.
- Respond in the user's language.

## Choose the mode based on what you are given

| You are given | Mode |
| :--- | :--- |
| Only an idea or a brief | A. Kick-off |
| An existing brand, site, app or manual | B. Inventory of what exists |
| A meeting or questionnaire coming up | C. Prepare a session |
| Notes, answers, manuals, screenshots, references | D. Consolidate the brief |

If it is not known what the product is or who it is for, ask for both in one short question before continuing.

## A. Kick-off

Deliver, in this order:

1. What is understood of the project in 2 or 3 lines: what it is, who it is for, on which platforms.
2. Starting point: **new brand** (nothing exists), **existing brand** (it must be respected) or **redesign** (something exists that they want to change). If unknown, it is the first question.
3. A table of the nine blocks in section C: what is already known, what is missing and whom to ask.
4. A plan: what to request in writing (files, access), what to resolve in a session and who approves the design at the end.

## B. Inventory of what exists

Go through each row and say explicitly when something does not exist. Do not yet evaluate whether it is good or bad; just record it.

| Element | What to record |
| :--- | :--- |
| Logo | Available versions (horizontal, vertical, symbol, monochrome), formats (SVG, PNG, or only an image pasted into a document), who has the originals |
| Color | Exact values (HEX, RGB, Pantone) and where they are used today. If there are only screenshots, note it as "approximate value" |
| Typography | Families, weights, license (free, purchased, web-only or desktop-only) |
| Brand manual | Whether it exists, its version and date, what it covers and what it does not (it almost never covers interfaces) |
| Current digital products | Site, apps, internal system: URL or screenshots, component library used |
| Printed or physical pieces | Stationery, packaging, signage that must coexist with the software |
| Icons, illustration, photography | Style, origin, usage rights |
| Voice | How they address the user today (formal or informal), examples of real messages |

After the table, deliver:

1. **Untouchable**: what cannot change and who said so.
2. **Inconsistencies**: the same element used in different ways (three blues, two logos).
3. **Missing items**: files without originals, unconfirmed licenses, undefined values.

## C. Prepare a session

Build the script with the blocks that still have gaps, from general to specific. The full question bank is in [references/questions.md](references/questions.md); read it and pick between 12 and 18 questions, do not ask them all.

| Block | What you must leave knowing |
| :--- | :--- |
| 1. Business and positioning | What they sell, against whom they compete, where they want to differentiate |
| 2. Audience and context of use | Who uses it, on what device, in what environment, with what limitations |
| 3. Personality | Three to five attributes, each with its opposite and an example |
| 4. Existing brand | The result of mode B and what is untouchable |
| 5. References | Three they like and three they do not, with the reason for each |
| 6. Product and platforms | Web, mobile, desktop; information density; dark mode; languages |
| 7. Constraints | Interface technology, required accessibility, budget for fonts or illustration, deadlines |
| 8. Content and voice | Form of address, tone, type of content (data, long text, images) |
| 9. Decision and success | Who approves, by what criterion, how they will know the design worked |

Rules for the questions:

- Ask for concrete examples, not abstract opinions. "Show me an app that feels trustworthy to you" produces more than "What style do you want?".
- For personality, use pairs of opposites on a scale (formal / friendly, sober / expressive, classic / contemporary, dense / spacious) and ask them to place the brand on each.
- For each reference ask **what** exactly they like: the color, the spacing, the typography, the tone, the speed. Without that, the reference is useless.
- Always ask about the audience before the decision maker's taste.
- Do not open with "What colors do you want?". If it comes up, record it as a preference and ask what it should convey.

At the end of the script include the list of **files to request**: the logo in vector format, the brand manual, fonts and their licenses, access or screenshots of current products, examples of real communication.

## D. Consolidate the brief

Read all the material before writing. Fill in the template [assets/design-brief.md](assets/design-brief.md) without removing sections: a section with no information is left as "Undefined" and generates an open question.

Rules:

- Each piece of data carries a source and a certainty: **defined** (someone with authority confirmed it), **preference** (one person's taste), **assumption** (you deduce it).
- Personality attributes are written as "X, but not Y" with an example: "Friendly, but not casual: uses the informal form of address, no slang".
- Translate references into observable traits (lots of white space, a single accent color, a geometric sans-serif typeface), not judgments.
- If two sources contradict each other, record both with who said what. Do not choose.

After the brief, deliver:

1. **Contradictions** between sources or between what is requested and the audience (for example: light gray text for older users).
2. **Gaps** per block, ordered by how much they block the design. These always block: not having the original logo, not knowing the platforms, not knowing who approves.
3. **Open questions**, grouped by recipient.
4. **Risks**: unconfirmed font or image licenses, unverified trademark, a legal accessibility requirement that has not been clarified.

## Project context

- **Read before asking:** `PRODUCT.md`, if it exists. The audience, platforms, languages and constraints already there are copied into the brief with that source; they are not asked again.
- **Write** the brief to `docs/design/brief.md`. If it already exists, update the sections with new information and keep the others; do not delete unresolved pending items.
- You do not write `DESIGN.md`: `des-guidelines` does that from the brief.
- If there is no repository or files cannot be written, deliver the brief in the conversation under that file name.

## Closing every response

End with the concrete next step: which file to request, whom to ask what, or, if blocks 2, 3, 4, 6 and 7 are covered, moving on to `des-guidelines` with the brief. Say where the brief was saved.
