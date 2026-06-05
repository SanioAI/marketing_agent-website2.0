"use client";

import { useEffect } from "react";
import { getTheme, setTheme, THEME_STORAGE_KEY } from "@/lib/theme";

/** Keeps document theme in sync after hydration (toggle, storage, system changes). */
export function ThemeProvider() {
  useEffect(() => {
    setTheme(getTheme());

    const onStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) return;
      if (event.newValue === "light" || event.newValue === "dark") {
        setTheme(event.newValue);
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return null;
}
