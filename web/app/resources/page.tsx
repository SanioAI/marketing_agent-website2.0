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
    p: "How Paladio helped turn messy product inputs into structured, reviewable outputs—ready for downstream catalog workflows.",
    status: "Case study" as const,
    href: "/case-studies/paladio_voomi_case_study_FINAL.pdf",
  },
  {
    t: "Profitero",
    p: "A practical look at deploying agent workflows with measurable operational wins—without sacrificing governance or reviewability.",
    status: "Case study" as const,
    href: "/case-studies/paladio_profitero_case_study_FINAL.pdf",
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
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
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
                <a
                  className="card card-hover flex h-full flex-col p-7"
                  href={x.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-lg font-semibold text-slate-900">{x.t}</p>
                    <span className="shrink-0 rounded-full border border-blue-200/80 bg-blue-50/80 px-2.5 py-0.5 text-[11px] font-medium text-blue-800">
                      {x.status}
                    </span>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{x.p}</p>
                  <p className="mt-5 text-sm font-medium text-blue-700">Download PDF →</p>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="blog" className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Blog
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
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
                  <p className="mt-4 text-base font-semibold leading-snug text-slate-900 group-hover:text-blue-800">
                    {x.t}
                  </p>
                  <p className="mt-2 flex-1 text-sm text-slate-600">{x.p}</p>
                  {x.slug ? (
                    <p className="mt-4 text-sm font-medium text-blue-700">Read post →</p>
                  ) : null}
                </>
              );
              return (
                <Reveal key={x.t} delay={0.04 * i}>
                  {x.slug ? (
                    <Link
                      href={`/resources/blog/${x.slug}`}
                      className="group card-soft flex h-full flex-col p-6 transition hover:border-blue-200/60"
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
