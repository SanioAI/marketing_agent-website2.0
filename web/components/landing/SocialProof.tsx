"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

const metrics = [
  { k: 85, suffix: "%", v: "faster catalog enrichment" },
  { k: 94, suffix: "%", v: "reduction in manual cleanup" },
  { k: 75, suffix: "%", v: "fewer downstream errors" },
  { k: 84, suffix: "%", v: "edge cases resolved automatically" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (reduce || !inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf: number;
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      if (ref.current) ref.current.textContent = Math.round(eased * target) + suffix;
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, suffix, reduce]);

  return <span ref={ref}>{reduce ? target + suffix : "0" + suffix}</span>;
}

export function SocialProof() {
  const reduce = useReducedMotion();
  return (
    <section className="border-b border-slate-200/60 gradient-surface py-14 sm:py-16">
      <Container>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.k}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.09, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-slate-200/60 bg-white/70 px-5 py-5 text-center shadow-sm shadow-blue-900/5 hover:border-blue-200/50 hover:shadow-md hover:shadow-blue-900/8 cursor-default"
            >
              <p className="font-display text-3xl font-semibold text-slate-900">
                <Counter target={m.k} suffix={m.suffix} />
              </p>
              <p className="mt-1 text-sm text-slate-500">{m.v}</p>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="mt-8 rounded-2xl border border-slate-200/70 bg-white/80 px-7 py-6 shadow-sm shadow-slate-900/5">
            <p className="text-base leading-relaxed text-slate-700 sm:text-[17px]">
              &ldquo;Their approach{" "}
              <span className="font-medium text-slate-900">
                drastically reduced manual effort while improving accuracy.
              </span>{" "}
              The agents caught issues we weren&apos;t even aware of—and the before/after
              exports made it easy for our team to review and sign off.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#0ea5e9] text-xs font-bold text-white shadow-sm">
                EB
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Eric Bosco</p>
                <p className="text-xs text-slate-500">Profitero / Publicis Groupe</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
