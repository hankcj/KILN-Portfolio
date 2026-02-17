import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'KILN — Digital Museum',
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
        {/* Visual effects layers - global */}
        <div className="film-grain" aria-hidden="true" />
        <div className="scanlines" aria-hidden="true" />
        
        {/* Content */}
        {children}
      </body>
    </html>
  );
}
