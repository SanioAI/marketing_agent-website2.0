import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/landing/buttons";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "AEC Agents — Paladio.ai",
  description:
    "AI agents that automate preconstruction workflows: drawing ingestion, quantity takeoffs, cost estimation, and value engineering.",
};

const problems = [
  {
    n: "01",
    t: "Cost opacity",
    p: "Key budget drivers are scattered across plans, elevations, and specifications—making it hard to identify cost-saving opportunities before it's too late.",
  },
  {
    n: "02",
    t: "Manual takeoffs",
    p: "Estimators spend weeks extracting quantity data from PDFs and maintaining spreadsheets. Small drawing updates invalidate entire takeoff packages.",
  },
  {
    n: "03",
    t: "Material overspecification",
    p: "Doors, glazing, and MEP systems are routinely specified beyond project requirements, quietly inflating costs by 5–15% on every project.",
  },
  {
    n: "04",
    t: "Design iteration delays",
    p: "Simple design changes require coordination across multiple teams and drawing updates, slowing value engineering to a crawl.",
  },
] as const;

const capabilities = [
  "Automated ingestion and structuring of full drawing sets",
  "Element detection: walls, rooms, doors, windows, MEP from PDFs",
  "AI-driven quantity calculations with traceable source citations",
  "Cost estimation against current market data",
  "Value-engineering analysis that flags overspecified components",
  "Natural language interface for design scenario exploration",
  "Confidence indicators and escalation for ambiguous conditions",
  "Structured, reviewable outputs built for owner negotiations",
] as const;

const workflow = [
  {
    step: "01",
    t: "Upload drawing sets",
    d: "PDFs, architectural plans, structural drawings, specifications—any format your team uses.",
  },
  {
    step: "02",
    t: "Agent structures the set",
    d: "Automatically parses sheets, detects elements, and builds a structured model of the project.",
  },
  {
    step: "03",
    t: "Takeoffs and cost data",
    d: "Generates quantity takeoffs and applies current cost data, with every assumption cited back to the source drawing.",
  },
  {
    step: "04",
    t: "Value-engineering analysis",
    d: "Flags material overspecification and cost-saving opportunities across the full scope.",
  },
  {
    step: "05",
    t: "Conversational exploration",
    d: "Ask questions in plain language—‘What happens to cost if we swap curtain wall for storefront?’—and get structured answers instantly.",
  },
] as const;

const kpis = [
  { k: "3 mo → 24 hrs", t: "Value engineering cycle time", d: "From months of manual analysis to a single-day agent run." },
  { k: "5–15%", t: "Typical cost reduction identified", d: "Through systematic detection of overspecified materials and assemblies." },
  { k: "100%", t: "Traceable takeoff assumptions", d: "Every quantity ties back to a specific sheet and element—ready for owner review." },
  { k: "Weeks → hours", t: "Drawing-to-estimate turnaround", d: "Estimators focus on judgment, not data extraction." },
] as const;

export default function AecAgentsPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="AEC Agents"
        title="Preconstruction, automated."
        description="Paladio AEC Agents ingest drawing sets and deliver quantity takeoffs, cost estimates, and value-engineering analysis—in hours, not months."
      >
        <ButtonLink href="/try-it" variant="primaryLg">
          Request early access
        </ButtonLink>
        <ButtonLink href="/about#contact" variant="secondaryLg">
          Talk to the team
        </ButtonLink>
      </PageHero>

      {/* Problems */}
      <section className="border-t border-line/60 gradient-surface py-16 sm:py-20" id="problems">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                The problem
              </p>
              <h2 className="heading-section text-surface">
                Preconstruction is still mostly manual
              </h2>
              <p className="mt-3 text-slate-600">
                Every project starts with the same expensive, error-prone process.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {problems.map((p, i) => (
              <Reveal key={p.n} delay={0.04 * i}>
                <div className="card-soft h-full p-6">
                  <p className="stat-value text-3xl text-surface-muted">{p.n}</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{p.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-t border-line/60 gradient-surface py-16 sm:py-20" id="capabilities">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className="section-kicker mb-4">
                  <span className="dot" aria-hidden />
                  What AEC Agents do
                </p>
                <h2 className="heading-section text-surface">
                  From drawings to decisions
                </h2>
                <p className="mt-4 text-pretty text-slate-600 sm:text-lg">
                  The agent reads your drawing sets the way an experienced estimator would—but at machine speed, with every assumption documented and traceable.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card p-7">
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
                  Capabilities
                </p>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                  {capabilities.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[var(--lime-dim)] to-[#06b6d4]"
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

      {/* Workflow */}
      <section className="border-t border-line/60 gradient-surface py-16 sm:py-20" id="workflow">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                How it works
              </p>
              <h2 className="heading-section text-surface">
                Five steps from upload to insight
              </h2>
            </div>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl space-y-4">
            {workflow.map((w, i) => (
              <Reveal key={w.step} delay={0.04 * i}>
                <div className="card-soft flex gap-5 p-6">
                  <p className="font-display text-2xl font-semibold text-slate-200 shrink-0 leading-none pt-0.5">
                    {w.step}
                  </p>
                  <div>
                    <p className="text-base font-semibold text-slate-900">{w.t}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{w.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* KPIs */}
      <section className="border-t border-line/60 gradient-surface py-16 sm:py-20" id="results">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Results
              </p>
              <h2 className="heading-section text-surface">
                What teams see in production
              </h2>
              <p className="mt-3 text-slate-600">
                Not benchmarks—outcomes from real preconstruction deployments.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {kpis.map((x, i) => (
              <Reveal key={x.k} delay={0.04 * i}>
                <div className="card h-full p-6">
                  <p className="font-display text-2xl font-semibold text-slate-900">{x.k}</p>
                  <p className="mt-2 text-sm font-medium text-slate-900">{x.t}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-line/60 gradient-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-section text-surface">
                Ready to cut your preconstruction cycle?
              </h2>
              <p className="mt-3 text-slate-600">
                AEC Agents are in early access. Share your drawing sets and we&apos;ll show you what the agent finds.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <ButtonLink href="/try-it" variant="primaryLg">
                  Request early access
                </ButtonLink>
                <ButtonLink href="/about#contact" variant="secondaryLg">
                  Talk to the team
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
