import type { Metadata } from 'next';
import { Averia_Serif_Libre, Inter } from 'next/font/google';
import './globals.css';
import { SmoothScroll } from '@/components/dom/SmoothScroll';
import { CustomCursor } from '@/components/dom/CustomCursor';
import { AmbientCursor } from '@/components/dom/AmbientCursor';

const averiaSerifLibre = Averia_Serif_Libre({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-averia',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://studiokiln.io';
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo/favicon.svg`;

export const metadata: Metadata = {
  title: 'KILN Studio',
  description: 'A personal studio and publishing space. Not a portfolio. A continuous practice.',
  icons: {
    icon: '/logo/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'KILN Studio',
    title: 'KILN Studio',
    description: 'A personal studio and publishing space. Not a portfolio. A continuous practice.',
    images: [{ url: DEFAULT_OG_IMAGE, alt: 'KILN' }],
  },
  twitter: {
    card: 'summary',
    title: 'KILN Studio',
    description: 'A personal studio and publishing space. Not a portfolio. A continuous practice.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${averiaSerifLibre.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg-primary text-on-bg-primary overflow-x-hidden">
        {/* Static scanlines - global */}
        <div className="scanlines" aria-hidden="true" />
        
        {/* Custom cursor - respects reduced motion */}
        <CustomCursor />
        
        {/* Ambient cursor glow */}
        <AmbientCursor />
        
        {/* Smooth scroll wrapper */}
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
