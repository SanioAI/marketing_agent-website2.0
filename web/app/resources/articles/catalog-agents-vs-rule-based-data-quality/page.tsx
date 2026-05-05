import { Container } from "@/components/ui/Container";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { RelatedPlatform } from "@/components/ui/RelatedPlatform";
import Link from "next/link";

export const metadata = {
  title: "Catalog Agents vs Rule-Based Data Quality",
  description:
    "Rules stop at long-tail chaos: Voomi replaced rule+VA with agents at 1M+ SKUs (~85% faster publish); Profitero >95% P/R weak supervision; JCPenney taxonomy drift — catalog agents, not rule #250,001.",
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
              <span className="text-xs text-slate-400">Consideration Stage · 10 min read</span>
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Catalog Agents vs Rule-Based Data Quality Platforms: When Rules Stop Scaling
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              The 250,000th rule is never the last one. Rule engines encode
              yesterday&apos;s exceptions — catalog agents learn and re-verify
              under drift. Here&apos;s where the line is.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
          <div className="flex gap-12">
          <div className="min-w-0 flex-1 space-y-14 text-slate-700">

            {/* 1 */}
            <div>
              <SectionLabel>01 — What rule-based platforms optimize for</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Precision on known exceptions
              </h2>
              <p className="leading-relaxed">
                Rule-based data quality platforms are built around a premise: if
                you can define the error, you can detect and correct it. They
                excel at enforcing deterministic constraints — required fields,
                format validation, value range checks, controlled vocabulary
                enforcement.
              </p>
              <p className="mt-4 leading-relaxed">
                For a bounded problem set — a specific product type, a single
                channel, a stable taxonomy — rules produce high precision. They&apos;re
                auditable, explainable, and fast. The rule is the documentation.
              </p>
              <Callout>
                <strong>Where rules work:</strong> hard regulatory requirements
                (specific hazmat codes, exact format requirements for regulated
                fields), controlled vocabularies with no valid variation, and
                field-level constraints that don&apos;t depend on semantic understanding.
              </Callout>
            </div>

            {/* 2 */}
            <div>
              <SectionLabel>02 — Where rules fail</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Long tail, taxonomy drift, ASIN families
              </h2>
              <p className="leading-relaxed">
                The failure mode is well-documented inside any team that has
                managed a rule engine at scale: rule count grows, maintenance
                cost grows, and coverage still doesn&apos;t close. Each new supplier
                format, each new marketplace taxonomy update, each new product
                category requires new rules — written by people who understand
                both the domain and the rule syntax.
              </p>
              <p className="mt-4 leading-relaxed">
                Voomi Supply&apos;s catalog problem illustrates the boundary exactly.
                HVAC distribution involves thousands of supplier naming
                conventions, multipack variants, hazmat classifications, and
                ASIN ambiguity across 200M+ reference ASINs. A rule engine
                can enforce &ldquo;lithium battery products must have a hazmat code&rdquo;
                — but it cannot detect that a product description implies
                lithium battery content without an explicit label. That&apos;s
                a semantic problem, not a format problem.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { title: "Long-tail supplier chaos", desc: "New suppliers introduce naming conventions that no existing rule covers. SKUs with valid data produce false failures or pass QA with silently incorrect values." },
                  { title: "Taxonomy drift", desc: "Marketplace taxonomy updates mean previously-correct category paths become wrong. Rules reference specific node IDs — they don't understand that a product still belongs in the same logical category under a new path." },
                  { title: "Multipack semantic detection", desc: "A product description says '4-pack' but the quantity field says 1. Rules can detect explicit mismatches — they can't read supplier language to infer implied pack quantities." },
                  { title: "Hazmat without explicit labels", desc: "New marketplace hazmat fields require classification of products that weren't previously flagged. Rules can't classify from product attributes alone — they need semantic reasoning about chemical composition." },
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
              <SectionLabel>03 — Catalog agents: evaluation loops</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Scoped autonomy at the semantic layer
              </h2>
              <p className="leading-relaxed">
                <Link href="/agents/ecommerce" className="bg-blue-50 text-blue-700 rounded px-1 py-0.5 hover:bg-blue-100 transition-colors">
                  Catalog agents
                </Link>{" "}
                operate at the layer rules can&apos;t reach: semantic
                understanding of product descriptions, context-aware classification,
                and inference from attributes that aren&apos;t explicitly labeled.
                They run evaluation loops — not rule checks — and produce
                structured outputs with confidence indicators.
              </p>
              <p className="mt-4 leading-relaxed">
                Profitero&apos;s classification problem required maintaining &gt;95%
                precision/recall across 80+ languages and 1,500+ marketplaces
                — a constraint set that would require an impossible number of
                rules to maintain. The solution was weak supervision: agents
                trained on labeled examples that generalize to new cases, rather
                than rules that must explicitly enumerate every valid case.
              </p>
              <Callout>
                <strong>The agent model:</strong> instead of &ldquo;if field X matches
                pattern Y, flag Z&rdquo;, agents reason: &ldquo;given these product
                attributes, what classification is most consistent with the
                evidence? Confidence: 94%. Escalate if below 80%.&rdquo;
              </Callout>
            </div>

            {/* 4 */}
            <div>
              <SectionLabel>04 — The hybrid pattern</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">
                Rules for hard law, agents for the tail
              </h2>
              <p className="leading-relaxed">
                The right architecture isn&apos;t rules vs agents — it&apos;s rules for
                the problems that rules solve well, and agents for the problems
                that rules can&apos;t reach.
              </p>
              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Capability</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Rules / DQ</th>
                      <th className="px-4 py-3 text-left font-semibold text-slate-700">Catalog Agents</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {[
                      { cap: "Required field validation", rules: "✓ Deterministic", agents: "Handles but over-engineered" },
                      { cap: "Format / regex constraints", rules: "✓ Fast, auditable", agents: "Handles but over-engineered" },
                      { cap: "Long-tail supplier formats", rules: "✗ Rule explosion", agents: "✓ Generalizes from examples" },
                      { cap: "Semantic multipack detection", rules: "✗ Can't infer from text", agents: "✓ Attribute reasoning" },
                      { cap: "Taxonomy drift maintenance", rules: "✗ Node IDs change", agents: "✓ Semantic category understanding" },
                      { cap: "Hazmat from product attributes", rules: "✗ Explicit labels only", agents: "✓ Composition inference" },
                      { cap: "Confidence scoring", rules: "✗ Binary pass/fail", agents: "✓ Per-decision confidence" },
                      { cap: "Cross-channel correctness", rules: "✗ Per-channel rules multiply", agents: "✓ Unified evaluation surface" },
                    ].map((row) => (
                      <tr key={row.cap}>
                        <td className="px-4 py-3 font-medium text-slate-800">{row.cap}</td>
                        <td className={`px-4 py-3 text-sm ${row.rules.startsWith("✓") ? "text-emerald-700" : "text-red-600"}`}>{row.rules}</td>
                        <td className={`px-4 py-3 text-sm ${row.agents.startsWith("✓") ? "text-emerald-700" : "text-slate-500"}`}>{row.agents}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 leading-relaxed">
                JCPenney&apos;s Mirakl onboarding required both: hard format rules
                for SFCC field constraints, and agents to maintain taxonomy
                alignment as supplier-contributed browse paths drifted over
                time. Rules enforced the structure; agents maintained the
                semantic correctness. Use{" "}
                <Link href="/platform/catalog-readiness" className="bg-blue-50 text-blue-700 rounded px-1 py-0.5 hover:bg-blue-100 transition-colors">
                  Catalog Readiness
                </Link>{" "}
                to benchmark your rule coverage gaps before deploying agents, and{" "}
                <Link href="/platform/product-intelligence" className="bg-blue-50 text-blue-700 rounded px-1 py-0.5 hover:bg-blue-100 transition-colors">
                  Product Intelligence
                </Link>{" "}
                to track quality improvement over time.
              </p>
            </div>

            {/* Proof points */}
            <div>
              <SectionLabel>Proof points from production</SectionLabel>
              <h2 className="mb-4 text-2xl font-semibold text-slate-900">Real deployments</h2>
              <div className="space-y-4">
                {[
                  { company: "Voomi Supply", detail: "Replaced rule-based + VA workflows with catalog agents operating at 1M+ SKUs / 200M+ ASINs. Multipack, hazmat, and ASIN matching required semantic reasoning that rules couldn't provide. ~85% publish-time reduction after automation." },
                  { company: "Profitero", detail: ">95% precision/recall across 80+ languages and 1,500+ marketplaces. 140 → ~20 hours per classification cycle. Weak supervision replaced brittle rule pipelines that couldn't generalize to new market entries." },
                  { company: "JCPenney", detail: "Mirakl + SFCC taxonomy alignment required continuous correctness as supplier strings changed. Rules maintained format; agents maintained semantic browse alignment across cross-brand catalog drift." },
                ].map((p) => (
                  <div key={p.company} className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <p className="mb-1 text-sm font-semibold text-slate-900">{p.company}</p>
                    <p className="text-sm leading-relaxed text-slate-600">{p.detail}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <div className="sticky top-24">
              <RelatedPlatform />
            </div>
          </aside>
          </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/60 bg-gradient-to-b from-slate-50 to-white py-16">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-blue-100 bg-blue-50/50 px-8 py-10 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">See Catalog Agents on Your Data</h2>
            <p className="mt-3 text-slate-600">
              We run a before/after demo on your catalog — showing exactly where
              rules are failing and what agents catch that rules can&apos;t reach.
            </p>
            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/resources/articles/catalog-agents-demo-before-after-sku"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2563eb] px-6 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]">
                View the Demo
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
        title="Beyond rule #250,001"
        description="Catalog agents handle what rules can't — semantic classification, long-tail formats, and taxonomy drift."
        primary={{ href: "/about#contact", label: "Book a pilot" }}
        secondary={{ href: "/agents/ecommerce", label: "See Catalog Agents" }}
      />
    </main>
  );
}
