import type { ReactNode } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

type ArticleLayoutProps = {
  kicker: string;
  title: string;
  dateIso: string;
  dateDisplay: string;
  tag: string;
  readMin: number;
  children: ReactNode;
};

export function ArticleLayout({
  kicker,
  title,
  dateIso,
  dateDisplay,
  tag,
  readMin,
  children,
}: ArticleLayoutProps) {
  return (
    <main className="pt-16">
      <article className="border-b border-slate-200/60 gradient-surface">
        <Container>
          <div className="mx-auto max-w-2xl py-12 sm:py-16">
            <p className="text-sm text-slate-500">
              <Link
                href="/resources#blog"
                className="font-medium text-indigo-700 hover:text-indigo-900"
              >
                ← Resources
              </Link>
            </p>
            <p className="section-kicker mt-6 w-fit">
              <span className="dot" aria-hidden />
              {kicker}
            </p>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-600">
              <span className="rounded-full border border-slate-200/80 bg-white/80 px-2 py-0.5 text-xs font-medium text-slate-700">
                {tag}
              </span>
              <span aria-hidden>·</span>
              <time dateTime={dateIso}>{dateDisplay}</time>
              <span aria-hidden>·</span>
              <span>{readMin} min read</span>
            </div>
          </div>
        </Container>
      </article>
      <div className="bg-white">
        <Container>
          <div className="mx-auto max-w-2xl py-12 sm:py-16">{children}</div>
        </Container>
      </div>
    </main>
  );
}
