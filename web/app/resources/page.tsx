import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { blogCards } from "@/lib/blog";

export const metadata = {
  title: "Resources",
};

const caseStudies = [
  {
    t: "Voomi Supply",
    p: "How Catalog Agents turned messy HVAC supplier feeds into structured, marketplace-ready product data — 75% faster publishing, 70% lower cost per product.",
    status: "Case study" as const,
    kpis: ["75% faster publishing", "70% lower cost/product", "300M+ listings matched"],
    href: "/resources/case-studies/voomi",
  },
  {
    t: "Profitero",
    p: "A five-layer identity resolution system that achieved 80%+ automated accuracy across 300+ client datasets and 1,000+ dataset scalability.",
    status: "Case study" as const,
    kpis: ["80%+ automated accuracy", "1,000+ dataset scale", "300+ client datasets"],
    href: "/resources/case-studies/profitero",
  },
] as const;

export default function ResourcesPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Resources"
        title="Guides, perspectives, and proof"
        description="Notes on product reasoning, verifiable agent outputs, and domain-specific agents. We publish selectively—depth over volume."
      />

      <section id="case-studies" className="gradient-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Case studies
              </p>
              <h2 className="heading-section text-surface">
                Real workflows, measurable change
              </h2>
              <p className="mt-3 text-slate-600">
                Short-form writeups with enough detail to be useful—full narratives on request.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {caseStudies.map((x, i) => (
              <Reveal key={x.t} delay={0.04 * i}>
                <Link
                  className="card card-hover group flex h-full flex-col p-7"
                  href={x.href}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-lg font-semibold text-slate-900">{x.t}</p>
                    <span className="shrink-0 rounded-full border border-line/80 bg-paper-dim/80 px-2.5 py-0.5 text-[11px] font-medium text-ink-deep">
                      {x.status}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{x.p}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {x.kpis.map((k) => (
                      <span key={k} className="rounded-full border border-slate-200/80 bg-slate-50 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
                        {k}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-medium text-ink group-hover:gap-2">Read case study →</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="blog" className="border-t border-line/60 gradient-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Blog
              </p>
              <h2 className="heading-section text-surface">
                Notes from the field
              </h2>
              <p className="mt-3 text-slate-600">
                Published pieces and a few topics we are drafting. More catalog articles coming next.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {blogCards.map((x, i) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="rounded-full border border-slate-200/80 bg-white/80 px-2 py-0.5 font-medium text-slate-600">
                      {x.tag}
                    </span>
                    <span>
                      {x.read}
                      {!x.slug ? " · soon" : ""}
                    </span>
                  </div>
                  <p className="mt-4 text-base font-semibold leading-snug text-slate-900 group-hover:text-ink-deep">
                    {x.t}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{x.p}</p>
                  {x.slug ? (
                    <p className="mt-4 text-sm font-medium text-ink">Read post →</p>
                  ) : null}
                </>
              );
              return (
                <Reveal key={x.t} delay={0.04 * i}>
                  {x.slug ? (
                    <Link
                      href={`/resources/blog/${x.slug}`}
                      className="group card-soft flex h-full flex-col p-6 transition hover:border-line/60"
                    >
                      {inner}
                    </Link>
                  ) : (
                    <article className="card-soft flex h-full flex-col p-6 opacity-80">{inner}</article>
                  )}
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <PageBottomCta
        title="Get the next release"
        description="Tell us which topic you care about—we will share drafts and launch posts with teams who are actively shipping."
        primary={{ href: "/about#contact", label: "Contact Paladio.ai" }}
        secondary={{ href: "/try-it", label: "Try Catalog Agents" }}
      />
    </main>
  );
}
