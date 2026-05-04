"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CW = 480;
const CH = 300;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  speed: number;
}

function spawn(scattered = false): Particle {
  const maxLife = 55 + Math.random() * 45;
  return {
    x: CW / 2 + (Math.random() - 0.5) * 100,
    y: scattered ? Math.random() * CH : CH + 8,
    vx: (Math.random() - 0.5) * 1.2,
    vy: -(1.8 + Math.random() * 3),
    life: scattered ? Math.random() * maxLife : 0,
    maxLife,
    size: 0.6 + Math.random() * 1.6,
    speed: 0.06 + Math.random() * 0.06,
  };
}

// Horizontal speed lines — static layout
const SPEED_LINES = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  y: 40 + i * 24,
  leftW: 30 + (i % 4) * 18,
  rightW: 25 + (i % 5) * 15,
  opacity: 0.03 + (i % 3) * 0.015,
}));

export function RocketVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // ctx is non-null from here
    const c = ctx;

    // Scale for retina
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CW * dpr;
    canvas.height = CH * dpr;
    canvas.style.width = `${CW}px`;
    canvas.style.height = `${CH}px`;
    ctx.scale(dpr, dpr);

    const particles: Particle[] = Array.from({ length: 90 }, () => spawn(true));
    const cx = CW / 2;
    let raf: number;

    function draw() {
      c.clearRect(0, 0, CW, CH);

      for (const p of particles) {
        // Converge toward center beam with increasing pull as they rise
        const heightFactor = Math.max(0, (CH - p.y) / CH);
        p.vx += (cx - p.x) * (0.006 + heightFactor * 0.014);
        p.vy -= p.speed; // accelerate upward
        p.vx *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.y < -8 || p.life > p.maxLife) {
          Object.assign(p, spawn(false));
          continue;
        }

        const t = p.life / p.maxLife;
        const alpha = t < 0.12 ? t / 0.12 : t > 0.8 ? 1 - (t - 0.8) / 0.2 : 1;
        const posY = Math.max(0, Math.min(1, 1 - p.y / CH));

        // Color shifts white → sky-blue → deep blue as particles rise
        const rVal = Math.round(224 - posY * 187); // 224→37
        const gVal = Math.round(242 - posY * 143); // 242→99
        const bVal = 235;

        c.save();
        c.globalAlpha = alpha * 0.88;
        c.shadowColor = `rgba(${rVal},${gVal},${bVal},0.7)`;
        c.shadowBlur = p.size * 3;
        c.beginPath();
        c.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        c.fillStyle = `rgb(${rVal},${gVal},${bVal})`;
        c.fill();
        c.restore();
      }

      raf = requestAnimationFrame(draw);
    }

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <div className="relative mx-auto w-full max-w-[480px] overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-[#07101f] via-[#040d1a] to-[#020810] shadow-2xl shadow-blue-950/60">
      {/* Chrome */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
          paladio · deployment
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          LIVE
        </span>
      </div>

      {/* Visual */}
      <div className="relative overflow-hidden" style={{ height: CH }}>

        {/* SVG background layer */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${CW} ${CH}`}
          aria-hidden
        >
          <defs>
            {/* Central beam glow */}
            <radialGradient id="beamGlow" cx="50%" cy="100%" r="80%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
              <stop offset="60%" stopColor="#0ea5e9" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="beamLine" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="70%" stopColor="#2563eb" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
            <filter id="beamBlur">
              <feGaussianBlur stdDeviation="12" />
            </filter>
            <filter id="softBlur">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Background ambient glow */}
          <ellipse cx={CW / 2} cy={CH} rx="200" ry="160" fill="url(#beamGlow)" />

          {/* Speed lines — left */}
          {SPEED_LINES.map((l) => (
            <line
              key={`L${l.id}`}
              x1={CW / 2 - 110 - l.leftW}
              y1={l.y}
              x2={CW / 2 - 110}
              y2={l.y}
              stroke="white"
              strokeOpacity={l.opacity}
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}
          {/* Speed lines — right */}
          {SPEED_LINES.map((l) => (
            <line
              key={`R${l.id}`}
              x1={CW / 2 + 110}
              y1={l.y}
              x2={CW / 2 + 110 + l.rightW}
              y2={l.y}
              stroke="white"
              strokeOpacity={l.opacity}
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}

          {/* Beam glow (blurred wide) */}
          <rect
            x={CW / 2 - 30}
            y={0}
            width={60}
            height={CH}
            fill="url(#beamLine)"
            filter="url(#beamBlur)"
            opacity={0.6}
          />
          {/* Beam core (blurred narrow) */}
          <rect
            x={CW / 2 - 6}
            y={0}
            width={12}
            height={CH}
            fill="url(#beamLine)"
            filter="url(#softBlur)"
            opacity={0.5}
          />

          {/* Expanding rings */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx={CW / 2}
              cy={CH - 20}
              r={20}
              fill="none"
              stroke="#2563eb"
              strokeWidth="0.8"
              initial={{ r: 20, opacity: 0.5 }}
              animate={reduce ? {} : { r: [20, 160], opacity: [0.4, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut",
              }}
            />
          ))}
        </svg>

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0"
          style={{ width: CW, height: CH }}
        />

        {/* Stat overlays */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-between px-6 pb-5">
          <div className="space-y-1">
            <p className="font-mono text-[11px] text-slate-600">pass rate</p>
            <p className="font-mono text-xl font-bold tabular-nums text-white">94.2%</p>
          </div>
          <div className="space-y-1 text-center">
            <p className="font-mono text-[11px] text-slate-600">throughput</p>
            <p className="font-mono text-xl font-bold tabular-nums text-white">40K+<span className="text-sm font-normal text-slate-500"> rec/hr</span></p>
          </div>
          <div className="space-y-1 text-right">
            <p className="font-mono text-[11px] text-slate-600">domains live</p>
            <p className="font-mono text-xl font-bold tabular-nums text-white">2+</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-white/8 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-blue-400"
            animate={reduce ? {} : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
          <span className="text-xs text-slate-500">
            Processing{" "}
            <span className="font-semibold text-slate-300">40,312</span> records/hr
          </span>
        </div>
        <span className="text-xs font-semibold text-blue-400">Paladio.ai</span>
      </div>
    </div>
  );
}
