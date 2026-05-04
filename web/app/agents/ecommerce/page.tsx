import Image from "next/image";
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
        <ButtonLink href="#contact" variant="primaryLg">
          Book a demo
        </ButtonLink>
        <ButtonLink href="#how-it-works" variant="secondaryLg">
          See how it works
        </ButtonLink>
      </PageHero>

      {/* Hero visual — enrichment mind-map */}
      <section className="border-t border-slate-200/60 bg-white py-14 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                What it does
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                From fragmented inputs to structured catalog data
              </h2>
              <p className="mt-3 text-slate-600">
                The agent ingests PDFs, feeds, and unstructured text—then produces a verified, enriched product record with taxonomy, attributes, and confidence scores.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/15">
              <Image
                src="/images/enrichment-mindmap-dark.png"
                alt="Catalog Agent enriching an ABS Wheel Speed Sensor from OEM PDFs, supplier feeds, and unstructured text into structured product data with taxonomy"
                width={1200}
                height={675}
                className="w-full"
                priority
              />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Before / After transformation */}
      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20" id="before-after">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                The transformation
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                From manual chaos to AI-driven accuracy
              </h2>
              <p className="mt-3 text-slate-600">
                Same product. Completely different catalog record—corrected, classified, and ready for every channel.
              </p>
            </div>
          </Reveal>

          {/* Full iPhone before/after */}
          <Reveal delay={0.08}>
            <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-2xl shadow-slate-900/10">
              <Image
                src="/images/before-after-iphone.png"
                alt="Before and after: manual product intake process on the left versus AI-driven automated enrichment on the right, with iPhone 17 Pro as the example product"
                width={1200}
                height={800}
                className="w-full"
              />
            </div>
          </Reveal>

          {/* Side-by-side before/after lists */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
            <Reveal delay={0.04}>
              <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                <Image
                  src="/images/before-list.png"
                  alt="Before: Human-driven process — Manual Product Intake, Human Attribute Review, Manual Attribute Correction, Human Taxonomy Mapping, Reactive Fixes Loop"
                  width={600}
                  height={500}
                  className="w-full"
                />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-2xl border border-blue-100/70 bg-white shadow-sm">
                <Image
                  src="/images/after-list.png"
                  alt="After: AI-Driven Automation — Automated Product Ingestion, Attribute Extraction, Attribute Standardization, Schema Validation, Continuous Monitoring"
                  width={600}
                  height={500}
                  className="w-full"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

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

      {/* How it works — workflow diagram */}
      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20" id="how-it-works">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                How it works
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                From raw feed to verified outcomes
              </h2>
              <p className="mt-3 text-slate-600">
                Raw data flows in. The Catalog Agent coordinates enrichment, taxonomy, pricing, and compliance—then delivers verified outcomes your team can act on.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Enrichment detail */}
      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20" id="enrichment">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <p className="section-kicker mb-4">
                  <span className="dot" aria-hidden />
                  Enrichment in depth
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Every product. Every input. Structured output.
                </h2>
                <p className="mt-4 text-pretty text-slate-600 sm:text-lg">
                  The agent pulls from OEM technical sheets, aftermarket feeds, unstructured service notes, and inconsistent brand names—reconciling them into a single verified product record.
                </p>
                <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
                  {capabilities.slice(0, 5).map((b) => (
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
            <Reveal delay={0.06}>
              <div className="overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10">
                <Image
                  src="/images/enrichment-detail.png"
                  alt="ABS Wheel Speed Sensor enrichment: inputs (OEM PDF, aftermarket feed, unstructured text, inconsistent brand names) flowing through Paladio agent to structured output with taxonomy and normalized brands"
                  width={700}
                  height={600}
                  className="w-full"
                />
              </div>
            </Reveal>
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

      {/* FAQs */}
      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20" id="faqs">
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
      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20" id="contact">
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
                <ButtonLink href="/#contact" variant="primaryLg">
                  Book a demo
                </ButtonLink>
                <ButtonLink href="/agents/aec" variant="secondaryLg">
                  Explore AEC Agents →
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
