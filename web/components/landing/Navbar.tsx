"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

type SimpleItem = { label: string; href: string; children?: undefined };
type DropdownItem = { label: string; href?: undefined; children: Child[] };
type NavItem = SimpleItem | DropdownItem;
type Child = { label: string; href: string; desc: string };

type Agent = { label: string; desc: string };

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATALOG_AGENTS: Agent[] = [
  { label: "Extraction Agent",  desc: "Extract structured attributes" },
  { label: "Bundle Agent",      desc: "Detect multi-item bundles" },
  { label: "Taxonomy Agent",    desc: "Classify products into 6,000+ categories" },
  { label: "Schema Agent",      desc: "Generate Schema.org markup" },
  { label: "Enrichment Agent",  desc: "Add missing product data" },
  { label: "Content Agent",     desc: "Generate product titles and descriptions" },
  { label: "SEO Agent",         desc: "Generate meta titles and descriptions" },
  { label: "Hazmat Agent",      desc: "Detect hazardous materials" },
  { label: "Compliance Agent",  desc: "Handle tax codes and regulations" },
];

const PLATFORM_ITEMS = [
  {
    label: "Catalog Agents",
    href: "/catalog-agents",
    desc: "AI-powered product data enrichment",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="#2563eb" opacity="0.9" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" fill="#2563eb" opacity="0.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" fill="#2563eb" opacity="0.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#2563eb" opacity="0.25" />
      </svg>
    ),
  },
  {
    label: "Catalog Readiness",
    href: "/catalog-readiness",
    desc: "Score and improve your catalog health",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="7" stroke="#2563eb" strokeWidth="1.5" opacity="0.4" />
        <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Product Intelligence",
    href: "/product-intelligence",
    desc: "Deep insights across your product data",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="2" y="10" width="3" height="6" rx="1" fill="#2563eb" opacity="0.4" />
        <rect x="7.5" y="6" width="3" height="10" rx="1" fill="#2563eb" opacity="0.65" />
        <rect x="13" y="2" width="3" height="14" rx="1" fill="#2563eb" />
      </svg>
    ),
  },
];

const SIMPLE_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Solutions",
    children: [
      { label: "E-commerce", href: "/catalog-agents", desc: "Catalog enrichment for distributors & retailers" },
      { label: "AEC", href: "/agents/aec", desc: "Preconstruction agents for construction teams" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/resources", desc: "Updates, guides, and product news" },
      { label: "Articles", href: "/resources/articles", desc: "In-depth reads on AI and catalog ops" },
      { label: "Case Studies", href: "/resources/case-studies", desc: "Real results from real deployments" },
    ],
  },
];

// ─── Shared ────────────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 12 12" fill="none"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path d="M2 4.5L6 8L10 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Platform Mega-Menu ────────────────────────────────────────────────────────

function PlatformMegaMenu() {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isActive = PLATFORM_ITEMS.some((p) => pathname === p.href);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100/80 hover:text-slate-900 ${
          isActive ? "font-medium text-slate-900" : "text-slate-600"
        }`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        Platform
        <ChevronIcon open={open} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-1.5 flex overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/12"
            style={{ width: 560 }}
          >
            {/* Left: platform items */}
            <div className="w-56 shrink-0 border-r border-slate-100 bg-slate-50/60 p-2">
              <p className="px-3 pb-1.5 pt-2 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Platform
              </p>
              {PLATFORM_ITEMS.map((item, i) => (
                <button
                  key={item.label}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => setOpen(false)}
                  className={`group flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    activeIdx === i ? "bg-white shadow-sm" : "hover:bg-white/70"
                  }`}
                >
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
                    activeIdx === i ? "border-blue-100 bg-blue-50" : "border-slate-200 bg-white"
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <Link
                      href={item.href}
                      className={`block text-sm font-medium transition ${
                        activeIdx === i ? "text-blue-700" : "text-slate-900"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <p className="mt-0.5 text-xs text-slate-500">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: sub-agents (only for Catalog Agents) */}
            <div className="flex-1 p-4">
              {activeIdx === 0 ? (
                <>
                  <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                    Catalog Agent Suite
                  </p>
                  <div className="grid grid-cols-1 gap-0.5">
                    {CATALOG_AGENTS.map((agent) => (
                      <Link
                        key={agent.label}
                        href="/catalog-agents"
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-lg px-3 py-2 transition hover:bg-slate-50"
                      >
                        <div>
                          <span className="block text-sm font-medium text-slate-900 group-hover:text-blue-700 transition-colors">
                            {agent.label}
                          </span>
                          <span className="text-xs text-slate-500">{agent.desc}</span>
                        </div>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-slate-300 group-hover:text-blue-400 transition-colors" aria-hidden>
                          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Link
                    href={PLATFORM_ITEMS[activeIdx].href}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-5 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
                  >
                    Go to {PLATFORM_ITEMS[activeIdx].label}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Regular dropdown ──────────────────────────────────────────────────────────

function DesktopDropdown({ item }: { item: DropdownItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const active = item.children.some((c) => pathname === c.href);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition hover:bg-slate-100/80 hover:text-slate-900 ${
          active ? "font-medium text-slate-900" : "text-slate-600"
        }`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full z-50 mt-1.5 w-60 overflow-hidden rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-xl shadow-slate-900/10"
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-2.5 transition hover:bg-slate-50 ${pathname === child.href ? "bg-blue-50/60" : ""}`}
              >
                <div className={`text-sm font-medium ${pathname === child.href ? "text-blue-700" : "text-slate-900"}`}>
                  {child.label}
                </div>
                <div className="mt-0.5 text-xs text-slate-500">{child.desc}</div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile nav item ───────────────────────────────────────────────────────────

function MobilePlatform({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const [agentsOpen, setAgentsOpen] = useState(false);

  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base text-slate-800 transition hover:bg-slate-100"
        onClick={() => setOpen((o) => !o)}
      >
        Platform
        <ChevronIcon open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-slate-100 pl-3 pb-1">
              {/* Catalog Agents with nested agents */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setAgentsOpen((o) => !o)}
                >
                  Catalog Agents
                  <ChevronIcon open={agentsOpen} />
                </button>
                <AnimatePresence>
                  {agentsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 flex flex-col gap-0.5 border-l border-slate-100 pl-3 pb-1">
                        {CATALOG_AGENTS.map((a) => (
                          <Link
                            key={a.label}
                            href="/catalog-agents"
                            onClick={onClose}
                            className="rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                          >
                            {a.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {PLATFORM_ITEMS.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-700"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (!item.children) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className={`rounded-xl px-3 py-2.5 text-base transition hover:bg-slate-100 ${
          pathname === item.href ? "font-medium text-blue-700" : "text-slate-800"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base text-slate-800 transition hover:bg-slate-100"
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-3 mt-0.5 flex flex-col gap-0.5 border-l border-slate-100 pl-3 pb-1">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onClose}
                  className={`rounded-lg px-3 py-2 text-sm transition hover:bg-slate-50 ${
                    pathname === child.href ? "font-medium text-blue-700" : "text-slate-700"
                  }`}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [elevated, setElevated] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setElevated(y > 8));

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          elevated ? "border-slate-200/80 glass shadow-sm" : "border-transparent bg-transparent"
        }`}
        initial={false}
        animate={{ y: 0 }}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <Image src="/images/paladio-logo.png" alt="Paladio.ai" width={140} height={40} priority className="h-12 w-auto" />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            <Link href="/" className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100/80 hover:text-slate-900">
              Home
            </Link>
            <PlatformMegaMenu />
            {SIMPLE_NAV.filter((n) => n.label !== "Home").map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link key={(item as SimpleItem).href} href={(item as SimpleItem).href}
                  className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100/80 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ButtonLink href="/try-it" variant="secondary">Try It</ButtonLink>
            <ButtonLink href="/about#contact" variant="primarySm">Book a Demo</ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200/80 bg-white/80 text-slate-800 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
          </button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xs overflow-y-auto border-l border-slate-200 bg-white p-6 shadow-xl md:hidden"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">Menu</p>
            <div className="mt-4 flex flex-col gap-1">
              <Link href="/" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-base text-slate-800 hover:bg-slate-100">Home</Link>
              <MobilePlatform onClose={() => setOpen(false)} />
              {SIMPLE_NAV.filter((n) => n.label !== "Home").map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setOpen(false)} />
              ))}
            </div>
            <div className="mt-6">
              <ButtonLink href="/about#contact" variant="primary" onClick={() => setOpen(false)} className="w-full">Book a Demo</ButtonLink>
              <ButtonLink href="/try-it" variant="secondary" onClick={() => setOpen(false)} className="mt-3 w-full">Try It</ButtonLink>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
