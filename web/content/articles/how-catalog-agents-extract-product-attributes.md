---
title: "How Catalog Agents Extract Product Attributes at SKU Scale"
description: "Attribute Agent extraction = **Voomi** density (**10–15+ attrs**, **1M+ SKUs / 200M+ ASINs**), **Profitero** scoring (**>95% P/R**, **80+ langs**), **JCPenney** Mirakl-safe binds—not PDF toys."
tag: "Consideration"
readTime: "8 min read"
pillar: "Catalog Agents"
keyword: "AI catalog agents extract product attributes"
---

Extraction is not “call an LLM on a PDF”—it is **grounded extraction** with normalization to a target schema, confidence scoring, and human-in-the-loop for edge cases. The **Attribute Agent** sits in a pipeline with taxonomy and compliance constraints so extracted facts are **channel- and agent-safe**.

“PDF to PIM” pilots hallucinate units and never reach **Voomi**-grade throughput: **10–15+ attributes per product** must bind to schema at **1M+ SKU** scale so **200M+ ASIN** candidates stay disambiguated. **Profitero**-style programs fail when extraction cannot be scored to **>95% precision/recall** per channel.**JCPenney** suppliers ship tables that must land as **Mirakl-aligned** facet values—not free-text blobs that break browse.


## Proof Points

- **Voomi Supply:** extraction/normalization density (**10–15+ attributes per product**, per Paladio capability context) is what keeps **1M+ SKUs** matchable against **200M+ ASINs** without humans re-keying supplier sheets.
- **Profitero:** weak supervision + pipelines achieving **>95% precision/recall** across retailer-scale taxonomies—Attribute Agent evaluation must use same rigor.
- **JCPenney:** supplier PDFs → **taxonomy-aligned** attributes for **Mirakl**—failure is wrong browse attribute, not missing hero image.
- **Failure scenario:** extracted text contradicts **pack count** → **multipack mismatch** downstream.
