"use client";

import { useEffect, useMemo, useState } from "react";

interface CursorState {
  x: number;
  y: number;
  active: boolean;
}

export default function CustomCursor() {
  const [cursor, setCursor] = useState<CursorState>({ x: 0, y: 0, active: false });
  const [isPointer, setIsPointer] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaCoarse = window.matchMedia("(pointer: coarse)");
    const updateDisabled = () => {
      setDisabled(mediaReduce.matches || mediaCoarse.matches);
    };
    updateDisabled();
    mediaReduce.addEventListener("change", updateDisabled);
    mediaCoarse.addEventListener("change", updateDisabled);
    return () => {
      mediaReduce.removeEventListener("change", updateDisabled);
      mediaCoarse.removeEventListener("change", updateDisabled);
    };
  }, []);

  useEffect(() => {
    if (disabled) return;

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest("a, button, input, textarea, select, [role='button'], [data-cursor='pointer']"));
    };

    const handleMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY, active: true });
      setIsPointer(isInteractive(event.target));
    };

    const handleLeave = () => setCursor((prev) => ({ ...prev, active: false }));
    const handleOver = (event: MouseEvent) => setIsPointer(isInteractive(event.target));

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseout", handleLeave);
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [disabled]);

  const style = useMemo(
    () => ({
      transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
      opacity: cursor.active ? 1 : 0,
    }),
    [cursor.active, cursor.x, cursor.y],
  );

  if (disabled) return null;

  return (
    <>
      <div
        aria-hidden
        className={`custom-cursor-ring ${isPointer ? "is-pointer" : ""}`}
        style={style}
      />
      <div
        aria-hidden
        className={`custom-cursor-dot ${isPointer ? "is-pointer" : ""}`}
        style={style}
      />
    </>
  );
}
