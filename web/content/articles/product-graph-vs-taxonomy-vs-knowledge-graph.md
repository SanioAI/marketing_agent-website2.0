---
title: >-
  Product Graph vs Taxonomy vs Knowledge Graph: A Clear Taxonomy for “Graph”
  Confusion
description: >-
  Taxonomy ≠ product graph: **Voomi** needed subgraph edges for **1M+ SKUs**,
  **~85% publish**; **Profitero** needs constrained subgraphs for **>95% P/R**
  across **1500+ marketplaces**; **JCPenney** Mirakl vs MDM trees—commerce graph
  first.
tag: Consideration
readTime: 6 min read
pillar: Product Graph / Compatibility / Substitutions
keyword: product graph vs taxonomy
hub:
  label: Product Graph
  href: /product-graph
relatedArticles:
  - title: What Is a Product Graph?
    slug: what-is-a-product-graph
    href: /resources/articles/what-is-a-product-graph
  - title: Product Compatibility Fitment Explained
    slug: product-compatibility-fitment-explained
    href: /resources/articles/product-compatibility-fitment-explained
  - title: Product Graph Blueprint
    slug: product-graph-blueprint-parts-accessories
    href: /resources/articles/product-graph-blueprint-parts-accessories
---

## Why the terminology collision hurts buying decisions

You think it's about picking the right tool. It's not. It's about understanding what those tools actually do. When every vendor slide starts with “graph,” you're left wondering which one fits your needs. But here's the catch: not all graphs are created equal. You might assume that a **knowledge graph** will solve all your ecommerce challenges, but that's not the real issue. The real problem is knowing when a **product graph** serves your specific commerce needs better than a broad, all-encompassing **knowledge graph**. Without this clarity, you end up chasing unnecessary complexity, stalling your ecommerce progress.

## Taxonomy: hierarchy and browse paths

You might lean on taxonomy as your go-to solution for organizing product data. It feels intuitive. Taxonomies offer a structured, hierarchical way to categorize your SKUs—a necessity for ensuring that your products are easy to find and browse. However, they fall short when faced with the operational constraints of ecommerce. A taxonomy is static; it offers **hierarchy** but lacks the dynamic relationships that commerce demands. For instance, Voomi Supply found that its taxonomy trees alone couldn't handle the complexity of **multipack relationships** or **ASIN family** connections, which are critical for maintaining that **~85% publish-time** improvement with **1M+ SKUs**.

## Product graph: SKU-SKU and SKU-model relationships for transactions

You think a taxonomy is enough, but it's not. A **product graph** is what truly drives transactions. A product graph connects the dots between SKUs and models, forming the operational backbone of your ecommerce site. Unlike a taxonomy, it can encode complex relationships that matter at the point of transaction. For ecommerce, these relationships are crucial: **compatibility**, **multipack assemblies**, and **ASIN matching**. Profitero, for example, operates across **1500+ marketplaces** in **80+ languages**. Their success—**>95% precision/recall** and a reduction from **140 to ~20 manual labeling hours**—isn't just from taxonomy but from a robust **transaction subgraph** that handles these complexities seamlessly.

## Knowledge graph: broader entities, often overkill without commerce subgraph discipline

You might think a **knowledge graph** is the ultimate solution—a single, elegant framework for everything. But here's where it misleads you: without a focus on commerce-specific subgraphs, a knowledge graph becomes unwieldy. It tries to encompass all entities, but in doing so, it dilutes focus and relevance for ecommerce. The danger is clear: enterprise KGs often suffer from a **compatibility gap**, failing to answer essential commerce questions like “will it fit?” This is where JCPenney found themselves when their **Mirakl** browse taxonomy diverged from internal MDM structures. They needed a **product graph** to reconcile these differences and focus on transactions.

## What to build first for parts and large catalogs

You think you need to choose between a taxonomy or a knowledge graph. In reality, you should start with a **product graph** if you deal with complex parts or large catalogs. This approach addresses the real-world challenges of ecommerce, like **compatibility** and **SKU relationships**, right from the start. Voomi Supply's experience shows that taxonomy alone isn’t enough; they needed a **commerce subgraph** to keep their **~85% publish-time** gains at **1M+ SKU** scale. Similarly, Profitero's success in normalizing **1500+ marketplaces** underlines the importance of investing in a **transaction subgraph**, not just browsing trees. This path ensures that your system evolves with your needs, providing a framework that compounds accuracy over time, improving with every cycle.
