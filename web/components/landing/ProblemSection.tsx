"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const failures = [
  {
    icon: "⚠",
    title: "Incomplete attributes",
    body: "AI agents need structured, machine-readable data — dimensions, materials, compatibility, voltage. A product description is not a substitute. Missing a required field doesn't produce an error notice. The product just doesn't show up.",
    accent: "border-t-[#00D4FF]",
  },
  {
    icon: "🔀",
    title: "Wrong or inconsistent taxonomy",
    body: "A miscategorized product fails validation, gets buried, or never appears in agent search results. Channel taxonomies update quarterly — a category that was correct at onboarding lands in the wrong place after a revision, with no alert.",
    accent: "border-t-[#A3FF3C]",
  },
  {
    icon: "🚫",
    title: "Undetected compliance issues",
    body: "Hazmat flags, multipack mismatches, taxability errors — discovered post-listing. Each one requires a human to trace the failure back to the source field, fix it, and resubmit. At scale, this takes longer than publishing the products in the first place.",
    accent: "border-t-[#9B59FF]",
  },
];

export function ProblemSection() {
  const reduce = useReducedMotion();
  return (
    <section id="problem" className="bg-[#050C17] py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              The real problem
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AI agents are already choosing what products to recommend.
            </h2>
            <p className="mt-4 text-slate-400 leading-relaxed">
              ChatGPT. Perplexity. Google Shopping AI. They pull from structured product data
              and skip anything they can&apos;t confidently parse. If your catalog has incomplete
              attributes, wrong taxonomy, or unresolved compliance flags — your products don&apos;t
              get recommended. They get passed over.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {failures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`rounded-xl border border-white/[0.07] bg-[#0A1628] p-6 border-t-2 ${f.accent}`}
            >
              <div className="mb-4 text-2xl">{f.icon}</div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-12 rounded-2xl border border-white/[0.07] bg-[#0A1628] p-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-lg font-semibold text-white sm:text-xl">
                The problem isn&apos;t that your catalog is wrong.
              </p>
              <p className="mt-2 text-slate-400">
                It&apos;s that it wasn&apos;t built for a world where AI systems make purchase decisions.
                Paladio makes it ready — with agents that extract, normalise, map, and verify
                every product record continuously.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/catalog-agents"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#00D4FF] px-6 text-sm font-semibold text-[#050C17] shadow-sm transition hover:bg-[#1ADEFF]"
                >
                  See catalog agents →
                </a>
                <a
                  href="/catalog-readiness"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-transparent px-6 text-sm font-medium text-slate-300 transition hover:border-white/40 hover:text-white"
                >
                  Assess your readiness
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
