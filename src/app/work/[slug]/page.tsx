/**
 * Work Detail Route
 * 
 * Individual output page.
 */

interface WorkDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;

  return (
    <div className="min-h-screen pt-32 pb-16 px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-system text-on-surface-muted mb-4 tracking-widest">
          C  OUTPUT {slug.toUpperCase()}
        </p>
        <h1 className="font-heading text-display text-on-bg-primary mb-6">
          {slug}
        </h1>
        <div className="w-full h-px bg-border-custom mb-12" />
        <p className="text-body text-on-bg-secondary">
          Work detail content will be rendered here.
        </p>
      </div>
    </div>
  );
}
