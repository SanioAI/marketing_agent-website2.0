"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const faqs = [
  {
    q: "Is this just enrichment?",
    a: "No. Catalog Agents continuously evaluate and correct catalogs over time. Unlike one-time enrichment tools, they run on an ongoing basis — catching new errors, adapting to feed changes, and improving quality with every cycle.",
  },
  {
    q: "Do you replace our PIM?",
    a: "No. Catalog Agents sit upstream and improve the data flowing into your PIM and channels. There's no rip-and-replace — the agents integrate with your existing stack and deploy in weeks, not quarters.",
  },
  {
    q: "What data sources do you use?",
    a: "Vendor feeds, PDFs, spreadsheets, images, and unstructured text. The agents normalize across all of them into structured, channel-ready product data.",
  },
  {
    q: "How long does deployment take?",
    a: "Typically a few weeks, depending on data sources and scale. We scope, build, evaluate, and deploy your first agent — with structured outputs and review workflows your team can act on from day one.",
  },
  {
    q: "Is this safe for production catalogs?",
    a: "Yes. It's designed for high-scale, high-impact commerce environments. Every output includes confidence indicators, before/after audit trails, and human-in-the-loop review workflows so nothing goes live without your team's sign-off.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { y: 12 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="border-b border-line/70 last:border-0"
    >
      <button
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-base font-medium text-surface">{faq.q}</span>
        <motion.span
          className="mt-0.5 shrink-0 text-surface-muted"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed text-surface-muted">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  return (
    <section className="gradient-surface border-t border-line/60 py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Frequently Asked Questions
              </p>
              <h2 className="heading-section text-surface">
                Your questions, answered
              </h2>
            </div>
          </Reveal>
          <div className="card rounded px-6 sm:px-8">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
