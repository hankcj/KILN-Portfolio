import type { Metadata } from 'next';
import './globals.css';
import { Layout } from '@/components/dom/Layout';
import { SceneManager } from '@/components/canvas/SceneManager';

export const metadata: Metadata = {
  title: 'KILN — Portfolio',
  description: 'A personal studio portfolio and publishing space.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-bg-primary text-on-bg-primary overflow-x-hidden">
        {/* Visual effects layers */}
        <div className="film-grain" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        <div className="grid-overlay" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        
        {/* WebGL Canvas Layer */}
        <SceneManager />
        
        {/* DOM Content Layer */}
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
