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

export const metadata: Metadata = {
  title: 'Signal — KILN',
  description: 'Transmission log. Essays on design systems, creative technology, and digital craft.',
};

export default async function SignalRoute() {
  const { posts } = await getPosts({
    limit: 'all',
    include: ['tags', 'authors'],
    order: 'published_at DESC',
  });

  return <SignalPage posts={posts} />;
}
