import { NextResponse, type NextRequest } from "next/server";
import {
  backendHeaders,
  getBackendStatusPath,
  getCatalogBackendBaseUrl,
} from "@/lib/catalog-agent-server";
import {
  getUpstreamTimeoutMs,
  isValidJobId,
  jsonError,
} from "@/lib/catalog-proxy-utils";

export const runtime = "nodejs";
export const maxDuration = 60;

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

  const path = getBackendStatusPath(jobId);
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const timeoutMs = getUpstreamTimeoutMs();
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "GET",
      headers: { ...backendHeaders(), Accept: "application/json" },
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

  const text = await upstream.text();
  if (upstream.status === 401) {
    return jsonError(
      "Catalog API requires authentication. Set CATALOG_AGENT_BASIC_AUTH_USER and CATALOG_AGENT_BASIC_AUTH_PASSWORD on the server.",
      502
    );
  }
  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
}
