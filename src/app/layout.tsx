import type { Metadata } from 'next';
import './globals.css';
import { SmoothScroll } from '@/components/dom/SmoothScroll';
import { CustomCursor } from '@/components/dom/CustomCursor';
import { AmbientCursor } from '@/components/dom/AmbientCursor';

export const metadata: Metadata = {
  title: 'KILN Studio',
  description: 'A personal studio and publishing space. Not a portfolio. A continuous practice.',
  icons: {
    icon: '/logo/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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
