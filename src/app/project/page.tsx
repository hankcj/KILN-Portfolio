"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { motionTokens } from "@/lib/motion";
import RouteShell from "@/components/dom/RouteShell";
import ChapterHero from "@/components/dom/ChapterHero";
import SectionDivider from "@/components/dom/SectionDivider";
import RevealOnView from "@/components/dom/motion/RevealOnView";

const howItWorks = [
  {
    label: "01",
    title: "Capture everything",
    body: "Notes, highlights, voice memos, bookmarks, PDFs, code — anything that lives in your head or your tabs. No formatting rules. No folder hierarchies.",
  },
  {
    label: "02",
    title: "Map the connections",
    body: "Every piece of content is analyzed semantically. The system builds a living knowledge graph — surfacing links between ideas across time, context, and format.",
  },
  {
    label: "03",
    title: "See your mind",
    body: "Explore an interactive node graph of your entire knowledge base. Follow threads across months of thinking, zoom into clusters, and discover patterns you did not know were there.",
  },
];

const capabilities = [
  {
    code: "CAP.001",
    title: "Semantic Knowledge Graph",
    body: "Every note becomes a node. The system identifies thematic, conceptual, and temporal connections — then renders them in an explorable graph view.",
  },
  {
    code: "CAP.002",
    title: "Universal Capture",
    body: "Text, images, audio, PDFs, URLs, code. Paste it, drag it, forward it. Everything is normalized into a searchable, connectable format.",
  },
  {
    code: "CAP.003",
    title: "AI Synthesis",
    body: "Ask questions across your entire archive. Get answers grounded in your own thinking — summaries, contradictions, and blind spots surfaced automatically.",
  },
  {
    code: "CAP.004",
    title: "Private by Default",
    body: "Your notes stay yours. End-to-end encryption. No training on your data. Local-first architecture with optional cloud sync.",
  },
];

const targetUsers = [
  {
    label: "Researchers",
    body: "Who juggle hundreds of sources and need to find the thread between them — not just file them away.",
  },
  {
    label: "Founders",
    body: "Who think in fragments across meetings, voice notes, and late-night ideas. Need to turn noise into strategy.",
  },
  {
    label: "Writers & Creators",
    body: "Who collect obsessively but struggle to synthesize. The graph reveals what your next piece is about.",
  },
];

const pricingTiers = [
  {
    name: "Free",
    note: "Personal use. Local storage. Core graph features.",
  },
  {
    name: "Pro",
    note: "Cloud sync. AI synthesis. Unlimited capture.",
  },
  {
    name: "Team",
    note: "Shared graphs. Collaborative nodes. Admin controls.",
  },
];

const relatedSystems = [
  { label: "Studio Work", note: "Objects and systems from the archive", href: "/work" },
  { label: "Signal Log", note: "Essays on systems, design, and technology", href: "/signal" },
  { label: "Custom Work", note: "Commissioned studio engagements", href: "/intake" },
];

export default function ProjectPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error || "No signal returned.");
      }
      setStatus("success");
      setMessage("Visible. You are on the list for project updates.");
      setEmail("");
      setName("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No signal returned.");
    }
  };

  return (
    <RouteShell theme="project" showProgress>
      <ChapterHero
        id="project-header"
        label="Product"
        title="Your mind has structure. This tool maps the terrain."
        subtitle="Most note-taking tools are filing cabinets — they store, but they do not think. Project Kiln ingests everything you capture and surfaces the relationships between ideas that you would otherwise miss."
        marquee="A second-brain product in active validation"
        accent="rgba(58, 125, 140, 0.06)"
      >
        <div className="flex items-center gap-4 mt-2">
          <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase font-mono">Pre-alpha</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-[10px] tracking-[0.15em] text-white/35 uppercase">Launching 2026</span>
        </div>
      </ChapterHero>

      <div className="max-w-5xl mx-auto px-6 sm:px-12 lg:px-16 pb-24">
        <SectionDivider label="Process" className="mb-2" />

        <RevealOnView id="project-process" className="mb-10" blur>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {howItWorks.map((step, i) => (
              <div key={step.label} className="flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase font-mono">{step.label}</span>
                  <div className="flex-1 h-[1px] bg-white/8" />
                </div>
                <h3
                  className="text-lg text-white font-light mb-2"
                  style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.body}</p>
                {i < howItWorks.length - 1 && (
                  <div className="sm:hidden mt-4 h-[1px] bg-white/5" />
                )}
              </div>
            ))}
          </div>
        </RevealOnView>

        <SectionDivider label="Capabilities" className="mb-2" />

        <div id="project-capabilities" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {capabilities.map((cap, index) => (
            <RevealOnView
              key={cap.code}
              className="kiln-card-surface border border-white/10 bg-white/[0.02] p-6 sm:p-8"
              delayMs={index * motionTokens.stagger.fast}
              blur
            >
              <p className="text-[10px] tracking-[0.2em] text-[#3A7D8C] uppercase font-mono mb-3">{cap.code}</p>
              <h3
                className="text-lg text-white/90 font-light mb-3"
                style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
              >
                {cap.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">{cap.body}</p>
            </RevealOnView>
          ))}
        </div>

        <SectionDivider label="Users" className="mb-2" />

        <RevealOnView
          id="project-users"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          blur
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-8 bg-[#3A7D8C]/40" />
            <h2
              className="text-2xl text-white font-light"
              style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
            >
              Built For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {targetUsers.map((user) => (
              <div key={user.label}>
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">{user.label}</p>
                <p className="text-white/55 text-sm leading-relaxed">{user.body}</p>
              </div>
            ))}
          </div>
        </RevealOnView>

        <SectionDivider label="Pricing" className="mb-2" />

        <RevealOnView
          id="project-pricing"
          className="kiln-card-surface kiln-blueprint-grid mb-10 border border-white/10 bg-white/[0.02] p-6 sm:p-8"
          delayMs={90}
          blur
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-[1px] w-8 bg-[#3A7D8C]/40" />
            <h2
              className="text-2xl text-white font-light"
              style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
            >
              Subscription Model
            </h2>
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Project Kiln will operate as a paid subscription — a generous free tier for personal use, with Pro and Team plans for heavier workloads and collaboration.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {pricingTiers.map((tier) => (
              <div key={tier.name} className="border border-white/8 bg-white/[0.01] p-4">
                <p className="text-[11px] tracking-[0.2em] text-white/75 uppercase font-mono mb-2">{tier.name}</p>
                <p className="text-white/50 text-sm leading-relaxed">{tier.note}</p>
              </div>
            ))}
          </div>
          <p className="text-[10px] tracking-[0.15em] text-[#3A7D8C]/70 uppercase">
            Early access members receive founder pricing — locked in permanently.
          </p>
        </RevealOnView>

        <SectionDivider label="Access" className="mb-2" />

        <RevealOnView
          id="project-access"
          className="kiln-card-surface border border-white/10 bg-white/[0.02] p-6 sm:p-8 mb-10"
          delayMs={180}
          blur
        >
          <h2
            className="text-2xl text-white font-light mb-5"
            style={{ fontFamily: "var(--font-averia), Georgia, serif" }}
          >
            Request early access
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Join the waitlist for beta access, documentation previews, and permanent founder pricing when we launch.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="project-name" className="block text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">
                Name
              </label>
              <input
                id="project-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Optional"
                className="kiln-link-surface w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/40 transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="project-email" className="block text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">
                Email
              </label>
              <input
                id="project-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Required"
                required
                className="kiln-link-surface w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/40 transition-colors duration-300"
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="kiln-button-surface inline-flex items-center gap-3 border border-white/30 px-5 py-3 text-[10px] tracking-[0.2em] text-white/75 uppercase hover:text-white hover:border-white/50 transition-colors duration-300 disabled:opacity-50"
            >
              <span>{status === "loading" ? "Acquiring..." : "Join waitlist"}</span>
              <span aria-hidden>→</span>
            </button>
          </form>
          {message && (
            <div
              className={`mt-5 px-4 py-3 border text-sm ${
                status === "success"
                  ? "border-[#3A7D8C]/30 text-[#3A7D8C] bg-[#3A7D8C]/5"
                  : "border-red-300/30 text-red-300 bg-red-300/5"
              }`}
            >
              {message}
            </div>
          )}
        </RevealOnView>

        <SectionDivider label="Related" className="mb-2" />

        <div id="project-related" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedSystems.map((system, index) => (
            <RevealOnView key={system.label} delayMs={index * motionTokens.stagger.fast}>
              <Link
                href={system.href}
                className="kiln-card-surface group block border border-white/10 bg-white/[0.02] p-5 hover:border-white/20 transition-colors duration-300"
              >
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-2">{system.label}</p>
                <p className="text-white/55 text-sm leading-relaxed mb-3">{system.note}</p>
                <span className="kiln-link-surface inline-flex items-center gap-2 text-[10px] tracking-[0.2em] text-white/60 uppercase group-hover:text-white transition-colors duration-300">
                  <span>Surface</span>
                  <span aria-hidden className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </Link>
            </RevealOnView>
          ))}
        </div>
      </div>
    </RouteShell>
  );
}
