"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";
import { RocketVisual } from "@/components/landing/RocketVisual";
import { HeroBackground } from "@/components/landing/HeroBackground";

const stats = [
  { v: "2+", l: "domains in production" },
  { v: "94%", l: "eval pass rate" },
  { v: "40K+", l: "records processed / hr" },
] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section
      className="gradient-hero relative border-b border-slate-200/50 pt-28 pb-20 sm:pb-24"
      id="top"
    >
      <HeroBackground />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <motion.div
            variants={reduce ? undefined : container}
            initial={reduce ? false : "hidden"}
            animate="visible"
          >
            <motion.p
              variants={reduce ? undefined : item}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-blue-900 shadow-sm shadow-blue-900/5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]" />
              Get Ready For Agentic Commerce
            </motion.p>

            <motion.h1
              variants={reduce ? undefined : item}
              className="font-display text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]"
            >
              Enrich, Trust &amp; Syndicate{" "}
              <span className="bg-gradient-to-r from-[#2563eb] via-[#0284c7] to-[#0ea5e9] bg-clip-text text-transparent">
                Your Catalog.
              </span>
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : item}
              className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-slate-600 sm:text-[17px]"
            >
              AI agents that continuously evaluate, correct, and enhance your
              product catalog using structured reasoning — not one-time
              enrichment. Products go live in hours, not weeks.
            </motion.p>

            <motion.div
              variants={reduce ? undefined : item}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              id="book"
            >
              <ButtonLink href="/try-it" variant="primaryLg">
                See a live agent
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondaryLg">
                Book a pilot
              </ButtonLink>
            </motion.div>

            <motion.div
              variants={reduce ? undefined : item}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.v}
                  className="flex items-baseline gap-1.5"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <span className="font-display text-lg font-semibold text-slate-900">
                    {s.v}
                  </span>
                  <span className="text-xs text-slate-500">{s.l}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block"
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <RocketVisual />
          </motion.div>
        </div>

        <motion.div
          className="mt-12 block lg:hidden"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <RocketVisual />
        </motion.div>
      </Container>
    </section>
  );
}
