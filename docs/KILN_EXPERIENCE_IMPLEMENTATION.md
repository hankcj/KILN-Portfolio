# KILN Experience Implementation Plan

## Version 1.0 | March 2026

This document is the comprehensive technical implementation guide for the KILN Experience redesign defined in `KILN_EXPERIENCE_DESIGN.md`. It provides detailed build specifications, file structures, component APIs, and phased development approach.

**Related Documents:**
- `KILN_EXPERIENCE_DESIGN.md` — Design specification (source of truth)
- `BRANDING.md` — Visual identity and color system
- `KILN_EXPERIENCE_IMPLEMENTATION.md` — This document (technical build plan)

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Phase 1: Zone Architecture Foundation](#2-phase-1-zone-architecture-foundation)
3. [Phase 2: Organic Layer](#3-phase-2-organic-layer)
4. [Phase 3: Sound & Polish](#4-phase-3-sound--polish)
5. [Technical Specifications](#5-technical-specifications)
6. [Component APIs](#6-component-apis)
7. [State Management](#7-state-management)
8. [Performance & Accessibility](#8-performance--accessibility)
9. [Testing & Validation](#9-testing--validation)

---

## 1. Architecture Overview

### 1.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         ZUSTAND STORE                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ scrollStore  │  │ zoneStore    │  │ ambientStore         │  │
│  │ - progress   │  │ - zoneIndex  │  │ - soundEnabled       │  │
│  │ - velocity   │  │ - zonePhase  │  │ - currentAmbient     │  │
│  │ - direction  │  │ - colorMix   │  │ - gainNodes          │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌─────────────────┐    ┌──────────────┐
│  DOM LAYER    │    │   WEBGL LAYER   │    │  AUDIO LAYER │
│  ┌─────────┐  │    │  ┌───────────┐  │    │  ┌────────┐  │
│  │HomePage │  │    │  │ZoneScene  │  │    │  │Ambient │  │
│  │(5 zones)│  │    │  │(shader)   │  │    │  │Engine  │  │
│  └─────────┘  │    │  └───────────┘  │    │  └────────┘  │
│  ┌─────────┐  │    │  ┌───────────┐  │    │  ┌────────┐  │
│  │NavDots  │  │    │  │TendrilSys │  │    │  │Interact│  │
│  └─────────┘  │    │  │(L-system) │  │    │  │Sounds  │  │
│               │    │  └───────────┘  │    │  └────────┘  │
│               │    │  ┌───────────┐  │    └──────────────┘
│               │    │  │Botanicals │  │
│               │    │  └───────────┘  │
└───────────────┘    └─────────────────┘
```

### 1.2 Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| Single scroll progress variable (0.0-1.0) | All interpolations derive from one source of truth |
| CSS custom properties for zone values | Enables GPU-accelerated transitions without React re-renders |
| WebGL overlay at `pointer-events: none` | DOM remains interactive, WebGL provides atmosphere |
| L-system with seeded randomness | Deterministic growth patterns per route, cacheable geometry |
| Web Audio API synthesis (no files) | No loading, instant playback, procedural variation |

### 1.3 Directory Structure (New Components)

```
src/
├── components/
│   ├── experience/              # NEW: Core experience components
│   │   ├── ZoneManager.tsx      # Scroll tracking, zone calculation
│   │   ├── ZoneProgress.tsx     # CSS custom property sync
│   │   ├── NavDots.tsx          # Zone navigation dots
│   │   └── ZoneTransition.tsx   # Route transition handler
│   ├── organic/                 # NEW: Organic layer components
│   │   ├── TendrilSystem.tsx    # L-system generation & animation
│   │   ├── TendrilRenderer.tsx  # WebGL line rendering
│   │   ├── BotanicalLayer.tsx   # Image placement & animation
│   │   ├── AnalyticalOverlay.tsx # Bounding boxes & annotations
│   │   └── BloomEffect.tsx      # Hover bloom animations
│   ├── canvas/                  # EXISTING: Modify
│   │   ├── SceneManager.tsx     # UPDATE: Zone-aware scenes
│   │   ├── scenes/
│   │   │   ├── ZoneScene.tsx    # NEW: Unified zone-reactive scene
│   │   │   └── EntranceScene.tsx # REMOVE: Replaced by ZoneScene
│   │   └── effects/
│   │       ├── GrainEffect.tsx  # UPDATE: Zone-aware grain shader
│   │       └── AmbientFog.tsx   # NEW: Zone-based fog/atmosphere
│   └── dom/                     # EXISTING: Keep
│       ├── PageShell.tsx        # UPDATE: Zone preset support
│       ├── SmoothScroll.tsx     # KEEP: Lenis wrapper
│       └── ...                  # Other existing components
├── lib/
│   ├── lsystem/                 # NEW: L-system algorithm
│   │   ├── generator.ts         # Core L-system with parameters
│   │   ├── rules.ts             # Growth rules per zone/route
│   │   └── geometry.ts          # Line/circle generation
│   ├── audio/                   # NEW: Web Audio synthesis
│   │   ├── AmbientEngine.ts     # Zone-aware ambient generation
│   │   ├── InteractionSounds.ts # Click/hover sound synthesis
│   │   └── utils.ts             # Oscillator helpers
│   ├── zones/                   # NEW: Zone configuration
│   │   ├── config.ts            # Zone definitions (0-1 ranges)
│   │   ├── interpolation.ts     # Value interpolation utilities
│   │   └── palettes.ts          # Per-zone color definitions
│   └── store.ts                 # UPDATE: Add zone/ambient stores
├── hooks/                       # NEW
│   ├── useZoneProgress.ts       # Subscribe to zone changes
│   ├── useTendrilGrowth.ts      # Tendril animation control
│   └── useAmbientSound.ts       # Sound zone transitions
└── types/
    └── experience.ts            # NEW: TypeScript interfaces
```

---

## 2. Phase 1: Zone Architecture Foundation

**Goal:** Rebuild the home page as a continuous scroll journey with zone-aware infrastructure.

**Timeline:** 5-7 days

### 2.1 Tasks

#### Task 1.1: Create Zone Configuration System

**File:** `src/lib/zones/config.ts`

```typescript
// Zone boundaries (scroll progress 0.0 - 1.0)
export const ZONES = {
  MACHINE:    { start: 0.0, end: 0.20 },  // Zone 1
  FIRST_CRACK:{ start: 0.20, end: 0.40 }, // Zone 2
  OVERGROWTH: { start: 0.40, end: 0.60 }, // Zone 3
  CANOPY:     { start: 0.60, end: 0.80 }, // Zone 4
  CLEARING:   { start: 0.80, end: 1.0 },  // Zone 5
} as const;

// Zone indices for navigation
export type ZoneIndex = 0 | 1 | 2 | 3 | 4;

// Get current zone from scroll progress
export function getZoneFromProgress(progress: number): ZoneIndex {
  if (progress < 0.20) return 0;
  if (progress < 0.40) return 1;
  if (progress < 0.60) return 2;
  if (progress < 0.80) return 3;
  return 4;
}

// Calculate zone-local progress (0.0 = start of zone, 1.0 = end)
export function getZoneLocalProgress(globalProgress: number, zoneIndex: ZoneIndex): number {
  const zone = Object.values(ZONES)[zoneIndex];
  return Math.max(0, Math.min(1, 
    (globalProgress - zone.start) / (zone.end - zone.start)
  ));
}
```

#### Task 1.2: Build ZoneManager Component

**File:** `src/components/experience/ZoneManager.tsx`

**Responsibilities:**
- Track scroll progress using GSAP ScrollTrigger
- Calculate current zone and zone-local progress
- Update CSS custom properties for all interpolating values
- Sync with Zustand store

**Implementation Notes:**
```typescript
// CSS custom properties to update per frame
const ZONE_CSS_VARS = [
  '--zone-progress',      // 0.0 - 1.0 global
  '--zone-index',         // 0 - 4
  '--bg-hue',             // Background hue shift
  '--bg-saturation',      // Background saturation
  '--bg-lightness',       // Background lightness
  '--grain-intensity',    // Grain shader intensity
  '--grain-warmth',       // Grain warmth (0 = CRT, 1 = organic)
  '--organic-opacity',    // Botanical layer opacity
  '--overlay-opacity',    // Analytical overlay opacity
  '--overlay-integrity',  // Bounding box completeness (1.0 = full, 0.0 = fragmented)
  '--accent-hue',         // Accent color hue
];
```

#### Task 1.3: Create ZoneScene (WebGL)

**File:** `src/components/canvas/scenes/ZoneScene.tsx`

**Responsibilities:**
- Single unified scene that interpolates based on zone progress
- Parameters that shift across zones:
  - Geometry type: icosahedron → warped grid → branching structures
  - Fog color: Ink Black → warming toward forest green
  - Light color: Bright Indigo → Pacific Cyan → moss/amber
  - Grid integrity: 1.0 → 0.0 (straight → warped → consumed)

**Key Parameters (interpolated by zone):**
```typescript
interface ZoneSceneParams {
  geometryType: 'icosahedron' | 'warpedGrid' | 'branches';
  gridIntegrity: number;        // 1.0 = straight, 0.0 = fully organic
  fogColor: THREE.Color;
  fogDensity: number;
  lightColor: THREE.Color;
  lightIntensity: number;
  wireframeOpacity: number;
  vertexDisplacement: number;   // How much vertices drift off-grid
}
```

#### Task 1.4: Build New Home Page Structure

**File:** `src/app/page.tsx` (replaces current)

**Structure:**
```tsx
export default function HomePage() {
  return (
    <ZoneProvider>
      {/* Fixed WebGL background layer */}
      <ZoneScene />
      
      {/* Fixed organic layer (placeholder for Phase 2) */}
      <OrganicLayerPlaceholder />
      
      {/* Scrollable content - 500-700vh */}
      <main className="relative z-10">
        <Zone1Machine />
        <Zone2FirstCrack />
        <Zone3Overgrowth />
        <Zone4Canopy />
        <Zone5Clearing />
      </main>
      
      {/* Fixed navigation */}
      <NavDots />
    </ZoneProvider>
  );
}
```

**Zone Content Components:**
Each zone is a section with `min-height: 100vh` (or calculated portion of total scroll):
- Zone 1: KILN wordmark, positioning line, system metadata
- Zone 2: Studio positioning content, first Averia pull quote
- Zone 3: Portfolio highlights in overgrown environment
- Zone 4: Signal/writing preview, dominant organic aesthetic
- Zone 5: Contact/links, thesis statement, overgrown wordmark

#### Task 1.5: Update Grain Shader

**File:** `src/components/canvas/effects/GrainEffect.tsx`

**Zone-Aware Uniforms:**
```glsl
uniform float uIntensity;      // Overall grain opacity
uniform float uScanlineMix;    // 1.0 = CRT scanlines, 0.0 = film grain
uniform float uWarmth;         // Color temperature of noise
uniform float uSpeed;          // Animation speed
```

**Behavior per zone:**
- Zone 1: Sharp scanlines, high contrast, cold
- Zone 2: Transitioning, softening
- Zone 3: Film grain, warmer
- Zone 4: Paper texture, organic
- Zone 5: Barely visible

#### Task 1.6: Update PageShell for Zone Presets

**File:** `src/components/dom/PageShell.tsx`

**Add zone preset support:**
```typescript
type ZonePreset = 'zone1' | 'zone2' | 'zone3' | 'zone4' | 'zone5';

interface PageShellProps {
  // ... existing props
  zonePreset?: ZonePreset;  // Which zone aesthetic to inherit
}
```

Routes declare their zone:
- `/system` → zone1
- `/services` → zone2
- `/work`, `/shop` → zone3
- `/signal` → zone4

### 2.2 Phase 1 Deliverables

- [ ] Zone configuration system working
- [ ] Scroll progress tracked and synced to CSS vars
- [ ] ZoneScene rendering zone-appropriate visuals
- [ ] New home page with 5 zone sections
- [ ] Grain shader transitioning across zones
- [ ] PageShell accepting zone presets
- [ ] Nav dots fixed position, clickable for zone jump

### 2.3 Phase 1 Testing Checklist

- [ ] Scroll progress updates smoothly (60fps)
- [ ] Zone boundaries trigger at correct scroll positions
- [ ] CSS custom properties update every frame without jank
- [ ] ZoneScene maintains 60fps on mid-range hardware
- [ ] Nav dots scroll to correct positions
- [ ] Reduced motion: zones work as static sections

---

## 3. Phase 2: Organic Layer

**Goal:** Add the tendril system, botanical forms, and analytical overlay.

**Timeline:** 8-10 days

### 3.1 Tasks

#### Task 2.1: L-System Algorithm

**File:** `src/lib/lsystem/generator.ts`

**Core Algorithm:**
```typescript
interface LSystemConfig {
  axiom: string;
  rules: Record<string, string>;
  iterations: number;
  angle: number;
  stepSize: number;
  randomness: number;  // 0-1, adds variation
  seed: string;        // For deterministic results
}

interface TendrilNode {
  x: number;
  y: number;
  angle: number;
  depth: number;
  parent: TendrilNode | null;
  children: TendrilNode[];
}

export function generateTendrilGeometry(
  config: LSystemConfig,
  boundingRects: DOMRect[]  // Text areas to avoid
): TendrilNode[];
```

**Growth Rules per Route:**
```typescript
export const TENDRIL_RULES = {
  home: {
    axiom: 'X',
    rules: { X: 'F+[[X]-X]-F[-FX]+X', F: 'FF' },
    iterations: 4,
    angle: 25,
    // Radial growth from center
  },
  work: {
    // Grid-following growth
  },
  signal: {
    // Horizontal connections
  },
  services: {
    // Sparse, architectural
  },
  system: {
    // Absent (except single bottom tendril)
  },
};
```

#### Task 2.2: TendrilSystem Component

**File:** `src/components/organic/TendrilSystem.tsx`

**Responsibilities:**
- Generate tendril geometry on mount (cached)
- Animate growth over time (reveal draw range)
- Respond to scroll (growth accelerates)
- Route around DOM elements (using bounding rects from store)
- Cursor attraction (nearest tip leans toward cursor)

**Props:**
```typescript
interface TendrilSystemProps {
  route: 'home' | 'work' | 'signal' | 'services' | 'system';
  zoneProgress: number;  // 0.0-1.0 for color/behavior
  density: 'high' | 'medium' | 'low' | 'none';
  growthSpeed: number;
  enableHoverBlooms: boolean;
}
```

**Performance Optimization:**
- Geometry calculated once, cached
- Growth animation extends draw range, doesn't recalculate
- Throttled bounding rect updates (200ms)
- Low-end: reduce branch density by 50%

#### Task 2.3: Bloom/Bud Interactions

**File:** `src/components/organic/BloomEffect.tsx`

**Behavior:**
- On card hover: buds appear at corners (6-8px circles)
- Expand over 400ms with organic easing
- Hold 2s: bloom into petal forms (2-3 lobes)
- Leave: reverse over 300ms

**Implementation:**
```typescript
interface BloomProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  color: string;
  stage: 'closed' | 'bud' | 'bloom';
  onStageChange?: (stage: BloomStage) => void;
}
```

#### Task 2.4: Botanical Layer

**File:** `src/components/organic/BotanicalLayer.tsx`

**Responsibilities:**
- Place botanical images in margins/negative space
- Apply breathing animation (scale 0.98-1.02, 8s sine)
- Parallax offset on scroll
- Cursor proximity response (opacity +5-8% within 200px)
- Zone-aware density and positioning

**Image Requirements:**
- Format: PNG with transparency or WebP
- Style: Painterly, dark-field (organic on black)
- Treatment: Not photorealistic, stylized
- Size: 400-800px, optimized

**Placement Zones (per viewport):**
- Zone 1: None
- Zone 2: None
- Zone 3: 2-3 forms, sparse
- Zone 4: 4-6 forms, overlapping layers
- Zone 5: 1-2 large forms

#### Task 2.5: Analytical Overlay

**File:** `src/components/organic/AnalyticalOverlay.tsx`

**Elements:**
1. **Bounding boxes**: 1px white stroke around botanical features
2. **Connecting lines**: 1px white, single angle break
3. **Annotations**: Monospace text with specimen codes

**Annotation Format:**
```
C  SPECIMEN_001 | 0.1429
C  FLORA_014 | LAT 0.5714 | CLASS PERENNIAL
// CATALOGING
```

**Degradation System:**
```typescript
interface OverlayIntegrity {
  boxCompleteness: number;    // 1.0 = full rect, 0.0 = dashed/gapped
  lineReach: number;          // 1.0 = reaches target, 0.0 = trails off
  textClarity: number;        // 1.0 = fully visible, 0.0 = obscured
  annotationCount: number;    // Reduces per zone
}

// Zone mapping:
// Zone 2: { 0.8, 1.0, 1.0, 8 }
// Zone 3: { 0.6, 0.8, 0.9, 6 }
// Zone 4: { 0.4, 0.5, 0.6, 3 }  // Fragmenting
// Zone 5: { 0.2, 0.2, 0.3, 1 }  // Remnants only
```

#### Task 2.6: Route Transitions (Wither/Grow)

**File:** `src/components/experience/ZoneTransition.tsx`

**Sequence:**
1. Navigation triggered
2. Current tendrils wither: opacity fade + curl (endpoints retract) over 600ms
3. Ink black hold: 200ms
4. New page: tendrils begin growing from route-specific origin

**Implementation:**
```typescript
interface TransitionState {
  phase: 'idle' | 'withering' | 'hold' | 'growing';
  fromRoute: string;
  toRoute: string;
}
```

### 3.2 Phase 2 Deliverables

- [ ] L-system generating organic tendril geometry
- [ ] TendrilSystem animating growth
- [ ] DOM-aware routing (tendrils avoid text)
- [ ] Hover bloom interactions on cards
- [ ] Botanical layer with breathing animation
- [ ] Analytical overlay with zone-based degradation
- [ ] Route transitions with wither/grow pattern

### 3.3 Phase 2 Testing Checklist

- [ ] Tendrils generate without blocking main thread
- [ ] Growth animation is smooth (60fps)
- [ ] Tendrils route around text (verify with various content lengths)
- [ ] Hover blooms feel responsive
- [ ] Botanical parallax creates depth
- [ ] Overlay degrades appropriately per zone
- [ ] Route transitions complete in < 1s
- [ ] Reduced motion: tendrils show as static illustration

---

## 4. Phase 3: Sound & Polish

**Goal:** Add ambient sound synthesis and final polish.

**Timeline:** 4-5 days

### 4.1 Tasks

#### Task 4.1: Ambient Sound Engine

**File:** `src/lib/audio/AmbientEngine.ts`

**Architecture:**
```typescript
class AmbientEngine {
  private ctx: AudioContext;
  private masterGain: GainNode;
  private zoneOscillators: Map<ZoneIndex, OscillatorConfig>;
  private currentZone: ZoneIndex = 0;
  private crossfadeDuration: number = 0.5; // seconds
  
  constructor() {
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.02; // Very low
    this.masterGain.connect(this.ctx.destination);
  }
  
  // Initialize on first user interaction
  async init(): Promise<void>;
  
  // Crossfade to zone's ambient texture
  transitionToZone(zoneIndex: ZoneIndex): void;
  
  // Cleanup
  destroy(): void;
}
```

**Zone Sound Specifications:**

| Zone | Oscillator 1 | Oscillator 2 | Filter | LFO | Gain |
|------|--------------|--------------|--------|-----|------|
| 1 | Sawtooth, 60Hz | - | Lowpass, 200Hz | None | 0.02 |
| 2 | Sawtooth, 60Hz | Sine, 120Hz | Lowpass, 400Hz | Slow | 0.025 |
| 3 | Sawtooth, 60Hz | Sine, 180Hz | Bandpass, 300-800Hz | 0.1Hz | 0.025 |
| 4 | White noise → Bandpass | Sine, 200Hz | BPF w/ LFO | 0.05Hz | 0.02 |
| 5 | Sine, 250Hz | - | None | Decay | 0.01 → 0 |

#### Task 4.2: Interaction Sounds

**File:** `src/lib/audio/InteractionSounds.ts`

**Sounds:**
```typescript
interface InteractionSounds {
  // Scroll past zone boundary
  zoneTransition(): void;  // Brief tonal shift, 500ms crossfade
  
  // Hover on content card
  hover(frequency: number): void;  // Sine ping, 100ms, very quiet
  
  // Click/navigate
  click(): void;  // Low mechanical thud, 60-80Hz burst, 80ms
}
```

**Hover Frequency Mapping:**
- Cards at top of grid → higher frequency
- Creates spatial audio effect
- Frequency = 400 + (row * 50) Hz

#### Task 4.3: Sound Integration

**Integration Points:**
1. **Opt-in on first interaction**: Any click/scroll enables sound
2. **Zone transitions**: ScrollTrigger calls `ambientEngine.transitionToZone()`
3. **Card hovers**: `onMouseEnter` triggers hover sound with calculated frequency
4. **Navigation clicks**: `onClick` triggers click sound

**No Toggle UI**: Sound is craft layer, not feature. No on/off button.

#### Task 4.4: Final Polish

**Tasks:**
- [ ] Copy audit for all zones
- [ ] Performance profiling (Chrome DevTools)
- [ ] Accessibility audit (keyboard nav, focus states, reduced motion)
- [ ] Mobile adaptation (reduced WebGL complexity, touch-scroll)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Low-end device testing

### 4.2 Phase 3 Deliverables

- [ ] Ambient engine generating zone-appropriate textures
- [ ] Crossfading between zones on scroll
- [ ] Interaction sounds (hover, click, zone transition)
- [ ] Sound opt-in on first user gesture
- [ ] Copy finalized for all zones
- [ ] Performance validated on target hardware
- [ ] Accessibility requirements met

### 4.3 Phase 3 Testing Checklist

- [ ] Sound initializes on first interaction
- [ ] No autoplay policy violations
- [ ] Zone crossfades are smooth
- [ ] Interaction sounds are subtle (most users don't consciously notice)
- [ ] Reduced motion: sound disabled
- [ ] Site functions correctly with JavaScript disabled (graceful degradation)
- [ ] 60fps maintained with all layers active

---

## 5. Technical Specifications

### 5.1 Color Palette (Complete Zone Specification)

| Token | Zone 1 | Zone 2 | Zone 3 | Zone 4 | Zone 5 |
|-------|--------|--------|--------|--------|--------|
| Background | `#13161F` | `#13161F` | `#151A1F` | `#161D1B` | `#141C19` |
| Primary text | `#FAF6F0` | `#FAF6F0` | `#FAF6F0` | `#FAF6F0` (warm) | `#FAF6F0` (warm) |
| Machine accent | `#0036D8` | `#0036D8` + `#3A7D8C` | `#3A7D8C` dominant | Trace only | Single callback |
| Organic accent | None | Muted sage | `#4A5E3E` moss, `#8B6914` amber | Moss + amber dominant | Moss dominant |
| Bloom highlight | None | None | Emerging | Bioluminescent pale | Sparse, prominent |
| Tendril color | N/A | Desaturated sage | Warming toward moss | Moss, amber nodes | Moss, amber tips |
| Overlay opacity | N/A | 80% | 60% | 40% | 20% |

### 5.2 Typography

**Zone 1-2:**
- Headlines: Inter (machine font)
- Body: Inter
- System text: Inter monospace

**Zone 3:**
- Headlines: Averia Serif Libre + Inter mixed
- Body: Inter
- System text: Inter monospace

**Zone 4-5:**
- Headlines: Averia Serif Libre dominant
- Body: Inter
- System text: Inter monospace (obscured by organic growth)

### 5.3 Scroll Configuration

**Total scroll length:** 500-700vh (target: 5-7 full viewport heights)

**Lenis configuration:**
```typescript
const lenisConfig = {
  lerp: 0.1,           // Smooth interpolation
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,  // Faster on touch
};
```

### 5.4 Performance Budgets

| Metric | Target | Maximum |
|--------|--------|---------|
| First Contentful Paint | < 1.5s | 2.0s |
| Time to Interactive | < 3.0s | 4.0s |
| Animation frame rate | 60fps | 55fps |
| Memory usage | < 150MB | 200MB |
| Total JS bundle | < 200KB gzipped | 250KB |

### 5.5 Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 15+
- Chrome Android: Last 2 versions

---

## 6. Component APIs

### 6.1 ZoneManager

```typescript
interface ZoneManagerProps {
  children: React.ReactNode;
  scrollLength?: '500vh' | '600vh' | '700vh';
  onZoneChange?: (zone: ZoneIndex) => void;
}

// Usage
<ZoneManager scrollLength="600vh" onZoneChange={handleZoneChange}>
  <HomeContent />
</ZoneManager>
```

### 6.2 TendrilSystem

```typescript
interface TendrilSystemProps {
  route: 'home' | 'work' | 'signal' | 'services' | 'system';
  density?: 'high' | 'medium' | 'low' | 'none';
  color?: string;  // CSS color, interpolated by zone
  growthSpeed?: number;  // 0.1 - 2.0
  enableBlooms?: boolean;
  enableCursorAttraction?: boolean;
}

// Usage
<TendrilSystem 
  route="home" 
  density="high"
  growthSpeed={1.0}
  enableBlooms={true}
/>
```

### 6.3 BotanicalLayer

```typescript
interface BotanicalLayerProps {
  zone: ZoneIndex;
  imageSet: BotanicalImage[];
  breathingRate?: number;  // Seconds per cycle, default 8
  parallaxStrength?: number;  // 0-1, default 0.3
  cursorResponseRadius?: number;  // px, default 200
}

interface BotanicalImage {
  src: string;
  position: { x: number; y: number };  // %
  size: { width: number; height: number };  // px
  opacity: number;  // 0-1
  layer: 'back' | 'mid' | 'front';
}
```

### 6.4 AnalyticalOverlay

```typescript
interface AnalyticalOverlayProps {
  botanicals: BotanicalImage[];
  integrity: OverlayIntegrity;
  annotations: Annotation[];
}

interface Annotation {
  id: string;
  text: string;
  targetPosition: { x: number; y: number };
  labelPosition: { x: number; y: number };
}
```

### 6.5 AmbientEngine (Audio)

```typescript
class AmbientEngine {
  // Initialize audio context (must be called after user gesture)
  init(): Promise<void>;
  
  // Transition to zone's ambient texture
  setZone(zoneIndex: ZoneIndex, immediate?: boolean): void;
  
  // Play interaction sounds
  playHover(frequency: number): void;
  playClick(): void;
  
  // Master volume
  setVolume(gain: number): void;
  
  // Cleanup
  destroy(): void;
}
```

---

## 7. State Management

### 7.1 Zustand Store Structure

```typescript
// src/lib/store.ts

interface ScrollState {
  progress: number;        // 0.0 - 1.0
  velocity: number;        // pixels per frame
  direction: 1 | -1;       // down or up
  isScrolling: boolean;
}

interface ZoneState {
  currentZone: ZoneIndex;
  zoneProgress: number;    // Local progress within zone (0.0-1.0)
  palette: ZonePalette;    // Current interpolated colors
}

interface AmbientState {
  soundEnabled: boolean;
  isInitialized: boolean;
  currentZone: ZoneIndex;
}

interface DOMState {
  textBoundingRects: DOMRect[];  // For tendril routing
  cardElements: HTMLElement[];   // For bloom positioning
}

export const useScrollStore = create<ScrollState>(/* ... */);
export const useZoneStore = create<ZoneState>(/* ... */);
export const useAmbientStore = create<AmbientState>(/* ... */);
export const useDOMStore = create<DOMState>(/* ... */);
```

### 7.2 CSS Custom Properties

These are updated by ZoneManager every frame:

```css
:root {
  /* Core zone progress */
  --zone-progress: 0;
  --zone-index: 0;
  --zone-local-progress: 0;
  
  /* Color interpolation */
  --bg-color: #13161F;
  --text-color: #FAF6F0;
  --accent-color: #0036D8;
  --organic-accent: transparent;
  
  /* Grain shader */
  --grain-intensity: 0.05;
  --grain-warmth: 0;
  --grain-scanline-mix: 1;
  
  /* Organic layer */
  --organic-opacity: 0;
  --tendril-color: #8B9A7D;
  
  /* Analytical overlay */
  --overlay-opacity: 0;
  --overlay-integrity: 1;
}
```

---

## 8. Performance & Accessibility

### 8.1 Performance Optimizations

**L-System Generation:**
- Calculate once on mount, cache result
- Use seeded random for deterministic output
- Web Worker for heavy calculations (if needed)

**Tendril Animation:**
- Extend draw range, don't regenerate geometry
- Throttle cursor attraction updates (16ms)
- Use instanced mesh for buds/blooms

**Botanical Layer:**
- Lazy load images below fold
- Use `will-change: transform` on parallax elements
- Limit to 6 concurrent images per viewport

**Grain Shader:**
- Reduce resolution on high-DPI screens
- Disable in low power mode
- Use CSS fallback for reduced motion

### 8.2 Adaptive Quality System

```typescript
interface QualitySettings {
  tendrilDensity: number;      // 1.0 = full, 0.5 = reduced
  enableBlooms: boolean;
  enableParallax: boolean;
  grainResolution: number;     // 0.5 = half res
  enableSound: boolean;
}

function getQualitySettings(): QualitySettings {
  if (isLowEndDevice() || prefersReducedMotion()) {
    return {
      tendrilDensity: 0.5,
      enableBlooms: false,
      enableParallax: false,
      grainResolution: 0.5,
      enableSound: false,
    };
  }
  return { /* full quality */ };
}
```

### 8.3 Accessibility Requirements

**Keyboard Navigation:**
- Nav dots: Tab focusable, Enter to activate
- Content cards: Standard tab order
- Skip link to main content

**Focus States:**
- Visible focus rings on all interactive elements
- Focus rings use accent color (zone-aware)

**Reduced Motion (`prefers-reduced-motion`):**
- Tendrils: Fully grown static state
- Botanicals: No breathing animation
- Grain: Static or disabled
- Sound: Disabled
- Transitions: Simple opacity fades

**Screen Reader:**
- Nav dots: `aria-label="Navigate to [zone name]"`
- Zone sections: `aria-label="Zone [n]: [name]"`
- Analytical overlay: `aria-hidden="true"` (decorative only)

**Color Contrast:**
- Maintain WCAG AA (4.5:1) for all text
- Botanical elements are decorative (no contrast requirement)

---

## 9. Testing & Validation

### 9.1 Unit Tests

**L-System Generator:**
```typescript
describe('L-System Generator', () => {
  it('produces deterministic output with same seed', () => {
    const a = generate({ seed: 'test', iterations: 3 });
    const b = generate({ seed: 'test', iterations: 3 });
    expect(a).toEqual(b);
  });
  
  it('routes around bounding rects', () => {
    const rect = new DOMRect(100, 100, 200, 200);
    const nodes = generate({ seed: 'test' }, [rect]);
    expect(nodes.every(n => !rect.contains(n.x, n.y))).toBe(true);
  });
});
```

**Zone Calculations:**
```typescript
describe('Zone Progress', () => {
  it('returns correct zone for progress values', () => {
    expect(getZoneFromProgress(0.1)).toBe(0);   // Machine
    expect(getZoneFromProgress(0.3)).toBe(1);   // First Crack
    expect(getZoneFromProgress(0.9)).toBe(4);   // Clearing
  });
});
```

### 9.2 Integration Tests

**Scroll Synchronization:**
- Verify CSS custom properties update every frame
- Verify Zustand store syncs with ScrollTrigger
- Test zone change callbacks fire correctly

**Route Transitions:**
- Verify wither animation completes
- Verify hold state duration
- Verify grow animation starts correctly

### 9.3 Manual Testing Checklist

**Visual:**
- [ ] Zone boundaries are imperceptible (smooth transitions)
- [ ] Tendrils never obscure text
- [ ] Botanical images load progressively
- [ ] Overlay fragments convincingly in Zone 4

**Performance:**
- [ ] 60fps on MacBook Air/Pro (M1/M2)
- [ ] 60fps on mid-range Windows laptop
- [ ] Acceptable performance on mobile (30fps minimum)
- [ ] No memory leaks over 5-minute session

**Interaction:**
- [ ] Nav dots work with mouse and keyboard
- [ ] Hover blooms feel responsive
- [ ] Scroll feels natural with Lenis
- [ ] Route transitions complete smoothly

**Accessibility:**
- [ ] Full keyboard navigation
- [ ] Screen reader announces zone changes
- [ ] Reduced motion respected
- [ ] High contrast mode functional

**Sound:**
- [ ] Initializes on first interaction
- [ ] No autoplay warnings
- [ ] Crossfades are smooth
- [ ] Interaction sounds are subtle

### 9.4 Success Criteria Validation

Per `KILN_EXPERIENCE_DESIGN.md`:

1. **Cannot identify transformation moment:**
   - Test: Ask 3 users when they noticed the organic elements
   - Pass: No one can name a specific moment

2. **Feels like traveling, not reading sections:**
   - Test: User interview after scroll-through
   - Pass: Users describe it as a journey/place, not a webpage

3. **Direct route visits work:**
   - Test: Visit `/signal` directly
   - Pass: Functional page with appropriate zone aesthetic

4. **Machine and nature coexist:**
   - Test: Visual inspection of all zones
   - Pass: Both aesthetics feel unified, not conflicting

5. **Performance:**
   - Test: Lighthouse performance score
   - Pass: > 90 on desktop, > 70 on mobile

6. **Memorable feeling:**
   - Test: 24-hour recall test
   - Pass: Users remember the experience before specific content

7. **Graceful degradation:**
   - Test: Disable JavaScript, enable reduced motion
   - Pass: Site remains functional and readable

---

## Appendices

### A. Glossary

- **Zone:** One of five scroll regions (0-4), each with distinct aesthetic
- **Tendril:** Procedural organic line structure (L-system)
- **Analytical Overlay:** Machine-style annotations (bounding boxes, lines, text)
- **L-System:** Lindenmayer system, algorithm for generating organic patterns
- **Zone Progress:** Scroll position normalized to 0.0-1.0 range
- **Bloom:** Interactive flower effect on card hover
- **Wither/Grow:** Route transition pattern for organic elements

### B. External Dependencies

**Already Installed:**
- `three`, `@react-three/fiber`, `@react-three/drei`
- `gsap` + `@gsap/react`
- `lenis`
- `zustand`

**New Dependencies (Phase 3):**
- None (Web Audio API is native)

### C. Asset Requirements

**Botanical Images:**
- 10-15 processed images
- Format: WebP with transparency
- Style: Dark-field, painterly
- Resolution: 400-800px
- Total size target: < 2MB

**Font:**
- Averia Serif Libre (already in use)
- Inter (already in use)

### D. File Checklist

**New Files to Create:**
```
src/
├── components/experience/
│   ├── ZoneManager.tsx
│   ├── ZoneProgress.tsx
│   ├── NavDots.tsx
│   └── ZoneTransition.tsx
├── components/organic/
│   ├── TendrilSystem.tsx
│   ├── TendrilRenderer.tsx
│   ├── BotanicalLayer.tsx
│   ├── AnalyticalOverlay.tsx
│   └── BloomEffect.tsx
├── components/canvas/scenes/
│   └── ZoneScene.tsx
├── components/canvas/effects/
│   └── AmbientFog.tsx
├── lib/lsystem/
│   ├── generator.ts
│   ├── rules.ts
│   └── geometry.ts
├── lib/audio/
│   ├── AmbientEngine.ts
│   └── InteractionSounds.ts
├── lib/zones/
│   ├── config.ts
│   ├── interpolation.ts
│   └── palettes.ts
├── hooks/
│   ├── useZoneProgress.ts
│   ├── useTendrilGrowth.ts
│   └── useAmbientSound.ts
└── types/experience.ts
```

**Files to Modify:**
```
src/
├── app/page.tsx (rewrite)
├── components/canvas/
│   ├── SceneManager.tsx
│   └── effects/GrainEffect.tsx
├── components/dom/PageShell.tsx
└── lib/store.ts
```

**Files to Remove:**
```
src/components/canvas/scenes/EntranceScene.tsx
```

---

*Document created: March 2026*
*Version: 1.0*
*Estimated total development: 3-4 weeks*
