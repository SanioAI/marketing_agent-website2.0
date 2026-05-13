import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata = {
  title: "Ranker · Paladio",
  description: "Score how well your enriched catalog performs in AI shopping agents — ChatGPT, Perplexity, Google AI. Know if Catalog Agents output is actually working where buyers are going.",
};

const signals = [
  {
    n: "01",
    title: "AI Retrieval Score",
    desc: "How often does your SKU appear when an AI shopping agent queries your category? Score before and after enrichment to see the direct lift.",
  },
  {
    n: "02",
    title: "Match Confidence",
    desc: "When an agent tries to match a buyer's query to your product, how confident is the match? Low confidence means the agent skips you — or recommends a competitor.",
  },
  {
    n: "03",
    title: "Recommendation Accuracy",
    desc: "Does the AI agent recommend your product for the right query? Wrong placements cost you buyer trust. Ranker surfaces attribute gaps that cause mismatches.",
  },
  {
    n: "04",
    title: "Comparison Readiness",
    desc: "AI agents compare products side-by-side. If your attributes are incomplete, you lose the comparison — not because the product is worse, but because the data is thinner.",
  },
  {
    n: "05",
    title: "Answer Inclusion Rate",
    desc: "For ChatGPT and Perplexity, track how often your products appear in AI-generated answers when buyers ask category questions. The products with complete data dominate.",
  },
  {
    n: "06",
    title: "Enrichment Impact Score",
    desc: "Connect the dots: which Catalog Agent enrichment runs moved your Ranker score? Close the feedback loop so the next enrichment cycle targets the right attributes.",
  },
];

const agents = [
  { name: "Gemini", detail: "Google Gemini AI product discovery", live: true },
  { name: "ChatGPT Shopping", detail: "Plugin and browsing mode product discovery", live: false },
  { name: "Perplexity", detail: "Answer-engine product recommendations", live: false },
  { name: "Google AI Overview", detail: "Generative search with product cards", live: false },
  { name: "Google Shopping AI", detail: "AI-powered comparison and filtering", live: false },
  { name: "Amazon Rufus", detail: "Conversational product discovery on Amazon", live: false },
  { name: "Microsoft Bing Copilot", detail: "Shopping copilot in Edge and Bing", live: false },
];

export default function RankerPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Ranker · Agentic Commerce"
        title="You enriched your catalog. Now find out if it's working."
        description="AI shopping agents — ChatGPT, Perplexity, Google AI — are where more buyers discover products. Ranker scores how well your Paladio-enriched catalog actually performs in those agents. Not rankings. Actual retrieval, match confidence, and recommendation accuracy."
      />

      {/* The new surface */}
      <section className="gradient-surface border-t border-slate-200/60 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                The new buying surface
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                The buyer already moved. Your catalog measurement hasn&apos;t.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                A buyer used to search on Google, scan organic results, click a PDP. That path still exists — but a growing share of discovery happens through conversational AI. A buyer asks ChatGPT &ldquo;what&apos;s the best industrial-grade degreaser for aluminum?&rdquo; and gets three products, ranked by the model. Your product is in there or it isn&apos;t. There is no page two.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                The products that win are not the ones with the most ad spend. They&apos;re the ones with complete attributes, accurate hazmat classification, clean taxonomy, and enough structured data that the model can answer the buyer&apos;s question confidently. That&apos;s exactly what Catalog Agents produces. Ranker measures whether it worked.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Six signals */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                What Ranker scores
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Six signals across every AI shopping surface
              </h2>
              <p className="mt-3 text-slate-600">
                Ranker doesn&apos;t grade your content marketing. It measures whether AI agents can find your product, match it to a query, and recommend it with confidence.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {signals.map((s) => (
              <Reveal key={s.n}>
                <div className="card h-full p-6">
                  <span className="font-display text-2xl font-semibold text-slate-200">{s.n}</span>
                  <h3 className="mt-2 text-base font-semibold text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Agents covered */}
      <section className="gradient-surface border-t border-b border-slate-200/60 py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-2xl text-center mb-12">
              <p className="section-kicker mx-auto mb-4">
                <span className="dot" aria-hidden />
                Coverage
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Every major AI shopping surface
              </h2>
              <p className="mt-3 text-slate-600">
                Ranker tracks your catalog performance across all seven AI discovery surfaces where buyers are going.
              </p>
            </div>
          </Reveal>

          <div className="mx-auto max-w-3xl grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {agents.map((a) => (
              <Reveal key={a.name}>
                <div className="relative rounded-xl border bg-white p-4 border-slate-200/80">
                  {!a.live && (
                    <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded-full border border-amber-200 bg-amber-50 h-5 w-5 text-[11px] font-semibold text-amber-600">
                      ★
                    </span>
                  )}
                  <p className="text-sm font-semibold text-slate-900 pr-20">{a.name}</p>
                  <p className="mt-1 text-xs text-slate-500">{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-slate-400">★ = Coming Soon</p>
        </Container>
      </section>

      {/* The feedback loop */}
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-3xl">
              <p className="section-kicker mb-4">
                <span className="dot" aria-hidden />
                The compound loop
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Enrichment that knows if it worked
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Without Ranker, catalog enrichment is a one-way process: you improve the data, hope it performs better, and find out three months later in a quarterly review. With Ranker, every enrichment cycle gets scored. If Catalog Agents added a missing multipack signal and your Ranker score for that SKU went up in Amazon Rufus, you know. The next cycle targets the next gap.
              </p>
              <p className="mt-4 text-slate-600 leading-relaxed">
                That&apos;s the compound effect: every enrichment run is more targeted than the last because you&apos;re not guessing which attributes move AI agent performance — you&apos;re measuring it.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/about#contact"
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-[#2563eb] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1d4ed8]"
                >
                  Request early access
                </a>
                <a
                  href="/catalog-agents"
                  className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  See Catalog Agents →
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <PageBottomCta
        title="Score your catalog in AI shopping agents"
        description="Find out how your Paladio-enriched products perform in ChatGPT, Perplexity, and Google AI — and which attribute gaps to close next."
        primary={{ href: "/about#contact", label: "Request early access" }}
        secondary={{ href: "/catalog-agents", label: "See Catalog Agents" }}
      />
    </main>
  );
}
