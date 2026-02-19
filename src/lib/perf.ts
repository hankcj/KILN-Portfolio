/**
 * Performance Utilities
 * 
 * Quality scaling, FPS sampling, and adaptive WebGL quality.
 */

// FPS tracking
class FPSMonitor {
  private frames: number = 0;
  private lastTime: number = 0;
  private fps: number = 60;
  private callback?: (fps: number) => void;

  start(onFpsUpdate?: (fps: number) => void): void {
    this.callback = onFpsUpdate;
    this.lastTime = performance.now();
    this.tick();
  }

  stop(): void {
    this.callback = undefined;
  }

  private tick = (): void => {
    if (!this.callback) return;

    this.frames++;
    const currentTime = performance.now();
    const elapsed = currentTime - this.lastTime;

    if (elapsed >= 1000) {
      this.fps = Math.round((this.frames * 1000) / elapsed);
      this.frames = 0;
      this.lastTime = currentTime;
      this.callback(this.fps);
    }

    requestAnimationFrame(this.tick);
  };

  getCurrentFPS(): number {
    return this.fps;
  }
}

export const fpsMonitor = new FPSMonitor();

// Quality levels based on device capabilities and FPS
export type QualityLevel = 'high' | 'medium' | 'low';

interface QualitySettings {
  pixelRatio: number;
  dpr: number;
  effectsIntensity: number;
  shadows: boolean;
  antialias: boolean;
}

export const qualityPresets: Record<QualityLevel, QualitySettings> = {
  high: {
    pixelRatio: 2,
    dpr: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 2, 2) : 2,
    effectsIntensity: 1,
    shadows: true,
    antialias: true,
  },
  medium: {
    pixelRatio: 1.5,
    dpr: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1.5, 1.5) : 1.5,
    effectsIntensity: 0.6,
    shadows: false,
    antialias: true,
  },
  low: {
    pixelRatio: 1,
    dpr: 1,
    effectsIntensity: 0.3,
    shadows: false,
    antialias: false,
  },
};

// Determine initial quality based on device
export function getInitialQuality(): QualityLevel {
  if (typeof window === 'undefined') return 'medium';

  // Check for mobile/low-power devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  
  const isLowMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory !== undefined && 
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 4;

  if (isMobile || isLowMemory) return 'low';
  if (window.devicePixelRatio > 1.5) return 'high';
  return 'medium';
}

// Adaptive quality based on FPS
export function adaptiveQuality(
  currentFps: number,
  currentQuality: QualityLevel
): QualityLevel {
  const thresholds = {
    high: 45,    // Drop to medium if below 45fps
    medium: 30,  // Drop to low if below 30fps
  };

  if (currentQuality === 'high' && currentFps < thresholds.high) {
    return 'medium';
  }
  
  if (currentQuality === 'medium' && currentFps < thresholds.medium) {
    return 'low';
  }
  
  // Only upgrade quality if FPS is consistently high
  if (currentQuality === 'low' && currentFps > 55) {
    return 'medium';
  }
  
  if (currentQuality === 'medium' && currentFps > 58) {
    return 'high';
  }

  return currentQuality;
}

// Lazy loading helper for 3D assets
export function lazyLoad3DAsset(
  loader: () => Promise<unknown>,
  onLoad?: () => void,
  onError?: (error: Error) => void
): void {
  if (typeof window === 'undefined') return;

  // Use IntersectionObserver to load only when near viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loader()
            .then(() => onLoad?.())
            .catch((err) => onError?.(err instanceof Error ? err : new Error(String(err))));
          observer.disconnect();
        }
      });
    },
    { rootMargin: '100px' }
  );

  // Observe a sentinel element or document body
  observer.observe(document.body);
}

// Utility: Debounce for resize handlers
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
