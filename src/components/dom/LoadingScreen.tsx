'use client';

import { useEffect, useRef, useState } from 'react';
import {
  createLoaderProgressController,
  preloadImage,
  whenDomReady,
  whenFontsReady,
} from '@/lib/loaderProgress';

type LoaderPhase = 'boot' | 'revealing' | 'completing' | 'exiting';

interface LoadingScreenProps {
  onComplete: () => void;
  heroImageSrc?: string;
}

const LOADER_TIMING = {
  bootDelayMs: 120,
  minDurationMs: 4200,
  timeoutMs: 9800,
  completePhaseDelayMs: 0,
  exitStartDelayMs: 680,
  finishDelayMs: 2100,
} as const;

export default function LoadingScreen({ onComplete, heroImageSrc }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [phase, setPhase] = useState<LoaderPhase>('boot');
  const onCompleteRef = useRef(onComplete);
  const hasFinishedRef = useRef(false);
  const targetProgressRef = useRef(0);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    targetProgressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    let animationFrameId = 0;

    const animate = () => {
      setDisplayProgress((prev) => {
        const target = targetProgressRef.current;
        const delta = target - prev;
        if (Math.abs(delta) < 0.04) return target;
        const easing = target >= 100 ? 0.1 : 0.05;
        return prev + delta * easing;
      });
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, []);

  useEffect(() => {
    const bootTimer = window.setTimeout(() => {
      setPhase('revealing');
    }, LOADER_TIMING.bootDelayMs);

    const stopProgress = createLoaderProgressController(
      {
        minDurationMs: LOADER_TIMING.minDurationMs,
        timeoutMs: LOADER_TIMING.timeoutMs,
        smoothing: 0.08,
        milestones: [
          whenDomReady(),
          whenFontsReady(),
          preloadImage(heroImageSrc),
        ],
      },
      {
        onProgress: (value) => setProgress(value),
        onComplete: () => setProgress(100),
      },
    );

    return () => {
      stopProgress();
      window.clearTimeout(bootTimer);
    };
  }, [heroImageSrc]);

  useEffect(() => {
    if (displayProgress < 100 || hasFinishedRef.current) return;
    hasFinishedRef.current = true;

    const phaseTimer = window.setTimeout(() => {
      setPhase('completing');
    }, LOADER_TIMING.completePhaseDelayMs);

    const completeTimer = window.setTimeout(() => {
      setPhase('exiting');
    }, LOADER_TIMING.exitStartDelayMs);

    const finishTimer = window.setTimeout(() => {
      onCompleteRef.current();
    }, LOADER_TIMING.finishDelayMs);

    return () => {
      window.clearTimeout(phaseTimer);
      window.clearTimeout(completeTimer);
      window.clearTimeout(finishTimer);
    };
  }, [displayProgress]);

  const visualProgress = Math.min(displayProgress, 100);
  const progressValue = Math.min(Math.floor(visualProgress), 100);
  const threeDigitProgress = String(progressValue).padStart(3, '0');
  const hundredsDigit = Number(threeDigitProgress[0]);
  const tensDigit = Number(threeDigitProgress[1]);
  const onesDigit = Number(threeDigitProgress[2]);

  return (
    <div
      className={`kiln-loader fixed inset-0 z-[200] overflow-hidden bg-[#0F1219] transition-[opacity,transform] duration-700 ease-out ${
        phase === 'exiting' ? 'opacity-0 scale-[1.01] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,125,140,0.14)_0%,rgba(15,18,25,1)_68%)]" />

      <div className="absolute left-5 right-5 top-7 h-4 overflow-hidden">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(250,246,240,0.2)_0,rgba(250,246,240,0.2)_2px,transparent_2px,transparent_7px)]" />
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(to_right,#9CC4FF_0,#9CC4FF_2px,transparent_2px,transparent_7px)] transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ clipPath: `inset(0 ${100 - visualProgress}% 0 0)` }}
        />
      </div>

      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className={`kiln-loader-center flex flex-col items-center ${phase}`}>
          <div className="h-[70px] w-[56px] rounded-[999px] border border-[rgba(250,246,240,0.32)] bg-[rgba(250,246,240,0.06)]" />
          <div className="mt-7 flex items-baseline">
            <span
              className="text-[44px] uppercase leading-[0.84] text-[#FAF6F0]"
              style={{ fontFamily: 'var(--font-averia), Georgia, serif', letterSpacing: '0.1em' }}
            >
              KILN
            </span>
            <span className="ml-3 font-mono text-[16px] uppercase tracking-[0.22em] text-[#9CC4FF]">
              ACQUIRING
            </span>
          </div>
          <div className="mt-7 h-[9px] w-[320px] bg-[repeating-linear-gradient(to_right,rgba(250,246,240,0.35)_0,rgba(250,246,240,0.35)_2px,transparent_2px,transparent_7px)]" />
          <p className="mt-6 text-center font-mono text-[12px] uppercase leading-[0.95] tracking-[0.22em] text-[#9CC4FF]">
            Preparing studio and archive
            <br />
            surfaces for this route
          </p>
        </div>
      </div>

      <div className={`absolute left-5 top-[48%] -translate-y-1/2 font-mono text-[11px] uppercase leading-[1.1] tracking-[0.18em] text-[#FAF6F0]/72 transition-all duration-700 ${phase === 'boot' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        <p>KILN</p>
        <p className="mt-2 text-[#FAF6F0]/45">Studio and archive</p>
      </div>

      <div className="absolute bottom-8 left-5 max-w-[280px] font-mono text-[10px] uppercase leading-[1.2] tracking-[0.18em] text-[#FAF6F0]/55">
        Acquiring objects, notes, and archive records for this route.
      </div>

      <div className={`absolute right-5 top-[48%] -translate-y-1/2 text-right font-mono text-[11px] uppercase leading-[1.1] tracking-[0.18em] text-[#FAF6F0]/72 transition-all duration-700 ${phase === 'boot' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        ACQUIRING
      </div>

      <div className="pointer-events-none absolute bottom-0 right-5 flex h-[7rem] overflow-hidden text-[#FAF6F0]/7">
        <div className="kiln-loader-digit-window">
          <div className="kiln-loader-digit-stack" style={{ transform: `translateY(-${hundredsDigit * 10}%)` }}>
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
        <div className="kiln-loader-digit-window">
          <div className="kiln-loader-digit-stack" style={{ transform: `translateY(-${tensDigit * 10}%)` }}>
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
        <div className="kiln-loader-digit-window">
          <div className="kiln-loader-digit-stack" style={{ transform: `translateY(-${onesDigit * 10}%)` }}>
            <div>0</div>
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
            <div>5</div>
            <div>6</div>
            <div>7</div>
            <div>8</div>
            <div>9</div>
          </div>
        </div>
      </div>
    </div>
  );
}
