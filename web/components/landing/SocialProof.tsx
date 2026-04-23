import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const metrics = [
  { k: "85%", v: "faster catalog enrichment" },
  { k: "94%", v: "reduction in manual cleanup" },
  { k: "75%", v: "fewer downstream errors" },
  { k: "84%", v: "edge cases resolved automatically" },
];

export function SocialProof() {
  return (
    <section className="border-b border-slate-200/60 gradient-surface py-14 sm:py-16">
      <Container>
        <Reveal>
          <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.k}
                className="rounded-2xl border border-slate-200/60 bg-white/70 px-5 py-5 text-center shadow-sm shadow-blue-900/5 transition hover:border-blue-200/50 hover:shadow-blue-900/8"
              >
                <p className="font-display text-3xl font-semibold text-slate-900">{m.k}</p>
                <p className="mt-1 text-sm text-slate-500">{m.v}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200/70 bg-white/80 px-7 py-6 shadow-sm shadow-slate-900/5">
            <p className="text-base leading-relaxed text-slate-700 sm:text-[17px]">
              "Their approach{" "}
              <span className="font-medium text-slate-900">
                drastically reduced manual effort while improving accuracy.
              </span>{" "}
              The agents caught issues we weren't even aware of—and the before/after
              exports made it easy for our team to review and sign off."
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] text-xs font-bold text-white shadow-sm">
                EB
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Eric Bosco</p>
                <p className="text-xs text-slate-500">Profitero / Publicis Groupe</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
