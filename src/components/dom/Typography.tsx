/**
 * Typography Components
 * 
 * Reusable typography components following the design system.
 */

import { cn } from '@/lib/utils';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  children: React.ReactNode;
  className?: string;
}

export function Heading({ as: Component = 'h2', children, className }: HeadingProps) {
  const sizeClasses = {
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'text-h3',
    h4: 'text-h4',
    h5: 'text-h5',
    h6: 'text-h6',
  };

  return (
    <Component className={cn('font-heading', sizeClasses[Component], className)}>
      {children}
    </Component>
  );
}

interface TextProps {
  as?: 'p' | 'span' | 'div';
  variant?: 'body' | 'small' | 'caption';
  children: React.ReactNode;
  className?: string;
}

export function Text({ 
  as: Component = 'p', 
  variant = 'body', 
  children, 
  className 
}: TextProps) {
  const variantClasses = {
    body: 'text-body leading-relaxed',
    small: 'text-small leading-relaxed',
    caption: 'text-caption leading-relaxed',
  };

  return (
    <Component className={cn('font-body', variantClasses[variant], className)}>
      {children}
    </Component>
  );
}

interface SystemTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'jcl' | 'fortran' | 'assembly';
}

export function SystemText({ children, className, variant = 'fortran' }: SystemTextProps) {
  const prefixes = {
    jcl: '//',
    fortran: 'C  ',
    assembly: '  ',
  };

  return (
    <span 
      className={cn(
        'font-mono text-caption text-on-surface-muted uppercase tracking-wider',
        className
      )}
    >
      {prefixes[variant]}{children}
    </span>
  );
}
