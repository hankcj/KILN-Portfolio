# KILN — Technical Product Requirement Document (v1.2)

This PRD defines the buildable architecture, motion system, and visual language for KILN as an **experience-led digital museum** with a reliable archive and utility core. It is a living spec, but the constraints below are treated as rules.

---

## 1. Executive Summary

KILN is a portfolio system architected as a digital museum. It operates as two intentional layers:

* **Experience Layer (Front-of-House):** immersive, cinematic, taste-signaling
* **Archive/Utility Layer (Back-of-House):** readable, reliable, conversion-capable

The differentiator is **Separation of Concerns**: spectacle never blocks utility, and utility never visually dominates the experience.

---

## 2. Core Philosophy

* **Museum vs. Archive:** users enter through a curated experience and then settle into functional viewing/reading.
* **Motion as Mass:** motion feels heavy, damped, and continuous. Objects travel, not pop.
* **Brutal Structure, Premium Physics:** the brutality lives in typography, grid, and exposed structure. The premium lives in motion physics and pacing.
* **Observational Aesthetics:** the interface implies distance, patience, and scale. Vast rather than busy. The register is a fixed point watching something slow and enormous move.

---

## 3. Design Constraints (Non-Negotiable)

1. **DOM owns text and navigation.** WebGL never renders critical text or navigation.
2. **WebGL cannot block usability.** Quiet rooms must be usable instantly even if WebGL is still initializing.
3. **Route-level separation.** Experience routes may use heavy motion; utility routes default to conservative behavior.
4. **Reduced motion is real.** `prefers-reduced-motion` disables the WebGL loop and swaps in static visuals.
5. **Performance budgets matter.** WebGL quality adapts automatically; no uncontrolled FPS drains.
6. **No generic UI kits.** Visual system is custom: icons, glyphs, gradients, components.
7. **Motion is consistent.** A small set of signature transitions is reused. No one-off tricks.
8. **Brutalism is structure, not jank.** No intentional lag, stutter, or "broken" effects.

---

## 4. Technical Architecture (The Stack)

### Core Infrastructure

* **Framework:** Next.js (App Router)

  * Role: routing, hybrid SSR/SSG, view transitions where appropriate
* **Language:** TypeScript (strict mode)
* **Global State:** Zustand

  * Role: "nervous system" linking DOM UI to WebGL scene state (hover/select/focus → canvas response)

### Experience Engine

* **3D Environment:** React Three Fiber (R3F) + Drei

  * Role: atmospherics, object displays, scene management
* **Motion Orchestration:** GSAP

  * Plugins: ScrollTrigger for scroll-synced timelines
* **Scroll Mechanics:** Lenis (default)

  * Role: normalized scroll momentum for consistent feel
  * Constraint: automatically disabled for `prefers-reduced-motion` and any detected compatibility issues
* **Visual Effects:** Custom GLSL Shaders (limited set)

  * Role: signature atmospheric effects
  * Default shortlist (preferred over "pretty"):

    * subtle scanline displacement
    * controlled dither/noise
    * restrained chroma interference (brief, state-based)
    * film grain as degradation (not decoration)
  * Optional, controlled use: mild refraction/distortion on select hero moments only

### Content Engine

* **Source of Truth:** MDX
* **Processor:** Velite (or Contentlayer)

  * Role: compile MDX into type-safe collections (Essays, Works, Systems), queryable like a database

### Utility Layer

* **Styling:** Tailwind CSS (custom tokens and components, no off-the-shelf UI kit)
* **Payments:** Stripe (prefer direct checkout links or hosted checkout)
* **Email:** Listmonk (self-hosted); RSS-to-email via listmonk-rss
* **Forms:** Next server actions / API routes with spam protection + rate limiting

---

## 5. Visual Design System

### A. Color Palette

Primary:

* **Ink Black:** `#13161F` (primary background)
* **Parchment:** `#FAF6F0` (primary text and reading surfaces)

Accents:

* **Pacific Cyan:** `#3A7D8C` (information/metadata)
* **Bright Indigo:** `#0036D8` (active states/cursor/focus)

Rules:

* Ink Black dominates.
* Parchment is default text.
* Accents are sparse and state-driven.

### B. Typography

* **Display (Human):** Averia Serif Libre

  * Titles, essay headers, artifact names
* **UI/Body (Machine):** Inter

  * Body copy, navigation, system labels

Typography rules:

* Strong hierarchy
* Large negative space
* No decorative type

### C. Icons, Glyphs, Gradients

* **No icon libraries. No generic React icons.**
* All icons and glyphs are custom.
* Glyphs function as metadata annotation, never as sole meaning.
* Gradients are custom-built, restrained, used for depth and state (not style wallpaper).

---

## 6. Interface Language Metaphor (Microcopy Texture)

The microcopy register is **observational and vast**. Not sci-fi. Not NASA operations. Not startup launch language. The tone implies something fixed, patient, and watching at scale — a long-cycle perspective on things that move slowly and matter.

### The Register

* **Feeling:** a fixed point in space watching something enormous and slow
* **Not:** a machine running commands, a mission control room, a spaceship cockpit
* **Avoid:** launch, orbit, deploy, mission, countdown, boost — startup-flavored space words
* **Avoid:** JCL syntax, FORTRAN comments, Assembly mnemonics — retired

### Usage Rules

Microcopy operates as **metadata annotation only**. It never enters the essay voice or body copy.

Apply to:
* Status labels and section markers
* Load and transition states
* Navigation hover feedback
* Error and empty states
* Object/work metadata

Never apply to:
* CTAs or action prompts (keep those plain)
* Essay headers or body copy
* Page titles

### Vocabulary

**Status / Visibility**
* `VISIBLE` — published, live, in view
* `IN VIEW` — currently displayed
* `DARK` — unavailable, offline, not yet surfaced
* `NO SIGNAL RETURNED` — empty state, 404, search with no results

**Navigation / Approach**
* `APPROACH` — hover state or directional cue
* `ENTER` — primary CTA alternative
* `SURFACE` — read more, open, expand
* `MAKE CONTACT` — contact page or link

**System / Load States**
* `ACQUIRING` — loading
* `RESOLVED` — complete
* `FIXED POSITION` — static, stable reference point

**Object Metadata**
* `OBJECT 014` — work index label
* `LAST TRANSMISSION:` — last updated
* `MASS:` — used sparingly for weight/scale metaphors on large work

### Examples in Context

Section dividers:
```
SURFACE 01
SURFACE 02
```

Status labels:
```
VISIBLE
ACQUIRING
RESOLVED
```

Empty / error states:
```
NOTHING AT THIS COORDINATE
NO SIGNAL RETURNED
```

Object metadata headers:
```
OBJECT 014
LAST TRANSMISSION: 2025.03.14
```

Load / transition state:
```
ACQUIRING
```

Footer tagline variant:
```
STUDIOKILN.IO / FIXED POSITION
```

### Hierarchy Rule

Never mix registers within the same microcopy unit. One label, one tone. Metadata stays metadata.

---

## 7. Motion & Interaction Design (Museum Feel)

### A. Physics

* **Cinematic / Viscous:** high damping, smooth acceleration, gentle precise stops
* **Continuous Flow (Primary Navigation):** scenes morph; no gratuitous hard cuts
* **Hard Cuts (Reserved):** allowed only for system events (errors, mode interrupts, boot transitions)

### B. Scroll

* Parallax is subtle.
* Scrubbing is weighty (lerp delay), never jittery.
* Scroll-linked 3D evolution is used as atmosphere, not a gimmick.

### C. Transitions

* **Page Load:** curtain-lift / fade-in without white flash
* **Hover States:** slow glow + nearby subtle canvas response
* **Focus States:** Indigo-driven, clear, accessible

Film grain and interference:

* Present but restrained.
* Intensifies briefly during transitions/focus/system states.

---

## 8. Functional Requirements

### A. Structure & Routing

1. **`/` (Entrance):** pure experience; heavy WebGL; minimal text
2. **`/work` (Gallery):** grid/list of outputs; thumbnails may use controlled displacement shaders
3. **`/signal` (Journal):** reading mode; WebGL recedes to faint ambient background
4. **`/system` (Colophon):** technical breakdown; deconstructed visuals; observational register strongest here

### B. Performance Guardrails

* **Adaptive Quality:** if FPS < 30, reduce WebGL pixel ratio and effect intensity
* **Lazy Loading:** load 3D assets only when needed
* **Quiet Rooms:** must remain usable instantly; WebGL initialization cannot block reading

### C. Accessibility (The Exits)

* All navigation + content exists in DOM
* Full keyboard support (tab order, focus rings)
* `prefers-reduced-motion`:

  * disable WebGL loop
  * replace animated canvases with high-quality static images

---

## 9. Folder Structure (Proposed)

```text
/src
  /app
    /layout.tsx         (Global Canvas + HTML wrapper)
    /page.tsx           (Entrance)
    /work
      /page.tsx         (Gallery index)
      /[slug]/page.tsx  (Work detail)
    /signal
      /page.tsx         (Journal index)
      /[slug]/page.tsx  (Article)
    /system
      /page.tsx         (Colophon)
  /components
    /dom
      /Layout.tsx
      /Navbar.tsx
      /Typography.tsx
      /OutputsList.tsx
    /canvas
      /SceneManager.tsx
      /Scenes
      /Shaders
      /Effects
  /lib
    /store.ts           (Zustand)
    /motion.ts          (GSAP timelines + shared eases)
    /perf.ts            (quality scaling, fps sampling)
    /utils.ts
  /content
    /essays
    /works
    /systems
```

---

## 10. Development Roadmap

1. **Foundation:** Next + Tailwind + TypeScript strict + routing skeleton
2. **The Rig:** global canvas, scene manager, Zustand wiring, route transitions
3. **The Feel:** GSAP easing system + Lenis integration (with auto-disable rules)
4. **Content:** Velite/Contentlayer pipeline + render first essay + index pages
5. **Gallery:** outputs list + detail pages + controlled shader hover effect
6. **Performance:** adaptive quality, lazy loading, quiet room guarantees
7. **Accessibility:** keyboard/focus, reduced motion swap, audit passes
8. **Polish:** implement the limited signature shader set + finalize glyph/icon system
