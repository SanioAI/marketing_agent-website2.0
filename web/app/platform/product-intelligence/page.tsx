import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Product Intelligence · Paladio",
  description: "Deep, AI-powered insights across your product data — so you can act on what your catalog is telling you.",
};

const capabilities = [
  {
    title: "Competitive Gap Analysis",
    desc: "Compare your product content depth against top-ranking competitors on the channels that matter most to your business.",
    icon: "📊",
  },
  {
    title: "Attribute Trend Detection",
    desc: "Identify which product attributes are becoming standard in your category before buyers start filtering by them.",
    icon: "📈",
  },
  {
    title: "Conversion Signal Scoring",
    desc: "Score every SKU on the content signals most correlated with conversion — title clarity, image count, review readiness.",
    icon: "⚡",
  },
  {
    title: "Category Intelligence",
    desc: "Understand how your taxonomy is performing relative to buyer search behavior across categories and sub-categories.",
    icon: "🗂️",
  },
  {
    title: "Feed Quality Monitoring",
    desc: "Track catalog health metrics over time with automated alerts when quality drops below defined thresholds.",
    icon: "🔔",
  },
  {
    title: "Enrichment ROI Tracking",
    desc: "Measure the before-and-after impact of Catalog Agent enrichment on visibility, completeness, and downstream metrics.",
    icon: "✅",
  },
];

export default function ProductIntelligencePage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Product Intelligence"
        title="Your catalog is talking. Are you listening?"
        description="Product Intelligence turns your enriched catalog data into strategic insight — surfacing trends, gaps, and opportunities your team can act on before competitors do."
      />

      <section className="gradient-surface border-t border-slate-200/60 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Capabilities
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Insight at every level of your catalog
              </h2>
              <p className="mt-3 text-slate-600">
                From individual SKU scoring to category-wide trend detection — Product Intelligence gives you the full picture.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <Reveal key={c.title}>
                <div className="card h-full p-6">
                  <span className="text-2xl">{c.icon}</span>
                  <h3 className="mt-3 text-base font-semibold text-slate-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {c.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="section-kicker mb-4">
                  <span className="dot" aria-hidden />
                  Built on enriched data
                </p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Intelligence is only as good as the data underneath it
                </h2>
                <p className="mt-4 text-slate-600">
                  Product Intelligence is powered by the same enrichment pipeline as Catalog Agents. Every attribute, taxonomy classification, and content score feeds into a unified data layer — giving you insights that reflect your actual catalog, not a sample or estimate.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="/agents/ecommerce"
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
                <p className="mb-4 text-sm font-semibold text-slate-500 uppercase tracking-widest">
                  Coming soon
                </p>
                <ul className="space-y-3">
                  {[
                    "Real-time catalog health dashboard",
                    "Competitor content benchmarking",
                    "Automated enrichment recommendations",
                    "Channel-specific readiness scoring",
                    "API access for BI integrations",
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
        description="We&apos;re onboarding a small group of design partners. Get in touch to be first."
        primary={{ href: "/about#contact", label: "Request early access" }}
        secondary={{ href: "/agents/ecommerce", label: "See Catalog Agents" }}
      />
    </main>
  );
}
