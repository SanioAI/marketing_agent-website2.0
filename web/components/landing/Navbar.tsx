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

type Child = { label: string; href: string; desc: string };
type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: undefined; children: Child[] };

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Platform",
    children: [
      {
        label: "Catalog Agents",
        href: "/agents/ecommerce",
        desc: "AI-powered product data enrichment",
      },
      {
        label: "Catalog Readiness",
        href: "/platform/catalog-readiness",
        desc: "Score and improve your catalog health",
      },
      {
        label: "Product Intelligence",
        href: "/platform/product-intelligence",
        desc: "Deep insights across your product data",
      },
    ],
  },
  {
    label: "Listing Solution",
    children: [
      {
        label: "E-commerce",
        href: "/agents/ecommerce",
        desc: "Catalog enrichment for distributors & retailers",
      },
      {
        label: "AEC",
        href: "/agents/aec",
        desc: "Preconstruction agents for construction teams",
      },
    ],
  },
  {
    label: "Resources",
    children: [
      {
        label: "Blog",
        href: "/resources",
        desc: "Updates, guides, and product news",
      },
      {
        label: "Articles",
        href: "/resources/articles",
        desc: "In-depth reads on AI and catalog ops",
      },
      {
        label: "Case Studies",
        href: "/resources/case-studies",
        desc: "Real results from real deployments",
      },
    ],
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden
    >
      <path
        d="M2 4.5L6 8L10 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DesktopDropdown({ item }: { item: NavItem & { children: Child[] } }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const active = item.children.some((c) => pathname === c.href);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
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
                className={`block rounded-lg px-3 py-2.5 transition hover:bg-slate-50 ${
                  pathname === child.href ? "bg-blue-50/60" : ""
                }`}
              >
                <div
                  className={`text-sm font-medium ${
                    pathname === child.href ? "text-blue-700" : "text-slate-900"
                  }`}
                >
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

function MobileNavItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
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
                    pathname === child.href
                      ? "font-medium text-blue-700"
                      : "text-slate-700"
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

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [elevated, setElevated] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setElevated(y > 8);
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
          elevated
            ? "border-slate-200/80 glass shadow-sm"
            : "border-transparent bg-transparent"
        }`}
        initial={false}
        animate={{ y: 0 }}
      >
        <Container className="flex h-16 items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/paladio-logo.png"
              alt="Paladio.ai"
              width={140}
              height={40}
              priority
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
            {NAV.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100/80 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-3 md:flex">
            <ButtonLink href="/try-it" variant="secondary">
              Try It
            </ButtonLink>
            <ButtonLink href="/about#contact" variant="primarySm">
              Book a Demo
            </ButtonLink>
          </div>

          {/* Mobile hamburger */}
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

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-xs border-l border-slate-200 bg-white p-6 shadow-xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
          >
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Menu
            </p>
            <div className="mt-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  onClose={() => setOpen(false)}
                />
              ))}
            </div>
            <div className="mt-6">
              <ButtonLink
                href="/about#contact"
                variant="primary"
                onClick={() => setOpen(false)}
                className="w-full"
              >
                Book a Demo
              </ButtonLink>
              <ButtonLink
                href="/try-it"
                variant="secondary"
                onClick={() => setOpen(false)}
                className="mt-3 w-full"
              >
                Try It
              </ButtonLink>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
