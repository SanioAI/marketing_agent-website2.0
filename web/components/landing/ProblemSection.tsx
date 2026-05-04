"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const pain = [
  {
    t: "AI projects stall before reaching production",
    d: "Most proofs-of-concept die in R&D. The infrastructure to evaluate, review, and ship AI reliably is missing.",
  },
  {
    t: "Every new domain means rebuilding from scratch",
    d: "Teams re-solve the same orchestration, evaluation, and HITL problems for every new use case. That overhead compounds.",
  },
  {
    t: "No structured way to evaluate AI outputs",
    d: "Without a systematic evaluation layer, you can't know if the agent is actually working — or quietly making things worse.",
  },
  {
    t: "Teams can't review or audit what the AI changed",
    d: "Black-box outputs block adoption. When stakeholders can't see the reasoning, nothing gets approved.",
  },
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
              Why It Matters
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The infrastructure gap between AI demos and production
            </h2>
            <p className="mt-3 text-slate-600">
              Building an AI agent is the easy part. Deploying one that teams actually trust and use is where most projects fail.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pain.map((p, i) => (
            <motion.div
              key={p.t}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.18, ease: "easeOut" } }}
              className="card card-hover group relative h-full overflow-hidden p-6"
            >
              {/* Subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(400px_200px_at_0%_0%,rgba(37,99,235,0.06),transparent)]" />

              <div className="relative">
                <motion.div
                  className="mb-3 flex h-7 w-7 items-center justify-center rounded-lg border border-blue-200/70 bg-blue-50/60 text-xs font-bold text-blue-700"
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  {i + 1}
                </motion.div>
                <h3 className="text-base font-semibold text-slate-900">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
