"use client";

import { useEffect, useRef, useState } from "react";
import { getTheme, type Theme } from "@/lib/theme";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="var(--lime)" opacity="0.9" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" fill="var(--lime)" opacity="0.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" fill="var(--lime)" opacity="0.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="var(--lime)" opacity="0.25" />
      </svg>
    ),
  },
  {
    label: "Catalog Readiness",
    href: "/catalog-readiness",
    desc: "Score and improve your catalog health",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <circle cx="9" cy="9" r="7" stroke="var(--lime)" strokeWidth="1.5" opacity="0.4" />
        <path d="M5.5 9.5L7.5 11.5L12.5 6.5" stroke="var(--lime)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Product Intelligence",
    href: "/product-intelligence",
    desc: "Deep insights across your product data",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <rect x="2" y="10" width="3" height="6" rx="1" fill="var(--lime)" opacity="0.4" />
        <rect x="7.5" y="6" width="3" height="10" rx="1" fill="var(--lime)" opacity="0.65" />
        <rect x="13" y="2" width="3" height="14" rx="1" fill="var(--lime)" />
      </svg>
    ),
  },
  {
    label: "Ranker",
    href: "/ranker",
    desc: "Score your catalog in AI shopping agents",
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M9 2L11 7H16L12 10.5L13.5 16L9 13L4.5 16L6 10.5L2 7H7L9 2Z" fill="var(--lime)" opacity="0.7" />
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
        className={`nav-link flex items-center gap-1 rounded-lg px-3 py-2 text-sm ${
          isActive ? "font-medium" : ""
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
            className="theme-popover absolute left-0 top-full z-50 mt-1.5 flex overflow-hidden rounded-[4px]"
            style={{ width: 560 }}
          >
            {/* Left: platform items */}
            <div className="theme-popover-muted w-56 shrink-0 border-r border-border p-2">
              <p className="theme-popover-kicker px-3 pb-1.5 pt-2">
                Platform
              </p>
              {PLATFORM_ITEMS.map((item, i) => (
                <button
                  key={item.label}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => setOpen(false)}
                  className={`group flex w-full items-start gap-3 rounded-[4px] px-3 py-2.5 text-left transition ${
                    activeIdx === i ? "bg-background shadow-sm" : "theme-hover"
                  }`}
                >
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition ${
                    activeIdx === i ? "border-line bg-paper-dim" : "border-border bg-background"
                  }`}>
                    {item.icon}
                  </div>
                  <div>
                    <Link
                      href={item.href}
                      className={`block text-sm font-medium transition ${
                        activeIdx === i ? "text-lime" : "text-foreground"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    <p className="mt-0.5 text-xs text-muted">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Right: sub-agents (only for Catalog Agents) */}
            <div className="flex-1 p-4">
              {activeIdx === 0 ? (
                <>
                  <p className="theme-popover-kicker mb-2 px-1">
                    Catalog Agent Suite
                  </p>
                  <div className="grid grid-cols-1 gap-0.5">
                    {CATALOG_AGENTS.map((agent) => (
                      <Link
                        key={agent.label}
                        href="/catalog-agents"
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between rounded-[4px] px-3 py-2 transition theme-hover"
                      >
                        <div>
                          <span className="block text-sm font-medium text-foreground group-hover:text-lime transition-colors">
                            {agent.label}
                          </span>
                          <span className="text-xs text-muted">{agent.desc}</span>
                        </div>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-slate-300 group-hover:text-lime transition-colors" aria-hidden>
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
                    className="inline-flex items-center gap-2 rounded-xl bg-paper-dim px-5 py-3 text-sm font-medium text-ink hover:bg-paper-dim transition"
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
        className={`nav-link flex items-center gap-1 rounded-lg px-3 py-2 text-sm ${
          active ? "font-medium" : ""
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
            className="theme-popover absolute left-0 top-full z-50 mt-1.5 w-60 overflow-hidden rounded-[4px] p-1.5"
          >
            {item.children.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className={`block rounded-[4px] px-3 py-2.5 transition theme-hover ${pathname === child.href ? "bg-paper-dim/60" : ""}`}
              >
                <div className={`text-sm font-medium ${pathname === child.href ? "text-lime" : "text-foreground"}`}>
                  {child.label}
                </div>
                <div className="mt-0.5 text-xs text-muted">{child.desc}</div>
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
        className="theme-menu-link flex w-full items-center justify-between rounded-[4px] px-3 py-2.5 text-base"
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
                            className="rounded-lg px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-ink"
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
                  className="rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-ink"
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
        className={`theme-menu-link rounded-[4px] px-3 py-2.5 text-base ${
          pathname === item.href ? "font-medium text-lime" : ""
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        className="theme-menu-link flex w-full items-center justify-between rounded-[4px] px-3 py-2.5 text-base"
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
                    pathname === child.href ? "font-medium text-ink" : "text-slate-700"
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
  const [theme, setTheme] = useState<Theme>("light");
  const { scrollY } = useScroll();
  const [elevated, setElevated] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setElevated(y > 8));

  useEffect(() => {
    const sync = () => setTheme(getTheme());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const overDarkHero = !elevated && theme === "dark";

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <motion.header
        data-elevated={elevated ? "true" : "false"}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          elevated ? "border-line/80 glass shadow-sm" : "border-transparent bg-transparent"
        }`}
        initial={false}
        animate={{ y: 0 }}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="flex items-center">
            <Image src="/images/paladio-logo.png" alt="Paladio.ai" width={140} height={40} priority className="h-12 w-auto" />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            <Link href="/" className="nav-link rounded-lg px-3 py-2 text-sm">
              Home
            </Link>
            <PlatformMegaMenu />
            {SIMPLE_NAV.filter((n) => n.label !== "Home").map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link key={(item as SimpleItem).href} href={(item as SimpleItem).href}
                  className="nav-link rounded-lg px-3 py-2 text-sm"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle overHero={overDarkHero} />
            <ButtonLink href="/try-it" variant={elevated || !overDarkHero ? "secondary" : "secondaryOnDark"}>
              Try It
            </ButtonLink>
            <ButtonLink href="/about#contact" variant="primarySm">Book a Demo</ButtonLink>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle overHero={overDarkHero} />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-line/80 bg-paper/80 text-ink"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
          </button>
          </div>
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
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xs overflow-y-auto border-l border-line bg-background p-6 shadow-xl md:hidden"
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <p className="section-kicker">Menu</p>
            <div className="mt-4 flex flex-col gap-1">
              <Link href="/" onClick={() => setOpen(false)} className="theme-menu-link rounded-[4px] px-3 py-2.5 text-base">Home</Link>
              <MobilePlatform onClose={() => setOpen(false)} />
              {SIMPLE_NAV.filter((n) => n.label !== "Home").map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setOpen(false)} />
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              <ThemeToggle />
              <span className="text-xs text-mute-paper">Theme</span>
            </div>
            <div className="mt-4">
              <ButtonLink href="/about#contact" variant="primary" onClick={() => setOpen(false)} className="w-full">Book a Demo</ButtonLink>
              <ButtonLink href="/try-it" variant="secondary" onClick={() => setOpen(false)} className="mt-3 w-full">Try It</ButtonLink>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
