import { notFound } from 'next/navigation';
import { works } from '#content';
import { SimplePageShell } from '@/components/dom/PageShell';
import { WorkBackLink, WorkDetailNav } from './WorkDetailClient';
import { MDXContent } from '@/components/dom/MDXContent';
import { Metadata } from 'next';

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return works.map(work => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find(w => w.slug === slug);

  if (!work) {
    return { title: 'Output not found — KILN' };
  }

  return {
    title: `${work.title} — KILN`,
    description: work.description,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const work = works.find(w => w.slug === slug);

  if (!work) {
    notFound();
  }

  const sortedWorks = works
    .filter(w => w.status !== 'Archived')
    .sort((a, b) => b.date.localeCompare(a.date));
  const currentIndex = sortedWorks.findIndex(w => w.slug === slug);
  const prevWork = currentIndex > 0 ? sortedWorks[currentIndex - 1] : undefined;
  const nextWork = currentIndex < sortedWorks.length - 1 ? sortedWorks[currentIndex + 1] : undefined;

  return (
    <SimplePageShell
      currentPage="outputs"
      leftSideText="OUTPUT_DETAIL"
      rightSideText={work.title.toUpperCase().slice(0, 20)}
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <WorkBackLink />

          <article>
            <header className="mb-12 pb-8 border-b border-border-muted">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="font-mono text-system text-accent">
                  {work.type.toUpperCase()}
                </span>
                <span className="font-mono text-system text-on-surface-muted">
                  {work.status.toUpperCase()}
                </span>
                <span className="font-mono text-system text-on-surface-muted">
                  {work.date}
                </span>
              </div>

              <h1 className="font-heading text-display-md md:text-display text-on-bg-primary mb-6">
                {work.title}
              </h1>

              {work.description && (
                <p className="text-body text-on-bg-tertiary max-w-2xl">
                  {work.description}
                </p>
              )}
            </header>

            {work.coverImage && (
              <figure className="mb-12 relative w-full aspect-video border border-border-muted overflow-hidden">
                <img
                  src={work.coverImage}
                  alt={work.title}
                  className="w-full h-full object-cover"
                />
              </figure>
            )}

            <div className="mdx-content font-body text-on-bg-secondary leading-relaxed">
              <MDXContent code={work.body} />
            </div>
          </article>

          <footer className="mt-16 pt-8">
            <WorkDetailNav
              prevSlug={prevWork?.slug}
              nextSlug={nextWork?.slug}
            />
          </footer>
        </div>
      </div>
    </SimplePageShell>
  );
}
