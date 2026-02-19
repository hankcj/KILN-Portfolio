/**
 * 404 Error Page
 * 
 * System error aesthetic matching the terminal/machine theme.
 * Maintains immersion with consistent visual language.
 */

'use client';

import { useEffect, useState } from 'react';
import { SimplePageShell } from '@/components/dom/PageShell';
import { GlitchText } from '@/components/dom/LivingEffects';
import { BackLink } from '@/components/dom/TransitionLink';

export default function NotFoundPage() {
  const [mounted, setMounted] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <SimplePageShell
      currentPage="system"
      leftSideText="ERROR_404"
      rightSideText="PAGE_NOT_FOUND"
    >
      <div className="min-h-screen flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 relative">
        {/* Error code display */}
        <div className="text-center relative">
          {/* Status indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="font-mono text-system text-red-400">
              SYSTEM_ERROR
            </span>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>

          {/* Main error code */}
          <h1 
            className={`font-heading text-[8rem] md:text-[12rem] leading-none text-on-bg-primary transition-transform duration-100 ${
              glitchActive ? 'translate-x-1 skew-x-3' : ''
            }`}
            style={{
              textShadow: glitchActive 
                ? '-4px 0 #ff0000, 4px 0 #00ffff' 
                : 'none'
            }}
          >
            404
          </h1>

          {/* Error message */}
          <div className="mt-8 mb-12">
            <p className="font-mono text-system text-on-surface-muted mb-4">
              {'// ERROR_DETAILS'}
            </p>
            <p className="font-heading text-h2 text-on-bg-secondary mb-2">
              {mounted ? (
                <GlitchText>Page Not Found</GlitchText>
              ) : (
                'Page Not Found'
              )}
            </p>
            <p className="text-body text-on-bg-tertiary max-w-md mx-auto">
              The requested resource could not be located in the system. 
              It may have been moved, deleted, or never existed.
            </p>
          </div>

          {/* Technical details */}
          <div className="border border-border-muted bg-bg-secondary p-6 max-w-lg mx-auto mb-12">
            <div className="font-mono text-system text-on-surface-muted text-left space-y-2">
              <div className="flex justify-between">
                <span>ERROR_CODE:</span>
                <span className="text-red-400">ERR_RESOURCE_NOT_FOUND</span>
              </div>
              <div className="flex justify-between">
                <span>SEVERITY:</span>
                <span className="text-yellow-400">NON_CRITICAL</span>
              </div>
              <div className="flex justify-between">
                <span>TIMESTAMP:</span>
                <span className="text-on-bg-secondary">
                  {mounted ? new Date().toISOString() : '---'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>REQUEST_ID:</span>
                <span className="text-on-bg-secondary font-mono">
                  {mounted ? `REQ_${Math.random().toString(36).substr(2, 9).toUpperCase()}` : '---'}
                </span>
              </div>
            </div>
          </div>

          {/* Recovery actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <BackLink
              href="/"
              className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-on-accent font-mono text-system hover:bg-accent-hover transition-colors"
            >
              <span>← RETURN_TO_ORIGIN</span>
            </BackLink>
            <BackLink
              href="/work"
              className="inline-flex items-center gap-3 px-6 py-3 border border-border-custom text-on-bg-primary font-mono text-system hover:bg-bg-secondary transition-colors"
            >
              <span>BROWSE_OUTPUTS →</span>
            </BackLink>
          </div>

          {/* Bottom hint */}
          <p className="mt-12 font-mono text-caption text-on-surface-muted">
            If you believe this is a system error, please report to{' '}
            <a href="mailto:hello@kiln.studio" className="text-accent hover:text-on-bg-primary transition-colors">
              system@kiln.studio
            </a>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-8 left-8 font-mono text-system text-on-surface-muted/30 hidden lg:block">
          <div>ERR_REF: 404</div>
          <div>STATUS: TERMINATED</div>
        </div>

        <div className="absolute bottom-8 right-8 font-mono text-system text-on-surface-muted/30 text-right hidden lg:block">
          <div>RECOVERY_MODE</div>
          <div>AWAITING_INPUT</div>
        </div>
      </div>
    </SimplePageShell>
  );
}
