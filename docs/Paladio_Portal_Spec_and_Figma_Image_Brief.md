# Paladio — Positioning, Complete Portal Spec & Figma Image Brief
### Catalog of Agents' Solutions · Competitive teardown → IA → page-by-page requirements → asset manifest

---

## 0. Read this first — status & the one open dependency

I was able to do the deep competitive research (Fabric, Apollo, Zoovu) and turn it into the full positioning, information architecture, page specs, image brief, and build plan below. That is ~80% of what you asked for and all of it is actionable in Figma today.

**Two parts of your request are blocked on live access to `paladio-website.vercel.app`:**

1. **"Clear audit on what's missing on the current website"** — needs the current state.
2. **"Extract all the product imagery"** — needs to pull the actual asset files.

My automated tools couldn't reach the Vercel preview (the Chrome extension wasn't connected, the fetch tool blocked the preview URL, and the sandbox network doesn't allowlist `vercel.app`). **Section 7** is a complete audit *framework* I will run the moment I can see the site. To unblock, do any one of:

- **Reconnect the Claude-in-Chrome extension** and tell me to go — I'll crawl every page, screenshot each section, and pull the full image inventory + exact audit.
- **Paste the page** (right-click → "Save as" → send the HTML, or paste the rendered text) and/or **drop screenshots** of each page here.
- **Send the repo / Figma link or a public production URL** (a non-preview domain often fetches fine).

Everything in Sections 1–6 stands regardless.

---

## 1. The competitive landscape — where Paladio plays

The three named competitors are all "**agentic [domain]** platforms." They are *not* identical, and the differences define your opening.

### Fabric (fabric.inc) — agentic *commerce*
- **Category:** Agentic Commerce platform. Tagline energy: *"Ready. Set. Glow."* / "Light up your catalog on agentic commerce."
- **Product line:** `fabric NEON` umbrella → three pillars: **Product Agent**, **Monitor** (catalog visibility, prompt tracking, benchmarking), **Activate** (SKU onboarding + data enrichment for AI discovery).
- **Core promise:** Optimize product *data* so AI search engines / shopping agents can find and recommend your products.
- **Site pattern:** Hero with a product-dashboard screenshot → "Introducing NEON" + explainer video → 3 product pillars each with a wide UI screenshot + "glow" gradient treatment → integrations → enterprise logo wall → 2 testimonials → blog cards.

### Zoovu (the "Zoovo" you named) — agentic *product discovery*
- **Category:** AI product search & discovery for enterprise commerce; positions itself as the **"Product Brain."**
- **Agent angle:** Launched a **Zoovu MCP Server** that gives any MCP-compatible AI agent governed access to enriched product data, compatibility/configuration logic, and GenAI shopping experts.
- **Core promise:** "One engine" unifying search, recommendations, personalization, and AI — two playbooks (B2C inspiration vs. B2B specification). Customers cited: Microsoft, Bosch, Canon, Honeywell.
- **Site pattern:** Benefit hero → "one engine, two playbooks" → modular capability tiles → results/proof.

### Apollo (apollo.io) — agentic *GTM / sales*
- **Category:** "First fully agentic end-to-end GTM platform." Powered by an **Agentic Engine** with **AI Assistant** + **AI Projects**, and agentic Outbound / Inbound / Deals / Data Enrichment.
- **Core promise:** Replace a 5-tool sales stack with one AI-native operating system that *executes* (not just suggests).
- **Site pattern:** Headline + signup-in-hero (self-serve, Google/Microsoft) with hero video → social-proof stat cards (70%, 4x, 64%) + logo wall → **tabbed solution showcase** (4 tabs, each = 4 benefit bullets + product UI screenshot) → security/compliance badge row → "why buy five tools" consolidation CTA → FAQ accordion → mega-menu footer.

### The shared archetype (your visual + structural baseline)
Every one of these sites repeats the same skeleton. Treat it as table stakes:
1. **Benefit hero** + a real product visual (screenshot or short video), dual CTA (book demo *and* self-serve start).
2. **Immediate social proof** — logo wall + quantified stat cards + a marquee quote.
3. **Product pillars / tabbed solution showcase** — each pillar = headline + 3–4 outcome bullets + one product-UI screenshot.
4. **Ecosystem / integrations** strip.
5. **Trust layer** — security/compliance badges, customer testimonials with headshots + logos.
6. **Resources / blog** cards.
7. **High-contrast closing CTA.**
8. **Mega-menu footer** (Solutions · Platform · Roles/Industries · Resources · Company).

### Paladio's opening — the part none of them lead with
Fabric, Zoovu, and Apollo are each **one platform for one domain.** You described Paladio as a **"catalog of agents' solutions company."** That word — *catalog* — is the wedge. Your differentiator is a **browsable, filterable directory of packaged agent solutions** (across domains / use cases / industries), where each solution is a first-class catalog object with its own detail page, capabilities, integrations, and proof. That is closer to a **marketplace / solution catalog** than a single-product marketing site. Lean into it: the catalog *is* the hero, and the marketing site exists to funnel people into it.

---

## 2. Recommended positioning

- **Category line:** *The catalog of agent solutions.* (One place to discover, evaluate, and deploy AI agents for real business work.)
- **One-liner (hero candidate):** "Find the right AI agent for every job — a curated catalog of production-ready agent solutions you can evaluate and deploy in minutes."
- **Who it's for (pick the lead persona for the hero):** ops/automation leaders, RevOps/CX, IT/platform teams evaluating agents — versus building from scratch.
- **Three value pillars (mirror the competitor "3-pillar" pattern):**
  1. **Discover** — browse a curated catalog by job-to-be-done, department, and integration.
  2. **Evaluate** — every agent has clear capabilities, guardrails, integrations, pricing, and proof.
  3. **Deploy** — connect, configure, and go live without a build project.
- **Differentiators to make explicit on-site:** breadth (catalog vs. single product), neutrality/curation, time-to-value, governance/trust, and integration coverage.
- **Tone of voice:** confident, concrete, outcome-led. Avoid generic "AI magic"; show the actual agent doing actual work (the competitors all win on real product screenshots, not abstract art).

---

## 3. Information architecture — the complete portal

Think of the portal as **three layers**. The current Vercel site is almost certainly only Layer 1.

```
Paladio Portal
│
├── LAYER 1 — Marketing site (convince)
│   ├── Home
│   ├── How it works
│   ├── Solutions by use case        (Sales, Support, Ops, Marketing, Finance, IT…)
│   ├── Solutions by industry        (Retail, Fintech, Healthcare, SaaS…)
│   ├── Why Paladio / Differentiators
│   ├── Pricing
│   ├── Trust & Security
│   ├── Resources (Blog, Guides, Webinars, Customer stories)
│   ├── Company (About, Careers, Newsroom, Partners)
│   └── Contact / Book a demo
│
├── LAYER 2 — The Catalog (the product) ★ your differentiator
│   ├── Catalog landing (browse all)
│   ├── Faceted search & filters     (category · department · integration · price · rating)
│   ├── Category / collection pages
│   ├── Agent Solution Detail Page   (the atomic unit — see 4.3)
│   ├── Compare (2–3 agents side by side)
│   └── Submit / become a partner (if marketplace-style supply side)
│
└── LAYER 3 — Console (use)  [phase 2 — flag, don't necessarily design now]
    ├── Auth (sign in / sign up / SSO)
    ├── Dashboard
    ├── Deployed agents & configuration
    ├── Usage / billing
    └── Admin & governance
```

**Global nav recommendation:** `Catalog` · `Solutions ▾` · `Pricing` · `Resources ▾` · `Company ▾` → right side: `Sign in` + `Book a demo` (primary). Put **Catalog first** — it is the product.

---

## 4. Page-by-page requirements (content + components + images)

Each page below lists **sections**, the **components** to build, and the **images required** (image specs consolidated in Section 5).

### 4.1 Home
| Section | Components | Images |
|---|---|---|
| Hero | Headline, subhead, dual CTA, search-the-catalog input | `hero-primary` (catalog UI screenshot or short loop) |
| Social proof bar | Logo wall + 3 stat cards + marquee quote | `logo-wall` (8–12 SVG), `customer-logo` set |
| What is Paladio | 3-pillar block (Discover / Evaluate / Deploy) | 3× `pillar-ui` product shots OR `pillar-illustration` |
| Featured agents | Catalog card carousel (6–8 cards) | `agent-card-thumb` ×N, `category-icon` set |
| Browse by use case | Tile grid linking to category pages | `usecase-icon` set |
| Integrations | Logo grid of connectors | `integration-logo` set (SVG) |
| Trust | Security badges + 1 testimonial | `security-badge` set, `headshot` |
| Resources | 3 blog cards | `blog-card-featured` ×3 |
| Closing CTA | High-contrast band, demo + self-serve | `cta-bg` texture/gradient |

### 4.2 Catalog landing / browse (the core experience)
- **Components:** left rail facets (category, department, integration, pricing model, rating, "verified by Paladio"), sort dropdown, results grid of **agent cards**, pagination/infinite scroll, empty-state, saved/compare tray.
- **Agent card (design this carefully — it's used everywhere):** thumbnail/icon, agent name, vendor/badge, 1-line value prop, category chips, integration mini-logos, rating, price tag, primary "View" CTA.
- **Images:** `agent-card-thumb` (one per agent), `category-icon`, `integration-logo` (mini), `verified-badge`, `empty-state-illustration`.

### 4.3 Agent Solution Detail Page (the atomic unit — most important template)
This is what makes Paladio a *catalog*. Spec it like a best-in-class product detail page:
- **Header:** agent name, vendor, category chips, rating, price, primary CTA ("Deploy" / "Book demo"), secondary ("Add to compare").
- **Hero media:** primary screenshot or demo video of the agent in action.
- **At-a-glance:** what it does, who it's for, key outcomes (stat chips).
- **Capabilities:** bulleted feature list with small inline icons.
- **How it works:** 3–4 step diagram.
- **Integrations:** logo grid.
- **Guardrails / governance / data handling:** trust block.
- **Gallery:** 3–5 product screenshots.
- **Proof:** testimonial(s), case stat.
- **Pricing/plans** + **FAQ accordion.**
- **Related agents** carousel.
- **Images:** `agent-hero-media`, `agent-screenshot` ×3–5, `capability-icon` set, `howitworks-step` diagram art, `integration-logo`, `agent-vendor-logo`, `headshot`.

### 4.4 Solutions by use case / by industry
- Mirror the competitor "solutions" pattern: problem framing → 3–4 outcome bullets → product screenshot → relevant catalog cards filtered to that use case → CTA.
- **Images:** `solution-hero`, `solution-ui` screenshot, filtered `agent-card-thumb`, `industry-icon`.

### 4.5 How it works
- 3–4 step explainer (Discover → Evaluate → Connect → Deploy) with a diagram per step, plus a short product walkthrough video.
- **Images:** `howitworks-step` ×4, `walkthrough-video` poster.

### 4.6 Pricing
- Plan cards (3 tiers), feature comparison table, FAQ. Apollo-style "why one platform beats five tools" comparison is effective.
- **Images:** `plan-icon` ×3, optional `comparison-illustration`.

### 4.7 Trust & Security
- Compliance badge row (SOC 2, GDPR, ISO 27001, etc.), data-handling diagram, subprocessor list, governance narrative.
- **Images:** `security-badge` set (SVG), `data-flow-diagram`.

### 4.8 Resources / Blog
- Card grid + article template. **Images:** `blog-card-featured`, `blog-hero`, author `headshot`.

### 4.9 Company / About / Careers / Partners / Newsroom
- Standard. **Images:** `team-photo`, `office/culture` shots, `partner-logo`, `press-logo`.

### 4.10 Contact / Book a demo
- Form + calendar embed + reassurance proof. **Images:** none required beyond a light `cta-bg`.

---

## 5. The Figma image brief — asset manifest

This is the part to hand to your designers. **Global direction first, then every image with purpose, content, type, and dimensions.**

### 5.1 Global art direction
- **Lead with real product UI, not abstract AI clip-art.** Fabric and Apollo both win on actual dashboards/screenshots. Aim for **70% product UI / 20% iconography & diagrams / 10% people & brand**.
- **One signature visual treatment** (Fabric uses a "glow" gradient behind screenshots). Pick one ownable device — e.g. a soft brand-gradient glow + subtle device/browser frame around screenshots — and apply it consistently.
- **Color:** define one accent + one dark surface for hero/CTA bands (both competitors use dark, high-contrast closing sections).
- **Screenshots:** design realistic, on-brand mock UI in Figma (don't ship Lorem-ipsum dashboards). Build a reusable "Paladio UI" component kit so every screenshot looks like one product.
- **Export discipline:** ship **@1x and @2x** PNG/WebP for raster, **SVG** for all logos/icons/badges. Provide light + dark variants for anything sitting on dark bands.

### 5.2 Image specifications

**A. Brand & system (SVG)**
| Asset | Use | Spec / notes |
|---|---|---|
| `logo-primary`, `logo-mono-white`, `logo-mono-black`, `favicon` | Global | SVG; provide horizontal + mark-only lockups |
| `category-icon` set (~10–16) | Catalog facets, tiles | 24/32/48px grid; single accent + neutral; consistent stroke weight |
| `capability-icon` set (~20) | Detail pages | Same family as category icons |
| `usecase-icon` / `industry-icon` set | Home tiles, solution pages | Same family |
| `integration-logo` set | Integrations grids | Partner SVGs, monochrome treatment for grids |
| `security-badge` set | Trust page/footer | SOC 2, GDPR, ISO 27001, CCPA, etc. (SVG) |
| `verified-badge` | Catalog cards | Small "Verified by Paladio" mark |

**B. Hero & key product UI (raster, retina)**
| Asset | Use | Content direction | Dimensions |
|---|---|---|---|
| `hero-primary` | Home hero | The **catalog browse** view (cards + filters) — show breadth at a glance; or a 6–10s silent loop | ~1408×1016 @2x (match Fabric's hero scale); video: webm + static PNG fallback @3840w |
| `pillar-ui` ×3 | Home pillars | One screenshot per pillar: Discover (browse), Evaluate (detail page), Deploy (connect/config) | ~1024×740 each, wide |
| `solution-ui` | Use-case/industry pages | Catalog filtered to that use case | ~1024×740 |
| `walkthrough-video` (+ poster) | How it works | 30–60s product tour | poster @1920w |

**C. Agent Solution Detail Page (per agent)**
| Asset | Use | Content direction | Dimensions |
|---|---|---|---|
| `agent-card-thumb` | Cards everywhere | Distinct icon/illustration per agent; consistent frame so the grid looks uniform | square 320×320 @2x (display ~160px) |
| `agent-hero-media` | Detail hero | Agent in action (screenshot or loop) | ~1200×800 @2x |
| `agent-screenshot` ×3–5 | Detail gallery | Real workflow steps of that agent | ~1024×700 @2x |
| `howitworks-step` ×3–4 | Detail + How it works | Simple diagram art per step | ~640×480 |
| `agent-vendor-logo` | Detail header | Vendor SVG | SVG |

> **Scale note:** the catalog needs **one `agent-card-thumb` per listing** and **a set of screenshots per listing**. Build a Figma *template component* for "agent thumbnail" and "agent screenshot frame" so new listings are drag-and-drop, not bespoke. This is the single biggest production-efficiency decision.

**D. Social proof & people**
| Asset | Use | Spec |
|---|---|---|
| `customer-logo` / `logo-wall` (8–12) | Home, detail | Monochrome SVG, equal optical weight |
| `headshot` set | Testimonials, authors | Square, consistent crop/treatment, 160×160 @2x |
| `team-photo`, `culture` shots | About/Careers | Real photography; consistent grade |
| `press-logo`, `partner-logo` | Newsroom/Partners | SVG |

**E. Backgrounds, states & marketing**
| Asset | Use | Spec |
|---|---|---|
| `cta-bg` / brand gradient | Closing CTA bands | The signature glow/gradient; export as image + document the CSS gradient |
| `empty-state-illustration` | Catalog no-results | One friendly spot illustration |
| `error/404` illustration | Error pages | Same illustration family |
| `og-image` / social cards | SEO/sharing | 1200×630 per key page (Fabric & Apollo both ship these) |
| `blog-card-featured` / `blog-hero` | Resources | 16:9; card ~640w, hero ~1408w |

### 5.3 What content each image should communicate (the "positioning" mapping)
- **Hero & pillar shots → "breadth + ease."** Show many agents and clean filtering. This sells *catalog* in one glance — the thing competitors can't show.
- **Detail-page media → "evaluate with confidence."** Capabilities, guardrails, integrations visible. This sells *trust/governance.*
- **How-it-works diagrams → "deploy without a build project."** Few steps, short arrows. This sells *time-to-value.*
- **Logo walls / badges / headshots → "real, safe, proven."** Standard trust layer.
- **Icon system → "navigable taxonomy."** A coherent icon family is what makes a large catalog feel organized rather than overwhelming.

---

## 6. Build approach for the complete portal

- **Stack:** keep Next.js on Vercel (already there). Add a **catalog data layer**.
- **Catalog data model (each agent = one record):**
  `id, slug, name, vendor, summary, description, categories[], departments[], industries[], integrations[], capabilities[], guardrails, pricing_model, plans[], rating, verified(bool), media{thumb, hero, screenshots[]}, faqs[], related[]`
- **CMS / source of truth:** a headless CMS (Sanity/Contentful) or a typed content collection so non-engineers can add agents; each new agent auto-generates a detail page + appears in browse/filters.
- **Search/filter:** client-side for a small catalog; move to Algolia/Typesense as it grows.
- **Componentization:** build the **agent card** and **detail template** as the backbone — everything else reuses them.
- **Performance/SEO:** static-generate catalog & detail pages, ship `og-image`s, structured data (Product/SoftwareApplication schema) so the catalog itself ranks (very on-brand for an "agentic discovery" company).
- **Phasing:** Phase 1 = marketing site + catalog browse + detail pages (no auth). Phase 2 = console/auth/deploy.

---

## 7. Audit framework — to run the moment I can see the live site

When you unblock access (Section 0), I'll score the current site against this and return a prioritized gap list:

1. **Positioning clarity** — does the hero state the category ("catalog of agent solutions") in <5 seconds? Is the differentiator (catalog/breadth) obvious vs. competitors?
2. **Catalog presence** — is there a browsable/filterable catalog at all, or only marketing copy? (Likely the #1 gap.)
3. **Detail-page depth** — do individual agents have real detail pages with capabilities/integrations/proof?
4. **Social proof** — logo wall, stats, testimonials present and credible?
5. **Product visuals** — real screenshots vs. placeholder/abstract art? Consistent treatment?
6. **Trust layer** — security/compliance, governance narrative?
7. **Conversion paths** — dual CTA (demo + self-serve)? Are CTAs persistent?
8. **IA & nav** — is the catalog elevated in nav? Footer mega-menu complete?
9. **Resources/SEO** — blog, og-images, structured data, metadata.
10. **Responsive & performance** — mobile layout, image weights, Core Web Vitals.
11. **Image inventory** — full list of every asset currently used (filename, dimensions, where used, keep/replace), which is the basis for the Figma redraw list.
12. **Accessibility** — alt text, contrast, focus states.

---

## 8. What I need from you to finish the last 20%
- **Access to the live site** (reconnect Chrome / paste HTML / screenshots / production URL) → I'll deliver the **exact audit** + **complete current-image inventory** + a **keep/replace/redraw list** mapped to Section 5.
- **Confirm the lead persona & whether a console (Layer 3) is in scope now** so I can finalize the hero message and whether to spec auth/dashboard.
- **Confirm catalog supply model:** first-party curated only, or partner-submitted (marketplace)? This changes whether we need a "Submit your agent" flow + partner pages.

---
*Prepared from live teardowns of fabric.inc, apollo.io, and zoovu.com. Sections 1–6 are final; Section 7 executes on site access.*
