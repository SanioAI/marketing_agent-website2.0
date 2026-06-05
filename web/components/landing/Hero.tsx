"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";
import { RocketVisual } from "@/components/landing/RocketVisual";
import { HeroBackground } from "@/components/landing/HeroBackground";

const stats = [
  { v: "1M+", l: "SKUs processed for Voomi Supply" },
  { v: "~85%", l: "faster product publishing" },
  { v: ">95%", l: "precision on attribute extraction" },
] as const;

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      className="gradient-hero relative border-b border-surface pt-28 pb-20 sm:pb-24"
      id="top"
    >
      <HeroBackground />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="section-kicker mb-8 text-surface-muted">
              <span className="dot" aria-hidden />
              Catalog Intelligence for Agentic Commerce
            </p>

            <h1 className="heading-hero text-balance text-surface">
              Your catalog decides what AI agents{" "}
              <span className="text-accent-serif">recommend.</span>
            </h1>

            <p className="section-lede mt-6 max-w-xl text-surface-muted">
              Most catalogs weren&apos;t built for this. Paladio makes yours ready — with purpose-built agents that extract, normalise, map, and verify every product record at scale.
            </p>

            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              id="book"
            >
              <ButtonLink href="/catalog-readiness" variant="primaryLg">
                Assess catalog readiness
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondaryOnDarkLg">
                Book a pilot
              </ButtonLink>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              {stats.map((s, i) => (
                <motion.div
                  key={s.v}
                  className="flex items-baseline gap-1.5"
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                >
                  <span className="text-lg font-semibold text-surface">{s.v}</span>
                  <span className="text-xs text-surface-muted">{s.l}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={reduce ? false : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
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
