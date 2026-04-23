import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import { ArticleLayout } from "@/components/blog/ArticleLayout";
import { BlogBlocks } from "@/components/blog/BlogBlocks";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPostBySlug(slug);
  if (!p) return { title: "Post" };
  return {
    title: `${p.title} · Paladio.ai`,
    description: p.description,
  };
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const p = getPostBySlug(slug);
  if (!p) notFound();

  return (
    <ArticleLayout
      kicker={p.kicker}
      title={p.title}
      dateIso={p.date}
      dateDisplay={formatDate(p.date)}
      tag={p.tag}
      readMin={p.readMin}
    >
      <BlogBlocks blocks={p.blocks} />
    </ArticleLayout>
  );
}
