"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";
import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

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
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100/80 hover:text-slate-900"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <ButtonLink href="/try-it" variant="secondary">
              Try It
            </ButtonLink>
            <ButtonLink href="/about#contact" variant="primarySm">
              Book a Demo
            </ButtonLink>
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
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
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
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-base text-slate-800 hover:bg-slate-100"
                >
                  {l.label}
                </Link>
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
