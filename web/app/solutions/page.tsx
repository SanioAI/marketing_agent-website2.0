import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";

export const metadata = {
  title: "Solutions",
};

const domains = [
  {
    t: "Commerce Catalog Intelligence",
    p: "Improve discovery, compliance, and conversion by making catalogs structured, compatible, and substitution-aware.",
    bullets: ["Product graph", "Compatibility and fitment", "Substitutions", "Before/after exports"],
  },
  {
    t: "AEC Document Understanding",
    p: "Turn complex drawings and specs into structured, reviewable outputs for downstream workflows.",
    bullets: ["Page routing", "Structured extraction", "Reconciliation", "Human review"],
  },
] as const;

const industries = [
  { t: "Retail and marketplaces", p: "High-SKU operations, seller variance, and compliance risk." },
  { t: "Distributors", p: "Supplier chaos, long tail SKUs, and inconsistent specifications." },
  { t: "Manufacturing", p: "Structured product stories across regions and channels." },
  { t: "Construction (AEC)", p: "Large document sets, takeoffs, schedules, and revisions." },
] as const;

const outcomes = [
  {
    t: "Structured by default",
    p: "Exports you can load into PIM, marketplace feeds, and internal review tools without rework.",
  },
  {
    t: "Governed and reviewable",
    p: "Human-in-the-loop checkpoints for uncertainty, brand voice, and policy.",
  },
  {
    t: "Measured, not magic",
    p: "Before/after, pipeline visibility, and evaluation hooks so teams trust what ships.",
  },
] as const;

export default function SolutionsPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Solutions"
        title="Domain systems that ship outcomes"
        description="Paladio.ai builds productized agent systems for high-cost workflows—so you get structured outputs, clear review, and continuous improvement, not one-off model demos."
      />

      <section className="gradient-surface py-14 sm:py-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {outcomes.map((o, i) => (
              <Reveal key={o.t} delay={0.05 * i}>
                <div className="card h-full p-6">
                  <p className="text-base font-semibold text-slate-900">{o.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{o.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            {domains.map((d, i) => (
              <Reveal key={d.t} delay={0.05 * i}>
                <div className="card card-hover h-full p-7">
                  <h2 className="text-xl font-semibold text-slate-900">{d.t}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.p}</p>
                  <ul className="mt-5 space-y-2 text-sm text-slate-700">
                    {d.bullets.map((b) => (
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
            ))}
          </div>
        </Container>
      </section>

      <section id="industries" className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Where we help
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Built for real-world complexity
              </h2>
              <p className="mt-3 text-slate-600">Messy inputs, governance, and speed in the same room.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {industries.map((x, i) => (
              <Reveal key={x.t} delay={0.04 * i}>
                <div className="card-soft p-6 transition hover:border-blue-200/60">
                  <p className="text-lg font-semibold text-slate-900">{x.t}</p>
                  <p className="mt-2 text-sm text-slate-600">{x.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PageBottomCta
        title="See it on your data"
        description="Run the Catalog Agents demo or talk with us about scope, security, and rollout."
        primary={{ href: "/try-it", label: "Try the demo" }}
        secondary={{ href: "/about#contact", label: "Contact Paladio.ai" }}
      />
    </main>
  );
}
