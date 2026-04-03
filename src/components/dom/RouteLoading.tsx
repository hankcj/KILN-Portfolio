interface RouteLoadingProps {
  label: string;
}

export default function RouteLoading({ label }: RouteLoadingProps) {
  return (
    <div className="kiln-route-loader">
      <div className="relative z-10 flex flex-col items-center">
        <p
          className="text-[34px] uppercase text-[#FAF6F0]"
          style={{ fontFamily: 'var(--font-averia), Georgia, serif', letterSpacing: '0.1em' }}
        >
          KILN
        </p>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-[#9CC4FF]">ACQUIRING</p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{label}</p>
      </div>

      <p className="absolute bottom-7 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
        Fixed position
      </p>
    </div>
  );
}
