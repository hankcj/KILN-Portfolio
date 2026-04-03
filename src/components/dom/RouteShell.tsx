'use client';

import { type ReactNode } from 'react';
import { routeThemes, type RouteThemeKey, type RouteTheme } from '@/lib/routeThemes';
import SectionProgressRail from '@/components/dom/motion/SectionProgressRail';
import ReadingProgressBar from '@/components/dom/motion/ReadingProgressBar';

interface RouteShellProps {
  theme: RouteThemeKey;
  children: ReactNode;
  showProgress?: boolean;
  showSections?: boolean;
  className?: string;
}

export default function RouteShell({
  theme,
  children,
  showProgress = false,
  showSections = true,
  className = '',
}: RouteShellProps) {
  const config: RouteTheme = routeThemes[theme];
  const [s0, s1, s2] = config.backgroundStops;

  const hazeGradients = [
    `radial-gradient(circle at ${config.haze.x} ${config.haze.y}, rgba(${config.haze.color}, ${config.haze.opacity}), transparent 55%)`,
    config.haze2
      ? `radial-gradient(circle at ${config.haze2.x} ${config.haze2.y}, rgba(${config.haze2.color}, ${config.haze2.opacity}), transparent 50%)`
      : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden ${className}`}
      style={{ background: `linear-gradient(180deg, ${s0} 0%, ${s1} 45%, ${s2} 100%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{ background: hazeGradients }}
      />

      {showProgress && <ReadingProgressBar />}
      {showSections && config.sections && config.sections.length > 0 && (
        <SectionProgressRail sections={config.sections} />
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
}
