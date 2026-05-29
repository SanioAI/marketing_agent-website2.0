import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Product Intelligence · Paladio",
  description: "Turn your catalog into a decision engine for pricing, merchandising, and personalization. Sales history, reviews, inventory, and pricing signals at the SKU level.",
};

const capabilities = [
  {
    n: "01",
    title: "Pricing Intelligence",
    desc: "Surface competitive price gaps, margin signals, and demand elasticity indicators at the SKU level — so pricing decisions are informed by real catalog data, not gut feel.",
  },
  {
    n: "02",
    title: "Review & Sentiment Signals",
    desc: "Extract structured signals from reviews: what buyers praise, what they complain about, and which attribute gaps drive negative sentiment. Fix data problems before they compound.",
  },
  {
    n: "03",
    title: "Inventory-Aware Merchandising",
    desc: "Connect inventory position to catalog decisions. Know which high-performing SKUs are undersupplied and which overstocked products need promotion support.",
  },
  {
    n: "04",
    title: "Sales Performance by Attribute",
    desc: "Understand which enrichment changes drove conversion lift. When Catalog Agents adds a missing attribute, Product Intelligence tracks whether it moved the needle.",
  },
  {
    n: "05",
    title: "Personalization Tags",
    desc: "Generate structured tags and affinity signals your recommendation engine can use — so the same enrichment that helps marketplaces also powers your on-site experience.",
  },
  {
    n: "06",
    title: "Catalog Health Trends",
    desc: "Track enrichment completeness, review sentiment, and pricing accuracy over time. Spot drift before it affects revenue — not after a quarterly review.",
  },
];

const decisions = [
  {
    label: "Which products to promote",
    desc: "Score SKUs on demand signal, review sentiment, and completeness. Put catalog budget behind products that will actually convert.",
  },
  {
    label: "Where to cut prices",
    desc: "Identify SKUs where you're priced above market without a meaningful attribute advantage. Close the gap or reposition the content.",
  },
  {
    label: "What to bundle",
    desc: "Surface frequently co-purchased SKUs with complementary attributes. Bundle logic built on catalog data, not historical intuition.",
  },
  {
    label: "When to retire a SKU",
    desc: "Catch declining SKUs early: low review scores, thin content, inventory buildup, and dropping search placement — all in one signal.",
  },
];

export default function ProductIntelligencePage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Product Intelligence"
        title="Your catalog already knows which products to promote. Most teams never ask it."
        description="Pricing gaps, review-driven attribute failures, inventory-weighted conversion signals — they're in your enriched catalog data. Product Intelligence surfaces them at the SKU level, so decisions are informed by what the data says, not what feels right."
      />

      {/* Capabilities */}
      <section className="gradient-surface border-t border-slate-200/60 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                What it surfaces
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Pricing. Reviews. Inventory. Sales.
              </h2>
              <p className="mt-3 text-slate-600">
                Four data streams most teams manage in separate tools, on separate cycles, with separate owners. Product Intelligence pulls them into a single layer — connected to your actual SKUs, not aggregated away from them.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <Reveal key={c.n}>
                <div className="card h-full p-6">
                  <span className="font-display text-2xl font-semibold text-slate-200">{c.n}</span>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* The decisions it powers */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Decisions it powers
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Not dashboards. Decisions.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Most catalog analytics tools show you what happened to the catalog. Product Intelligence tells you what to do next — and connects every signal back to a specific SKU your team can act on. A pricing gap isn&apos;t a chart. It&apos;s a list of products where you&apos;re priced above market without a meaningful attribute advantage.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {decisions.map((d) => (
              <Reveal key={d.label}>
                <div className="card h-full p-6">
                  <h3 className="text-base font-semibold text-slate-900">{d.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Built on enriched data */}
      <section className="gradient-surface border-t border-b border-slate-200/60 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="section-kicker mb-4">
                  <span className="dot" aria-hidden />
                  The feedback loop
                </p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Intelligence is only as good as the data underneath it
                </h2>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Product Intelligence is powered by the same enrichment pipeline as Catalog Agents. Every attribute, taxonomy classification, and content score feeds a unified data layer — so the insights reflect your actual catalog, not a sample or an estimate built from incomplete records.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  The feedback loop runs in both directions: Catalog Agents enriches your product data. Product Intelligence surfaces which enrichment changes moved the needle on conversion. The next enrichment cycle is more targeted because you know which attributes actually matter for each category.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  Profitero uses this layer to run catalog quality analysis across 1,500+ retailer sites globally — the intelligence is only as useful as the enrichment underneath it. When the enrichment is accurate and current, the signals are too.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/catalog-agents"
                    className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
                  >
                    See Catalog Agents →
                  </a>
                  <a
                    href="/about#contact"
                    className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Request early access
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-50 to-white p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Coming soon
                </p>
                <ul className="space-y-3">
                  {[
                    "Real-time catalog health dashboard",
                    "Pricing gap detection by category",
                    "Review sentiment extraction per SKU",
                    "Inventory-weighted promotion scoring",
                    "API access for BI integrations",
                    "Personalization tag export for rec engines",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100">
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                          <path d="M1 4L3.5 6.5L9 1" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span className="text-sm text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <PageBottomCta
        title="Want early access to Product Intelligence?"
        description="We're onboarding a small group of design partners. Get in touch to be first in line."
        primary={{ href: "/about#contact", label: "Request early access" }}
        secondary={{ href: "/catalog-agents", label: "See Catalog Agents" }}
      />
    </main>
  );
}
