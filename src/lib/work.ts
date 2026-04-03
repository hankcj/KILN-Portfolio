export interface WorkEntry {
  slug: string;
  title: string;
  type: "Website" | "Campaign" | "System" | "Product";
  status: "VISIBLE" | "IN VIEW";
  date: string;
  excerpt: string;
  coverImage: string;
  challenge: string;
  outcome: string;
  details: string[];
}

export const works: WorkEntry[] = [
  {
    slug: "atlas-platform",
    title: "Atlas Platform",
    type: "Website",
    status: "VISIBLE",
    date: "2024-11-03",
    excerpt: "A site and content architecture for a B2B platform with clearer decision paths.",
    coverImage: "/assets/Ocean.png",
    challenge:
      "The team had strong adoption but fragmented narrative structure across homepage, campaign pages, and onboarding.",
    outcome:
      "Rebuilt page architecture and messaging hierarchy into a reusable system with stable editorial and campaign surfaces.",
    details: [
      "Positioning and information architecture across primary routes",
      "Reusable component kit for context, proof, and next-step actions",
      "Motion and reading rhythm tuned for clarity under real constraints",
    ],
  },
  {
    slug: "veridian-cycle",
    title: "Veridian Cycle",
    type: "Campaign",
    status: "VISIBLE",
    date: "2024-08-21",
    excerpt: "Campaign narrative and landing architecture for a new offer cycle.",
    coverImage: "/assets/Nebula.png",
    challenge:
      "Creative direction and landing context were disconnected, which made the full story hard to read.",
    outcome:
      "Designed one continuous narrative arc from first touch to decision point, improving continuity across the experience.",
    details: [
      "Creative message library for acquisition and follow-up variants",
      "Landing page rewrite with clearer sequencing and context",
      "Measurement plan focused on reading quality and decision confidence",
    ],
  },
  {
    slug: "nexus-reporting",
    title: "Nexus Reporting",
    type: "System",
    status: "VISIBLE",
    date: "2024-05-09",
    excerpt: "A reporting system for campaign insights with clear weekly operator summaries.",
    coverImage: "/assets/Neptune.png",
    challenge:
      "The team had data, but decision-making lagged because reporting was fragmented and noisy.",
    outcome:
      "Built a concise reporting structure with consistent KPIs and decision notes for faster weekly iteration.",
    details: [
      "Unified dashboard blocks for reach, response, and retention",
      "Weekly summary template with action-oriented callouts",
      "Documentation for handoff and sustained operation",
    ],
  },
  {
    slug: "project-kiln-prealpha",
    title: "Project Kiln (Pre-alpha)",
    type: "Product",
    status: "IN VIEW",
    date: "2026-03-01",
    excerpt: "An internal product exploring knowledge mapping and synthesis workflows.",
    coverImage: "/assets/Neptune.png",
    challenge:
      "Creators collect fragmented notes across many tools and struggle to synthesize ideas into output.",
    outcome:
      "Early product framing, interaction prototypes, and architecture decisions are in active validation.",
    details: [
      "Core interaction model and graph exploration flow",
      "Content ingestion and categorization experiments",
      "Roadmap for documentation, onboarding, and stable release criteria",
    ],
  },
];

export function getWorkBySlug(slug: string) {
  return works.find((entry) => entry.slug === slug) ?? null;
}
