---
title: "Your Products Are Being Filtered Out. Not Ranked Down — Filtered Out."
description: "AI shopping agents don't rank results. They eliminate candidates that fail structured constraints. A product that disappears from ChatGPT or Perplexity isn't ranking at position 12 — it was excluded before the shortlist formed. Here's why, and what catalog data each step requires."
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

Here's the thing: if your product was filtered out before the shortlist formed, there is no ranking to optimize. You're not at position 12. You're not in the results at all.

AI shopping agents — Amazon Rufus, ChatGPT Shopping, Perplexity, Google AI Overview — don't produce a ranked list of everything that matches a keyword. They evaluate a candidate set against structured constraints and drop anything that fails. The output is a shortlist of products the agent is confident enough to recommend. A product that fails a constraint check isn't demoted. It's gone.

## Why this is so hard to diagnose

Traditional search gives you a signal when you're losing. You see position 12. You see impression share. You see the gap between you and whoever's at position 1.

AI-mediated discovery gives you nothing. The agent retrieved your product, evaluated it against the buyer's constraints, and excluded it — all without any notification to you. Your analytics show zero impressions for that query. Your team assumes the channel just doesn't surface your category. Meanwhile, a competitor whose compatibility data covers the right model range is in the recommendation every time.

The reason teams misdiagnose this as an algorithm problem is that the failure is invisible. No suppression notice. No ranking penalty to diagnose. No "here's what you're missing" feedback. The product is simply not there.

## What the four-step decision sequence actually means

Every AI shopping agent runs some version of this sequence when a buyer asks a product question.

**Retrieve.** The agent builds a candidate set from products that match the query. This is closest to traditional search — keyword matching, semantic similarity, category lookup. Most catalog investment goes here: title optimization, description completeness, keyword coverage.

**Filter.** The agent applies the buyer's constraints to the candidate set and drops everything that doesn't satisfy them. This is where most silent exclusions happen.

Some constraints are explicit — a buyer asks for "HVAC fittings compatible with 2018 Trane systems" and the agent filters for products with that fitment data. Some are implicit — the agent infers that a buyer in a regulated industry needs products with complete compliance flags. Either way, it evaluates structured attributes against those constraints. If the attribute is missing, the product fails the check.

**Compare.** The products that survived filtering get compared against each other. The agent normalizes attributes to a common basis — converting units, aligning specifications, identifying what differentiates each option. A product with complete, structured specs gives the agent something to work with. A product with specs buried in an unstructured description forces the agent to extract them. If it can't extract them confidently, it favors the product where the comparison is unambiguous.

**Transact.** The agent checks whether it can confidently recommend the product — availability, shipping eligibility, pricing completeness, any regional restrictions. This is the final gate before the product appears in the recommendation.

## Where most catalog investment misses the mark

The retrieve step is well-understood. Teams have been optimizing for it for years. The filter and compare steps are where AI-mediated discovery is actually won or lost — and where almost no catalog investment goes.

A product that retrieves well but fails the compatibility filter never shows up in the recommendation. A product with complete attributes in the description but not in structured fields passes the filter but loses at the compare step to a product whose specs are already structured and ready to evaluate.

The attributes that determine AI recommendations aren't the same as the attributes that drive traditional search ranking. Structured specs, fitment data, compliance signals, normalized units — these are filter-step and compare-step requirements. They don't show up in keyword rankings. They don't have a "fix your title" feedback loop. They either pass the constraint check or they don't.

> **At Voomi Supply, ASIN matching is a filter-step operation. The Channel Matching Agent evaluates structured identity signals — canonical brand, valid GTIN, correct model format. SKUs that failed the identity check never entered the match pool. Closing those gaps across 1M+ SKUs cut publish time by ~85%.**

## How catalog gaps show up at each step

At the retrieve step, your product is invisible if your description is too thin to surface for the query. Generic copy ("quality product, many uses") doesn't give an AI agent anything to match against a specific buyer question.

At the filter step, your product is excluded if:

- Compatibility or fitment data doesn't cover the buyer's model or application
- Your taxonomy is wrong and the product lands outside the category filter
- Compliance flags are missing for a category where they're required
- Required fields contain placeholders (`"TBD"`, `"N/A"`, `"See description"`) instead of real values

At the compare step, your product loses if:

- Key specifications exist in the description but not in structured fields
- Units are inconsistent (some products in metric, others imperial)
- The agent can't extract a confident value and deprioritizes your product in favor of one where the data is unambiguous

> **Profitero maintained >95% precision/recall on classification across 1,500+ marketplaces — because agents downstream of classification use label signals as filter inputs. Low classification precision means the wrong products pass the filter. Products that should have been excluded show up; products that should have appeared don't.**

## What changes when your catalog passes each filter

**You stop losing to products with worse attributes.** A competitor with a thinner product line but cleaner structured data beats your catalog in AI recommendations every time the comparison step can't resolve a tie in your favor. Fix the structured data and that advantage disappears.

**Discovery footprint expands without changing the products.** When compatibility data covers the right model ranges, your HVAC fittings show up in queries they were always relevant for. The product didn't change. The catalog data did.

**JCPenney's Mirakl onboarding showed how taxonomy functions as a filter gate, not a ranking factor.** Products assigned to the wrong browse path failed the category filter regardless of how well their attributes were filled. The issue wasn't content quality. It was classification. One change — correct taxonomy — determined whether the product appeared or didn't.

## Your catalog is either in the shortlist or it isn't

There is no partial credit in AI-mediated discovery. A product that fails the filter step doesn't get a lower rank. It gets no impressions, no clicks, no conversions — and no signal to tell you why.

The work that keeps your products in the consideration set isn't title optimization. It's the structured attributes at the filter step: compatibility data, compliance flags, correct taxonomy, normalized units. The catalog that passes every constraint check is the catalog that shows up when a buyer asks.

Assess your catalog's filter-step readiness → [Catalog Readiness](/catalog-readiness)
