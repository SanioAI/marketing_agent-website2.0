"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { AppIcon, type AppIconName } from "@/lib/icons";

const agents: {
  icon: AppIconName;
  label: string;
  desc: string;
}[] = [
  {
    icon: "Zap",
    label: "Attribute Agent",
    desc: "Extracts 10–15+ structured attributes per product — dimensions, materials, specs, compatibility — from unstructured descriptions and raw feeds.",
  },
  {
    icon: "Tag",
    label: "Taxonomy Agent",
    desc: "Maps every product to the correct category across Amazon, Google, Walmart, Mirakl — and keeps mappings current as taxonomies change.",
  },
  {
    icon: "Type",
    label: "Brand Normalization Agent",
    desc: "Resolves brand variants, manufacturer names, and alias mismatches across the catalog. Profitero used this across 1,000+ brands in 80+ languages.",
  },
  {
    icon: "Link2",
    label: "Channel Matching Agent",
    desc: "Matches your SKUs to ASINs, UPCs, and internal channel identifiers — the foundation for accurate marketplace syndication at scale.",
  },
  {
    icon: "Shield",
    label: "Compliance Agent",
    desc: "Detects hazmat classifications, multipack mismatches, and regulatory flags before they become marketplace rejections or tax liability.",
  },
  {
    icon: "BarChart3",
    label: "Product Graph Agent",
    desc: "Builds relationships between products — substitutes, OEM parts, accessories, fitment data. The structure AI agents need to make safe substitution decisions.",
  },
];

const flowNodes: (
  | { type: "arrow" }
  | { icon: AppIconName; label: string; sub: string; highlight?: boolean; lime?: boolean }
)[] = [
  { icon: "Package", label: "Your raw catalog", sub: "PIM / ERP / CSV" },
  { type: "arrow" },
  { icon: "Zap", label: "Catalog Agents", sub: "Extract · Map · Verify", highlight: true },
  { type: "arrow" },
  { icon: "Rocket", label: "AI-ready catalog", sub: "Agents · Marketplaces", lime: true },
];

export function CatalogAgentsGrid() {
  const reduce = useReducedMotion();
  return (
    <section className="surface-dark py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-6 justify-center">
              <span className="marker" aria-hidden>◆</span>
              How it works
            </p>
            <h2 className="heading-section text-surface text-balance">
              Six agents. One operating layer.
            </h2>
            <p className="section-lede mx-auto mt-6">
              Paladio sits above your PIM or ERP. Each agent runs a specific operation — in parallel, at scale. You get a catalog that AI systems can actually use.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mb-12 flex items-center justify-center gap-4">
            {flowNodes.map((node, i) =>
              "type" in node ? (
                <AppIcon
                  key={i}
                  name="ArrowRight"
                  size={20}
                  className="hidden text-lime sm:block"
                />
              ) : (
                <div
                  key={i}
                  className={`card flex max-w-[160px] flex-1 flex-col items-center rounded p-4 text-center ${
                    node.highlight
                      ? "border-lime bg-lime/10"
                      : node.lime
                        ? "border-lime/40 bg-lime/5"
                        : ""
                  }`}
                >
                  <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded border border-surface text-lime">
                    <AppIcon name={node.icon} size={16} />
                  </div>
                  <div className="text-xs font-semibold text-surface">{node.label}</div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-mute">
                    {node.sub}
                  </div>
                </div>
              )
            )}
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((a, i) => (
            <motion.div
              key={a.label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="card rounded p-6"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded border border-surface bg-ink text-lime">
                <AppIcon name={a.icon} size={18} />
              </div>
              <h3 className="heading-card text-surface mb-2 text-base">{a.label}</h3>
              <p className="text-xs leading-relaxed text-surface-muted">{a.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/catalog-agents"
            className="inline-flex items-center gap-2 rounded border border-surface px-6 py-2.5 text-sm font-medium text-surface-muted transition hover:text-surface"
          >
            Explore the full agent stack
            <AppIcon name="ArrowRight" size={14} className="text-lime" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
