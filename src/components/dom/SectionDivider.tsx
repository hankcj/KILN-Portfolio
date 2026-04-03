interface SectionDividerProps {
  label?: string;
  className?: string;
}

export default function SectionDivider({ label, className = '' }: SectionDividerProps) {
  return (
    <div className={`kiln-divider relative py-10 sm:py-14 ${className}`}>
      <div
        className="h-[1px]"
        style={{
          background:
            'linear-gradient(to right, transparent, rgba(250, 246, 240, 0.08) 20%, rgba(250, 246, 240, 0.08) 80%, transparent)',
        }}
      />
      {label && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-1.5 border border-white/10 bg-[#13161F]/90 backdrop-blur-[1px]">
          <span className="text-[9px] tracking-[0.3em] text-white/25 uppercase">{label}</span>
        </div>
      )}
    </div>
  );
}
