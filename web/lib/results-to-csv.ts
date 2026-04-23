function escapeCsvCell(v: unknown): string {
  if (v === null || v === undefined) return "";
  const s = typeof v === "string" ? v : JSON.stringify(v);
  const needs = /[",\n\r]/.test(s);
  const out = s.replace(/"/g, '""');
  return needs ? `"${out}"` : out;
}

function toCsv(rows: Record<string, unknown>[]): string {
  const headerSet = new Set<string>();
  for (const r of rows) {
    Object.keys(r).forEach((k) => headerSet.add(k));
  }
  const headers = Array.from(headerSet);
  const lines: string[] = [];
  lines.push(headers.map(escapeCsvCell).join(","));
  for (const r of rows) {
    lines.push(headers.map((h) => escapeCsvCell(r[h])).join(","));
  }
  return lines.join("\n");
}

/** Serialize nested API values for a single spreadsheet cell. */
function cellValue(v: unknown): string {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return JSON.stringify(v);
}

const MAX_FLATTEN_DEPTH = 14;

/**
 * Flatten nested objects to dotted column names (e.g. seo.meta_title, before.title).
 * Arrays are kept as one JSON string per key (e.g. faqs).
 */
function flattenObjectDeep(
  obj: Record<string, unknown>,
  prefix = "",
  depth = 0
): Record<string, string> {
  const out: Record<string, string> = {};
  if (depth > MAX_FLATTEN_DEPTH) {
    out[prefix || "value"] = cellValue(obj);
    return out;
  }
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v === null || v === undefined) {
      out[key] = "";
    } else if (Array.isArray(v)) {
      out[key] = JSON.stringify(v);
    } else if (typeof v === "object") {
      Object.assign(
        out,
        flattenObjectDeep(v as Record<string, unknown>, key, depth + 1)
      );
    } else {
      out[key] = cellValue(v);
    }
  }
  return out;
}

function flattenItemToRow(it: Record<string, unknown>): Record<string, unknown> {
  return flattenObjectDeep(it) as Record<string, unknown>;
}

/**
 * Resolve the list of row objects from various Paladio / OpenAPI response shapes.
 */
export function extractItems(json: unknown): Record<string, unknown>[] | null {
  if (!json || typeof json !== "object") return null;
  if (Array.isArray(json)) {
    if (json.length === 0) return [];
    return json.every((x) => x && typeof x === "object")
      ? (json as Record<string, unknown>[])
      : null;
  }
  const obj = json as Record<string, unknown>;
  const directArrays = [obj.items, obj.results, obj.products];
  for (const arr of directArrays) {
    if (Array.isArray(arr) && arr.every((x) => x && typeof x === "object")) {
      return arr as Record<string, unknown>[];
    }
  }
  const data = obj.data;
  if (data && typeof data === "object" && !Array.isArray(data)) {
    const d = data as Record<string, unknown>;
    for (const key of ["items", "results", "products"]) {
      const arr = d[key];
      if (Array.isArray(arr) && arr.every((x) => x && typeof x === "object")) {
        return arr as Record<string, unknown>[];
      }
    }
  }

  for (const nestKey of ["report", "export", "payload", "result"] as const) {
    const nest = obj[nestKey];
    if (nest && typeof nest === "object" && !Array.isArray(nest)) {
      const inner = extractItems(nest);
      if (inner !== null && inner.length > 0) return inner;
    }
  }

  let best: Record<string, unknown>[] | null = null;
  let bestLen = 0;
  for (const v of Object.values(obj)) {
    if (!Array.isArray(v) || v.length === 0) continue;
    if (!v.every((x) => x && typeof x === "object" && !Array.isArray(x))) continue;
    const row = v[0] as Record<string, unknown>;
    const looksProduct =
      row.product_id != null ||
      row.productId != null ||
      row.sku != null ||
      row.optimized_title != null ||
      row.title != null;
    if (looksProduct && v.length >= bestLen) {
      best = v as Record<string, unknown>[];
      bestLen = v.length;
    }
  }
  if (best) return best;

  return null;
}

/**
 * Converts Paladio job results JSON into a download-ready CSV with **all** fields per row.
 * Use the full results endpoint (e.g. GET /api/results/{job_id}), not the slim `products` projection,
 * so FAQs, SEO, before/after, compliance, etc. appear as columns (nested values as JSON strings).
 */
export function productResultsJsonToCsv(json: unknown): {
  csv: string;
  rows: number;
} {
  const items = extractItems(json);
  if (!items) {
    return { csv: toCsv([]), rows: 0 };
  }
  const rows = items.map((it) => flattenItemToRow(it));
  return { csv: toCsv(rows), rows: rows.length };
}
