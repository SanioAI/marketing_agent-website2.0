"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 py-16">
      <div className="max-w-md text-center">
        <p className="text-sm font-medium text-muted">Something went wrong</p>
        <h1 className="heading-page mt-2 text-foreground">
          We couldn&apos;t load this page
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Please try again. If the problem continues, refresh the page or come back in a few
          minutes.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex h-11 items-center justify-center rounded bg-lime px-6 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-px"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
