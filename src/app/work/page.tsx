import { works } from '#content';
import { SimplePageShell } from '@/components/dom/PageShell';
import { OutputsList } from '@/components/dom/OutputsList';
import { ScrollReveal } from '@/components/dom/ScrollReveal';
import { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studiokiln.io';

export const metadata: Metadata = {
  title: 'Outputs — KILN',
  description: 'A continuous practice of essays, systems, tools, and experiments.',
  openGraph: {
    title: 'Outputs — KILN',
    description: 'A continuous practice of essays, systems, tools, and experiments.',
    url: `${SITE_URL}/work`,
  },
  twitter: {
    card: 'summary',
    title: 'Outputs — KILN',
    description: 'A continuous practice of essays, systems, tools, and experiments.',
  },
};

export default function WorkPage() {
  const published = works
    .filter(w => w.status !== 'Archived')
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <SimplePageShell
      currentPage="outputs"
      leftSideText="OUTPUT_ARCHIVE_V2.0"
      rightSideText={`${published.length} ITEMS INDEXED`}
    >
      <div className="min-h-screen pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-16 md:mb-24">
            <ScrollReveal>
              <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
                C  OUTPUT ARCHIVE
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-display text-on-bg-primary mb-4">
                OUTPUTS
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-body text-on-bg-tertiary max-w-xl">
                Outputs — not projects. A continuous practice of essays, systems, tools,
                and experiments.
              </p>
            </ScrollReveal>
          </header>

          <OutputsList outputs={published} />
        </div>
      </div>
    </SimplePageShell>
  );
}
