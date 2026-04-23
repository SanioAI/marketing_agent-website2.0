"use client";

import { useCallback, useRef, type DragEvent } from "react";
import { motion } from "framer-motion";

interface FileUploadBoxProps {
  file: File | null;
  disabled: boolean;
  error: string | null;
  onFile: (file: File | null) => void;
  onRemove: () => void;
}

export function FileUploadBox({
  file,
  disabled,
  error,
  onFile,
  onRemove,
}: FileUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = useCallback(() => {
    if (disabled) return;
    inputRef.current?.click();
  }, [disabled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) onFile(f);
      e.target.value = "";
    },
    [onFile]
  );

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      if (disabled) return;
      const f = e.dataTransfer.files?.[0];
      if (f) onFile(f);
    },
    [disabled, onFile]
  );

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="sr-only"
        onChange={handleChange}
        disabled={disabled}
        aria-hidden
      />
      {!file ? (
        <motion.div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onPick();
            }
          }}
          onClick={onPick}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDrop}
          className={`group relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200/90 bg-white/80 px-6 py-10 text-center transition ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "hover:border-indigo-300 hover:bg-indigo-50/30"
          }`}
          whileHover={disabled ? undefined : { scale: 1.005 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 transition group-hover:bg-indigo-100 group-hover:text-indigo-700">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
          </div>
          <p className="text-base font-medium text-slate-900">Upload your catalog sample</p>
          <p className="mt-1 text-sm text-slate-500">Drag and drop, or click to browse</p>
          <p className="mt-4 text-xs text-slate-400">Supports CSV</p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-900">{file.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">{formatSize(file.size)}</p>
            </div>
            <button
              type="button"
              onClick={onRemove}
              disabled={disabled}
              className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-50"
            >
              Remove
            </button>
          </div>
          <button
            type="button"
            onClick={onPick}
            disabled={disabled}
            className="text-left text-xs font-medium text-indigo-600 transition hover:text-indigo-800 disabled:opacity-50"
          >
            Replace file
          </button>
        </motion.div>
      )}
      {error && !file && (
        <p className="mt-3 text-sm text-rose-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
