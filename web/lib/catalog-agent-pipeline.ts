import type { AppIconName } from "@/lib/icons";
import type {
  AgentRunState,
  CatalogAgentId,
  JobPipelineSnapshot,
} from "@/lib/catalog-agent-types";

export interface PipelineBucketDef {
  id: string;
  title: string;
  subtitle: string;
  headerIcon: AppIconName;
  agents: { id: CatalogAgentId; icon: AppIconName; label: string }[];
}

export const PIPELINE_BUCKETS: PipelineBucketDef[] = [
  {
    id: "data_quality",
    title: "Data Quality",
    subtitle: "Extract, classify, and enrich your product data",
    headerIcon: "ClipboardList",
    agents: [
      { id: "extraction", icon: "ClipboardList", label: "Extraction Agent — structured attributes" },
      { id: "bundle", icon: "Boxes", label: "Bundle Agent — multi-item bundles" },
      { id: "taxonomy", icon: "Tag", label: "Taxonomy Agent — 6000+ categories" },
      { id: "schema", icon: "FolderTree", label: "Schema Agent — Schema.org markup" },
      { id: "enrichment", icon: "Globe", label: "Enrichment Agent — missing product data" },
    ],
  },
  {
    id: "content_seo",
    title: "Content & SEO",
    subtitle: "Optimized content and search rankings",
    headerIcon: "PenLine",
    agents: [
      { id: "content", icon: "PenLine", label: "Content Agent — titles & descriptions" },
      { id: "seo", icon: "Search", label: "SEO Agent — meta titles & descriptions" },
      { id: "faq", icon: "CircleHelp", label: "FAQ Generator — product FAQs" },
    ],
  },
  {
    id: "compliance",
    title: "Compliance",
    subtitle: "Regulatory compliance and safety",
    headerIcon: "ScrollText",
    agents: [
      { id: "hazmat", icon: "AlertTriangle", label: "Hazmat Agent — hazardous materials" },
      { id: "compliance", icon: "ScrollText", label: "Compliance Agent — tax codes & regulations" },
    ],
  },
];

export const PIPELINE_AGENT_ORDER: CatalogAgentId[] = PIPELINE_BUCKETS.flatMap((b) =>
  b.agents.map((a) => a.id)
);

const STAGE_TO_AGENTS: Record<string, CatalogAgentId[] | undefined> = {
  data_quality: ["extraction", "bundle", "taxonomy", "schema", "enrichment"],
  dataquality: ["extraction", "bundle", "taxonomy", "schema", "enrichment"],
  enrichment: ["extraction", "bundle", "taxonomy", "schema", "enrichment"],
  catalog: ["extraction", "bundle", "taxonomy", "schema", "enrichment"],
  content_seo: ["content", "seo", "faq"],
  contentseo: ["content", "seo", "faq"],
  content: ["content", "seo", "faq"],
  seo: ["content", "seo", "faq"],
  compliance: ["hazmat", "compliance"],
  safety: ["hazmat", "compliance"],
};

const ALIAS: Record<string, CatalogAgentId | undefined> = {
  extraction: "extraction",
  extraction_agent: "extraction",
  bundle: "bundle",
  bundle_agent: "bundle",
  taxonomy: "taxonomy",
  taxonomy_agent: "taxonomy",
  schema: "schema",
  schema_agent: "schema",
  schemaorg: "schema",
  enrichment: "enrichment",
  enrichment_agent: "enrichment",
  content: "content",
  content_agent: "content",
  seo: "seo",
  seo_agent: "seo",
  faq: "faq",
  faq_generator: "faq",
  hazmat: "hazmat",
  hazmat_agent: "hazmat",
  compliance: "compliance",
  compliance_agent: "compliance",
};

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

function normalizeKey(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
}

function parseStateValue(v: unknown): AgentRunState | null {
  if (v === true) return "complete";
  if (v === false) return "pending";
  if (typeof v !== "string") return null;
  const x = v.toLowerCase().trim();
  if (
    x === "complete" ||
    x === "completed" ||
    x === "done" ||
    x === "success" ||
    x === "succeeded"
  ) {
    return "complete";
  }
  if (x === "pending" || x === "queued" || x === "idle" || x === "waiting") {
    return "pending";
  }
  if (
    x === "running" ||
    x === "processing" ||
    x === "active" ||
    x === "in_progress" ||
    x === "in-progress"
  ) {
    return "running";
  }
  return null;
}

function resolveAgentId(raw: string): CatalogAgentId | null {
  return ALIAS[normalizeKey(raw)] ?? null;
}

function rank(s: AgentRunState): number {
  if (s === "complete") return 2;
  if (s === "running") return 1;
  return 0;
}

export function mergeAgentRank(a: AgentRunState, b: AgentRunState): AgentRunState {
  return rank(b) > rank(a) ? b : a;
}

export function initialAgentStates(): Record<CatalogAgentId, AgentRunState> {
  const r = {} as Record<CatalogAgentId, AgentRunState>;
  for (const id of PIPELINE_AGENT_ORDER) {
    r[id] = "pending";
  }
  return r;
}

export function allCompleteAgentStates(): Record<CatalogAgentId, AgentRunState> {
  const r = {} as Record<CatalogAgentId, AgentRunState>;
  for (const id of PIPELINE_AGENT_ORDER) {
    r[id] = "complete";
  }
  return r;
}

export function mergeMonotonicAgentPatch(
  base: Record<CatalogAgentId, AgentRunState>,
  patch: Partial<Record<CatalogAgentId, AgentRunState>>
): Record<CatalogAgentId, AgentRunState> {
  const next = { ...base };
  for (const id of PIPELINE_AGENT_ORDER) {
    const p = patch[id];
    if (p) next[id] = mergeAgentRank(next[id]!, p);
  }
  return next;
}

/** Advance through agents by elapsed time + polls when the API does not send per-agent progress. */
function sequentialFallback(
  startedAt: number,
  pollIndex: number
): Partial<Record<CatalogAgentId, AgentRunState>> {
  const elapsed = Date.now() - startedAt;
  const n = PIPELINE_AGENT_ORDER.length;
  const fromTime = Math.floor(elapsed / 3200);
  const fromPolls = Math.floor(pollIndex / 2);
  const seqIdx = Math.min(n - 1, Math.max(0, Math.max(fromTime, fromPolls)));
  const patch: Partial<Record<CatalogAgentId, AgentRunState>> = {};
  for (let i = 0; i < n; i++) {
    const id = PIPELINE_AGENT_ORDER[i]!;
    if (i < seqIdx) patch[id] = "complete";
    else if (i === seqIdx) patch[id] = "running";
    else patch[id] = "pending";
  }
  return patch;
}

export function mergePipelineTick(
  prev: Record<CatalogAgentId, AgentRunState>,
  normalized: "pending" | "processing" | "complete" | "failed",
  snapshot: JobPipelineSnapshot | undefined,
  startedAt: number,
  pollIndex: number
): Record<CatalogAgentId, AgentRunState> {
  if (normalized === "complete") {
    return allCompleteAgentStates();
  }
  if (normalized === "failed") {
    return prev;
  }

  let next = { ...prev };
  const apiPatch = snapshot?.agents;
  const hasApiAgents = apiPatch && Object.keys(apiPatch).length > 0;
  if (hasApiAgents) {
    next = mergeMonotonicAgentPatch(next, apiPatch);
  }

  const fallback = sequentialFallback(startedAt, pollIndex);
  next = mergeMonotonicAgentPatch(next, fallback);
  return next;
}

/**
 * Best-effort extraction from progress JSON. Supports common shapes:
 * - FastAPI `detail` (string), `message`
 * - `current_agent` / `active_agent` (string)
 * - `completed_agents` (string[])
 * - `agents` / `agent_status` (record)
 * - `stages` / `buckets` (record of stage → status)
 */
export function extractPipelineFromProgressJson(json: unknown): JobPipelineSnapshot | undefined {
  if (!json || typeof json !== "object") return undefined;
  const root = json as Record<string, unknown>;
  const data =
    root.data && typeof root.data === "object" && root.data !== null
      ? (root.data as Record<string, unknown>)
      : root;
  const progress =
    data.progress && typeof data.progress === "object" && data.progress !== null
      ? (data.progress as Record<string, unknown>)
      : undefined;

  const statusLine =
    firstString(json, ["detail", "message", "status_message", "statusMessage", "user_message"]) ??
    firstString(data, ["detail", "message", "status_message", "statusMessage"]) ??
    (progress ? firstString(progress, ["message", "detail", "label", "current_step"]) : undefined);

  const agents: Partial<Record<CatalogAgentId, AgentRunState>> = {};

  const applyStageRecord = (rec: Record<string, unknown>) => {
    for (const [k, v] of Object.entries(rec)) {
      const nk = normalizeKey(k);
      const ids = STAGE_TO_AGENTS[nk];
      const st = parseStateValue(v);
      if (ids && st) {
        for (const id of ids) {
          agents[id] = mergeAgentRank(agents[id] ?? "pending", st);
        }
      }
    }
  };

  const stages = data.stages ?? data.buckets ?? progress?.stages ?? progress?.buckets;
  if (stages && typeof stages === "object" && stages !== null && !Array.isArray(stages)) {
    applyStageRecord(stages as Record<string, unknown>);
  }

  const agentRecord =
    (data.agents as Record<string, unknown> | undefined) ??
    (data.agent_status as Record<string, unknown> | undefined) ??
    (progress?.agents as Record<string, unknown> | undefined);
  if (agentRecord && typeof agentRecord === "object" && !Array.isArray(agentRecord)) {
    for (const [k, v] of Object.entries(agentRecord)) {
      const id = resolveAgentId(k);
      const st = parseStateValue(v);
      if (id && st) agents[id] = mergeAgentRank(agents[id] ?? "pending", st);
    }
  }

  const currentRaw =
    (typeof data.current_agent === "string" && data.current_agent) ||
    (typeof data.currentAgent === "string" && data.currentAgent) ||
    (typeof data.active_agent === "string" && data.active_agent) ||
    (typeof data.activeAgent === "string" && data.activeAgent) ||
    (progress && typeof progress.current_agent === "string" && progress.current_agent) ||
    (progress && typeof progress.current === "string" && progress.current);

  if (currentRaw) {
    const id = resolveAgentId(currentRaw);
    if (id) {
      const order = PIPELINE_AGENT_ORDER;
      const idx = order.indexOf(id);
      if (idx >= 0) {
        for (let i = 0; i < idx; i++) {
          const prevId = order[i]!;
          agents[prevId] = mergeAgentRank(agents[prevId] ?? "pending", "complete");
        }
        agents[id] = mergeAgentRank(agents[id] ?? "pending", "running");
      }
    }
  }

  const completedArr =
    (Array.isArray(data.completed_agents) ? data.completed_agents : null) ??
    (Array.isArray(data.completedAgents) ? data.completedAgents : null) ??
    (progress && Array.isArray(progress.completed_agents) ? progress.completed_agents : null);

  if (completedArr) {
    for (const item of completedArr) {
      if (typeof item !== "string") continue;
      const id = resolveAgentId(item);
      if (id) agents[id] = "complete";
    }
    if (currentRaw) {
      const id = resolveAgentId(currentRaw);
      if (id) agents[id] = mergeAgentRank(agents[id] ?? "pending", "running");
    }
  }

  const hasAgents = Object.keys(agents).length > 0;
  if (!statusLine && !hasAgents) return undefined;
  return { statusLine: statusLine || undefined, agents: hasAgents ? agents : undefined };
}
