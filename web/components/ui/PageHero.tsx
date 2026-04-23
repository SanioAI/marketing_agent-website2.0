import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  kicker: string;
  title: string;
  description: string;
  children?: ReactNode;
};

/**
 * Consistent top-of-page hero for marketing routes (Products, Solutions, etc.).
 */
export function PageHero({ kicker, title, description, children }: PageHeroProps) {
  return (
    <section className="gradient-surface border-b border-slate-200/60 py-14 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              {kicker}
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 text-pretty text-slate-600 sm:text-lg">{description}</p>
            {children ? <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div> : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
