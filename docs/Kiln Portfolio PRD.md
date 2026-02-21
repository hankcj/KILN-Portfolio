KILN Portfolio Website — Product Requirements Document (PRD)
This document defines the product vision, experience architecture, technical stack, design system alignment, and functional requirements for the KILN portfolio website. It is intended to be the single source of truth for building and evolving the site over time.
This PRD assumes an existing brand and visual identity document. Where branding details are referenced, this document defers to that source of truth and focuses on application, not reinvention.

1. Product Overview
1.1 Purpose
KILN is a personal studio portfolio and publishing space designed to communicate seriousness, craft, and continuity of thought. It is not optimized for mass discovery or rapid conversion. Instead, it functions as a destination for people who arrive with intent.
The site must:
	•	Signal taste and authorship immediately
	•	Present work as part of an ongoing practice, not isolated projects
	•	Support long-form writing, systems thinking, and selective services
	•	Age gracefully over years, not trend cycles
1.2 Primary User Types
	•	Observer: arrives via external channels, experiences the front-facing work
	•	Reader: engages with essays, research, and long-form writing
	•	Peer / Client: evaluates quality, process, and fit before reaching out
The site is not designed for casual browsing. It rewards attention.

2. Experience Architecture (Museum Model)
The website is structured as a dual-layer system. This is a conceptual distinction, not a literal frontend/backend split.
2.1 Experience Layer (Front-of-House)
Purpose:
	•	Establish atmosphere, authority, and intent
	•	Provide an experiential entry point
Characteristics:
	•	Cinematic pacing
	•	Motion-forward
	•	Minimal UI
	•	Strong spatial and typographic hierarchy
Rules:
	•	WebGL and advanced animation are allowed
	•	Text remains readable and restrained
	•	No functional dependencies on animation
2.2 Archive & Utility Layer (Back-of-House)
Purpose:
	•	Reading, navigation, inquiry, conversion
Characteristics:
	•	Calm, reliable, editorial
	•	Reduced motion
	•	Clear structure and hierarchy
Rules:
	•	Must function instantly
	•	Must remain usable with all motion disabled
	•	Visual continuity with the Experience Layer without behavioral coupling

3. Design Philosophy
3.1 Core Principles
	•	Experience leads, utility follows
	•	Discipline over spectacle
	•	Systems with memory
	•	Human content inside structured containers
The site should feel inhabited, not performative. Motion and technology exist to support perception, not to impress.
3.2 Motion Philosophy
	•	Motion has weight and damping
	•	Transitions are continuous and deliberate
	•	No playful or elastic easing
	•	Hard cuts reserved only for system-level state changes

4. Technical Stack
4.1 Core Framework
	•	Next.js (App Router)
	•	TypeScript (strict mode)
Provides routing, hybrid rendering, and long-term maintainability.
4.2 State & Coordination
	•	Zustand
Acts as a shared state layer between DOM components and the WebGL canvas, enabling synchronized interaction without tight coupling.
4.3 Experience & Motion Layer
	•	React Three Fiber (R3F)
	•	@react-three/drei
	•	GSAP
	•	GSAP ScrollTrigger
	•	Lenis (default, auto-disabled for reduced motion)
	•	Custom GLSL shaders (limited, repeatable set)
WebGL is used for atmosphere and spatial continuity, never for essential content.
4.4 Content System
	•	MDX as the source of truth
	•	Velite or Contentlayer for type-safe content collections
Content types include essays, works, systems, and notes. Content is queryable and indexable.
4.5 Utility Services
	•	Email: Listmonk (self-hosted); RSS-to-email via listmonk-rss
	•	Payments: Stripe (direct checkout or hosted checkout)
	•	Forms: Custom forms using Next.js server actions or API routes

5. Information Architecture & Routes
Core Routes
	•	/ — Entrance / Experience
	•	/work — Portfolio archive (outputs)
	•	/work/[slug] — Individual output
	•	/signal — Writing / journal index
	•	/signal/[slug] — Essay / article
	•	/system — About / colophon / technical context
Navigation Principles
	•	Navigation is minimal and persistent
	•	No hidden gestures required to move through the site
	•	All routes are accessible via keyboard and standard navigation

6. Portfolio Model
Work is presented as outputs, not projects.
Each output includes:
	•	Unique ID
	•	Title
	•	Type (Essay, System, Tool, Visual, Experiment)
	•	Status (Published, Ongoing, Archived)
	•	Date or date range
	•	Short descriptor
The archive must scale cleanly from a handful of items to dozens without visual noise.

7. Visual System Application
7.1 Color & Typography
	•	Colors and typography are defined in the existing branding document
	•	Default state favors dark backgrounds with light text
	•	Accent colors are state-driven and used sparingly
7.2 Typography Roles
	•	Display typography conveys voice and authorship
	•	Body typography prioritizes readability and endurance
	•	System glyphs and symbols function as metadata, not decoration
7.3 Icons & Glyphs
	•	All icons are custom-built
	•	No third-party icon libraries
	•	Glyphs annotate structure and context

8. Interaction & Motion Patterns
Signature Interactions
	•	Entrance transition (curtain / reveal)
	•	Gallery hover response (subtle displacement or focus)
	•	Route transitions on experience pages
All motion patterns are reused consistently.
Film Grain & Texture
	•	Subtle, continuous grain
	•	Brief intensification during transitions
	•	No constant glitch or interference

9. Performance & Accessibility
Performance Guardrails
	•	Adaptive WebGL quality based on FPS
	•	Lazy loading of 3D assets
	•	No blocking scripts on content routes
Accessibility
	•	DOM-first content and navigation
	•	Full keyboard navigation
	•	Clear focus states
	•	prefers-reduced-motion fully respected
	•	Static fallbacks for animated or 3D content

10. Non-Goals
The site is explicitly not designed to:
	•	Maximize SEO at the expense of experience
	•	Serve as a generic agency portfolio
	•	Function as a CMS-heavy marketing site
	•	Chase design trends or novelty interactions

11. Success Criteria
The site is successful if:
	•	Visitors understand the nature of the work within seconds
	•	Reading feels calm and intentional
	•	Motion enhances perception without demanding attention
	•	The system can grow without redesign
	•	The site still feels correct years after launch

12. Future Considerations
	•	Optional gated content or memberships
	•	Expanded archive filtering and metadata
	•	Tools or products integrated into the system
	•	Multi-language or long-term archival modes
These are intentionally deferred until the core system is stable.

KILN is not a campaign. It is an environment.
This PRD defines the constraints that allow it to remain one.
