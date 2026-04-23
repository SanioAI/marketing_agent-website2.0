import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/ui/PageHero";
import { ContactSection } from "@/components/landing/ContactSection";

export const metadata = {
  title: "About",
};

const leadership = [
  { name: "Vamsi Putrevu", title: "Co-Founder and CEO" },
  { name: "Sebastian Gunningham", title: "Co-Founder" },
  { name: "Wei Zhang", title: "Co-Founder and Chief AI Scientist" },
] as const;

const principles = [
  {
    t: "Domain first",
    p: "Agents are productized for specific workflows—not generic chat wrapped in branding.",
  },
  {
    t: "Verifiable outputs",
    p: "Structured fields, evidence, and before/after views so teams can trust and audit results.",
  },
  {
    t: "Human in the loop",
    p: "Review where uncertainty is high; automation where the model is consistently right.",
  },
] as const;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

export default function AboutPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="About"
        title="Paladio.ai builds domain AI agents that ship"
        description="We move fast, evaluate continuously, and design for human review—so organizations can deploy agent systems in real operational workflows, not slide decks."
      />

      <section className="gradient-surface py-16 sm:py-20">
        <Container>
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-start">
            <Reveal>
              <div>
                <p className="section-kicker mb-4">
                  <span className="dot" aria-hidden />
                  Company
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Platform, methodology, and products
                </h2>
                <p className="mt-4 text-pretty text-slate-600 sm:text-lg">
                  Paladio.ai is the platform: orchestration, evaluation, and human-in-the-loop
                  workflows. Our products—Catalog Agents today; AEC Agents on the roadmap—are built
                  on that foundation for domain-specific outcomes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="card p-7">
                <p className="text-sm font-medium uppercase tracking-widest text-slate-500">What we believe</p>
                <ul className="mt-4 space-y-3 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="text-blue-600" aria-hidden>
                      →
                    </span>
                    Messy real-world inputs deserve structured outputs and clear review paths.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600" aria-hidden>
                      →
                    </span>
                    The best agent UX is honest progress, not fake confidence.
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-600" aria-hidden>
                      →
                    </span>
                    Exports should match how teams work: spreadsheets, JSON, and evidence trails.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/60 gradient-surface py-14 sm:py-20">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map((p, i) => (
              <Reveal key={p.t} delay={0.04 * i}>
                <div className="card-soft h-full p-6">
                  <p className="text-base font-semibold text-slate-900">{p.t}</p>
                  <p className="mt-2 text-sm text-slate-600">{p.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200/60 gradient-surface py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-4xl">
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                Leadership
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Team</h2>
              <p className="mt-3 max-w-2xl text-slate-600">
                Experienced operators and researchers building production agent systems.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {leadership.map((p) => (
                  <div
                    key={p.name}
                    className="card-soft flex items-start gap-4 p-6 transition hover:border-blue-200/50"
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563eb] via-[#0284c7] to-[#0ea5e9] text-sm font-semibold text-white shadow-sm"
                      aria-hidden
                    >
                      {initials(p.name)}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-slate-900">{p.name}</p>
                      <p className="mt-0.5 text-sm text-slate-600">{p.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <ContactSection />
    </main>
  );
}
