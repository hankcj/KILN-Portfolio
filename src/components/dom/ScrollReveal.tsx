/**
 * Scroll Reveal Component
 * 
 * Reveals content as user scrolls into view.
 * Uses GSAP ScrollTrigger for performant scroll-linked animations.
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DURATION, EASE, DISTANCE, STAGGER } from '@/lib/animations';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Animation direction
   */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /**
   * Delay before animation starts (in seconds)
   */
  delay?: number;
  /**
   * Distance to travel (in pixels)
   */
  distance?: number;
  /**
   * Duration of animation (in seconds)
   */
  duration?: number;
  /**
   * Easing function
   */
  ease?: string;
  /**
   * Trigger point: 'top center' means when top of element hits center of viewport
   */
  start?: string;
  /**
   * Once = true: only animate first time
   * Once = false: animate every time element enters viewport
   */
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  distance = DISTANCE.small,
  duration = DURATION.slow,
  ease = EASE.enter,
  start = 'top 85%',
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    // Set initial state
    const getInitialTransform = () => {
      switch (direction) {
        case 'up': return { y: distance };
        case 'down': return { y: -distance };
        case 'left': return { x: distance };
        case 'right': return { x: -distance };
        case 'none': return {};
      }
    };

    gsap.set(element, {
      opacity: 0,
      ...getInitialTransform(),
    });

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      once,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          x: 0,
          y: 0,
          duration,
          delay,
          ease,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [direction, delay, distance, duration, ease, start, once]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Stagger reveal for lists of items
 */
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Stagger delay between items (in seconds)
   */
  stagger?: number;
  /**
   * Direction of animation
   */
  direction?: 'up' | 'down' | 'left' | 'right';
  /**
   * Starting position for animation trigger
   */
  start?: string;
  /**
   * Child selector for stagger target
   */
  childSelector?: string;
}

export function StaggerReveal({
  children,
  className = '',
  stagger = STAGGER.normal,
  direction = 'up',
  start = 'top 85%',
  childSelector = '> *',
}: StaggerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    // Handle '> *' selector which needs :scope prefix for querySelectorAll
    const selector = childSelector === '> *' ? ':scope > *' : childSelector;
    const children = container.querySelectorAll(selector);

    if (children.length === 0) return;

    // Set initial state
    const getInitialTransform = () => {
      switch (direction) {
        case 'up': return { y: DISTANCE.small };
        case 'down': return { y: -DISTANCE.small };
        case 'left': return { x: DISTANCE.small };
        case 'right': return { x: -DISTANCE.small };
      }
    };

    gsap.set(children, {
      opacity: 0,
      ...getInitialTransform(),
    });

    // Create scroll trigger
    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: DURATION.slow,
          stagger,
          ease: EASE.enter,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [stagger, direction, start, childSelector]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/**
 * Text reveal - word by word or line by line
 */
interface TextRevealProps {
  children: string;
  className?: string;
  /**
   * Split by 'words' or 'lines'
   */
  splitBy?: 'words' | 'lines';
  /**
   * Stagger between words/lines
   */
  stagger?: number;
  /**
   * Starting position for animation trigger
   */
  start?: string;
}

export function TextReveal({
  children,
  className = '',
  splitBy = 'words',
  stagger = 0.02,
  start = 'top 80%',
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const items = container.querySelectorAll('.reveal-item');

    if (items.length === 0) return;

    gsap.set(items, { opacity: 0, y: 10 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger,
          ease: EASE.enter,
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [stagger, start]);

  const splitText = () => {
    if (splitBy === 'words') {
      return children.split(' ').map((word, i) => (
        <span key={i} className="reveal-item inline-block mr-[0.25em]">
          {word}
        </span>
      ));
    }
    return children.split('\n').map((line, i) => (
      <span key={i} className="reveal-item block">
        {line}
      </span>
    ));
  };

  return (
    <div ref={containerRef} className={className}>
      {splitText()}
    </div>
  );
}

/**
 * Parallax scroll effect
 */
interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Speed of parallax: 0.5 = half speed, 1 = normal, 2 = double
   */
  speed?: number;
}

export function Parallax({ children, className = '', speed = 0.5 }: ParallaxProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const yPos = self.progress * 100 * speed;
        gsap.set(element, { y: yPos });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
