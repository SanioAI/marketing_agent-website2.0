import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const catalogAgentsInfo = {
  tag: "E-commerce",
  title: "Catalog Agents",
  desc:
    "AI agents that continuously evaluate, correct, and enhance product catalogs using structured reasoning—not one-time enrichment.",
  bullets: [
    "Continuously evaluate product correctness and completeness",
    "Fix taxonomy, attributes, and structure automatically",
    "Normalize brands and resolve duplicates",
    "Flag ambiguity and escalate only when needed (HITL review)",
    "Exports that match workflows: before/after, XLSX/CSV/JSON",
  ],
} as const;

const aecAgentsInfo = {
  tag: "AEC",
  title: "AEC Agents",
  desc: "AI agents that automate preconstruction workflows—from drawing ingestion to quantity takeoffs, cost estimation, and value engineering.",
  bullets: [
    "Ingest full drawing sets and structure them automatically",
    "Detect elements (walls, doors, windows, MEP) from construction PDFs",
    "Generate quantity takeoffs with traceable source citations",
    "Run cost estimation and value-engineering analysis",
    "Natural language interface for design scenario exploration",
  ],
} as const;

type ProductsSectionProps = {
  /** When false, the section omits the centered intro (e.g. when a page-level PageHero already introduced the topic). */
  showIntro?: boolean;
};

export function ProductsSection({ showIntro = true }: ProductsSectionProps) {
  return (
    <section
      id="products"
      className={[
        "gradient-surface py-20 sm:py-24",
        showIntro ? "border-y border-slate-200/60" : "border-b border-slate-200/60",
      ].join(" ")}
    >
      <Container>
        {showIntro ? (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Products
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Paladio.ai products, built on one platform
              </h2>
              <p className="mt-3 text-balance text-slate-600">
                Paladio.ai is the platform: orchestration, evaluation, and human-in-the-loop workflows.
                These are productized systems on top—built for real domain outcomes.
              </p>
            </div>
          </Reveal>
        ) : null}

        <div className={showIntro ? "mt-12 grid gap-4 lg:grid-cols-2" : "grid gap-4 lg:grid-cols-2"}>
          <Reveal>
            <div id="catalog-agents" className="card card-hover group relative h-full scroll-mt-24 overflow-hidden p-7">
              <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(900px_420px_at_10%_0%,rgba(79,70,229,0.14),transparent_60%),radial-gradient(900px_420px_at_90%_10%,rgba(236,72,153,0.10),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {catalogAgentsInfo.tag}
                  </p>
                  <span className="h-7 rounded-full border border-blue-200/70 bg-blue-50/60 px-3 text-[11px] font-medium text-blue-700">
                    Product
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{catalogAgentsInfo.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{catalogAgentsInfo.desc}</p>

                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                  {catalogAgentsInfo.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#2563eb] to-[#0ea5e9]"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href="/agents/ecommerce"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                  >
                    Explore Catalog Agents
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div id="aec-agents" className="card-soft relative h-full scroll-mt-24 overflow-hidden p-7">
              <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_0%,rgba(6,182,212,0.10),transparent_60%)]" />
              <div className="relative">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                    {aecAgentsInfo.tag}
                  </p>
                  <span className="h-7 rounded-full border border-slate-200 bg-white/70 px-3 text-[11px] font-medium text-slate-700">
                    Coming soon
                  </span>
                </div>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{aecAgentsInfo.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{aecAgentsInfo.desc}</p>
                <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                  {aecAgentsInfo.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-[#0ea5e9] to-[#06b6d4]"
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    href="/agents/aec"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                  >
                    Explore AEC Agents
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

