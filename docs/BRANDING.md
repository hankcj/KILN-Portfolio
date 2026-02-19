# KILN Brand & Layout Standards

## Overview

This document defines the consistent visual and interaction standards across all pages in the KILN site. The goal is to ensure that only **content** changes between pages, while **navigation**, **decorations**, and **system elements** remain consistent.

---

## Page Structure Standards

### Required Elements (Every Page)

All pages MUST include:

1. **Corner Navigation** - The "scattered corner" navigation system
   - `K` logo (top-left) - Links to home
   - `C  WORK` (top-right) - Links to work archive
   - `C  SIGNAL` (bottom-left) - Links to signal/journal
   - `// SYSTEM` (bottom-right) - Links to system/colophon

2. **Corner Brackets** - Decorative frame elements
   - 4 corner brackets (top-left, top-right, bottom-left, bottom-right)
   - Accent color (#0036D8) at 50% opacity
   - 1px border width, 16px (w-4 h-4) size

3. **Living Effects** - System atmosphere
   - Film grain overlay (subtle, animated)
   - Scanlines (very subtle)
   - System clock (bottom-left, hidden on mobile)

4. **Side Text** (Desktop only, optional but recommended)
   - Left side: Vertical text, rotated 180deg
   - Right side: Vertical text
   - System mono font, muted color

### Page Shell Components

Use the provided shell components for consistency:

#### For Client Components (with animations)
```tsx
import { PageShell } from '@/components/dom/PageShell';

export default function MyPage() {
  return (
    <PageShell 
      currentPage="work"        // Current page identifier
      leftSideText="..."        // Left vertical text
      rightSideText="..."       // Right vertical text
    >
      {/* Your page content */}
    </PageShell>
  );
}
```

#### For Server Components
```tsx
import { SimplePageShell } from '@/components/dom/PageShell';

export default async function MyServerPage() {
  return (
    <SimplePageShell
      currentPage="signal"
      leftSideText="..."
      rightSideText="..."
    >
      {/* Your page content */}
    </SimplePageShell>
  );
}
```

---

## Navigation Behavior

### Active State
- The current page's nav item is highlighted in **accent color** (#0036D8)
- No hover effect on active item
- Other items show GlitchText effect on hover

### Home Navigation
- The `K` logo in top-left always returns to home
- On home page, the K is highlighted in accent color
- On other pages, K is parchment white with hover accent

### Transitions
- All navigation uses the App Store's `startTransition()` for consistent page transitions
- The transition microcopy changes based on destination (see below)

---

## Transition Microcopy

Each destination has specific loading text:

| Destination | Line 1 | Line 2 | Line 3 | Line 4 |
|-------------|--------|--------|--------|--------|
| **Home** | `// RETURNING_TO_ORIGIN` | `C  RESET_NAVIGATION` | `>> DISENGAGE_ARCHIVE` | `** HOME` |
| **Work** | `// LOADING_ARCHIVE` | `C  ACCESS_GRANTED` | `READING_INDEX...` | `SYS_RDY` |
| **Signal** | `// TUNING_FREQUENCY` | `C  ESTABLISH_UPLINK` | `RECEIVING_TRANSMISSION...` | `SIGNAL_ACQUIRED` |
| **System** | `// SYSTEM_DIAGNOSTICS` | `C  QUERY_PARAMETERS` | `LOADING_COLOPHON...` | `DOCS_READY` |

---

## Side Text Conventions

### Standard Patterns

| Page | Left Side | Right Side |
|------|-----------|------------|
| **Home** | `PORTFOLIO_V1.0.0` | `48.8566° N 2.3522° E` |
| **Work** | `OUTPUT_ARCHIVE_V2.0` | `{count} ITEMS INDEXED` |
| **Signal** | `TRANSMISSION_LOG` | `{count} ENTRIES LOGGED` |
| **System** | `SYS_DOCS_V1.0` | `48.8566° N 2.3522° E` |
| **Post** | `TRANSMISSION_LOG` | `{date}` |

### Format Guidelines
- Use UPPERCASE
- Use underscores for spaces in codes
- Include version numbers for systems
- Include item counts where relevant
- Dates in YYYY.MM.DD format

---

## Visual Elements

### Corner Brackets
```tsx
// Fixed position, decorative only
<div className="fixed top-8 left-8 w-4 h-4 border-l border-t border-accent/50 pointer-events-none z-40" />
<div className="fixed top-8 right-8 w-4 h-4 border-r border-t border-accent/50 pointer-events-none z-40" />
<div className="fixed bottom-8 left-8 w-4 h-4 border-l border-b border-accent/50 pointer-events-none z-40" />
<div className="fixed bottom-8 right-8 w-4 h-4 border-r border-b border-accent/50 pointer-events-none z-40" />
```

### Content Spacing
- All content starts at `pt-32` (8rem from top)
- Horizontal padding: `px-6 md:px-16 lg:px-24`
- Bottom padding: `pb-16` or `pb-24`

### Z-Index Layers
| Element | Z-Index |
|---------|---------|
| Grain/Scanlines | 9999/9998 |
| Navigation | 50 |
| Corner Brackets | 40 |
| Content | 10 |
| Background effects | 1-2 |

---

## Typography Standards

### Page Titles
- Font: Averia Serif Libre (heading)
- Size: `text-display` (3.5rem)
- Color: `text-on-bg-primary` (parchment)

### Section Headers
- Mono label above: `font-mono text-system text-on-surface-muted tracking-widest`
- Example: `C  OUTPUT ARCHIVE`, `// SYSTEM DIAGNOSTIC`

### Body Text
- Font: Inter (body)
- Size: `text-body` (1rem)
- Color: `text-on-bg-secondary` (muted parchment)
- Line height: 1.6

---

## Color Tokens

Always use semantic color tokens, not raw values:

| Element | Token | Value |
|---------|-------|-------|
| Background | `bg-bg-primary` | #13161F |
| Text Primary | `text-on-bg-primary` | #FAF6F0 |
| Text Secondary | `text-on-bg-secondary` | #E8E4DE |
| Text Muted | `text-on-surface-muted` | #8A8580 |
| Accent | `text-accent` / `bg-accent` | #0036D8 |
| Borders | `border-border-custom` | rgba(250, 246, 240, 0.15) |

---

## Animation Standards

### Entrance Animations
```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(headerRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    gsap.from(itemsRef.current?.children || [], {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      delay: 0.3,
      ease: 'power3.out'
    });
  });

  return () => ctx.revert();
}, []);
```

### Hover States
- Duration: 150-300ms
- Easing: `ease` or `ease-out`
- Transform: subtle scale (1.02) or color shift

---

## Footer Standards

Every page should have a consistent footer section:

```tsx
<div className="flex justify-between items-end mt-16 pt-8 border-t border-border-muted">
  <div className="font-mono text-system text-on-surface-muted">
    {/* Left info */}
  </div>
  <div className="flex items-center gap-4">
    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
    <span className="font-mono text-system text-on-surface-muted">
      {/* Status */}
    </span>
  </div>
  <div className="font-mono text-system text-on-surface-muted">
    {/* Right info */}
  </div>
</div>
```

### Common Footer Patterns
| Page | Left | Status | Right |
|------|------|--------|-------|
| Work | `TOTAL: 06 ENTRIES` | `INDEXED` | `LAST_UPDATE: 2024.02.17` |
| Signal | `TOTAL: {n} ENTRIES` | `RECEIVING` | `SYNCED_WITH_SUBSTACK` |
| System | `STATUS: ONLINE` | `OPERATIONAL` | `REF: SYS.001` |

---

## Content Patterns

### Archive Pages (Work, Signal)
- Grid or list of items
- Each item has: type/category, title, description
- Hover state with accent color
- "Access" or "Read" indicator

### Detail Pages (Signal/[slug])
- Back link to parent archive
- Header with metadata
- Feature image (optional)
- Content body
- Footer with navigation

---

## Adding New Pages

When adding a new page:

1. **Choose the shell**: `PageShell` (client) or `SimplePageShell` (server)
2. **Set currentPage**: One of `'home' | 'work' | 'signal' | 'system'`
3. **Add side text**: Follow the naming conventions
4. **Include corner brackets**: These come with the shell
5. **Add footer**: Use the standard 3-column footer pattern
6. **Update transitions**: If needed, add microcopy to `MicroficheTransition.tsx`

### Example New Page
```tsx
// app/new/page.tsx
import { SimplePageShell } from '@/components/dom/PageShell';

export default function NewPage() {
  return (
    <SimplePageShell
      currentPage="work"  // Or whichever is closest
      leftSideText="NEW_SECTION_V1"
      rightSideText="STATUS_INFO"
    >
      <div className="min-h-screen pt-32 pb-16 px-6 md:px-16 lg:px-24">
        {/* Content */}
        
        {/* Standard footer */}
        <div className="flex justify-between items-end mt-16 pt-8 border-t border-border-muted">
          <div className="font-mono text-system text-on-surface-muted">INFO_LEFT</div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="font-mono text-system text-on-surface-muted">STATUS</span>
          </div>
          <div className="font-mono text-system text-on-surface-muted">INFO_RIGHT</div>
        </div>
      </div>
    </SimplePageShell>
  );
}
```

---

## Checklist for Page Consistency

Before committing a new page, verify:

- [ ] Uses PageShell or SimplePageShell
- [ ] Corner navigation present (K, WORK, SIGNAL, SYSTEM)
- [ ] Current page highlighted in accent color
- [ ] Corner brackets visible
- [ ] LivingEffects present (via shell)
- [ ] Side text appropriate for page
- [ ] Content starts at `pt-32`
- [ ] Proper horizontal padding
- [ ] Footer with status indicator
- [ ] All links work (especially K to home)
- [ ] Mobile responsive (nav hidden appropriately)

---

## Anti-Patterns to Avoid

❌ **Don't** use the old Layout component for new pages  
❌ **Don't** create custom navigation that differs from corner nav  
❌ **Don't** skip the corner brackets  
❌ **Don't** use raw color values instead of tokens  
❌ **Don't** change z-index values without checking the layer stack  
❌ **Don't** skip the footer status section  
❌ **Don't** use different entrance animation timing

---

## Questions?

Refer to existing pages as examples:
- `app/work/page.tsx` - Archive pattern
- `app/signal/page.tsx` - List pattern  
- `app/system/page.tsx` - Content pattern
- `app/signal/[slug]/page.tsx` - Detail pattern
