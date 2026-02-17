# KILN Portfolio

A personal studio portfolio and publishing space — a digital museum for long-form writing, systems thinking, and selective work outputs.

## Architecture

The site operates as two intentional layers:

| Layer | Purpose | Characteristics |
|-------|---------|-----------------|
| **Experience Layer** (Front-of-House) | Establish atmosphere, authority, intent | Cinematic, motion-forward, minimal UI, WebGL-heavy |
| **Archive/Utility Layer** (Back-of-House) | Reading, navigation, inquiry, conversion | Calm, reliable, editorial, reduced motion |

## Technical Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js (App Router) + TypeScript (strict) |
| State | Zustand |
| 3D/WebGL | React Three Fiber (R3F) + Drei |
| Motion | GSAP + ScrollTrigger + Lenis |
| Content | MDX + Velite |
| Styling | Tailwind CSS |

## Routes

```
/              → Entrance (pure experience)
/work          → Gallery/archive of outputs
/work/[slug]   → Individual output
/signal        → Writing/journal index
/signal/[slug] → Essay/article
/system        → About/colophon
```

## Design System

### Colors

- **Ink Black:** `#13161F` — primary background
- **Parchment:** `#FAF6F0` — primary text
- **Bright Indigo:** `#0036D8` — accent
- **Pacific Cyan:** `#3A7D8C` — restricted (button hover only)

### Typography

- **Display:** Averia Serif Libre
- **Body/UI:** Inter

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Philosophy

> KILN is not a campaign. It is an environment.

Motion and technology exist to support perception, not to impress. The site should feel inhabited, not performative.
