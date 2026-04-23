"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const agents = [
  {
    name: "Product Graph",
    one: "Builds a living graph of relationships: substitutes, complements, variants, packs, and bundles.",
    outcome: "Discovery and recommendations work because products are connected, not just stored.",
  },
  {
    name: "Compatibility & Fitment",
    one: "Treats fitment as a reasoning problem: infer constraints, validate evidence, and flag uncertainty for review.",
    outcome: "Fewer returns, fewer mismatches, and higher trust for high-stakes categories.",
  },
  {
    name: "Substitution Intelligence",
    one: "Generates ranked replacements with context and constraints—beyond naive similarity.",
    outcome: "Recover revenue on out-of-stock and discontinuations with lower return risk.",
  },
] as const;

function AgentRow({
  agent,
  i,
}: {
  agent: (typeof agents)[number];
  i: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.35, once: true });
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-sky-50/0 to-transparent opacity-0 transition group-hover:from-indigo-50/30 group-hover:via-sky-50/20 group-hover:opacity-100" />
      <div className="relative flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-8">
        <div className="shrink-0 sm:w-44">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Agent</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">
            {agent.name}
            <span className="text-slate-500"> </span>
          </p>
        </div>
        <div className="flex-1">
          <p className="text-slate-700 leading-relaxed">{agent.one}</p>
          <div className="mt-4 h-px w-full bg-slate-100" />
          <p className="mt-3 text-sm font-medium text-slate-900">Outcome</p>
          <p className="mt-1 text-sm text-slate-600">{agent.outcome}</p>
        </div>
        <div className="mt-2 flex shrink-0 items-center sm:mt-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-lg font-bold text-slate-800">
            {i + 1}
          </div>
        </div>
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-indigo-500 to-sky-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: inView || reduce ? 1 : 0 }}
        transition={{
          duration: reduce ? 0 : 0.8,
          delay: reduce ? 0 : 0.05 * i,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}

export function SolutionSection() {
  return (
    <section
      id="agents"
      className="border-y border-slate-200/60 gradient-surface py-20 sm:py-24"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              How it works
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Catalog agents that do the project work
            </h2>
            <p className="mt-3 text-balance text-slate-600">
              Autonomous systems that read your feeds, make decisions, and hand you a catalog
              that is already optimized to sell and scale—not another manual queue.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 flex flex-col gap-4">
          {agents.map((a, i) => (
            <Reveal key={a.name} delay={0.04 * i}>
              <AgentRow agent={a} i={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
