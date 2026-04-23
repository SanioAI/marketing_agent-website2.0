"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function Reveal({
  children,
  className = "",
  delay = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay }}
      variants={defaultVariants}
    >
      {children}
    </motion.div>
  );
}
