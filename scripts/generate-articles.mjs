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

Your audience is a VP of Ecommerce or Head of Product Data who is skeptical of AI hype and needs specific, operational proof. Write like fabric.inc, Publitas, and atronous.ai — not like a generic AI content farm.

---

## STYLE RULES (follow every one)

1. **Counter-intuitive opener.** Never open with what the product does or a definition. Open with what the reader assumes is wrong, then name the real problem.
   - ✅ "Most catalogs don't fail because the products are bad. They fail because the product data is wrong."
   - ❌ "Catalog agents are AI-powered tools that automate product data processing."

2. **Name the real problem vs the obvious one.** The reader's assumed cause is often wrong. Name it, correct it.
   - ✅ "Teams assume it is a tooling problem. It is a volume problem."
   - ❌ "Product data quality is a challenge for many organizations."

3. **Consequence-first sentences.** State what happens, not what it is.
   - ✅ "That costs you the sale." / "The backlog never forms." / "The suppression never happens."
   - ❌ "This can lead to decreased performance over time."

4. **Three named failure modes** with bold headers — what teams do → why it fails → one-sentence fix.
   - ✅ **Treating catalog problems as a one-time project.** Teams run a cleanup. The data looks right for 3 months. New suppliers send files. Drift starts again.

5. **"Removes friction" framing.** Pitch what disappears, not a feature list.
   - ✅ "The error is caught before the listing goes live."
   - ❌ "Our agents detect errors and flag them for review."

6. **"Compounds over time" close.** Close with the compound effect where true.
   - ✅ "Every run the catalog gets more accurate. That is the compound effect of a system that improves each cycle."

7. **Conversational you/your throughout** — never "companies" or "businesses" or "organizations."

8. **Use/your proof only from these cases:**
   - **Voomi Supply:** 1M+ SKUs, 200M+ ASINs, ~85% publish-time reduction, automated multipack detection + hazmat + ASIN matching, replaced rule-based + VA workflows
   - **Profitero:** 1500+ marketplaces, 80+ languages, 140 → ~20 labeling hours per cycle, >95% precision/recall, weak supervision pipelines
   - **JCPenney:** Mirakl + SFCC integration, taxonomy alignment across brands, marketplace onboarding complexity
   - Do NOT invent statistics. Do NOT cite third-party surveys as Paladio proof.

9. **Plain-English H2 headings** that make a statement or ask a question — not label nouns.
   - ✅ "Why your catalog drifts after every supplier update"
   - ❌ "Taxonomy Management Overview"

10. **Short sentences. Active voice. No hedging.** Cut "can," "may," "could lead to." Make direct claims.

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
    .filter((f) => f.endsWith(".md") && !SKIP.has(f));

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
