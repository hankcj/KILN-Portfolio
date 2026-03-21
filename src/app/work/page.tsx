import { works } from '#content';
import { SimplePageShell } from '@/components/dom/PageShell';
import { OutputsList } from '@/components/dom/OutputsList';
import { ScrollReveal } from '@/components/dom/ScrollReveal';
import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studiokiln.io';

export const metadata: Metadata = {
  title: 'Work — KILN',
  description: 'A continuous practice of essays, systems, tools, and experiments.',
  openGraph: {
    title: 'Work — KILN',
    description: 'A continuous practice of essays, systems, tools, and experiments.',
    url: `${SITE_URL}/work`,
  },
  twitter: {
    card: 'summary',
    title: 'Work — KILN',
    description: 'A continuous practice of essays, systems, tools, and experiments.',
  },
};

export default function WorkPage() {
  const published = works
    .filter(w => w.status !== 'Archived')
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <SimplePageShell
      currentPage="work"
      leftSideText="WORK_ARCHIVE_V2.0"
      rightSideText={`${published.length} ITEMS INDEXED`}
    >
      <div className="min-h-screen pt-32 pb-[var(--frame-content-bottom-clearance)] px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 md:mb-24">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
                {"// WORK_ARCHIVE"}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                WORK
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body text-on-bg-tertiary max-w-xl">
                Selected work — not a portfolio. A continuous practice of essays, systems, 
                tools, and experiments.
              </p>
            </ScrollReveal>
          </header>

          {/* CTA: From viewing to building */}
          <section className="mb-12 md:mb-16 border-t border-border-muted pt-6 max-w-3xl">
            <p className="font-mono text-system text-on-surface-muted mb-3 tracking-widest">
              {"// FROM_VIEWING_TO_BUILDING"}
            </p>
            <p className="text-small text-on-bg-tertiary leading-relaxed mb-3">
              These are experiments and releases from the studio. If you want something similar scoped for your business, start a conversation.
            </p>
            <a
              href="/intake"
              className="font-mono text-system text-on-surface-muted hover:text-accent transition-colors inline-flex items-center gap-2"
            >
              <span>START_PROJECT</span>
              <span>→</span>
            </a>
          </section>

          <OutputsList outputs={published} />

          {/* Footer info */}
          <div className="flex justify-between items-end mt-16 pt-8 border-t border-border-muted">
            <div className="font-mono text-system text-on-surface-muted">
              TOTAL: {published.length.toString().padStart(2, '0')} ITEMS
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-mono text-system text-on-surface-muted">
                STATUS: ACTIVE
              </span>
            </div>
            <div className="font-mono text-system text-on-surface-muted">
              REF: WORK.001
            </div>
          </div>
        </div>
      </div>
    </SimplePageShell>
  );
}
