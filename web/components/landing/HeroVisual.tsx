"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="absolute -inset-6 -z-10 rounded-[2.75rem] bg-gradient-to-br from-lime/20 via-paper-dim/20 to-line/30 blur-2xl" />
      <div className="absolute -inset-8 -z-20 rounded-[3rem] bg-[radial-gradient(600px_260px_at_65%_10%,rgba(14,165,233,0.14),transparent_60%),radial-gradient(640px_280px_at_10%_20%,rgba(37,99,235,0.18),transparent_60%)]" />
      <motion.figure
        className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-2 shadow-2xl shadow-slate-900/10"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={reduce ? undefined : { y: -2 }}
      >
        <div className="relative aspect-[1024/707] w-full overflow-hidden rounded-xl bg-white">
          <Image
            src="/images/hero-visual.png"
            alt="Catalog Agents: raw feed to autonomous run with verified outputs"
            fill
            className="object-contain"
            sizes="(min-width: 1024px) 520px, 90vw"
            priority
          />
        </div>
        <figcaption className="mt-3 text-center text-xs text-slate-500">
          One canonical SKU, duplicate collapse, and retailer-ready copy.
        </figcaption>
      </motion.figure>
    </div>
  );
}
