import { NextResponse, type NextRequest } from "next/server";
import { getCatalogBackendBaseUrl } from "@/lib/catalog-agent-server";
import {
  getUpstreamTimeoutMs,
  isValidJobId,
  jsonError,
} from "@/lib/catalog-proxy-utils";
import { productResultsJsonToCsv } from "@/lib/results-to-csv";
import { fetchMergedJobExportJson } from "@/lib/upstream-job-export";

export const runtime = "nodejs";
export const maxDuration = 120;

/**
 * Enriched CSV: merged JSON from GET /api/results/{job} + before/after, then deep-flattened
 * (SEO, FAQs, before/after, taxonomy, compliance, etc. as columns where the API provides them).
 */
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

  const timeoutMs = getUpstreamTimeoutMs();
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);

  let pack: Awaited<ReturnType<typeof fetchMergedJobExportJson>>;
  try {
    pack = await fetchMergedJobExportJson(base, jobId, ac.signal);
  } catch (e) {
    clearTimeout(t);
    const aborted = e instanceof Error && e.name === "AbortError";
    return jsonError(aborted ? "Upstream timed out." : "Upstream request failed.", aborted ? 504 : 502);
  } finally {
    clearTimeout(t);
  }

  if ("error" in pack) {
    return jsonError(pack.error, pack.status);
  }

  const { csv } = productResultsJsonToCsv(pack.merged);
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "cache-control": "no-store",
      "content-disposition": `attachment; filename=\"paladio-enriched-${jobId}.csv\"`,
    },
  });
}
