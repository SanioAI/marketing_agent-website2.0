---
title: "How AI Agents Decide Which Products to Recommend (and What Your Catalog Must Provide)"
description: "Retrieve/filter/compare like **Voomi** at **1M+ SKUs / 200M+ ASINs** (where **multipack** + specs collapse candidates), **Profitero** at **>95% P/R** (where sparse fields are model inputs), **JCPenney** Mirakl facets (where taxonomy sets the consideration set)—or agents silently drop SKUs."
tag: "Awareness"
readTime: "12 min read"
pillar: "Catalog Readiness for Agentic Commerce"
keyword: "how AI agents choose products to recommend"
---

Agent “recommendation” is closer to **constraint satisfaction + retrieval** than to merchandising rules: catalogs must supply verifiable facts and relationships. **Catalog readiness** is measured by whether those decisions can be made without hand-waving; **catalog agents** keep the underlying intelligence current.

Merch and marketing assume human-style judgment; they underestimate how aggressively agents filter on missing or conflicting structured data.

## Agents don’t “browse”; they execute tasks  

_Coming soon — full prose in progress._

## Retrieval: identity and embeddings over structured facets  

_Coming soon — full prose in progress._

## Filtering: compliance, compatibility, channel eligibility  

_Coming soon — full prose in progress._

## Comparison: normalized attributes and substitutes  

_Coming soon — full prose in progress._

## Justification: provenance-friendly facts (not marketing claims)  

_Coming soon — full prose in progress._

## What breaks in typical enterprise catalogs  

_Coming soon — full prose in progress._

## Bridge to catalog agents + readiness scorecard

_Coming soon — full prose in progress._

## Proof Points

- **Voomi Supply:** “filter → compare → publish” mirrors agent recommend pipeline—**200M+ ASIN** candidate space collapses only with normalized specs + pack truth; **multipack mismatch** is a hard filter failure.
- **Profitero:** classification stages analogous to agent retrieval—**140 → ~20** manual labeling with **>95% P/R** shows where human-in-loop belongs vs autonomous filters.
- **JCPenney:** multi-brand marketplace—agent/browse consistency requires **taxonomy-aligned** facet keys; misfiled node = SKU never enters comparison set.
- **Failure scenario:** **Missing attributes** on two substitute SKUs → the agent’s compare step can only rank the fully constrained SKU—same failure class as **Voomi**’s **200M+ ASIN** filter collapse when pack or electrical specs are absent at **1M+ SKU** scale, and as **Profitero** classifiers losing **>95% P/R** when sparse fields are treated as optional noise.
