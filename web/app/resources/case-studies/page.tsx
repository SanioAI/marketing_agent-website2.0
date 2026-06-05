import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Case Studies · Paladio Resources",
  description: "Real results from real deployments — see how Paladio Catalog Agents perform in production.",
};

const caseStudies = [
  {
    company: "Voomi Supply",
    tag: "E-commerce · HVAC Distribution",
    description:
      "How Catalog Agents turned messy HVAC supplier feeds into structured, marketplace-ready product data — 75% faster publishing, 70% lower cost per product.",
    kpis: [
      { v: "75%", l: "faster publishing" },
      { v: "70%", l: "lower cost/product" },
      { v: "300M+", l: "listings matched" },
    ],
    href: "/resources/case-studies/voomi",
  },
  {
    company: "Profitero",
    tag: "E-commerce · Analytics",
    description:
      "A five-layer identity resolution system that achieved 80%+ automated accuracy across 300+ client datasets and 1,000+ dataset scalability.",
    kpis: [
      { v: "80%+", l: "automated accuracy" },
      { v: "1,000+", l: "dataset scale" },
      { v: "300+", l: "client datasets" },
    ],
    href: "/resources/case-studies/profitero",
  },
];

export default function CaseStudiesPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Case Studies"
        title="Real results from real deployments"
        description="Every case study is a production deployment — with real numbers, real trade-offs, and a detailed look at how Paladio Catalog Agents performed."
      />

      <section className="gradient-surface border-t border-line/60 py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {caseStudies.map((cs) => (
              <Reveal key={cs.company}>
                <div className="card group flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-flex items-center rounded-full border border-line/70 bg-paper-dim px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink">
                        {cs.tag}
                      </span>
                      <h2 className="mt-2 text-xl font-semibold text-slate-900">
                        {cs.company}
                      </h2>
                    </div>
                    <span className="shrink-0 inline-flex items-center rounded-full border border-emerald-200/70 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                      Case Study
                    </span>
                  </div>

                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {cs.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {cs.kpis.map((k) => (
                      <div
                        key={k.l}
                        className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-center"
                      >
                        <div className="font-display text-lg font-semibold text-slate-900">
                          {k.v}
                        </div>
                        <div className="text-[10px] text-slate-500">{k.l}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={cs.href}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-ink transition hover:gap-2 hover:text-ink-deep"
                  >
                    Read case study <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PageBottomCta
        title="Want results like these?"
        description="Start with a focused pilot. We scope, build, and deploy your first agent — fast."
        primary={{ href: "/about#contact", label: "Book a pilot" }}
        secondary={{ href: "/try-it", label: "Try it live" }}
      />
    </main>
  );
}
