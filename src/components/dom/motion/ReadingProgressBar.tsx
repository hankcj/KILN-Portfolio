'use client';

import { useEffect, useState } from 'react';
import { motionTokens } from '@/lib/motion';

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.max(0, Math.min(1, scrollTop / docHeight)));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-[2px] bg-white/10">
      <div
        className="h-full bg-[#3A7D8C]"
        style={{
          width: `${progress * 100}%`,
          transition: `width ${motionTokens.durationMs.fast}ms ${motionTokens.easing.standard}`,
        }}
      />
    </div>
  );
}
