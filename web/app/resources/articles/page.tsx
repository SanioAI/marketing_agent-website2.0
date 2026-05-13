import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PageHero } from "@/components/ui/PageHero";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Articles · Paladio Resources",
  description: "In-depth reads on catalog readiness and catalog agents for AI-mediated commerce.",
};

type Article = {
  title: string;
  description: string;
  tag: string;
  href: string;
  readTime: string;
  pillar: string;
};

function getMarkdownArticles(): Article[] {
  const dir = path.join(process.cwd(), "content/articles");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        title: data.title as string,
        description: ((data.description as string) || "").slice(0, 180),
        tag: (data.tag as string) || "Deep Dive",
        href: `/resources/articles/${f.replace(/\.md$/, "")}`,
        readTime: (data.readTime as string) || "8 min read",
        pillar: (data.pillar as string) || "General",
      };
    });
}

const PILLAR_ORDER = ["Catalog Readiness", "Catalog Agents"];

const PILLAR_META: Record<string, { label: string; desc: string; cta: string; ctaHref: string }> = {
  "Catalog Readiness": {
    label: "Catalog Readiness",
    desc: "Is your catalog ready for marketplaces, search, and AI shopping agents?",
    cta: "Run a readiness assessment",
    ctaHref: "/catalog-readiness",
  },
  "Catalog Agents": {
    label: "Catalog Agents",
    desc: "AI agents that enrich, classify, and validate your catalog continuously — at any scale.",
    cta: "Explore Catalog Agents",
    ctaHref: "/catalog-agents",
  },
};

export default function ArticlesPage() {
  const all = getMarkdownArticles();

  const byPillar: Record<string, Article[]> = {};
  for (const a of all) {
    if (!byPillar[a.pillar]) byPillar[a.pillar] = [];
    byPillar[a.pillar].push(a);
  }

  const pillars = PILLAR_ORDER.filter((p) => byPillar[p]);

  return (
    <main className="pt-16">
      <PageHero
        kicker="Articles"
        title="Catalog readiness and catalog agents"
        description="What it takes for your catalog to survive AI-mediated discovery — and the agents that get it there."
      />

      {pillars.map((pillar) => {
        const meta = PILLAR_META[pillar];
        const articles = byPillar[pillar];
        return (
          <section key={pillar} className="gradient-surface border-t border-slate-200/60 py-16 sm:py-20">
            <Container>
              <Reveal>
                <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="section-kicker mb-2">
                      <span className="dot" aria-hidden />
                      {meta.label}
                    </p>
                    <p className="text-slate-600 max-w-lg">{meta.desc}</p>
                  </div>
                  <Link
                    href={meta.ctaHref}
                    className="shrink-0 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    {meta.cta} →
                  </Link>
                </div>
              </Reveal>
              <div className="grid gap-6 lg:grid-cols-2">
                {articles.map((a) => (
                  <Reveal key={a.href}>
                    <Link
                      href={a.href}
                      className="card group flex h-full flex-col p-6 transition hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center rounded-full border border-blue-200/70 bg-blue-50 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-blue-700">
                          {a.tag}
                        </span>
                        <span className="text-[10px] text-slate-400">{a.readTime}</span>
                      </div>
                      <h2 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-blue-700 transition-colors">
                        {a.title}
                      </h2>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                        {a.description}
                      </p>
                      <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blue-600 group-hover:gap-2 transition-all">
                        Read article <span aria-hidden>→</span>
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

      <PageBottomCta
        title="Ready to score your catalog?"
        description="Run a readiness assessment across all five dimensions — find gaps before your channels do."
        primary={{ href: "/catalog-readiness", label: "Run an assessment" }}
        secondary={{ href: "/catalog-agents", label: "Explore Catalog Agents" }}
      />
    </main>
  );
}
