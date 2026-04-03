'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { PROCESS_PIN_DISTANCE, PROCESS_PIN_SCRUB } from '@/lib/scrollChapters';

gsap.registerPlugin(ScrollTrigger);

const CENTER_INDEX = 2;
const CENTER_VIDEO_SRC = '/assets/Earth_atmosphere_and_202603310909.mp4';

const gridImages = [
  { src: '/assets/Cluster.png', alt: 'Eye detail', area: 'a' },
  { src: '/assets/Moon 3.png', alt: 'Hand detail', area: 'b' },
  { src: '/assets/Horizon.png', alt: 'Fog forest', area: 'c' },
  { src: '/assets/Ocean Flow.png', alt: 'Texture study', area: 'd' },
  { src: '/assets/Underwater.png', alt: 'Portrait crop', area: 'e' },
  { src: '/assets/Horizon 2.png', alt: 'Glass macro', area: 'f' },
  { src: '/assets/Fog.png', alt: 'Green blur', area: 'g' },
];

const placeholderArticles = [
  {
    slug: 'the-competence-floor',
    title: 'The Competence Floor',
    excerpt: 'What the floor means for the work you do and the standards you keep.',
    date: 'Mar 2026',
    readTime: '15 min',
    category: 'Essay',
  },
  {
    slug: 'life-without-friction',
    title: 'Life Without Friction',
    excerpt: 'How ease erodes ownership, memory, and gratitude.',
    date: 'Feb 2026',
    readTime: '20 min',
    category: 'Essay',
  },
  {
    slug: 'built-to-count',
    title: 'Built to Count',
    excerpt: 'Why modern work cannot feel good.',
    date: 'Jan 2026',
    readTime: '19 min',
    category: 'Essay',
  },
];

export default function GridSignal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const expandedRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const signalRef = useRef<HTMLDivElement>(null);
  const refreshRafRef = useRef<number | null>(null);
  const geometryRef = useRef({
    startX: 0,
    startY: 0,
    targetX: 0,
    targetY: 0,
    targetScale: 1,
    tileWidth: 0,
    tileHeight: 0,
  });
  const [isMobile, setIsMobile] = useState(false);
  const collagePadding = isMobile ? 6 : 8;
  const collageGap = isMobile ? 6 : 8;

  const requestGeometryRefresh = useCallback(() => {
    if (refreshRafRef.current !== null) return;
    refreshRafRef.current = requestAnimationFrame(() => {
      refreshRafRef.current = null;
      ScrollTrigger.refresh();
    });
  }, []);

  const syncStageGeometry = useCallback(() => {
    const section = sectionRef.current;
    const expanded = expandedRef.current;
    const centerTile = imageRefs.current[CENTER_INDEX];
    if (!section || !expanded || !centerTile) return;

    const sectionRect = section.getBoundingClientRect();
    const tileRect = centerTile.getBoundingClientRect();
    if (tileRect.width <= 0 || tileRect.height <= 0 || sectionRect.width <= 0 || sectionRect.height <= 0) {
      return;
    }

    const startX = tileRect.left - sectionRect.left;
    const startY = tileRect.top - sectionRect.top;
    const targetScale = Math.max(sectionRect.width / tileRect.width, sectionRect.height / tileRect.height);
    const targetX = (sectionRect.width - tileRect.width * targetScale) / 2;
    const targetY = (sectionRect.height - tileRect.height * targetScale) / 2;

    geometryRef.current = {
      startX,
      startY,
      targetX,
      targetY,
      targetScale,
      tileWidth: tileRect.width,
      tileHeight: tileRect.height,
    };

    gsap.set(expanded, {
      x: startX,
      y: startY,
      width: tileRect.width,
      height: tileRect.height,
      scale: 1,
      opacity: 0,
      transformOrigin: 'top left',
    });
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(
    () => () => {
      if (refreshRafRef.current !== null) {
        cancelAnimationFrame(refreshRafRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const collage = collageRef.current;
    const expanded = expandedRef.current;
    const overlay = overlayRef.current;
    const signal = signalRef.current;
    const centerTile = imageRefs.current[CENTER_INDEX] ?? null;
    if (!section || !stage || !collage || !expanded || !overlay || !signal || !centerTile) return;

    const ctx = gsap.context(() => {
      imageRefs.current.forEach((img) => {
        if (!img) return;
        gsap.set(img, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: '50% 50%',
          borderRadius: isMobile ? 10 : 12,
        });
      });

      gsap.set(stage, { opacity: 1 });
      gsap.set(collage, { opacity: 1, gap: collageGap, padding: collagePadding });
      gsap.set(expanded, { opacity: 0 });
      gsap.set(overlay, { opacity: 0 });
      syncStageGeometry();

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: PROCESS_PIN_DISTANCE,
          pin: true,
          scrub: PROCESS_PIN_SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.addEventListener('refreshInit', syncStageGeometry);

      tl.to({}, { duration: 0.2 });

      tl.to(
        expanded,
        {
          opacity: 1,
          duration: 0.01,
          ease: 'none',
        },
        0.22,
      );
      tl.to(imageRefs.current[CENTER_INDEX], { opacity: 0, duration: 0.12, ease: 'power2.out' }, 0.22);

      tl.to(
        expanded,
        {
          x: () => geometryRef.current.targetX,
          y: () => geometryRef.current.targetY,
          scale: () => geometryRef.current.targetScale,
          duration: 0.34,
          ease: 'power3.inOut',
        },
        0.22,
      );
      tl.to(overlay, { opacity: 0.6, duration: 0.16, ease: 'power2.out' }, 0.56);

      const header = signal.querySelector('.signal-header');
      const cards = signal.querySelectorAll('.article-card');
      const viewAll = signal.querySelector('.view-all');

      if (header) {
        tl.fromTo(
          header,
          { y: 42, opacity: 0, filter: 'blur(5px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.15, ease: 'power2.out' },
          0.68,
        );
      }

      cards.forEach((card, i) => {
        tl.fromTo(
          card,
          { y: 34, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.14, ease: 'power2.out' },
          0.74 + i * 0.05,
        );
      });

      if (viewAll) {
        tl.fromTo(
          viewAll,
          { opacity: 0 },
          { opacity: 1, duration: 0.12, ease: 'power2.out' },
          0.92,
        );
      }
    }, section);

    const onResize = () => requestGeometryRefresh();
    window.addEventListener('resize', onResize);
    const observer = new ResizeObserver(() => requestGeometryRefresh());
    observer.observe(section);
    observer.observe(centerTile);
    observer.observe(stage);

    return () => {
      window.removeEventListener('resize', onResize);
      observer.disconnect();
      ScrollTrigger.removeEventListener('refreshInit', syncStageGeometry);
      ctx.revert();
    };
  }, [requestGeometryRefresh, syncStageGeometry, isMobile, collageGap, collagePadding]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full h-screen bg-[#13161F] overflow-hidden"
    >
      <div
        ref={stageRef}
        className="absolute inset-0 z-[4] will-change-transform"
      >
        <div
          ref={collageRef}
          className="absolute inset-0 grid h-full w-full"
          style={{
            gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr 1fr',
            gridTemplateRows: isMobile ? '0.9fr 0.9fr 1fr 0.9fr' : '1fr 1fr 1fr',
            gridTemplateAreas: isMobile
              ? `
                "a b"
                "d e"
                "c c"
                "f g"
              `
              : `
                "a a b b"
                "d c c e"
                "f f g g"
              `,
            gap: `${collageGap}px`,
            padding: `${collagePadding}px`,
          }}
        >
          {gridImages.map((img, index) => (
            <div
              key={img.area}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="relative overflow-hidden"
              style={{ gridArea: img.area }}
            >
              {index === CENTER_INDEX ? (
                <video
                  className="h-full w-full object-cover"
                  src={CENTER_VIDEO_SRC}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={requestGeometryRefresh}
                />
              ) : (
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={isMobile ? '50vw' : '(max-width: 1024px) 50vw, 34vw'}
                  preload={false}
                  className="object-cover"
                  quality={88}
                  onLoad={requestGeometryRefresh}
                />
              )}
              <div className="absolute inset-0 bg-[#13161F]/14" />
            </div>
          ))}
        </div>
      </div>

      <div ref={expandedRef} className="pointer-events-none absolute z-[5] overflow-hidden rounded-[12px]">
        <video
          className="h-full w-full object-cover"
          src={CENTER_VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={requestGeometryRefresh}
        />
      </div>

      <div ref={overlayRef} className="absolute inset-0 bg-[#13161F] opacity-0 z-[6]" />

      <div
        ref={signalRef}
        id="signal"
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <div className="px-6 sm:px-12 lg:px-16 max-w-5xl w-full">
          <div className="signal-header mb-12 sm:mb-16" style={{ opacity: 0 }}>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl text-white font-light mb-4"
              style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
            >
              Signal
            </h2>
            <p className="text-white/50 text-sm sm:text-base max-w-md">
              Essays and notes surfaced from the studio archive.
            </p>
          </div>

          <div className="space-y-4">
            {placeholderArticles.map((article) => (
              <a
                key={article.slug}
                href={`/signal/${article.slug}`}
                className="article-card group block py-6 border-b border-white/10 hover:border-white/20 transition-colors duration-300"
                style={{ opacity: 0 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase">
                        {article.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
                        {article.date}
                      </span>
                    </div>
                    <h3
                      className="text-lg sm:text-xl text-white font-light mb-2 group-hover:text-white/80 transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
                    >
                      {article.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed max-w-xl">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] tracking-[0.15em] text-white/30 uppercase">
                      {article.readTime}
                    </span>
                    <svg
                      className="w-4 h-4 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="view-all mt-12" style={{ opacity: 0 }}>
            <Link
              href="/signal"
              className="group inline-flex items-center gap-4 text-sm tracking-[0.15em] text-white/60 uppercase hover:text-white transition-colors duration-300"
            >
              <span>Signal archive</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
