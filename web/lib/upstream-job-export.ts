import {
  backendHeaders,
  getBackendBeforeAfterPath,
  getBackendDownloadPath,
  getBackendExportReportPath,
} from "@/lib/catalog-agent-server";
import { mergeJobResultPayloads } from "@/lib/job-results-merge";
import { extractItems } from "@/lib/results-to-csv";

function joinBasePath(base: string, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base.replace(/\/+$/, "")}${p}`;
}

async function tryParseJsonResponse(res: Response): Promise<unknown | null> {
  const text = await res.text();
  if (!res.ok) return null;
  const ct = (res.headers.get("content-type") ?? "").toLowerCase();
  if (ct.includes("text/csv") || ct.includes("application/csv")) return null;
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (!(trimmed.startsWith("{") || trimmed.startsWith("["))) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function paginationTotalPages(data: Record<string, unknown>): number {
  const pag = data.pagination;
  if (!pag || typeof pag !== "object" || Array.isArray(pag)) return 1;
  const p = pag as Record<string, unknown>;
  const n = Number(p.total_pages);
  return Number.isFinite(n) && n >= 1 ? n : 1;
}

/**
 * Before/after is paginated (default page_size=10 in OpenAPI). Fetch all pages.
 */
async function fetchBeforeAfterAllPages(
  base: string,
  jobId: string,
  signal: AbortSignal,
  headers: HeadersInit
): Promise<unknown | null> {
  const rawSize = Number(process.env.CATALOG_AGENT_BEFORE_AFTER_PAGE_SIZE);
  const pageSize =
    Number.isFinite(rawSize) && rawSize >= 10 && rawSize <= 5000 ? rawSize : 500;

  const basePath = getBackendBeforeAfterPath(jobId);
  const allRows: Record<string, unknown>[] = [];
  let page = 1;
  let totalPages = 1;

  while (page <= totalPages && page <= 500) {
    let url = joinBasePath(base, basePath);
    const joiner = url.includes("?") ? "&" : "?";
    url = `${url}${joiner}page=${page}&page_size=${pageSize}`;

    const res = await fetch(url, { method: "GET", headers, cache: "no-store", signal });
    const data = await tryParseJsonResponse(res);
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      break;
    }
    const obj = data as Record<string, unknown>;
    totalPages = paginationTotalPages(obj);
    const chunk = extractItems(data);
    if (chunk?.length) {
      allRows.push(...chunk);
    }
    page++;
  }

  if (!allRows.length) return null;
  return { items: allRows, job_id: jobId };
}

/**
 * Fetch primary job JSON + optional before/after JSON, merge into one payload for CSV/JSON download.
 *
 * Priority (OpenAPI v2): GET /api/export/report (full Redis report) → configured download path →
 * GET /api/results/{job_id}. Skips upstream CSV so we prefer rich JSON.
 */
export async function fetchMergedJobExportJson(
  base: string,
  jobId: string,
  signal: AbortSignal
): Promise<{ merged: unknown } | { error: string; status: number }> {
  const headers: HeadersInit = {
    ...backendHeaders(),
    Accept: "application/json, text/json;q=0.9, */*;q=0.1",
  };

  const primaryPaths = [
    getBackendExportReportPath(jobId),
    getBackendDownloadPath(jobId),
    `/api/results/${encodeURIComponent(jobId)}`,
  ];
  const tried = new Set<string>();
  let primary: unknown | null = null;

  for (const path of primaryPaths) {
    const url = joinBasePath(base, path);
    if (tried.has(url)) continue;
    tried.add(url);
    const res = await fetch(url, { method: "GET", headers, cache: "no-store", signal });
    primary = await tryParseJsonResponse(res);
    if (primary !== null) break;
  }

  let beforeAfter: unknown | null = null;
  try {
    beforeAfter = await fetchBeforeAfterAllPages(base, jobId, signal, headers);
  } catch {
    beforeAfter = null;
  }

  if (primary === null && beforeAfter === null) {
    return {
      error:
        "Could not load job results as JSON. Ensure GET /api/export/report?job_id=… or GET /api/results/{job_id} returns JSON (see Swagger).",
      status: 502,
    };
  }

  const merged = mergeJobResultPayloads(primary ?? { items: [] }, beforeAfter);
  return { merged };
}
