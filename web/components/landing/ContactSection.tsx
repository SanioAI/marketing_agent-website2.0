"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canSend = status !== "sending" && email.trim().length > 3 && email.includes("@");

  return (
    <section id="contact" className="border-t border-slate-200/60 gradient-surface py-20 sm:py-24">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Contact
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Talk to Paladio.ai
              </h2>
              <p className="mt-3 text-pretty text-slate-600 sm:text-lg">
                Share a few details and we’ll follow up to schedule a walkthrough.
              </p>
              <p className="mt-5 text-sm text-slate-500">
                Prefer email?{" "}
                <a className="font-medium text-blue-700 hover:text-blue-900" href="mailto:demo@paladio.ai">
                  demo@paladio.ai
                </a>
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="card p-6 sm:p-7">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!canSend) return;
                  setStatus("sending");
                  setErrorMessage(null);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({ name, email, phone, company }),
                    });
                    if (!res.ok) {
                      const data = (await res.json().catch(() => null)) as { error?: string } | null;
                      throw new Error(data?.error || "Could not submit. Please try again.");
                    }
                    setStatus("sent");
                  } catch (err) {
                    setStatus("error");
                    setErrorMessage(err instanceof Error ? err.message : "Could not submit. Please try again.");
                  }
                }}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-slate-500">
                      Name
                    </label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "sending" || status === "sent"}
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-inner shadow-slate-900/5 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-slate-500">
                      Company
                    </label>
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      disabled={status === "sending" || status === "sent"}
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-inner shadow-slate-900/5 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Your company"
                      autoComplete="organization"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-slate-500">
                      Email
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "sending" || status === "sent"}
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-inner shadow-slate-900/5 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="you@company.com"
                      autoComplete="email"
                      inputMode="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-widest text-slate-500">
                      Phone (optional)
                    </label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={status === "sending" || status === "sent"}
                      className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-inner shadow-slate-900/5 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="+1 (555) 000-0000"
                      autoComplete="tel"
                      inputMode="tel"
                    />
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!canSend}
                    className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#2563eb] via-[#0284c7] to-[#0ea5e9] px-6 text-sm font-medium text-white shadow-sm shadow-blue-900/15 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : "Send"}
                  </button>
                  {status === "sent" ? (
                    <p className="mt-2 text-xs text-emerald-700">
                      Thanks — we’ll reach out shortly.
                    </p>
                  ) : status === "error" && errorMessage ? (
                    <p className="mt-2 text-xs text-rose-700">{errorMessage}</p>
                  ) : (
                    <p className="mt-2 text-xs text-slate-500">
                      We’ll use this only to respond to your request.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

