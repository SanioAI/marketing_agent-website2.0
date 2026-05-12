import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/Container";
import { PageBottomCta } from "@/components/ui/PageBottomCta";
import { RelatedPlatform } from "@/components/ui/RelatedPlatform";
import Link from "next/link";
import type { Components } from "react-markdown";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

function stripMd(text: string) {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
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
  return { title: data.title, description: stripMd(data.description || "") };
}

const mdComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-3 text-2xl font-semibold tracking-tight text-slate-900 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-lg font-semibold text-slate-900">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-4 mb-1 text-base font-semibold text-slate-800">{children}</h4>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-slate-700">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-slate-700">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="flex gap-3 leading-relaxed text-slate-600 marker:text-blue-400">
      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" aria-hidden />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-slate-900">{children}</strong>
  ),
  em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
  a: ({ href, children }) => (
    <a
      href={href}
      className="rounded bg-blue-50 px-1 py-0.5 text-blue-700 transition-colors hover:bg-blue-100"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-xl border-l-4 border-blue-400 bg-blue-50/60 px-5 py-4 text-slate-700">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-slate-50">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-slate-200 px-4 py-2.5 text-left font-semibold text-slate-900">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-slate-100 px-4 py-2.5 text-slate-600 last:border-b-0">
      {children}
    </td>
  ),
  code: ({ children }) => (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800">
      {children}
    </code>
  ),
  hr: () => <hr className="my-8 border-slate-200" />,
};

// Override li for ordered lists (no dot)
const olLiComponents: Components = {
  ...mdComponents,
  li: ({ children }) => (
    <li className="leading-relaxed text-slate-600">{children}</li>
  ),
};

type RelatedArticle = { title: string; slug: string; href: string };
type Hub = { label: string; href: string };

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) notFound();

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  const hub = data.hub as Hub | undefined;
  const relatedArticles = (data.relatedArticles as RelatedArticle[]) || [];

  // Split intro (before first ##) from body
  const introMatch = content.match(/^([\s\S]*?)(?=\n## |\n##)/);
  const intro = introMatch ? introMatch[1].trim() : "";
  const body = intro ? content.slice(intro.length).trim() : content.trim();

  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="gradient-surface border-b border-slate-200/60 py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            {/* Breadcrumb */}
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <Link href="/resources/articles" className="transition-colors hover:text-blue-600">
                Articles
              </Link>
              <span>›</span>
              {hub && (
                <>
                  <Link href={hub.href} className="transition-colors hover:text-blue-600">
                    {hub.label}
                  </Link>
                  <span>›</span>
                </>
              )}
              <span className="max-w-[200px] truncate text-slate-400">{data.title}</span>
            </div>
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
              <div className="mt-4 text-lg leading-relaxed text-slate-600">
                <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                  {intro}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="flex gap-12">
              {/* Article body */}
              <div className="min-w-0 flex-1">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={mdComponents}
                >
                  {body}
                </ReactMarkdown>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                  <div className="mt-12 border-t border-slate-200/60 pt-10">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                      Related Articles
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {relatedArticles.map((a) => (
                        <Link
                          key={a.href}
                          href={a.href}
                          className="group rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-blue-200 hover:bg-blue-50/40"
                        >
                          <p className="text-sm font-medium leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                            {a.title}
                          </p>
                          <p className="mt-1 text-xs text-blue-600">Read →</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="hidden w-56 shrink-0 lg:block">
                <div className="sticky top-24 space-y-4">
                  <RelatedPlatform />
                  {hub && (
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                        Pillar
                      </p>
                      <Link
                        href={hub.href}
                        className="group flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 transition hover:bg-white hover:text-blue-700"
                      >
                        <span>↑</span> {hub.label}
                      </Link>
                    </div>
                  )}
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
        description={
          stripMd(data.description || "").slice(0, 160) ||
          "See how catalog agents improve your product data quality continuously."
        }
        primary={{ href: "/about#contact", label: "Book a pilot" }}
        secondary={{
          href: "/resources/articles/catalog-agents-demo-before-after-sku",
          label: "View demo",
        }}
      />
    </main>
  );
}
