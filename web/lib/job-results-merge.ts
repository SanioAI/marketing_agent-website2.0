/**
 * Merge Paladio GET /api/results/{job} with GET /api/results/before-after?job_id=
 * so a single export contains enrichment + comparison data.
 */

import { extractItems } from "@/lib/results-to-csv";

export function rowKey(r: Record<string, unknown>): string {
  const v =
    r.product_id ??
    r.productId ??
    r.id ??
    r.sku ??
    (r.product as Record<string, unknown> | undefined)?.id;
  return v != null && v !== "" ? String(v) : "";
}

/**
 * Merge `items` from primary job payload with optional before/after payload (same job).
 * Primary fields win on key collisions. Rows match by product_id / id / sku, or by index if lengths align.
 */
export function mergeJobResultPayloads(
  primary: unknown,
  beforeAfter: unknown | null
): unknown {
  const items = extractItems(primary) ?? [];
  if (!items.length && !beforeAfter) return primary;

  const baItems = beforeAfter ? extractItems(beforeAfter) ?? [] : [];

  const map = new Map<string, Record<string, unknown>>();
  for (const row of baItems) {
    const k = rowKey(row);
    if (k) map.set(k, row);
  }

  let mergedRows: Record<string, unknown>[];
  if (items.length) {
    mergedRows = items.map((item, i) => {
      const k = rowKey(item);
      const extra = k ? map.get(k) : undefined;
      if (extra) {
        return { ...extra, ...item };
      }
      if (baItems[i] && items.length === baItems.length) {
        return { ...baItems[i]!, ...item };
      }
      return { ...item };
    });
  } else if (baItems.length) {
    mergedRows = baItems.map((r) => ({ ...r }));
  } else {
    return primary;
  }

  if (primary && typeof primary === "object" && !Array.isArray(primary)) {
    const obj = primary as Record<string, unknown>;
    const next = { ...obj };
    if ("items" in obj) next.items = mergedRows;
    else if ("results" in obj) next.results = mergedRows;
    else if ("products" in obj) next.products = mergedRows;
    else if ("data" in obj && obj.data && typeof obj.data === "object" && !Array.isArray(obj.data)) {
      const d = { ...(obj.data as Record<string, unknown>) };
      if ("items" in d) d.items = mergedRows;
      else if ("results" in d) d.results = mergedRows;
      else d.items = mergedRows;
      next.data = d;
    } else {
      next.items = mergedRows;
    }
    return next;
  }

  return { items: mergedRows };
}
