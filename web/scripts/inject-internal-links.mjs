import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BRIEFS_DIR = "/Users/BinduPriyanka/Downloads/paladio-seo-authority-main/content/articles";
const OUT_DIR = path.join(__dirname, "../content/articles");

// Hub file → canonical URL
const HUB_MAP = {
  "catalog-agents-hub.md": { label: "Catalog Agents", href: "/catalog-agents" },
  "catalog-readiness-hub.md": { label: "Catalog Readiness", href: "/catalog-readiness" },
  "product-intelligence-hub.md": { label: "Product Intelligence", href: "/product-intelligence" },
  "product-graph-hub.md": { label: "Product Graph", href: "/product-graph" },
  "marketplace-channel-readiness-hub.md": { label: "Marketplace Readiness", href: "/marketplace-readiness" },
  "compliance-taxability-hub.md": { label: "Compliance & Taxability", href: "/compliance" },
};

// Inline term substitutions for key platform pages
const INLINE_LINKS = [
  { term: /\bcatalog readiness\b/gi, href: "/catalog-readiness", label: "Catalog Readiness" },
  { term: /\bproduct intelligence\b/gi, href: "/product-intelligence", label: "Product Intelligence" },
  { term: /\bcatalog agents?\b/gi, href: "/catalog-agents", label: "Catalog Agents" },
];

function extract(content, heading) {
  const re = new RegExp(`## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`);
  const m = content.match(re);
  return m ? m[1].trim() : "";
}

function parseRelatedArticles(linksSection) {
  // Match [Title](./slug.md) patterns
  const related = [];
  const re = /\[([^\]]+)\]\(\.\/([^)]+\.md)\)/g;
  let m;
  while ((m = re.exec(linksSection)) !== null) {
    const title = m[1];
    const slug = m[2].replace(/\.md$/, "");
    // Skip hub links (they start with ../)
    if (!m[2].startsWith("..")) {
      related.push({ title, slug, href: `/resources/articles/${slug}` });
    }
  }
  return related;
}

function parseHub(linksSection) {
  const hubMatch = linksSection.match(/\*\*Hub:\*\*[^\[]*\[([^\]]+)\]\(\.\.\/hubs\/([^)]+)\)/);
  if (!hubMatch) return null;
  const hubFile = hubMatch[2];
  return HUB_MAP[hubFile] || null;
}

function injectInlineLinks(body) {
  const seen = new Set();
  let result = body;
  for (const { term, href, label } of INLINE_LINKS) {
    // Only link the first occurrence per article
    if (!seen.has(href)) {
      result = result.replace(term, (match) => {
        if (seen.has(href)) return match;
        seen.add(href);
        return `[${match}](${href})`;
      });
    }
  }
  return result;
}

const files = fs.readdirSync(BRIEFS_DIR).filter((f) => f.endsWith(".md"));
let updated = 0;

for (const file of files) {
  const outPath = path.join(OUT_DIR, file);
  if (!fs.existsSync(outPath)) continue;

  const brief = fs.readFileSync(path.join(BRIEFS_DIR, file), "utf8");
  const linksSection = extract(brief, "Internal Links");
  if (!linksSection) continue;

  const hub = parseHub(linksSection);
  const related = parseRelatedArticles(linksSection);

  // Deduplicate related articles
  const seen = new Set();
  const uniqueRelated = related.filter((r) => {
    if (seen.has(r.slug)) return false;
    seen.add(r.slug);
    return true;
  });

  // Read current article file
  const current = fs.readFileSync(outPath, "utf8");
  const { data, content } = matter(current);

  // Update frontmatter
  if (hub) data.hub = hub;
  if (uniqueRelated.length) data.relatedArticles = uniqueRelated.slice(0, 5);

  // Inject inline links into body (only first occurrence of each term)
  const linkedContent = injectInlineLinks(content);

  const updated_file = matter.stringify(linkedContent, data);
  fs.writeFileSync(outPath, updated_file);
  updated++;
}

console.log(`Updated ${updated} articles with internal links.`);
