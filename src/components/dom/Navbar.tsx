/**
 * Navbar Component
 * 
 * Minimal, persistent navigation.
 * Part of the Archive/Utility layer.
 * Dark mode styled.
 */

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/work', label: 'Work' },
  { href: '/signal', label: 'Signal' },
  { href: '/system', label: 'System' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 md:px-8 py-6">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <a 
          href="/" 
          className="font-heading text-h4 text-on-bg-primary hover:text-accent transition-colors duration-150 tracking-tight"
        >
          KILN
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-on-bg-primary"
          aria-label="Toggle menu"
        >
          <div className={cn(
            'w-6 h-0.5 bg-current transition-all duration-200',
            isOpen && 'rotate-45 translate-y-2'
          )} />
          <div className={cn(
            'w-6 h-0.5 bg-current mt-1.5 transition-all duration-200',
            isOpen && 'opacity-0'
          )} />
          <div className={cn(
            'w-6 h-0.5 bg-current mt-1.5 transition-all duration-200',
            isOpen && '-rotate-45 -translate-y-2'
          )} />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden fixed inset-0 top-20 bg-bg-primary border-t border-border-custom transition-all duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col items-center gap-8 pt-16">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-heading text-h2 text-on-bg-primary hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </header>
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
