/**
 * Scene Manager
 * 
 * Global WebGL canvas manager.
 * Handles scene switching, route-based scenes, and quality adaptation.
 * Dark mode optimized.
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { fpsMonitor, getInitialQuality, adaptiveQuality, QualityLevel } from '@/lib/perf';
import { prefersReducedMotion } from '@/lib/motion';
import { EntranceScene } from './Scenes/EntranceScene';

interface SceneManagerProps {
  children?: React.ReactNode;
}

export function SceneManager({ children }: SceneManagerProps) {
  const { 
    webglQuality, 
    setWebglQuality, 
    reducedMotion, 
    setReducedMotion 
  } = useAppStore();

  // Initialize quality and motion preferences
  useEffect(() => {
    // Check reduced motion preference
    const hasReducedMotion = prefersReducedMotion();
    setReducedMotion(hasReducedMotion);

    // Set initial quality
    const initialQuality = getInitialQuality();
    setWebglQuality(initialQuality);

    // Start FPS monitoring for adaptive quality
    if (!hasReducedMotion) {
      fpsMonitor.start((fps) => {
        const newQuality = adaptiveQuality(fps, webglQuality);
        if (newQuality !== webglQuality) {
          setWebglQuality(newQuality);
        }
      });
    }

    return () => {
      fpsMonitor.stop();
    };
  }, [setWebglQuality, setReducedMotion, webglQuality]);

  // Don't render WebGL if reduced motion is preferred
  if (reducedMotion) {
    return null;
  }

  const dpr = typeof window !== 'undefined' ? getDPR(webglQuality) : 1;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        dpr={dpr}
        gl={{
          antialias: webglQuality !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{
          position: [0, 0, 5],
          fov: 50,
        }}
        style={{
          background: 'transparent',
        }}
      >
        {/* Ambient lighting for dark scene */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#FAF6F0" />
        <pointLight position={[-10, -10, -10]} intensity={0.1} color="#0036D8" />
        
        <EntranceScene />
        {children}
      </Canvas>
    </div>
  );
}

function getDPR(quality: QualityLevel): number {
  if (typeof window === 'undefined') return 1;
  
  switch (quality) {
    case 'high':
      return Math.min(window.devicePixelRatio || 2, 2);
    case 'medium':
      return Math.min(window.devicePixelRatio || 1.5, 1.5);
    case 'low':
      return 1;
    default:
      return 1;
  }
}
