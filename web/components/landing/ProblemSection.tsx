"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { AppIcon, type AppIconName } from "@/lib/icons";

const failures: {
  icon: AppIconName;
  title: string;
  body: string;
  accent: string;
}[] = [
  {
    icon: "AlertTriangle",
    title: "Incomplete attributes",
    body: "AI agents need structured, machine-readable data — dimensions, materials, compatibility, voltage. A product description is not a substitute. Missing a required field doesn't produce an error notice. The product just doesn't show up.",
    accent: "border-t-lime",
  },
  {
    icon: "GitBranch",
    title: "Wrong or inconsistent taxonomy",
    body: "A miscategorized product fails validation, gets buried, or never appears in agent search results. Channel taxonomies update quarterly — a category that was correct at onboarding lands in the wrong place after a revision, with no alert.",
    accent: "border-t-coral",
  },
  {
    icon: "Ban",
    title: "Undetected compliance issues",
    body: "Hazmat flags, multipack mismatches, taxability errors — discovered post-listing. Each one requires a human to trace the failure back to the source field, fix it, and resubmit. At scale, this takes longer than publishing the products in the first place.",
    accent: "border-t-amber",
  },
];

export function ProblemSection() {
  const reduce = useReducedMotion();
  return (
    <section id="problem" className="surface-dark py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-6 justify-center">
              <span className="marker" aria-hidden>◆</span>
              The real problem
            </p>
            <h2 className="heading-section text-surface text-balance">
              AI agents are already choosing what products to recommend.
            </h2>
            <p className="section-lede mx-auto mt-6">
              ChatGPT. Perplexity. Google Shopping AI. They pull from structured product data
              and skip anything they can&apos;t confidently parse. If your catalog has incomplete
              attributes, wrong taxonomy, or unresolved compliance flags — your products don&apos;t
              get recommended. They get passed over.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {failures.map((f, i) => (
            <motion.div
              key={f.title}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`card rounded border-t-2 p-6 ${f.accent}`}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded border border-surface bg-ink text-lime">
                <AppIcon name={f.icon} size={18} />
              </div>
              <h3 className="heading-card text-surface mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-surface-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="card mt-12 rounded p-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-lg font-medium text-surface sm:text-xl">
                The problem isn&apos;t that your catalog is wrong.
              </p>
              <p className="mt-2 text-surface-muted">
                It&apos;s that it wasn&apos;t built for a world where AI systems make purchase decisions.
                Paladio makes it ready — with agents that extract, normalise, map, and verify
                every product record continuously.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/catalog-agents"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded bg-lime px-6 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-px hover:shadow-[0_8px_24px_-8px_oklch(0.82_0.14_225/0.5)]"
                >
                  See catalog agents
                  <AppIcon name="ArrowRight" size={16} />
                </a>
                <a
                  href="/catalog-readiness"
                  className="inline-flex h-11 items-center justify-center rounded border border-surface bg-transparent px-6 text-sm font-medium text-surface-muted transition hover:text-surface"
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
