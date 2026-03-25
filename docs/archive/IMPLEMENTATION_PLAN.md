# KILN Site Implementation Plan

**Objective:** Transform studiokiln.io from a generic portfolio template into a coherent studio presence that reflects the KILN brand: architectural, selective, and intellectually serious.

**Timeline:** Phased approach over 4-6 weeks  
**Priority:** Phase 1 is blocking, Phases 2-3 can parallelize

---

## Phase 1: Foundation & Copy Overhaul (Week 1-2)

### 1.1 Home Page Rewrite
**File:** `src/app/home-page.tsx`

**Current Issues:**
- Generic "personal studio" positioning
- "Systems that think" is vague
- LAST_UPDATE date is stale (2024.02.17)
- Missing workshop metaphor

**Changes Required:**
```
BEFORE:
"Personal studio & publishing space. Not a portfolio. Not a blog. 
A continuous practice of systems, essays, and experiments."

AFTER:
"A studio for heating ideas until they harden into form.
Objects, systems, and selective client work."
```

**Specific Tasks:**
- [ ] Rewrite boot sequence lines to be less generic
- [ ] Update TYPE section to mention all four expressions (portfolio, studio, publishing, store)
- [ ] Update STATUS section with current focus
- [ ] Update LAST_UPDATE to current date
- [ ] Change "PORTFOLIO_V1.0.0" to "STUDIO_V2.0" or similar

**Estimated Effort:** 2-3 hours

---

### 1.2 Services Page Rewrite
**File:** `src/app/services/page.tsx`

**Current Issues:**
- Reads like standard agency ("Design Systems", "Creative Direction")
- "System Audit" / "Embedded" / "Direction" is jargon
- Too much process, not enough point of view
- Selection criteria feels like gatekeeping

**Changes Required:**
- [ ] Rename "SERVICES" to "AVAILABLE WORK" or "COLLABORATION"
- [ ] Rewrite header to frame as selective collaboration
- [ ] Replace service blocks with capability descriptions
- [ ] Simplify engagement models (or remove if too prescriptive)
- [ ] Rewrite selection criteria to be about alignment not filtering

**Key Copy Changes:**
```tsx
// Header change
<h1>AVAILABLE WORK</h1>
<p>KILN takes on a small number of projects each year. 
The work tends toward systems, tools, and environments 
that need to last.</p>

// Replace service blocks with:
- Design systems with conceptual integrity
- Digital environments that reward attention  
- Tools that outlast their initial use case
```

**Estimated Effort:** 3-4 hours

---

### 1.3 System Page Rewrite
**File:** `src/app/system/page.tsx`

**Current Issues:**
- Too focused on technical specs upfront
- Changelog is outdated (last entry 2024.02.17)
- Missing philosophy/why section
- "SYS_DOCS" framing is too technical

**Changes Required:**
- [ ] Add philosophy section BEFORE technical specs
- [ ] Explain design decisions as choices with reasons
- [ ] Update changelog with actual release history
- [ ] Rewrite colophon to explain the architectural approach
- [ ] Add "Why this site works this way" section

**New Section Structure:**
1. Philosophy (why KILN exists, what it pushes back against)
2. Design Principles (architectural approach, museum metaphor)
3. Technical Specifications (existing specs, reframed)
4. Changelog (updated with real history)
5. Acknowledgments (keep, but update)

**Estimated Effort:** 4-5 hours

---

### 1.4 Navigation & Labels Update
**File:** `src/components/dom/TerminalNav.tsx`

**Current Issues:**
- "outputs" label is unexplained
- "project" points to external system (may be confusing)
- Descriptions could be sharper

**Changes Required:**
- [ ] Update nav item descriptions to match brand voice
- [ ] Consider renaming "outputs" to "work" or "archive"
- [ ] Verify "project" external link (projectkiln.com) exists

**Updated Nav Items:**
```tsx
const NAV_ITEMS: NavItem[] = [
  { key: '1', label: 'studio', path: '/', prefix: '[K]', description: 'Origin point' },
  { key: '2', label: 'work', path: '/work', prefix: 'C', description: 'Object archive' },
  { key: '3', label: 'signal', path: '/signal', prefix: 'C', description: 'Published thinking' },
  { key: '4', label: 'available', path: '/services', prefix: 'C', description: 'Selective projects' },
  { key: '5', label: 'tools', path: '/shop', prefix: '>>', description: 'Digital products', external: true },
  { key: '6', label: 'system', path: '/system', prefix: '//', description: 'Documentation' },
];
```

**Estimated Effort:** 1-2 hours

---

## Phase 2: Content & Structure (Week 2-4)

### 2.1 Work Page Real Implementation
**Files:** `src/app/work/page.tsx`, `src/content/works/*`

**Current Issues:**
- All placeholder content ("Output 001" through "Output 006")
- Links go to non-existent pages
- No categorization (client work vs products vs experiments)

**Changes Required:**
- [ ] Create content schema for work objects
- [ ] Build 3-5 actual case studies
- [ ] Add categorization (Client Work, Products, Experiments)
- [ ] Remove or hide placeholder outputs until real content exists

**Content Schema:**
```typescript
interface WorkObject {
  slug: string;
  title: string;
  category: 'client' | 'product' | 'experiment';
  status: 'finished' | 'in-progress' | 'archived';
  year: string;
  description: string; // Plain language, no hype
  role: string;
  outcomes?: string[]; // What actually happened
  links?: { label: string; url: string }[];
  images?: string[];
}
```

**Estimated Effort:** 8-12 hours (depends on content creation)

---

### 2.2 Signal Page Enhancement
**File:** `src/app/signal-page.tsx`

**Current Issues:**
- No distinction between essays and notes
- "SYNCED_WITH_SUBSTACK" is operational noise
- Missing the archive/museum framing

**Changes Required:**
- [ ] Add content type filter (Essays | Notes | All)
- [ ] Rewrite intro to emphasize archive nature
- [ ] Add "Reading list" or "References" feature
- [ ] Improve empty state copy

**New Intro:**
```tsx
<p className="text-body text-on-bg-tertiary max-w-xl mb-8">
  Essays, notes, and research published from the studio.
  Longer pieces are archived here first. The feed moves slowly 
  and stays useful.
</p>
```

**Estimated Effort:** 3-4 hours

---

### 2.3 Store/Shop Page Creation
**New Files:** `src/app/shop/page.tsx`, `src/content/products/*`

**Current Status:** Does not exist

**Requirements:**
- [ ] Create `/shop` route
- [ ] Design product card component
- [ ] Build product detail page
- [ ] Add to navigation
- [ ] Create product content schema

**Product Schema:**
```typescript
interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  status: 'available' | 'coming-soon' | 'archived';
  category: 'template' | 'tool' | 'resource';
  includes: string[];
  previewImages: string[];
  documentationUrl?: string;
}
```

**Page Structure:**
1. Header ("TOOLS" — Digital products from the studio)
2. Product grid (clean, minimal cards)
3. Each product: Name, tagline, price, status
4. Detail view: Full description, what's included, purchase CTA

**Estimated Effort:** 12-16 hours (new page + components)

---

### 2.4 Project Page Update or Removal
**File:** `src/app/project/page.tsx`

**Current Issues:**
- Links to external projectkiln.com (may not exist)
- Timeline shows 2024 dates (now past)
- Early access form submits to nowhere
- Duplicates some of what KILN studio is

**Decision Required:**
- **Option A:** Remove Project page, fold into KILN as products
- **Option B:** Update to reflect actual status (is this a separate thing?)
- **Option C:** Keep as "coming soon" but fix dates and form

**Recommendation:** Option A — Project Kiln should probably be products sold through KILN, not a separate thing. Simpler narrative.

**Estimated Effort:** 2-3 hours (removal) or 6-8 hours (proper implementation)

---

## Phase 3: Functionality & Polish (Week 4-6)

### 3.1 Social Links Integration
**Files:** `src/app/system/page.tsx`, potentially new `/links` page

**Requirements:**
- [ ] Add social links to System page footer
- [ ] Consider dedicated "Links" or "Connect" page
- [ ] Update environment variables for social URLs

**Social Platforms to Include:**
- GitHub (for code/open source)
- Twitter/X (for thinking in public)
- Substack (for newsletter)
- LinkedIn (for professional presence)
- Any others (Bluesky, Are.na, etc.)

**Estimated Effort:** 2-3 hours

---

### 3.2 Intake Form Functional Implementation
**File:** `src/app/intake/page.tsx`

**Current Issues:**
- Form submission is simulated (setTimeout only)
- No actual email notification
- No data persistence

**Options:**
1. **Formspree/Netlify Forms** — Simple, no backend needed
2. **Resend/Loops** — Email API, good for notifications
3. **Airtable/Notion API** — Stores inquiries, easy to manage
4. **Custom API route** — Most control, most work

**Recommendation:** Start with Formspree or Resend for v1.

**Implementation:**
- [ ] Choose service
- [ ] Update form submission handler
- [ ] Add success/error states
- [ ] Test end-to-end

**Estimated Effort:** 3-4 hours

---

### 3.3 Payment Integration (Store)
**New Files:** API routes, checkout components

**Requirements:**
- [ ] Set up Stripe account
- [ ] Install Stripe SDK
- [ ] Create checkout session API route
- [ ] Build checkout flow
- [ ] Add success/cancel pages

**Stripe Setup:**
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js stripe
```

**Pages Needed:**
- `/shop/[slug]/checkout` — Checkout form
- `/checkout/success` — Post-purchase
- `/checkout/cancel` — Abandoned cart

**Estimated Effort:** 8-12 hours

---

### 3.4 Copy Audit & Polish
**All files**

**Audit Checklist per Page:**
- [ ] No prohibited words (revolutionary, unlock, seamless, etc.)
- [ ] No exclamation points
- [ ] Active voice preferred
- [ ] Plain language test (would a smart non-expert understand?)
- [ ] Archive test (will this make sense in 5 years?)
- [ ] Tone check (spoken, precise, calm)

**Estimated Effort:** 4-6 hours

---

### 3.5 Metadata & SEO Update
**Files:** `src/app/layout.tsx`, all `page.tsx` files

**Current Issues:**
- Generic descriptions
- No Open Graph images
- Missing structured data

**Changes Required:**
- [ ] Write specific meta descriptions for each page
- [ ] Create OG image template/design
- [ ] Add JSON-LD structured data
- [ ] Update sitemap priorities

**Estimated Effort:** 3-4 hours

---

## Technical Prerequisites

### Environment Variables Needed
```bash
# Content
GHOST_URL=
GHOST_CONTENT_API_KEY=

# Social (for System page links)
NEXT_PUBLIC_GITHUB_URL=
NEXT_PUBLIC_TWITTER_URL=
NEXT_PUBLIC_SUBSTACK_URL=
NEXT_PUBLIC_LINKEDIN_URL=

# Email/Forms
FORMSPREE_ENDPOINT=           # or
RESEND_API_KEY=

# Payments (Phase 3)
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Site
NEXT_PUBLIC_SITE_URL=https://kiln.studio
```

### Dependencies to Add
```bash
# Phase 1: No new dependencies

# Phase 2: Store (if using Shopify or similar)
# Or just Stripe for digital products

# Phase 3: Payments
npm install @stripe/stripe-js @stripe/react-stripe-js stripe

# Optional: Forms
npm install @formspree/react
# or
npm install resend
```

---

## Content Creation Requirements

### Work Objects Needed (Minimum 3)
1. **Flagship client project** — Most impressive, shows range
2. **Product/tool** — Something built and sold/shared
3. **Experiment/personal** — Shows thinking process

**Per Object:**
- Title (plain, descriptive)
- 2-3 paragraph description
- Role/responsibilities
- Key outcomes (what happened, not just what was done)
- 2-4 images/screenshots
- Links (if live/deployed)

### Essays/Notes for Signal (Minimum 2)
1. **Manifesto piece** — What KILN stands for, the thesis
2. **Process piece** — How something was built, lessons learned

### Products for Store (Minimum 1)
1. **Digital product** — Template, toolkit, or resource
- Clear description of what it is
- What's included (deliverables)
- Price
- Documentation

---

## Success Metrics

### Phase 1 Complete When:
- [ ] Home page copy reflects workshop metaphor
- [ ] Services page reads like selective collaboration, not agency
- [ ] System page explains philosophy before tech specs
- [ ] No placeholder "Output 001" copy remains

### Phase 2 Complete When:
- [ ] Work page has 3+ real case studies
- [ ] Signal has 2+ published essays
- [ ] Shop page exists with 1+ product
- [ ] Navigation reflects all four expressions

### Phase 3 Complete When:
- [ ] Intake form actually sends notifications
- [ ] Store accepts payments
- [ ] All copy audited against tone guidelines
- [ ] Social links present on System page

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Content creation takes longer than expected | Start with minimum viable (1 work object, 1 essay, 1 product) |
| Project Kiln conflicts with KILN positioning | Make decisive choice early (fold in or separate clearly) |
| Store adds too much complexity | Start with simple digital products, manual delivery if needed |
| Copy rewrites don't feel right | Get external read, iterate before shipping |
| Scope creep | Stick to phases, don't start Phase 2 until Phase 1 done |

---

## Immediate Next Steps (This Week)

1. **Decision:** What happens to Project Kiln? (Fold into KILN or keep separate)
2. **Decision:** Which form/email service for intake? (Formspree is fastest)
3. **Task:** Write new home page copy (use guidelines in BRANDING.md)
4. **Task:** Rewrite Services page (less agency, more studio)
5. **Task:** Update System page changelog with actual history

---

*Plan created: 2026.02.20*  
*Version: 1.0*  
*Estimated total effort: 60-80 hours*
