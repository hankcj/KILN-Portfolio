# Navigation & Transition Audit

## Pages Overview

| Page | Route | Uses PageRouter | Uses PageShell | Has Loading |
|------|-------|-----------------|----------------|-------------|
| Home | `/` | ✅ (SPA) | ❌ | N/A |
| Work | `/work` | ❌ | ✅ SimplePageShell | ❌ |
| Work Detail | `/work/[slug]` | ❌ | ✅ SimplePageShell | ✅ |
| Signal | `/signal` | ❌ | ✅ SimplePageShell | ❌ |
| Signal Detail | `/signal/[slug]` | ❌ | ✅ SimplePageShell | ✅ |
| System | `/system` | ❌ | ✅ SimplePageShell | ❌ |
| Services | `/services` | ❌ | ✅ SimplePageShell | ❌ |
| Intake | `/intake` | ❌ | ✅ SimplePageShell | ❌ |
| Project | `/project` | ❌ | ✅ SimplePageShell | ❌ |
| 404 | `*` | ❌ | ✅ SimplePageShell | ❌ |

## Critical Issues Found

### 1. **INCONSISTENT TRANSITION ARCHITECTURE** 🔴 CRITICAL

**Problem**: Home page uses SPA-style PageRouter (4s transitions), but all other pages use full page loads (2.5s transitions).

**Impact**: Users experience completely different transition styles depending on starting page.

**Example**:
- Home → Work: 4s cinematic transition with zoom/blur
- Work → Services: 2.5s fade + microfiche text
- Services → Work: Same as above
- Work → Home: 2.5s fade (not the reverse of Home→Work)

### 2. **MISSING LOADING STATES** 🟡 HIGH

**Pages without loading.tsx**:
- `/services` - Shows blank white during data fetch (if any)
- `/system` - Shows blank white
- `/intake` - Shows blank white during form load
- `/project` - Shows blank white

### 3. **TRANSITION TIMING MISALIGNMENT** 🔴 CRITICAL

| Source | Delay Before Navigate | Total Transition Time |
|--------|----------------------|----------------------|
| TransitionLink | 400ms | N/A (page loads after) |
| TerminalNav | 2500ms | ~3s |
| PageRouter | 3200ms | ~4s |

**Problem**: Different components trigger navigation at different times, causing:
- Incomplete transitions (user sees partial fade)
- Flash of unstyled content
- Double transitions

### 4. **MISSING 404 TRANSITION VARIANT** 🟡 MEDIUM

MicroficheTransition doesn't have a variant for the 404 page.

### 5. **INBOUND TRANSITION NOT WORKING CORRECTLY** 🔴 CRITICAL

When navigating TO home page FROM other pages:
- Home page doesn't receive incoming transition state properly
- No "RETURNING_TO_ORIGIN" text shown
- Transition just does standard fade

## Navigation Path Matrix

### From Home Page (SPA)
```
Home → Work:       PageRouter 4s transition ✅
Home → Signal:     PageRouter 4s transition ✅
Home → System:     PageRouter 4s transition ✅
Home → Services:   PageRouter 4s transition ✅
```

### To Home Page (Full Page Load)
```
Work → Home:       TransitionLink 400ms → PageShell fade ❌ (Should be reverse of Home→Work)
Signal → Home:     Same issue ❌
System → Home:     Same issue ❌
Services → Home:   Same issue ❌
```

### Between Other Pages (Full Page Load)
```
Work → Services:   TransitionLink 400ms → SimplePageShell ✅
Services → Work:   Same ✅
Work → System:     TransitionLink ✅
System → Work:     TransitionLink ✅
Signal → Services: TransitionLink ✅
Services → Signal: TransitionLink ✅
```

### Detail Pages
```
Work → Work Detail:    Has TransitionLink ✅
Work Detail → Work:    Has BackLink ✅
Signal → Signal Detail: Has TransitionLink ✅
Signal Detail → Signal: Has BackLink ✅
```

## Recommended Solutions

### Solution 1: Standardize All Transitions

**Option A**: Use full page loads everywhere (simpler)
- Remove PageRouter complexity
- All pages use TransitionLink + PageShell
- Consistent 400ms → 2.5s timing

**Option B**: Make PageRouter handle all routes (SPA)
- Convert all pages to client components
- Keep PageRouter as main entry
- More complex but smoother

### Solution 2: Fix Timing Alignment

Standardize transition timing:
```
TransitionLink delay: 400ms
Microfiche display: 2100ms (400 + 2100 = 2500 total)
Incoming transition: 600ms
Total: ~3.1s consistent across all pages
```

### Solution 3: Add Missing Loading States

Create loading.tsx for:
- `/services`
- `/system`
- `/intake`
- `/project`

### Solution 4: Add Missing Variants

Add to MicroficheTransition:
```typescript
notfound: [
  '// SEARCHING...',
  'C  SCAN_ARCHIVE',
  'NO_RECORDS_FOUND',
  '** 404 **',
],
```

## Quick Fixes (Priority Order)

1. **Fix home page inbound transitions** - Ensure all pages use consistent return-to-home
2. **Add missing loading.tsx files** - Prevent blank screens
3. **Standardize transition timing** - Align all components to 400ms + 2.1s
4. **Add 404 variant** - Complete the set
