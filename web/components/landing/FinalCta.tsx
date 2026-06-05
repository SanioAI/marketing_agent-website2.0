"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";
import { AppIcon } from "@/lib/icons";

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
        className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-lime/15 blur-3xl"
        initial={false}
        animate={!reduce && visible ? { opacity: 0.6, scale: 1.08 } : { opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-ink/30 blur-3xl"
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
      className="gradient-cta relative overflow-hidden border-t border-surface py-20 sm:py-28"
      id="final"
    >
      <GlowOrbs />
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4 justify-center">
              <span className="dot" aria-hidden />
              Built fast. In production.
            </p>
            <h2 className="heading-section text-surface text-balance">
              If you want catalogs your team can trust,{" "}
              <span className="text-accent-serif">
                you need continuous evaluation.
              </span>
            </h2>
            <p className="section-lede mx-auto mt-6 text-pretty">
              Not more cleanup tools. Catalog Agents evaluate, correct, and
              enhance your product data on an ongoing basis — with confidence
              indicators and review workflows your team can act on from day one.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ButtonLink href="#contact" variant="primaryLg" className="min-w-[200px]">
                Book a pilot
              </ButtonLink>
              <ButtonLink href="/products" variant="secondaryOnDarkLg" className="min-w-[160px] gap-2">
                Explore the platform
                <AppIcon name="ArrowRight" size={16} />
              </ButtonLink>
            </div>
            <p className="mt-5 text-sm text-mute">
              No lock-in. If the agent doesn&apos;t perform, you don&apos;t pay.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
