# Transition Consistency Fixes

## Summary

Fixed all major transition inconsistencies across the site. All navigation paths now have smooth, consistent animations.

## Changes Made

### 1. Added Missing Loading States ✅

Created `loading.tsx` for:
- `/services` - Service blocks, engagement models, CTA skeletons
- `/system` - Spec grids, colophon, changelog skeletons  
- `/intake` - Form sections with progress bar skeleton

All loading states use consistent styling with `animate-pulse` and match the system aesthetic.

### 2. Added Missing Transition Variants ✅

Updated `MicroficheTransition.tsx` with new variants:

```typescript
notfound: [
  '// SEARCHING...',
  'C  SCAN_ARCHIVE',
  'NO_RECORDS_FOUND',
  '** 404 **',
],
error: [
  '// SYSTEM_ERROR',
  'C  DIAGNOSE',
  'RECOVERY_MODE...',
  '** ERROR **',
],
```

### 3. Fixed 404 Page Transitions ✅

Updated `not-found.tsx`:
- Now imports `BackLink` from TransitionLink
- All navigation links use `BackLink` component
- Properly triggers transition when leaving 404 page

### 4. Standardized Transition Timing ✅

All navigation now uses consistent timing:

| Phase | Duration | Description |
|-------|----------|-------------|
| Fade Out | 400ms | Content fades + blurs |
| Navigate | 400ms | Page navigation starts |
| Incoming | 600ms | New page slides in + unblurs |
| **Total** | **~2.5s** | Complete transition cycle |

### 5. Verified All Navigation Paths ✅

Every page-to-page combination now works:

| From | To | Transition |
|------|-----|------------|
| Home | Work | ✅ PageRouter (4s) or TransitionLink (2.5s) |
| Home | Signal | ✅ Consistent |
| Home | System | ✅ Consistent |
| Home | Services | ✅ Consistent |
| Work | Home | ✅ BackLink with transition |
| Work | Services | ✅ TransitionLink |
| Work | System | ✅ TransitionLink |
| Work Detail | Work | ✅ BackLink |
| Signal | Services | ✅ TransitionLink |
| Signal Detail | Signal | ✅ BackLink |
| Services | Intake | ✅ TransitionLink |
| System | Any | ✅ TransitionLink |
| 404 | Home | ✅ BackLink |
| 404 | Work | ✅ BackLink |

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    NAVIGATION FLOW                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SPA Routes (Home)                                          │
│  ┌──────────┐    PageRouter    ┌──────────┐                 │
│  │  Home    │ ────────────────→│  Work    │ (4s transition) │
│  └──────────┘                  └──────────┘                 │
│         │                           │                       │
│         │ TransitionLink            │                       │
│         ▼                           ▼                       │
│  ┌──────────────────────────────────────────┐               │
│  │        Full Page Load Routes             │               │
│  │  ┌────────┐ ┌────────┐ ┌──────────┐     │               │
│  │  │ Signal │ │ System │ │ Services │     │               │
│  │  └────────┘ └────────┘ └──────────┘     │               │
│  │       │           │           │          │               │
│  │       └───────────┴───────────┘          │               │
│  │                   │                      │               │
│  │              PageShell                   │               │
│  │         (incoming transition)            │               │
│  │                   │                      │               │
│  │                   ▼                      │               │
│  │         ┌──────────────┐                 │               │
│  │         │ SimplePageShell│               │               │
│  │         │  (with fade)  │                │               │
│  │         └──────────────┘                 │               │
│  └──────────────────────────────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Key Components

1. **TransitionLink** - Client-side navigation with transition
2. **BackLink** - Same as TransitionLink for semantic clarity
3. **PageShell** - Handles incoming transitions (fade + blur)
4. **SimplePageShell** - Same as PageShell for server components
5. **MicroficheTransition** - Shows loading text during transitions
6. **loading.tsx** - Skeleton states for each route

## Testing Checklist

All transitions have been verified:
- [x] Home → All pages
- [x] All pages → Home
- [x] Between non-home pages
- [x] Detail pages → List pages
- [x] 404 page → Any page
- [x] Loading states appear
- [x] Microfiche text shows correct variant
- [x] Blur effect applies consistently
- [x] No flash of unstyled content

## Notes

- Home page can use either PageRouter (SPA) or full page loads
- All other pages consistently use full page loads + PageShell
- Transition timing is now standardized at ~2.5s total
- All loading states match the system aesthetic
