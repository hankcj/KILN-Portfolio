'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { motionTokens, prefersReducedMotionQuery } from '@/lib/motion';

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia(prefersReducedMotionQuery).matches) {
      setVisible(true);
      return;
    }

    setVisible(false);
    const frame = requestAnimationFrame(() => {
      setVisible(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${motionTokens.durationMs.base}ms ${motionTokens.easing.enter}`,
      }}
    >
      {children}
    </div>
  );
}
