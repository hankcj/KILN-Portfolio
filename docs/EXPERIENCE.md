# KILN — Experience Layer Documentation (v2.0)

This document defines how the KILN front-end experience should behave in practice, aligned with the latest PRD and brand direction.

Use this with:
- `docs/Technical Requirements.md` (system architecture and constraints)
- `docs/BRANDING.md` (voice, tone, and copy standards)

---

## 1) Experience Role

KILN is a digital museum with two intentional layers:

- **Experience Layer (front-of-house):** immersive, atmospheric, cinematic
- **Archive/Utility Layer (back-of-house):** readable, reliable, conversion-capable

The implementation rule is strict:
- Experience can add depth, but cannot block access.
- Utility can add clarity, but cannot dominate the visual field.

---

## 2) Route Behavior Model

| Route | Primary Role | Motion Profile | WebGL Dependency |
|------|--------------|----------------|------------------|
| `/` | Entrance | Heavy, cinematic | Allowed, non-blocking |
| `/work` | Gallery archive | Moderate, controlled | Optional accents only |
| `/signal` | Reading/journal | Light, recessed ambient | Optional, subtle background only |
| `/system` | Colophon/documentation | Conservative, intentional | Optional, minimal |

Route-level separation is required. Quiet rooms (`/signal`, `/system`) must remain instantly usable even if canvas systems are still initializing.

---

## 3) Visual Language

The visual system should read as **architectural, restrained, and weight-aware**.

### Core Visual Rules

- Structure over decoration
- Generous negative space
- Clear typographic hierarchy
- Accents used sparingly and for state

### Color and Type

- Ink Black (`#13161F`) dominates large surfaces
- Parchment (`#FAF6F0`) is default reading text
- Pacific Cyan (`#3A7D8C`) and Bright Indigo (`#0036D8`) are state accents
- Display type: Averia Serif Libre
- UI/body type: Inter

### Components and Graphics

- No generic UI kits
- No icon libraries for user-facing iconography
- Use custom glyphs/icons as annotation, not as sole meaning

---

## 4) Microcopy Register in UI States

UI metadata uses an observational register: fixed, patient, and scale-aware.

### Approved Status Vocabulary

- `VISIBLE`
- `IN VIEW`
- `DARK`
- `NO SIGNAL RETURNED`
- `ACQUIRING`
- `RESOLVED`
- `FIXED POSITION`
- `APPROACH`
- `SURFACE`
- `MAKE CONTACT`

### Usage Scope

Apply this register to:
- Status labels
- Load/transition metadata
- Hover feedback
- Error and empty states
- Object metadata

Do not apply this register to:
- Body copy
- Essay voice
- CTAs that require direct action clarity

### Retired Language

Do not use mission-control/startup-space language in interface microcopy:
- launch, orbit, deploy, mission, countdown, boost
- JCL/FORTRAN/Assembly syntax-style labels

---

## 5) Motion System

Motion should feel like mass: damped, continuous, and precise.

### Physics

- High damping
- Smooth acceleration
- Controlled deceleration and soft settle

### Transitions

- Default: continuous morphing and weighted fades
- Reserved hard cuts: system interrupts, error mode changes, explicit context resets
- No novelty transitions or one-off effects that break pattern consistency

### Scroll

- Subtle parallax only
- Weighted scrub (no jitter)
- Scroll-linked 3D behavior as atmosphere, not product demo

---

## 6) Accessibility and Performance Rules

### Accessibility

- All navigation and meaningful content must remain in DOM
- Full keyboard navigation and visible focus states are required
- `prefers-reduced-motion` must:
  - disable active WebGL loop
  - swap animated canvases for static high-quality visual alternatives

### Performance

- Adaptive quality required (degrade pixel ratio/effect intensity under low FPS)
- Lazy load heavy 3D assets
- Avoid unbounded render loops and expensive effect stacks on utility routes

---

## 7) Implementation Notes

Use a small shared transition set across routes and states. Favor consistency over variety.

Recommended shared state mappings:

| System Event | Label | Notes |
|-------------|-------|-------|
| Initial content load | `ACQUIRING` | Short-lived |
| Successful load complete | `RESOLVED` | May fade to no label |
| Published/active state | `VISIBLE` | Stable badge/state |
| Empty/404/no results | `NO SIGNAL RETURNED` | Primary empty-state marker |
| Hover approach cue | `APPROACH` | Metadata-level cue only |

---

## 8) Practical QA Checklist

- [ ] Quiet routes are readable before any WebGL initialization completes
- [ ] Reduced motion disables active canvas loops
- [ ] Transition labels use approved register only
- [ ] No JCL/FORTRAN/Assembly syntax remains in UI microcopy
- [ ] No icon library artifacts in user-facing visual language
- [ ] Adaptive quality behavior triggers under low-FPS conditions

---

**Document Version:** 2.0  
**Last Updated:** 2026.04.01  
**Next Review:** After the next major UX pass
