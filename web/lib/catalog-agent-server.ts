/**
 * Server-only: upstream Paladio Catalog API (see http://13.218.58.17/ — Swagger at /docs).
 * Used by app/api/catalog-agent/* route handlers. Do not import from client components.
 */

function trimSlash(s: string) {
  return s.replace(/\/+$/, "");
}

export function getCatalogBackendBaseUrl(): string | null {
  const raw = process.env.CATALOG_AGENT_BACKEND_URL?.trim();
  if (!raw) return null;
  const base = trimSlash(raw);
  if (base.startsWith("http://") || base.startsWith("https://")) return base;
  return trimSlash(`http://${raw}`);
}

export function expandPathTemplate(template: string, jobId: string): string {
  const path = template.split(":jobId").join(encodeURIComponent(jobId));
  return path.startsWith("/") ? path : `/${path}`;
}

export function backendHeaders(): HeadersInit {
  const headers: Record<string, string> = {};
  const apiKey = process.env.CATALOG_AGENT_API_KEY;
  if (apiKey) {
    headers["X-API-Key"] = apiKey;
  }
  const user = process.env.CATALOG_AGENT_BASIC_AUTH_USER;
  const pass = process.env.CATALOG_AGENT_BASIC_AUTH_PASSWORD;
  if (user && pass) {
    const token = Buffer.from(`${user}:${pass}`, "utf8").toString("base64");
    headers["Authorization"] = `Basic ${token}`;
  }
  return headers;
}

export function getBackendUploadPath(): string {
  // Backend OpenAPI: POST /api/csv/start
  return process.env.CATALOG_AGENT_BACKEND_UPLOAD_PATH ?? "/api/csv/start";
}

export function getBackendStatusPath(jobId: string): string {
  // Backend OpenAPI: GET /api/progress/{job_id}
  const t = process.env.CATALOG_AGENT_BACKEND_STATUS_PATH ?? "/api/progress/:jobId";
  return expandPathTemplate(t, jobId);
}

export function getBackendDownloadPath(jobId: string): string {
  // Full job payload (FAQs, SEO, before/after, etc.) — same family as GET /api/results/{job_id} in Swagger.
  // Use /api/results/products?job_id=:jobId only if you intentionally want the slim “products” projection.
  const t =
    process.env.CATALOG_AGENT_BACKEND_DOWNLOAD_PATH ?? "/api/results/:jobId";
  return expandPathTemplate(t, jobId);
}

/** Backend OpenAPI: POST /api/pdp/start */
export function getBackendPdpStartPath(): string {
  return process.env.CATALOG_AGENT_BACKEND_PDP_PATH ?? "/api/pdp/start";
}

/** GET before/after comparison JSON merged into unified exports */
export function getBackendBeforeAfterPath(jobId: string): string {
  const t =
    process.env.CATALOG_AGENT_BACKEND_BEFORE_AFTER_PATH ??
    "/api/results/before-after?job_id=:jobId";
  return expandPathTemplate(t, jobId);
}

/**
 * Full job report from Redis (OpenAPI: GET /api/export/report?job_id=…).
 * Richer than GET /api/results/products — includes content, FAQs, SEO sheets data, etc.
 */
export function getBackendExportReportPath(jobId: string): string {
  const t =
    process.env.CATALOG_AGENT_BACKEND_EXPORT_REPORT_PATH ??
    "/api/export/report?job_id=:jobId";
  return expandPathTemplate(t, jobId);
}

/**
 * Multi-sheet enriched workbook (OpenAPI: GET /api/export/xlsx?job_id=…).
 * Layout: Overview, per-taxonomy sheets, Content (before/after + SEO keywords), FAQs (one row per FAQ).
 */
export function getBackendExportXlsxPath(jobId: string): string {
  const t =
    process.env.CATALOG_AGENT_BACKEND_EXPORT_XLSX_PATH ??
    "/api/export/xlsx?job_id=:jobId";
  return expandPathTemplate(t, jobId);
}
