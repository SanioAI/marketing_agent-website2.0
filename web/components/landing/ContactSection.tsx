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
    <section id="contact" className="border-t border-line/60 gradient-surface py-20 sm:py-24">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <div>
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Contact
              </p>
              <h2 className="heading-section text-surface">
                Talk to Paladio.ai
              </h2>
              <p className="section-lede mt-6 text-pretty">
                Share a few details and we’ll follow up to schedule a walkthrough.
              </p>
              <p className="mt-5 text-sm text-surface-muted">
                Prefer email?{" "}
                <a className="font-medium text-ink hover:text-ink-deep" href="mailto:demo@paladio.ai">
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
                    <label className="field-label">Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "sending" || status === "sent"}
                      className="field-input"
                      placeholder="Your name"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label className="field-label">Company</label>
                    <input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      disabled={status === "sending" || status === "sent"}
                      className="field-input"
                      placeholder="Your company"
                      autoComplete="organization"
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "sending" || status === "sent"}
                      className="field-input"
                      placeholder="you@company.com"
                      autoComplete="email"
                      inputMode="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="field-label">Phone (optional)</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={status === "sending" || status === "sent"}
                      className="field-input"
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
                    className="inline-flex h-12 w-full items-center justify-center rounded bg-lime px-6 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-px hover:shadow-[0_8px_24px_-8px_oklch(0.82_0.14_225/0.5)] disabled:cursor-not-allowed disabled:opacity-40"
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
                    <p className="mt-2 text-xs text-surface-muted">
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

