import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Articles · Paladio Resources",
  description: "In-depth reads on AI agents, catalog operations, and product data strategy.",
};

const articles: {
  title: string;
  description: string;
  tag: string;
  href: string;
  date: string;
}[] = [
  // Articles will be added here — content coming soon
];

export default function ArticlesPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Articles"
        title="In-depth reads on AI and catalog ops"
        description="We write about what we see in production — data quality patterns, agent design trade-offs, and how AI changes catalog operations at scale."
      />

      <section className="gradient-surface border-t border-slate-200/60 py-16 sm:py-20">
        <Container>
          {articles.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Reveal key={a.href}>
                  <Link
                    href={a.href}
                    className="card group flex h-full flex-col p-6 transition hover:-translate-y-1"
                  >
                    <span className="inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-blue-700">
                      {a.tag}
                    </span>
                    <h2 className="mt-3 text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {a.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {a.description}
                    </p>
                    <p className="mt-4 text-xs text-slate-400">{a.date}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="mx-auto max-w-md text-center py-16">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-slate-900">Articles coming soon</h2>
                <p className="mt-2 text-sm text-slate-600">
                  We&apos;re publishing our first set of articles on AI catalog operations. Check back shortly or explore our case studies in the meantime.
                </p>
                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/resources/case-studies"
                    className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2563eb] px-5 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]"
                  >
                    Read case studies
                  </Link>
                  <Link
                    href="/resources"
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Browse the blog
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </section>

      <PageBottomCta
        title="Want to see AI agents in action?"
        description="Try the live demo or book a pilot — your first agent can be live in weeks."
        primary={{ href: "/try-it", label: "Try it live" }}
        secondary={{ href: "/about#contact", label: "Book a pilot" }}
      />
    </main>
  );
}
