import { NextResponse, type NextRequest } from "next/server";
import {
  backendHeaders,
  getBackendUploadPath,
  getCatalogBackendBaseUrl,
} from "@/lib/catalog-agent-server";
import {
  getMaxUploadBytes,
  getUpstreamTimeoutMs,
  jsonError,
  sanitizeUpstreamHeaders,
} from "@/lib/catalog-proxy-utils";

export const runtime = "nodejs";

/** Vercel / platforms: allow long-running upload + upstream enrichment */
export const maxDuration = 120;

export async function POST(req: NextRequest) {
  const base = getCatalogBackendBaseUrl();
  if (!base) {
    return jsonError("Service temporarily unavailable.", 503);
  }

  const maxBytes = getMaxUploadBytes();
  const len = req.headers.get("content-length");
  if (len) {
    const n = Number(len);
    if (Number.isFinite(n) && n > maxBytes) {
      return jsonError("Request body too large.", 413);
    }
  }

  const path = getBackendUploadPath();
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return jsonError("Invalid form data.", 400);
  }

  // Back-end defaults (production-friendly): ensure enrichment/content/compliance run.
  // The backend OpenAPI defaults `skip_enrichment=true`, which would hide taxonomy/SEO/FAQ outputs.
  if (!formData.has("job_type")) formData.set("job_type", "demo");
  if (!formData.has("skip_enrichment")) formData.set("skip_enrichment", "false");
  if (!formData.has("skip_content")) formData.set("skip_content", "false");
  if (!formData.has("skip_compliance")) formData.set("skip_compliance", "false");

  // Validate any uploaded File regardless of field name.
  for (const v of formData.values()) {
    if (v instanceof File) {
      if (v.size > maxBytes) return jsonError("File too large.", 413);
      break;
    }
  }

  const timeoutMs = getUpstreamTimeoutMs();
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "POST",
      body: formData,
      headers: backendHeaders(),
      cache: "no-store",
      signal: ac.signal,
    });
  } catch (e) {
    clearTimeout(t);
    const aborted = e instanceof Error && e.name === "AbortError";
    return jsonError(
      aborted ? "Upstream request timed out. Try a smaller file." : "Upstream request failed.",
      aborted ? 504 : 502
    );
  } finally {
    clearTimeout(t);
  }

  if (upstream.status === 401) {
    return jsonError(
      "Catalog API requires authentication. Set CATALOG_AGENT_BASIC_AUTH_USER and CATALOG_AGENT_BASIC_AUTH_PASSWORD on the server.",
      502
    );
  }

  if (!upstream.body) {
    return jsonError("Empty response from catalog API.", 502);
  }

  const headers = sanitizeUpstreamHeaders(upstream.headers);

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers,
  });
}
