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
    <html lang="en">
      <body className="min-h-screen">
        {/* Film grain overlay */}
        <div className="film-grain" aria-hidden="true" />
        
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
