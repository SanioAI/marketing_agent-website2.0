"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useCatalogEnrichment } from "@/hooks/useCatalogEnrichment";
import { FileUploadBox } from "@/components/try-it/FileUploadBox";
import { ProcessingStatus } from "@/components/try-it/ProcessingStatus";
import { DownloadResultCard } from "@/components/try-it/DownloadResultCard";

type TryItYourselfSectionProps = {
  /** When false, hides the large in-section title (use a page-level PageHero instead). */
  showPageTitle?: boolean;
  /** When true, removes the top border and tightens padding for use directly under PageHero. */
  underPageHero?: boolean;
};

export function TryItYourselfSection({
  showPageTitle = true,
  underPageHero = false,
}: TryItYourselfSectionProps) {
  const {
    uiState,
    tryMode,
    setTryMode,
    pdpInput,
    setPdpInput,
    file,
    errorMessage,
    metrics,
    lastFilename,
    jobId,
    agentProgress,
    pipelineStatusLine,
    isApiConfigured,
    canRun,
    selectFile,
    clearFile,
    runEnrichment,
    reset,
    downloadAgain,
  } = useCatalogEnrichment();

  const busy =
    uiState === "uploading" || uiState === "enriching" || uiState === "preparing";
  const showError = uiState === "error" && errorMessage;
  const showSuccess = uiState === "success";

  return (
    <section
      id="try-it"
      className={[
        "gradient-surface",
        underPageHero ? "border-t-0 py-14 sm:py-16" : "border-t border-slate-200/60 py-20 sm:py-24",
      ].join(" ")}
    >
      <Container>
        {showPageTitle ? (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Try It Yourself
              </h2>
              <p className="mt-3 text-pretty text-slate-600 sm:text-lg">
                Upload a sample CSV or paste product page URLs and see how Paladio enriches messy
                product data into clean, structured catalog output.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-medium text-slate-500">Catalog Agents · sample run</p>
            </div>
          </Reveal>
        )}

        <div className={showPageTitle ? "mx-auto mt-12 max-w-xl" : "mx-auto mt-6 max-w-xl"}>
          {!isApiConfigured && (
            <div
              className="mb-6 rounded-2xl border border-amber-200/80 bg-amber-50/50 px-4 py-3 text-center text-sm text-amber-950/90"
              role="status"
            >
              Connect the demo: set{" "}
              <code className="rounded bg-amber-100/80 px-1.5 py-0.5 font-mono text-xs">
                NEXT_PUBLIC_CATALOG_AGENT_API_URL
              </code>{" "}
              (e.g. <code className="font-mono text-xs">/api/catalog-agent</code>) and, for the
              proxy,{" "}
              <code className="rounded bg-amber-100/80 px-1.5 py-0.5 font-mono text-xs">
                CATALOG_AGENT_BACKEND_URL
              </code>{" "}
              on the server. See{" "}
              <code className="font-mono text-xs">.env.example</code>.
            </div>
          )}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8">
            <div
              className="flex rounded-xl border border-slate-200/90 bg-slate-50/80 p-1"
              role="tablist"
              aria-label="Input type"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tryMode === "csv"}
                onClick={() => setTryMode("csv")}
                disabled={busy}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 ${
                  tryMode === "csv"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Upload CSV
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tryMode === "pdp"}
                onClick={() => setTryMode("pdp")}
                disabled={busy}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 ${
                  tryMode === "pdp"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Product URLs
              </button>
            </div>

            {tryMode === "csv" ? (
              <div className="mt-5">
                <FileUploadBox
                  file={file}
                  disabled={busy}
                  error={file ? null : errorMessage}
                  onFile={selectFile}
                  onRemove={clearFile}
                />
              </div>
            ) : (
              <div className="mt-5">
                <label htmlFor="pdp-urls" className="sr-only">
                  Product page URLs
                </label>
                <textarea
                  id="pdp-urls"
                  value={pdpInput}
                  onChange={(e) => setPdpInput(e.target.value)}
                  disabled={busy}
                  rows={5}
                  placeholder={
                    "One URL per line, or comma-separated.\nExample: https://example.com/product/a"
                  }
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-900/5 placeholder:text-slate-400 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                />
              </div>
            )}

            {tryMode === "csv" ? (
              <>
                <p className="mt-4 text-xs text-slate-500">
                  Best results with a small sample. Use a CSV with product title, description, image
                  URL, and attributes.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <a
                    href="/sample-catalog.csv"
                    download="paladio-sample-catalog.csv"
                    className="font-medium text-indigo-600 transition hover:text-indigo-800"
                  >
                    Download example CSV template
                  </a>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">CSV</span>
                </div>
              </>
            ) : (
              <p className="mt-4 text-xs text-slate-500">
                Paste public product detail page (PDP) URLs. We crawl and return enriched rows as
                CSV, same as the catalog flow.
              </p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={runEnrichment}
                disabled={!canRun}
                className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Run enrichment
              </button>
              {(showSuccess || uiState === "error") && (
                <button
                  type="button"
                  onClick={reset}
                  className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
                >
                  Start over
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {busy && (
                <div className="mt-6" key="proc">
                  <ProcessingStatus
                    uiState={uiState}
                    mode={tryMode}
                    agentProgress={agentProgress}
                    pipelineStatusLine={pipelineStatusLine}
                  />
                </div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {showError && (
                <motion.div
                  key="err"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 rounded-xl border border-rose-200/80 bg-rose-50/50 px-4 py-3 text-sm text-rose-900"
                  role="alert"
                >
                  {errorMessage}
                  <button
                    type="button"
                    onClick={runEnrichment}
                    disabled={!canRun}
                    className="ml-2 font-semibold underline underline-offset-2 disabled:opacity-50"
                  >
                    Try again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {showSuccess && (
                <div className="mt-6" key="ok">
                  <DownloadResultCard
                    jobId={jobId}
                    filename={lastFilename}
                    metrics={metrics}
                    onDownloadCsv={downloadAgain}
                  />
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
