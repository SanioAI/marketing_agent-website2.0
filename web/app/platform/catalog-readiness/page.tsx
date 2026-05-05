import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Catalog Readiness · Paladio",
  description: "Assess, score, and improve your product catalog health before it costs you revenue.",
};

const dimensions = [
  {
    n: "01",
    title: "Data Completeness",
    desc: "Identify missing attributes, empty descriptions, and gaps in structured data across your entire catalog.",
  },
  {
    n: "02",
    title: "Content Quality",
    desc: "Score titles, descriptions, and bullet points against marketplace standards and conversion best practices.",
  },
  {
    n: "03",
    title: "Taxonomy Accuracy",
    desc: "Validate product classifications against your target channel taxonomy — Amazon, Google, distributor portals.",
  },
  {
    n: "04",
    title: "Compliance Flags",
    desc: "Surface regulatory, hazmat, and channel-specific compliance issues before they cause listing rejections.",
  },
  {
    n: "05",
    title: "SEO Readiness",
    desc: "Evaluate keyword coverage, search relevance signals, and content gaps relative to top-ranking competitors.",
  },
  {
    n: "06",
    title: "Image & Media",
    desc: "Audit image counts, resolution, background compliance, and lifestyle asset coverage per SKU.",
  },
];

export default function CatalogReadinessPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Catalog Readiness"
        title="Know exactly where your catalog stands"
        description="Before you enrich, you need to know what's broken. Catalog Readiness gives you a scored, actionable picture of your product data health across every dimension that matters."
      />

      <section className="gradient-surface border-t border-slate-200/60 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Six dimensions scored
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                A full diagnostic, not just a number
              </h2>
              <p className="mt-3 text-slate-600">
                Each dimension produces an actionable score with specific SKU-level findings — so your team knows exactly what to fix and in what order.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dimensions.map((d) => (
              <Reveal key={d.n}>
                <div className="card h-full p-6">
                  <span className="font-display text-2xl font-semibold text-slate-200">
                    {d.n}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">
                    {d.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {d.desc}
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
            <div className="mx-auto max-w-3xl rounded-2xl border border-blue-100 bg-blue-50/40 px-8 py-10 text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                How it works
              </p>
              <h2 className="font-display text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Upload your catalog. Get your readiness report.
              </h2>
              <p className="mt-3 text-slate-600">
                Connect your feed or upload a CSV. Paladio runs the diagnostic across all six dimensions and returns a prioritized report — with per-SKU findings, severity ratings, and recommended enrichment actions.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="/try-it"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
                >
                  Run a free diagnostic
                </a>
                <a
                  href="/about#contact"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Talk to the team
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <PageBottomCta
        title="Ready to score your catalog?"
        description="Upload a feed and get your readiness report in minutes — no setup required."
        primary={{ href: "/try-it", label: "Run a free diagnostic" }}
        secondary={{ href: "/about#contact", label: "Talk to the team" }}
      />
    </main>
  );
}
