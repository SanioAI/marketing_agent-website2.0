---
title: "Product Graph vs Taxonomy vs Knowledge Graph: A Clear Taxonomy for “Graph” Confusion"
description: "Taxonomy ≠ product graph: **Voomi** needed subgraph edges for **1M+ SKUs**, **~85% publish**; **Profitero** needs constrained subgraphs for **>95% P/R** across **1500+ marketplaces**; **JCPenney** Mirakl vs MDM trees—commerce graph first."
tag: "Consideration"
readTime: "6 min read"
pillar: "Product Graph / Compatibility / Substitutions"
keyword: "product graph vs taxonomy"
---

## Why the Terminology Collision Hurts Buying Decisions

In the fast-paced world of ecommerce, the terms "product graph," "taxonomy," and "knowledge graph" often get tossed around interchangeably, creating a tangled web of confusion that hinders effective decision-making. For companies managing vast catalogs, choosing the right data structure is not a trivial decision—it impacts operational efficiency and ultimately, revenue. The confusion around these terms can lead to misguided investments, wasted resources, and suboptimal performance. Understanding the distinct roles each of these data structures plays is crucial for aligning your ecommerce strategy with your business goals.

## Taxonomy: Hierarchy and Browse Paths

At its core, a taxonomy is a hierarchical structure that classifies items, providing clear browse paths for users. It’s an essential tool in ecommerce for categorization, enabling customers to navigate through product categories with ease. However, taxonomies fall short when dealing with complex relationships and constraints that go beyond simple categorization. For instance, Voomi Supply found that relying solely on taxonomy browse paths was inadequate for encoding multipack, ASIN family, and compatibility constraints. In their case, implementing graph edges was instrumental in achieving an ~85% improvement in publish-time for over 1 million SKUs. This showcases that while taxonomies are foundational, they cannot stand alone in complex ecommerce environments.

## Product Graph: SKU-SKU and SKU-Model Relationships for Transactions

A product graph is a network that connects SKUs with their operational relationships, focusing on transactions. Unlike taxonomies, product graphs are designed to capture the dynamic relationships between products, such as compatibility and multipack configurations. They enable businesses to model intricate relationships that are critical for transaction accuracy. For JCPenney, reconciling Mirakl browse taxonomy with their internal MDM tree was essential for creating a commerce product graph that supports transactions. This reconciled subgraph ensures that products are accurately represented, reducing friction in the purchasing process. In essence, a product graph is a streamlined approach focused on the essentials of commerce, offering a more agile solution for transaction-driven processes.

## Knowledge Graph: Broader Entities, Often Overkill Without Commerce Subgraph Discipline

Knowledge graphs are expansive, incorporating a wide range of entities beyond SKUs and transactions. They aim to provide a comprehensive view of an enterprise’s data landscape. However, without a disciplined focus on commerce-critical subgraphs, knowledge graphs can become bloated and unwieldy, often leading to what some call "ontology theater." This scenario may sound impressive, but it does not translate into tangible ecommerce wins. Profitero’s experience, dealing with 1500+ marketplaces across 80+ languages, highlights the need for a transaction subgraph, rather than relying solely on broad ontology structures. Their approach to normalization and classification yielded over 95% precision/recall and reduced manual labeling from 140 to about 20 hours, demonstrating the practical advantages of a commerce-focused graph.

## What to Build First for Parts and Large Catalogs

For businesses managing extensive catalogs, the decision of what to build first can be pivotal. Starting with a product graph is often the most strategic choice, particularly for parts and large SKU inventories. It allows for the development of fitment-grade edges that ensure accuracy in transactions, addressing compatibility gaps that can plague enterprise-wide knowledge graphs. This approach is not only more practical but also more aligned with the immediate needs of ecommerce operations.

In the end, understanding "product graph vs taxonomy" is not just a semantic exercise—it's about choosing the right tool for the job. While taxonomies provide structure, product graphs offer the transactional clarity needed for operational success. By prioritizing a product graph, businesses can focus on commerce-critical subgraphs, achieving a balance between comprehensive data management and efficient ecommerce operations. This strategic focus is what sets apart successful ecommerce enterprises in an increasingly competitive landscape.