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
    <div className="min-h-screen py-16 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-heading text-h1 mb-4">Output: {slug}</h1>
        <p className="text-body text-on-surface-muted">
          Work detail content will be rendered here.
        </p>
      </div>
    </div>
  );
}
