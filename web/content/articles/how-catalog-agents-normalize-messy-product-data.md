---
title: "How Catalog Agents Normalize Messy Product Data from Hundreds of Suppliers"
description: "Supplier feeds arrive in a hundred different formats. Catalog agents resolve naming collisions, unit inconsistencies, and structural mismatches without a rules library that breaks every time a supplier changes their template."
tag: "Deep Dive"
readTime: "7 min read"
pillar: "Catalog Agents"
keyword: "catalog agents normalize product data"
hub:
  label: "Catalog Agents"
  href: "/catalog-agents"
relatedArticles:
  - title: "What Are Catalog Agents?"
    slug: "what-are-catalog-agents"
    href: "/resources/articles/what-are-catalog-agents"
  - title: "How Catalog Agents Extract Product Attributes"
    slug: "how-catalog-agents-extract-product-attributes"
    href: "/resources/articles/how-catalog-agents-extract-product-attributes"
  - title: "Catalog Agents vs PIM: Same SKUs, Different Jobs"
    slug: "catalog-agents-vs-pim"
    href: "/resources/articles/catalog-agents-vs-pim"
---

Every supplier formats product data differently. One sends an Excel spreadsheet with brand names in all caps. Another sends an XML feed where dimensions are embedded in the title field. A third sends a PDF spec sheet. A fourth uses "N/A" in required fields and "see description" everywhere else.

Your PIM stores all of it faithfully. That's the problem.

Normalization is the job of making that data consistent enough that a channel can act on it and an AI agent can reason about it. It's not a cleanup pass you run once. It's a continuous process that runs every time a supplier feed arrives or a record changes.

## What "messy" actually looks like at scale

At Voomi Supply, products arrive from hundreds of suppliers in the HVAC, industrial, and maintenance categories. Each supplier has their own formatting conventions — some intentional, most not. The normalization problems that appear most frequently across large catalogs are not exotic edge cases. They're the same five failure modes, repeated at volume.

**Brand name collisions.** The same manufacturer appears in supplier feeds as "3M", "3M Company", "3M Co.", "3M Industrial", and "Manufacturer". A channel filter for "3M" returns different subsets depending on which variant is in the record. An AI shopping agent querying for 3M products misses every record that doesn't use the canonical form.

**Unit inconsistencies.** "32 oz", "1 quart", "946 mL", "large", "2 lbs" — all describing the same volume range, none of them matchable against each other without conversion. A buyer filtering for products by volume gets incomplete results. A pricing-per-unit calculation returns wrong numbers.

**Pack geometry mismatches.** "Pack of 10", "Box/10", "10-count", "each (pack)", "10 units" — all potentially meaning the same multipack configuration. Compliance checks can't run correctly when pack quantity is ambiguous.

**Placeholder values in required fields.** "TBD", "See description", "N/A", "Various", "Contact manufacturer" in fields that channels treat as structured data. These pass a completeness check (the field has a value) and fail every downstream validation.

**Structural inconsistencies across suppliers.** Supplier A puts dimensions in a dedicated field. Supplier B embeds them in the title. Supplier C puts them in a notes field. Supplier D doesn't include them at all. The same attribute is in a different place for every supplier — and the structure changes when the supplier updates their template.

## Why rules-based normalization breaks

The traditional approach is to write supplier-specific parsing rules. "If supplier = SupplierA, extract dimensions from field 'notes'. If supplier = SupplierB, parse dimensions from title using regex pattern X."

This works until the supplier changes their template. Then it silently breaks — the rule still runs, but it now extracts nothing or extracts the wrong value. You find out when a listing fails validation.

At Voomi Supply's scale — 1M+ SKUs from hundreds of suppliers — maintaining a rules library that covers every supplier's format variants isn't operationally viable. New suppliers add new formats. Existing suppliers change their exports. A rules library that was complete six months ago has dozens of broken rules today.

## What catalog agents do instead

Catalog agents don't parse by pattern. They understand what data means — which means they can handle format variants without needing a rule for each one.

### Brand normalization

The Brand Normalization Agent maintains a canonical brand registry. When a new record arrives with brand = "3M Co.", the agent looks up "3M Co." against the registry, finds the canonical form "3M", and outputs the corrected record. When a new supplier introduces a brand variant that isn't in the registry yet, the agent flags it for a one-time human confirmation — then adds it to the registry for all future records from that supplier.

The result: your channels see canonical brand names. AI shopping agents filtering by brand get complete results. The registry improves over time instead of degrading.

### Unit resolution

When the agent encounters "32 oz" in a volume field, it converts it to a standard unit for the product category — typically milliliters for liquid products in that category. "1 quart" → 946 mL. "Large" → flagged for human review (no conversion possible without more context). Every record in the catalog expresses volume in the same unit.

This makes filter queries accurate. It makes pricing-per-unit calculations correct. It makes AI agent comparisons possible — the agent can compare a 500 mL product against a 946 mL product because both express volume in the same unit.

### Pack geometry standardization

The compliance check for multipack listings requires a single, unambiguous pack quantity integer. "Pack of 10", "Box/10", "10-count" all resolve to `pack_quantity: 10`. "Each (pack)" gets flagged — it implies a multipack but doesn't give a count. "10 units" resolves to 10 if the product type is an individual unit; it gets flagged if the product type suggests a multipack that could mean 10 packs.

### Placeholder detection and routing

Placeholder values in required fields get caught at ingest. The agent checks for a list of known placeholder strings ("TBD", "N/A", "See description", "Various", "Contact manufacturer", "Please inquire") and flags any record where a required field contains one. Those records route to the enrichment queue — the Attribute Agent fills the field from the product description or spec sheet.

A placeholder that slips into a channel is a listing violation. Catching it at ingest means the violation never reaches the channel.

### Cross-supplier structural alignment

When dimensions are embedded in a title ("6-Inch Round Galvanized Duct Fitting"), the agent extracts them and writes them to the appropriate structured field. The extraction doesn't depend on knowing which supplier sent the record — it depends on understanding what the value means.

This is why the agent handles new supplier formats without new rules. A supplier you've never worked with before sends a feed. The agent reads the feed, understands the data, and produces a normalized record. The only time a human needs to intervene is when the source data is genuinely ambiguous — not when the format is unfamiliar.

> **At Voomi Supply, the shift from manual supplier-specific review to agent-based normalization was the step that made 1M+ SKU scale operationally viable. The agents handled format variance; humans handled genuine ambiguity.**

## What normalization enables downstream

Clean, normalized data isn't valuable on its own. It's valuable because of what it allows downstream systems to do correctly.

- **Compliance Agent** can run multipack and hazmat checks accurately when pack geometry is unambiguous
- **Taxonomy Agent** can classify products correctly when brand and product type are canonical
- **Channel Matching Agent** can match to Amazon ASINs when brand, GTIN, and model number are consistent
- **AI shopping agents** can filter and compare products when attributes are in standard units and structured fields

Normalization is the layer that makes every other agent's output reliable. A compliance check run on ambiguous pack data produces ambiguous results. A taxonomy classification run on an uncorrected brand name may land in the wrong manufacturer-specific node.

The agents are sequential. Normalization runs first — and the quality of everything after it depends on getting normalization right.

Explore the full catalog agent stack → [Catalog Agents](/catalog-agents)
