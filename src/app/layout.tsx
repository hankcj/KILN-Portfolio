import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KILN — Personal Studio',
  description: 'A personal studio and publishing space. Not a portfolio. A continuous practice.',
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
        
        {/* Content - pages handle their own living effects */}
        {children}
      </body>
    </html>
  );
}
