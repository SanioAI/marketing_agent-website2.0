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
      };
    });
}

export default function ArticlesPage() {
  const articles = getMarkdownArticles();

  return (
    <main className="pt-16">
      <PageHero
        kicker="Articles"
        title="Catalog readiness and catalog agents"
        description="What it takes for your catalog to survive AI-mediated discovery — and the agents that get it there."
      />

      <section className="gradient-surface border-t border-line/60 py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Reveal key={a.href}>
                <Link
                  href={a.href}
                  className="card group flex h-full flex-col p-6 transition hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full border border-line/70 bg-paper-dim px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-ink">
                      {a.tag}
                    </span>
                    <span className="text-[10px] text-slate-400">{a.readTime}</span>
                  </div>
                  <h2 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-ink transition-colors">
                    {a.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {a.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-ink group-hover:gap-2 transition-all">
                    Read article <span aria-hidden>→</span>
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <PageBottomCta
        title="Ready to score your catalog?"
        description="Run a readiness assessment across all five dimensions — find gaps before your channels do."
        primary={{ href: "/catalog-readiness", label: "Run an assessment" }}
        secondary={{ href: "/catalog-agents", label: "Explore Catalog Agents" }}
      />
    </main>
  );
}
