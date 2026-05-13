---
title: "Your Products Are Being Filtered Out. Not Ranked Down — Filtered Out."
description: "AI shopping agents don't rank results. They eliminate candidates that fail structured constraints. A product that disappears from ChatGPT or Perplexity isn't at position 12 — it was excluded before the shortlist formed."
tag: "Awareness"
readTime: "8 min read"
pillar: "Catalog Readiness"
keyword: "how AI agents choose products to recommend"
hub:
  label: "Catalog Readiness"
  href: "/catalog-readiness"
relatedArticles:
  - title: "What Is Catalog Readiness?"
    slug: "what-is-catalog-readiness"
    href: "/resources/articles/what-is-catalog-readiness"
  - title: "The Agentic Commerce Readiness Checklist"
    slug: "agentic-commerce-readiness-checklist"
    href: "/resources/articles/agentic-commerce-readiness-checklist"
  - title: "How to Run a Catalog Readiness Assessment"
    slug: "catalog-readiness-assessment"
    href: "/resources/articles/catalog-readiness-assessment"
---

Your conversion rate on AI-mediated surfaces dropped. Your team looked at title optimization, review count, maybe ad spend. Nothing moved the needle.

Here's what might be happening: your product was filtered out before the shortlist formed. There's no ranking to optimize. You're not at position 12. You're not in the results at all.

AI shopping agents — Amazon Rufus, ChatGPT Shopping, Perplexity, Google AI Overview — don't produce a ranked list of everything that matches a keyword. They evaluate a candidate set against structured constraints and drop anything that fails. The output is a shortlist of products the agent is confident enough to recommend. A product that fails a constraint check isn't demoted. It's gone.

## Why this is so hard to diagnose

Traditional search gives you a signal when you're losing. Position 12. Impression share. The gap between you and whoever's at position 1. You can see it. You can optimize toward it.

AI-mediated discovery gives you nothing. The agent retrieved your product, evaluated it, and excluded it — all without any notification. Your analytics show zero impressions for that query. Your team assumes the channel just doesn't surface your category. The product might be in every relevant recommendation if two fields were different.

That's what makes this failure mode so expensive. It's invisible. No suppression notice. No ranking penalty to diagnose. No feedback that tells you the missing attribute. The product is simply not there.

## What agents don't do (and what that means for your catalog)

Agents don't scroll. They compute.

When a buyer asks a shopping agent for "HVAC fittings compatible with 2018 systems under $40," the agent isn't browsing a product grid and picking the ones that look right. It's evaluating structured fields against those constraints. Compatible with 2018 systems? Checks the fitment data. Under $40? Checks price. The products that can't satisfy the constraint check are dropped — instantly, silently, before a single recommendation is formed.

Most product data was built for human browsing: descriptive copy, lifestyle narrative, keyword-dense titles. That approach optimizes the retrieve step. It does nothing for the filter step — and the filter step is where AI-mediated discovery is won or lost.

## The four steps, and where most catalogs break

Every AI shopping agent runs some version of this sequence.

**Retrieve.** Build a candidate set from products matching the query — keywords, semantic similarity, category. Most catalog investment targets this step. It matters, but it's not the hard part.

**Filter.** Apply the buyer's constraints and drop everything that fails. This is where most silent exclusions happen. Constraints can be explicit (the buyer stated them) or implicit (the agent infers them from context — a buyer asking for industrial solvents probably needs products with correct hazmat classification). If the required attribute is missing, the product fails. No partial credit.

What fails at the filter step:
- Products missing compatibility or fitment data for the queried application
- Products with wrong taxonomy that land outside the category filter
- Products with missing or incorrect compliance flags in regulated categories
- Products with placeholder values (`"TBD"`, `"N/A"`) in structured fields the filter evaluates

**Compare.** The products that survived filtering get compared against each other. The agent normalizes attributes — converting units, aligning specs, identifying differentiators. A product with complete structured specs gives the agent something to evaluate. A product with specs buried in an unstructured description gets deprioritized in favor of one where the comparison is unambiguous. You don't lose this step on product quality. You lose it on data quality.

**Transact.** Final check — availability, shipping eligibility, pricing completeness, regional restrictions. Products that can't be transacted on with confidence drop out.

## Where most catalog investment misses

The retrieve step is well-understood. Teams have been optimizing for it for years. Title optimization, keyword coverage, description completeness — all of it targets retrieval.

The filter and compare steps are where AI discovery is actually won, and where almost no investment goes. The attributes that keep your products in the consideration set aren't the attributes that drive traditional search ranking. They're fitment data, compliance flags, correct taxonomy, normalized units — none of which have a keyword optimization analog.

A product with perfect titles but missing compatibility data beats a product with thin titles but complete fitment data every time the buyer's query includes a compatibility constraint. And there's no signal telling you which one it was.

## What changes when your catalog passes each filter

Discovery footprint expands without changing the products. When compatibility data covers the right model ranges, your products appear in queries they were always relevant for. The products didn't change. The catalog did.

Competitors with worse products but better structured data stop beating you in recommendations. The agent doesn't have a preference between your product and theirs — it has a preference between the one it can evaluate and the one it can't.

And the work compounds. Every attribute you add to a structured field makes it available for every future query that includes that constraint. You add fitment data once. Every buyer who asks about compatibility benefits from it, every time.

## Your catalog is either in the shortlist or it isn't

There is no partial credit in AI-mediated discovery. A product that fails the filter step doesn't get fewer impressions — it gets none. No clicks, no conversions, and no signal to tell you why.

The work that keeps your products in the consideration set is structured attributes at the filter step: compatibility data, compliance flags, correct taxonomy, normalized units. The catalog that passes every constraint check is the catalog that shows up when a buyer asks.

Assess your catalog's filter-step readiness → [Catalog Readiness](/catalog-readiness)
