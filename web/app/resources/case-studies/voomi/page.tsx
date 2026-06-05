import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Voomi Supply — Case Study · Paladio.ai",
  description:
    "How Paladio.ai deployed Catalog Agents to automate marketplace publishing for Voomi Supply — 75% faster publishing, 70% lower cost per product.",
};

const kpis = [
  { k: "75%", l: "Faster product publishing" },
  { k: "70%", l: "Lower cost per product published" },
  { k: "300M+", l: "Listings matched against Amazon" },
];

const steps = [
  {
    n: "01",
    t: "Catalog Structuring",
    bullets: [
      "Extract and normalize product attributes",
      "Standardize naming conventions",
      "Construct structured product profiles",
    ],
  },
  {
    n: "02",
    t: "Taxonomy Alignment",
    bullets: [
      "Classify products into consistent categories",
      "Improve downstream matching and discoverability",
    ],
  },
  {
    n: "03",
    t: "Compliance Signal Detection",
    bullets: [
      "Identify hazmat classifications",
      "Flag multipack configurations",
      "Surface regulatory attributes automatically",
    ],
  },
  {
    n: "04",
    t: "Image Validation",
    bullets: [
      "Automatically validate product imagery",
      "Reduce manual QA dependency",
    ],
  },
  {
    n: "05",
    t: "Targeted Matching Strategy",
    bullets: [
      "Retrieve a constrained candidate set (~15 products per SKU)",
      "Apply structured attributes to improve precision",
      "Eliminate brute-force matching overhead",
    ],
  },
  {
    n: "06",
    t: "Confidence-Based Workflow",
    bullets: [
      "Automate high-confidence matches end-to-end",
      "Route low-confidence cases to human validation",
      "Maintain full traceability of all decisions",
    ],
  },
];

const architecture = [
  {
    t: "Pre-Processing",
    d: "Catalog normalization before any matching begins.",
  },
  {
    t: "Constrained Matching",
    d: "Targeted retrieval with structured attribute precision.",
  },
  {
    t: "Confidence Scoring",
    d: "Every match decision carries a scored confidence signal.",
  },
  {
    t: "Human-in-the-Loop",
    d: "Exceptions routed to review; automation handles the rest.",
  },
];

const outcomes = [
  "Improved match precision and listing reliability across all SKUs",
  "Scalable supplier onboarding without linear headcount growth",
  "Automated compliance signal detection at scale",
  "Reduced operational bottlenecks and faster marketplace expansion",
];

export default function VoomiCaseStudy() {
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
                HVAC Distribution
              </span>
            </div>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Voomi Supply
            </h1>
            <p className="mt-3 max-w-2xl text-xl text-slate-600">
              Catalog Structuring for Marketplace Readiness
            </p>
          </Reveal>

          {/* KPIs */}
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
                The catalog problem in HVAC distribution
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Voomi Supply aggregates product catalogs from a distributed network of HVAC manufacturers
                and distributors and publishes them across marketplaces such as Amazon. The fundamental
                challenge: supplier catalogs are not designed for marketplace consumption.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.04}>
                <div className="card-soft p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    Supplier catalog reality
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    Catalogs arrive sparse, inconsistent, and structurally incomplete — built for internal
                    use, not for the precision that marketplace matching demands.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <div className="card-soft p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    Marketplace requirement
                  </p>
                  <p className="text-sm leading-relaxed text-slate-700">
                    Publishing against 300M+ Amazon listings requires exact attribute alignment,
                    compliance signals, validated imagery, and precise category classification.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l-4 border-lime pl-5">
                <p className="text-lg font-medium text-slate-800 italic">
                  &ldquo;Marketplace performance is constrained not by supply, but by the structure of product data.&rdquo;
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
                Where the publishing workflow broke down
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Reveal delay={0.04}>
                <div className="card p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">
                    Existing workflow
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {[
                      "Rule-based catalog matching",
                      "Manual validation of product configuration",
                      "Manual imagery and compliance review",
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
                    Marketplace risk factors
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {[
                      "Incorrect matches lead to listing suppression",
                      "Missing attributes reduce discoverability",
                      "Compliance gaps create operational risk",
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
                    "Slow publishing cycles that delayed time-to-market for new suppliers",
                    "High operational cost driven by manual validation at every step",
                    "Limited scalability — supplier onboarding could not grow without headcount",
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
                Catalog Agents for structured marketplace publishing
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Paladio deployed Catalog Agents to construct a structured representation of each product
                before marketplace matching — replacing brute-force matching with a precision pipeline
                built on catalog structuring, taxonomy alignment, compliance detection, and
                confidence-based automation.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={0.05 * i}>
                <div className="card-soft h-full p-6">
                  <p className="font-display text-2xl font-semibold text-slate-200">{s.n}</p>
                  <p className="mt-1 text-base font-semibold text-slate-900">{s.t}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[var(--lime)] to-[var(--lime-dim)]" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Architecture */}
          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
                System design layers
              </p>
              <div className="grid gap-3 sm:grid-cols-4">
                {architecture.map((a, i) => (
                  <div
                    key={a.t}
                    className="relative rounded-xl border border-line/70 bg-gradient-to-b from-slate-50 to-white p-4 text-center"
                  >
                    {i < architecture.length - 1 && (
                      <span className="hidden sm:block absolute -right-1.5 top-1/2 -translate-y-1/2 text-slate-300 text-lg">›</span>
                    )}
                    <p className="text-xs font-semibold text-slate-900">{a.t}</p>
                    <p className="mt-1.5 text-[11px] text-slate-500 leading-relaxed">{a.d}</p>
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
                Speed, cost, and precision — transformed together
              </h2>
              <p className="mt-3 text-slate-600">
                The Catalog Agent pipeline delivered what manual workflows could not: fast, accurate,
                scalable marketplace publishing without linear growth in operational cost.
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

            {/* Before / After */}
            <Reveal delay={0.12}>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="card-soft p-6 border-rose-100/80">
                  <p className="text-xs font-semibold uppercase tracking-widest text-rose-600 mb-3">Before</p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Manual, rule-based publishing workflows — slow, costly, and unable to scale with supplier growth.
                  </p>
                </div>
                <div className="card p-6 border-emerald-100/80 bg-emerald-50/30">
                  <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700 mb-3">After</p>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    A structured catalog intelligence layer that automates publishing, compliance, and matching at scale.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <blockquote className="mt-10 border-l-4 border-lime pl-5">
                <p className="text-lg font-medium text-slate-800 italic">
                  &ldquo;Marketplace performance is constrained not by supply, but by the structure of product data.&rdquo;
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
                Ready to see this on your catalog?
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
                  href="/resources/case-studies/profitero"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 shadow-sm transition hover:border-line hover:text-ink"
                >
                  Read Profitero case study →
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
