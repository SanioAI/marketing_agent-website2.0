"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const trustPoints = [
  {
    title: "Evaluated against real inputs",
    desc: "Every agent output is checked against the original source data — not just validated by format.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M10 2L3 6v4c0 4.418 3.134 8.55 7 9.5C13.866 18.55 17 14.418 17 10V6L10 2z" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 10l2 2 4-4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Corrected using structured reasoning",
    desc: "Agents explain what changed, why it changed, and what rule or signal triggered the correction.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <circle cx="10" cy="10" r="8" stroke="#2563eb" strokeWidth="1.5" />
        <path d="M10 6v4l3 2" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Produced with confidence indicators",
    desc: "Every output includes a confidence score — your team knows when to trust automatically and when to review.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <rect x="3" y="12" width="3" height="5" rx="1" fill="#2563eb" opacity="0.4" />
        <rect x="8.5" y="8" width="3" height="9" rx="1" fill="#2563eb" opacity="0.7" />
        <rect x="14" y="4" width="3" height="13" rx="1" fill="#2563eb" />
      </svg>
    ),
  },
  {
    title: "Explainable to humans",
    desc: "Before/after exports, audit trails, and review workflows your team can read, sign off on, and act on from day one.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path d="M2 5h16M2 10h10M2 15h7" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const integrations = [
  "Vendor feeds", "PDFs", "Spreadsheets", "Images", "Unstructured text",
];

export function TrustSection() {
  const reduce = useReducedMotion();
  return (
    <section className="border-t border-slate-200/60 py-20 sm:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left: Trust points */}
          <div>
            <Reveal>
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Trust, Verification &amp; Safety
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Every output from Catalog Agents is:
              </h2>
              <p className="mt-3 text-slate-600">
                Catalog Agents are the foundation. Everything else depends on them. That&apos;s why safety and explainability are built in from the start.
              </p>
            </Reveal>
            <div className="mt-8 space-y-5">
              {trustPoints.map((t, i) => (
                <motion.div
                  key={t.title}
                  className="flex gap-4"
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                >
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50">
                    {t.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Stack integration */}
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Integrates with Your Existing Stack
              </p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                No rip-and-replace.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Deploy in weeks, not quarters. Catalog Agents sit upstream and improve the data flowing into your PIM and channels — without replacing anything.
              </p>

              <div className="mt-6">
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Data sources we ingest</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {integrations.map((s) => (
                    <span key={s} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/50 p-5">
                <p className="text-sm font-medium text-slate-900">
                  &ldquo;If you want catalogs your team can trust, you need continuous evaluation — not more cleanup tools.&rdquo;
                </p>
                <p className="mt-3 text-xs text-slate-500">Paladio.ai · Catalog Agents</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
