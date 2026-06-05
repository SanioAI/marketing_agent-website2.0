"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background font-sans antialiased text-foreground">
        <div className="flex min-h-dvh flex-col items-center justify-center px-6">
          <div className="max-w-md text-center">
            <h1 className="text-xl font-semibold text-slate-900">Application error</h1>
            <p className="mt-2 text-sm text-slate-600">
              Please try again or reload the page.
            </p>
            <button
              type="button"
              onClick={() => reset()}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-slate-900 px-6 text-sm font-medium text-white"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
