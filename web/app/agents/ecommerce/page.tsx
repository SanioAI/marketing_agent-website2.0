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
    t: "Supplier feeds never arrive in the format your channels need",
    p: "Every vendor formats the same data differently. The same manufacturer appears as \"3M\", \"3M Co.\", \"3M Company\". Dimensions land in the title, the notes field, or not at all. The PIM stores whatever arrived — and the channel sees inconsistencies it can't act on.",
  },
  {
    n: "02",
    t: "Enrichment fixes today. Tomorrow's feed breaks it.",
    p: "One-time enrichment solves the catalog as it stands on Monday. Next week's supplier file reintroduces the same gaps in the same fields. The fix degrades the moment new data arrives — and the manual queue reforms, every time.",
  },
  {
    n: "03",
    t: "Channel rejections don't tell you what's wrong",
    p: "Amazon, Google Shopping, and Mirakl reject listings without specifying why. A team member traces the failure back to a missing field, a wrong taxonomy node, or a noncompliant value — then fixes it manually. At 50K+ SKUs, this is a permanent ops cost, not a one-time project.",
  },
  {
    n: "04",
    t: "Rules break every time a supplier changes their template",
    p: "A rule that extracts dimensions from SupplierA's notes field works until SupplierA updates their export. The rule fails silently. You find out when a listing is rejected — or when a buyer searches for a product that should exist and gets nothing.",
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
  { k: "~85%", t: "Faster time-to-publish", d: "Products that required manual VA review go live without it — agents handle the queue." },
  { k: ">95%", t: "Precision on attribute extraction", d: "Across multi-supplier HVAC and industrial catalogs. Confidence scoring routes genuine edge cases to human review." },
  { k: "140 → 20", t: "Manual labeling hours per cycle", d: "Agents handle the clear cases. Humans handle genuine ambiguity. The review queue gets smaller each run." },
  { k: "200M+", t: "Amazon ASINs matched", d: "Via the Channel Matching Agent. Clean GTINs, canonical brands, valid taxonomy — all prerequisite to matching at that scale." },
] as const;

const caseStudies = [
  {
    industry: "HVAC Distribution",
    customer: "Voomi Supply",
    t: "1M+ SKUs. Hundreds of suppliers. No manual review loop.",
    d: "Voomi Supply's catalog spans hundreds of HVAC and industrial suppliers — each with different export formats, each changing over time. Catalog Agents normalized brand names across every supplier variant, matched 200M+ Amazon ASINs, and mapped the full catalog to a consistent taxonomy. Publish time dropped ~85%. The manual VA review workflow that previously processed every incoming SKU was replaced entirely.",
  },
  {
    industry: "Commerce Intelligence",
    customer: "Profitero / Publicis Groupe",
    t: "1,500+ marketplaces, 80+ languages, labeling hours cut from 140 to 20.",
    d: "Profitero runs catalog quality analysis across 1,500+ retailer sites globally. Catalog Agents handled attribute extraction at that scale — high-confidence extractions went straight to output; genuine ambiguities went to human review. Manual labeling dropped from 140 hours to around 20 per cycle, and the queue got smaller each run as the agents improved on familiar product types.",
  },
] as const;

const faqs = [
  {
    q: "Is this just enrichment?",
    a: "No. One-time enrichment fixes your catalog as it stands today. Three months later, you've added new suppliers, existing suppliers have updated their templates, and the drift has started again. Catalog Agents run on every ingest — so when a new vendor feed arrives, normalization, taxonomy mapping, and attribute extraction run automatically. The catalog doesn't degrade back to its previous state because the agents are running continuously, not on a project schedule.",
  },
  {
    q: "Do you replace our PIM?",
    a: "No — and that's intentional. Catalog Agents sit upstream of your PIM and improve the data flowing into it. Your PIM stays as the system of record; it just receives cleaner, more complete data than it did before. The stack is: supplier feeds → Catalog Agents (extraction, validation, normalization) → PIM (master record) → channels. Each layer does its own job.",
  },
  {
    q: "How does human review work?",
    a: "Every agent output includes a confidence score. High-confidence extractions — where the agent found clear, unambiguous signals — go directly to output. Low-confidence cases, where signals conflicted or the agent couldn't resolve the meaning, route to a review queue. The queue contains only genuinely uncertain records, not every new product. Over time, as the agents process more of your catalog, familiar product types require less and less human intervention.",
  },
  {
    q: "What data sources do you support?",
    a: "Vendor EDI feeds, CSVs, PDFs, supplier spec sheets, product images, and unstructured text fields. The agents handle the actual formats suppliers send — not a normalized version of them. If your supplier embeds dimensions in a free-text title field, the agent reads the title.",
  },
  {
    q: "How long does deployment take?",
    a: "Typically two to four weeks, depending on the number of data sources and the complexity of your channel requirements. The first pass surfaces your biggest catalog defects immediately — so you're seeing actionable findings early, not at the end of a long integration cycle.",
  },
] as const;

export default function EcommerceAgentsPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Catalog Agents"
        title="The catalog you have isn't the catalog AI agents need."
        description="Most product data was written for human readers. AI shopping agents need structured attributes, canonical brand names, valid taxonomy, and zero placeholder values — across every SKU, continuously. Catalog Agents provide that layer."
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
                The fix you ran last quarter is already broken.
              </h2>
              <p className="mt-3 text-slate-600">
                New supplier feeds. Updated templates. Revised taxonomies. Catalog quality degrades continuously — the only way to keep up is a system that runs continuously too.
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
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/70 bg-blue-50/60 px-3 py-1 text-[11px] font-medium text-blue-700">
                      {c.industry}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">{c.customer}</span>
                  </div>
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
                Catalog quality isn&apos;t a project. It&apos;s a continuous output.
              </h2>
              <p className="mt-3 text-slate-600">
                Cleanup tools fix the past. Catalog Agents keep pace with what&apos;s coming in.
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
