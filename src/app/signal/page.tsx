/**
 * Signal / Journal Index Route
 * 
 * Server component that fetches posts from Ghost CMS
 * and renders the SignalPage client component.
 */

import { getPosts } from '@/lib/ghost';
import SignalPage from '@/app/signal-page';
import { Metadata } from 'next';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studiokiln.io';

export const metadata: Metadata = {
  title: 'Signal — KILN',
  description: 'Transmission log. Essays on design systems, creative technology, and digital craft.',
  openGraph: {
    title: 'Signal — KILN',
    description: 'Transmission log. Essays on design systems, creative technology, and digital craft.',
    url: `${SITE_URL}/signal`,
  },
  twitter: {
    card: 'summary',
    title: 'Signal — KILN',
    description: 'Transmission log. Essays on design systems, creative technology, and digital craft.',
  },
};

export default async function SignalRoute() {
  const result = await getPosts({
    limit: 'all',
    include: ['tags', 'authors'],
    order: 'published_at DESC',
  });
  const posts = result?.posts ?? [];

  return <SignalPage posts={posts} />;
}
