---
title: "The Agentic Commerce Readiness Checklist: 5 Dimensions, 25 Checks"
description: "A practical checklist for assessing whether your catalog can be acted on by AI shopping agents. Each check maps to a specific failure mode at retrieval, filter, comparison, or transaction time."
tag: "Consideration"
readTime: "9 min read"
pillar: "Catalog Readiness"
keyword: "agentic commerce readiness checklist"
hub:
  label: "Catalog Readiness"
  href: "/catalog-readiness"
relatedArticles:
  - title: "What Is Catalog Readiness?"
    slug: "what-is-catalog-readiness"
    href: "/resources/articles/what-is-catalog-readiness"
  - title: "How AI Agents Decide Which Products to Recommend"
    slug: "how-ai-agents-decide-which-products-to-recommend"
    href: "/resources/articles/how-ai-agents-decide-which-products-to-recommend"
  - title: "How to Run a Catalog Readiness Assessment"
    slug: "catalog-readiness-assessment"
    href: "/resources/articles/catalog-readiness-assessment"
---

AI shopping agents don't rank your products. They filter them. A product that fails a filter disappears from the consideration set — silently, with no error message, no ranking penalty, no suppression notice.

A buyer asks ChatGPT for "food-safe industrial degreasers." Your product matches the keyword. The hazmat flag is missing. The agent can't verify food safety and excludes it. A buyer asks Gemini for "6-inch duct fittings for residential installation." Your fitting matches. The sub-category field is blank. The agent can't place it correctly. Neither failure shows up in your analytics.

This checklist maps each failure mode to the specific check that catches it before the agent does.

## How to use this checklist

Run it at the product level, not the catalog level. A catalog that's 95% ready still has 50,000 products failing if you have 1 million SKUs. The goal is to identify which specific products fail which specific checks — and route them to the right agent for remediation.

Each check lists the **failure mode** (what breaks) and the **agent that fixes it** if you're using [Catalog Agents](/catalog-agents).

---

## Bucket 1: Discovery

These checks determine whether an AI agent can *find, identify, and place* your product. Discovery failures are the most expensive — a product that can't be found or correctly categorized never makes it to the comparison step.

| # | Check | Failure mode | Agent |
|---|---|---|---|
| 1.1 | Brand name is canonical (not "Manufacturer", "OEM", "N/A") | Channel listing match fails; brand filter returns incomplete results | Brand Normalization Agent |
| 1.2 | Global product identifier (GTIN/UPC/EAN) is present and valid | Channel matching breaks; duplicate listings appear | Channel Matching Agent |
| 1.3 | Pack size and geometry are explicit (not "assorted" or "varies") | Multipack compliance check can't run; pricing per unit is wrong | Attribute Agent |
| 1.4 | Model number matches manufacturer's canonical format | Compatibility filter fails for exact-match queries | Attribute Agent |
| 1.5 | Product title contains key identifiers (brand, type, size, material) | Retrieval step misses queries using those identifiers | Attribute Agent |
| 1.6 | Product is in the correct category for each target channel | Listing suppressed or placed in wrong browse node | Taxonomy Agent |
| 1.7 | Sub-category and product type are filled, not just top-level category | Filter navigation fails; product buried below relevant results | Taxonomy Agent |
| 1.8 | Taxonomy is current — channel taxonomies change quarterly | A category correct 6 months ago may now be wrong | Taxonomy Agent |
| 1.9 | Material and composition are structured (not buried in description) | Fails material-based filter queries — "aluminum-safe degreaser", "stainless fasteners" | Attribute Agent |
| 1.10 | Dimensions are explicit and in standard units | Fails size-based filter queries — "fits 6-inch duct", "under 12 inches" | Attribute Agent |
| 1.11 | Compatible products or fitment data is present where applicable | Fails compatibility filter — product excluded from shortlist | Product Graph Agent |
| 1.12 | Key specs for the category are filled (voltage, pressure, load rating, etc.) | AI agent can't compare against alternatives — product gets skipped | Attribute Agent |

---

## Bucket 2: Compliance

These checks determine whether your product can be *published and sold* without triggering a rejection or suspension. Compliance failures often go undetected until after a listing goes live — at which point the cost is a channel suspension, not just a failed submission.

| # | Check | Failure mode | Agent |
|---|---|---|---|
| 2.1 | Hazardous materials are correctly flagged (GHS, DOT, OSHA) | Post-listing rejection, channel suspension, liability exposure | Compliance Agent |
| 2.2 | Multipack configuration is explicit and consistent with product identifier | Multipack listing rejected or priced incorrectly | Compliance Agent |
| 2.3 | Age restrictions and safety warnings are present where required | Regulatory non-compliance, listing removal | Compliance Agent |
| 2.4 | Restricted or controlled products are flagged before submission | Channel suspension if caught post-publication | Compliance Agent |
| 2.5 | Tax category is correct per jurisdiction | Pricing errors, tax liability exposure | Compliance Agent |
| 2.6 | Certifications and standards are listed where required (UL, CE, food-safe, etc.) | Agent can't verify category-specific safety claims; product excluded from regulated queries | Compliance Agent |

---

## Bucket 3: Content

These checks affect whether an AI agent can *reason about* your product and make a confident recommendation. A product that passes Discovery and Compliance but fails Content will be found — and then deprioritized in favor of products the agent can evaluate more clearly.

| # | Check | Failure mode | Agent |
|---|---|---|---|
| 3.1 | Product description is specific, not generic ("quality product" teaches the agent nothing) | AI agent can't generate a confident recommendation | Attribute Agent |
| 3.2 | Key use cases or applications are stated explicitly | Fails use-case queries — "degreaser for food processing equipment", "fitting for high-pressure systems" | Attribute Agent |
| 3.3 | Setting, problem, and outcome are described for applicable products | Agent can't match buyer scenario to product; recommends a product with clearer situational copy | Attribute Agent |
| 3.4 | No placeholder values in required fields ("TBD", "See description", "N/A") | Channel validation fails; agent confidence drops | Attribute Agent |
| 3.5 | Attributes are consistent across title, description, and structured fields | Conflicting signals lower agent confidence — product gets deprioritized | Attribute Agent |
| 3.6 | Language and units are appropriate for each target market | Filter fails for region-specific queries; international channels reject the record | Attribute Agent |
| 3.7 | Comparative signals are present — what this product does vs. common alternatives | AI comparison step picks the product with more evaluable data | Attribute Agent |

---

## What to do with your results

**Products that fail Bucket 1 or Bucket 2** are likely already costing you in suppressed listings, compliance flags, or silent exclusions from AI recommendations. Fix these first — they have an immediate, measurable impact on publish rate and discoverability.

**Products that pass Buckets 1 and 2 but fail Bucket 3** are published and discoverable, but losing at the comparison step. When a buyer asks Perplexity or Gemini to compare options, these products get skipped in favor of ones the agent can evaluate more clearly. The fix is structured content enrichment — not copy polish.

Score your catalog across all three buckets → [Catalog Readiness](/catalog-readiness)
