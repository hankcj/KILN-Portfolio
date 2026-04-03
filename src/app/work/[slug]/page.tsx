import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkBySlug, works } from "@/lib/work";
import { motionTokens } from "@/lib/motion";
import RouteShell from "@/components/dom/RouteShell";
import ChapterHero from "@/components/dom/ChapterHero";
import SectionDivider from "@/components/dom/SectionDivider";
import RevealOnView from "@/components/dom/motion/RevealOnView";
import SectionProgressRail from "@/components/dom/motion/SectionProgressRail";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function generateStaticParams() {
  return works.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);
  if (!entry) return { title: "Object Not Found | KILN" };

  return {
    title: `${entry.title} | KILN Object`,
    description: entry.excerpt,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) {
    notFound();
  }

  return (
    <RouteShell theme="work" showProgress showSections={false}>
      <SectionProgressRail
        sections={[
          { id: "work-context", label: "Context" },
          { id: "work-result", label: "Result" },
          { id: "work-scope", label: "Scope" },
        ]}
      />

      <div className="relative">
        <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden">
          <Image
            src={entry.coverImage}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13161F] via-[#13161F]/50 to-[#13161F]/20" />
        </div>

        <div className="relative z-10 -mt-24 max-w-4xl mx-auto px-6 sm:px-12 lg:px-16">
          <RevealOnView className="flex items-center gap-3 mb-6" blur>
            <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase">{entry.type}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
              {formatDate(entry.date)}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">{entry.status}</span>
          </RevealOnView>

          <RevealOnView delayMs={70} blur>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light mb-8 leading-[0.95]"
              style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
            >
              {entry.title}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-14 max-w-2xl">{entry.excerpt}</p>
          </RevealOnView>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-12 lg:px-16 pb-24">
        <SectionDivider className="mb-2" />

        <section className="space-y-0">
          <RevealOnView id="work-context" className="py-10 border-b border-white/5" blur>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-[#3A7D8C]/40" />
              <h2
                className="text-2xl text-white font-light"
                style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
              >
                Context
              </h2>
            </div>
            <p className="text-white/50 leading-relaxed pl-9">{entry.challenge}</p>
          </RevealOnView>

          <RevealOnView id="work-result" className="py-10 border-b border-white/5" delayMs={motionTokens.stagger.fast} blur>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-[#3A7D8C]/40" />
              <h2
                className="text-2xl text-white font-light"
                style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
              >
                Result
              </h2>
            </div>
            <p className="text-white/50 leading-relaxed pl-9">{entry.outcome}</p>
          </RevealOnView>

          <RevealOnView id="work-scope" className="py-10" delayMs={motionTokens.stagger.base} blur>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-6 bg-[#3A7D8C]/40" />
              <h2
                className="text-2xl text-white font-light"
                style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
              >
                Scope
              </h2>
            </div>
            <ul className="space-y-3 pl-9">
              {entry.details.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/50 leading-relaxed">
                  <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full bg-[#3A7D8C]/50" />
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnView>
        </section>

        <RevealOnView className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between" delayMs={120}>
          <Link
            href="/work"
            className="kiln-link-surface group inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/50 uppercase hover:text-white transition-colors duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>Return to archive</span>
          </Link>
          <Link
            href="/intake"
            className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white transition-colors duration-300"
          >
            <span>Make contact</span>
            <span>→</span>
          </Link>
        </RevealOnView>
      </div>
    </RouteShell>
  );
}
