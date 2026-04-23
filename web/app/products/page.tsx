import { ProductsSection } from "@/components/landing/ProductsSection";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/landing/buttons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Products",
};

const proofKpis = [
  { k: "85%", t: "Faster catalog enrichment", d: "Products go live in hours, not weeks." },
  { k: "94%", t: "Reduction in manual cleanup", d: "Stop fixing the same issues repeatedly." },
  { k: "75%", t: "Fewer downstream errors", d: "Fewer rejections, returns, and compliance issues." },
  { k: "84%", t: "Edge cases resolved automatically", d: "Handles missing fields and noisy inputs at scale." },
] as const;

const faqs = [
  {
    q: "Is this just enrichment?",
    a: "No. Catalog Agents continuously evaluate and correct catalogs over time.",
  },
  {
    q: "Do you replace our PIM?",
    a: "No. Catalog Agents sit upstream and improve the data flowing into your PIM and channels.",
  },
  {
    q: "What data sources do you use?",
    a: "Vendor feeds, PDFs, spreadsheets, images, and unstructured text.",
  },
  {
    q: "How long does deployment take?",
    a: "Typically a few weeks, depending on data sources and scale.",
  },
  {
    q: "Is this safe for production catalogs?",
    a: "Yes. It’s designed for high-scale, high-impact commerce environments with review and guardrails.",
  },
] as const;

const opsBefore = [
  "Manual cleanup and reactive fixes",
  "Duplicate lines and brand variance",
  "Missing attributes and inconsistent taxonomy",
  "Channel rejections and compliance surprises",
] as const;

const opsAfter = [
  "Continuous evaluation with Catalog Agents",
  "Normalization, dedupe, and structure",
  "Automated taxonomy + attribute correction",
  "Confidence indicators, evidence, and review queues",
] as const;

export default function ProductsPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Products"
        title="Domain agents on one platform"
        description="Paladio.ai orchestrates evaluation, review, and exports. Catalog Agents ship today; AEC Agents are on the roadmap—same methodology, different problem spaces."
      >
        <ButtonLink href="/try-it" variant="primaryLg">
          Run the live demo
        </ButtonLink>
        <ButtonLink href="/solutions" variant="secondaryLg">
          Explore solutions
        </ButtonLink>
      </PageHero>
      <ProductsSection showIntro={false} />

      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Proof
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
            {proofKpis.map((x, i) => (
              <Reveal key={x.k} delay={0.04 * i}>
                <div className="card h-full p-6">
                  <p className="text-3xl font-semibold text-slate-900">{x.k}</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{x.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20" id="what-are-catalog-agents">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className="section-kicker mb-4">
                  <span className="dot" aria-hidden />
                  Catalog Agents
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  What are Catalog Agents?
                </h2>
                <p className="mt-4 text-pretty text-slate-600 sm:text-lg">
                  AI agents that continuously evaluate, correct, and enhance product catalogs using
                  structured reasoning—not one-time enrichment.
                </p>
                <p className="mt-4 text-sm text-slate-600">
                  Catalog Agents are the foundation. Everything else depends on them.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card p-7">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  What Catalog Agents actually do
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {[
                    "Continuously evaluate product correctness and completeness",
                    "Fix taxonomy, attributes, and structure automatically",
                    "Normalize brands and resolve duplicates",
                    "Flag ambiguity and escalate only when needed",
                    "Produce exports with confidence indicators and evidence",
                  ].map((b) => (
                    <li key={b} className="flex gap-2">
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

      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20" id="ops-change">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Operating model
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                How catalog operations change
              </h2>
              <p className="mt-3 text-slate-600">
                Move from reactive cleanup to continuous evaluation with reviewable outputs.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="card-soft p-7">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Manual cleanup and reactive fixes
                </p>
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  {opsBefore.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-0.5 text-slate-400" aria-hidden>
                        •
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card card-hover p-7">
                <p className="text-xs font-medium uppercase tracking-widest text-blue-800/80">
                  Continuous evaluation with Catalog Agents
                </p>
                <ul className="mt-5 space-y-3 text-sm text-slate-700">
                  {opsAfter.map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-0.5 text-blue-600" aria-hidden>
                        •
                      </span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/60 bg-white py-16 sm:py-20" id="trust">
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
                Every output from Catalog Agents is designed to be reviewed, audited, and shipped.
              </p>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            {[
              {
                t: "Evaluated against real inputs",
                p: "Not “best effort”—measured against your data and standards.",
              },
              {
                t: "Corrected with structured reasoning",
                p: "Clear structure, not just prose. Better reliability in edge cases.",
              },
              {
                t: "Confidence + explainability",
                p: "Confidence indicators, evidence, and escalation for ambiguity.",
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
          <div className="mt-10 text-center">
            <ButtonLink href="/try-it" variant="primaryLg">
              See it on real data
            </ButtonLink>
          </div>
        </Container>
      </section>
    </main>
  );
}

