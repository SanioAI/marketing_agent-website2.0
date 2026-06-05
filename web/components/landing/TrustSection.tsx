"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { AppIcon, type AppIconName } from "@/lib/icons";

const trustPoints: { title: string; desc: string; icon: AppIconName }[] = [
  {
    title: "Evaluated against real inputs",
    desc: "Every agent output is checked against the original source data — not just validated by format.",
    icon: "Shield",
  },
  {
    title: "Corrected using structured reasoning",
    desc: "Agents explain what changed, why it changed, and what rule or signal triggered the correction.",
    icon: "GitBranch",
  },
  {
    title: "Produced with confidence indicators",
    desc: "Every output includes a confidence score — your team knows when to trust automatically and when to review.",
    icon: "BarChart3",
  },
  {
    title: "Explainable to humans",
    desc: "Before/after exports, audit trails, and review workflows your team can read, sign off on, and act on from day one.",
    icon: "ScrollText",
  },
];

const integrations = [
  "Vendor feeds", "PDFs", "Spreadsheets", "Images", "Unstructured text",
];

export function TrustSection() {
  const reduce = useReducedMotion();
  return (
    <section className="gradient-surface border-t border-line/60 py-20 sm:py-24">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Trust, Verification &amp; Safety
              </p>
              <h2 className="heading-section text-surface">
                Every output from Catalog Agents is:
              </h2>
              <p className="section-lede mt-6">
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
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] border border-line bg-paper-dim text-lime">
                    <AppIcon name={t.icon} size={18} />
                  </div>
                  <div>
                    <h3 className="heading-card text-surface">{t.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-surface-muted">{t.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="card p-8">
              <p className="section-kicker">
                Integrates with Your Existing Stack
              </p>
              <h3 className="heading-card mt-3 text-surface">
                No rip-and-replace.
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-surface-muted">
                Deploy in weeks, not quarters. Catalog Agents sit upstream and improve the data flowing into your PIM and channels — without replacing anything.
              </p>

              <div className="mt-6">
                <p className="section-kicker">Data sources we ingest</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {integrations.map((s) => (
                    <span key={s} className="rounded-[4px] border border-line bg-paper px-3 py-1 text-xs font-medium text-surface">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 rounded-[4px] border border-line bg-paper-dim/50 p-5">
                <p className="text-sm font-medium text-surface">
                  &ldquo;If you want catalogs your team can trust, you need continuous evaluation — not more cleanup tools.&rdquo;
                </p>
                <p className="mt-3 text-xs text-surface-muted">Paladio.ai · Catalog Agents</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
