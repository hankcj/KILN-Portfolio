import Link from 'next/link';
import { getPosts } from '@/lib/ghost';
import type { GhostPost } from '@/lib/ghost';
import { motionTokens } from '@/lib/motion';
import SubscribeInline from '@/components/dom/SubscribeInline';
import RouteShell from '@/components/dom/RouteShell';
import ChapterHero from '@/components/dom/ChapterHero';
import SectionDivider from '@/components/dom/SectionDivider';
import RevealOnView from '@/components/dom/motion/RevealOnView';


export const revalidate = 3600;

const placeholderArticles = [
  {
    slug: 'the-competence-floor',
    title: 'The Competence Floor',
    excerpt: 'What the floor means for the work you do and the standards you keep.',
    published_at: '2026-03-15T00:00:00.000Z',
    reading_time: 15,
    primary_tag: { id: '1', name: 'Essay', slug: 'essay' },
  },
  {
    slug: 'life-without-friction',
    title: 'Life Without Friction',
    excerpt: 'How ease erodes ownership, memory, and gratitude.',
    published_at: '2026-02-10T00:00:00.000Z',
    reading_time: 20,
    primary_tag: { id: '2', name: 'Essay', slug: 'essay' },
  },
  {
    slug: 'built-to-count',
    title: 'Built to Count',
    excerpt: 'Why modern work cannot feel good.',
    published_at: '2026-01-05T00:00:00.000Z',
    reading_time: 19,
    primary_tag: { id: '3', name: 'Essay', slug: 'essay' },
  },
];

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function ArticleCard({
  slug,
  title,
  excerpt,
  date,
  readTime,
  tag,
  issue,
}: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  tag: string;
  issue: number;
}) {
  return (
    <Link
      href={`/signal/${slug}`}
      className="kiln-card-surface group block px-4 py-8 -mx-4 rounded border border-transparent hover:border-white/10 hover:bg-white/[0.015] transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase">{tag}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">{date}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-[9px] tracking-[0.15em] text-white/25 uppercase font-mono">
              No. {String(issue).padStart(2, '0')}
            </span>
          </div>
          <h2
            className="text-xl sm:text-2xl text-white font-light mb-2 group-hover:text-white/80 transition-colors duration-300"
            style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
          >
            {title}
          </h2>
          <p className="text-white/40 text-sm leading-relaxed max-w-xl">{excerpt}</p>
        </div>
        <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-2">
          <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase">
            {readTime} min
          </span>
          <svg
            className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default async function SignalPage() {
  const ghostPosts = await getPosts(50);

  const articles =
    ghostPosts.length > 0
      ? ghostPosts.map((p: GhostPost) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.custom_excerpt || p.excerpt || '',
          date: formatDate(p.published_at),
          readTime: p.reading_time,
          tag: p.primary_tag?.name || 'Signal',
        }))
      : placeholderArticles.map((p) => ({
          slug: p.slug,
          title: p.title,
          excerpt: p.excerpt,
          date: formatDate(p.published_at),
          readTime: p.reading_time,
          tag: p.primary_tag.name,
        }));

  const totalArticles = articles.length;

  return (
    <RouteShell theme="signal" showProgress>
      <ChapterHero
        id="signal-header"
        label="Signal"
        title="Signal Archive"
        subtitle="Essays, notes, and research from the studio. Longer pieces remain archived here."
        marquee="Essays, notes, and research from the studio"
        accent="rgba(0, 54, 216, 0.06)"
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pb-24">
        <SectionDivider label={`${totalArticles} entries`} className="mb-2" />

        <div id="signal-articles" className="divide-y divide-white/5">
          {articles.map((article, index) => (
            <RevealOnView key={article.slug} delayMs={index * motionTokens.stagger.fast}>
              <ArticleCard {...article} issue={totalArticles - index} />
            </RevealOnView>
          ))}
        </div>

        {articles.length === 0 && (
          <p className="text-white/40 text-center py-20">No signal returned.</p>
        )}

        <RevealOnView className="mt-10 mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6 border-t border-b border-white/5" blur>
          <p className="text-white/50 text-sm leading-relaxed max-w-lg">
            Reading is one vector. If a transmission should become a build, open a channel directly.
          </p>
          <Link
            href="/intake"
            className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white transition-colors duration-300"
          >
            <span>Project intake</span>
            <span aria-hidden>→</span>
          </Link>
        </RevealOnView>

        <SectionDivider className="mt-4 mb-2" />

        <div id="signal-subscribe" className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6">
          <RevealOnView className="kiln-card-surface border border-white/10 bg-white/[0.02] p-6 sm:p-8" blur>
            <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-3">RSS</p>
            <p className="text-white/55 text-sm leading-relaxed mb-4">
              Prefer an RSS reader? This feed reflects the same archive source as Signal.
            </p>
            <a
              href="/rss.xml"
              className="kiln-link-surface inline-flex items-center gap-3 text-[10px] tracking-[0.2em] text-white/70 uppercase hover:text-white transition-colors duration-300"
            >
              <span>Surface feed</span>
              <span aria-hidden>↗</span>
            </a>
          </RevealOnView>
          <RevealOnView delayMs={motionTokens.stagger.slow} blur>
            <SubscribeInline />
          </RevealOnView>
        </div>
      </div>
    </RouteShell>
  );
}
