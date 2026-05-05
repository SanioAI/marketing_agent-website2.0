"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const before = [
  "Manual cleanup that repeats every cycle",
  "Reactive fixes after feed rejections",
  "Taxonomy errors caught downstream",
  "Brand duplicates causing catalog bloat",
  "Missing attributes discovered at publish",
];

const after = [
  "Continuously evaluate product correctness and completeness",
  "Fix taxonomy, attributes, and structure automatically",
  "Flag ambiguity and escalate only when needed",
  "Normalize brands and resolve duplicates",
  "Enhance raw inputs into human-readable product understanding",
];

export function ProblemSection() {
  const reduce = useReducedMotion();
  return (
    <section id="problem" className="gradient-surface py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              How Catalog Operations Change
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              From reactive cleanup to continuous evaluation
            </h2>
            <p className="mt-3 text-slate-600">
              This is production infrastructure, not experimental AI. Catalog
              Agents run continuously — so your team ships faster instead of
              cleaning up the same problems on repeat.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {/* Before */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl border border-red-100 bg-red-50/40 p-7"
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                ✕
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-red-600">
                Manual Cleanup &amp; Reactive Fixes
              </h3>
            </div>
            <ul className="space-y-3">
              {before.map((b, i) => (
                <motion.li
                  key={b}
                  className="flex items-start gap-3 text-sm text-slate-600"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" aria-hidden />
                  {b}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-7"
          >
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                ✓
              </span>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
                Continuous Evaluation with Catalog Agents
              </h3>
            </div>
            <ul className="space-y-3">
              {after.map((a, i) => (
                <motion.li
                  key={a}
                  className="flex items-start gap-3 text-sm text-slate-700"
                  initial={reduce ? false : { opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 + 0.1 }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
                  {a}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
