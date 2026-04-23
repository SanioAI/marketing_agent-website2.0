import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const items = [
  {
    n: "01",
    t: "Ecommerce brands",
    p: "Launch and refresh products faster. Keep every storefront in sync with what you actually have to sell—without a team of spreadsheet wranglers.",
    tag: "Retail & DTC",
  },
  {
    n: "02",
    t: "Distributors",
    p: "HVAC, parts, electronics, industrial—tame the long tail at scale. Normalize supplier data across thousands of SKUs without adding headcount.",
    tag: "B2B Distribution",
  },
  {
    n: "03",
    t: "Marketplace sellers",
    p: "Turn supplier chaos into clean listings across every channel. One canonical SKU, deduplicated, attributed correctly, and ready to syndicate.",
    tag: "Multi-channel",
  },
] as const;

export function UseCases() {
  return (
    <section
      className="border-t border-slate-200/60 gradient-surface py-20 sm:py-24"
      id="industries"
    >
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              Who It&apos;s For
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Built for teams with serious SKU count
            </h2>
            <p className="mt-3 text-slate-600">
              If your catalog is the bottleneck, this is the infrastructure to fix it.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {items.map((b, i) => (
            <Reveal key={b.t} delay={0.06 * i}>
              <div className="card card-hover group h-full p-6 sm:p-7">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display text-3xl font-semibold text-slate-200 transition group-hover:text-blue-100">
                    {b.n}
                  </span>
                  <span className="rounded-full border border-slate-200/70 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                    {b.tag}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{b.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{b.p}</p>
                <a
                  href="#book"
                  className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-blue-600 transition hover:text-blue-800"
                >
                  See if this fits your team
                  <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
