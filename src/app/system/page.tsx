import Link from "next/link";
import { motionTokens } from "@/lib/motion";
import RouteShell from "@/components/dom/RouteShell";
import ChapterHero from "@/components/dom/ChapterHero";
import SectionDivider from "@/components/dom/SectionDivider";
import RevealOnView from "@/components/dom/motion/RevealOnView";

const philosophy = [
  "Most interfaces are optimized for constant activity. This system is optimized for return visits, focused intent, and long-term reference value.",
  "The baseline assumption is simple: people arrive with purpose. The interface should hold context in place and reduce noise, not chase attention.",
  "The dark palette and brutalist structure are functional choices. Visual restraint keeps content forward, while consistency across routes keeps navigation legible.",
  "Motion is treated as pacing, not decoration. Transitions are deliberate so ideas have time to register before the next surface appears.",
];

const principles = [
  {
    id: "01",
    title: "Archive Over Timeline",
    body: "Work is organized for retrieval and reuse, not chronological consumption. Entries are structured so they remain useful months later.",
  },
  {
    id: "02",
    title: "Keep Useful Friction",
    body: "Some interactions are intentionally paced. Strategic friction improves attention and depth when the material is meant to be revisited.",
  },
  {
    id: "03",
    title: "Systems Over Pages",
    body: "Navigation, typography, spacing, and motion follow shared rules. Internal consistency makes the site feel like one object, not disconnected templates.",
  },
  {
    id: "04",
    title: "Canonical Home",
    body: "studiokiln.io is the source archive. External platforms distribute, but the long-term record resolves here.",
  },
];

const implementationGroups: Array<{
  title: string;
  items: Array<[string, string]>;
}> = [
  {
    title: "Foundation",
    items: [
      ["Framework", "Next.js (App Router)"],
      ["Language", "TypeScript (Strict)"],
      ["Styling", "Tailwind CSS"],
      ["Content", "Ghost CMS + MDX"],
      ["Build", "Static generation"],
    ],
  },
  {
    title: "Experience",
    items: [
      ["3D Engine", "React Three Fiber"],
      ["Motion", "GSAP + ScrollTrigger"],
      ["State", "Zustand"],
      ["Scroll", "Lenis"],
      ["Type", "Averia Serif Libre + Inter"],
    ],
  },
  {
    title: "Infrastructure",
    items: [
      ["Frontend", "Vercel (Edge)"],
      ["CMS", "Ghost (AWS EC2)"],
      ["Email", "AWS SES + Mautic"],
      ["Payments", "Stripe"],
      ["Domain", "studiokiln.io"],
    ],
  },
  {
    title: "Services",
    items: [
      ["SSL", "Let's Encrypt"],
      ["CDN", "Cloudflare"],
      ["Storage", "AWS S3"],
      ["Intake", "Bloom embed"],
      ["Analytics", "None (intentional)"],
    ],
  },
];

const changelog = [
  {
    version: "V2.1.0",
    date: "2026.02.20",
    notes: [
      "Refined brand language around systems and long-term utility",
      "Reordered page structure to explain philosophy before stack details",
      "Prepared infrastructure paths for email and product operations",
      "Expanded external connection points from the system page",
    ],
  },
  {
    version: "V2.0.0",
    date: "2024.02.17",
    notes: [
      "Migrated publishing workflow to Ghost CMS",
      "Introduced /signal as the writing archive surface",
      "Unified route-level shell components across long-form pages",
      "Improved static generation strategy for predictable output",
    ],
  },
  {
    version: "V1.1.0",
    date: "2024.02.01",
    notes: [
      "Added transition grain and microfiche-inspired visual layer",
      "Introduced route clock and system-state ornamentation",
      "Adjusted motion timing for heavier, damped movement",
    ],
  },
  {
    version: "V1.0.0",
    date: "2024.01.15",
    notes: [
      "Initial release with Home, Work, and Signal routes",
      "Shipped first WebGL entrance sequence",
      "Established dark system palette and core typography",
    ],
  },
];

const connectLinks = [
  { label: "RSS Feed", note: "Readers and syndication", href: "/rss.xml" },
  { label: "Project Intake", note: "Structured project inquiries", href: "/intake" },
  {
    label: "Signal Email",
    note: "Subscribe to transmissions",
    href: "https://mautic.studiokiln.io/form/subscribe",
  },
  { label: "Substack", note: "Discovery and reading", href: "https://hankcj.substack.com/" },
  { label: "GitHub", note: "Code and open source", href: "https://github.com/hankcj" },
  { label: "Instagram (Studio)", note: "Studio process and artifacts", href: "https://instagram.com/hankcj" },
  { label: "Instagram (Live)", note: "Clips and live moments", href: "https://instagram.com/sabl_live" },
  { label: "X (Live)", note: "Live updates and commentary", href: "https://x.com/sabl_live" },
  { label: "Twitch", note: "Streams, sessions, and VODs", href: "https://twitch.tv/sabllive" },
  { label: "Email", note: "Direct inquiries", href: "mailto:hello@kiln.studio" },
];

function isExternalHref(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export default function SystemPage() {
  return (
    <RouteShell theme="system" showProgress>
      <ChapterHero
        id="system-header"
        label="System"
        title="System Notes"
        subtitle="This route documents how the studio builds and maintains its digital surfaces. The priority is durable output, not short-term novelty."
        marquee="Infrastructure for long-term work"
        accent="rgba(0, 54, 216, 0.06)"
      >
        <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase font-mono">TZ: EST // STATUS: OPERATIONAL</p>
      </ChapterHero>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pb-24">
        <SectionDivider label="Manual" className="mb-2" />

        <RevealOnView
          id="system-philosophy"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          blur
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-[#0036D8]/40" />
            <h2 className="text-2xl text-white font-light" style={{ fontFamily: "var(--font-averia), Georgia, serif" }}>
              Philosophy
            </h2>
          </div>
          <div className="space-y-4">
            {philosophy.map((paragraph, index) => (
              <RevealOnView key={paragraph} delayMs={index * motionTokens.stagger.fast} yOffset={8}>
                <p className="text-white/55 text-sm leading-relaxed">{paragraph}</p>
              </RevealOnView>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView
          id="system-principles"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={90}
          blur
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#0036D8]/40" />
            <h2 className="text-2xl text-white font-light" style={{ fontFamily: "var(--font-averia), Georgia, serif" }}>
              Principles
            </h2>
          </div>
          <div className="space-y-5">
            {principles.map((principle, index) => (
              <RevealOnView key={principle.id} delayMs={index * motionTokens.stagger.fast} yOffset={8}>
                <article className="border-b border-white/5 pb-5 last:border-0 last:pb-0">
                  <p className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase font-mono mb-2">{principle.id}</p>
                  <h3 className="text-lg text-white/90 font-light mb-2" style={{ fontFamily: "var(--font-averia), Georgia, serif" }}>
                    {principle.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">{principle.body}</p>
                </article>
              </RevealOnView>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView
          id="system-implementation"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={180}
          blur
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#0036D8]/40" />
            <h2 className="text-2xl text-white font-light" style={{ fontFamily: "var(--font-averia), Georgia, serif" }}>
              Implementation
            </h2>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            These specifications exist to document operating decisions. The stack is selected for maintainability, clear handoffs, and long-term publishing reliability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {implementationGroups.map((group, groupIndex) => (
              <RevealOnView
                key={group.title}
                delayMs={groupIndex * motionTokens.stagger.base}
                className="border border-white/8 bg-white/[0.01] p-4 sm:p-5"
                yOffset={10}
              >
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3">{group.title}</p>
                <div className="space-y-2">
                  {group.items.map(([label, value]) => (
                    <div key={label} className="flex flex-col gap-0.5 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                      <span className="text-[10px] tracking-[0.15em] text-white/35 uppercase font-mono">{label}</span>
                      <span className="text-sm text-white/60">{value}</span>
                    </div>
                  ))}
                </div>
              </RevealOnView>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView
          id="system-typography"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={270}
          blur
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-[#0036D8]/40" />
            <h2 className="text-2xl text-white font-light" style={{ fontFamily: "var(--font-averia), Georgia, serif" }}>
              Typography
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-white/55 text-sm leading-relaxed">
              Averia Serif Libre carries long-form weight with slight irregularity. It reads with institutional structure while still feeling human.
            </p>
            <p className="text-white/55 text-sm leading-relaxed">
              Inter handles system text, utility labels, and interface metadata. The pairing creates hierarchy through texture rather than excess styling.
            </p>
          </div>
        </RevealOnView>

        <RevealOnView
          id="system-changelog"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={360}
          blur
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#0036D8]/40" />
            <h2 className="text-2xl text-white font-light" style={{ fontFamily: "var(--font-averia), Georgia, serif" }}>
              Changelog
            </h2>
          </div>
          <div className="space-y-6">
            {changelog.map((release, releaseIndex) => (
              <RevealOnView key={release.version} delayMs={releaseIndex * motionTokens.stagger.fast} yOffset={8}>
                <article className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <p className="text-[11px] tracking-[0.2em] text-white/75 uppercase font-mono">{release.version}</p>
                    <p className="text-[10px] tracking-[0.15em] text-white/35 uppercase">{release.date}</p>
                  </div>
                  <ul className="space-y-2">
                    {release.notes.map((note) => (
                      <li key={note} className="flex items-start gap-3">
                        <span className="mt-2 flex-shrink-0 w-1.5 h-[1px] bg-[#0036D8]/40" />
                        <span className="text-white/55 text-sm leading-relaxed">{note}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealOnView>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView
          id="system-connect"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={450}
          blur
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#0036D8]/40" />
            <h2 className="text-2xl text-white font-light" style={{ fontFamily: "var(--font-averia), Georgia, serif" }}>
              Connect
            </h2>
          </div>
          <div className="space-y-0">
            {connectLinks.map((entry, index) => (
              <RevealOnView key={entry.label} delayMs={index * 25} yOffset={8}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-[10px] tracking-[0.18em] text-white/40 uppercase">{entry.label}</p>
                    <p className="text-sm text-white/50">{entry.note}</p>
                  </div>
                  {isExternalHref(entry.href) ? (
                    <a
                      href={entry.href}
                      target={entry.href.startsWith("http") ? "_blank" : undefined}
                      rel={entry.href.startsWith("http") ? "noreferrer" : undefined}
                      className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white transition-colors duration-300"
                    >
                      <span>Open</span>
                      <span aria-hidden>{entry.href.startsWith("http") ? "↗" : "→"}</span>
                    </a>
                  ) : (
                    <Link
                      href={entry.href}
                      className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white transition-colors duration-300"
                    >
                      <span>Open</span>
                      <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </RevealOnView>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView
          id="system-acknowledgments"
          className="kiln-card-surface kiln-blueprint-grid border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={540}
          blur
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-[#0036D8]/40" />
            <h2 className="text-2xl text-white font-light" style={{ fontFamily: "var(--font-averia), Georgia, serif" }}>
              Acknowledgments
            </h2>
          </div>
          <p className="text-white/55 text-sm leading-relaxed mb-6">
            Built with respect for the open source ecosystem: Next.js, React Three Fiber, GSAP, Ghost, and the infrastructure teams that keep the web operational.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border border-white/8 bg-white/[0.01] p-3">
              <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase mb-1">TZ</p>
              <p className="text-sm text-white/70 font-mono">EST</p>
            </div>
            <div className="border border-white/8 bg-white/[0.01] p-3">
              <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase mb-1">Status</p>
              <p className="text-sm text-white/70 font-mono">Operational</p>
            </div>
            <div className="border border-white/8 bg-white/[0.01] p-3">
              <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase mb-1">Ref</p>
              <p className="text-sm text-white/70 font-mono">SYSTEM.003</p>
            </div>
          </div>
        </RevealOnView>
      </div>
    </RouteShell>
  );
}
