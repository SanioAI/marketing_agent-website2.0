"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const STEPS = [
  { label: "Agent spec validated",         time: "10:42" },
  { label: "Data pipeline connected",      time: "09:15" },
  { label: "Evaluation suite: 94.2% pass", time: "14:30" },
  { label: "HITL review approved",         time: "11:20" },
  { label: "Production deploy complete",   time: "09:05" },
];

const TOTAL_DAYS = 6;

export function DeployVisual() {
  const reduce = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(reduce ? STEPS.length : 0);
  const [live, setLive] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    setVisible(0);
    setLive(false);

    const timers: ReturnType<typeof setTimeout>[] = [];
    STEPS.forEach((_, i) => {
      timers.push(setTimeout(() => setVisible(i + 1), 650 * (i + 1)));
    });
    timers.push(setTimeout(() => setLive(true), 650 * STEPS.length + 400));
    timers.push(setTimeout(() => setCycle((c) => c + 1), 650 * STEPS.length + 6000));
    return () => timers.forEach(clearTimeout);
  }, [cycle, reduce]);

  const progress = TOTAL_DAYS > 0 ? (visible / STEPS.length) * 100 : 100;

  return (
    <div className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-[#07101f] to-[#04091a] shadow-2xl shadow-ink-deep/50">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-medium tracking-widest text-slate-500 uppercase">
          paladio runtime
        </span>
        <span className="text-[11px] text-slate-600 tabular-nums">
          {visible === STEPS.length ? "Complete" : `${visible}/${STEPS.length}…`}
        </span>
      </div>

      {/* Agent header */}
      <div className="border-b border-white/6 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
              Active deployment
            </p>
            <p className="mt-0.5 text-sm font-semibold text-slate-200">
              Catalog Agent · HVAC Distributor
            </p>
          </div>
          <AnimatePresence>
            {live && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400"
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                LIVE
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="mt-3.5 flex items-center gap-3">
          <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--lime)] to-[var(--lime-dim)]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="shrink-0 text-[11px] tabular-nums text-slate-500">
            {visible} / {STEPS.length} steps
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-0 px-5 py-3">
        {STEPS.map((s, i) => {
          const done = i < visible;
          const active = i === visible - 1;
          return (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={done ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className={`flex items-center gap-3 py-2.5 ${done ? "" : "opacity-0"}`}
            >
              {/* Check icon */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors ${
                  done ? "bg-emerald-500/15" : "bg-white/5"
                }`}
              >
                {done && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                    <path
                      d="M1 4L3.5 6.5L9 1"
                      stroke={active ? "#34d399" : "#10b981"}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              <span className={`flex-1 text-sm ${active ? "text-slate-100" : "text-slate-400"}`}>
                {s.label}
              </span>

              <div className="flex shrink-0 items-center gap-2">
                <span className="text-[11px] tabular-nums text-slate-600">{s.time}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="border-t border-white/8 px-5 py-4">
        <AnimatePresence mode="wait">
          {live ? (
            <motion.div
              key="live"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="h-px flex-1 w-8 bg-gradient-to-r from-transparent to-emerald-500/30" />
                <span className="text-xs text-slate-500">
                  Processing{" "}
                  <span className="font-semibold text-slate-300">40,312+</span> records/hr
                </span>
              </div>
              <span className="text-xs font-semibold text-lime">
                Agent deployed ✓
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="building"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-lime"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <span className="text-xs text-slate-500">Agent building…</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
