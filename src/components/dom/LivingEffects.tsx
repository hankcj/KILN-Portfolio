/**
 * Living Effects Component
 * 
 * Continuous animations that make the site feel like a living, breathing machine.
 * Subtle enough to not be distracting, present enough to feel alive.
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export function LivingEffects() {
  return (
    <>
      <AnimatedGrain />
      <SystemClock />
      <DataStream />
      <AmbientFloat />
    </>
  );
}

// Animated grain that breathes and shifts
function AnimatedGrain() {
  const grainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!grainRef.current) return;

    // Randomly adjust grain opacity for breathing effect
    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(grainRef.current, {
      opacity: 0.03,
      duration: 3,
      ease: 'sine.inOut'
    })
    .to(grainRef.current, {
      opacity: 0.06,
      duration: 4,
      ease: 'sine.inOut'
    })
    .to(grainRef.current, {
      opacity: 0.04,
      duration: 2,
      ease: 'sine.inOut'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={grainRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        opacity: 0.04,
      }}
    />
  );
}

// System clock that updates every second
function SystemClock() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState(0);
  const [memory, setMemory] = useState(45.0);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      // Format: HH:MM:SS | Unix timestamp | Uptime counter
      setTime(now.toISOString().split('T')[1].split('.')[0]);
      setUptime(prev => prev + 1);
      // Slowly vary memory usage
      setMemory(40 + Math.random() * 20);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed bottom-32 left-8 z-40 font-mono text-system text-on-surface-muted/50 pointer-events-none hidden lg:block">
        <div>SYS_TIME: --:--:--</div>
        <div>UPTIME: 000000s</div>
        <div>MEM_USAGE: --.-%</div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-32 left-8 z-40 font-mono text-system text-on-surface-muted/50 pointer-events-none hidden lg:block">
      <div>SYS_TIME: {time}</div>
      <div>UPTIME: {uptime.toString().padStart(6, '0')}s</div>
      <div>MEM_USAGE: {memory.toFixed(1)}%</div>
    </div>
  );
}

// Random data stream at bottom of screen
function DataStream() {
  const [mounted, setMounted] = useState(false);
  const [lines, setLines] = useState<string[]>([
    '// RENDER_INIT [OK]',
    'C  LOAD_START [ACTV]',
    '>> SYNC_PROC [DONE]',
  ]);

  useEffect(() => {
    setMounted(true);
    
    const generateLine = () => {
      const prefixes = ['//', 'C', '>>', '<<', '**'];
      const actions = ['RENDER', 'LOAD', 'SYNC', 'PROC', 'SCAN', 'INDEX'];
      const states = ['OK', 'WAIT', 'DONE', 'ACTV', 'PEND'];
      
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const state = states[Math.floor(Math.random() * states.length)];
      const id = Math.random().toString(36).substr(2, 6).toUpperCase();
      
      return `${prefix} ${action}_${id} [${state}]`;
    };

    // Update random line every few seconds
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev];
        const idx = Math.floor(Math.random() * newLines.length);
        newLines[idx] = generateLine();
        return newLines;
      });
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, []);

  // Don't render dynamic content until mounted
  if (!mounted) {
    return (
      <div className="fixed bottom-32 right-8 z-40 font-mono text-system text-on-surface-muted/50 pointer-events-none hidden lg:block text-right">
        <div style={{ opacity: 0.3 }}>{'// RENDER_INIT [OK]'}</div>
        <div style={{ opacity: 0.5 }}>C  LOAD_START [ACTV]</div>
        <div style={{ opacity: 0.7 }}>{'>>'} SYNC_PROC [DONE]</div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-32 right-8 z-40 font-mono text-system text-on-surface-muted/50 pointer-events-none hidden lg:block text-right">
      {lines.map((line, i) => (
        <div 
          key={i} 
          className="transition-opacity duration-500"
          style={{ opacity: 0.3 + (i * 0.2) }}
        >
          {line}
        </div>
      ))}
    </div>
  );
}

// Ambient floating elements
function AmbientFloat() {
  const orbRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!orbRef.current || !gridRef.current) return;

    // Slow orb breathing
    gsap.to(orbRef.current, {
      scale: 1.1,
      opacity: 0.08,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // Subtle grid shift
    gsap.to(gridRef.current, {
      backgroundPosition: '50px 50px',
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    return () => {
      gsap.killTweensOf([orbRef.current, gridRef.current]);
    };
  }, []);

  return (
    <>
      {/* Breathing gradient orb */}
      <div 
        ref={orbRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none z-0"
      />
      
      {/* Subtle moving grid */}
      <div 
        ref={gridRef}
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(250, 246, 240, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(250, 246, 240, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </>
  );
}

// Glitch text effect for system elements
export function GlitchText({ children, className = '' }: { children: string; className?: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState(children);
  const [mounted, setMounted] = useState(false);
  const originalText = children;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789//C_*';
    
    const glitch = () => {
      // Randomly decide to glitch
      if (Math.random() > 0.7) {
        let iterations = 0;
        const maxIterations = 3;
        
        const interval = setInterval(() => {
          setDisplayText(
            originalText
              .split('')
              .map((char, index) => {
                if (char === ' ') return ' ';
                if (index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('')
          );
          
          iterations++;
          if (iterations > maxIterations) {
            clearInterval(interval);
            setDisplayText(originalText);
          }
        }, 50);
      }
    };

    // Glitch every few seconds
    const interval = setInterval(glitch, 3000 + Math.random() * 5000);

    return () => clearInterval(interval);
  }, [mounted, originalText]);

  // Render original text on server, glitched text on client after mount
  return (
    <span ref={textRef} className={className}>
      {mounted ? displayText : originalText}
    </span>
  );
}

// Mouse follower for subtle parallax
export function MouseParallax({ children, intensity = 0.02 }: { children: React.ReactNode; intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const x = (e.clientX - window.innerWidth / 2) * intensity;
      const y = (e.clientY - window.innerHeight / 2) * intensity;
      
      gsap.to(ref.current, {
        x,
        y,
        duration: 1,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return <div ref={ref}>{children}</div>;
}
