"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type Accent = "cyan" | "lime" | "violet";

const metrics: { value: string; label: string; sub: string; accent: Accent }[] = [
  { value: "1M+", label: "SKUs processed", sub: "Voomi Supply — HVAC marketplace", accent: "cyan" },
  { value: "200M+", label: "Amazon ASINs matched", sub: "Via Channel Matching Agent", accent: "lime" },
  { value: "~85%", label: "faster publishing", sub: "Voomi Supply publish-time reduction", accent: "cyan" },
  { value: ">95%", label: "precision / recall", sub: "Attribute extraction — Profitero", accent: "violet" },
  { value: "1,500+", label: "marketplaces covered", sub: "Profitero across 80+ languages", accent: "lime" },
  { value: "140 → 20", label: "labeling categories", sub: "Profitero normalisation run", accent: "cyan" },
];

const accentMap = {
  cyan:   { num: "text-[#00D4FF]", border: "border-l-[#00D4FF]" },
  lime:   { num: "text-[#A3FF3C]", border: "border-l-[#A3FF3C]" },
  violet: { num: "text-[#9B59FF]", border: "border-l-[#9B59FF]" },
} as const;

export function SocialProof() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[#050C17] py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              This is production infrastructure, not experimental AI.
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              What these deployments prove
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => {
            const { num, border } = accentMap[m.accent];
            return (
              <motion.div
                key={m.value}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                className={`rounded-xl border border-white/[0.07] bg-[#0A1628] p-6 border-l-2 ${border}`}
              >
                <p className={`font-display text-3xl font-bold ${num}`}>{m.value}</p>
                <p className="mt-1 text-sm font-semibold text-white">{m.label}</p>
                <p className="mt-1 text-xs text-slate-400">{m.sub}</p>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-[#0A1628] px-7 py-6">
            <p className="text-base leading-relaxed text-slate-300 sm:text-[17px]">
              &ldquo;Their approach{" "}
              <span className="font-medium text-white">
                drastically reduced manual effort while improving accuracy.
              </span>{" "}
              The agents caught issues we weren&apos;t even aware of — and the before/after
              exports made it easy for our team to review and sign off.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#00D4FF] to-[#2563eb] text-xs font-bold text-[#050C17] shadow-sm">
                EB
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Eric Bosco</p>
                <p className="text-xs text-slate-400">Profitero / Publicis Groupe</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
