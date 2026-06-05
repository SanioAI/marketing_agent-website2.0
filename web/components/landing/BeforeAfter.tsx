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
    <span className="inline-flex items-center gap-2 rounded-full border border-line/70 bg-paper/80 px-3 py-1 text-xs font-medium text-surface shadow-sm">
      <span
        className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[var(--lime)] to-[var(--lime-dim)]"
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
            <h2 className="heading-section text-surface">
              The shift teams feel on day one
            </h2>
            <p className="section-lede mx-auto mt-6 text-balance">
              Same inventory. Different catalog. Clearer, safer decisions.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <figure className="surface-panel mt-10 overflow-hidden rounded-[4px] shadow-2xl shadow-ink/10">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 bg-paper-dim/60 px-5 py-4">
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
                src="/images/before-after-iphone.png"
                alt="Before and after catalog enrichment: manual product intake on the left versus AI-driven automation on the right, showing iPhone 17 Pro enriched with standardized attributes, correct classification, and high confidence"
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
