/**
 * Catalog Agent API — wire your backend here.
 *
 * Next.js exposes only variables prefixed with `NEXT_PUBLIC_` to the browser.
 * Map your backend concepts to these names:
 *
 * | Concept                         | Environment variable                              |
 * |--------------------------------|---------------------------------------------------|
 * | CATALOG_AGENT_API_URL          | NEXT_PUBLIC_CATALOG_AGENT_API_URL                 |
 * | CATALOG_AGENT_UPLOAD_ENDPOINT  | NEXT_PUBLIC_CATALOG_AGENT_UPLOAD_ENDPOINT         |
 * | CATALOG_AGENT_PDP_START        | NEXT_PUBLIC_CATALOG_AGENT_PDP_START_ENDPOINT      |
 * | CATALOG_AGENT_STATUS_ENDPOINT  | NEXT_PUBLIC_CATALOG_AGENT_STATUS_ENDPOINT         |
 * | CATALOG_AGENT_DOWNLOAD_ENDPOINT| NEXT_PUBLIC_CATALOG_AGENT_DOWNLOAD_ENDPOINT       |
 *
 * Recommended: set `NEXT_PUBLIC_CATALOG_AGENT_API_URL=/api/catalog-agent` and
 * `CATALOG_AGENT_BACKEND_URL` (server-only, e.g. http://13.218.58.17) so the Next.js
 * proxy in `app/api/catalog-agent/*` handles CORS and optional Basic auth — see
 * `lib/catalog-agent-server.ts` and `.env.example`.
 *
 * Path templates may include `:jobId` which is replaced at runtime (e.g. `/jobs/:jobId/status`).
 *
 * Optional:
 * - NEXT_PUBLIC_CATALOG_AGENT_FILE_FIELD — FormData field name for the file (default: `file`)
 * - NEXT_PUBLIC_CATALOG_AGENT_POLL_MS — status poll interval (default: 2000)
 * - NEXT_PUBLIC_CATALOG_AGENT_MAX_POLL_MS — stop polling after this (default: 300000)
 * - NEXT_PUBLIC_CATALOG_AGENT_MAX_FILE_BYTES — max upload size (default: 5MB)
 */

function trimSlash(s: string) {
  return s.replace(/\/+$/, "");
}

function envNum(key: string, fallback: number) {
  const v = process.env[key];
  if (v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export const catalogAgentConfig = {
  /** Base URL only, e.g. https://api.yourcompany.com — no trailing slash required */
  apiBaseUrl: trimSlash(process.env.NEXT_PUBLIC_CATALOG_AGENT_API_URL ?? ""),

  /** Proxy path for CSV start (e.g. /upload → POST .../upload) */
  uploadEndpoint: process.env.NEXT_PUBLIC_CATALOG_AGENT_UPLOAD_ENDPOINT ?? "/upload",

  /** Proxy path for PDP URL start (e.g. /pdp/start → POST .../pdp/start) */
  pdpStartEndpoint: process.env.NEXT_PUBLIC_CATALOG_AGENT_PDP_START_ENDPOINT ?? "/pdp/start",

  /** Poll URL template; use :jobId placeholder. Default: /catalog/jobs/:jobId/status */
  statusEndpointTemplate:
    process.env.NEXT_PUBLIC_CATALOG_AGENT_STATUS_ENDPOINT ?? "/catalog/jobs/:jobId/status",

  /** GET enriched file; :jobId placeholder. Default: /catalog/jobs/:jobId/download */
  downloadEndpointTemplate:
    process.env.NEXT_PUBLIC_CATALOG_AGENT_DOWNLOAD_ENDPOINT ?? "/catalog/jobs/:jobId/download",

  fileFieldName: process.env.NEXT_PUBLIC_CATALOG_AGENT_FILE_FIELD ?? "file",

  pollIntervalMs: envNum("NEXT_PUBLIC_CATALOG_AGENT_POLL_MS", 2000),
  maxPollMs: envNum("NEXT_PUBLIC_CATALOG_AGENT_MAX_POLL_MS", 300_000),
  maxFileBytes: envNum("NEXT_PUBLIC_CATALOG_AGENT_MAX_FILE_BYTES", 5 * 1024 * 1024),

  /** JSON paths for flexible response shapes (dot segments). Adjust if your API differs. */
  jsonPaths: {
    jobId: ["jobId", "job_id", "id", "data.jobId", "data.id"] as const,
    status: ["status", "state", "data.status"] as const,
    downloadUrl: ["downloadUrl", "download_url", "url", "data.downloadUrl"] as const,
    rowsProcessed: ["rowsProcessed", "rows_processed", "data.rowsProcessed"] as const,
    fieldsEnriched: ["fieldsEnriched", "fields_enriched", "data.fieldsEnriched"] as const,
    errorMessage: ["error", "message", "detail", "data.error"] as const,
  },
} as const;

export function isCatalogAgentConfigured(): boolean {
  return catalogAgentConfig.apiBaseUrl.length > 0;
}

export function resolveUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  const base = catalogAgentConfig.apiBaseUrl;
  const path = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;
  return `${base}${path}`;
}

export function resolveTemplate(template: string, jobId: string): string {
  return template.split(":jobId").join(encodeURIComponent(jobId));
}
