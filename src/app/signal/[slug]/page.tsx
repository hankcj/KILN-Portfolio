/**
 * Signal Post Route
 *
 * Individual Ghost CMS post at /signal/[slug].
 * Statically generated when possible; revalidated every 60 seconds.
 */

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { SimplePageShell } from '@/components/dom/PageShell';
import { getPostBySlug, getPosts } from '@/lib/ghost';

export const revalidate = 60;

interface SignalPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const result = await getPosts({ limit: 'all' });
  const posts = result?.posts ?? [];
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: SignalPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return { title: 'Post not found — KILN' };
  }
  const description = post.custom_excerpt || post.excerpt || undefined;
  return {
    title: `${post.title} — KILN`,
    description,
    openGraph: {
      title: post.title,
      description: description ?? undefined,
      images: post.feature_image ? [{ url: post.feature_image, alt: post.title }] : undefined,
    },
  };
}

function formatDateCode(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export default async function SignalPostPage({ params }: SignalPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <SimplePageShell
      currentPage="signal"
      leftSideText="TRANSMISSION"
      rightSideText={post.title.toUpperCase().slice(0, 20)}
    >
      <div className="min-h-screen pt-32 pb-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <a
            href="/signal"
            className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors mb-8"
          >
            <span>← BACK_TO_LOG</span>
          </a>

          <article>
            <header className="mb-12 pb-8 border-b border-border-muted">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="font-mono text-system text-accent">SIGNAL</span>
                <span className="font-mono text-system text-on-surface-muted">
                  {formatDateCode(post.published_at)}
                </span>
                {post.reading_time > 0 && (
                  <span className="font-mono text-system text-on-surface-muted">
                    {post.reading_time} MIN READ
                  </span>
                )}
                {post.featured && (
                  <span className="font-mono text-system text-on-surface-muted">★ FEATURED</span>
                )}
              </div>
              <h1 className="font-heading text-display-md md:text-display text-on-bg-primary mb-6">
                {post.title}
              </h1>
              {(post.custom_excerpt || post.excerpt) && (
                <p className="text-body text-on-bg-tertiary max-w-2xl">
                  {post.custom_excerpt || post.excerpt}
                </p>
              )}
              {post.primary_author && (
                <div className="flex items-center gap-4 mt-6">
                  {post.primary_author.profile_image && (
                    <Image
                      src={post.primary_author.profile_image}
                      alt={post.primary_author.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border border-border-muted"
                    />
                  )}
                  <div>
                    <span className="font-mono text-system text-on-bg-secondary">
                      BY {post.primary_author.name.toUpperCase()}
                    </span>
                    {post.primary_author.bio && (
                      <p className="text-body text-on-surface-muted text-sm mt-1 max-w-md">
                        {post.primary_author.bio}
                      </p>
                    )}
                  </div>
                </div>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="font-mono text-system text-on-surface-muted px-2 py-1 border border-border-muted"
                    >
                      {tag.name.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
            </header>

            {post.feature_image && (
              <figure className="mb-12 relative w-full aspect-video border border-border-muted overflow-hidden">
                <Image
                  src={post.feature_image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </figure>
            )}

            <div
              className="ghost-content font-body text-on-bg-secondary leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>

          <footer className="mt-16 pt-8 border-t border-border-muted">
            <a
              href="/signal"
              className="inline-flex items-center gap-2 font-mono text-system text-on-surface-muted hover:text-accent transition-colors"
            >
              <span>← BACK_TO_LOG</span>
            </a>
          </footer>
        </div>
      </div>
    </SimplePageShell>
  );
}
