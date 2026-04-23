import { NextResponse, type NextRequest } from "next/server";
import {
  backendHeaders,
  getBackendExportXlsxPath,
  getCatalogBackendBaseUrl,
} from "@/lib/catalog-agent-server";
import {
  getUpstreamTimeoutMs,
  isValidJobId,
  jsonError,
  sanitizeUpstreamHeaders,
} from "@/lib/catalog-proxy-utils";

export const runtime = "nodejs";
/** XLSX generation can exceed default route limits on large catalogs */
export const maxDuration = 300;

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ jobId: string }> }
) {
  const base = getCatalogBackendBaseUrl();
  if (!base) {
    return jsonError("Service temporarily unavailable.", 503);
  }

  const { jobId } = await ctx.params;
  if (!isValidJobId(jobId)) {
    return jsonError("Invalid job identifier.", 400);
  }

  const path = getBackendExportXlsxPath(jobId);
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const timeoutMs = getUpstreamTimeoutMs();
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "GET",
      headers: {
        ...backendHeaders(),
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/octet-stream, */*",
      },
      cache: "no-store",
      signal: ac.signal,
    });
  } catch (e) {
    clearTimeout(t);
    const aborted = e instanceof Error && e.name === "AbortError";
    return jsonError(aborted ? "Upstream timed out." : "Upstream request failed.", aborted ? 504 : 502);
  } finally {
    clearTimeout(t);
  }

  if (upstream.status === 401) {
    return jsonError(
      "Catalog API requires authentication. Set CATALOG_AGENT_BASIC_AUTH_USER and CATALOG_AGENT_BASIC_AUTH_PASSWORD on the server.",
      502
    );
  }

  if (!upstream.ok) {
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "content-type": upstream.headers.get("content-type") ?? "application/json",
      },
    });
  }

  if (!upstream.body) {
    return jsonError("Empty response from catalog API.", 502);
  }

  const headers = sanitizeUpstreamHeaders(upstream.headers);
  if (!headers.get("content-disposition")) {
    headers.set(
      "content-disposition",
      `attachment; filename=\"paladio-enriched-${jobId}.xlsx\"`
    );
  }
  const ct = headers.get("content-type") ?? "";
  if (!ct.includes("spreadsheet") && !ct.includes("octet-stream")) {
    headers.set(
      "content-type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
  }

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers,
  });
}
