---
title: 'What Is a Product Graph? Relationships, Not Just Rows'
description: >-
  Product graph = transaction edges (fitment, substitutes, OEM)—what **Voomi**
  needed at **1M+ SKUs / 200M+ ASINs**, what **Profitero**’s normalized
  identities enable at **>95% P/R** scale, and what **JCPenney Mirakl** families
  need beyond category trees.
tag: Awareness
readTime: 6 min read
pillar: Product Graph / Compatibility / Substitutions
keyword: what is a product graph
hub:
  label: Product Graph
  href: /product-graph
relatedArticles:
  - title: Product Graph vs Taxonomy vs Knowledge Graph
    slug: product-graph-vs-taxonomy-vs-knowledge-graph
    href: /resources/articles/product-graph-vs-taxonomy-vs-knowledge-graph
  - title: Product Compatibility Fitment Explained
    slug: product-compatibility-fitment-explained
    href: /resources/articles/product-compatibility-fitment-explained
  - title: Product Graph Blueprint
    slug: product-graph-blueprint-parts-accessories
    href: /resources/articles/product-graph-blueprint-parts-accessories
---

## Understanding the Complexity of Product Data

In the world of ecommerce and distribution, product data is seldom just a collection of rows in a spreadsheet. The intricate relationships between products demand a more sophisticated approach, one that ensures recommendations are both accurate and constraint-safe. This is where the concept of a **product graph** comes into play—a solution to the limitations of traditional flat data tables.

## Defining Nodes and Edges in a Product Graph

A product graph is not merely a fancy term for a taxonomy. It represents a dynamic network of SKU relationships, capturing connections such as compatibility, substitution, bundling, and the crucial OEM-to-aftermarket mapping. In this graph, nodes represent individual SKUs, while edges define the relationships between them. These edges are pivotal for ecommerce systems, enabling them to make intelligent, context-aware decisions.

Consider the complex ecosystem of HVAC products managed by Voomi Supply. With over **1 million SKUs**, relying on flat attribute tables would be chaotic and error-prone. Instead, Voomi Supply utilizes a product graph, which allows them to safely navigate over **200 million ASIN operations**. This approach ensures that compatibility and substitution edges are consistently maintained, reducing the risk of recommending incorrect products.

## Commerce-Specific Edge Types

In ecommerce, certain edge types are crucial for maintaining data integrity and enhancing user experience. Compatibility edges ensure that products work together, substitution edges offer alternatives, and bundling edges create valuable product packages. The OEM↔aftermarket mapping is another critical relationship, particularly for industries dealing with parts and components that need precise fitment.

Profitero’s experience underscores the importance of these relationships. By normalizing SKU facts across **1000+ brands** and **1500+ marketplaces**, Profitero establishes a dense, accurate layer of attributes and identity. This foundational data is essential before compatibility and OEM edges can be trusted to deliver **>95% precision/recall** at scale. Without this groundwork, ecommerce systems risk recommending incompatible or incorrect products, leading to customer dissatisfaction and increased return rates.

## An Agent Scenario: The Power of Graphs

Imagine a product recommendation agent operating without a product graph. It might suggest a motor SKU without realizing the lack of compatibility due to a missing OEM↔aftermarket link. Such a scenario is not merely hypothetical; it leads to real-world consequences, as seen with JCPenney. Their use of Mirakl and SFCC programs revealed that incorrect bundle or family behaviors occur when marketplace variant trees disagree with supplier pack or OEM facts. Here, taxonomy alignment serves as the reconciliation surface for these vital edges.

With a product graph, the agent can intelligently navigate these relationships, ensuring that recommendations are accurate and reflective of the latest data. This capability is especially important in maintaining the integrity of SKU relationships as they evolve.

## The Limitations of Flat Attribute Tables

Flat attribute tables fall short when dealing with the complexities of modern ecommerce data. They lack the ability to capture nuanced relationships and are often static, unable to adapt to changes in product data. In contrast, a product graph is dynamic, allowing edges to be updated as new evidence becomes available.

The impact is clear: reliance on flat tables can lead to costly errors and inefficiencies. Voomi Supply’s transition to a product graph resulted in substantial improvements, such as **publish-time reduction** by approximately 85% and a decrease in labeling hours from 140 to 20. These metrics highlight the transformative power of embracing graph-based data models.

## What This Means for Your Catalog

For ecommerce and distribution companies, adopting a product graph is not just a technical upgrade; it’s a strategic necessity. By leveraging the intricate relationships captured in a graph, businesses can deliver more accurate recommendations, reduce return rates, and enhance overall customer satisfaction. As product data becomes increasingly complex, the ability to maintain and update these relationships will be a key differentiator.

Incorporating a product graph into your catalog management strategy can lead to more efficient operations, better compliance with marketplace requirements, and ultimately, a stronger competitive edge in the marketplace. The future of ecommerce is not just about selling products; it’s about understanding and navigating the rich tapestry of product relationships.
