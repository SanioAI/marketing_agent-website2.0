"use client";

import { motion } from "framer-motion";
import type { EnrichmentMetrics } from "@/lib/catalog-agent-types";

interface DownloadResultCardProps {
  jobId: string | null;
  filename: string | null;
  metrics: EnrichmentMetrics | null;
  onDownloadCsv: () => void;
}

export function DownloadResultCard({
  jobId,
  filename,
  metrics,
  onDownloadCsv,
}: DownloadResultCardProps) {
  const hasMetrics =
    metrics &&
    (metrics.rowsProcessed !== undefined || metrics.fieldsEnriched !== undefined);

  const xlsxHref = jobId
    ? `/api/catalog-agent/jobs/${encodeURIComponent(jobId)}/export/xlsx`
    : null;
  const jsonFullHref = jobId
    ? `/api/catalog-agent/jobs/${encodeURIComponent(jobId)}/results/raw`
    : null;
  const jsonCompareHref = jobId
    ? `/api/catalog-agent/jobs/${encodeURIComponent(jobId)}/results/before-after`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-50/50 to-white p-6 shadow-sm"
    >
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-emerald-900">Your enriched catalog is ready</p>
          <p className="mt-1 text-sm text-slate-600">
            <strong className="font-medium text-slate-800">Excel (XLSX)</strong> matches the Paladio
            export: Overview, one sheet per taxonomy category, Content (before/after titles and
            descriptions, SEO keywords), and FAQs (one row per question)—same layout as a typical
            enriched workbook. CSV and JSON remain available for tools and pipelines.
          </p>
          {filename && (
            <p className="mt-2 text-xs font-mono text-slate-500">Last CSV filename: {filename}</p>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {xlsxHref ? (
            <a
              href={xlsxHref}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99] sm:min-w-[160px] sm:flex-initial"
            >
              Download Excel (XLSX)
            </a>
          ) : (
            <span
              className="inline-flex h-11 flex-1 cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-5 text-center text-sm text-slate-500 sm:min-w-[160px] sm:flex-initial"
              title="XLSX export needs a job id from an async run."
            >
              Excel (job id required)
            </span>
          )}
          <button
            type="button"
            onClick={onDownloadCsv}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-5 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-slate-50 active:scale-[0.99] sm:min-w-[160px] sm:flex-initial"
          >
            Download CSV
          </button>
          {jsonFullHref ? (
            <a
              href={jsonFullHref}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-emerald-700/25 bg-white px-5 text-sm font-medium text-emerald-950 shadow-sm transition hover:border-emerald-600/40 hover:bg-emerald-50/80 active:scale-[0.99] sm:min-w-[160px] sm:flex-initial"
            >
              Download JSON
            </a>
          ) : (
            <span
              className="inline-flex h-11 flex-1 cursor-not-allowed items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-5 text-center text-sm text-slate-500 sm:min-w-[160px] sm:flex-initial"
              title="JSON export is available when the API returns a job id (async runs)."
            >
              JSON (job id required)
            </span>
          )}
        </div>

        {jobId && jsonCompareHref && (
          <p className="text-xs text-slate-600">
            <span className="text-slate-500">Optional:</span>{" "}
            <a
              href={jsonCompareHref}
              className="font-medium text-emerald-800/90 underline underline-offset-4 transition hover:text-emerald-900"
            >
              Before/after endpoint only (JSON)
            </a>
          </p>
        )}

        {!jobId && (
          <p className="text-xs text-slate-500">
            This run returned a file immediately. Use an async job (CSV upload or PDP with a job id)
            to unlock Excel, merged JSON, and wide CSV exports.
          </p>
        )}
      </div>

      {hasMetrics && (
        <dl className="mt-5 grid gap-3 border-t border-emerald-100/90 pt-5 sm:grid-cols-2">
          {metrics.rowsProcessed !== undefined && (
            <div className="rounded-xl bg-white/80 px-4 py-3 ring-1 ring-emerald-100/80">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Rows processed
              </dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
                {metrics.rowsProcessed}
              </dd>
            </div>
          )}
          {metrics.fieldsEnriched !== undefined && (
            <div className="rounded-xl bg-white/80 px-4 py-3 ring-1 ring-emerald-100/80">
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Enriched fields
              </dt>
              <dd className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
                {metrics.fieldsEnriched}
              </dd>
            </div>
          )}
        </dl>
      )}
    </motion.div>
  );
}
