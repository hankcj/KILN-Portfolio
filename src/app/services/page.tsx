import Image from "next/image";
import Link from "next/link";
import { motionTokens } from "@/lib/motion";
import { servicePackages } from "@/lib/services";
import RouteShell from "@/components/dom/RouteShell";
import ChapterHero from "@/components/dom/ChapterHero";
import SectionDivider from "@/components/dom/SectionDivider";
import RevealOnView from "@/components/dom/motion/RevealOnView";

const engagementModes = [
  {
    label: "01",
    title: "Scan first",
    note: "Short diagnostic to identify what is actually broken before anything gets rebuilt.",
  },
  {
    label: "02",
    title: "Build or recalibrate",
    note: "We either construct the system from scratch or remove friction from what already exists.",
  },
  {
    label: "03",
    title: "Ship the rationale",
    note: "You receive documentation and decisions, so the work survives future edits and future people.",
  },
];

const selectionCriteria = [
  "You want clarity more than novelty.",
  "You can make decisions without ten layers of approval.",
  "You care about long-term maintainability, not quick fixes.",
  "You are willing to change the page, not just tweak the copy.",
  "Budget matches scope, and scope stays honest.",
];

const activeVectors = [
  "Website and services pages that need a full positioning pass",
  "Meta ads for bookings, lead generation, and product funnels",
  "Copy systems that scale across site, ads, and email",
  "Creative direction for brands that ship consistently",
];

const contextChecklist = [
  "Link to the current site",
  "What \"conversion\" means for you — bookings, leads, sales",
  "Current ad spend and platform (if applicable)",
  "The one-sentence version of the offer",
];

export default function ServicesPage() {
  return (
    <RouteShell theme="services" showProgress>
      <ChapterHero
        id="services-header"
        label="Services"
        title="Lunar Packages"
        subtitle="Scoped studio engagements for web, copy, paid media, and creative direction. Each package is shaped after intake."
        marquee="Scoped studio packages for web, copy, and creative direction"
        accent="rgba(58, 125, 140, 0.07)"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pb-24">
        <SectionDivider label="Catalogue" className="mb-2" />

        <div id="services-packages" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {servicePackages.map((service, index) => (
            <RevealOnView
              key={service.id}
              className="flex"
              delayMs={index * motionTokens.stagger.base}
              blur={index < 2}
              scale
            >
              <article className="kiln-card-surface kiln-spotlight overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col w-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="kiln-card-media object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13161F]/85 via-[#13161F]/35 to-transparent" />
                  <p className="absolute left-5 top-5 text-[10px] tracking-[0.22em] text-white/80 uppercase">
                    {service.code}
                  </p>
                  <div className="kiln-card-meta-reveal absolute right-5 bottom-5">
                    <span className="text-[9px] tracking-[0.2em] text-[#3A7D8C]/80 uppercase">
                      {service.theme}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <h2
                    className="text-2xl text-white font-light mb-2"
                    style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
                  >
                    {service.themedName}
                  </h2>
                  <p className="text-[10px] tracking-[0.2em] text-white/45 uppercase mb-4">
                    {service.descriptor}
                  </p>

                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-block px-3 py-1.5 border border-[#3A7D8C]/30 text-[10px] tracking-[0.15em] text-[#3A7D8C] uppercase">
                      {service.pricing}
                    </span>
                  </div>

                  <p className="text-white/50 text-sm leading-relaxed mb-5">{service.notes}</p>

                  <div className="border-t border-white/5 pt-4 mb-4">
                    <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase mb-3">Typical deliverables</p>
                    <ul className="space-y-2">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 flex-shrink-0 w-1.5 h-[1px] bg-[#3A7D8C]/40" />
                          <span className="text-white/50 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-white/5 pt-4 mt-auto">
                    <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase mb-3">Best for</p>
                    <ul className="space-y-2">
                      {service.bestFor.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-[#3A7D8C]/50" />
                          <span className="text-white/50 text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </RevealOnView>
          ))}
        </div>

        <SectionDivider label="Approach" className="mb-2" />

        <RevealOnView
          id="services-approach"
          className="mb-10"
          blur
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {engagementModes.map((mode, i) => (
              <div key={mode.label} className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase font-mono">{mode.label}</span>
                  <div className="flex-1 h-[1px] bg-white/8" />
                </div>
                <h3
                  className="text-lg text-white font-light mb-2"
                  style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
                >
                  {mode.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{mode.note}</p>
                {i < engagementModes.length - 1 && (
                  <div className="sm:hidden mt-4 h-[1px] bg-white/5" />
                )}
              </div>
            ))}
          </div>
        </RevealOnView>

        <RevealOnView
          id="services-criteria"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={90}
          blur
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-[#3A7D8C]/40" />
            <h2
              className="text-2xl text-white font-light"
              style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
            >
              Selection Criteria
            </h2>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            The best work happens when conditions are clear from the start.
          </p>
          <ul className="space-y-3">
            {selectionCriteria.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1.5 h-[1px] bg-[#3A7D8C]/40" />
                <span className="text-white/55 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </RevealOnView>

        <RevealOnView
          id="services-vectors"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={180}
          blur
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-[#3A7D8C]/40" />
            <h2
              className="text-2xl text-white font-light"
              style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
            >
              Active Vectors
            </h2>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            Current studio priorities. Bandwidth is limited — these are the trajectories in focus.
          </p>
          <ul className="space-y-3">
            {activeVectors.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-[#3A7D8C]/50" />
                <span className="text-white/55 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </RevealOnView>

        <SectionDivider label="Initiate" className="mb-2" />

        <RevealOnView
          id="services-contact"
          className="kiln-card-surface kiln-blueprint-grid border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={270}
          blur
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-[#3A7D8C]/40" />
            <h2
              className="text-2xl text-white font-light"
              style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
            >
              Start a Conversation
            </h2>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Describe the system. What are you building, what is not working, and where does attention leak out of the funnel?
          </p>

          <div className="border border-white/8 bg-white/[0.01] p-4 sm:p-5 mb-6">
            <p className="text-[10px] tracking-[0.2em] text-white/35 uppercase mb-3">Helpful context (if you have it)</p>
            <ul className="space-y-2">
              {contextChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 flex-shrink-0 w-1.5 h-[1px] bg-white/20" />
                  <span className="text-white/50 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10">
            <Link
              href="/intake"
              className="kiln-button-surface inline-flex items-center gap-3 border border-white/30 px-6 py-3.5 text-[10px] tracking-[0.2em] text-white/75 uppercase hover:text-white hover:border-white/50 transition-colors duration-300"
            >
              <span>Open project intake</span>
              <span aria-hidden>→</span>
            </Link>
            <p className="text-[10px] tracking-[0.15em] text-white/30 uppercase">
              All packages scoped after intake
            </p>
          </div>
        </RevealOnView>
      </div>
    </RouteShell>
  );
}
