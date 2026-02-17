/**
 * Scene Manager
 * 
 * Global WebGL canvas manager.
 * Handles scene switching, route-based scenes, and quality adaptation.
 */

'use client';

import { Canvas } from '@react-three/fiber';
import { useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { fpsMonitor, getInitialQuality, adaptiveQuality, QualityLevel } from '@/lib/perf';
import { prefersReducedMotion } from '@/lib/motion';

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

  const dpr = getDPR(webglQuality);

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
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {children}
      </Canvas>
    </div>
  );
}

function getDPR(quality: QualityLevel): number {
  switch (quality) {
    case 'high':
      return Math.min(window?.devicePixelRatio || 2, 2);
    case 'medium':
      return Math.min(window?.devicePixelRatio || 1.5, 1.5);
    case 'low':
      return 1;
    default:
      return 1;
  }
}
