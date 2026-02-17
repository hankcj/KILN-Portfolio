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
    <div className={cn('min-h-screen flex flex-col', className)}>
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex justify-between items-center pointer-events-none">
      <a 
        href="/" 
        className="pointer-events-auto font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors duration-150"
      >
        KILN
      </a>
      
      <div className="pointer-events-auto flex items-center gap-8">
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
      className="text-small font-medium text-on-bg-primary hover:text-accent transition-colors duration-150"
    >
      {children}
    </a>
  );
}

function Footer() {
  return (
    <footer className="surface-inverse py-12 px-8">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <p className="text-caption text-on-surface-inverse opacity-60">
          © {new Date().getFullYear()} KILN
        </p>
        <p className="text-caption text-on-surface-inverse opacity-40 font-mono">
          // SYSIN DD *
        </p>
      </div>
    </footer>
  );
}
