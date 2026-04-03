import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getPost, getPosts } from '@/lib/ghost';
import type { Metadata } from 'next';
import RouteShell from '@/components/dom/RouteShell';
import RevealOnView from '@/components/dom/motion/RevealOnView';

export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts(100);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'No Signal Returned | KILN' };
  return {
    title: `${post.title} | KILN Signal Archive`,
    description: post.custom_excerpt || post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.custom_excerpt || post.excerpt || undefined,
      images: post.feature_image ? [post.feature_image] : undefined,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <RouteShell theme="signal" showProgress showSections={false}>
      {post.feature_image && (
        <div className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden">
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13161F] via-[#13161F]/40 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 sm:px-12 lg:px-16 pb-24">
        <RevealOnView
          className={`flex items-center gap-4 ${post.feature_image ? '-mt-16 relative z-10' : 'pt-32'} mb-12`}
          blur
        >
          <Link
            href="/signal"
            className="kiln-link-surface text-[10px] tracking-[0.2em] text-white/40 uppercase hover:text-white/60 transition-colors duration-300"
          >
            &larr; Signal archive
          </Link>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <Link
            href="/"
            className="kiln-link-surface text-[10px] tracking-[0.2em] text-white/40 uppercase hover:text-white/60 transition-colors duration-300"
          >
            Return home
          </Link>
        </RevealOnView>

        <RevealOnView className="flex items-center gap-3 mb-6" delayMs={40} blur>
          {post.primary_tag && (
            <>
              <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase">
                {post.primary_tag.name}
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
            </>
          )}
          <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
            {formatDate(post.published_at)}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
            {post.reading_time} min read
          </span>
        </RevealOnView>

        <RevealOnView delayMs={80} blur>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light mb-10 leading-[0.95]"
            style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
          >
            {post.title}
          </h1>
        </RevealOnView>

        {post.html && (
          <RevealOnView delayMs={100}>
            <div
              className="ghost-content prose prose-invert prose-lg max-w-none
                prose-headings:font-light prose-headings:tracking-tight
                prose-p:text-white/70 prose-p:leading-relaxed
                prose-a:text-[#3A7D8C] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white prose-strong:font-medium
                prose-blockquote:border-l-white/20 prose-blockquote:text-white/50
                prose-code:text-white/80 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                prose-img:rounded-none"
              style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </RevealOnView>
        )}

        <RevealOnView className="mt-20 pt-10 border-t border-white/10 flex items-center justify-between" delayMs={140}>
          <Link
            href="/signal"
            className="kiln-link-surface group inline-flex items-center gap-3 text-sm tracking-[0.15em] text-white/60 uppercase hover:text-white transition-colors duration-300"
          >
            <svg
              className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span>Signal archive</span>
          </Link>
          <Link
            href="/"
            className="kiln-link-surface text-[10px] tracking-[0.2em] text-white/40 uppercase hover:text-white/60 transition-colors duration-300"
          >
            Return home
          </Link>
        </RevealOnView>
      </div>
    </RouteShell>
  );
}
