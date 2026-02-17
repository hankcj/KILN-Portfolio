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
  variant?: 'display' | 'display-lg' | 'display-xl' | 'default';
}

export function Heading({ 
  as: Component = 'h2', 
  children, 
  className,
  variant = 'default'
}: HeadingProps) {
  const sizeClasses = {
    'display-xl': 'text-display-xl',
    'display-lg': 'text-display-lg',
    'display': 'text-display',
    'h1': 'text-h1',
    'h2': 'text-h2',
    'h3': 'text-h3',
    'h4': 'text-h4',
    'h5': 'text-h5',
    'h6': 'text-h6',
    'default': {
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4',
      h5: 'text-h5',
      h6: 'text-h6',
    }[Component]
  };

  const displayVariants = ['display-xl', 'display-lg', 'display'];
  const isDisplay = displayVariants.includes(variant);

  return (
    <Component 
      className={cn(
        'font-heading text-on-bg-primary',
        isDisplay ? variant : sizeClasses[Component],
        className
      )}
    >
      {children}
    </Component>
  );
}

interface TextProps {
  as?: 'p' | 'span' | 'div';
  variant?: 'body' | 'small' | 'caption';
  muted?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Text({ 
  as: Component = 'p', 
  variant = 'body', 
  muted = false,
  children, 
  className 
}: TextProps) {
  const variantClasses = {
    body: 'text-body leading-relaxed',
    small: 'text-small leading-relaxed',
    caption: 'text-caption leading-relaxed',
  };

  return (
    <Component 
      className={cn(
        'font-body',
        variantClasses[variant],
        muted ? 'text-on-bg-tertiary' : 'text-on-bg-secondary',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface SystemTextProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'jcl' | 'fortran' | 'assembly';
  prefix?: boolean;
}

export function SystemText({ 
  children, 
  className, 
  variant = 'fortran',
  prefix = true 
}: SystemTextProps) {
  const prefixes = {
    jcl: '//',
    fortran: 'C  ',
    assembly: '  ',
  };

  return (
    <span 
      className={cn(
        'font-mono text-system text-on-surface-muted uppercase',
        className
      )}
    >
      {prefix && prefixes[variant]}{children}
    </span>
  );
}

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export function Label({ children, className }: LabelProps) {
  return (
    <span className={cn(
      'font-mono text-system text-on-surface-muted uppercase tracking-widest',
      className
    )}>
      {children}
    </span>
  );
}
