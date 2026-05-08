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

  const prompt = `You are writing a marketing article for Paladio.ai — a B2B SaaS company that builds AI catalog agents for ecommerce and distribution companies.

Write a complete, publication-ready article based on this brief. The article should be authoritative, specific, and grounded in real outcomes — no fluff, no generic AI hype.

## Brief
**Title:** ${title}
**Target Keyword:** ${keyword}
**Paladio POV:** ${pov}
**Reader Problem:** ${readerProblem}
**Core Argument:** ${coreArg}
**Outline:**
${outline}
**Proof Points (use these verbatim where relevant):**
${proofPoints}

## Writing rules
- Open with a strong statement about the problem, not a definition
- Use H2 headings that match the outline sections (no numbering like "01 —", just clean H2s)
- Each section should be 2-4 paragraphs of substantive prose
- Weave in the proof points naturally (Voomi Supply, Profitero, JCPenney) — use the exact metrics: ~85% publish-time reduction, >95% precision/recall, 140→20 labeling hours, 1M+ SKUs, 200M+ ASINs, 1500+ marketplaces, 80+ languages
- End with a short "What this means for your catalog" or similar practical section
- Do NOT include a CTA paragraph — that's handled by the page template
- Do NOT use bold on every sentence — bold only for key terms or metrics
- Tone: direct, technical, credible. Write for a VP of Ecommerce or Head of Product Data
- Length: 800-1200 words of body prose
- Output ONLY the article body in markdown (H2s and paragraphs) — no frontmatter, no title H1`;

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
