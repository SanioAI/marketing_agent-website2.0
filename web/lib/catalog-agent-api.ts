import { catalogAgentConfig, resolveTemplate, resolveUrl } from "@/lib/catalog-agent-config";
import { extractPipelineFromProgressJson } from "@/lib/catalog-agent-pipeline";
import type {
  StatusPollResult,
  UploadCatalogResponse,
} from "@/lib/catalog-agent-types";

function getByPath(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || cur === undefined || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return cur;
}

function firstString(obj: unknown, paths: readonly string[]): string | undefined {
  for (const path of paths) {
    const v = getByPath(obj, path);
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return undefined;
}

function firstNumber(obj: unknown, paths: readonly string[]): number | undefined {
  for (const path of paths) {
    const v = getByPath(obj, path);
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (typeof v === "string" && v.trim() && !Number.isNaN(Number(v))) return Number(v);
  }
  return undefined;
}

function normalizeStatus(s: string): StatusPollResult["normalized"] {
  const x = s.toLowerCase();
  if (
    x === "complete" ||
    x === "completed" ||
    x === "success" ||
    x === "succeeded" ||
    x === "done"
  ) {
    return "complete";
  }
  if (x === "failed" || x === "error" || x === "cancelled" || x === "canceled") {
    return "failed";
  }
  if (x === "pending" || x === "queued" || x === "waiting") {
    return "pending";
  }
  return "processing";
}

function filenameFromContentDisposition(cd: string | null): string | undefined {
  if (!cd) return undefined;
  const m = /filename\*?=(?:UTF-8''|")?([^";\n]+)/i.exec(cd);
  if (m?.[1]) return decodeURIComponent(m[1].replace(/"/g, "").trim());
  return undefined;
}

/**
 * POST multipart upload. Supports:
 * - Sync: response body is CSV (or octet-stream) → returns blob + optional filename
 * - Async: JSON with job id → returns jobId for polling
 */
export async function uploadCatalog(file: File, signal?: AbortSignal): Promise<UploadCatalogResponse> {
  const { apiBaseUrl, uploadEndpoint, fileFieldName } = catalogAgentConfig;
  if (!apiBaseUrl) {
    throw new Error("API_NOT_CONFIGURED");
  }

  const url = resolveUrl(uploadEndpoint);
  const form = new FormData();
  form.append(fileFieldName, file, file.name);

  const res = await fetch(url, {
    method: "POST",
    body: form,
    signal,
    credentials: "omit",
  });

  const ct = res.headers.get("content-type") ?? "";

  if (res.ok && (ct.includes("text/csv") || ct.includes("application/csv") || ct.includes("octet-stream"))) {
    const blob = await res.blob();
    const name =
      filenameFromContentDisposition(res.headers.get("content-disposition")) ??
      `enriched-${file.name.replace(/\.csv$/i, "")}-paladio.csv`;
    return { mode: "sync", blob, filenameHint: name };
  }

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    const msg =
      json && typeof json === "object" && json !== null
        ? firstString(json, catalogAgentConfig.jsonPaths.errorMessage)
        : undefined;
    throw new Error(msg || `UPLOAD_${res.status}`);
  }

  if (!json || typeof json !== "object") {
    throw new Error("INVALID_UPLOAD_RESPONSE");
  }

  const jobId = firstString(json, catalogAgentConfig.jsonPaths.jobId);
  const immediateDownload = firstString(json, catalogAgentConfig.jsonPaths.downloadUrl);

  if (immediateDownload && !jobId) {
    const r = await fetch(immediateDownload, { signal, credentials: "omit" });
    if (!r.ok) throw new Error(`UPLOAD_${r.status}`);
    const blob = await r.blob();
    const name =
      filenameFromContentDisposition(r.headers.get("content-disposition")) ??
      `enriched-${file.name.replace(/\.csv$/i, "")}-paladio.csv`;
    return { mode: "sync", blob, filenameHint: name };
  }

  if (!jobId) {
    throw new Error("MISSING_JOB_ID");
  }

  return { mode: "async", jobId };
}

/**
 * Start a PDP job from one or more product page URLs (POST /api/pdp/start via proxy).
 */
export async function startPdpJob(urls: string[], signal?: AbortSignal): Promise<UploadCatalogResponse> {
  const { apiBaseUrl, pdpStartEndpoint } = catalogAgentConfig;
  if (!apiBaseUrl) {
    throw new Error("API_NOT_CONFIGURED");
  }
  if (!urls.length) {
    throw new Error("Add at least one product URL.");
  }

  const form = new FormData();
  if (urls.length === 1) {
    form.append("url", urls[0]!);
  } else {
    form.append("urls", JSON.stringify(urls));
  }
  form.append("job_type", "demo");
  form.append("skip_enrichment", "false");
  form.append("skip_content", "false");
  form.append("skip_compliance", "false");

  const url = resolveUrl(pdpStartEndpoint);
  const res = await fetch(url, {
    method: "POST",
    body: form,
    signal,
    credentials: "omit",
  });

  const ct = res.headers.get("content-type") ?? "";

  if (res.ok && (ct.includes("text/csv") || ct.includes("application/csv") || ct.includes("octet-stream"))) {
    const blob = await res.blob();
    const name =
      filenameFromContentDisposition(res.headers.get("content-disposition")) ?? "paladio-pdp-enriched.csv";
    return { mode: "sync", blob, filenameHint: name };
  }

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok) {
    const msg =
      json && typeof json === "object" && json !== null
        ? firstString(json, catalogAgentConfig.jsonPaths.errorMessage)
        : undefined;
    throw new Error(msg || `PDP_${res.status}`);
  }

  if (!json || typeof json !== "object") {
    throw new Error("INVALID_PDP_RESPONSE");
  }

  const jobId = firstString(json, catalogAgentConfig.jsonPaths.jobId);
  const immediateDownload = firstString(json, catalogAgentConfig.jsonPaths.downloadUrl);

  if (immediateDownload && !jobId) {
    const r = await fetch(immediateDownload, { signal, credentials: "omit" });
    if (!r.ok) throw new Error(`PDP_${r.status}`);
    const blob = await r.blob();
    const name =
      filenameFromContentDisposition(r.headers.get("content-disposition")) ?? "paladio-pdp-enriched.csv";
    return { mode: "sync", blob, filenameHint: name };
  }

  if (!jobId) {
    throw new Error("MISSING_JOB_ID");
  }

  return { mode: "async", jobId };
}

/**
 * GET job status. Expects JSON with status + optional downloadUrl and metrics.
 */
export async function checkJobStatus(jobId: string, signal?: AbortSignal): Promise<StatusPollResult> {
  const template = catalogAgentConfig.statusEndpointTemplate;
  const path = resolveTemplate(template, jobId);
  const url = resolveUrl(path);

  const res = await fetch(url, { method: "GET", signal, credentials: "omit" });
  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  if (!res.ok || !json || typeof json !== "object") {
    return {
      rawStatus: "error",
      normalized: "failed",
      errorMessage: "We could not read the status for your catalog run.",
    };
  }

  const statusRaw =
    firstString(json, catalogAgentConfig.jsonPaths.status) ?? "unknown";
  const normalized = normalizeStatus(statusRaw);
  const downloadUrl = firstString(json, catalogAgentConfig.jsonPaths.downloadUrl);
  const metrics = {
    rowsProcessed: firstNumber(json, catalogAgentConfig.jsonPaths.rowsProcessed),
    fieldsEnriched: firstNumber(json, catalogAgentConfig.jsonPaths.fieldsEnriched),
  };
  const errorMessage = firstString(json, catalogAgentConfig.jsonPaths.errorMessage);

  const cleanedMetrics =
    metrics.rowsProcessed === undefined && metrics.fieldsEnriched === undefined
      ? undefined
      : metrics;

  let pipeline = extractPipelineFromProgressJson(json);
  if (
    !pipeline?.statusLine &&
    (normalized === "processing" || normalized === "pending") &&
    statusRaw !== "unknown"
  ) {
    pipeline = { ...pipeline, agents: pipeline?.agents, statusLine: statusRaw };
  }

  return {
    rawStatus: statusRaw,
    normalized,
    downloadUrl: downloadUrl || undefined,
    metrics: cleanedMetrics,
    errorMessage: normalized === "failed" ? errorMessage : undefined,
    pipeline,
  };
}

/**
 * Download enriched CSV as Blob (GET download URL or dedicated endpoint).
 *
 * When the app uses a same-origin API base (e.g. `/api/catalog-agent`), always use the Next.js
 * download route so we return the **merged** export (report + before/after, wide columns). The
 * progress API often returns an absolute backend `download_url` that points at a **slim** CSV —
 * following it would bypass that pipeline.
 */
export async function downloadResult(
  jobId: string,
  downloadUrl?: string,
  signal?: AbortSignal
): Promise<{ blob: Blob; filenameHint: string }> {
  const proxyUrl = resolveUrl(resolveTemplate(catalogAgentConfig.downloadEndpointTemplate, jobId));
  const sameOriginProxy = catalogAgentConfig.apiBaseUrl.startsWith("/");

  const url =
    sameOriginProxy
      ? proxyUrl
      : downloadUrl && (downloadUrl.startsWith("http://") || downloadUrl.startsWith("https://"))
        ? downloadUrl
        : proxyUrl;

  const res = await fetch(url, { method: "GET", signal, credentials: "omit" });
  if (!res.ok) {
    throw new Error(`DOWNLOAD_${res.status}`);
  }
  const blob = await res.blob();
  const name =
    filenameFromContentDisposition(res.headers.get("content-disposition")) ??
    `paladio-enriched-${jobId}.csv`;
  return { blob, filenameHint: name };
}

export function triggerBrowserDownload(blob: Blob, filename: string) {
  const u = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = u;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(u);
}
