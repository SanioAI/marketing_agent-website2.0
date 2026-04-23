import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/landing/buttons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Catalog Agents — Paladio.ai",
  description:
    "AI agents that continuously evaluate, correct, and enhance product catalogs using structured reasoning—not one-time enrichment.",
};

const problems = [
  {
    n: "01",
    t: "Catalog data is always broken",
    p: "Vendor feeds arrive with inconsistent taxonomy, missing attributes, duplicate SKUs, and brand name variations. Manual cleanup never catches up.",
  },
  {
    n: "02",
    t: "Enrichment tools don't hold",
    p: "One-time enrichment fixes today's data. Tomorrow's feed drops it back. Cleanup tools treat symptoms, not the underlying data flow.",
  },
  {
    n: "03",
    t: "Channel rejections pile up",
    p: "Google Shopping, Amazon, and retail partners reject listings for missing fields, wrong taxonomy, or noncompliant copy—costing revenue and ops time.",
  },
  {
    n: "04",
    t: "Edge cases eat your team",
    p: "Missing images, ambiguous category mappings, conflicting brand names—each one gets escalated to a person who has to decide manually.",
  },
] as const;

const capabilities = [
  "Continuously evaluate product correctness and completeness",
  "Fix taxonomy, attributes, and structure automatically",
  "Normalize brand names and resolve duplicate SKUs",
  "Flag ambiguity and escalate only when needed (HITL review)",
  "Enhance raw inputs into clean, human-readable product content",
  "Support vendor feeds, PDFs, spreadsheets, images, and unstructured text",
  "Produce exports with confidence indicators and structured evidence",
  "Deploy alongside your existing PIM—no rip and replace",
] as const;

const workflow = [
  {
    step: "01",
    t: "Ingest raw feeds",
    d: "Connect vendor feeds, PDFs, spreadsheets, and images. The agent ingests everything without manual preprocessing.",
  },
  {
    step: "02",
    t: "Evaluate and score",
    d: "Each product is evaluated for correctness, completeness, and channel readiness. Every issue gets a confidence score and a reason.",
  },
  {
    step: "03",
    t: "Correct automatically",
    d: "Taxonomy, attributes, brand normalization, and duplicate collapse—fixed in place, with structured reasoning behind every change.",
  },
  {
    step: "04",
    t: "Escalate ambiguity",
    d: "Genuinely ambiguous cases surface in a human-review queue with context and a suggested resolution—not a raw flag.",
  },
  {
    step: "05",
    t: "Export to your stack",
    d: "Deliver clean catalog data to your PIM, channels, or downstream systems in XLSX, CSV, or JSON—with before/after diffs.",
  },
] as const;

const kpis = [
  { k: "85%", t: "Faster catalog enrichment", d: "Products go live in hours, not weeks." },
  { k: "94%", t: "Reduction in manual cleanup", d: "Stop fixing the same issues repeatedly." },
  { k: "75%", t: "Fewer downstream errors", d: "Fewer feed rejections, returns, and compliance issues." },
  { k: "84%", t: "Edge cases resolved automatically", d: "Handles missing fields and noisy inputs at scale." },
] as const;

const caseStudies = [
  {
    industry: "HVAC Distribution",
    t: "Brand clustering and dedupe across a fragmented supplier network",
    d: "Catalog Agents normalized brand names, collapsed duplicate SKUs, and mapped 40,000+ products to a consistent taxonomy—enabling clean channel syndication for the first time.",
  },
  {
    industry: "Global E-commerce",
    t: "Structured product data across 1,000+ categories in 80+ languages",
    d: "Replaced a manual annotation pipeline with continuous agent evaluation, reducing time-to-live on new SKUs and cutting downstream errors across all regional channels.",
  },
] as const;

const faqs = [
  {
    q: "Is this just enrichment?",
    a: "No. Catalog Agents continuously evaluate and correct catalogs over time—not a one-time pass.",
  },
  {
    q: "Do you replace our PIM?",
    a: "No. Catalog Agents sit upstream and improve the data flowing into your PIM and channels.",
  },
  {
    q: "What data sources do you support?",
    a: "Vendor feeds, PDFs, spreadsheets, images, and unstructured text.",
  },
  {
    q: "How long does deployment take?",
    a: "Typically a few weeks, depending on data sources and scale.",
  },
  {
    q: "Is this safe for production catalogs?",
    a: "Yes. Every output is designed to be reviewed, audited, and shipped. Nothing changes without a traceable reason.",
  },
] as const;

export default function EcommerceAgentsPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Catalog Agents"
        title="Enrich, trust, and syndicate your catalog."
        description="AI agents that continuously evaluate, correct, and enhance product catalogs using structured reasoning—not one-time enrichment."
      >
        <ButtonLink href="/try-it" variant="primaryLg">
          See it on real data
        </ButtonLink>
        <ButtonLink href="/about#contact" variant="secondaryLg">
          Book a demo
        </ButtonLink>
      </PageHero>

      {/* Problems */}
      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20" id="problems">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                The problem
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Catalog cleanup is a treadmill
              </h2>
              <p className="mt-3 text-slate-600">
                Every team runs it. Nobody gets off it. The data breaks faster than anyone can fix it manually.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {problems.map((p, i) => (
              <Reveal key={p.n} delay={0.04 * i}>
                <div className="card-soft h-full p-6">
                  <p className="font-display text-3xl font-semibold text-slate-200">{p.n}</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{p.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20" id="capabilities">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className="section-kicker mb-4">
                  <span className="dot" aria-hidden />
                  What Catalog Agents do
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Continuous evaluation, not one-time cleanup
                </h2>
                <p className="mt-4 text-pretty text-slate-600 sm:text-lg">
                  Catalog Agents are the foundation. They run continuously, not on a schedule—so your catalog improves with every new feed, not just during a migration sprint.
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Catalog Agents sit upstream of your PIM. Nothing gets ripped out.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card p-7">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Capabilities
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                  {capabilities.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Workflow */}
      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20" id="workflow">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                How it works
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                From raw feed to channel-ready catalog
              </h2>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {workflow.map((w, i) => (
              <Reveal key={w.step} delay={0.04 * i}>
                <div className="card-soft flex gap-5 p-6">
                  <p className="font-display text-2xl font-semibold text-slate-200 shrink-0 leading-none pt-0.5">
                    {w.step}
                  </p>
                  <div>
                    <p className="text-base font-semibold text-slate-900">{w.t}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{w.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* KPIs */}
      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20" id="results">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Results
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                What these deployments prove
              </h2>
              <p className="mt-3 text-slate-600">
                This is production infrastructure, not experimental AI.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((x, i) => (
              <Reveal key={x.k} delay={0.04 * i}>
                <div className="card h-full p-6">
                  <p className="font-display text-3xl font-semibold text-slate-900">{x.k}</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{x.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20" id="case-studies">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                In production
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Real catalogs. Real results.
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {caseStudies.map((c, i) => (
              <Reveal key={c.industry} delay={0.06 * i}>
                <div className="card h-full p-7">
                  <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/60 px-3 py-1 text-[11px] font-medium text-blue-700">
                    {c.industry}
                  </span>
                  <p className="mt-4 text-base font-semibold text-slate-900">{c.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Trust */}
      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20" id="trust">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Trust, verification, safety
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Built for real catalogs, not sandbox demos
              </h2>
              <p className="mt-3 text-slate-600">
                Every output is designed to be reviewed, audited, and shipped.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              {
                t: "Evaluated against real inputs",
                p: "Not best effort—measured against your data and standards.",
              },
              {
                t: "Corrected with structured reasoning",
                p: "Clear structure, not just prose. Better reliability on edge cases.",
              },
              {
                t: "Confidence + explainability",
                p: "Confidence indicators, evidence, and escalation for anything ambiguous.",
              },
            ].map((x, i) => (
              <Reveal key={x.t} delay={0.04 * i}>
                <div className="card-soft h-full p-6">
                  <p className="text-base font-semibold text-slate-900">{x.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{x.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20" id="faqs">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                FAQs
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Frequently asked questions
              </h2>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={0.03 * i}>
                <details className="card-soft group p-6">
                  <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
                    <div className="flex items-center justify-between gap-4">
                      <span>{f.q}</span>
                      <span className="text-slate-400 transition group-open:rotate-45" aria-hidden>
                        +
                      </span>
                    </div>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                If you want catalogs your team can trust, you need continuous evaluation.
              </h2>
              <p className="mt-3 text-slate-600">
                Not more cleanup tools.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/try-it" variant="primaryLg">
                  See it on real data
                </ButtonLink>
                <ButtonLink href="/about#contact" variant="secondaryLg">
                  Book a demo
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
