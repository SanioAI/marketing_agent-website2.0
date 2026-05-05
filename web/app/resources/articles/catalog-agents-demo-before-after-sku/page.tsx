import { Container } from "@/components/ui/Container";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import Link from "next/link";

export const metadata = {
  title: "Catalog Agents Demo | Before & After SKU Proof",
  description:
    "SKU receipts, not slides: Voomi-scale multipack/hazmat/matching patterns; Profitero >95% P/R discipline; catalog agents demo script.",
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-600">
      {children}
    </p>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-2xl border border-blue-100 bg-blue-50/60 px-6 py-5 text-sm leading-relaxed text-slate-700">
      {children}
    </div>
  );
}

export default function ArticlePage() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="gradient-surface border-b border-slate-200/60 py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-200/70 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Catalog Agents
              </span>
              <span className="text-xs text-slate-400">Decision Stage · 8 min read</span>
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Catalog Agents Demo: Before / After SKU Analysis
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Buyers have seen ten identical &ldquo;AI for PIM&rdquo; decks. What they need
              before procurement is SKU-level receipts — inputs, diffs, and
              confidence scores. This is that demo.
            </p>
          </div>
        </Container>
      </section>

      {/* Article body */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-14 text-slate-700">

            {/* 1 */}
            <div>
              <SectionLabel>01 — What the demo proves</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Agent-decidable delta, not AI magic
              </h2>
              <p className="leading-relaxed">
                The demo is evidence, not theater. It shows a single SKU slice
                flowing through four agent types — Attribute, Taxonomy, Channel
                Matching, and Compliance — with visible inputs, structured diffs,
                and confidence indicators at every stage.
              </p>
              <p className="mt-4 leading-relaxed">
                This mirrors exactly how Voomi Supply proved correctness across
                1M+ SKUs matched against 200M+ ASINs, with multipack and hazmat
                gates that previously required manual rule-writing and VA review.
                And how Profitero proved &gt;95% precision/recall on constrained
                labels — not with slides, but with label-level receipts.
              </p>
              <Callout>
                <strong>The test:</strong> pick 5–10 SKUs with known defects —
                multipack mislabeling, hazmat gaps, taxonomy drift, ASIN ambiguity.
                Run them through the agent pipeline. Show what changed, why it
                changed, and the confidence attached to each change.
              </Callout>
            </div>

            {/* 2 */}
            <div>
              <SectionLabel>02 — SKU selection criteria</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Choose messy, not clean
              </h2>
              <p className="leading-relaxed">
                The most common demo mistake: cherry-picking clean SKUs. If every
                product is already well-structured, you&apos;re proving nothing.
                Buyers will immediately ask what happens with their actual feed —
                which is never clean.
              </p>
              <p className="mt-4 leading-relaxed">
                Select SKUs that represent the categories of failure your buyer
                actually encounters:
              </p>
              <ul className="mt-4 space-y-3">
                {[
                  { label: "Multipack mislabels", desc: "SKUs listed as single units that are actually 2-pack, 4-pack, or case quantities — a top cause of ASIN rejection on Amazon." },
                  { label: "Hazmat gaps", desc: "Products with lithium batteries, flammables, or regulated chemicals with missing or incorrect hazmat classification." },
                  { label: "Taxonomy drift", desc: "Products classified into the wrong category node — especially common after marketplace taxonomy updates or supplier feed refreshes." },
                  { label: "ASIN ambiguity", desc: "Items that match multiple ASINs at varying confidence, requiring resolution logic rather than a deterministic lookup." },
                ].map((item) => (
                  <li key={item.label} className="flex gap-3">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden />
                    <span><strong className="text-slate-900">{item.label}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3 */}
            <div>
              <SectionLabel>03 — Stage walkthrough per agent type</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Four agents, four receipts
              </h2>
              <div className="space-y-6">
                {[
                  {
                    agent: "Attribute Agent",
                    what: "Extracts structured attributes from unstructured vendor text — color, dimensions, material, pack quantity.",
                    proof: "Input: raw supplier description. Output: structured attribute set + confidence score per field.",
                  },
                  {
                    agent: "Taxonomy Agent",
                    what: "Classifies each SKU into the correct category node across 6,000+ taxonomy paths.",
                    proof: "Input: current category assignment. Output: corrected taxonomy path + delta explanation.",
                  },
                  {
                    agent: "Channel Matching Agent",
                    what: "Resolves each SKU against ASIN families, including multipack variant logic and OEM cross-references.",
                    proof: "Input: product identifiers. Output: matched ASIN + match confidence + disambiguation reasoning.",
                  },
                  {
                    agent: "Compliance Agent",
                    what: "Detects hazmat classifications, restricted material flags, and tax code requirements.",
                    proof: "Input: product attributes. Output: compliance flags + regulatory code references.",
                  },
                ].map((s) => (
                  <div key={s.agent} className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                    <h3 className="text-base font-semibold text-blue-700">{s.agent}</h3>
                    <p className="mt-1 text-sm text-slate-600">{s.what}</p>
                    <p className="mt-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700">
                      {s.proof}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 */}
            <div>
              <SectionLabel>04 — Before / after table</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                What a real SKU diff looks like
              </h2>
              <p className="mb-6 leading-relaxed">
                Every agent output includes a structured before/after alongside
                a confidence score and the reasoning that produced the change.
                Nothing is anonymized or abstracted — the diff is the receipt.
              </p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Agent</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Before</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">After</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { agent: "Attribute", before: "Pack qty: missing", after: "Pack qty: 4-pack (multipack)", conf: "94%" },
                      { agent: "Taxonomy", before: "Tools > Hand Tools", after: "Tools > Hand Tools > Pliers > Slip-Joint", conf: "97%" },
                      { agent: "Channel Matching", before: "No ASIN match", after: "ASIN B09XKJ2F4M (multipack variant)", conf: "91%" },
                      { agent: "Compliance", before: "Hazmat: none", after: "Hazmat: lithium battery (UN3481)", conf: "99%" },
                    ].map((row) => (
                      <tr key={row.agent} className="bg-white">
                        <td className="px-4 py-3 font-medium text-blue-700">{row.agent}</td>
                        <td className="px-4 py-3 text-red-600">{row.before}</td>
                        <td className="px-4 py-3 text-emerald-700">{row.after}</td>
                        <td className="px-4 py-3 font-semibold text-slate-900">{row.conf}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5 */}
            <div>
              <SectionLabel>05 — Proof points from production</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Real deployments, real outcomes
              </h2>
              <div className="space-y-5">
                {[
                  {
                    company: "Voomi Supply",
                    detail: "Replaced rule-based + VA enrichment workflows with Catalog Agents across 1M+ SKUs matched against 200M+ ASINs. Multipack and hazmat gates — previously human-reviewed — became agent-operated. Result: ~85% reduction in publish time.",
                  },
                  {
                    company: "Profitero",
                    detail: "Before: 140 labeling hours per classification cycle. After: ~20 hours, with >95% precision/recall maintained across 1,500+ marketplaces and 80+ languages. Weak supervision replaced brittle manual pipelines.",
                  },
                  {
                    company: "JCPenney",
                    detail: "Mirakl marketplace onboarding required taxonomy alignment across supplier-contributed SKUs. Agents maintained browse node correctness as supplier strings changed — a continuous surface, not a one-time project.",
                  },
                ].map((p) => (
                  <div key={p.company} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <p className="mb-1 text-sm font-semibold text-slate-900">{p.company}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 */}
            <div>
              <SectionLabel>06 — How to run next</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Pilot scope: from demo to production
              </h2>
              <p className="leading-relaxed">
                A pilot runs the same four-agent pipeline against a slice of your
                live catalog — typically 5,000–50,000 SKUs. You get before/after
                exports in XLSX, CSV, and JSON. Your team reviews the diffs and
                signs off on confidence thresholds before anything is published.
              </p>
              <p className="mt-4 leading-relaxed">
                The pilot is scoped, time-boxed, and produces a KPI table: time
                saved, error rate before/after, confidence distribution. That
                table is what you bring to procurement — not a slide deck.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200/60 bg-gradient-to-b from-slate-50 to-white py-16">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-blue-100 bg-blue-50/50 px-8 py-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Request a Catalog Agents Demo</h2>
            <p className="mt-3 text-slate-600">
              We run the demo on your SKUs — not a sample dataset. You see your
              own catalog&apos;s before/after with confidence scores attached.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/about#contact"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
                Request Demo
              </Link>
              <Link href="/try-it"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Try it live →
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <PageBottomCta
        title="Ready to see it on your catalog?"
        description="Pilots run on your data. You get before/after exports your team can review and act on."
        primary={{ href: "/about#contact", label: "Book a pilot" }}
        secondary={{ href: "/agents/ecommerce", label: "See Catalog Agents" }}
      />
    </main>
  );
}
