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
      <article className="border-b border-line/60 gradient-surface">
        <Container>
          <div className="mx-auto max-w-2xl py-12 sm:py-16">
            <p className="text-sm text-surface-muted">
              <Link
                href="/resources#blog"
                className="font-medium text-ink hover:text-ink-deep"
              >
                ← Resources
              </Link>
            </p>
            <p className="section-kicker mt-6 w-fit">
              <span className="dot" aria-hidden />
              {kicker}
            </p>
            <h1 className="heading-page mt-4 text-balance text-surface">
              {title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-surface-muted">
              <span className="rounded-full border border-line bg-paper/80 px-2 py-0.5 text-xs font-medium text-surface">
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
      <div className="gradient-surface">
        <Container>
          <div className="mx-auto max-w-2xl py-12 sm:py-16">{children}</div>
        </Container>
      </div>
    </main>
  );
}
