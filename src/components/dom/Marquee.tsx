'use client';

interface MarqueeProps {
  text: string;
  speed?: number;
  className?: string;
}

export default function Marquee({ text, speed = 30, className = '' }: MarqueeProps) {
  const separator = ' \u00A0\u00A0//\u00A0\u00A0 ';
  const content = `${text}${separator}`.repeat(6);

  return (
    <div className={`w-full overflow-hidden border-y border-white/5 py-3 ${className}`}>
      <div
        className="marquee-track flex whitespace-nowrap text-[10px] tracking-[0.3em] uppercase text-white/30"
        style={{ animationDuration: `${speed}s` }}
      >
        <span className="marquee-content">{content}</span>
        <span className="marquee-content" aria-hidden>{content}</span>
      </div>
    </div>
  );
}
