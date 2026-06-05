import type { ReactNode } from "react";

/**
 * Scroll-reveal wrapper. Intentionally no opacity animation — Framer Motion
 * was leaving section headings stuck at opacity:0 when whileInView did not fire.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  return <div className={className}>{children}</div>;
}
