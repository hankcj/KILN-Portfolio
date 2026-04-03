"use client";

import { FormEvent, useState } from "react";

export default function SubscribeInline() {
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
      if (!response.ok) throw new Error(data.error || "No signal returned.");

      setStatus("success");
      setMessage("Visible. New writing will be sent to your inbox.");
      setEmail("");
      setName("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "No signal returned.");
    }
  };

  return (
    <div className="border border-white/10 bg-white/[0.02] p-6 sm:p-8">
      <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase mb-4">Signal updates</p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name (optional)"
          className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/40"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          className="w-full bg-transparent border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-white/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center gap-3 border border-white/30 px-5 py-3 text-[10px] tracking-[0.2em] text-white/75 uppercase hover:text-white hover:border-white/50 transition-colors duration-300 disabled:opacity-50"
        >
          <span>{status === "loading" ? "Acquiring..." : "Subscribe"}</span>
          <span aria-hidden>→</span>
        </button>
      </form>
      {message && (
        <p className={`mt-4 text-sm ${status === "success" ? "text-[#3A7D8C]" : "text-red-300"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
