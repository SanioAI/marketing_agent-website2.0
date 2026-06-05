"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const PRODUCTS = [
  {
    raw: "ABS Sensor",
    rawCat: "Automotive > Accessories",
    rawConf: 32,
    clean: "ABS Wheel Speed Sensor – Delphi (2017–2022)",
    cleanCat: "Auto > Parts > Sensors > Wheel Speed",
    cleanConf: 94,
    issues: ["Incomplete title", "Wrong category", "Missing brand"],
    fixes: ["Title expanded", "Taxonomy corrected", "Brand normalized"],
    status: "done" as const,
    t: "0.8s",
  },
  {
    raw: "Break Pad – Frnt",
    rawCat: "Automotive > Accessories",
    rawConf: 28,
    clean: "Brake Pad Set – Front Axle – Monroe",
    cleanCat: "Auto > Parts > Brakes > Pad Sets",
    cleanConf: 91,
    issues: ["Spelling errors", "Abbreviated fields", "Incorrect taxonomy"],
    fixes: ["Spelling corrected", "Title expanded", "Taxonomy reclassified"],
    status: "done" as const,
    t: "1.1s",
  },
  {
    raw: "Air Cleaner Element",
    rawCat: "Automotive",
    rawConf: 19,
    clean: "Cabin Air Filter – Bosch CF10793",
    cleanCat: "Auto > Parts > Filters > Cabin",
    cleanConf: 88,
    issues: ["Vague title", "Top-level category only", "No part number"],
    fixes: ["Title clarified", "Category deepened", "Part number added"],
    status: "review" as const,
    t: "review",
  },
  {
    raw: "Oil Fltr W89B",
    rawCat: "Automotive > Parts",
    rawConf: 41,
    clean: "Engine Oil Filter – Mann-Filter W89B",
    cleanCat: "Auto > Parts > Engine > Oil Filters",
    cleanConf: 97,
    issues: ["Abbreviated name", "Brand missing", "Subcategory missing"],
    fixes: ["Name expanded", "Brand identified", "Subcategory added"],
    status: "done" as const,
    t: "0.6s",
  },
  {
    raw: "Spark Plug BKR6E",
    rawCat: "Automotive > Parts",
    rawConf: 55,
    clean: "Spark Plug BKR6E – NGK Resistor Type",
    cleanCat: "Auto > Parts > Ignition > Spark Plugs",
    cleanConf: 96,
    issues: ["Brand not extracted", "Type missing"],
    fixes: ["Brand normalized", "Product type added"],
    status: "done" as const,
    t: "0.4s",
  },
];

function ConfBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative h-1 w-16 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <span className="tabular-nums text-[11px]">{pct}%</span>
    </div>
  );
}

export function CatalogDashboard() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % PRODUCTS.length);
      setCycle((c) => c + 1);
    }, 3200);
    return () => clearInterval(t);
  }, [reduce]);

  const p = PRODUCTS[active];

  return (
    <div className="relative mx-auto w-full max-w-[780px] overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-[#07101f] to-[#040c18] shadow-2xl shadow-ink-deep/60">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-medium tracking-widest text-slate-500 uppercase">
          catalog agent · hvac distributor
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-[180px_1fr] sm:grid-cols-[200px_1fr]">
        {/* Left: product list */}
        <div className="border-r border-white/6">
          <div className="border-b border-white/6 px-4 py-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Queue · {PRODUCTS.length} products
            </p>
          </div>
          {PRODUCTS.map((item, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`flex w-full items-center gap-2.5 border-b border-white/4 px-4 py-3 text-left transition-colors ${
                i === active ? "bg-white/6" : "hover:bg-white/4"
              }`}
            >
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] ${
                  item.status === "done"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : item.status === "review"
                    ? "bg-amber-500/15 text-amber-400"
                    : "bg-paper-dim0/15 text-lime"
                }`}
              >
                {item.status === "done" ? "✓" : item.status === "review" ? "!" : "⟳"}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-slate-200">{item.clean.split("–")[0].trim()}</p>
                <p className="text-[10px] text-slate-600">{item.t}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Right: detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={cycle}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="p-5"
          >
            <div className="grid grid-cols-2 gap-3">
              {/* Before */}
              <div className="rounded-xl border border-rose-500/15 bg-rose-500/5 p-3.5">
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-rose-400">
                  Before
                </p>
                <p className="text-xs font-semibold text-slate-300 leading-snug">{p.raw}</p>
                <p className="mt-1 text-[11px] text-slate-500">{p.rawCat}</p>
                <div className="mt-2.5 text-rose-400">
                  <ConfBar pct={p.rawConf} color="bg-rose-500" />
                </div>
                <ul className="mt-3 space-y-1">
                  {p.issues.map((x) => (
                    <li key={x} className="flex items-start gap-1.5 text-[10px] text-rose-400/80">
                      <span className="shrink-0 mt-px">✕</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-3.5">
                <div className="mb-2.5 flex items-center justify-between">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
                    After
                  </p>
                  {p.status === "review" && (
                    <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 text-[9px] font-semibold text-amber-400">
                      Needs review
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-slate-200 leading-snug">{p.clean}</p>
                <p className="mt-1 text-[11px] text-slate-500">{p.cleanCat}</p>
                <div className="mt-2.5 text-emerald-400">
                  <ConfBar pct={p.cleanConf} color="bg-gradient-to-r from-[var(--lime)] to-[var(--lime-dim)]" />
                </div>
                <ul className="mt-3 space-y-1">
                  {p.fixes.map((x) => (
                    <li key={x} className="flex items-start gap-1.5 text-[10px] text-emerald-400/80">
                      <span className="shrink-0 mt-px">✓</span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 flex items-center gap-1.5">
              {PRODUCTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-gradient-to-r from-[var(--lime)] to-[var(--lime-dim)]"
                      : "w-1.5 bg-white/15"
                  }`}
                />
              ))}
              <span className="ml-auto text-[11px] text-slate-600 tabular-nums">
                {active + 1} / {PRODUCTS.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/8 px-5 py-3">
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-slate-500">
            Processing{" "}
            <span className="font-semibold text-slate-300">40,312</span> records/hr
          </span>
          <span className="text-[11px] text-slate-600">·</span>
          <span className="text-[11px] text-slate-500">
            Pass rate{" "}
            <span className="font-semibold text-emerald-400">94.2%</span>
          </span>
        </div>
        <span className="text-[11px] font-semibold text-lime">Paladio.ai</span>
      </div>
    </div>
  );
}
