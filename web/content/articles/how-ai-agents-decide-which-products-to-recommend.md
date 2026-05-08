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

In the bustling world of ecommerce, the assumption that AI agents mimic human browsing habits is not just outdated, but detrimental. These agents are task-driven, executing precise actions based on structured data rather than subjective judgment. The journey from product recommendation to transaction is a methodical process of constraint satisfaction and retrieval, demanding more than just an intuitive merchandise display.

## Retrieval: Identity and Embeddings over Structured Facets

At the heart of an AI agent’s decision-making is the retrieval process. It’s not about leisurely browsing through options but identifying products through structured facets and embeddings. For instance, Profitero's classification stages demonstrate this rigor—transitioning from 140 hours of manual labeling to just 20 with more than 95% precision and recall. This highlights the importance of having well-defined attributes and embeddings that allow agents to efficiently sift through massive datasets.

## Filtering: Compliance, Compatibility, Channel Eligibility

Once relevant products are retrieved, they face the stringent filtering stage. Agents assess compliance with regulatory standards, compatibility with existing systems, and eligibility for specific channels. This is where structured data's completeness becomes crucial. Voomi Supply's experience with a 200M+ ASIN candidate space collapsing to a manageable size illustrates the necessity for normalized specs and pack truth. A single multipack mismatch can lead to a complete filter failure, emphasizing how critical it is to maintain data integrity.

## Comparison: Normalized Attributes and Substitutes

After filtering, agents enter the comparison stage. Here, normalized attributes allow for a fair evaluation of substitutes, ensuring that products are accurately ranked according to consumer needs. A failure scenario is all too common: missing attributes on substitute SKUs force the agent to rank only the fully constrained SKU. This mirrors the collapse seen in Voomi's pipeline when essential specs are absent, and Profitero's classifiers lose accuracy when fields are treated as optional.

## Justification: Provenance-Friendly Facts (Not Marketing Claims)

In the justification phase, agents rely on provenance-friendly facts rather than marketing claims to support their recommendations. This factual approach ensures transparency and builds consumer trust. JCPenney's experience in a multi-brand marketplace shows the necessity for taxonomy-aligned facet keys. Misfiled nodes can prevent SKUs from entering the comparison set, highlighting how crucial structured, factual data is for maintaining consistency across marketplaces.

## What Breaks in Typical Enterprise Catalogs

Despite the best intentions, many enterprise catalogs fall short in supporting AI-driven recommendations. Missing attributes, incompatible formats, and misaligned taxonomies lead to breakdowns across the decision pipeline. For instance, Voomi Supply's and Profitero's challenges underscore the importance of completeness and accuracy in structured data, where even sparse fields can lead to significant failures.

## Bridge to [Catalog Agents](/catalog-agents) + Readiness Scorecard

To overcome these challenges, ecommerce companies must embrace catalog agents and readiness scorecards. These tools continuously update and validate catalog data, ensuring that all attributes are complete, accurate, and aligned with marketplace requirements. A readiness scorecard can help identify gaps in catalog data, providing a clear path to improvement and ensuring that AI agents can make informed, precise recommendations without the risk of hand-waving or data omission.

## What This Means for Your Catalog

For businesses aiming to leverage AI agents effectively, the focus must shift to ensuring [catalog readiness](/catalog-readiness). This involves a thorough audit of existing data, aligning it with structured facets, and continuously updating it to adapt to marketplace changes. By addressing these readiness gaps, companies can unlock the full potential of AI agents, transforming their ecommerce strategy from guesswork to precision-driven success.
