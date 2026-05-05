"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

function GlowOrbs() {
  const ref = useRef<HTMLDivElement | null>(null);
  const visible = useInView(ref, { amount: 0.2, once: true });
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#2563eb]/25 blur-3xl"
        initial={false}
        animate={!reduce && visible ? { opacity: 0.6, scale: 1.08 } : { opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[#0ea5e9]/20 blur-3xl"
        initial={false}
        animate={!reduce && visible ? { opacity: 0.5, scale: 1.06 } : { opacity: 0.18, scale: 1 }}
        transition={{ duration: 1.3 }}
      />
    </div>
  );
}

export function FinalCta() {
  return (
    <section
      className="gradient-cta relative overflow-hidden border-t border-white/10 py-20 text-white sm:py-28"
      id="final"
    >
      <GlowOrbs />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-xs font-medium text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]" />
              Built fast. In production.
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              If you want catalogs your team can trust,{" "}
              <span className="bg-gradient-to-r from-[#38bdf8] to-[#93c5fd] bg-clip-text text-transparent">
                you need continuous evaluation.
              </span>
            </h2>
            <p className="mt-4 text-pretty text-white/70 sm:text-lg">
              Not more cleanup tools. Catalog Agents evaluate, correct, and
              enhance your product data on an ongoing basis — with confidence
              indicators and review workflows your team can act on from day one.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href="#contact"
                className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-2xl bg-white px-6 text-[15px] font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 active:scale-[0.99]"
              >
                Book a pilot
              </a>
              <a
                href="/products"
                className="inline-flex h-12 min-w-[160px] items-center justify-center rounded-2xl border border-white/20 bg-white/8 px-6 text-[15px] font-medium text-white transition hover:bg-white/15"
              >
                Explore the platform →
              </a>
            </div>
            <p className="mt-5 text-sm text-white/40">
              No lock-in. If the agent doesn&apos;t perform, you don&apos;t pay.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
