import RouteShell from "@/components/dom/RouteShell";
import ChapterHero from "@/components/dom/ChapterHero";
import SectionDivider from "@/components/dom/SectionDivider";
import RevealOnView from "@/components/dom/motion/RevealOnView";
import BloomEmbed from "@/components/dom/BloomEmbed";

const steps = [
  { label: "01", title: "Share context", note: "Goals, constraints, timeline, and what success looks like." },
  { label: "02", title: "Scope review", note: "We map your inputs to a clear delivery shape and estimate." },
  { label: "03", title: "Engage", note: "Work begins with documented milestones and check-ins." },
];

export default function IntakePage() {
  return (
    <RouteShell theme="intake">
      <ChapterHero
        label="Make contact"
        title="Project Intake"
        subtitle="Share context first: goals, constraints, timeline, and what success looks like. Clear inputs lead to clearer scope."
        marquee="Clear inputs lead to clearer scope"
        accent="rgba(58, 125, 140, 0.08)"
      />

      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pb-24">
        <RevealOnView className="mb-16 pt-4" blur>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
            {steps.map((step, i) => (
              <div key={step.label} className="flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase font-mono">{step.label}</span>
                  <div className="flex-1 h-[1px] bg-white/8" />
                </div>
                <h3
                  className="text-lg text-white font-light mb-3"
                  style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.note}</p>
                {i < steps.length - 1 && (
                  <div className="sm:hidden mt-6 h-[1px] bg-white/5" />
                )}
              </div>
            ))}
          </div>
        </RevealOnView>

        <SectionDivider label="Form" className="mb-2" />

        <RevealOnView className="kiln-card-surface border border-white/10 bg-white/[0.02] overflow-hidden" blur>
          <div className="p-4 sm:p-6 border-b border-white/5">
            <div className="flex items-center gap-3">
              <span className="kiln-badge-pulse inline-block w-1.5 h-1.5 rounded-full bg-[#3A7D8C]" />
              <span className="text-[10px] tracking-[0.2em] text-white/50 uppercase">Live intake form</span>
            </div>
          </div>
          <div className="p-4 sm:p-6">
            <BloomEmbed />
          </div>
        </RevealOnView>
      </div>
    </RouteShell>
  );
}
