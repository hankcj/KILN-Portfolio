'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { useSound } from '@/components/dom/SoundProvider';
import StarsBackground from '@/components/dom/StarsBackground';

interface NavItem {
  label: string;
  href: string;
  type: 'route';
}

const routeItems: NavItem[] = [
  { label: 'Object archive', href: '/work', type: 'route' },
  { label: 'Signal', href: '/signal', type: 'route' },
  { label: 'Available work', href: '/services', type: 'route' },
  { label: 'System', href: '/system', type: 'route' },
  { label: 'Tools', href: '/shop', type: 'route' },
  { label: 'Project', href: '/project', type: 'route' },
  { label: 'Make contact', href: '/intake', type: 'route' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [dockPointerX, setDockPointerX] = useState<number | null>(null);
  const [itemCenters, setItemCenters] = useState<number[]>([]);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { play } = useSound();

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine)');
    const update = () => setIsFinePointer(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isOpen && !isClosing && overlayRef.current) {
      gsap.killTweensOf(overlayRef.current);
      gsap.set(overlayRef.current, { opacity: 0 });
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(
        '.horizon-item',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.04, ease: 'power3.out', delay: 0.08 },
      );
      play('open');
    }
  }, [isOpen, isClosing, play]);

  const shouldRenderOverlay = isOpen || isClosing;

  const requestClose = useCallback(() => {
    if (!shouldRenderOverlay || isClosing) return;

    const overlay = overlayRef.current;
    if (!overlay) {
      setIsOpen(false);
      setIsClosing(false);
      return;
    }

    setIsClosing(true);
    gsap.killTweensOf(overlay);
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        setIsOpen(false);
        setIsClosing(false);
      },
    });
  }, [isClosing, shouldRenderOverlay]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        requestClose();
        return;
      }

      if (!railRef.current) return;
      if (event.key === 'ArrowRight') {
        railRef.current.scrollBy({ left: 140, behavior: 'smooth' });
      }
      if (event.key === 'ArrowLeft') {
        railRef.current.scrollBy({ left: -140, behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, isClosing, requestClose]);

  const measureItemCenters = useCallback(() => {
    const centers = itemRefs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      return rect.left + rect.width / 2;
    });
    setItemCenters(centers);
  }, []);

  useEffect(() => {
    if (!shouldRenderOverlay) {
      return;
    }

    const raf = requestAnimationFrame(() => {
      measureItemCenters();
    });
    window.addEventListener('resize', measureItemCenters);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measureItemCenters);
    };
  }, [shouldRenderOverlay, measureItemCenters]);

  const handleNavClick = (item: NavItem) => {
    play('select');
    requestClose();
    router.push(item.href);
  };

  const handleHomeClick = () => {
    play('select');
    requestClose();
    router.push('/');
  };

  const allItems = routeItems;
  const getItemScale = (index: number, isActive: boolean) => {
    const restingScale = isActive ? 1.08 : 1;
    if (!isFinePointer || dockPointerX === null) return restingScale;

    const center = itemCenters[index];
    if (!center) return restingScale;
    const distance = Math.abs(dockPointerX - center);
    const radius = 220;
    const influence = Math.max(0, 1 - distance / radius);
    const hoverScale = 1 + influence * 0.42;
    return Math.max(restingScale, hoverScale);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-6 right-6 sm:top-8 sm:right-12 z-50 transition-all duration-500 opacity-100"
      >
        <button
          onClick={() => {
            setDockPointerX(null);
            setIsOpen(true);
            setIsClosing(false);
          }}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="horizon-nav-overlay"
          className="px-5 py-2.5 border border-white/20 bg-white/5 backdrop-blur-sm text-[11px] tracking-[0.15em] text-white/80 uppercase hover:bg-white/10 hover:border-white/30 transition-all duration-300"
        >
          Approach
        </button>
      </nav>

      {shouldRenderOverlay && (
        <div
          id="horizon-nav-overlay"
          ref={overlayRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[100]"
          onClick={requestClose}
        >
          <StarsBackground
            className="h-full w-full"
            starColor="rgba(255,255,255,0.85)"
            speed={80}
            factor={0.03}
          >
            <button
              onClick={handleHomeClick}
              aria-label="Return home"
              className="absolute top-6 left-6 sm:top-8 sm:left-12 z-[120] px-4 py-2 border border-white/20 bg-[#10141D]/65 backdrop-blur-sm text-[11px] tracking-[0.2em] text-white/85 uppercase hover:bg-white/10 hover:border-white/35 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10141D]"
            >
              KILN
            </button>

            <button
              onClick={requestClose}
              aria-label="Close navigation"
              className="absolute top-6 right-6 sm:top-8 sm:right-12 z-[120] px-5 py-2.5 border border-white/20 bg-[#10141D]/65 backdrop-blur-sm text-[11px] tracking-[0.15em] text-white/80 uppercase hover:bg-white/10 transition-all duration-300"
            >
              Return
            </button>

            <div className="relative z-10 h-full w-full" onClick={(e) => e.stopPropagation()}>
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[1] pointer-events-none px-4 sm:px-8 lg:px-16">
                <div className="h-[1px] bg-white/25" />
              </div>

              <nav aria-label="Primary navigation" className="relative z-10 h-full w-full flex items-center">
                <div
                  ref={railRef}
                  className="w-full overflow-x-auto overflow-y-visible px-4 sm:px-8 lg:px-16 lg:overflow-visible"
                  onMouseMove={(event) => {
                    if (!isFinePointer) return;
                    setDockPointerX(event.clientX);
                  }}
                  onMouseLeave={() => setDockPointerX(null)}
                >
                  <ul className="flex min-w-max -translate-y-7 items-end gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-6 sm:px-10 lg:px-0 py-8 lg:min-w-0 lg:w-full lg:justify-center">
                    {allItems.map((item, index) => {
                      const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                      const scale = getItemScale(index, isActive);
                      const lift = Math.min(8, (scale - 1) * 28);
                      const textOpacity = isActive ? 1 : Math.min(0.92, 0.36 + (scale - 1) * 1.7);

                      return (
                        <li key={`${item.type}:${item.href}`} className="relative">
                          <button
                            ref={(el) => {
                              itemRefs.current[index] = el;
                            }}
                            onMouseEnter={() => play('hover')}
                            onFocus={(event) => {
                              play('hover');
                              const rect = event.currentTarget.getBoundingClientRect();
                              setDockPointerX(rect.left + rect.width / 2);
                            }}
                            onBlur={() => setDockPointerX(null)}
                            onClick={() => handleNavClick(item)}
                            className="horizon-item group flex flex-col items-center gap-2 px-2 py-3 whitespace-nowrap text-center outline-none transition-[transform,opacity,color] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-1 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#10141D]"
                            style={{
                              transform: `translateY(${-lift}px) scale(${scale})`,
                              opacity: textOpacity,
                            }}
                          >
                            <span
                              className={`text-[8px] tracking-[0.22em] uppercase transition-all duration-500 ${
                                isActive
                                  ? 'text-white/80 opacity-100'
                                  : 'text-white/35 opacity-0 group-hover:opacity-75 group-focus-visible:opacity-75'
                              }`}
                            >
                              {isActive ? 'In view' : 'Surface'}
                            </span>
                            <span
                              className={`text-base sm:text-lg md:text-xl lg:text-2xl font-normal tracking-tight transition-colors duration-500 ${
                                isActive ? 'text-white' : 'text-white/55 group-hover:text-white/90'
                              }`}
                              style={{ fontFamily: 'var(--font-averia), Georgia, serif' }}
                            >
                              {item.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </nav>
            </div>

            <div className="absolute bottom-8 left-8 text-[10px] tracking-[0.2em] text-white/30 uppercase">
              StudioKiln.io / Fixed position
            </div>
            <div className="absolute bottom-8 right-8 text-[10px] tracking-[0.2em] text-white/30 uppercase">
              2026
            </div>
          </StarsBackground>
        </div>
      )}
    </>
  );
}
