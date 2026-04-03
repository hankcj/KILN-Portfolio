'use client';

export default function GrainOverlay() {
  return (
    <>
      {/* Film grain overlay - fine sand texture */}
      <div
        className="grain-layer fixed inset-0 z-[60] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseA'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.35' numOctaves='2' seed='7' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseA)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          animation: 'grain-drift-a 26s steps(12) infinite',
        }}
      />
      <div
        className="grain-layer fixed inset-0 z-[59] pointer-events-none opacity-[0.01]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseB'%3E%3CfeTurbulence type='turbulence' baseFrequency='1.8' numOctaves='1' seed='13' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseB)'/%3E%3C/svg%3E")`,
          backgroundSize: '140px 140px',
          animation: 'grain-drift-b 34s steps(10) infinite',
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[55] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  );
}
