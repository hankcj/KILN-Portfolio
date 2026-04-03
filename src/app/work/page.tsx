import Image from "next/image";
import Link from "next/link";
import { works } from "@/lib/work";
import { motionTokens } from "@/lib/motion";
import RouteShell from "@/components/dom/RouteShell";
import ChapterHero from "@/components/dom/ChapterHero";
import SectionDivider from "@/components/dom/SectionDivider";
import RevealOnView from "@/components/dom/motion/RevealOnView";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function WorkPage() {
  return (
    <RouteShell theme="work" showProgress>
      <ChapterHero
        id="work-header"
        label="Work"
        title="Object Archive"
        subtitle="Finished work, active systems, and product experiments. Each object keeps context on how it was made and why."
        marquee="Objects, systems, and frameworks from the studio archive"
        accent="rgba(58, 125, 140, 0.08)"
      />

      <div
        id="work-entries"
        className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-16 pb-24"
      >
        <SectionDivider label="Archive" className="mb-8" />

        <div className="space-y-6 sm:space-y-8">
          {works.map((entry, index) => {
            const isOdd = index % 2 !== 0;
            return (
              <RevealOnView
                key={entry.slug}
                delayMs={index * motionTokens.stagger.base}
                blur={index < 2}
                scale
              >
                <Link href={`/work/${entry.slug}`} className="block group">
                  <article
                    className={`kiln-card-surface border border-white/10 bg-white/[0.02] grid grid-cols-1 md:grid-cols-[1fr_1.2fr] ${isOdd ? "md:grid-cols-[1.2fr_1fr]" : ""}`}
                  >
                    <div className={`relative h-48 md:h-auto overflow-hidden ${isOdd ? "md:order-2" : ""}`}>
                      <Image
                        src={entry.coverImage}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="kiln-card-media object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#13161F]/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#13161F]/50" />
                      <div className="absolute left-5 top-5 flex items-center gap-2">
                        <span className="text-[10px] tracking-[0.2em] text-white/80 uppercase">
                          {entry.status}
                        </span>
                      </div>
                    </div>

                    <div className={`p-6 sm:p-8 flex flex-col justify-center ${isOdd ? "md:order-1" : ""}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase">
                          {entry.type}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
                          {formatDate(entry.date)}
                        </span>
                      </div>

                      <h2
                        className="text-2xl sm:text-3xl text-white font-light mb-4 leading-tight group-hover:text-white/80 transition-colors duration-300"
                        style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
                      >
                        {entry.title}
                      </h2>

                      <p className="text-white/50 text-sm leading-relaxed mb-6">
                        {entry.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/60 uppercase group-hover:text-white transition-colors duration-300">
                          <span>Surface</span>
                          <span aria-hidden className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </span>
                        <span className="kiln-card-meta-reveal text-[9px] tracking-[0.2em] text-white/30 uppercase">
                          {entry.details.length} deliverables
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </RevealOnView>
            );
          })}
        </div>
      </div>
    </RouteShell>
  );
}

