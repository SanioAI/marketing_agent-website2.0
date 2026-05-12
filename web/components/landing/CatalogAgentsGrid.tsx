"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const agents = [
  {
    icon: "⚡",
    label: "Attribute Agent",
    desc: "Extracts 10–15+ structured attributes per product — dimensions, materials, specs, compatibility — from unstructured descriptions and raw feeds.",
    accent: "bg-[rgba(0,212,255,0.10)] text-[#00D4FF]",
  },
  {
    icon: "🏷",
    label: "Taxonomy Agent",
    desc: "Maps every product to the correct category across Amazon, Google, Walmart, Mirakl — and keeps mappings current as taxonomies change.",
    accent: "bg-[rgba(163,255,60,0.10)] text-[#A3FF3C]",
  },
  {
    icon: "🔤",
    label: "Brand Normalization Agent",
    desc: "Resolves brand variants, manufacturer names, and alias mismatches across the catalog. Profitero used this across 1,000+ brands in 80+ languages.",
    accent: "bg-[rgba(155,89,255,0.10)] text-[#9B59FF]",
  },
  {
    icon: "🔗",
    label: "Channel Matching Agent",
    desc: "Matches your SKUs to ASINs, UPCs, and internal channel identifiers — the foundation for accurate marketplace syndication at scale.",
    accent: "bg-[rgba(0,212,255,0.10)] text-[#00D4FF]",
  },
  {
    icon: "🛡",
    label: "Compliance Agent",
    desc: "Detects hazmat classifications, multipack mismatches, and regulatory flags before they become marketplace rejections or tax liability.",
    accent: "bg-[rgba(239,68,68,0.10)] text-[#F87171]",
  },
  {
    icon: "📊",
    label: "Product Graph Agent",
    desc: "Builds relationships between products — substitutes, OEM parts, accessories, fitment data. The structure AI agents need to make safe substitution decisions.",
    accent: "bg-[rgba(163,255,60,0.10)] text-[#A3FF3C]",
  },
];

export function CatalogAgentsGrid() {
  const reduce = useReducedMotion();
  return (
    <section className="bg-[#050C17] py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
              How it works
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Six agents. One operating layer.
            </h2>
            <p className="mt-3 text-slate-400">
              Paladio sits above your PIM or ERP. Each agent runs a specific operation — in parallel, at scale. You get a catalog that AI systems can actually use.
            </p>
          </div>
        </Reveal>

        {/* Flow */}
        <Reveal>
          <div className="mb-12 flex items-center justify-center gap-4">
            {[
              { icon: "📦", label: "Your raw catalog", sub: "PIM / ERP / CSV" },
              { arrow: true },
              { icon: "⚡", label: "Catalog Agents", sub: "Extract · Map · Verify", highlight: true },
              { arrow: true },
              { icon: "🚀", label: "AI-ready catalog", sub: "Agents · Marketplaces", lime: true },
            ].map((node, i) =>
              "arrow" in node ? (
                <span key={i} className="text-2xl text-[#00D4FF] hidden sm:block">→</span>
              ) : (
                <div
                  key={i}
                  className={`rounded-xl border p-4 text-center flex-1 max-w-[160px] ${
                    node.highlight
                      ? "border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)]"
                      : node.lime
                      ? "border-[rgba(163,255,60,0.25)] bg-[rgba(163,255,60,0.06)]"
                      : "border-white/[0.07] bg-[#0A1628]"
                  }`}
                >
                  <div className="text-xl mb-1">{node.icon}</div>
                  <div className="text-xs font-semibold text-white">{node.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{node.sub}</div>
                </div>
              )
            )}
          </div>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a, i) => (
            <motion.div
              key={a.label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="rounded-xl border border-white/[0.07] bg-[#0A1628] p-6"
            >
              <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg text-xl ${a.accent}`}>
                {a.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">{a.label}</h3>
              <p className="text-xs leading-relaxed text-slate-400">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/catalog-agents"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/40 hover:text-white"
          >
            Explore the full agent stack →
          </Link>
        </div>
      </Container>
    </section>
  );
}
