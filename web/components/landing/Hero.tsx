import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";
import { HeroVisual } from "@/components/landing/HeroVisual";

const stats = [
  { v: "85%", l: "faster enrichment" },
  { v: "94%", l: "less manual cleanup" },
  { v: "75%", l: "fewer downstream errors" },
] as const;

export function Hero() {
  return (
    <section
      className="gradient-hero border-b border-slate-200/50 pt-28 pb-20 sm:pb-24"
      id="top"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          <div>
            <Reveal>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-white/70 px-3 py-1 text-xs font-medium text-blue-900 shadow-sm shadow-blue-900/5">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]" />
                Production infrastructure · Not experimental AI
              </p>
              <h1 className="font-display text-balance text-4xl font-semibold leading-[1.06] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                Stop fixing catalog data.{" "}
                <span className="bg-gradient-to-r from-[#2563eb] via-[#0284c7] to-[#0ea5e9] bg-clip-text text-transparent">
                  Start selling.
                </span>
              </h1>
              <p className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-slate-600 sm:text-[17px]">
                Paladio.ai builds AI agents that continuously evaluate, correct, and
                enrich your product catalog—so your team ships faster instead of
                fixing the same data problems on repeat.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center" id="book">
                <ButtonLink href="/try-it" variant="primaryLg">
                  Try it on real data
                </ButtonLink>
                <ButtonLink href="#contact" variant="secondaryLg">
                  Book a demo
                </ButtonLink>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                {stats.map((s) => (
                  <div key={s.v} className="flex items-baseline gap-1.5">
                    <span className="font-display text-lg font-semibold text-slate-900">
                      {s.v}
                    </span>
                    <span className="text-xs text-slate-500">{s.l}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="hidden lg:block">
            <HeroVisual />
          </div>
        </div>
        <div className="mt-12 block lg:hidden">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
