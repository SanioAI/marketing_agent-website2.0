"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";
import { CatalogDashboard } from "@/components/landing/CatalogDashboard";
import { AppIcon } from "@/lib/icons";

export function DemoSection() {
  return (
    <section id="demo" className="gradient-surface border-t border-line/60 py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              See it in action
            </p>
            <h2 className="heading-section text-surface">
              Watch the agent work in real time
            </h2>
            <p className="section-lede mx-auto mt-6 text-balance">
              Every product evaluated, corrected, and scored — with full reasoning behind every change.
              This is what runs in production today.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12">
            <CatalogDashboard />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink
              href="mailto:demo@paladio.ai?subject=30-minute%20Paladio.ai%20walkthrough"
              variant="primaryLg"
            >
              Book a live walkthrough
            </ButtonLink>
            <ButtonLink href="/agents/ecommerce" variant="secondaryLg" className="gap-2">
              Explore Catalog Agents
              <AppIcon name="ArrowRight" size={16} />
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
