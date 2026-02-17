/**
 * DOM Layout Component
 * 
 * Main layout wrapper for DOM content.
 * Handles navigation and structure.
 */

'use client';

import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <div className={cn('min-h-screen flex flex-col relative z-10', className)}>
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 md:px-8 py-6 flex justify-between items-center">
      <a 
        href="/" 
        className="font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors duration-150 tracking-tight"
      >
        KILN
      </a>
      
      <div className="flex items-center gap-8">
        <NavLink href="/work">Work</NavLink>
        <NavLink href="/signal">Signal</NavLink>
        <NavLink href="/system">System</NavLink>
      </div>
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-small font-medium text-on-bg-secondary hover:text-on-bg-primary transition-colors duration-150 uppercase tracking-widest"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border-custom py-12 px-6 md:px-8 bg-bg-primary">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-caption text-on-surface-muted font-mono">
          // SYSIN DD *
        </p>
        <p className="text-caption text-on-surface-muted">
          © {new Date().getFullYear()} KILN
        </p>
      </div>
    </footer>
  );
}
