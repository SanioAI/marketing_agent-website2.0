---
title: "How AI Agents Decide Which Products to Recommend — and What Your Catalog Must Provide"
description: "AI shopping agents don't rank products. They filter them. A product that fails a filter step disappears silently — no ranking penalty, no suppression notice. Here's the four-step decision sequence and what catalog data each step requires."
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

Merchandising teams see conversion drop on AI-mediated discovery surfaces — ChatGPT Shopping, Perplexity, Google AI Overview — and assume it's an algorithm problem. Something changed in the ranking. The channel is deprioritizing their products. Time to optimize titles and get more reviews.

It's usually a catalog problem. The agent retrieved the product, then filtered it out because a required attribute was missing. The product never made the shortlist. There's no "position 12" to climb back from — it was excluded in step two of a four-step process.

Understanding that process is the prerequisite to fixing it.

## AI agents don't rank — they filter

Traditional search returns a ranked list. Every product that matches a keyword gets a position, even if it's position 200. You can optimize your way up the list.

AI shopping agents work differently. They evaluate a candidate set against a buyer's constraints and drop anything that fails. The output isn't a ranked list of results — it's a shortlist of products the agent is confident enough to recommend. A product that fails a constraint check isn't ranked lower. It's excluded entirely.

The practical implication: catalog gaps that would have cost you ranking positions in traditional search cost you inclusion in AI-mediated discovery. The penalty is categorical, not marginal.

## The four-step decision sequence

Every AI shopping agent — whether it's Amazon Rufus, ChatGPT Shopping, Perplexity, or Google's AI Overview — runs some version of this sequence when a buyer asks a product question.

### Step 1: Retrieve

The agent builds a candidate set from products that match the buyer's query. This step is closest to traditional search — keyword matching, semantic similarity, category filters. Most catalog work optimizes this step.

**What catalog data it uses:** Product title, description, category tags, semantic embeddings from structured content.

**What fails here:** Products with thin, generic descriptions. Products in wrong categories. Products with no searchable text for the query topic.

### Step 2: Filter

The agent applies the buyer's constraints to the candidate set and eliminates everything that doesn't satisfy them. This is where most silent exclusions happen.

Constraints can be explicit ("HVAC fittings compatible with 2018 Trane systems") or implicit (the agent infers that a buyer shopping for industrial chemicals needs hazmat-flagged products that ship legally to their region). The agent evaluates structured attributes against those constraints — and if the attribute is missing, the product fails the check.

**What catalog data it uses:** Compatibility/fitment data, dimensions, compliance flags, taxability codes, availability, pack configuration.

**What fails here:** Products missing compatibility data for the queried use case. Products without hazmat flags that are required for the category. Products with wrong taxonomy that land outside the category filter. Products with placeholder values in required fields.

> **At Voomi Supply, ASIN matching is a filter-step operation — the Channel Matching Agent evaluates structured identity signals, not keyword relevance. SKUs that failed the identity filter never entered the match pool. Closing those gaps across 1M+ SKUs cut publish time by ~85%.**

### Step 3: Compare

The agent compares the products that survived filtering against each other. It normalizes attributes to a common basis — converting units, aligning specifications, identifying what differentiates each option.

A product with complete, structured attributes gives the agent something to compare. A product with attributes buried in an unstructured description forces the agent to extract them — and if it can't extract them confidently, the product gets deprioritized in favor of ones where the comparison is unambiguous.

**What catalog data it uses:** Structured specifications for the category (dimensions, voltage, load rating, material, application), normalized units, differentiating attributes.

**What fails here:** Products where key specs are only in the description, not in structured fields. Products with unit inconsistencies (some in metric, some in imperial). Products with conflicting signals between title and structured attributes.

> **Profitero maintained >95% precision/recall on attribute extraction and classification across 1,500+ marketplaces. That precision matters at the comparison step — agents downstream of classification use label signals as filter and comparison constraints. Low precision means wrong products in the shortlist.**

### Step 4: Transact

The agent checks whether it can confidently recommend the product for the buyer's context — availability, shipping eligibility, pricing completeness, any regulatory flags for the buyer's region. This is the final gate before the product appears in the recommendation.

**What catalog data it uses:** Taxability codes, regional compliance flags, shipping eligibility, pricing completeness.

**What fails here:** Products with missing tax categories. Products with incomplete regional availability data. Products flagged for restricted status without a resolution.

## What most catalog investment misses

Most catalog optimization work focuses on step one. Title optimization, keyword stuffing, description completeness — all of these improve retrieval.

Steps two and three are where AI-mediated discovery is actually won or lost. A product that retrieves well but fails the compatibility filter never shows up in a recommendation. A product with complete attributes in the description but not in structured fields passes the filter but loses at the comparison step to a product whose specs are easier to evaluate.

The catalog attributes that drive AI shopping recommendations are not the same as the attributes that drive traditional search ranking. Structured specs, fitment data, compliance signals, and normalized units — these are filter-step and comparison-step requirements. Most catalogs aren't built for them.

## The failure that's hardest to diagnose

The worst thing about filter-step exclusions is that they're invisible. A product that ranks position 12 gives you a signal — you know it's there, you can see what's above it, you can optimize. A product that fails the compatibility filter at step two generates no signal at all. Your analytics show no impressions. Your team assumes the channel just doesn't surface your products. The product might be discoverable if the right attributes were filled.

The only way to know which products are failing at which step is to run the checks yourself — score your catalog against the filter-step requirements before the agent does.

> **At JCPenney, Mirakl browse nodes function as category filter constraints — a product assigned to the wrong browse path fails the category filter regardless of how well its attributes are filled. Taxonomy alignment is a filter-step requirement, not a discoverability optimization.**

## Where to start

If you don't know which of your products are failing which step, start with the filter step. Run compatibility, compliance, and taxonomy checks at the SKU level. The gaps that cost you inclusion in AI recommendations are almost always:

1. Missing fitment/compatibility data for products where buyers query by application
2. Wrong taxonomy for one or more channels
3. Missing or incorrect compliance flags (especially hazmat, multipack, restricted categories)
4. Key specs that exist in descriptions but not in structured fields

Fixing these doesn't require a full catalog enrichment program. It requires scoring your catalog at the SKU level and routing the flagged records to the right remediation agent.

Assess your catalog's filter-step readiness → [Catalog Readiness](/catalog-readiness)
