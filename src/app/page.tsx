/**
 * Main Page
 * 
 * Uses PageRouter with microfiche transition effect.
 */

import { Metadata } from 'next';
import { PageRouter } from '@/components/dom/PageRouter';

export const metadata: Metadata = {
  title: 'KILN Studio',
  description: 'A personal studio and publishing space. Not a portfolio. A continuous practice.',
  openGraph: {
    title: 'KILN Studio',
    description: 'A personal studio and publishing space. Not a portfolio. A continuous practice.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://studiokiln.io',
  },
  twitter: {
    card: 'summary',
    title: 'KILN Studio',
    description: 'A personal studio and publishing space. Not a portfolio. A continuous practice.',
  },
};

export default function Home() {
  return <PageRouter />;
}
