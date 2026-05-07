---
title: "What Is a Product Graph? Relationships, Not Just Rows"
description: "Product graph = transaction edges (fitment, substitutes, OEM)—what **Voomi** needed at **1M+ SKUs / 200M+ ASINs**, what **Profitero**’s normalized identities enable at **>95% P/R** scale, and what **JCPenney Mirakl** families need beyond category trees."
tag: "Awareness"
readTime: "7 min read"
pillar: "Product Graph / Compatibility / Substitutions"
keyword: "what is a product graph"
---

A **product graph** is the explicit network of SKU relationships—compatibility, substitution, bundling, OEM↔aftermarket mapping—that agents and search need for **constraint-safe recommendations**. It is not a synonym for taxonomy; the **Product Graph Agent** maintains edges under evidence and change.

“Graph” is buzzworded; leaders want a plain definition and why it beats spreadsheets of fitment.


## Proof Points

- **Voomi Supply (HVAC):** **substitutes, compatibility, OEM** graph edges per `research/paladio-case-context.md`—why **1M+ SKUs** required graph, not flat attributes, before **200M+ ASIN** operations stayed safe.
- **Profitero:** normalized SKU facts across **1000+ brands** / **1500+ marketplaces**—dense, accurate **attributes + identity** are the prerequisite layer before **compatibility / OEM** edges can be trusted at **>95% precision/recall** scale.
- **JCPenney:** **Mirakl + SFCC** programs ship wrong bundle/family behavior when marketplace variant trees disagree with supplier pack/OEM facts—**taxonomy alignment** is the reconciliation surface those edges must attach to.
- **Failure scenario:** **compatibility gap** (missing OEM↔aftermarket link) → agent recommends wrong motor SKU → return.
