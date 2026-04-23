export type CatalogPhase = "idle" | "uploading" | "enriching" | "preparing" | "done" | "error";

export type CatalogJobStatus =
  | "pending"
  | "queued"
  | "processing"
  | "running"
  | "complete"
  | "completed"
  | "success"
  | "failed"
  | "error";

export type CatalogAgentId =
  | "extraction"
  | "bundle"
  | "taxonomy"
  | "schema"
  | "enrichment"
  | "content"
  | "seo"
  | "faq"
  | "hazmat"
  | "compliance";

export type AgentRunState = "pending" | "running" | "complete";

/** Optional progress payload from GET /progress — parsed flexibly in `catalog-agent-pipeline`. */
export interface JobPipelineSnapshot {
  statusLine?: string;
  agents?: Partial<Record<CatalogAgentId, AgentRunState>>;
}

export interface EnrichmentMetrics {
  rowsProcessed?: number;
  fieldsEnriched?: number;
}

export interface UploadCatalogResult {
  mode: "async";
  jobId: string;
}

export interface UploadCatalogSyncResult {
  mode: "sync";
  blob: Blob;
  filenameHint?: string;
}

export type UploadCatalogResponse = UploadCatalogResult | UploadCatalogSyncResult;

export interface StatusPollResult {
  rawStatus: string;
  normalized: "pending" | "processing" | "complete" | "failed";
  downloadUrl?: string;
  metrics?: EnrichmentMetrics;
  errorMessage?: string;
  /** Best-effort parse of backend progress for the agent pipeline UI. */
  pipeline?: JobPipelineSnapshot;
}
