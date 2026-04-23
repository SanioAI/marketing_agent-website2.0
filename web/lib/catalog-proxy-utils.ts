/**
 * Server-only helpers for catalog API proxy routes (security + limits).
 */

import { NextResponse } from "next/server";

/** Safe job id: no path chars; typical UUID/ULID/slug from your API. */
const JOB_ID_RE = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,127}$/;

export function isValidJobId(jobId: string): boolean {
  if (!jobId || jobId.length > 128) return false;
  if (jobId.includes("..") || jobId.includes("/") || jobId.includes("\\")) return false;
  return JOB_ID_RE.test(jobId);
}

export function getUpstreamTimeoutMs(): number {
  const raw = process.env.CATALOG_AGENT_UPSTREAM_TIMEOUT_MS;
  const n = raw ? Number(raw) : 120_000;
  return Number.isFinite(n) && n >= 5_000 && n <= 300_000 ? n : 120_000;
}

export function getMaxUploadBytes(): number {
  const raw = process.env.CATALOG_AGENT_MAX_UPLOAD_BYTES;
  const n = raw ? Number(raw) : 10 * 1024 * 1024;
  return Number.isFinite(n) && n >= 1024 && n <= 50 * 1024 * 1024 ? n : 10 * 1024 * 1024;
}

/**
 * Strip hop-by-hop and sensitive headers from upstream before sending to the browser.
 */
export function sanitizeUpstreamHeaders(headers: Headers): Headers {
  const out = new Headers(headers);
  const strip = [
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade",
    "set-cookie",
  ];
  for (const h of strip) {
    out.delete(h);
  }
  return out;
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
