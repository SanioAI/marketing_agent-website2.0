"use client";

import { useEffect, useState } from "react";
import { getTheme, setTheme, type Theme } from "@/lib/theme";

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 1.5V3M9 15v1.5M1.5 9H3M15 9h1.5M3.4 3.4l1.1 1.1M13.5 13.5l1.1 1.1M3.4 14.6l1.1-1.1M13.5 4.5l1.1-1.1"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M13.8 10.2a5.5 5.5 0 0 1-7-7 5.5 5.5 0 1 0 7 7Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ThemeToggleProps = {
  className?: string;
  /** When true, styles for sitting over the dark hero (not scrolled). */
  overHero?: boolean;
};

export function ThemeToggle({ className = "", overHero = false }: ThemeToggleProps) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  }

  const label = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={[
        "inline-flex h-9 w-9 items-center justify-center rounded border transition",
        overHero
          ? "border-line-dark bg-ink/60 text-paper hover:border-paper hover:bg-ink"
          : theme === "dark"
            ? "border-line-dark bg-ink text-paper hover:border-paper hover:bg-ink-deep"
            : "border-line bg-paper-dim text-ink hover:border-ink hover:bg-paper",
        className,
      ].join(" ")}
    >
      {mounted ? (theme === "dark" ? <SunIcon /> : <MoonIcon />) : <MoonIcon />}
    </button>
  );
}
