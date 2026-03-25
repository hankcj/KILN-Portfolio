# KILN Experience Design Document

## Version 1.0 | March 2026

This document defines the complete experiential redesign of studiokiln.io. It replaces the current standard website structure (hero, nav, footer, pages) with a linear scroll journey that transforms from machine to nature. This is the single source of truth for what the site should feel like, how it should behave, and what it should look like at every stage.

---

## Core Concept

The site is a journey from technology to nature.

It opens as a machine: dark, angular, precise, monospaced. As the visitor scrolls, organic life begins overtaking the interface. Painterly botanical forms appear in the margins. Thin white bounding boxes and monospace annotations catalog the growth, a machine trying to observe and classify what's consuming it. By the end, the nature is dominant. The machine is still there underneath, but the living layer has won.

The visitor doesn't read about this. They experience it by moving through the page.

The reference point is the intersection of two aesthetics: brutalist system interfaces (the existing KILN visual language) and nature reclaiming abandoned technology (Porter Robinson's Nurture, overgrown server rooms, moss on circuit boards). The tension between these two things IS the site.

---

## Inspirations and Reference Points

**Immersive Garden (immersive-g.com):** The level of ambient craft. Subtle sound design, scroll-driven storytelling, WebGL as atmosphere rather than spectacle. The site feels like a place you're inside, not a page you're reading. KILN should achieve this same sense of location through its own visual language.

**Porter Robinson's Nurture:** The emotional register. Soft organic warmth overtaking digital precision. Cutecore piano mixed with EDM. The clash of two worlds where nature and slowness are winning. This is the feeling, not the specific aesthetic.

**Botanical specimen photography with analytical overlay:** The specific visual treatment for organic elements. Real (or painterly) flowers and plant forms with thin white bounding boxes, connecting lines between features, and monospace numerical annotations drawn on top. Nature being observed by a machine. The reference image shows daffodils against black background with white wireframe bounding boxes, decimal coordinates (0.2857, 0.4286, etc.), and connecting lines mapping feature relationships between blooms.

**Dark bar / listening room:** The spatial feeling. Intimate, low-light, warm in the deep zones. You're somewhere. The site should produce the sensation of being located inside something, not scrolling a webpage.

---

## The Journey: Five Zones

The home page is one continuous vertical scroll. No page breaks. No section headers announcing themselves. The transition between zones is gradual, like walking from one room into the next in a building with no doors.

A minimal fixed nav exists (small dots or short labels along one edge). Clicking a dot scrolls to that zone smoothly. But the default experience is linear. Down.

### Zone 1: The Machine

**Scroll position:** 0% to ~20%

**What the visitor sees:**

Pure system aesthetic. The screen is Ink Black (`#13161F`). Grain is sharp, high-contrast, CRT-like with visible scanline texture. Typography is entirely Inter (the machine font). Monospace system text is prominent: `// SYS_INIT`, datestamps, coordinate metadata.

Content: the KILN wordmark, a single positioning line, minimal system metadata. No boot sequence animation. The content is already there when the page loads, like a terminal that was running before you arrived.

The WebGL layer renders clean geometric forms: wireframe grid on a ground plane, the existing icosahedron rotating slowly, precise point-light accents in Bright Indigo. Everything is angular, exact, cold.

**Color palette:**
- Background: `#13161F` (Ink Black)
- Text: `#FAF6F0` (Parchment)
- Accent: `#0036D8` (Bright Indigo)
- No warm tones. No organic color.

**Sound:** If sound is active (opt-in on first interaction), a low electrical hum sits beneath everything. Steady-state. Machine idle noise. Generated via Web Audio oscillator, very low gain. Barely perceptible.

**Grain:** Sharp, high-contrast, CRT-like. Visible scanline pattern at low opacity.

**The feeling:** You've opened a terminal. A system is running. It's precise and cold and it doesn't care if you're here.

---

### Zone 2: The First Crack

**Scroll position:** ~20% to ~40%

**What the visitor sees:**

A single tendril appears at the bottom edge of Zone 1, growing upward into the content area. It's thin (1-1.5px), drawn with a soft organic curve, desaturated in color, somewhere between Parchment and a muted sage. It branches at natural angles. This is the first organic line in a field of straight edges.

Overlaid on the tendril: a thin white bounding box around the first branch point. A monospace annotation next to it: `C  SPECIMEN_001 | 0.1429`. A connecting line drawn from the annotation to the branch node. The machine is observing the first sign of organic intrusion and trying to catalog it.

The grain starts softening. Less scanline, more film. The geometric wireframe in the WebGL layer develops a slight wobble, vertices drifting off-grid by fractions of a pixel. The structure is loosening.

Content here is the KILN positioning: what the studio does, what it builds, what it cares about. The first instance of Averia Serif Libre appears, a single pull quote or key phrase, surrounded by Inter. The human voice entering the machine voice.

A second tendril appears from the left margin. More bounding boxes catalog new growth points.

**Color palette:**
- Background: `#13161F` (unchanged)
- Text: `#FAF6F0` (unchanged)
- Accent: Bright Indigo sharing space with Pacific Cyan (`#3A7D8C`), desaturated further
- Organic elements: muted sage/grey-green at low opacity

**Sound:** The electrical hum picks up a faint harmonic. Something warmer underneath. Not identifiable as organic yet. Just a shift in the frequency content.

**Grain:** Transitioning from CRT scanline to film grain. Softer.

**The feeling:** Something is growing in here. The machine noticed. It's taking notes.

---

### Zone 3: The Overgrowth

**Scroll position:** ~40% to ~60%

**What the visitor sees:**

The tendrils have multiplied. They trace the edges of content containers, branch into negative space, bud at intersections. The grid in the WebGL layer is visibly warped, lines curving organically. Scanlines are gone, replaced by soft film grain.

Painterly botanical forms begin appearing in the margins and negative space. Not photographs. Not illustrations. Something in between: processed, stylized imagery that reads as natural but isn't photographic. Flowers, leaves, branch cross-sections. They sit behind the content at reduced opacity (15-25%), visible but not competing for attention.

Each botanical form has the analytical overlay: thin white bounding boxes around petals and leaf structures, connecting lines between features, monospace annotations with coordinate data and specimen codes in the existing system voice (`C  FLORA_014 | LAT 0.5714 | CLASS PERENNIAL`). The machine is working overtime trying to catalog the growth. But there's more of it now than there are annotations. The system is starting to fall behind.

Content here is the work: portfolio highlights, recent outputs. Presented within the overgrown environment. Cards or blocks with organic geometry framing them, buds at corners, tendrils connecting pieces like a root system.

Typography is mixed: Averia carries main statements, Inter handles metadata. They coexist.

**Color palette:**
- Background: `#13161F` warming imperceptibly toward `#151A1F` (tiny shift toward blue-green in the shadows)
- Text: `#FAF6F0` (Parchment, steady)
- Machine accent: Indigo receding
- Organic accents emerging: desaturated moss (`#4A5E3E` range), warm amber (`#8B6914` range) for bloom highlights
- Organic colors appear only on the botanical layer, never on system text or UI

**Sound:** The electrical hum has been joined by something that could be wind or could be white noise with organic filtering. The frequency content is warmer. Faint tonal shifts occur as you scroll, not melodic, just the sensation of the ambient texture changing.

**Grain:** Clearly film now. Warmer noise pattern. Softer.

**The feeling:** The machine is still running but something alive has moved in. The system is cataloging as fast as it can, but the growth is winning.

---

### Zone 4: The Canopy

**Scroll position:** ~60% to ~80%

**What the visitor sees:**

The botanical forms are now the primary visual element in the margins. Multiple layers of painterly flowers and organic structures overlap at varying opacities, creating depth. The analytical overlay is fragmenting: bounding boxes are incomplete (drawn with gaps, as if corrupted), connecting lines trail off before reaching their targets, annotations are partially obscured by organic growth. The machine is losing.

The WebGL wireframe grid has been fully consumed. In its place: branching structures rendered as abstract line work that reads as canopy or root network. Not photorealistic. Drawn in the same visual language as the analytical overlay but no longer geometric, the machine's own rendering tools have started producing organic forms.

Content here is signal: writing, thinking, essays. Presented in the warmest, most organic zone. Averia Serif Libre is now dominant. System monospace text is still present but tendrils are growing over decorative system text, partially obscuring it. Functional text (links, dates, navigation) remains clear and readable.

Small bloom forms pulse slowly in the margins. Their movement is tied to a global breathing cycle (slow sine wave, ~8 second period).

**Color palette:**
- Background: `#161D1B` (shifted enough to read as dark forest floor rather than dark screen, still very dark, still readable with Parchment)
- Text: Parchment picks up the faintest warm cast
- Machine accent: Indigo gone from most elements
- Organic accents dominant: moss and amber primary, Pacific Cyan as transitional tone on remaining metadata
- New: small bioluminescent highlights on bloom forms, pale warm white, brighter than Parchment but smaller and sparser

**Sound:** The hum is gone. Replaced by something that sounds like a forest at night heard through a wall. Not literal nature recordings. Synthesized ambient texture with organic character. Layered oscillators with slow LFO modulation on frequency and filter cutoff. Very low volume. If someone takes their headphones off, the site feels slightly emptier but they can't immediately name why.

**Grain:** Soft, organic. Almost paper texture under low light. The texture is increasingly coming from the botanical forms themselves rather than the shader overlay.

**The feeling:** You're in the forest now. The machine is underneath. You can sense it, but the living layer is dominant.

---

### Zone 5: The Clearing

**Scroll position:** ~80% to 100%

**What the visitor sees:**

The dense growth of Zone 4 opens up. Tendrils thin out. Botanical forms become sparser but larger, a single large bloom or leaf structure sitting in the negative space rather than a dense cluster. The analytical overlay is almost gone: one or two partial bounding boxes, a trailing connecting line, a single annotation that reads like the machine's last observation before it went quiet.

The space is calmer. Not the cold calm of Zone 1. A natural quiet. Open space with organic forms at the edges, like a clearing in overgrown terrain.

Content is minimal: links to go deeper (`/work`, `/signal`, `/services`), a contact point, a single closing line in Averia that functions as a thesis for everything above it. The KILN wordmark appears again, but now with tendrils growing from its letterforms and a few small blooms budding at the serifs. A bounding box frames the wordmark with a monospace annotation: `C  ORIGIN | STATUS: OVERGROWN`. The inverse of Zone 1.

**Color palette:**
- Background: `#141C19` (darkest green-black, still dark, still KILN, but unmistakably different from where you started)
- Text: Parchment, slightly warm
- Organic accents: moss dominant, amber for small details, bioluminescent pale on final blooms
- One callback: Bright Indigo returns in a single element (the contact link or a nav dot), a reminder that the machine is still underneath

**Sound:** Near silence. A single sustained tone, warm, barely audible, like the last resonance of a bell struck minutes ago. It decays over the time spent in Zone 5 and eventually there's nothing but the natural grain of the audio context.

**Grain:** Barely visible. The visual texture is almost entirely the botanical forms now.

**The feeling:** You've arrived. The journey delivered you somewhere. The machine that opened the site is still here but the forest grew over it. You're in the clearing and you can decide where to go.

---

## Route-Specific Styling

Each route inherits the aesthetic of the zone it conceptually belongs to. When navigating from the home page journey to a sub-route, the ambient state (grain quality, color temperature, organic density) carries through.

### /work — Zone 3 Territory

Mixed machine and organic. Tendrils present but not overwhelming. The functional grid is visible but softened by organic geometry at its edges. Botanical forms in margins at moderate density (~15% opacity). Analytical overlay on botanical elements intact (bounding boxes, annotations). Work cards have subtle bud forms at corners on hover (expand over 400ms, retract on leave over 300ms, heavy easing). System monospace metadata still functional and readable.

The palette sits at the Zone 3 point: warming background, mixed accent colors, Averia and Inter coexisting.

### /signal — Zone 4 Territory

Warm, organic-dominant, reading-focused. Tendrils in margins, branching structures in WebGL layer. Botanical forms present but restrained inside reading areas. Between essay entries in the index, faint horizontal tendrils connect listings like a root system. Click into an essay and a single vine grows along the left margin at scroll pace: scroll fast and it extends with fewer branches, scroll slow and it branches more densely. Reading area stays completely clean. A small cluster of blooms at the terminus when you finish the piece.

The palette is Zone 4: dark green-black background, warm text, organic accents dominant. Averia carries headlines, Inter carries body text.

### /services — Zone 2 Territory

Mostly machine with first hints of organic detail. Clean, direct, business-appropriate. Sparse tendrils along page frame, almost architectural, following straight lines more than organic curves. One or two partial bounding boxes on the frame tendrils. Minimal botanical presence. The system aesthetic is strongest here because this is where trust and clarity matter most.

Exception: the contact/inquiry section at the bottom has slightly more organic density around it. Buds at the corners, a tendril framing it, the warmest spot on the most clinical page.

The palette is Zone 2: Ink Black background, Parchment text, Indigo and early Cyan accents. Minimal organic color.

### /system — Zone 1 Territory

Full machine. The colophon, the stack, the technical details. The original system aesthetic preserved without organic overlay. This is the foundation the whole thing grows from. Wireframe grid intact, geometric WebGL forms, sharp CRT grain, all Inter typography, full monospace metadata presence.

The one detail: at the very bottom of the page, below everything, a single tendril is visible, just barely entering the frame from below. The forest is coming, even here. But it hasn't arrived yet.

### /shop — Zone 3 Territory

Same treatment as `/work`. Products sit in the overlap space between machine and nature.

### /work/[slug] and /signal/[slug] — Detail Pages

These are standard Next.js SSR pages using the existing PageShell. The WebGL layer transitions to a dormant state: very low opacity canvas, minimal shader activity. Botanical forms as subtle static elements in margins, not animated. Grain soft and warm. The reading experience is calm and undisturbed. Full Ghost CMS integration, Mautic tracking, all functional infrastructure unchanged.

When navigating back to a main route, the environment re-emerges.

---

## Organic Layer: Visual Specification

### Tendril System

Tendrils are procedural organic line structures rendered in the WebGL canvas layer.

**Generation:** L-system algorithm with randomized branching parameters. Seeded randomness so the same page produces similar (but not identical) growth on each visit.

**Appearance:** 1-1.5px lines, drawn with bezier curves for organic feel. Color shifts per zone from desaturated sage/grey-green to warmer moss and amber tones. Tendrils route around text (aware of DOM layout via shared bounding rect coordinates in Zustand). They never cross over letterforms or obscure functional UI.

**Growth behavior:** Time-based, not instant. Growth rate is slow enough that a reading visitor won't notice it happening, but looking away and back after 20 seconds reveals more. Growth accelerates slightly on scroll (more parallax = slightly faster growth). Tendrils grow toward cursor position subtly (nearest tip leans 2-3px toward cursor with heavy easing, like a plant toward light).

**Hover interaction:** Hovering a content card causes buds to appear at card corners. Buds are small circles (6-8px) that expand over 400ms with organic easing. Holding hover for ~2 seconds causes buds to bloom: circles open into small petal-like forms (2-3 lobes fanning outward). Leaving hover reverses the bloom over 300ms.

**Route transition withering:** On navigation, tendrils lose opacity and curl inward (endpoints retract) over 600ms. Ink Black holds for 200ms. New page tendrils begin growing from a new origin point.

**Growth patterns per route:**
- Home: radial growth from KILN wordmark center, spreading outward
- /work: growth along grid lines, following card gutters and row edges
- /signal: restrained, horizontal connections between list items
- /services: sparse, architectural, following straight paths along frame
- /system: absent (except the single tendril at the bottom)

### Botanical Forms

Painterly, processed imagery of flowers, leaves, and organic structures. Not photographs. Not vector illustrations. Stylized enough to feel authored, natural enough to be recognizable. Dark-field presentation (organic forms against the dark background, similar to the daffodil reference image).

**Placement:** Background layer, in margins and negative space. Never inside content columns. Opacity ranges from 8-25% depending on zone (lower in early zones, higher in Zone 4).

**Behavior:** Static positioning but with slow breathing animation (scale oscillation between 0.98 and 1.02 on an 8-second sine wave). Slight parallax offset on scroll (moves at a different rate than content, creating depth). In Zone 3 and 4, botanical forms respond to cursor proximity: the nearest form brightens slightly (opacity increases 5-8%) when cursor is within 200px.

**Density per zone:**
- Zone 1: none
- Zone 2: none (tendrils only)
- Zone 3: sparse, 2-3 forms visible per viewport
- Zone 4: moderate, 4-6 forms visible, overlapping layers for depth
- Zone 5: sparse but larger, 1-2 prominent forms

### Analytical Overlay

Thin white lines, bounding boxes, and monospace annotations drawn on top of botanical forms and tendril systems.

**Bounding boxes:** 1px white stroke, no fill, rectangular. Placed around botanical features (petals, leaf structures, branch nodes). Multiple boxes may overlap or nest on a single form, mapping different features at different scales.

**Connecting lines:** 1px white, drawn from annotation text to the feature being observed. Straight lines with a single angle break (not curved). Lines connect across forms (as in the reference image, where lines bridge from one flower to another).

**Annotations:** Monospace Inter at system text size. Content uses the existing KILN system voice:
- `C  SPECIMEN_014`
- `C  CLASS: PERENNIAL`
- `0.2857`
- `LAT 48.8566`
- `// CATALOGING`

These are not real data. They're atmosphere. They read as a machine trying to understand what it's seeing.

**Degradation across zones:** The overlay starts clean in Zone 2 (complete boxes, precise annotations, all connecting lines reach their targets). By Zone 4, the overlay is fragmenting: boxes are drawn with gaps (dashed or incomplete strokes), connecting lines trail off, annotations are partially obscured by organic growth overlapping them. By Zone 5, only remnants remain.

---

## Sound Design

Sound is opt-in. Activated on first user interaction (click or scroll), respecting browser autoplay policy. No toggle UI. No SOUND:ON/OFF button. Sound is a craft layer, not a feature.

All sounds are synthesized via Web Audio API. No audio files. No loading. Oscillators, gain nodes, and filters only.

### Zone-Specific Ambient Texture

**Zone 1:** Low electrical hum. Steady-state oscillator, sawtooth wave filtered heavily, gain at 0.02-0.03. Constant. Cold.

**Zone 2:** Hum gains a warm harmonic. A second oscillator enters, sine wave, at a consonant interval. Gain still very low.

**Zone 3:** The electrical character of the hum begins dissolving. Filter opens slightly. LFO modulation begins on the oscillator frequencies (very slow, 0.1 Hz). The sound is becoming organic without being identifiable as anything specific.

**Zone 4:** The hum is gone. Replaced by layered oscillators with slow modulation that reads as ambient nature heard through a wall. Not literal recordings. Synthesized texture. White noise filtered through a bandpass with slow LFO on center frequency creates something that could be wind, could be distance, could be nothing. Volume remains very low.

**Zone 5:** Near silence. A single sustained sine tone, warm frequency (200-300 Hz), at barely audible gain, decaying slowly over 15-20 seconds. Then nothing but the natural floor noise of the audio context.

### Interaction Sounds

**Scroll past zone boundary:** A brief tonal shift. The ambient frequency set crossfades over 500ms. Not a sound effect. Just the room changing.

**Hover on content card:** A faint tonal ping, sine wave at a frequency determined by the card's position in the grid (cards at the top ring higher, creating spatial audio). Very short (100ms), very quiet. Most people won't consciously hear it.

**Click/navigate:** A soft mechanical thud. Low-frequency oscillator burst (60-80 Hz), 80ms duration, with a sharp attack and natural decay. Like a relay closing. This is the machine acknowledging input.

**Tendril growth (passive):** No sound. The growth is silent. This makes the visual presence stronger.

---

## Palette Specification (Complete)

| Token | Zone 1 | Zone 2 | Zone 3 | Zone 4 | Zone 5 |
|---|---|---|---|---|---|
| Background | `#13161F` | `#13161F` | `#151A1F` | `#161D1B` | `#141C19` |
| Primary text | `#FAF6F0` | `#FAF6F0` | `#FAF6F0` | `#FAF6F0` warm cast | `#FAF6F0` warm cast |
| Machine accent | `#0036D8` | `#0036D8` + `#3A7D8C` | `#3A7D8C` dominant | Trace only | Single callback element |
| Organic accent | None | Muted sage at low opacity | `#4A5E3E` moss, `#8B6914` amber | Moss + amber dominant | Moss dominant, amber details |
| Bloom highlight | None | None | Emerging | Bioluminescent pale warm white | Sparse, prominent |
| Grain character | Sharp CRT scanline | Softening | Film grain, warm | Paper texture | Barely visible |
| Tendril color | N/A | Desaturated sage/grey | Warming toward moss | Moss, some amber nodes | Moss with amber tips |
| Overlay color | N/A | White, 80% opacity | White, 60% opacity, starting to fragment | White, 40% opacity, fragmented | White, 20% opacity, remnants |

All transitions between zones are continuous, driven by a single scroll progress variable (0.0 to 1.0) that interpolates every shifting value via ScrollTrigger.

---

## Technical Architecture

### What Stays (Unchanged)

- Next.js App Router + TypeScript (strict)
- Ghost CMS integration for Signal content
- Mautic email marketing + Ghost webhook automation
- Stripe payment infrastructure for Shop
- AWS SES, S3, Listmonk
- Zustand for state management
- GSAP + ScrollTrigger for animation
- Lenis for scroll normalization
- Tailwind CSS for styling
- All API routes, webhooks, sitemap generation
- SSR for detail pages (/work/[slug], /signal/[slug])
- Accessibility: full keyboard nav, focus states, prefers-reduced-motion support
- Adaptive WebGL quality scaling (FPS monitoring, DPR adjustment)

### What Changes

**Home page (`/`):** Completely rebuilt as the five-zone scroll journey. No longer a standard page layout. One continuous scroll with scroll-progress-driven transformation of every visual layer.

**SceneManager:** Expanded from single EntranceScene to zone-aware scene system. Scene parameters (geometry type, grid integrity, fog, light color/intensity, grain shader uniforms) interpolate based on scroll progress. Route-specific presets for sub-pages.

**Organic layer (NEW):** New R3F components for tendril generation (L-system geometry), botanical form placement (textured planes with opacity/parallax), and analytical overlay (line geometry + DOM text annotations). All driven by shared scroll progress and cursor position via Zustand.

**Sound system:** Rebuilt from UI sound effects to ambient texture engine. Zone-aware ambient layers crossfaded by scroll progress. Interaction sounds redesigned from terminal beeps to organic/mechanical hybrid tones. Opt-in on first interaction, no toggle.

**Route transitions:** Withering/growth pattern replaces microfiche zoom. Tendrils on current page wither (opacity fade + curl), brief black hold, new page tendrils grow from route-specific origin point.

**CSS custom properties:** Expanded to include all zone-interpolated values (background hue, accent color mix, grain intensity, overlay opacity). Driven by a single `--zone-progress` variable updated by ScrollTrigger.

**PageShell:** Updated to accept zone-level styling presets. Each route declares which zone it inherits from, and the shell applies the corresponding palette, grain, and organic density.

### New Components Required

- `ZoneManager` — Coordinates scroll progress across all layers
- `TendrilSystem` — L-system generation, growth animation, DOM-awareness
- `BotanicalLayer` — Placement and animation of painterly organic forms
- `AnalyticalOverlay` — Bounding boxes, connecting lines, monospace annotations
- `AmbientSoundEngine` — Zone-aware ambient texture synthesis
- `ZoneTransition` — Handles the wither/grow pattern on navigation

### Performance Considerations

Tendril geometry is lightweight: line segments and small circles, not mesh objects. L-system calculation runs once per page and caches. Growth animation reveals pre-calculated paths over time by extending the draw range, not recalculating geometry.

Botanical forms are textured planes, one draw call each. Kept to 2-6 per viewport.

Analytical overlay is a mix of canvas-rendered lines and DOM-positioned text. Minimal draw cost.

On low-end devices (detected by adaptive quality system): reduce tendril branch density, disable buds/blooms, reduce botanical form count, disable parallax on botanicals, simplify grain to CSS-only.

On `prefers-reduced-motion`: show tendrils in fully-grown static state as illustration. Botanical forms visible but not animated. No sound. No growth animation. The organic layer is present as visual design, not as motion.

---

## Scroll Interaction Details

Scroll is the primary input on the home page. Lenis provides normalized momentum.

The scroll length of the home page should be substantial enough to feel like a journey but not so long that it becomes tedious. Target: approximately 5-7 full viewport heights of total scroll distance.

**Scroll-linked behaviors:**
- Zone progress variable (0.0 to 1.0) drives all interpolations
- Camera position/parameters in WebGL scene
- CSS custom property updates for palette shift
- Tendril growth rate (grows faster during active scroll, pauses when scroll is idle)
- Ambient sound crossfading between zone textures
- Grain shader uniform changes (intensity, pattern, warmth)
- Botanical form opacity and parallax offset
- Analytical overlay degradation (stroke completeness, opacity)

**Nav dots:**
- Fixed position, right edge or top edge
- 5 dots corresponding to 5 zones
- Active dot indicated by Bright Indigo fill (Zone 1-2) transitioning to organic accent (Zone 3-5)
- Clicking a dot triggers smooth scroll to that zone's start position
- Labels on hover: short, functional (e.g., "SYSTEM", "ORIGIN", "ARCHIVE", "SIGNAL", "CLEARING")

---

## What This Document Does Not Cover

- Specific copy for each zone (requires separate copywriting pass)
- Exact botanical imagery assets (requires art direction and image creation/processing)
- Deployment or infrastructure changes (none required)
- Mobile-specific adaptations (to be defined in a separate mobile addendum; the core journey works on mobile with reduced WebGL complexity and touch-scroll as primary input)
- Timeline or phased build plan (to be defined separately)

---

## Success Criteria

The site is successful if:

1. A visitor scrolling the home page cannot identify the exact moment the transformation began
2. The experience feels like traveling through something, not reading sections of a page
3. Someone who visits `/signal` directly from a shared link gets a functional, beautiful reading page that happens to have organic warmth in its visual treatment
4. The machine and nature aesthetics feel like they belong together, not like two themes fighting
5. Performance is indistinguishable from current site on mid-range hardware
6. Someone closes the tab and remembers the feeling of using the site before they remember any specific content
7. The site still works, reads, and converts with JavaScript disabled and reduced motion enabled (graceful degradation to static organic illustrations on dark backgrounds)

---

*KILN is not a campaign. It is not a portfolio. It is not a website.*

*It is an environment where the machine and the forest learned to coexist.*
