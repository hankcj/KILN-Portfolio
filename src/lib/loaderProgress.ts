const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export interface LoaderProgressOptions {
  minDurationMs: number;
  timeoutMs: number;
  smoothing?: number;
  milestones?: Promise<unknown>[];
}

export interface LoaderProgressHandlers {
  onProgress: (value: number) => void;
  onComplete: () => void;
}

export function whenDomReady(): Promise<void> {
  if (document.readyState !== 'loading') {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const onReady = () => {
      document.removeEventListener('DOMContentLoaded', onReady);
      resolve();
    };
    document.addEventListener('DOMContentLoaded', onReady, { once: true });
  });
}

export function whenFontsReady(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();
  if (!('fonts' in document) || !document.fonts?.ready) return Promise.resolve();

  return document.fonts.ready.then(() => undefined).catch(() => undefined);
}

export function preloadImage(source?: string): Promise<void> {
  if (!source) return Promise.resolve();

  return new Promise((resolve) => {
    const image = new Image();

    const resolveWithDecode = () => {
      if (!image.decode) {
        resolve();
        return;
      }
      image.decode().then(() => resolve()).catch(() => resolve());
    };

    image.onload = resolveWithDecode;
    image.onerror = () => resolve();
    image.decoding = 'async';
    image.src = source;
  });
}

export function createLoaderProgressController(
  options: LoaderProgressOptions,
  handlers: LoaderProgressHandlers,
): () => void {
  const {
    minDurationMs,
    timeoutMs,
    milestones = [],
    smoothing = 0.14,
  } = options;

  const startedAt = performance.now();
  const totalMilestones = milestones.length;
  const preCompleteTarget = randomInt(93, 99);
  const pauseCheckpoints = [
    randomInt(16, 30),
    randomInt(34, 56),
    randomInt(60, 78),
    randomInt(82, preCompleteTarget - 1),
  ];
  const checkpointDurations = pauseCheckpoints.map(() => randomInt(220, 620));
  let completedMilestones = 0;
  let currentProgress = 0;
  let isActive = true;
  let animationFrameId = 0;
  let pauseIndex = 0;
  let activePause: { value: number; endsAt: number } | null = null;

  const completeMilestone = () => {
    completedMilestones = Math.min(totalMilestones, completedMilestones + 1);
  };

  milestones.forEach((milestone) => {
    Promise.resolve(milestone)
      .catch(() => undefined)
      .finally(completeMilestone);
  });

  const tick = () => {
    if (!isActive) return;

    const elapsed = performance.now() - startedAt;
    const elapsedRatio = clamp(elapsed / minDurationMs, 0, 1);
    const milestoneRatio = totalMilestones === 0 ? 1 : completedMilestones / totalMilestones;
    const timedTarget = 8 + elapsedRatio * (preCompleteTarget - 8);
    const milestoneTarget = 10 + milestoneRatio * (preCompleteTarget - 10);
    const forcedDone = elapsed >= timeoutMs;
    const isReady = elapsed >= minDurationMs && milestoneRatio >= 1;
    let target = forcedDone || isReady ? 100 : Math.max(timedTarget, milestoneTarget);

    if (!forcedDone && !isReady) {
      const now = performance.now();

      if (activePause && now >= activePause.endsAt) {
        activePause = null;
        pauseIndex += 1;
      }

      const nextCheckpoint = pauseCheckpoints[pauseIndex];
      if (!activePause && nextCheckpoint !== undefined && currentProgress >= nextCheckpoint - 0.35) {
        activePause = {
          value: nextCheckpoint,
          endsAt: now + checkpointDurations[pauseIndex],
        };
      }

      if (activePause) {
        target = Math.min(target, activePause.value);
      }
    } else {
      activePause = null;
    }

    currentProgress += (target - currentProgress) * smoothing;

    if (target >= 100 && currentProgress >= 99.6) {
      currentProgress = 100;
      handlers.onProgress(100);
      handlers.onComplete();
      isActive = false;
      return;
    }

    handlers.onProgress(clamp(currentProgress, 0, 99.9));
    animationFrameId = window.requestAnimationFrame(tick);
  };

  animationFrameId = window.requestAnimationFrame(tick);

  return () => {
    isActive = false;
    window.cancelAnimationFrame(animationFrameId);
  };
}
