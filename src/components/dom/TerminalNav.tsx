/**
 * Terminal Navigation
 * 
 * A command-line interface for site navigation.
 * Typewriter effect reveals options on activation.
 * Keyboard and mouse accessible.
 */

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useAppStore } from '@/lib/store';
import { 
  initAudio, 
  loadSoundPreference, 
  toggleSound, 
  isSoundEnabled,
  playKeystroke,
  playNavOpen,
  playSelect,
  playHover 
} from '@/lib/sound';

interface NavItem {
  key: string;
  label: string;
  path: string;
  prefix: string;
  description?: string;
  external?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { key: '1', label: 'home', path: '/', prefix: '[K]', description: 'Return to origin' },
  { key: '2', label: 'outputs', path: '/work', prefix: 'C', description: 'Portfolio archive' },
  { key: '3', label: 'signal', path: '/signal', prefix: 'C', description: 'Transmission log' },
  { key: '4', label: 'services', path: '/services', prefix: 'C', description: 'Available for hire' },
  { key: '5', label: 'project', path: '/project', prefix: '>>', description: 'External system', external: true },
  { key: '6', label: 'system', path: '/system', prefix: '//', description: 'Diagnostics & info' },
  // Note: intake is hidden from nav but accessible from Services page
];

const BOOT_SEQUENCE = [
  '// INIT_NAV_PROTOCOL',
  'C  MOUNT_FILESYSTEM',
  '>> LOAD_ROUTINES...',
  '** READY',
  '',
  'SELECT_DESTINATION:',
  '',
];

export function TerminalNav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [typedCommands, setTypedCommands] = useState<string[]>([]);
  const [showNavItems, setShowNavItems] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundMounted, setSoundMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const { startTransition, endTransition } = useAppStore();

  // Load sound preference on mount
  useEffect(() => {
    setSoundOn(loadSoundPreference());
    setSoundMounted(true);
  }, []);

  // Boot sequence typewriter effect
  useEffect(() => {
    if (!isOpen || !isBooting) return;

    // Play nav open sound
    playNavOpen();

    const typeLine = (index: number) => {
      if (index >= BOOT_SEQUENCE.length) {
        // Boot complete, show nav items with delay
        setIsBooting(false);
        setTimeout(() => setShowNavItems(true), 100);
        return;
      }

      setCurrentLine(index);
      
      // Simulate typing - FASTER (20ms per char, 100ms between lines)
      const text = BOOT_SEQUENCE[index];
      let charIndex = 0;
      
      const typeChar = () => {
        if (charIndex <= text.length) {
          setBootLines(prev => {
            const newLines = [...prev];
            newLines[index] = text.slice(0, charIndex);
            return newLines;
          });
          // Play keystroke sound occasionally
          if (charIndex % 3 === 0) {
            playKeystroke();
          }
          charIndex++;
          setTimeout(typeChar, 15);
        } else {
          setTimeout(() => typeLine(index + 1), 80);
        }
      };

      typeChar();
    };

    // Clear and start
    setBootLines(new Array(BOOT_SEQUENCE.length).fill(''));
    setTimeout(() => typeLine(0), 100);

  }, [isOpen, isBooting]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '6') {
        // Direct number selection
        const index = parseInt(e.key) - 1;
        if (index < NAV_ITEMS.length) {
          navigateTo(NAV_ITEMS[index]);
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % NAV_ITEMS.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + NAV_ITEMS.length) % NAV_ITEMS.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        navigateTo(NAV_ITEMS[selectedIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeNav();
      } else if (e.key.toLowerCase() === 'n') {
        // 'n' to toggle nav when closed
        if (!isOpen) {
          openNav();
        }
      } else if (e.key.toLowerCase() === 's') {
        // 's' to toggle sound
        e.preventDefault();
        handleToggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // navigateTo is defined later in the component; stable in practice
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedIndex]);

  // Animate overlay open/close
  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.fromTo(contentRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power3.out' }
      );
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in'
      });
    }
  }, [isOpen]);

  // Detect current page and set selected index
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const path = window.location.pathname;
    const currentIndex = NAV_ITEMS.findIndex(item => {
      if (item.path === '/') return path === '/';
      return path.startsWith(item.path);
    });
    
    if (currentIndex >= 0) {
      setSelectedIndex(currentIndex);
    }
  }, []);

  const openNav = () => {
    initAudio(); // Initialize audio on user interaction
    setIsOpen(true);
    setIsBooting(true);
    setBootLines([]);
    setCurrentLine(0);
  };

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const closeNav = () => {
    setIsOpen(false);
    setShowNavItems(false);
    setTimeout(() => {
      setIsBooting(false);
      setBootLines([]);
    }, 300);
  };

  // Animate nav items when they appear
  useEffect(() => {
    if (!showNavItems || !navItemsRef.current) return;
    
    const items = navItemsRef.current.querySelectorAll('.nav-item');
    // Set initial state immediately to prevent flash
    gsap.set(items, { opacity: 0, x: -20 });
    
    gsap.to(items,
      { 
        opacity: 1, 
        x: 0, 
        duration: 0.4, 
        stagger: 0.06,
        ease: 'power3.out'
      }
    );
  }, [showNavItems]);

  const navigateTo = (item: NavItem) => {
    playSelect();
    
    // Add command line
    setTypedCommands(prev => [...prev, `cd ${item.label}`]);
    
    setTimeout(() => {
      if (item.external) {
        // External links: open immediately
        window.open(item.path, '_blank', 'noopener,noreferrer');
        closeNav();
      } else {
        // Internal links: close nav first, then start transition
        closeNav();
        
        const targetPage = item.label === 'home' ? 'home' : item.label;
        
        // Start transition in Zustand (shows MicroficheTransition)
        startTransition(targetPage);
        
        // Persist for next page
        const { startPageTransition } = require('@/lib/transition');
        startPageTransition(targetPage);
        
        // Navigate after transition duration
        setTimeout(() => {
          window.location.href = item.path;
        }, 2500);
      }
    }, 150);
  };

  return (
    <>
      {/* Nav Trigger Button */}
      <button
        onClick={openNav}
        className="fixed top-8 right-8 z-50 font-mono text-system text-accent hover:text-on-bg-primary transition-colors group bg-accent/10 border border-accent/30 px-3 py-2 hover:bg-accent hover:border-accent"
        aria-label="Open navigation"
        title="Press 'N' to open"
      >
        <span className="group-hover:animate-pulse">{'>'}</span>
        <span className="ml-1">_</span>
      </button>

      {/* Keyboard hint (desktop) */}
      <div className="fixed top-8 right-24 z-50 hidden lg:block">
        <span className="font-mono text-system text-accent/70 text-[10px] bg-bg-primary/80 px-1.5 py-1 border border-accent/20">
          [N]
        </span>
      </div>

      {/* Terminal Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] bg-bg-primary/95 backdrop-blur-sm opacity-0 pointer-events-none"
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={(e) => {
          if (e.target === overlayRef.current) closeNav();
        }}
      >
        <div
          ref={contentRef}
          className="h-full flex flex-col justify-center px-8 md:px-16 lg:px-24"
        >
          <div className="max-w-3xl mx-auto w-full">
            
            {/* Terminal Header */}
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border-muted">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-accent/50" />
                <div className="w-3 h-3 rounded-full bg-border-custom" />
                <div className="w-3 h-3 rounded-full bg-border-custom" />
              </div>
              <span className="font-mono text-system text-on-surface-muted">
                NAV_TERMINAL_V1.0
              </span>
              
              {/* Sound toggle */}
              <button
                onClick={handleToggleSound}
                onMouseEnter={() => playHover()}
                className={`ml-auto font-mono text-system text-[10px] px-2 py-1 border transition-colors ${
                  soundOn 
                    ? 'border-accent text-accent bg-accent/10' 
                    : 'border-border-muted text-on-surface-muted/50 hover:border-accent/50'
                }`}
                title={soundOn ? 'Sound ON - Click to mute' : 'Sound OFF - Click to enable'}
                suppressHydrationWarning
              >
                {soundMounted ? (soundOn ? 'SOUND:ON' : 'SOUND:OFF') : 'SOUND:--'}
              </button>
              
              <span className="font-mono text-system text-on-surface-muted/50 hidden sm:block">
                Press [ESC] to close
              </span>
            </div>

            {/* Boot Sequence / Nav Items */}
            <div className="font-mono text-system space-y-1 min-h-[400px]">
              
              {/* Boot lines */}
              {BOOT_SEQUENCE.map((line, i) => (
                <div
                  key={`boot-${i}`}
                  className={`h-5 ${i > currentLine ? 'opacity-0' : 'opacity-100'} transition-opacity`}
                  style={{ color: i < 4 ? '#8A8580' : '#FAF6F0' }}
                >
                  {bootLines[i] || ''}
                  {i === currentLine && isBooting && (
                    <span className="animate-pulse">_</span>
                  )}
                </div>
              ))}

              {/* Navigation Items */}
              {showNavItems && (
                <>
                  <div ref={navItemsRef} className="mt-8 space-y-2">
                    {NAV_ITEMS.map((item, index) => (
                      <button
                        key={item.key}
                        onClick={() => navigateTo(item)}
                        onMouseEnter={() => {
                          setSelectedIndex(index);
                          playHover();
                        }}
                        className={`nav-item w-full text-left py-3 px-4 flex items-center gap-4 transition-all duration-150 opacity-0 ${
                          selectedIndex === index
                            ? 'bg-accent/10 border-l-2 border-accent'
                            : 'hover:bg-bg-secondary border-l-2 border-transparent'
                        }`}
                      >
                        <span className="text-on-surface-muted w-6">{item.key}</span>
                        <span className={selectedIndex === index ? 'text-accent' : 'text-on-surface-muted'}>
                          {item.prefix}
                        </span>
                        <span className={`flex-1 ${selectedIndex === index ? 'text-on-bg-primary' : 'text-on-bg-secondary'}`}>
                          {item.label}
                        </span>
                        <span className="text-on-surface-muted/50 hidden sm:block">
                          {item.description}
                        </span>
                        {item.external && (
                          <span className="text-on-surface-muted">↗</span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Bottom section - fixed height container so nav items don't shift */}
                  <div className="mt-8 min-h-[120px]">
                    {/* Typed commands history */}
                    {typedCommands.length > 0 && (
                      <div className="pt-4 border-t border-border-muted space-y-1">
                        {typedCommands.map((cmd, i) => (
                          <div key={i} className="text-accent/50">
                            {`> ${cmd}`}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Input prompt */}
                    <div className="mt-4 flex items-center gap-2 text-accent">
                      <span>{'>'}</span>
                      <span className="animate-pulse">_</span>
                    </div>
                  </div>

                  {/* Help text - stays at bottom */}
                  <div className="mt-8 pt-4 border-t border-border-muted text-on-surface-muted/50 text-[10px] space-y-1">
                    <div>{'// NAVIGATION_CONTROLS'}</div>
                    <div>[1-6] Select directly | [↑↓] Navigate | [ENTER] Confirm | [ESC] Cancel | [S] Toggle Sound</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
