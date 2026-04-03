"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

type SoundType = "open" | "hover" | "select";

interface SoundContextValue {
  muted: boolean;
  toggleMuted: () => void;
  play: (type: SoundType) => void;
}

const SoundContext = createContext<SoundContextValue>({
  muted: true,
  toggleMuted: () => undefined,
  play: () => undefined,
});

const STORAGE_KEY = "kiln-sound-muted";

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState(() => {
    if (typeof window === "undefined") return true;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) return true;
    return stored === "1";
  });
  const contextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (contextRef.current) return contextRef.current;

    const Ctor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    contextRef.current = new Ctor();
    return contextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, volume: number) => {
    if (muted) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      void ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.start(now);
    osc.stop(now + duration);
  }, [getAudioContext, muted]);

  const play = useCallback((type: SoundType) => {
    if (type === "open") {
      playTone(220, 0.12, 0.03);
      setTimeout(() => playTone(330, 0.09, 0.02), 60);
      return;
    }
    if (type === "select") {
      playTone(520, 0.08, 0.025);
      return;
    }
    playTone(280, 0.05, 0.012);
  }, [playTone]);

  const toggleMuted = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ muted, toggleMuted, play }),
    [muted, toggleMuted, play],
  );

  return (
    <SoundContext.Provider value={value}>
      {children}
      <button
        onClick={toggleMuted}
        className="fixed bottom-6 right-6 z-[90] border border-white/20 bg-[#13161F]/70 backdrop-blur-sm px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white hover:border-white/40 transition-all duration-300"
      >
        {muted ? "Sound Off" : "Sound On"}
      </button>
    </SoundContext.Provider>
  );
}

export function useSound() {
  return useContext(SoundContext);
}
