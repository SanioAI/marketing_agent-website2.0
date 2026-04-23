"use client";

import { useCallback, useRef, useState } from "react";
import {
  catalogAgentConfig,
  isCatalogAgentConfigured,
} from "@/lib/catalog-agent-config";
import {
  checkJobStatus,
  downloadResult,
  startPdpJob,
  triggerBrowserDownload,
  uploadCatalog,
} from "@/lib/catalog-agent-api";
import {
  allCompleteAgentStates,
  initialAgentStates,
  mergePipelineTick,
} from "@/lib/catalog-agent-pipeline";
import type {
  AgentRunState,
  CatalogAgentId,
  EnrichmentMetrics,
} from "@/lib/catalog-agent-types";

export type TryItMode = "csv" | "pdp";

function isCsvFile(file: File): boolean {
  const name = file.name.toLowerCase();
  if (!name.endsWith(".csv")) return false;
  if (!file.type) return true;
  return (
    file.type.includes("csv") ||
    file.type === "text/plain" ||
    file.type === "application/vnd.ms-excel"
  );
}

/** Split on newlines and commas; normalize to absolute http(s) URLs. */
export function parsePdpUrls(raw: string): { urls: string[]; error: string | null } {
  const parts = raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (!parts.length) {
    return { urls: [], error: null };
  }
  const urls: string[] = [];
  for (const p of parts) {
    let u: URL;
    try {
      u = new URL(p);
    } catch {
      try {
        u = new URL(`https://${p}`);
      } catch {
        return { urls: [], error: `Not a valid URL: ${p.slice(0, 80)}${p.length > 80 ? "…" : ""}` };
      }
    }
    if (u.protocol !== "http:" && u.protocol !== "https:") {
      return { urls: [], error: "URLs must start with http:// or https://." };
    }
    urls.push(u.toString());
  }
  const deduped = [...new Set(urls)];
  return { urls: deduped, error: null };
}

function friendlyError(err: unknown): string {
  if (err instanceof Error) {
    if (err.message === "API_NOT_CONFIGURED") {
      return "This demo is not connected yet. Add your Catalog Agent API URL to the environment and redeploy.";
    }
    if (err.message.includes("requires authentication")) {
      return "This demo needs API authentication configured. Add the Catalog API username/password on the server, then try again.";
    }
    if (err.message.startsWith("UPLOAD_") || err.message.startsWith("PDP_")) {
      if (err.message === "UPLOAD_401" || err.message === "PDP_401") {
        return "Your Catalog API is protected (login required). Configure server-side Basic Auth for the demo, then try again.";
      }
      return "Something went wrong while starting your run. Please try again.";
    }
    const m = err.message?.trim?.() ? String(err.message).trim() : "";
    if (m.toLowerCase().includes("workflow execution already started")) {
      return "That catalog run is already in progress. Please wait a moment and try again.";
    }
    if (m && m.length <= 220 && !m.includes("Error:")) {
      return m;
    }
    if (
      err.message === "MISSING_JOB_ID" ||
      err.message === "INVALID_UPLOAD_RESPONSE" ||
      err.message === "INVALID_PDP_RESPONSE"
    ) {
      return "We could not start enrichment. Please check your API response format or try again.";
    }
    if (err.message.startsWith("DOWNLOAD_")) {
      return "Your catalog finished processing, but we could not download the file. Please try again.";
    }
    if (err.message === "JOB_FAILED") {
      return "Enrichment could not finish for this file. Try a smaller sample or contact us.";
    }
  }
  return "Something went wrong while processing your catalog. Please try again.";
}

export type TryItUiState =
  | "idle"
  | "file_ready"
  | "uploading"
  | "enriching"
  | "preparing"
  | "success"
  | "error";

export interface UseCatalogEnrichmentResult {
  uiState: TryItUiState;
  tryMode: TryItMode;
  setTryMode: (m: TryItMode) => void;
  pdpInput: string;
  setPdpInput: (s: string) => void;
  file: File | null;
  errorMessage: string | null;
  metrics: EnrichmentMetrics | null;
  lastFilename: string | null;
  jobId: string | null;
  agentProgress: Record<CatalogAgentId, AgentRunState>;
  pipelineStatusLine: string | null;
  isApiConfigured: boolean;
  canRun: boolean;
  selectFile: (file: File | null) => void;
  clearFile: () => void;
  runEnrichment: () => Promise<void>;
  reset: () => void;
  downloadAgain: () => void;
  validateSelection: (file: File) => string | null;
}

export function useCatalogEnrichment(): UseCatalogEnrichmentResult {
  const [tryMode, setTryModeState] = useState<TryItMode>("csv");
  const [pdpInput, setPdpInputState] = useState("");
  const [uiState, setUiState] = useState<TryItUiState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<EnrichmentMetrics | null>(null);
  const [lastBlob, setLastBlob] = useState<Blob | null>(null);
  const [lastFilename, setLastFilename] = useState<string | null>(null);
  const [lastJobId, setLastJobId] = useState<string | null>(null);
  const [agentProgress, setAgentProgress] = useState<Record<CatalogAgentId, AgentRunState>>(() =>
    initialAgentStates()
  );
  const [pipelineStatusLine, setPipelineStatusLine] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const isApiConfigured = isCatalogAgentConfigured();

  const validateSelection = useCallback((f: File): string | null => {
    if (!isCsvFile(f)) {
      return "Please upload a CSV file.";
    }
    if (f.size > catalogAgentConfig.maxFileBytes) {
      return "The file is too large. Try a smaller catalog sample.";
    }
    return null;
  }, []);

  const setTryMode = useCallback((m: TryItMode) => {
    abortRef.current?.abort();
    abortRef.current = null;
    setErrorMessage(null);
    setMetrics(null);
    setLastBlob(null);
    setLastFilename(null);
    setLastJobId(null);
    setAgentProgress(initialAgentStates());
    setPipelineStatusLine(null);
    setFile(null);
    setPdpInputState("");
    setUiState("idle");
    setTryModeState(m);
  }, []);

  const setPdpInput = useCallback((s: string) => {
    setPdpInputState(s);
    setErrorMessage(null);
    setUiState((prev) => {
      if (tryMode !== "pdp") return prev;
      if (prev === "uploading" || prev === "enriching" || prev === "preparing" || prev === "success") {
        return prev;
      }
      const { urls } = parsePdpUrls(s);
      if (urls.length > 0) return "file_ready";
      return "idle";
    });
  }, [tryMode]);

  const clearFile = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setFile(null);
    setErrorMessage(null);
    setMetrics(null);
    setLastBlob(null);
    setLastFilename(null);
    setLastJobId(null);
    setAgentProgress(initialAgentStates());
    setPipelineStatusLine(null);
    setUiState("idle");
  }, []);

  const selectFile = useCallback(
    (f: File | null) => {
      setErrorMessage(null);
      setMetrics(null);
      setLastBlob(null);
      setLastFilename(null);
      setLastJobId(null);
      if (!f) {
        setFile(null);
        setUiState("idle");
        return;
      }
      const err = validateSelection(f);
      if (err) {
        setFile(null);
        setUiState("idle");
        setErrorMessage(err);
        return;
      }
      setFile(f);
      setUiState("file_ready");
    },
    [validateSelection]
  );

  const reset = useCallback(() => {
    setTryModeState("csv");
    setPdpInputState("");
    abortRef.current?.abort();
    abortRef.current = null;
    setFile(null);
    setErrorMessage(null);
    setMetrics(null);
    setLastBlob(null);
    setLastFilename(null);
    setLastJobId(null);
    setAgentProgress(initialAgentStates());
    setPipelineStatusLine(null);
    setUiState("idle");
  }, []);

  const downloadAgain = useCallback(() => {
    if (lastBlob && lastFilename) {
      triggerBrowserDownload(lastBlob, lastFilename);
    }
  }, [lastBlob, lastFilename]);

  const busy =
    uiState === "uploading" || uiState === "enriching" || uiState === "preparing";

  const csvReady =
    tryMode === "csv" && file !== null && validateSelection(file) === null;
  const { urls: pdpUrls } = parsePdpUrls(pdpInput);
  const pdpReady = tryMode === "pdp" && pdpUrls.length > 0;

  const canRun =
    isApiConfigured &&
    !busy &&
    (uiState === "file_ready" || uiState === "error") &&
    (tryMode === "csv" ? csvReady : pdpReady);

  const runEnrichment = useCallback(async () => {
    if (!isCatalogAgentConfigured()) {
      setErrorMessage(
        "This demo is not connected yet. Set NEXT_PUBLIC_CATALOG_AGENT_API_URL and related endpoints, then redeploy."
      );
      setUiState("error");
      return;
    }

    if (tryMode === "csv") {
      if (!file) return;
      const v = validateSelection(file);
      if (v) {
        setErrorMessage(v);
        setUiState("error");
        return;
      }
    } else {
      const { urls, error } = parsePdpUrls(pdpInput);
      if (error) {
        setErrorMessage(error);
        setUiState("error");
        return;
      }
      if (!urls.length) {
        setErrorMessage("Enter at least one product page URL (https://…).");
        setUiState("error");
        return;
      }
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setErrorMessage(null);
    setMetrics(null);
    setLastBlob(null);
    setLastFilename(null);
    setLastJobId(null);
    setAgentProgress(initialAgentStates());
    setPipelineStatusLine(null);

    try {
      setUiState("uploading");
      const up =
        tryMode === "csv"
          ? await uploadCatalog(file!, ac.signal)
          : await startPdpJob(parsePdpUrls(pdpInput).urls, ac.signal);

      if (up.mode === "sync") {
        setAgentProgress(allCompleteAgentStates());
        setPipelineStatusLine(null);
        setUiState("preparing");
        const name =
          up.filenameHint ??
          (tryMode === "csv"
            ? `enriched-${file!.name.replace(/\.csv$/i, "")}.csv`
            : "paladio-pdp-enriched.csv");
        setLastBlob(up.blob);
        setLastFilename(name);
        setMetrics(null);
        setUiState("success");
        return;
      }

      setLastJobId(up.jobId);
      const pipelineT0 = Date.now();
      setUiState("enriching");
      setAgentProgress((prev) =>
        mergePipelineTick(prev, "processing", undefined, pipelineT0, 0)
      );

      const start = Date.now();
      let downloadUrl: string | undefined;
      let lastMetrics: EnrichmentMetrics | undefined;
      let pollIndex = 1;

      while (Date.now() - start < catalogAgentConfig.maxPollMs) {
        if (ac.signal.aborted) return;
        const st = await checkJobStatus(up.jobId, ac.signal);
        lastMetrics = st.metrics ?? lastMetrics;
        setAgentProgress((prev) =>
          mergePipelineTick(prev, st.normalized, st.pipeline, pipelineT0, pollIndex)
        );
        setPipelineStatusLine(st.pipeline?.statusLine ?? null);
        pollIndex++;
        if (st.normalized === "complete") {
          downloadUrl = st.downloadUrl;
          setMetrics(st.metrics ?? lastMetrics ?? null);
          break;
        }
        if (st.normalized === "failed") {
          throw new Error(st.errorMessage || "JOB_FAILED");
        }
        await new Promise((r) => setTimeout(r, catalogAgentConfig.pollIntervalMs));
      }

      if (Date.now() - start >= catalogAgentConfig.maxPollMs) {
        throw new Error("POLL_TIMEOUT");
      }

      setAgentProgress(allCompleteAgentStates());
      setUiState("preparing");
      const dl = await downloadResult(up.jobId, downloadUrl, ac.signal);
      setLastBlob(dl.blob);
      setLastFilename(dl.filenameHint);
      setUiState("success");
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
      const msg =
        e instanceof Error && e.message === "POLL_TIMEOUT"
          ? "Processing is taking longer than expected. Please try again with a smaller file or contact us."
          : friendlyError(e);
      setErrorMessage(msg);
      setUiState("error");
    }
  }, [file, tryMode, pdpInput, validateSelection]);

  return {
    uiState,
    tryMode,
    setTryMode,
    pdpInput,
    setPdpInput,
    file,
    errorMessage,
    metrics,
    lastFilename,
    jobId: lastJobId,
    agentProgress,
    pipelineStatusLine,
    isApiConfigured,
    canRun,
    selectFile,
    clearFile,
    runEnrichment,
    reset,
    downloadAgain,
    validateSelection,
  };
}
