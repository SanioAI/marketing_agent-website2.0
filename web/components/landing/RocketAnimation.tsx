"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const DEG = Math.PI / 180;

function ellipseKeyframes(
  a: number,
  b: number,
  tiltDeg: number,
  steps = 60,
): { x: number[]; y: number[] } {
  const φ = tiltDeg * DEG;
  const x: number[] = [];
  const y: number[] = [];
  for (let i = 0; i <= steps; i++) {
    const θ = (2 * Math.PI * i) / steps;
    x.push(a * Math.cos(θ) * Math.cos(φ) - b * Math.sin(θ) * Math.sin(φ));
    y.push(a * Math.cos(θ) * Math.sin(φ) + b * Math.sin(θ) * Math.cos(φ));
  }
  return { x, y };
}

const ORBITS = [
  { a: 185, b: 62, tilt: -28, dur: 10,  size: 10, color: "oklch(0.82 0.14 225)", shadow: "0 0 12px 4px oklch(0.82 0.14 225 / 0.55), 0 0 24px 8px oklch(0.82 0.14 225 / 0.3)" },
  { a: 135, b: 48, tilt:  20, dur: 7,   size: 8,  color: "oklch(0.78 0.12 225)", shadow: "0 0 10px 3px oklch(0.82 0.14 225 / 0.5), 0 0 20px 6px oklch(0.72 0.11 225 / 0.25)" },
  { a:  88, b: 32, tilt: -14, dur: 5,   size: 6,  color: "oklch(0.75 0.10 225)", shadow: "0 0 8px 3px oklch(0.82 0.14 225 / 0.4), 0 0 16px 6px oklch(0.72 0.11 225 / 0.25)" },
] as const;

const RING_STROKE_OPACITY = 0.18;

// Stars seeded deterministically
const STARS = Array.from({ length: 38 }, (_, i) => {
  const t = i * 2.399; // golden angle spiral
  const r = Math.sqrt(i / 38);
  return {
    x: 50 + 46 * r * Math.cos(t) * (i % 2 === 0 ? 1 : -1),
    y: 50 + 46 * r * Math.sin(t),
    s: 0.8 + ((i * 17 + 3) % 10) / 14,
    dur: 2.2 + ((i * 7 + 1) % 18) / 7,
    delay: (i * 0.19) % 3,
  };
});

export function RocketAnimation() {
  const reduce = useReducedMotion();

  const orbitKfs = useMemo(
    () => ORBITS.map((o) => ellipseKeyframes(o.a, o.b, o.tilt)),
    [],
  );

  return (
    <div className="relative mx-auto h-[480px] w-full max-w-[520px] overflow-hidden rounded-3xl shadow-2xl shadow-ink-deep/40">
      {/* Dark space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#060d1f] via-[#08112a] to-[#04091a]" />

      {/* Large ambient glow behind orbit center */}
      <div
        className="pointer-events-none absolute left-1/2 top-[44%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(14,165,233,0.10) 40%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Stars */}
      {STARS.map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute rounded-full bg-white"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s }}
          animate={reduce ? undefined : { opacity: [0.15, 0.85, 0.15] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay }}
        />
      ))}

      {/* SVG orbit rings */}
      <svg
        className="pointer-events-none absolute inset-0"
        width="520"
        height="480"
        viewBox="0 0 520 480"
        fill="none"
        aria-hidden
      >
        <defs>
          {ORBITS.map((o, i) => {
            const id = `orb-grad-${i}`;
            // Compute a sweep from bright to transparent along the ellipse angle
            const cos = Math.cos(o.tilt * DEG);
            const sin = Math.sin(o.tilt * DEG);
            return (
              <linearGradient
                key={id}
                id={id}
                x1={0.5 - 0.5 * cos}
                y1={0.5 - 0.5 * sin}
                x2={0.5 + 0.5 * cos}
                y2={0.5 + 0.5 * sin}
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0%" stopColor={o.color} stopOpacity={RING_STROKE_OPACITY * 0.2} />
                <stop offset="40%" stopColor={o.color} stopOpacity={RING_STROKE_OPACITY} />
                <stop offset="70%" stopColor={o.color} stopOpacity={RING_STROKE_OPACITY * 0.7} />
                <stop offset="100%" stopColor={o.color} stopOpacity={RING_STROKE_OPACITY * 0.1} />
              </linearGradient>
            );
          })}
        </defs>

        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            cx="260"
            cy="212"
            rx={o.a}
            ry={o.b}
            stroke={`url(#orb-grad-${i})`}
            strokeWidth="1.2"
            transform={`rotate(${o.tilt} 260 212)`}
          />
        ))}
      </svg>

      {/* Orbiting glowing dots */}
      {ORBITS.map((o, i) => {
        const kf = orbitKfs[i];
        return (
          <motion.div
            key={i}
            className="pointer-events-none absolute"
            style={{
              left: 260 - o.size / 2,
              top: 212 - o.size / 2,
              width: o.size,
              height: o.size,
            }}
            animate={
              reduce
                ? undefined
                : {
                    x: kf.x,
                    y: kf.y,
                  }
            }
            transition={{
              duration: o.dur,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div
              className="h-full w-full rounded-full"
              style={{
                background: o.color,
                boxShadow: o.shadow,
              }}
            />
          </motion.div>
        );
      })}

      {/* Central rocket */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
        animate={reduce ? undefined : { y: [0, -14, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="84"
          height="154"
          viewBox="0 0 84 154"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="rc-body" x1="0" y1="0" x2="84" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0"   stopColor="oklch(0.93 0.004 250)" />
              <stop offset="0.5" stopColor="#ffffff" />
              <stop offset="1"   stopColor="oklch(0.88 0.004 250)" />
            </linearGradient>
            <linearGradient id="rc-nose" x1="0" y1="0" x2="84" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="var(--lime)" />
              <stop offset="1" stopColor="var(--lime-dim)" />
            </linearGradient>
            <linearGradient id="rc-fin" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--lime-dim)" />
              <stop offset="1" stopColor="var(--lime)" />
            </linearGradient>
            <linearGradient id="rc-fl1" x1="42" y1="108" x2="42" y2="148" gradientUnits="userSpaceOnUse">
              <stop offset="0"   stopColor="oklch(0.82 0.14 225)" stopOpacity="1" />
              <stop offset="0.5" stopColor="oklch(0.78 0.12 225)" stopOpacity="0.8" />
              <stop offset="1"   stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="rc-fl2" x1="42" y1="108" x2="42" y2="138" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="white" stopOpacity="0.95" />
              <stop offset="1" stopColor="oklch(0.82 0.14 225)" stopOpacity="0" />
            </linearGradient>
            <filter id="rc-glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Left fin */}
          <path d="M22 82 L4 112 L22 104Z" fill="url(#rc-fin)" opacity="0.9" />
          {/* Right fin */}
          <path d="M62 82 L80 112 L62 104Z" fill="url(#rc-fin)" opacity="0.9" />

          {/* Body */}
          <rect x="16" y="38" width="52" height="72" rx="8" fill="url(#rc-body)" />
          <rect x="16" y="38" width="52" height="72" rx="8" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

          {/* Nose cone */}
          <path d="M16 44 Q16 4 42 2 Q68 4 68 44Z" fill="url(#rc-nose)" />
          {/* Nose highlight */}
          <path d="M26 20 Q28 8 42 4 Q36 16 26 20Z" fill="white" opacity="0.25" />

          {/* Porthole */}
          <circle cx="42" cy="70" r="12" fill="oklch(0.93 0.004 250)" stroke="oklch(0.82 0.14 225 / 0.6)" strokeWidth="1.2" />
          <circle cx="42" cy="70" r="7"  fill="oklch(0.88 0.004 250)" />
          <circle cx="38" cy="66" r="2.5" fill="white" opacity="0.8" />

          {/* Stripe */}
          <rect x="16" y="88" width="52" height="5" rx="2" fill="oklch(0.93 0.004 250)" opacity="0.45" />

          {/* Nozzle */}
          <path d="M26 108 L22 118 L62 118 L58 108Z" fill="oklch(0.16 0.012 250)" />
          <path d="M29 118 L27 124 L57 124 L55 118Z" fill="var(--lime-dim)" />
        </svg>

        {/* Outer flame */}
        <motion.div
          className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2"
          style={{ transformOrigin: "top center" }}
          animate={reduce ? undefined : {
            scaleY: [1, 1.3, 0.8, 1.2, 1],
            scaleX: [1, 0.85, 1.15, 0.92, 1],
          }}
          transition={{ duration: 0.36, repeat: Infinity }}
        >
          <svg width="38" height="52" viewBox="0 0 38 52" fill="none" aria-hidden>
            <path d="M19 2C19 2 32 20 29 38C27 47 19 50 19 50C19 50 11 47 9 38C6 20 19 2 19 2Z" fill="url(#rc-fl1)"/>
          </svg>
        </motion.div>

        {/* Inner flame */}
        <motion.div
          className="pointer-events-none absolute -bottom-1 left-1/2 -translate-x-1/2"
          style={{ transformOrigin: "top center" }}
          animate={reduce ? undefined : { scaleY: [1, 1.4, 0.75, 1.25, 1] }}
          transition={{ duration: 0.26, repeat: Infinity, delay: 0.07 }}
        >
          <svg width="20" height="36" viewBox="0 0 20 36" fill="none" aria-hidden>
            <path d="M10 2C10 2 18 14 15 26C13 32 10 34 10 34C10 34 7 32 5 26C2 14 10 2 10 2Z" fill="url(#rc-fl2)"/>
          </svg>
        </motion.div>

        {/* Glow ring under rocket */}
        <motion.div
          className="pointer-events-none absolute -bottom-8 left-1/2 h-4 w-16 -translate-x-1/2 rounded-full"
          style={{ background: "oklch(0.82 0.14 225 / 0.4)", filter: "blur(8px)" }}
          animate={reduce ? undefined : { opacity: [0.4, 0.8, 0.4], scaleX: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Bottom stat badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="inline-flex items-center gap-2 rounded-full border border-lime/20 bg-white/8 px-4 py-1.5 text-xs font-medium text-lime/60 shadow-sm backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-lime" />
          85% faster catalog enrichment
        </span>
      </div>
    </div>
  );
}
