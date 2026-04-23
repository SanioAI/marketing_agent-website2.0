import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import Image from "next/image";

const highlights = [
  { t: "Standardized attributes", s: "check" as const },
  { t: "Correct classification", s: "check" as const },
  { t: "High confidence", s: "check" as const },
] as const;

function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm shadow-slate-900/5">
      <span
        className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]"
        aria-hidden
      />
      {label}
    </span>
  );
}

export function BeforeAfter() {
  return (
    <section className="gradient-surface py-20 sm:py-24" id="compare">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              Before & After
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              The shift teams feel on day one
            </h2>
            <p className="mt-3 text-balance text-slate-600">
              Same inventory. Different catalog. Clearer, safer decisions.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="mt-10 overflow-hidden rounded-3xl border border-slate-200/70 bg-white/70 shadow-2xl shadow-slate-900/10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 bg-white/60 px-5 py-4">
              <div className="flex flex-wrap gap-2">
                <StatusPill label="Before" />
                <StatusPill label="Agent working…" />
                <StatusPill label="After" />
              </div>
              <div className="hidden flex-wrap gap-2 sm:flex">
                {highlights.map((h) => (
                  <span
                    key={h.t}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50/60 px-3 py-1 text-xs font-medium text-emerald-800"
                  >
                    <span className="text-emerald-600" aria-hidden>
                      ✓
                    </span>
                    {h.t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-5xl p-3 sm:p-5">
              <div className="relative aspect-[1024/552] w-full overflow-hidden rounded-2xl">
              <Image
                src="/images/before-after.png"
                alt="Before and after catalog enrichment: agent working to standardize attributes, correct classification, and raise confidence"
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 1024px, 100vw"
                priority
              />
            </div>
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
