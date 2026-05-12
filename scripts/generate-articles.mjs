import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const BRIEFS_DIR = "/Users/BinduPriyanka/Downloads/paladio-seo-authority-main/content/articles";
const OUT_DIR = path.join(__dirname, "../web/content/articles");

const SKIP = new Set([
  "catalog-agents-demo-before-after-sku.md",
  "catalog-agents-vs-enrichment-tools.md",
  "catalog-agents-vs-rule-based-data-quality-platforms.md",
]);

const ONLY = new Set([
  "agentic-commerce-readiness-checklist.md",
  "catalog-readiness-assessment.md",
  "efficient-language-model-ecommerce.md",
  "how-ai-agents-decide-which-products-to-recommend.md",
  "optional-attributes-revenue-critical-agentic-commerce.md",
  "preparing-ecommerce-catalogs-ai-shopping-agents.md",
  "product-attributes-as-ranking-signals.md",
  "product-intelligence-vs-product-information-management.md",
  "structured-product-data-for-ecommerce-ai.md",
  "what-is-catalog-readiness.md",
  "what-is-product-intelligence.md",
  "why-ai-agents-need-structured-product-intelligence.md",
]);

function extract(content, heading) {
  const re = new RegExp(`## ${heading}\\n([\\s\\S]*?)(?=\\n## |$)`);
  const m = content.match(re);
  return m ? m[1].trim() : "";
}

function funnelToTag(stage) {
  if (!stage) return "Deep Dive";
  if (stage.toLowerCase().includes("awareness")) return "Awareness";
  if (stage.toLowerCase().includes("consider")) return "Consideration";
  if (stage.toLowerCase().includes("decision")) return "Decision";
  return stage.split("—")[0].trim();
}

async function generateArticle(briefFile) {
  const raw = fs.readFileSync(path.join(BRIEFS_DIR, briefFile), "utf8");

  const title = extract(raw, "Title");
  const metaDesc = extract(raw, "Meta Description");
  const pov = extract(raw, "Paladio POV");
  const readerProblem = extract(raw, "Reader Problem");
  const outline = extract(raw, "Outline");
  const proofPoints = extract(raw, "Examples / Proof Points");
  const coreArg = extract(raw, "Core Argument");
  const funnel = extract(raw, "Funnel Stage");
  const pillar = extract(raw, "Pillar");
  const keyword = extract(raw, "Target Keyword");
  const tag = funnelToTag(funnel);

  const prompt = `You are writing a B2B marketing article for Paladio.ai — a company that builds AI catalog agents for ecommerce and distribution teams.

Your audience is a VP of Ecommerce or Head of Product Data who is skeptical of AI hype. They've read hundreds of vendor articles. They will stop reading the moment they detect generic advice. Write like a sharp colleague who has fixed broken catalogs at scale — not like a content marketer.

---

## HARD RULES — violating any of these is a failure

### Structure
- Use ONLY ## H2 headings. Never use ### H3. Never use #### H4.
- 900–1200 words total.
- No title (H1). No frontmatter. No CTA paragraph at the end.
- 2–4 paragraphs per section. Each paragraph is 2–4 sentences max.

### Voice — BAD patterns to avoid (these will get you fired)
❌ "You might think X, but in reality Y" — too soft, rewrite as a direct statement
❌ "Consider the strategy used by..." — sounds like a consultant. Say what happened instead.
❌ "In today's fast-moving ecommerce landscape..." — delete on sight
❌ "By doing so, you can..." — passive advisor voice. Cut it.
❌ "This isn't just a tech problem; it's a..." — avoid the contrast-formula opener
❌ Any sentence that starts with "By", "When", "While", "In order to", "To ensure"
❌ Phrases: "align", "leverage", "holistic", "seamless", "streamline", "journey", "best practices"

### Voice — GOOD patterns to use
✅ Lead with what broke. "Voomi published 1M+ SKUs to Amazon. The first 200K came back rejected."
✅ Name the failure directly. "The attribute agent didn't run. The hazmat flag didn't fire."
✅ Consequence first. "That costs you the sale." "The listing gets suppressed." "The agent skips your SKU."
✅ Short declarative sentences. One idea. Full stop.
✅ "you" and "your" — never "companies" or "organizations" or "teams" as abstract nouns

### Proof — use only these, with exact numbers
- **Voomi Supply:** 1M+ SKUs, 200M+ ASINs matched, ~85% faster publishing, automated hazmat + multipack + ASIN matching, replaced VA workflows
- **Profitero:** 1,500+ marketplaces, 80+ languages, 140 → ~20 labeling hours per cycle, >95% precision/recall
- **JCPenney:** Mirakl + SFCC integration, taxonomy alignment across brands before marketplace launch
- Never invent statistics. Never cite third-party surveys as Paladio proof.

### Headings
✅ Make a claim or ask a question: "Why your catalog fails the compliance filter"
❌ Label a noun: "Taxonomy Management", "Compliance Overview", "Key Considerations"

---

## ARTICLE BRIEF

**Title:** ${title}
**Target Keyword:** ${keyword}
**Paladio POV:** ${pov}
**Reader Problem:** ${readerProblem}
**Core Argument:** ${coreArg}

**Outline (use as section structure):**
${outline}

**Proof points to use (weave in naturally, use exact numbers):**
${proofPoints}

---

## OUTPUT FORMAT

- Output ONLY the article body in markdown
- H2s for main sections (no numbering, no "01 —" prefixes)
- 2–4 paragraphs per section
- 900–1200 words total
- No title H1, no frontmatter, no CTA paragraph at the end (template handles it)
- Bold only key terms or metrics — not every other sentence`;

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const body = response.choices[0].message.content;

  const readTime = `${Math.max(6, Math.min(14, Math.ceil(body.split(/\s+/).length / 200)))} min read`;

  const markdown = `---
title: "${title.replace(/"/g, "'")}"
description: "${(metaDesc || pov).replace(/"/g, "'").replace(/\n/g, " ").slice(0, 300)}"
tag: "${tag}"
readTime: "${readTime}"
pillar: "${pillar}"
keyword: "${keyword}"
---

${body}`;

  fs.writeFileSync(path.join(OUT_DIR, briefFile), markdown);
  return title;
}

async function main() {
  const files = fs
    .readdirSync(BRIEFS_DIR)
    .filter((f) => f.endsWith(".md") && !SKIP.has(f) && ONLY.has(f));

  console.log(`Generating ${files.length} articles...\n`);

  let done = 0;
  for (const file of files) {
    try {
      const title = await generateArticle(file);
      done++;
      console.log(`[${done}/${files.length}] ✓ ${title}`);
    } catch (err) {
      console.error(`[${done}/${files.length}] ✗ ${file}: ${err.message}`);
    }
    // Small delay to avoid rate limits
    await new Promise((r) => setTimeout(r, 500));
  }

  console.log(`\nDone. ${done}/${files.length} articles generated.`);
}

main();
