import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Catalog Readiness · Paladio",
  description: "Prepare your catalog for marketplaces, search, and agentic commerce. Score attributes, compliance, and content before they cost you listings.",
};

const dimensions = [
  {
    n: "01",
    title: "Attribute Completeness",
    desc: "Find missing specs, empty fields, and attribute gaps at the SKU level — before marketplaces reject them or AI agents skip them.",
  },
  {
    n: "02",
    title: "Content Quality",
    desc: "Score titles, descriptions, and bullet points against marketplace standards. Thin content gets filtered out by search and AI shopping agents alike.",
  },
  {
    n: "03",
    title: "Taxonomy Accuracy",
    desc: "Validate category classifications against Amazon, Google, and distributor taxonomies. JCPenney's Mirakl marketplace launch required taxonomy alignment across hundreds of brands — a category correct at onboarding lands in the wrong place after a quarterly taxonomy revision, with no alert from the PIM.",
  },
  {
    n: "04",
    title: "Compliance Signals",
    desc: "Surface hazmat flags, multipack mismatches, and restricted-item issues before they cause listing rejections or channel suspensions.",
  },
  {
    n: "05",
    title: "Agentic Commerce Readiness",
    desc: "Score how well each SKU performs when AI shopping agents — ChatGPT, Perplexity, Google AI — try to match, recommend, or compare it.",
  },
  {
    n: "06",
    title: "Channel Readiness",
    desc: "Check field completeness per channel: what Amazon requires is not what Walmart requires is not what a Mirakl marketplace requires.",
  },
];

const steps = [
  { step: "01", title: "Upload your catalog", desc: "Connect a feed or upload a CSV. Any size. No pre-cleaning required." },
  { step: "02", title: "Run the diagnostic", desc: "Six dimensions scored at the SKU level — attributes, compliance, content, taxonomy, channel readiness, and agentic readiness." },
  { step: "03", title: "Get your readiness report", desc: "Prioritized findings by severity and SKU. Not a general score — specific products, specific fields, specific failures." },
  { step: "04", title: "Fix with Catalog Agents", desc: "Route defects directly into the enrichment pipeline. Agents correct, you review, nothing ships without approval." },
];

export default function CatalogReadinessPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Catalog Readiness"
        title="Your PIM says 96% complete. Your channel rejection rate disagrees."
        description="Completeness checks confirm field presence — not value quality. Catalog Readiness scores attributes, compliance, content, and agentic readiness at the SKU level, so you know exactly what's broken and what it's costing before it costs you."
      />

      {/* The three pillars */}
      <section className="gradient-surface border-t border-line/60 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Three pillars, one score
              </p>
              <h2 className="font-display heading-section text-surface">
                Attributes. Compliance. Content.
              </h2>
              <p className="mt-3 text-slate-600">
                Most catalogs fail on all three simultaneously — and the failures compound. A correct attribute won&apos;t matter if the taxonomy is wrong. Complete content won&apos;t save a listing with an unresolved hazmat flag.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensions.map((d) => (
              <Reveal key={d.n}>
                <div className="card h-full p-6">
                  <span className="font-display text-2xl font-semibold text-slate-200">{d.n}</span>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">{d.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Why agentic commerce changes the bar */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Why the bar just changed
              </p>
              <h2 className="font-display heading-section text-surface">
                Marketplace readiness was the old problem. Agentic readiness is the new one.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Amazon and Walmart have required complete attributes for years. That bar is table stakes. The new bar is whether an AI shopping agent — ChatGPT, Perplexity, Google AI Overview — can interpret your product, match it to a buyer&apos;s query, and recommend it with confidence. If your attributes are missing or your compliance flags are wrong, the agent skips your SKU entirely. There is no rejection notice. The product just doesn&apos;t show up.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Voomi Supply saw this directly. Across 1M+ SKUs matched against 200M+ Amazon ASINs, the products that moved fastest shared three things: complete multipack signals, accurate hazmat classification, and clean channel matching — not the most marketing copy. Catalog Readiness scores all of that before the listing goes live.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How it works */}
      <section className="gradient-surface border-t border-b border-line/60 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                How it works
              </p>
              <h2 className="font-display heading-section text-surface">
                Upload. Score. Fix.
              </h2>
            </div>
          </Reveal>
          <div className="mx-auto max-w-4xl grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <Reveal key={s.step}>
                <div className="card h-full p-6">
                  <span className="font-display text-2xl font-semibold text-lime/60">{s.step}</span>
                  <h3 className="mt-2 text-sm font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a href="/try-it" className="inline-flex h-11 items-center justify-center rounded-2xl bg-[var(--lime)] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--lime-dim)]">
                Run a free diagnostic
              </a>
              <a href="/about#contact" className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                Talk to the team
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      <PageBottomCta
        title="Ready to score your catalog?"
        description="Upload a feed and get your readiness report in minutes — attributes, compliance, content, and agentic readiness all scored at the SKU level."
        primary={{ href: "/try-it", label: "Run a free diagnostic" }}
        secondary={{ href: "/about#contact", label: "Talk to the team" }}
      />
    </main>
  );
}
