# Navigation Redesign: Comprehensive Options

## Current State
- 4 corner positions trying to hold 6 pages
- System, Services, Project squeezed in awkwardly
- Not scalable beyond 6 items

## Option 1: Horizontal Top Bar (Recommended)

```
┌─────────────────────────────────────────────────────────────┐
│  [K]    WORK    SIGNAL    SERVICES    PROJECT    [≡]        │
└─────────────────────────────────────────────────────────────┘
```

**Structure:**
- Left: K logo (home)
- Center: Primary pages (4-5 items)
- Right: Hamburger menu for System, contact, legal

**Pros:**
- Industry standard, users expect it
- Scales to 8-10 items easily
- Clean corners for decorative elements
- Mobile: collapses to hamburger naturally

**Cons:**
- Less "system terminal" feel
- May feel too conventional

**Aesthetic Treatment:**
- Monospace, all caps
- Sparse spacing (tracking-wide)
- Active: Accent underline or highlight
- Hover: Subtle glitch or scan effect
- Background: Transparent or slight blur

---

## Option 2: Vertical Left Sidebar

```
┌────┬────────────────────────────────────────────────────────┐
│    │                                                        │
│ K  │                                                        │
│    │                      CONTENT                           │
│ W  │                                                        │
│ S  │                                                        │
│ S  │                                                        │
│ P  │                                                        │
│    │                                                        │
│ // │                                                        │
└────┴────────────────────────────────────────────────────────┘
```

**Structure:**
- Full-height left sidebar
- K at top, pages below, System at bottom
- Text rotated 90deg or abbreviated icons

**Pros:**
- Very "system dashboard" aesthetic
- Scales infinitely
- Unique, memorable
- Keeps top clean

**Cons:**
- Takes horizontal space
- Mobile needs different approach
- May feel cramped

**Aesthetic Treatment:**
- Vertical monospace text
- Alternating: full word vs abbreviation
- Active: Accent bar on left
- Hover: Text reveals fully

---

## Option 3: Command Palette / Keyboard-Driven

```
Press [⌘K] or type to navigate...

> work      C OUTPUTS
> signal    C SIGNAL  
> services  C SERVICES
> project   >> PROJECT
> system    // SYSTEM
```

**Structure:**
- Hidden by default
- Triggered by keyboard shortcut or click
- Type-to-filter interface
- Visual indicator: "⌘K" badge in corner

**Pros:**
- Ultimate minimalism
- Power-user friendly
- Scales infinitely
- Very "system" feeling

**Cons:**
- Not discoverable for new users
- Mobile needs touch alternative
- Requires tutorial/hint

---

## Option 4: Radial / Circular Menu

```
         [WORK]
           │
  [SIGNAL]─┼─[SERVICES]
           │
      [PROJECT]
           │
       [SYSTEM]
```

**Structure:**
- K in center
- Pages radiate outward
- Hover/click to expand

**Pros:**
- Unique visual
- Circular aesthetic fits "KILN" name
- Can show relationships

**Cons:**
- Hard to implement accessibly
- Text readability issues
- Mobile challenge

---

## Option 5: Dock / Bottom Bar

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                         CONTENT                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  K    WORK    SIGNAL    SERVICES    PROJECT    SYSTEM       │
└─────────────────────────────────────────────────────────────┘
```

**Structure:**
- Fixed bottom bar
- All pages visible
- Mac OS Dock-style

**Pros:**
- Unexpected for web (memorable)
- Thumbs-friendly on mobile
- Plenty of space

**Cons:**
- Conflicts with scroll indicator
- May feel like mobile app
- Footer content issues

---

## Recommendation: Hybrid Approach

**Primary Navigation (Top Horizontal)**
```
[K]  OUTPUTS  WRITING  SERVICES  PROJECT  [?]
```

- [K] = Home
- OUTPUTS = Work (clearer than "Work")
- WRITING = Signal (clearer than "Signal")
- SERVICES = New page
- PROJECT = Project Kiln
- [?] = Menu containing System, RSS, Contact

**Why this works:**
1. **Clarity**: "Outputs" and "Writing" more descriptive than "Work"/"Signal"
2. **Scalable**: 5 items + menu handles 8-10 total
3. **Familiar**: Users know top nav
4. **Clean**: Corners free for decorative brackets
5. **System feel**: Monospace, sparse, utilitarian

**Mobile:** Hamburger menu or horizontal scroll with fade

---

## Implementation Notes

### New Page Names

| Old | New | Rationale |
|-----|-----|-----------|
| Work | OUTPUTS | What it actually is |
| Signal | WRITING | Clearer intent |
| Services | SERVICES | Keep |
| Project | PROJECT or >> KILN | Indicates external |
| System | [?] or INFO | Hidden in menu |

### Visual Language

```
[K]    C OUTPUTS    C WRITING    C SERVICES    >> PROJECT    [?]
```

- Prefixes indicate type:
  - `C` = Content (internal pages)
  - `>>` = External link
  - `[K]`, `[?]` = Icon/symbol

- No prefix on mobile (cleaner)

### Active States

- **Underline**: Accent color, 2px, animated width
- **Or**: Accent text color
- **Or**: Subtle background highlight

### Hover Effects

- **Desktop**: Glitch text effect (maintain brand)
- **Or**: Letter spacing expands slightly
- **Or**: Scan line passes through text

---

## Which Option Do You Prefer?

1. **Top Horizontal** (safe, scalable, clear)
2. **Left Sidebar** (distinctive, system feel)
3. **Command Palette** (minimalist, power user)
4. **Something else?**
