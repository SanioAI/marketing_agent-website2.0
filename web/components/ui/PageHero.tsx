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
    <section className="gradient-surface border-b border-line/60 py-14 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-kicker mx-auto mb-4">
              <span className="dot" aria-hidden />
              {kicker}
            </p>
            <h1 className="heading-page text-surface text-balance">
              {title}
            </h1>
            <p className="section-lede mx-auto mt-6 text-pretty">{description}</p>
            {children ? <div className="mt-8 flex flex-wrap items-center justify-center gap-3">{children}</div> : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
