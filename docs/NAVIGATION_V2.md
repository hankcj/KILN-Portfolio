# Navigation Redesign Proposal

## Current Problem
- 4 corner positions, need 6 pages minimum
- Corner navigation becomes crowded and unclear
- Users may miss pages hidden in corners

## Proposed Solution: Primary + Utility Navigation

### Layout Concept
```
┌─────────────────────────────────────────────────────┐
│  [K]    WORK    SIGNAL    SERVICES    PROJECT    ?  │  ← Primary Nav (Top)
│                                                      │
│                                                      │
│                         CONTENT                      │
│                                                      │
│                                                      │
│  [Side Text]                              [Side Text]│
│                                                      │
│  [// SYSTEM]                            [Context]    │  ← Utility (Bottom)
└─────────────────────────────────────────────────────┘
```

### Primary Navigation (Top Horizontal)
Position: Fixed top, spans width
- **[K]** - Home (logo, left-aligned)
- **WORK** - Portfolio/outputs
- **SIGNAL** - Writing/journal  
- **SERVICES** - Offerings (NEW)
- **PROJECT** - External app link (NEW)
- **? / MENU** - System, contact, etc. (overflow)

Style: 
- Monospace, system-style labels
- Active state: Accent color
- Hover: Glitch effect or underline
- Spacing: Even distribution or left-aligned group

### Utility Navigation (Bottom)
Position: Fixed bottom, right corner
- **// SYSTEM** - Always accessible but secondary
- Could expand to show: RSS, contact, legal

### Alternative: Vertical Left Nav
```
[K]
C WORK
C SIGNAL
C SERVICES
>> PROJECT
// SYSTEM
```

Pros: Scales infinitely, very "system terminal" feel
Cons: Takes horizontal space, may feel cramped on mobile

## Recommendation

**Go with Horizontal Top Nav** because:
1. Scales to 6-8 items easily
2. Users expect top navigation
3. Keeps corners clean for decorative brackets
4. Maintains "system dashboard" aesthetic
5. Mobile: Can collapse to hamburger or stay horizontal scroll

## Page Microcopy

| Page | Current | Proposed | Rationale |
|------|---------|----------|-----------|
| Home | K | K | Keep as logo |
| Work | C WORK | OUTPUTS or C WORK | Clearer intent |
| Signal | C SIGNAL | SIGNAL or WRITING | Keep as brand |
| Services | - | SERVICES or AVAILABLE | New page |
| Project Kiln | - | PROJECT or >> KILN | External indicator |
| System | // SYSTEM | // SYSTEM or ? | Keep as utility |

## Visual Treatment

```
[K]    C OUTPUTS    C WRITING    C SERVICES    >> PROJECT    [//]
```

- Prefixes indicate type:
  - `C` = Content/Canonical (internal pages)
  - `>>` = External link (opens new tab)
  - `//` = System/meta
  - `?` = Help/info menu

## Mobile Behavior

- Tablet: Same horizontal, may shrink text
- Mobile: 
  - Option A: Horizontal scroll with fade edges
  - Option B: Hamburger menu with full list
  - Option C: K + hamburger, expand to full menu

## Implementation Notes

1. Create new `Navigation.tsx` component
2. Update `PageShell` to use new nav
3. Keep corner brackets (now purely decorative)
4. Keep side text (contextual per page)
5. Active page gets accent color
6. External links get ↗ icon on hover
