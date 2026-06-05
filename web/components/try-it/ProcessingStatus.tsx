"use client";

import { motion } from "framer-motion";
import type { TryItMode, TryItUiState } from "@/hooks/useCatalogEnrichment";
import {
  allCompleteAgentStates,
  PIPELINE_BUCKETS,
  type PipelineBucketDef,
} from "@/lib/catalog-agent-pipeline";
import { AppIcon } from "@/lib/icons";
import type { AgentRunState, CatalogAgentId } from "@/lib/catalog-agent-types";

function stepsForMode(mode: TryItMode): { key: TryItUiState; label: string }[] {
  return [
    {
      key: "uploading",
      label: mode === "pdp" ? "Starting PDP crawl…" : "Uploading catalog…",
    },
    { key: "enriching", label: "Agents are working on your products…" },
    { key: "preparing", label: "Preparing your download…" },
  ];
}

function activeIndex(uiState: TryItUiState): number {
  if (uiState === "uploading") return 0;
  if (uiState === "enriching") return 1;
  if (uiState === "preparing") return 2;
  return -1;
}

function resolveDisplayStates(
  uiState: TryItUiState,
  agentProgress: Record<CatalogAgentId, AgentRunState>
): Record<CatalogAgentId, AgentRunState> {
  if (uiState === "preparing") return allCompleteAgentStates();
  if (uiState === "uploading") {
    const base = { ...agentProgress };
    const allPending = PIPELINE_BUCKETS.every((b) =>
      b.agents.every((a) => base[a.id] === "pending")
    );
    if (allPending) {
      base.extraction = "running";
    }
    return base;
  }
  return agentProgress;
}

function AgentStatusIcon({ state }: { state: AgentRunState }) {
  if (state === "complete") {
    return (
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 12 12" aria-hidden>
          <path
            d="M2 6l2.5 2.5L10 3"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  if (state === "running") {
    return (
      <span
        className="inline-flex h-5 w-5 items-center justify-center"
        aria-label="Running"
      >
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-line border-t-lime" />
      </span>
    );
  }
  return (
    <span
      className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-white"
      aria-hidden
    >
      <span className="h-1 w-1 rounded-full bg-slate-300" />
    </span>
  );
}

function BucketCard({
  bucket,
  displayStates,
}: {
  bucket: PipelineBucketDef;
  displayStates: Record<CatalogAgentId, AgentRunState>;
}) {
  const hasActivity = bucket.agents.some((a) => displayStates[a.id] !== "pending");
  const allDone = bucket.agents.every((a) => displayStates[a.id] === "complete");

  return (
    <div
      className={`rounded-xl border px-3 py-3 transition-colors sm:px-4 ${
        hasActivity
          ? allDone
            ? "border-emerald-200/90 bg-emerald-50/30"
            : "border-line/90 bg-white"
          : "border-slate-200/80 bg-slate-50/40"
      }`}
    >
      <div className="flex items-start gap-2">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded border border-line bg-paper-dim text-lime" aria-hidden>
          <AppIcon name={bucket.headerIcon} size={16} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-900">{bucket.title}</p>
          <p className="mt-0.5 text-xs leading-snug text-slate-600">{bucket.subtitle}</p>
        </div>
      </div>
      <ul className="mt-3 space-y-2 border-t border-line/60 pt-3">
        {bucket.agents.map((agent) => (
          <li key={agent.id} className="flex items-start gap-2 text-xs">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center text-mute-paper" aria-hidden>
              <AppIcon name={agent.icon} size={12} />
            </span>
            <span
              className={`min-w-0 flex-1 leading-snug ${
                displayStates[agent.id] === "pending" ? "text-slate-500" : "text-slate-800"
              }`}
            >
              {agent.label}
            </span>
            <AgentStatusIcon state={displayStates[agent.id] ?? "pending"} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProcessingStatus({
  uiState,
  mode = "csv",
  agentProgress,
  pipelineStatusLine,
}: {
  uiState: TryItUiState;
  mode?: TryItMode;
  agentProgress: Record<CatalogAgentId, AgentRunState>;
  pipelineStatusLine: string | null;
}) {
  const busy =
    uiState === "uploading" || uiState === "enriching" || uiState === "preparing";
  if (!busy) return null;

  const steps = stepsForMode(mode);
  const idx = activeIndex(uiState);
  const currentLabel = steps[idx]?.label ?? "Working…";
  const displayStates = resolveDisplayStates(uiState, agentProgress);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden rounded-2xl border border-line bg-paper-dim/40 p-5"
    >
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line/80 bg-white"
          aria-hidden
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-lime" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-900">{currentLabel}</p>
          {pipelineStatusLine ? (
            <p className="mt-0.5 text-xs text-slate-600">{pipelineStatusLine}</p>
          ) : (
            <p className="mt-0.5 text-xs text-slate-500">
              Keep this tab open — agents run in sequence across Data Quality, Content & SEO, and
              Compliance.
            </p>
          )}
        </div>
      </div>

      <ul className="mt-4 space-y-2 border-t border-line/80 pt-4">
        {steps.map((s, i) => (
          <li key={s.key} className="flex items-center gap-2 text-xs">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                i < idx ? "bg-emerald-500" : i === idx ? "bg-paper-dim0" : "bg-slate-300"
              }`}
            />
            <span className={i <= idx ? "text-slate-800" : "text-slate-400"}>{s.label}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {PIPELINE_BUCKETS.map((bucket) => (
          <BucketCard key={bucket.id} bucket={bucket} displayStates={displayStates} />
        ))}
      </div>
    </motion.div>
  );
}
