import type { BlogPost } from "@/lib/blog-types";
import { aecPostBlocks } from "@/lib/blog-content/aec-post";

const posts: BlogPost[] = [
  {
    slug: "aec-documents-to-decisions",
    kicker: "AEC",
    title: "From documents to decisions: the case for domain AEC agents",
    description:
      "Why the next useful AI in AEC is not a generic chat box—and what Paladio is building for structured, reviewable document intelligence.",
    date: "2026-04-21",
    tag: "AEC",
    readMin: 6,
    blocks: aecPostBlocks,
  },
];

const bySlug = new Map(posts.map((p) => [p.slug, p]));

export function getAllPosts(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return bySlug.get(slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

/** Cards for the Resources page: mix published slugs and draft rows. */
export type BlogCard = {
  slug: string | null;
  t: string;
  p: string;
  tag: string;
  read: string;
};

export const blogCards: BlogCard[] = [
  {
    slug: "aec-documents-to-decisions",
    t: "From documents to decisions: the case for domain AEC agents",
    p: "Why structured, reviewable document intelligence matters in AEC—and what we are building at Paladio.",
    tag: "AEC",
    read: "6 min",
  },
  {
    slug: null,
    t: "Your catalog is not ready for agentic commerce",
    p: "Why relationships beat flat fields when discovery becomes conversational.",
    tag: "Strategy",
    read: "6 min",
  },
  {
    slug: null,
    t: "From attributes to product graphs",
    p: "How structured relationships improve conversion, trust, and substitution quality.",
    tag: "Architecture",
    read: "8 min",
  },
];
