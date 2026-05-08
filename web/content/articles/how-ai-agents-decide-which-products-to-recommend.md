---
title: >-
  How AI Agents Decide Which Products to Recommend (and What Your Catalog Must
  Provide)
description: >-
  Retrieve/filter/compare like **Voomi** at **1M+ SKUs / 200M+ ASINs** (where
  **multipack** + specs collapse candidates), **Profitero** at **>95% P/R**
  (where sparse fields are model inputs), **JCPenney** Mirakl facets (where
  taxonomy sets the consideration set)—or agents silently drop SKUs.
tag: Awareness
readTime: 6 min read
pillar: Catalog Readiness for Agentic Commerce
keyword: how AI agents choose products to recommend
hub:
  label: Catalog Readiness
  href: /catalog-readiness
relatedArticles:
  - title: Why AI Agents Need Structured Product Intelligence
    slug: why-ai-agents-need-structured-product-intelligence
    href: /resources/articles/why-ai-agents-need-structured-product-intelligence
  - title: Optional Attributes Revenue-Critical Agentic Commerce
    slug: optional-attributes-revenue-critical-agentic-commerce
    href: /resources/articles/optional-attributes-revenue-critical-agentic-commerce
  - title: What Are Catalog Agents?
    slug: what-are-catalog-agents
    href: /resources/articles/what-are-catalog-agents
  - title: Agentic Commerce Readiness Checklist
    slug: agentic-commerce-readiness-checklist
    href: /resources/articles/agentic-commerce-readiness-checklist
  - title: Catalog Readiness Assessment
    slug: catalog-readiness-assessment
    href: /resources/articles/catalog-readiness-assessment
---

## Agents Don’t “Browse”; They Execute Tasks

You might think AI agents act like a savvy merchandiser, browsing through your catalog with a keen eye for trends. Wrong. Agents don’t “browse”; they execute specific tasks with surgical precision. They don’t appreciate your curated product descriptions or fancy visuals. They need structured data to operate, focusing on what they can verify and act upon. Their purpose is not to marvel at your catalog's aesthetic, but to retrieve, filter, and recommend products based on hard facts.

This reality shifts the burden onto you: your catalog needs to be ready for such meticulous scrutiny. It’s not about making your catalog visually appealing to a human. It’s about ensuring it’s operationally sound for an AI agent. It’s about providing the right data, in the right structure, so the agent can execute its tasks without stumbling over ambiguities or missing information.

## Retrieval: Identity and Embeddings Over Structured Facets

When an agent retrieves products, it doesn't scroll like a human might. It uses **identity** and **embeddings** to zero in on what matters. Identity ensures that each product is uniquely recognized, while embeddings represent these products within a structured space, allowing for efficient retrieval across a vast catalog.

Consider the challenge faced by **Voomi Supply**. With over **1M+ SKUs**, the initial candidate pool is immense. Yet, their **200M+ ASIN** space can only be navigated effectively when each product’s identity is well-defined and its structured facets are accurate. Without this, retrieval collapses into chaos, overwhelmed by misidentifications and irrelevant matches.

## Filtering: Compliance, Compatibility, Channel Eligibility

Once retrieved, the agent filters products based on compliance, compatibility, and channel eligibility—criteria dictated by hard rules, not soft suggestions. This isn’t about personal preference; it’s about meeting non-negotiable requirements.

Imagine the filtration process at **Profitero**. Here, the manual labeling hours dropped from **140 to ~20** because of high precision and recall in classification stages. The lesson? Autonomous filters outperform when data integrity is respected. If your catalog lacks the required compliance data or compatibility specs, you’re effectively barring products from consideration. Like Voomi Supply’s **multipack mismatch**, missing a specification can mean a hard stop, preventing the product from ever entering the recommendation pool.

## Comparison: Normalized Attributes and Substitutes

In the comparison stage, agents rely on **normalized attributes** to weigh options. They calculate potential substitutes using hard data—dimensions, materials, certifications—not marketing fluff. Here, every inconsistency is a potential failure point.

For **JCPenney**, operating a multi-brand marketplace requires that agent and browse functions align perfectly. This necessitates **taxonomy-aligned** facet keys. A misfiled node? The SKU never makes it into the comparison set. Likewise, if two substitute SKUs are missing attributes, the agent can only rank the fully constrained SKU, sidelining potential alternatives. This mirrors the **200M+ ASIN** filter collapse at Voomi Supply when specs are absent.

## Justification: Provenance-Friendly Facts (Not Marketing Claims)

Agents demand facts they can trace, not marketing hyperbole. They justify recommendations through provenance-friendly data. They ask, "Can I verify this?" instead of "Does this sound appealing?"

It’s a lesson **Profitero** learned well. Their classifiers maintain **>95% precision/recall** because they treat sparse fields as critical, not optional noise. This approach confirms that agents need verifiable data to justify actions. Marketing claims, however compelling, won’t pass the muster when agents need to defend their recommendations.

## What Breaks in Typical Enterprise Catalogs

So why do so many enterprise catalogs fall short? It’s not the AI models; it’s the data feeding them. **Missing attributes**, inconsistent taxonomies, and unverified claims are the usual suspects. They create gaps that agents can’t leap over, leading to missed opportunities and failed recommendations.

Your catalog might look robust on paper, but if your data isn’t structured for retrieval and comparison, it’s as useful as a beautifully wrapped empty box. Misalignment in taxonomy or missing specs means your products never even enter the conversation, let alone get recommended.

## Bridge to [Catalog Agents](/catalog-agents) + Readiness Scorecard

This is where **catalog agents** step in, keeping the underlying intelligence current and precise. They ensure that your catalog doesn’t just look the part but is genuinely ready for AI-driven operations. By continuously updating and verifying data, they remove friction points and improve each cycle’s accuracy.

Consider the compound effect: each time an agent processes your catalog, it gets a little smarter, a little more precise. The result? Over time, every run makes your catalog more accurate. That’s the magic of a system that compounds improvements with each cycle. With a readiness scorecard, you can measure and enhance your catalog’s preparedness, ensuring that it meets the rigorous demands of modern AI agents.
