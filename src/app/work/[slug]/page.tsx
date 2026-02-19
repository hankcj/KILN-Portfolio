/**
 * Work Detail Route
 * 
 * Individual output page.
 */

import { SimplePageShell } from '@/components/dom/PageShell';
import { WorkBackLink, WorkDetailNav } from './WorkDetailClient';
import { Metadata } from 'next';

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for static export
export function generateStaticParams() {
  // Return sample slugs for static generation
  // In production, this would fetch from CMS
  return [
    { slug: 'project-alpha' },
    { slug: 'project-beta' },
    { slug: 'project-gamma' },
  ];
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  return {
    title: `${slug} — KILN`,
    description: 'Output detail',
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;

  return (
    <SimplePageShell
      currentPage="outputs"
      leftSideText="OUTPUT_DETAIL"
      rightSideText={slug.toUpperCase()}
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <WorkBackLink />

          {/* Header */}
          <header className="mb-12 pb-8 border-b border-border-muted">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-system text-accent">
                OUTPUT
              </span>
              <span className="font-mono text-system text-on-surface-muted">
                {slug.toUpperCase()}
              </span>
            </div>
            
            <h1 className="font-heading text-display-md md:text-display text-on-bg-primary mb-6">
              {slug}
            </h1>
            
            <p className="text-body text-on-bg-tertiary max-w-2xl">
              Output detail content will be rendered here.
            </p>
          </header>

          {/* Placeholder content */}
          <div className="space-y-8">
            <div className="aspect-video bg-bg-secondary border border-border-muted flex items-center justify-center">
              <span className="font-mono text-system text-on-surface-muted">
                [OUTPUT_PREVIEW]
              </span>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-body text-on-bg-secondary leading-relaxed">
                Full output description and details will be rendered here.
              </p>
            </div>
          </div>

          {/* Footer */}
          <WorkDetailNav />
        </div>
      </div>
    </SimplePageShell>
  );
}
