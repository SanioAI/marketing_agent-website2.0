import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { RelatedPlatform } from "@/components/ui/RelatedPlatform";
import Link from "next/link";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function stripMd(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
}

function boldToHtml(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
}

export async function generateStaticParams() {
  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return {};
  const { data } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    title: data.title,
    description: data.description,
  };
}

function parseBody(content: string) {
  const sections: { heading: string; body: string }[] = [];
  const lines = content.split("\n");
  let current: { heading: string; body: string } | null = null;
  let intro = "";

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { heading: line.replace("## ", ""), body: "" };
    } else if (!current) {
      intro += line + "\n";
    } else {
      current.body += line + "\n";
    }
  }
  if (current) sections.push(current);
  return { intro: intro.trim(), sections };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) notFound();

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const { intro, sections } = parseBody(content);

  return (
    <main className="pt-16">
      <section className="gradient-surface border-b border-slate-200/60 py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-200/70 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                {data.pillar || "Catalog Agents"}
              </span>
              <span className="text-xs text-slate-400">
                {data.tag} · {data.readTime}
              </span>
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {data.title}
            </h1>
            {intro && (
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</p>
            )}
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="flex gap-12">
              <div className="min-w-0 flex-1 space-y-12 text-slate-700">
                {sections.map((s, i) => (
                  <div key={i}>
                    <h2 className="mb-3 text-2xl font-semibold text-slate-900">{s.heading}</h2>
                    <div className="space-y-3">
                      {s.body
                        .split("\n")
                        .filter((l) => l.trim())
                        .map((line, j) => {
                          if (line.startsWith("- ") || line.startsWith("* ")) {
                            return (
                              <div key={j} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden />
                                <p className="leading-relaxed text-slate-600"
                                  dangerouslySetInnerHTML={{ __html: boldToHtml(line.replace(/^[-*]\s*/, "")) }}
                                />
                              </div>
                            );
                          }
                          if (line.startsWith("_") && line.endsWith("_")) {
                            return (
                              <p key={j} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm italic text-slate-500">
                                {line.replace(/^_|_$/g, "")}
                              </p>
                            );
                          }
                          return (
                            <p key={j} className="leading-relaxed"
                              dangerouslySetInnerHTML={{ __html: boldToHtml(line) }}
                            />
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>

              <aside className="hidden w-56 shrink-0 lg:block">
                <div className="sticky top-24 space-y-4">
                  <RelatedPlatform />
                  <div className="rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-600">
                      Try it
                    </p>
                    <Link
                      href="/about#contact"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#2563eb] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1d4ed8]"
                    >
                      Book a pilot
                    </Link>
                    <Link
                      href="/resources/articles/catalog-agents-demo-before-after-sku"
                      className="mt-2 inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      View demo →
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      <PageBottomCta
        title={data.title}
        description={stripMd(data.description || "").slice(0, 160) || "See how catalog agents improve your product data quality continuously."}
        primary={{ href: "/about#contact", label: "Book a pilot" }}
        secondary={{ href: "/resources/articles/catalog-agents-demo-before-after-sku", label: "View demo" }}
      />
    </main>
  );
}
