import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Articles · Paladio Resources",
  description: "In-depth reads on AI agents, catalog operations, and product data strategy.",
};

const articles = [
  {
    title: "Catalog Agents Demo: Before / After SKU Analysis",
    description:
      "SKU-level receipts, not slides. See how Attribute, Taxonomy, Channel Matching, and Compliance agents transform real products — with inputs, diffs, and confidence scores at every stage.",
    tag: "Decision Stage",
    href: "/resources/articles/catalog-agents-demo-before-after-sku",
    date: "2025",
    readTime: "8 min read",
  },
  {
    title: "Catalog Agents vs Enrichment Tools: From One-Time Attributes to Continuous Readiness",
    description:
      "Enrichment tools fill fields. Catalog agents operate catalogs. The difference becomes visible after the SOW closes — when drift, multipack regressions, and taxonomy deltas start accumulating.",
    tag: "Consideration Stage",
    href: "/resources/articles/catalog-agents-vs-enrichment-tools",
    date: "2025",
    readTime: "9 min read",
  },
  {
    title: "Catalog Agents vs Rule-Based Data Quality Platforms: When Rules Stop Scaling",
    description:
      "The 250,000th rule is never the last one. Rule engines encode yesterday's exceptions — catalog agents learn and re-verify under drift. Here's where the line is.",
    tag: "Consideration Stage",
    href: "/resources/articles/catalog-agents-vs-rule-based-data-quality",
    date: "2025",
    readTime: "10 min read",
  },
];

export default function ArticlesPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Articles"
        title="In-depth reads on AI and catalog ops"
        description="We write about what we see in production — data quality patterns, agent design trade-offs, and how AI changes catalog operations at scale."
      />

      <section className="gradient-surface border-t border-slate-200/60 py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.href}>
                <Link
                  href={a.href}
                  className="card group flex h-full flex-col p-6 transition hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-blue-700">
                      {a.tag}
                    </span>
                    <span className="text-[10px] text-slate-400">{a.readTime}</span>
                  </div>
                  <h2 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
                    {a.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {a.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-2 transition-all">
                    Read article <span aria-hidden>→</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PageBottomCta
        title="Want to see AI agents in action?"
        description="Try the live demo or book a pilot — your first agent can be live in weeks."
        primary={{ href: "/try-it", label: "Try it live" }}
        secondary={{ href: "/about#contact", label: "Book a pilot" }}
      />
    </main>
  );
}
