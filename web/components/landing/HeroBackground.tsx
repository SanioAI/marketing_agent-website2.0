"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroBackground() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Top-right large orb */}
      <motion.div
        className="absolute -right-40 -top-20 h-[520px] w-[520px] rounded-full bg-[#2563eb]/10 blur-[80px]"
        animate={{ scale: [1, 1.12, 1], x: [0, 18, 0], y: [0, -12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Bottom-left orb */}
      <motion.div
        className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-[#0ea5e9]/8 blur-[70px]"
        animate={{ scale: [1, 1.08, 1], x: [0, -14, 0], y: [0, 16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      {/* Center floating accent */}
      <motion.div
        className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-[#0284c7]/6 blur-[60px]"
        animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
    </div>
  );
}
