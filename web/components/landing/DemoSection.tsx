"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";
import { motion } from "framer-motion";

export function DemoSection() {
  return (
    <section id="demo" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              See Paladio.ai agents in action
            </h2>
            <p className="mt-3 text-balance text-slate-600">
              A quick walkthrough, or we’ll run your anonymized sample live. Catalog Agents and AEC
              Agents share the same playbook: governed, auditable outputs—no “magic demo environment.”
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700">
              <li>• Before/after exports with rationale</li>
              <li>• Compliance guardrails and structured outputs</li>
              <li>• Deliverables your team can actually ship</li>
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href="mailto:demo@paladio.ai?subject=30-minute%20Paladio.ai%20walkthrough"
                variant="primaryLg"
              >
                Book a live walkthrough
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <motion.div
              className="group relative aspect-video overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-900 to-indigo-950 p-1 shadow-2xl shadow-slate-900/15"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
            >
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-950/90">
                <div className="px-4 text-center">
                  <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                    Product tour (placeholder)
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    Embed a Loom, Wistia, or Vimeo iframe here, or use a self-hosted
                    <code className="mx-1 rounded bg-slate-800/80 px-1.5 py-0.5 text-xs">next/video</code>{" "}
                    asset.
                  </p>
                  <div
                    className="mx-auto mt-5 h-10 w-10 rounded-full border border-slate-600/80"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 0%, #6366f1 40%, transparent 80%)",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
