import { Container } from "@/components/ui/Container";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import Link from "next/link";

export const metadata = {
  title: "Catalog Agents vs Enrichment Tools: Operational Difference",
  description:
    "Enrichment projects stop; Voomi agents didn't — 1M+ SKUs, multipack/hazmat/ASIN, ~85% publish-time; Profitero agents hold >95% P/R across 80+ languages. Continuous catalog agents, not SOW batches.",
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
      <section className="gradient-surface border-b border-slate-200/60 py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-200/70 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                Catalog Agents
              </span>
              <span className="text-xs text-slate-400">Consideration Stage · 9 min read</span>
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Catalog Agents vs Enrichment Tools: From One-Time Attributes to Continuous Readiness
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Enrichment tools fill fields. Catalog agents operate catalogs. The
              difference only becomes visible after the SOW closes — when drift,
              multipack regressions, and taxonomy deltas start accumulating.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-14 text-slate-700">

            {/* 1 */}
            <div>
              <SectionLabel>01 — What enrichment projects optimize for</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Coverage, speed, cost per field
              </h2>
              <p className="leading-relaxed">
                Enrichment vendors are optimized for a project model: scope a
                catalog slice, fill missing attributes, deliver a completed CSV,
                close the SOW. The success metric is field coverage — the
                percentage of products that now have values in required attribute
                columns.
              </p>
              <p className="mt-4 leading-relaxed">
                This model works for a specific problem: a one-time gap-fill
                before a channel launch or a system migration. It produces
                measurable output quickly. The cost per field is legible and
                comparable across vendors.
              </p>
              <Callout>
                <strong>The enrichment contract:</strong> you pay for coverage at
                a point in time. What happens when supplier strings change, when
                a marketplace updates its taxonomy, or when a new ASIN family
                is introduced — that&apos;s outside the scope.
              </Callout>
            </div>

            {/* 2 */}
            <div>
              <SectionLabel>02 — What breaks post-project</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Drift, conflicts, and channel deltas
              </h2>
              <p className="leading-relaxed">
                The failure mode arrives months after delivery. Supplier feeds
                change format. A marketplace updates its restricted-item taxonomy.
                A new ASIN family is introduced with different variant logic.
                The enriched catalog — which passed QA at delivery — is now
                producing errors that require another enrichment cycle.
              </p>
              <p className="mt-4 leading-relaxed">
                Voomi Supply experienced this directly. The HVAC distribution
                catalog required multipack detection, hazmat classification, and
                ASIN matching across 1M+ SKUs and 200M+ ASINs. A one-time
                enrichment batch couldn&apos;t maintain correctness as supplier data
                changed. The solution required automation that ran continuously
                — not a project that closed.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { title: "Taxonomy drift", desc: "Channel taxonomy nodes update. Products enriched into old paths become mis-categorized without a re-run — which isn't in the original SOW." },
                  { title: "Supplier format changes", desc: "A new supplier uses different attribute naming conventions. The enrichment mapping breaks silently, producing null fields at publish time." },
                  { title: "Multipack regressions", desc: "A product changes pack quantity in the supplier feed. The enriched pack size is now wrong. Compliance flags fire at channel submission." },
                  { title: "ASIN family expansion", desc: "Amazon introduces new variant relationships. The previously matched ASIN is now a parent ASIN requiring child mapping — which the enrichment job never covered." },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-red-100 bg-red-50/40 p-4">
                    <p className="text-sm font-semibold text-red-700">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3 */}
            <div>
              <SectionLabel>03 — Catalog agents: continuous repair</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Evaluation loops, scoped autonomy, measurable quality
              </h2>
              <p className="leading-relaxed">
                Catalog agents don&apos;t close when the SOW closes. They run
                evaluation loops: detect what changed, decide what to correct,
                produce structured diffs with confidence scores, and escalate
                only when confidence falls below threshold.
              </p>
              <p className="mt-4 leading-relaxed">
                Profitero demonstrates this at scale. The before state: 140
                hours of manual labeling per classification cycle across 300+
                client datasets. After continuous agent operation: approximately
                20 hours, with &gt;95% precision/recall maintained across 1,500+
                marketplaces and 80+ languages. That number is not a one-time
                achievement — it&apos;s maintained continuously because the agents
                re-verify as data changes.
              </p>
              <Callout>
                <strong>The distinction that matters:</strong> enrichment projects
                optimize for field coverage at delivery. Catalog agents optimize
                for decision correctness over time. These are different metrics
                with different maintenance requirements.
              </Callout>
            </div>

            {/* 4 */}
            <div>
              <SectionLabel>04 — Scenarios enrichment mishandles</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Where the project model breaks down
              </h2>
              <div className="space-y-5">
                {[
                  { title: "Multipacks", desc: "Multipack detection requires understanding quantity language across hundreds of supplier naming conventions — and re-detecting when those conventions change. A one-time enrichment maps the patterns it sees at ingestion time. New patterns require a new engagement." },
                  { title: "OEM cross-references", desc: "OEM part number mapping requires resolving across multiple reference databases with version histories. The mapping is not static — parts are superseded, consolidated, and renamed. Enrichment captures a snapshot; agents maintain the graph." },
                  { title: "Fitment and compatibility", desc: "Vehicle fitment and equipment compatibility data changes as manufacturers update their product lines. Static enrichment produces compatibility flags that drift out of accuracy as the underlying data changes." },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                    <h3 className="mb-2 text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5 */}
            <div>
              <SectionLabel>05 — When enrichment is still useful</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Enrichment inside an agent architecture
              </h2>
              <p className="leading-relaxed">
                Enrichment tools are not obsolete — they have a specific role
                inside an agent architecture. For a catalog launch with a fixed
                scope and a stable taxonomy, a one-time enrichment batch is the
                right tool. It&apos;s fast, legible, and doesn&apos;t require ongoing
                infrastructure.
              </p>
              <p className="mt-4 leading-relaxed">
                The model that works: use enrichment for the initial attribute
                fill, then deploy catalog agents to maintain correctness as the
                catalog grows, supplier data changes, and channel requirements
                evolve. Enrichment handles the point-in-time coverage problem;
                agents handle the ongoing maintenance problem.
              </p>
            </div>

            {/* Proof points */}
            <div>
              <SectionLabel>Proof points from production</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">Real deployments</h2>
              <div className="space-y-4">
                {[
                  { company: "Voomi Supply", detail: "Replaced rule-based + VA enrichment with catalog agents operating continuously across 1M+ SKUs / 200M+ ASINs. Multipack, hazmat, and ASIN matching required ongoing correctness — not a one-time fill. ~85% publish-time reduction." },
                  { company: "Profitero", detail: "Continuous classification across 80+ languages at >95% precision/recall. Before: 140 hours of manual labeling per cycle. After: ~20 hours with maintained accuracy across 1,500+ marketplaces." },
                  { company: "JCPenney", detail: "Mirakl marketplace onboarding required taxonomy alignment that needed to hold as supplier strings changed over time. Enrichment would have set the initial state; agents maintained browse node accuracy continuously." },
                ].map((p) => (
                  <div key={p.company} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <p className="mb-1 text-sm font-semibold text-slate-900">{p.company}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/60 bg-gradient-to-b from-slate-50 to-white py-16">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-blue-100 bg-blue-50/50 px-8 py-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">See the Before / After on Your Catalog</h2>
            <p className="mt-3 text-slate-600">
              The demo runs on your SKUs — showing exactly which products
              enrichment left behind and what agents catch continuously.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/resources/articles/catalog-agents-demo-before-after-sku"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
                View the Demo →
              </Link>
              <Link href="/about#contact"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Talk to us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <PageBottomCta
        title="From enrichment batch to continuous catalog ops"
        description="Start with a scoped pilot — we show the delta between your enriched catalog and what agents maintain over time."
        primary={{ href: "/about#contact", label: "Book a pilot" }}
        secondary={{ href: "/agents/ecommerce", label: "See Catalog Agents" }}
      />
    </main>
  );
}
