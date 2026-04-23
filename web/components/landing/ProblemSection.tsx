import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const pain = [
  {
    t: "Supplier data arrives ugly",
    d: "Inconsistent names, half-built specs, and “see attachment” is not a product page.",
  },
  {
    t: "The same product is everywhere",
    d: "Variations, legacy SKUs, and channel copy create duplicate lines that quietly kill margin.",
  },
  {
    t: "Listings that do not sell",
    d: "Vague copy and missing attributes make search, filters, and recommendations misfire.",
  },
  {
    t: "Revenue does not show up in analytics",
    d: "The catalog is the system of record. When it is wrong, conversion and merchandising are guesses.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="gradient-surface py-20 sm:py-24">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              Why It Matters
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A messy catalog is a tax on every team
            </h2>
            <p className="mt-3 text-slate-600">
              Catalog work should not be the bottleneck for launches, marketplaces, or
              new categories.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {pain.map((p, i) => (
            <Reveal key={p.t} delay={0.04 * i}>
              <div className="card card-hover h-full p-6">
                <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg border border-blue-200/70 bg-blue-50/60 text-xs font-bold text-blue-700">
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold text-slate-900">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
