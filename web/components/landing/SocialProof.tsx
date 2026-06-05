"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type Accent = "lime" | "coral" | "amber";

const metrics: { value: string; label: string; sub: string; accent: Accent }[] = [
  { value: "1M+", label: "SKUs processed", sub: "Voomi Supply — HVAC marketplace", accent: "lime" },
  { value: "200M+", label: "Amazon ASINs matched", sub: "Via Channel Matching Agent", accent: "lime" },
  { value: "~85%", label: "faster publishing", sub: "Voomi Supply publish-time reduction", accent: "coral" },
  { value: ">95%", label: "precision / recall", sub: "Attribute extraction — Profitero", accent: "amber" },
  { value: "1,500+", label: "marketplaces covered", sub: "Profitero across 80+ languages", accent: "lime" },
  { value: "140 → 20", label: "labeling categories", sub: "Profitero normalisation run", accent: "coral" },
];

const accentMap = {
  lime: { num: "text-lime", border: "border-l-lime" },
  coral: { num: "text-coral", border: "border-l-coral" },
  amber: { num: "text-amber", border: "border-l-amber" },
} as const;

export function SocialProof() {
  const reduce = useReducedMotion();
  return (
    <section className="surface-dark py-16 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-6 justify-center">
              <span className="marker" aria-hidden>◆</span>
              Production infrastructure
            </p>
            <h2 className="heading-section text-surface text-balance">
              What these deployments prove
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => {
            const { num, border } = accentMap[m.accent];
            return (
              <motion.div
                key={m.value}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className={`card rounded border-l-2 p-6 ${border}`}
              >
                <p className={`stat-value text-3xl ${num}`}>{m.value}</p>
                <p className="mt-1 text-sm font-semibold text-surface">{m.label}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-mute">{m.sub}</p>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <div className="card mt-10 rounded px-7 py-6">
            <p className="text-base leading-relaxed text-surface-muted sm:text-[17px]">
              &ldquo;Their approach{" "}
              <span className="font-medium text-surface">
                drastically reduced manual effort while improving accuracy.
              </span>{" "}
              The agents caught issues we weren&apos;t even aware of — and the before/after
              exports made it easy for our team to review and sign off.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-lime font-mono text-xs font-bold text-ink">
                EB
              </div>
              <div>
                <p className="text-sm font-semibold text-surface">Eric Bosco</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-mute">Profitero / Publicis Groupe</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
