"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { AppIcon } from "@/lib/icons";

const domains = [
  {
    n: "01",
    t: "E-commerce & Distribution",
    p: "Catalog Agents continuously evaluate and enrich product data — so teams ship faster instead of cleaning the same feed problems on repeat. Live today.",
    tag: "Live",
    tagColor: "border-emerald-200/70 bg-emerald-50/60 text-emerald-700",
    href: "/agents/ecommerce",
    cta: "Explore Catalog Agents",
  },
  {
    n: "02",
    t: "AEC & Construction",
    p: "Preconstruction Agents automate drawing ingestion, quantity takeoffs, and value-engineering analysis. Three months of manual work, done in 24 hours.",
    tag: "Early Access",
    tagColor: "border-line/70 bg-paper-dim/60 text-ink",
    href: "/agents/aec",
    cta: "Explore AEC Agents",
  },
  {
    n: "03",
    t: "Your domain",
    p: "Same platform, new problem space. If you have structured data and repetitive evaluation workflows, Paladio can scope, build, and deploy an agent for it.",
    tag: "Roadmap",
    tagColor: "border-line/70 bg-slate-50 text-slate-500",
    href: "#contact",
    cta: "Talk to us",
  },
] as const;

function EcommerceIllustration() {
  return (
    <svg viewBox="0 0 160 80" fill="none" className="w-full" aria-hidden>
      {/* Grid of product cards */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = (i % 3) * 52 + 4;
        const y = Math.floor(i / 3) * 36 + 4;
        const done = i < 4;
        return (
          <g key={i}>
            <rect x={x} y={y} width={44} height={28} rx="4" fill={done ? "#eff6ff" : "#f8fafc"} stroke={done ? "#bfdbfe" : "#e2e8f0"} strokeWidth="0.8" />
            {/* image placeholder */}
            <rect x={x + 4} y={y + 4} width={12} height={12} rx="2" fill={done ? "#bfdbfe" : "#e2e8f0"} />
            {/* title lines */}
            <rect x={x + 20} y={y + 5} width={18} height={2.5} rx="1" fill={done ? "oklch(0.82 0.14 225 / 0.5)" : "#cbd5e1"} />
            <rect x={x + 20} y={y + 10} width={12} height={2} rx="1" fill={done ? "#bfdbfe" : "#e2e8f0"} />
            {/* confidence badge */}
            {done && (
              <g>
                <rect x={x + 4} y={y + 19} width={22} height={6} rx="3" fill="#dcfce7" />
                <text x={x + 15} y={y + 23.5} textAnchor="middle" fill="#16a34a" fontSize="4" fontWeight="600">94% ✓</text>
              </g>
            )}
          </g>
        );
      })}
      {/* Sparkle in top-right */}
      <g transform="translate(134, 6)">
        <circle cx="12" cy="12" r="12" fill="#eff6ff" />
        <path d="M12 4 L13.2 9.5 L18 8 L14.5 12 L18 16 L13.2 14.5 L12 20 L10.8 14.5 L6 16 L9.5 12 L6 8 L10.8 9.5 Z" fill="url(#eg)" />
      </g>
      <defs>
        <linearGradient id="eg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--lime)" />
          <stop offset="1" stopColor="var(--lime-dim)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function AECIllustration() {
  return (
    <svg viewBox="0 0 160 80" fill="none" className="w-full" aria-hidden>
      {/* Blueprint grid */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={`v${i}`} x1={i*20+10} y1="4" x2={i*20+10} y2="76" stroke="#bfdbfe" strokeWidth="0.4" strokeDasharray="2 3" />
      ))}
      {[0,1,2,3].map(i => (
        <line key={`h${i}`} x1="4" y1={i*18+8} x2="156" y2={i*18+8} stroke="#bfdbfe" strokeWidth="0.4" strokeDasharray="2 3" />
      ))}
      {/* Building outline */}
      <rect x="30" y="18" width="100" height="52" rx="2" fill="#eff6ff" stroke="var(--lime)" strokeWidth="1.2" />
      {/* Floors */}
      <line x1="30" y1="35" x2="130" y2="35" stroke="oklch(0.82 0.14 225 / 0.5)" strokeWidth="0.8" />
      <line x1="30" y1="52" x2="130" y2="52" stroke="oklch(0.82 0.14 225 / 0.5)" strokeWidth="0.8" />
      {/* Columns */}
      <line x1="63" y1="18" x2="63" y2="70" stroke="oklch(0.82 0.14 225 / 0.5)" strokeWidth="0.8" />
      <line x1="97" y1="18" x2="97" y2="70" stroke="oklch(0.82 0.14 225 / 0.5)" strokeWidth="0.8" />
      {/* Door */}
      <rect x="72" y="54" width="16" height="16" rx="1" fill="#bfdbfe" stroke="var(--lime)" strokeWidth="0.8" />
      {/* Dimension arrows */}
      <line x1="15" y1="18" x2="15" y2="70" stroke="var(--lime-dim)" strokeWidth="0.8" markerEnd="url(#ar)" markerStart="url(#ar)" />
      <text x="11" y="47" fill="var(--lime-dim)" fontSize="4.5" fontWeight="600" textAnchor="middle">12m</text>
      {/* AI tag */}
      <rect x="104" y="8" width="42" height="12" rx="3" fill="var(--lime)" />
      <text x="125" y="16" fill="white" fontSize="5" fontWeight="700" textAnchor="middle">AI Takeoff ✓</text>
      <defs>
        <marker id="ar" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <path d="M0,0 L4,2 L0,4" fill="none" stroke="var(--lime-dim)" strokeWidth="0.8" />
        </marker>
      </defs>
    </svg>
  );
}

function YourDomainIllustration() {
  return (
    <svg viewBox="0 0 160 80" fill="none" className="w-full" aria-hidden>
      {/* Central node */}
      <circle cx="80" cy="40" r="14" fill="#f0f9ff" stroke="var(--lime-dim)" strokeWidth="1.2" />
      <path d="M80 32 L81.5 37 L86 36 L83 40 L86 44 L81.5 43 L80 48 L78.5 43 L74 44 L77 40 L74 36 L78.5 37 Z" fill="url(#dg)" />
      {/* Satellite nodes */}
      {[
        { cx: 30, cy: 20, label: "Legal" },
        { cx: 130, cy: 20, label: "Finance" },
        { cx: 20, cy: 58, label: "HR" },
        { cx: 140, cy: 58, label: "Ops" },
        { cx: 80, cy: 72, label: "Custom" },
      ].map(({ cx, cy, label }) => (
        <g key={label}>
          <line x1={cx} y1={cy} x2="80" y2="40" stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3 2" />
          <circle cx={cx} cy={cy} r="9" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="0.8" />
          <text x={cx} y={cy + 1.5} textAnchor="middle" fill="#64748b" fontSize="4.5" fontWeight="600">{label}</text>
        </g>
      ))}
      {/* Pulse ring */}
      <circle cx="80" cy="40" r="20" stroke="var(--lime-dim)" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.5" />
      <defs>
        <linearGradient id="dg" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="var(--lime-dim)" />
          <stop offset="1" stopColor="var(--lime-dim)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const illustrations = [EcommerceIllustration, AECIllustration, YourDomainIllustration];

function LiveBadge({ label, color }: { label: string; color: string }) {
  const isLive = label === "Live";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${color}`}>
      {isLive && (
        <span className="relative flex h-1.5 w-1.5">
          <motion.span
            className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
            animate={{ scale: [1, 2, 1], opacity: [0.75, 0, 0.75] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
          />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </span>
      )}
      {label}
    </span>
  );
}

export function UseCases() {
  const reduce = useReducedMotion();
  return (
    <section className="border-t border-line/60 gradient-surface py-20 sm:py-24" id="domains">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              Where We Deploy
            </p>
            <h2 className="heading-section text-surface">
              Agents for every data-heavy domain
            </h2>
            <p className="section-lede mx-auto mt-6">
              Catalog Agents and AEC Agents are live. More domains ship on the same platform.
            </p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {domains.map((d, i) => {
            const Illustration = illustrations[i];
            return (
              <motion.div
                key={d.t}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                className="card group flex h-full flex-col p-6 sm:p-7 cursor-default"
              >
                {/* Illustration */}
                <div className="mb-4 overflow-hidden rounded-[4px] border border-line bg-paper-dim/60 p-3">
                  <Illustration />
                </div>

                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-2xl font-semibold text-line transition-colors group-hover:text-lime/40">
                    {d.n}
                  </span>
                  <LiveBadge label={d.tag} color={d.tagColor} />
                </div>
                <h3 className="heading-card mt-2 text-surface">{d.t}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-surface-muted">{d.p}</p>
                <Link
                  href={d.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-ink transition hover:text-ink-deep hover:gap-2.5"
                >
                  {d.cta}
                  <AppIcon name="ArrowRight" size={14} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
