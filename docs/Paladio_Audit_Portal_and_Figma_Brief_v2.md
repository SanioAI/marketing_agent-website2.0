# Paladio.ai — Live Site Audit, Asset Inventory, Portal Spec & Figma Image Brief (v2 · grounded)
### Reviewed live: `paladio-website.vercel.app` (Home, `/ranker`) + routes crawled. Competitors torn down: fabric.inc, zoovu.com, apollo.io.

---

## 0. What Paladio actually is (now confirmed from the live site)

Paladio is **"Catalog Intelligence for Agentic Commerce."** The thesis on the homepage: *"Your catalog decides what AI agents recommend."* AI shopping surfaces (ChatGPT, Perplexity, Google Shopping AI, Amazon Rufus) pull from structured product data and skip anything they can't confidently parse — so Paladio runs **purpose-built agents that extract, normalise, map, and verify every product record** so the catalog is AI-ready.

**Product architecture observed:**
- **Platform** = Paladio.ai (orchestration, evaluation, human-in-the-loop).
- **Catalog Agents** (LIVE, e-commerce) — six agents: **Attribute · Taxonomy · Brand Normalization · Channel Matching · Compliance · Product Graph.**
- **AEC Agents** (coming soon) — preconstruction/drawings/takeoffs.
- **Ranker** (`/ranker`, early access) — measures how the enriched catalog performs across AI shopping surfaces (six signals: AI Retrieval, Match Confidence, Recommendation Accuracy, Comparison Readiness, Answer Inclusion, Enrichment Impact). This is the "compound loop": enrich → measure → target the next gap.
- **Where we deploy:** E-commerce (live) · AEC (early access) · roadmap (Legal, Finance, HR, Ops, Custom).
- **Proof:** Voomi Supply (HVAC, 1M+ SKUs, ~85% faster publishing); Profitero/Publicis Groupe (>95% precision attribute extraction, 1,000+ brands across 80+ languages, 1,500+ marketplaces, 140→20 category normalisation); 200M+ Amazon ASINs matched; testimonial from Eric Bosco (Profitero/Publicis).

**So "catalog of agents' solutions" is a double meaning to lean into:** Paladio builds *catalog-intelligence agents* **and** is assembling a *portfolio (catalog) of agent solutions across domains* on one platform. The positioning and the portal should make both legible.

**Existing routes:** `/` · `/products` (`#catalog-agents`, `#aec-agents`) · `/catalog-agents` · `/ranker` · `/try-it` · `/resources` (`#case-studies`, `#blog`) · `/about` (`#contact`) · `/privacy` · `/terms` · `/sitemap.xml`.

---

## 1. Competitive mapping — Paladio vs. Fabric, Zoovu, Apollo

You're closer to two of these than you might think. Here's the precise overlap:

| | **Paladio** | **Fabric (fabric.inc)** | **Zoovu** | **Apollo (apollo.io)** |
|---|---|---|---|---|
| Category | Catalog intelligence for agentic commerce | Agentic **commerce** platform (`NEON`) | AI **product discovery** / "Product Brain" | Agentic **GTM/sales** |
| Enrich product data for AI | **Catalog Agents** (6 agents) | **Product Agent / Activate** | Enrichment + MCP server | n/a |
| Measure AI visibility | **Ranker** (6 signals) | **Monitor** (prompt tracking, benchmarking) | Visibility analytics | n/a |
| Serve agents directly | Product Graph + roadmap | ACP/UCP, Shopify for Agents | **MCP Server** for agents | Apollo MCP |
| Relationship to you | — | **Direct competitor** | **Direct competitor** | **Adjacent** (model for site craft) |

**Read:** Fabric is your sharpest mirror — same enrich-and-measure structure (Product Agent + Monitor ≈ Catalog Agents + Ranker). Zoovu is direct on the "serve agents trustworthy product data" angle (their MCP server). Apollo is a *different domain* but the best **craft reference** for an agentic-platform marketing site (self-serve hero, tabbed solution showcase, stat cards, "replace 5 tools" consolidation, security badges, mega-footer).

**Where Paladio already wins on message:** your one-liner ("Your catalog decides what AI agents recommend") is sharper and more urgent than Fabric's "Ready. Set. Glow." And Ranker's "compound loop" (enrich + measure in one place) is a cleaner story than competitors tell. **Where you lose: visual proof.** Fabric and Apollo *show* real dashboards, logo walls, headshots, and video. Paladio currently *tells* — see the audit.

---

## 2. Live-site audit — what's strong, what's missing

### 2.1 Design system observed (this is your real Figma baseline)
- **Type:** `Space Grotesk` (display/headings), `Geist Sans` (body), `Geist Mono` (mono/labels & metrics).
- **Color tokens (from CSS):** `--background #fafbfc` · `--foreground #0c0c0d` · `--muted #64748b` · `--border #e2e8f0` · `--card #fff` · `--accent #111827` · `--accent-mid #1f2a44` · `--blue #2563eb` · `--sky #0ea5e9` · low-opacity glow vars (`--brand-1..4`).
- **Look:** light surfaces alternating with near-black sections; blue→sky gradient "glow" accent; rounded cards; mono labels for a "production infrastructure" feel. Genuinely clean and competent.

### 2.2 What's working — keep
1. **Sharp, differentiated positioning** and a strong problem narrative (problem → how it works → products → trust → deploy → demo → FAQ).
2. **Credible proof metrics** (1M+, 200M+, >95%, 140→20) and a named enterprise testimonial.
3. **Coherent type/color system** with an ownable glow motif.
4. **A second act (Ranker)** that creates a moat story most competitors lack.
5. **Honest, technical tone** ("This is production infrastructure, not experimental AI").

### 2.3 What's missing or weak — the gap list (priority order)

| # | Finding | Evidence on the live site | Impact | Fix |
|---|---|---|---|---|
| 1 | **Icons are emoji** | Problem cards (⚠ 🔀 🚫) and all six agent cards (⚡ 🏷 🔤 🔗 🛡 📊) plus the flow (📦→⚡→🚀) render as OS emoji — inconsistent color/weight, off-brand, some barely visible | Looks unfinished next to Fabric/Apollo; undermines the "production infrastructure" claim | **Custom SVG icon set** (mono line, single accent) — see Brief §5.2-A |
| 2 | **No real product screenshots** | Hero "deployment" panel and the "See it in action" before/after demo are **CSS mockups**, not the actual product UI | You *tell* ("94.2% pass rate") but never *show* the real tool/exports a buyer will use; weakest point vs. Fabric's real dashboards | Capture/produce **real product screenshots** of the agent console, before/after exports, and Ranker dashboard |
| 3 | **No customer logo wall / real logos** | Voomi, Profitero, Publicis named in text only; testimonial uses an "EB" initials avatar | Lower trust; enterprise buyers scan for logos | Logo wall (SVG) + real headshot in testimonial |
| 4 | **The "catalog of agent solutions" isn't a catalog** | Six agents shown as a static grid; no filtering, no per-agent pages | Misses your own positioning; can't scale as domains grow | Build a **browsable agent catalog** + **per-agent detail pages** (see §3–4) |
| 5 | **Effectively zero image assets** | Whole site = **1 raster image (the logo, 192×78)** + ~19 inline SVGs + emoji + CSS | Nothing to "extract"; brand feels thin; no OG/social images | Create the asset library in §5 |
| 6 | **Trust layer underbuilt** | No SOC 2 / GDPR / ISO badges; security/data-handling not visualized | Critical for PIM/ERP enterprise buyers | Add compliance badge row + data-flow diagram |
| 7 | **Demo-led only** | Primary CTAs are "Book a pilot/demo"; `/try-it` exists but self-serve isn't surfaced | Apollo converts with a self-serve hero; you leave top-of-funnel on the table | Surface "Assess readiness" / Ranker as a self-serve entry |
| 8 | **Resources thin** | `/resources#case-studies`, `#blog` are anchors | Weak SEO/GEO for a company whose whole pitch is AI discoverability | Real case studies (Voomi, Profitero) + blog + structured data |
| 9 | **No social/OG images** | No `og:image` assets found | Bare link previews | 1200×630 OG per key page |

> **Bottom line:** the *strategy and copy are ahead of the visuals.* The single highest-leverage upgrade is replacing emoji with a real icon system and adding real product screenshots — that alone closes most of the gap with Fabric.

---

## 3. The complete portal — information architecture

The current site is a strong **Layer 1 (marketing)**. To deliver the "catalog of agent solutions" positioning, add **Layer 2 (catalog)** and plan **Layer 3 (console)**.

```
Paladio Portal
├── LAYER 1 — Marketing (mostly built — polish per audit)
│   ├── Home
│   ├── Platform ▾            (How it works · Trust & Safety · Integrations · Ranker)
│   ├── Solutions ▾           (by domain: E-commerce · AEC · Legal/Finance/HR/Ops [roadmap])
│   ├── Products              (/products → Catalog Agents, AEC Agents)
│   ├── Ranker                (/ranker)
│   ├── Pricing               ★ NEW — "no lock-in, pay on performance" is a story; give it a page
│   ├── Resources             (Case studies · Blog · Guides) ★ build out
│   ├── About / Contact
│   └── Try It / Book a pilot
│
├── LAYER 2 — Agent Catalog ★ NEW · your differentiator
│   ├── Catalog landing       (browse all agents)
│   ├── Filters/facets        (domain · operation · channel · data source · status: live/early/roadmap)
│   ├── Agent detail page      (one per agent — the atomic unit, see §4.2)
│   └── Compare / "build your stack"
│
└── LAYER 3 — Console (plan, phase 2)
    ├── Auth / SSO
    ├── Run dashboard (live pass-rate, throughput — you already mock this)
    ├── Before/after review & sign-off (HITL)
    ├── Ranker scores
    └── Exports (XLSX/CSV/JSON) · billing
```

**Nav recommendation:** `Platform ▾ · Solutions ▾ · Agents (Catalog) · Ranker · Pricing · Resources ▾` → right: `Try It` + `Book a Demo`. Promote **Agents (the catalog)** into the top nav — it's the positioning.

---

## 4. Page-by-page requirements (content · components · images)

### 4.1 Home (refactor existing)
Keep the structure; upgrade the visuals.
| Section (exists) | Upgrade | Images needed |
|---|---|---|
| Hero | Replace CSS deployment-mock with a **real product screenshot** behind the glow; keep dual CTA | `hero-product-shot` |
| Deployments-prove stats | Add a **logo wall** (Voomi, Profitero, Publicis) | `customer-logo` set |
| The Real Problem (3 cards) | Replace emoji with icons | `icon-problem` ×3 |
| How it works (flow + 6 agents) | Replace emoji with icon set; link each card → agent detail page | `icon-agent` ×6, `flow-step` ×3 |
| Products (Catalog/AEC) | Add a small real UI thumbnail per product | `product-thumb` ×2 |
| Trust/Verification | Add compliance badges + a data-flow diagram | `security-badge` set, `data-flow-diagram` |
| Where we deploy | Replace emoji domain chips with icons | `icon-domain` ×6 |
| See it in action (before/after) | Replace CSS mock with a **real before/after export screenshot** or short loop | `demo-beforeafter`, `demo-video` poster |
| Testimonial | Real headshot + company logo | `headshot`, `customer-logo` |
| FAQ / Contact | fine as-is | — |

### 4.2 Agent Detail Page ★ the most important new template
Each of the six agents (and future ones) becomes a catalog item with its own page:
- **Header:** agent name, domain chip, status (Live/Early/Roadmap), one-line value prop, CTA ("Book a pilot" / "Add to stack").
- **Hero media:** real screenshot of that agent's output/console.
- **What it does / inputs → outputs** (e.g., Attribute Agent: raw feed → 10–15+ structured attributes).
- **Before/after example** (real export).
- **Channels/integrations** it touches (Amazon, Google, Walmart, Mirakl…).
- **Trust block:** evaluated against source · confidence score · explainable export.
- **Proof:** the relevant metric (e.g., Brand Normalization → "1,000+ brands, 80+ languages, Profitero").
- **Related agents** + CTA.
- **Images:** `agent-hero-shot`, `agent-beforeafter`, `icon-agent`, `channel-logo` set, `icon-capability` set.

### 4.3 Ranker page (exists — polish)
Add a **real Ranker dashboard screenshot** (score cards, before/after lift, surface coverage). Replace the "★ coming soon" surface list with **branded surface logos** (ChatGPT, Perplexity, Gemini, Google AI, Amazon Rufus, Bing Copilot). Images: `ranker-dashboard-shot`, `surface-logo` set, `icon-signal` ×6.

### 4.4 Pricing (new)
Lead with "**No lock-in. If the agent doesn't perform, you don't pay**" (already on the site — make it a page). Plan tiers or pilot→scale model + FAQ. Images: `icon-plan` ×3.

### 4.5 Resources / Case studies (build out)
Voomi and Profitero deserve full case studies (the metrics are excellent). Images: `case-study-hero` ×2, `blog-card-featured`, author `headshot`.

### 4.6 Solutions by domain (E-commerce / AEC / roadmap)
Per-domain landing: problem → relevant agents (filtered catalog) → proof → CTA. Images: `solution-hero`, filtered `agent` thumbnails, `icon-domain`.

---

## 5. The Figma image brief — what to create (there is nothing to "extract")

**Extraction result:** the only real raster asset on the site is the **logo (192×78)**. Everything else is emoji, inline SVG, and CSS-drawn mock UI. So this section is a **build list**, organized so your designer can produce a coherent library and hand it back into the site.

### 5.1 Global art direction (match the live tokens)
- **Use the existing tokens** (don't reinvent): Space Grotesk + Geist Mono; `#fafbfc` light surfaces, `#0c0c0d`/`#111827` dark sections, `#2563eb`→`#0ea5e9` glow.
- **Target mix:** 60% real product UI · 25% custom icons/diagrams · 15% logos/people. Today it's ~0% product UI — that's the gap to close.
- **One ownable device:** keep the **blue glow + dark "terminal" frame**, but put *real* UI inside it. Build a reusable "Paladio UI" component kit in Figma so every screenshot looks like one product.
- **Export:** PNG/WebP @1x **and** @2x for raster; **SVG** for every icon/logo/badge; provide light + dark variants for anything on dark sections.

### 5.2 Asset manifest

**A. Custom icon system (SVG) — replaces all emoji (highest priority)**
| Set | Members | Spec |
|---|---|---|
| `icon-agent` ×6 | Attribute · Taxonomy · Brand Normalization · Channel Matching · Compliance · Product Graph | 24/32/48px grid, mono line + single accent, consistent 1.5–2px stroke |
| `icon-problem` ×3 | Incomplete attributes · Wrong taxonomy · Undetected compliance | same family |
| `icon-signal` ×6 | Ranker's six scores | same family |
| `icon-domain` ×6 | E-commerce · AEC · Legal · Finance · HR · Ops/Custom | same family |
| `icon-capability` / `icon-trust` | evaluate · correct · confidence score · explainable; inputs/outputs | same family |
| `flow-step` ×3 | Raw catalog → Catalog Agents → AI-ready catalog | same family, larger |

**B. Real product UI (raster, retina) — the trust-builders**
| Asset | Where | Content | Size |
|---|---|---|---|
| `hero-product-shot` | Home hero (inside glow frame) | Real agent console / live run | ~1408×1016 @2x |
| `demo-beforeafter` | "See it in action" | Real before/after export (e.g., "ABS Sensor 32% → ABS Wheel Speed Sensor 94%") | ~1024×700 @2x |
| `demo-video` (+poster) | Home/agent pages | 20–40s loop of an agent processing records | poster @1920w |
| `agent-hero-shot` ×6 | Agent detail pages | Each agent's real output | ~1200×800 @2x |
| `agent-beforeafter` ×6 | Agent detail pages | Per-agent before/after | ~1024×700 @2x |
| `ranker-dashboard-shot` | `/ranker` | Score cards + lift + surface coverage | ~1408×900 @2x |
| `product-thumb` ×2 | Home products / `/products` | Catalog Agents & AEC thumbnails | ~640×420 @2x |
| `console-export-shot` | Trust section | XLSX/CSV export with audit trail | ~1024×700 @2x |

**C. Logos & proof (SVG)**
| Asset | Use | Spec |
|---|---|---|
| `customer-logo` set | Logo wall, testimonials, case studies | Voomi Supply, Profitero, Publicis Groupe — monochrome SVG, equal optical weight |
| `channel-logo` set | Agent pages, how-it-works | Amazon, Google, Walmart, Mirakl, Shopify (SVG) |
| `surface-logo` set | Ranker | ChatGPT, Perplexity, Gemini, Google AI Overview, Google Shopping, Amazon Rufus, Bing Copilot (SVG) |
| `security-badge` set | Trust page/footer | SOC 2, GDPR, ISO 27001 (when applicable) — SVG |
| `data-source-icon` set | "Data sources we ingest" | Vendor feeds, PDFs, spreadsheets, images, unstructured text |

**D. People & brand**
| Asset | Use | Spec |
|---|---|---|
| `headshot` set | Testimonials, case studies, About | Square 320×320 @2x, consistent grade |
| `og-image` set | SEO/social per key page | 1200×630, on-brand template |
| `data-flow-diagram` | Trust / How it works | PIM/ERP → Agents → PIM/Channels, with HITL loop |
| `cta-bg` | Closing bands | Document the glow as both an exported image and the CSS gradient |
| `empty-state` / `404` | App/error states | One spot-illustration family |

### 5.3 Image → positioning mapping (what each must say)
- **Real product screenshots → "production infrastructure, not experimental AI."** This is your tagline; right now nothing visually backs it. Highest-impact assets.
- **Before/after exports → "explainable, human-reviewable."** Shows the HITL sign-off story competitors don't.
- **Logo wall + headshots → "trusted by real enterprises."** Converts the Voomi/Profitero text into proof.
- **Custom icon set → "one coherent, serious product."** Kills the emoji-driven "unfinished" read.
- **Ranker dashboard + surface logos → "we measure the outcome, not just the data."** Your moat.
- **Agent catalog thumbnails → "a catalog of agent solutions."** Makes the positioning literal.

---

## 6. Build approach for the complete portal
- **Keep** Next.js on Vercel; keep the design tokens above.
- **Add a catalog data layer.** Each agent = a record:
  `id, slug, name, domain, status(live|early|roadmap), value_prop, inputs[], outputs[], channels[], proof_metric, beforeafter_example, media{hero,beforeafter}, related[]`.
- **CMS / content collection** (Sanity/Contentful or typed MDX) so new agents/domains auto-generate a catalog card + detail page + appear in filters.
- **Componentize** the **agent card** and **agent detail template** first — everything reuses them.
- **SEO/GEO** (on-brand for you): static-generate pages, ship `og-image`s, add `Product`/`SoftwareApplication` structured data so AI surfaces can parse Paladio's *own* catalog — practice what you preach, and it strengthens the Ranker narrative.
- **Phasing:** P1 = polish marketing (icons + screenshots + logos + trust) → P2 = agent catalog + detail pages → P3 = console/auth.

---

## 7. Do-this-week shortlist (highest ROI)
1. **Commission the custom icon set** (agents, problems, signals, domains) — retire emoji.
2. **Produce 4 real screenshots:** hero console, before/after export, Ranker dashboard, an XLSX export with audit trail.
3. **Add a logo wall + a real headshot** (Voomi, Profitero, Publicis).
4. **Add compliance badges** + a simple data-flow diagram.
5. **Stand up agent detail pages** (six) from the existing copy — turns the grid into a real catalog.
6. **Ship OG images** for Home, Ranker, Catalog Agents.

---
*Grounded in a live crawl of the Paladio site (Home + `/ranker`, routes enumerated, asset/CSS inventory pulled) and teardowns of fabric.inc, apollo.io, zoovu.com. The only existing raster asset is the logo — the Figma brief in §5 is therefore a create-list, tuned to your real tokens, content, and competitive bar.*
