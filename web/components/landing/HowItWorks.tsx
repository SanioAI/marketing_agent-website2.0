import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    n: "01",
    t: "Ingest what you already have",
    s: "CSVs, feeds, exports, documents. No rip-and-replace—start where the mess lives.",
  },
  {
    n: "02",
    t: "Reason, validate, and generate",
    s: "Agents build structure (graphs/constraints), generate outputs, attach evidence, and surface uncertainty for review.",
  },
  {
    n: "03",
    t: "Ship decision-ready outputs",
    s: "Exports your team can use: before/after, compliance flags, structured fields, and measurable improvement.",
  },
] as const;

export function HowItWorks() {
  return (
    <section className="border-t border-slate-200/60 gradient-surface py-20 sm:py-24" id="how">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              Workflow
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A straight line from data to revenue
            </h2>
            <p className="mt-3 text-slate-600">
              Three simple moves. No 40-slide transformation plan.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={0.04 * i}>
              <div className="card card-hover h-full p-6">
                <p className="font-display text-xs font-semibold text-blue-700">{s.n}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
