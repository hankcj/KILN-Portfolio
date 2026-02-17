# KILN Branding Guide

This document defines the visual identity and design tokens for KILN. Use it as the single source of truth when building the frontend. All styling must follow these rules to ensure consistency and accessibility.

---

## 1. Brand overview

- **Name:** KILN / Project Kiln.
- **Positioning:** A personal studio portfolio and publishing space — a digital museum for long-form writing, systems thinking, and selective work outputs. Not a generic agency portfolio or a CMS-heavy marketing site.
- **Tone:** Clear, structured, minimal friction. Authoritative but not cold. Serious, crafted, and intentional. No playful or casual flair; the space feels dependable, inhabited, and built to age gracefully.

---

## 2. Logo and wordmark usage

Official logo assets are stored in the frontend and served as static assets:

| Asset | Path (in repo) | Served at (when app runs) |
|-------|----------------|----------------------------|
| **Kiln Wordmark** | `frontend/public/logo/kiln-wordmark.png` | `/logo/kiln-wordmark.png` |
| **Kiln Logo (Black)** | `frontend/public/logo/kiln-logo-black.png` | `/logo/kiln-logo-black.png` |

Use these two files for all product logos. Do not recreate the wordmark or mark in code; use the provided PNGs to preserve the approved type and proportions.

### 2.1 Wordmark (KILN)

- **File:** `kiln-wordmark.png`. The word "KILN" in serif type (Averia Serif Libre style), light (Parchment `#FAF6F0`) on dark (Ink Black `#13161F`).
- **Use for:** App header/identity, auth screens (e.g. login), splash or loading, and any place the full name is the focus.
- **Approved backgrounds:** Use only on surfaces that match or are compatible with the asset:
  - **On dark (Ink Black / `--color-surface-inverse`):** Use the wordmark as provided (Parchment on dark). No changes.
  - **On light (Parchment / `--color-bg-primary`):** Prefer an inverse treatment: use a version on dark, or ensure the wordmark is the dark-on-light variant. If only the provided asset is available, place it on a dark background or use the Logo (Black) for light backgrounds where the full wordmark is not required.
- **Minimum size:** Do not display the wordmark smaller than **96px** in height (or equivalent cap height) to preserve legibility.
- **Clear space:** Maintain clear space around the wordmark equal to the height of the "K" (or the letter cap height) on all sides. Do not place type, icons, or other graphics inside this zone.

### 2.2 Logo (Black) — symbol mark

- **File:** `kiln-logo-black.png`. Circular mark with a stylized "K," rendered in dark gray/black outline.
- **Use for:** Favicon, app icon, compact headers, nav branding, and anywhere a compact mark is needed. Ideal when the full wordmark would be too large or when the word "KILN" appears in type nearby.
- **Approved backgrounds:** Use **only on light backgrounds** where the dark mark has sufficient contrast:
  - Parchment (`--color-bg-primary`), `--color-bg-secondary`, white, or light gray. Ensures the logo remains visible (the asset is designed for light backgrounds).
- **Do not:** Use on dark or black backgrounds; the mark will not have adequate contrast. For dark areas (e.g. footer, dark header), use the wordmark asset instead (Parchment on dark).
- **Minimum size:** Do not display the logo smaller than **24px** in height/width so the circular outline and "K" remain recognizable.
- **Clear space:** Clear space around the mark should be at least half the height (or width) of the logo on all sides.

### 2.3 Logo usage rules (all assets)

- **Do not stretch or distort.** Keep aspect ratio locked when scaling.
- **Do not recolor.** Use the provided files as-is. Do not tint, invert (except as noted for light/dark contexts), or apply color overlays that change the approved relationship between mark and background.
- **Do not add effects.** No drop shadows, glows, or decorative filters unless specified in a future brand update.
- **Contrast:** Always ensure the logo or wordmark meets contrast requirements (WCAG 2.1 AA for graphical objects: 3:1 against the background). The provided pairings (Parchment on Ink Black; dark mark on Parchment/light) satisfy this when used as specified.
- **Single source:** All logo use in the product must reference these assets from `frontend/public/logo/`. Do not duplicate or alter the files for different contexts; use CSS (e.g. object-fit, max-height) to size and position.

---

## 3. Color system

### 3.1 Palette (KILN_Palette)

| Name           | Hex       | Role / context |
|----------------|-----------|----------------|
| Bright Indigo  | `#0036D8` | Primary accent, key actions, focus states. |
| Pacific Cyan   | `#3A7D8C` | **Restricted.** Very subtle use only (see §3.4). |
| Ink Black      | `#13161F` | Dark surfaces, primary text on light backgrounds. |
| Parchment      | `#FAF6F0` | Light surfaces, primary content areas. |

### 3.2 Semantic "on-color" tokens (required)

**Rule:** Every surface that displays text or icons must have a corresponding **on-color** token. Text and icons must never use raw hex values; they must use semantic tokens so that visibility and contrast are guaranteed across the site.

**Surface tokens** (backgrounds and filled UI):

| Token                     | Purpose |
|---------------------------|--------|
| `--color-bg-primary`      | Main app background. |
| `--color-bg-secondary`   | Panels, sidebars, alternate rows. |
| `--color-accent`         | Primary buttons, key CTAs, focus rings. |
| `--color-surface-inverse`| Dark bars, footer, inverse blocks. |
| `--color-surface-muted`  | Disabled or low-emphasis surfaces. |
| `--color-border`         | Dividers, input borders (decorative; not for text). |
| `--color-border-muted`   | Subtle dividers. |

**On-color tokens** (text and icons on those surfaces):

| Token                       | Used on surface        | Purpose |
|-----------------------------|------------------------|--------|
| `--color-on-bg-primary`     | `--color-bg-primary`    | Body text, primary content. |
| `--color-on-bg-secondary`   | `--color-bg-secondary`  | Text on panels/secondary areas. |
| `--color-on-accent`         | `--color-accent`       | Button text, icons on accent. |
| `--color-on-surface-inverse`| `--color-surface-inverse` | Text/icons on dark areas. |
| `--color-on-surface-muted`  | `--color-surface-muted` | Disabled or placeholder text. |

**Visibility rule:** For any new component, ask: "What surface is this text/icon on?" Then use the matching `--color-on-*` token. Do not introduce ad-hoc colors for type or icons.

### 3.3 Token-to-hex mapping (light theme)

Default theme is light. Implement these mappings in the frontend theme file so that semantic tokens resolve to accessible pairs.

| Semantic token                | Hex (light theme) | Notes |
|-------------------------------|------------------|--------|
| `--color-bg-primary`          | `#FAF6F0`        | Parchment. |
| `--color-bg-secondary`        | `#F0EBE3`        | Slightly darker Parchment (derive or define). |
| `--color-accent`              | `#0036D8`        | Bright Indigo. |
| `--color-surface-inverse`    | `#13161F`        | Ink Black. |
| `--color-surface-muted`      | `#E8E4DE`        | Muted light (ensure contrast with on-muted). |
| `--color-border`             | `#13161F` (low opacity) or `#C4BEB4` | Visible but not heavy. |
| `--color-border-muted`       | Lighter than `--color-border`. | |
| `--color-on-bg-primary`       | `#13161F`        | Ink Black on Parchment. |
| `--color-on-bg-secondary`     | `#13161F`        | Same; or slightly muted if desired. |
| `--color-on-accent`          | `#FFFFFF`        | White on Bright Indigo (meets contrast). |
| `--color-on-surface-inverse` | `#FAF6F0`        | Parchment on Ink Black. |
| `--color-on-surface-muted`    | `#5C5C68` or similar | Dark gray; must meet 4.5:1 on muted surface. |

**Dark theme (future):** When adding dark mode, keep the same token names and swap the hex values (e.g. `--color-bg-primary` becomes dark, `--color-on-bg-primary` becomes light). Do not introduce new token names for dark mode.

### 3.4 Pacific Cyan (#3A7D8C) — restricted use

Pacific Cyan has **visibility concerns** and must be used only in very subtle ways.

- **Sole approved use:** **Button hover only.** As a subtle tint or overlay on the primary button (e.g. primary button hover state). Do not use as a solid background for large areas, as body text, or as a primary UI color.
- **Do not:** Use for backgrounds, links, icons, borders (except perhaps a very subtle hover glow), or any text. Do not use for large surfaces or cards.

If in doubt, omit Pacific Cyan and use a slight darkening or brightening of Bright Indigo for hover instead.

### 3.5 Contrast and accessibility

- **WCAG 2.1 AA** is required for all text: at least **4.5:1** contrast for normal text, **3:1** for large text (e.g. 18px+ or 14px+ bold).
- Semantic on-color tokens must be chosen so that each `--color-on-*` / surface pair meets these ratios. Validate during implementation (e.g. with contrast checkers).
- **Focus indicators:** Use `--color-accent` (Bright Indigo) or a high-contrast outline (2px) so focus is visible. Never remove focus styles.

---

## 4. Typography

### 4.1 Font families

- **Headings and titles:** **Averia Serif Libre.**  
  Use for: page titles, section headers, card titles, modal titles, essay headers, artifact names.  
  Fallback: `Georgia, "Times New Roman", serif`.  
  Weights: `400` (regular), `700` (bold). Load only these weights.

- **Body and UI:** **Inter.**  
  Use for: body copy, buttons, labels, inputs, table text, navigation, captions, small print.  
  Fallback: `system-ui, -apple-system, sans-serif`.  
  Weights: `400` (regular), `500` (medium), `600` (semibold).

**Token recommendation:**  
`--font-heading: "Averia Serif Libre", Georgia, serif;`  
`--font-body: "Inter", system-ui, sans-serif;`

### 4.2 Type scale

Use a **1.25** modular scale (major third). Base size **16px** (1rem). Line height and size in rem:

| Role        | Size   | Line height | Token (suggestion) | Font |
|-------------|--------|-------------|--------------------|------|
| H1          | 2.488rem | 1.2      | `--text-h1`        | Averia Serif Libre |
| H2          | 1.99rem  | 1.25     | `--text-h2`        | Averia Serif Libre |
| H3          | 1.592rem | 1.3      | `--text-h3`        | Averia Serif Libre |
| H4          | 1.274rem | 1.35     | `--text-h4`        | Averia Serif Libre |
| H5          | 1.019rem | 1.4      | `--text-h5`        | Averia Serif Libre |
| H6          | 0.815rem | 1.4      | `--text-h6`        | Averia Serif Libre |
| Body        | 1rem     | 1.5      | `--text-body`      | Inter |
| Body small  | 0.875rem | 1.45     | `--text-small`     | Inter |
| Caption     | 0.75rem  | 1.4      | `--text-caption`   | Inter |
| Button label| 0.875rem | 1.25     | `--text-button`    | Inter |

All text colors must use the appropriate **on-color** token for the surface (e.g. `--color-on-bg-primary` for body on the main background).

---

## 5. Spacing and layout

### 5.1 Spacing scale

Base unit **4px**. Use semantic spacing tokens for padding and margins so layout stays consistent.

| Token        | Value  | Use |
|--------------|--------|-----|
| `--space-2`  | 0.5rem (8px)  | Tight inline spacing. |
| `--space-3`  | 0.75rem (12px)| Inline gaps, small padding. |
| `--space-4`  | 1rem (16px)   | Default component padding. |
| `--space-5`  | 1.25rem (20px)| |
| `--space-6`  | 1.5rem (24px) | Section spacing. |
| `--space-8`  | 2rem (32px)   | Block spacing. |
| `--space-10` | 2.5rem (40px) | |
| `--space-12` | 3rem (48px)   | Large section gaps. |
| `--space-16` | 4rem (64px)   | Page-level spacing. |

Aliases for clarity (optional): e.g. `--space-xs` = `--space-2`, `--space-sm` = `--space-4`, `--space-md` = `--space-6`, `--space-lg` = `--space-8`, `--space-xl` = `--space-12`.

### 5.2 Breakpoints

**Desktop-first** (per PRD). V1 targets desktop; mobile is out of scope. Define min-width breakpoints so the layout can adapt later:

| Name   | Min width | Use |
|--------|-----------|-----|
| sm     | 640px     | Optional future. |
| md     | 768px     | Optional future. |
| lg     | 1024px    | Primary layout breakpoint. |
| xl     | 1280px    | Wide content. |
| 2xl    | 1536px    | Max content width. |

Content max-width (e.g. for reading): 65–72rem. Grid: 12 columns with consistent gutter (e.g. `--space-6`).

---

## 6. Component and pattern guidance

Components must use **semantic tokens** only. Reference token names, not hex, in implementation.

### 6.1 Buttons

- **Primary:** Background `--color-accent`, text/icon `--color-on-accent`. Focus ring `--color-accent` or outline.
- **Secondary:** Outline or background `--color-bg-secondary`; text `--color-on-bg-primary` or `--color-on-bg-secondary`. Border `--color-border`.
- **Hover (primary):** Optional very subtle Pacific Cyan tint (e.g. overlay or blend) for primary only; otherwise use a slightly darker/lighter Bright Indigo.
- **Disabled:** Background `--color-surface-muted`, text/icon `--color-on-surface-muted`. No accent.

### 6.2 Links

- Default: color from `--color-on-bg-primary` or `--color-accent` (choose one convention and stick to it).
- Hover: underline or `--color-accent` if not already. Use on-color tokens; no raw hex.

### 6.3 Form controls

- **Inputs / selects:** Background `--color-bg-primary` or `--color-bg-secondary`, border `--color-border`, text `--color-on-bg-primary`. Placeholder `--color-on-surface-muted`.
- **Focus:** Border or outline `--color-accent` (visible 2px).
- **Checkboxes / radios:** Use same surface and on-color tokens; checkmark/indicator on accent or on-accent.

### 6.4 Cards and panels

- Background `--color-bg-secondary` (or primary). Border if needed: `--color-border` or `--color-border-muted`.
- Card titles: font `--font-heading` (Averia Serif Libre). Text color `--color-on-bg-secondary` (or on-bg-primary).

### 6.5 Modals and overlays

- **Scrim:** Semi-transparent overlay; ensure focus stays visible.
- **Content surface:** `--color-bg-primary` or `--color-bg-secondary`. All text and icons inside use the matching on-color tokens (`--color-on-bg-primary` / `--color-on-bg-secondary`).

---

## 7. Icons and imagery

- **Style:** Prefer outline icons for consistency with a clear, structured look. Solid only when needed for emphasis or recognition.
- **Sizes:** Use a consistent scale: 16px, 20px, 24px (1rem, 1.25rem, 1.5rem). Token suggestion: `--icon-sm`, `--icon-md`, `--icon-lg`.
- **Color:** Icons must use the **on-color** token for the surface they sit on (e.g. `--color-on-accent` for icons inside a primary button, `--color-on-bg-primary` for icons in the header). No raw hex for icon color.

---

## 8. Motion and feedback

- **Transitions:** Subtle only. 150–200ms for state changes (hover, focus, open/close). Easing: `ease-out` or `ease-in-out`.
- **No decorative motion:** No ambient animation or decorative motion. Use motion only for state change and loading/feedback (e.g. spinners, progress).
- **Reduced motion:** Respect `prefers-reduced-motion: reduce` by disabling or shortening non-essential transitions.

---

## 9. Implementation notes

- **Token format:** Use CSS custom properties: `--color-*`, `--font-*`, `--space-*`, `--text-*`, `--icon-*`. Frontend theme file(s) (e.g. in `frontend/src/shared/`) are the single source of truth; components consume tokens only.
- **Theming:** Light theme is default. Dark theme later: same token names, different hex values in a theme switch.
- **Do not:**
  - Use Pacific Cyan for text, large areas, or anything other than optional subtle button hover.
  - Use raw hex (or hardcoded colors) for text or icon color; always use semantic on-color tokens.
  - Introduce new palette colors without updating this document and the token set.

---

## 10. Summary checklist

Before shipping UI, confirm:

- [ ] **Logo:** Wordmark and Logo (Black) are used from `frontend/public/logo/` only; approved backgrounds and minimum sizes respected; no stretch, recolor, or effects.
- [ ] All text and icons use semantic **on-color** tokens (`--color-on-*`); no raw hex for type or icons.
- [ ] Pacific Cyan is used only for optional, very subtle **button hover** (primary); nowhere else.
- [ ] Headings and titles use **Averia Serif Libre**; body and UI use **Inter**.
- [ ] Contrast for all text meets **WCAG 2.1 AA** (4.5:1 normal, 3:1 large).
- [ ] Buttons, links, form controls, cards, and modals reference the token names in this doc (e.g. `--color-accent`, `--color-on-accent`).
- [ ] Spacing uses the **spacing scale** tokens; typography uses the **type scale**.
- [ ] Focus states are visible (accent or high-contrast outline).
- [ ] Motion is subtle (150–200ms) and respects reduced motion.
