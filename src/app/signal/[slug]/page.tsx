/**
 * Essay / Article Detail Route
 * 
 * Individual essay/article page.
 */

interface EssayPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EssayPage({ params }: EssayPageProps) {
  const { slug } = await params;

  return (
    <article className="min-h-screen py-16 px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-h1 mb-4">Essay: {slug}</h1>
        <p className="text-body text-on-surface-muted">
          Essay content will be rendered here.
        </p>
      </div>
    </article>
  );
}
