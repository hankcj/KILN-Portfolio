'use client';

import { useEffect, useRef } from 'react';

const BLOOM_FORM_ID = 'ekl7z4jypd6mz';
const BLOOM_USER_ID = '2gr9m4o609zy0';
const BLOOM_PROFILE_ID = 'l0zdg2wpx73go';

export default function BloomEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    (window as Record<string, unknown>).bloomSettings = {
      userId: BLOOM_USER_ID,
      profileId: BLOOM_PROFILE_ID,
    };

    let script: HTMLScriptElement | null = null;

    fetch(`https://code.bloom.io/version?t=${Date.now()}`)
      .then((res) => res.text())
      .then((version) => {
        script = document.createElement('script');
        script.async = true;
        script.src = `https://code.bloom.io/widget.js?v=${version}`;
        document.head.appendChild(script);
      })
      .catch(() => {});

    return () => {
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-bloom-form-id={BLOOM_FORM_ID}
      style={{ width: '100%' }}
    />
  );
}
