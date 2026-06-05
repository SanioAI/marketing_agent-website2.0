import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Profitero — Case Study · Paladio.ai",
  description:
    "How Paladio.ai built a multi-layer product identity resolution system for Profitero — 80%+ automated accuracy across 300+ client datasets.",
};

const kpis = [
  { k: "80%+", l: "Automated deduplication accuracy" },
  { k: "1,000+", l: "Dataset scalability achieved" },
  { k: "300+", l: "Client datasets processed" },
];

const layers = [
  {
    n: "01",
    t: "Deterministic Identity Resolution",
    bullets: [
      "Normalize UPC / EAN / SKU identifiers",
      "Establish high-confidence base clusters",
      "Handle malformed or partial identifiers",
    ],
  },
  {
    n: "02",
    t: "Attribute Similarity Modeling",
    bullets: [
      "Tokenize and normalize product metadata",
      "Apply similarity scoring across titles, brands, categories",
      "Recover near-matches beyond exact identifiers",
    ],
  },
  {
    n: "03",
    t: "Semantic Matching",
    bullets: [
      "Generate vector embeddings for all products",
      "Compare candidates using cosine similarity",
      "Match across language differences and partial data",
    ],
  },
  {
    n: "04",
    t: "Model-Based Reasoning",
    bullets: [
      "Re-rank candidate matches using LLMs",
      "Classify duplicate vs. non-duplicate pairs",
      "Resolve ambiguous edge cases with contextual reasoning",
    ],
  },
  {
    n: "05",
    t: "Ensemble Clustering",
    bullets: [
      "Combine outputs from all upstream layers into a unified signal",
      "Prioritize high-confidence matches (>0.99 threshold)",
      "Construct final unified product clusters across all datasets",
    ],
  },
];

const architecture = [
  {
    t: "API-Driven Orchestration",
    d: "Modular, scalable pipeline execution across all data sources via API.",
  },
  {
    t: "Continuous Ingestion",
    d: "Incremental updates and model retraining as new data arrives.",
  },
  {
    t: "Confidence-Gated Review",
    d: "Human review limited to low-confidence cases. Every decision is scored.",
  },
];

const outcomes = [
  "Cross-retailer, multilingual product matching at production scale",
  "Significantly reduced manual validation overhead",
  "Scalable architecture ready for continued data growth",
  "Reduced processing latency and faster turnaround time",
];

export default function ProfiteroCaseStudy() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="gradient-hero border-b border-slate-200/50 py-16 sm:py-20">
        <Container>
          <Reveal>
            <Link
              href="/resources"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-ink-deep transition"
            >
              ← Back to Resources
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="rounded-full border border-line/70 bg-paper-dim/60 px-3 py-1 text-[11px] font-medium text-ink uppercase tracking-wider">
                Case Study
              </span>
              <span className="rounded-full border border-line/70 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-600 uppercase tracking-wider">
                Global E-commerce Analytics
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Profitero
            </h1>
            <p className="mt-3 max-w-2xl text-xl text-slate-600">
              Product Identity Resolution at Global Scale
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {kpis.map((k, i) => (
              <Reveal key={k.k} delay={0.06 * i}>
                <div className="rounded-2xl border border-line/60 bg-white/80 px-6 py-5 text-center shadow-sm">
                  <p className="stat-value text-3xl">{k.k}</p>
                  <p className="mt-1 text-sm text-slate-500">{k.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Background */}
      <section className="border-t border-line/60 gradient-surface py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Background
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                The challenge of product identity at scale
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Profitero operates across hundreds of retailers and brands, ingesting massive volumes
                of product data across geographies, languages, and formats. At this scale, the concept
                of a &ldquo;product&rdquo; is not stable — it is a moving target.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.04}>
                <div className="card-soft p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    The reality
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    The same physical product appears with different identifiers, inconsistent attributes,
                    across multiple retailers and languages — as separate SKUs with no deterministic
                    linkage between them.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="card-soft p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    The scale
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    300+ client datasets. Multilingual catalogs spanning dozens of markets. Inconsistent
                    and incomplete data sources that defeat any single-method matching strategy.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l-4 border-lime pl-5">
                <p className="text-lg font-medium text-slate-800 italic">
                  &ldquo;Product identity is not a field. It is an inference problem over incomplete data.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Problem */}
      <section className="border-t border-line/60 gradient-surface py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                The Problem
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Where existing approaches broke down
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.04}>
                <div className="card p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    Legacy approach
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {[
                      "Rule-based matching logic",
                      "Identifier normalization only",
                      "Manual validation workflows",
                    ].map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" aria-hidden />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="card p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    Failure conditions
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {[
                      "Missing or corrupted identifiers",
                      "High attribute variability",
                      "Cross-retailer inconsistencies",
                    ].map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-1.5 text-rose-500 text-xs shrink-0">✕</span>
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="mt-4 card-soft p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Consequences</p>
                <ul className="space-y-2 text-sm text-slate-700">
                  {[
                    "Incomplete and inconsistent product grouping across the catalog",
                    "High operational overhead from manual review and correction",
                    "Limited scalability — system could not grow with the business",
                  ].map((x) => (
                    <li key={x} className="flex gap-2">
                      <span className="mt-1.5 text-rose-500 text-xs shrink-0">✕</span>
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Solution */}
      <section className="border-t border-line/60 gradient-surface py-14 sm:py-16">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Solution
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                A five-layer identity resolution system
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Paladio designed a five-layer identity resolution architecture combining deterministic logic,
                statistical similarity modeling, semantic vector search, LLM-based reasoning, and ensemble
                clustering — each layer compensating for the limitations of the last.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {layers.map((l, i) => (
              <Reveal key={l.n} delay={0.05 * i}>
                <div className="card-soft flex gap-5 p-6">
                  <p className="font-display text-2xl font-semibold text-slate-200 shrink-0 leading-none pt-0.5">
                    {l.n}
                  </p>
                  <div>
                    <p className="text-base font-semibold text-slate-900">{l.t}</p>
                    <ul className="mt-2 space-y-1.5 text-sm text-slate-600">
                      {l.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[var(--lime)] to-[var(--lime-dim)]" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Architecture */}
          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                System design principles
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {architecture.map((a) => (
                  <div
                    key={a.t}
                    className="rounded-xl border border-line/70 bg-gradient-to-b from-slate-50 to-white p-5"
                  >
                    <p className="text-sm font-semibold text-slate-900">{a.t}</p>
                    <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{a.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Results */}
      <section className="border-t border-line/60 gradient-surface py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Results
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Accuracy, scale, and speed — delivered together
              </h2>
              <p className="mt-3 text-slate-600">
                The system achieved what rule-based approaches could not: reliable product identity across
                hundreds of retailers, dozens of languages, and thousands of datasets.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {kpis.map((k, i) => (
                <Reveal key={k.k} delay={0.06 * i}>
                  <div className="card p-6 text-center">
                    <p className="stat-value text-3xl">{k.k}</p>
                    <p className="mt-1 text-sm text-slate-600">{k.l}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <div className="mt-6 card p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                  Additional outcomes
                </p>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  {outcomes.map((o) => (
                    <li key={o} className="flex gap-2.5">
                      <span className="mt-0.5 text-emerald-600 shrink-0">✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="card-soft p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-3">Before</p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Static, rule-based matching — brittle, manual, and unable to adapt to data variability or scale.
                  </p>
                </div>
                <div className="card p-6 border-emerald-100/80 bg-emerald-50/30">
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">After</p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    A dynamic product identity layer capable of adapting to any data variability, language, or retailer format.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <blockquote className="mt-10 border-l-4 border-lime pl-5">
                <p className="text-lg font-medium text-slate-800 italic">
                  &ldquo;Product identity is not a field. It is an inference problem over incomplete data.&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-line/60 gradient-surface py-14">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Ready to see this on your data?
              </h2>
              <p className="mt-3 text-slate-600">
                We scope, build, and deploy in weeks — not quarters.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/#contact"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-[var(--lime)] via-[var(--lime-dim)] to-[var(--lime-dim)] px-6 text-sm font-medium text-white shadow-sm transition hover:opacity-90"
                >
                  Book a demo
                </Link>
                <Link
                  href="/resources/case-studies/voomi"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 shadow-sm transition hover:border-line hover:text-ink"
                >
                  Read Voomi case study →
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
