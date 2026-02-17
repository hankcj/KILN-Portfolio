/**
 * Essay / Article Detail Route
 * 
 * Individual essay/article page.
 */

import { Layout } from '@/components/dom/Layout';

interface EssayPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;

  return (
    <Layout>
      <article className="min-h-screen pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
            C  ESSAY {slug.toUpperCase()}
          </p>
          <h1 className="font-heading text-display text-on-bg-primary mb-6">
            {slug}
          </h1>
          <div className="w-full h-px bg-border-custom mb-12" />
          <div className="prose prose-invert max-w-none">
            <p className="text-body text-on-bg-secondary leading-relaxed">
              Essay content will be rendered here.
            </p>
          </div>
        </div>
      </article>
    </Layout>
  );
}
