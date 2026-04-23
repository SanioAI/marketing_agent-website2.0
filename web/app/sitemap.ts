import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-config";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl().origin;
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${base}/resources/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...blogPages];
}
