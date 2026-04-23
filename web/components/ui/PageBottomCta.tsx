import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/landing/buttons";

type PageBottomCtaProps = {
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

export function PageBottomCta({ title, description, primary, secondary }: PageBottomCtaProps) {
  return (
    <section className="border-t border-slate-200/60 bg-gradient-to-b from-slate-50/90 via-white to-white py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
            <p className="mt-3 text-pretty text-slate-600 sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href={primary.href} variant="primaryLg">
                {primary.label}
              </ButtonLink>
              <ButtonLink href={secondary.href} variant="secondaryLg">
                {secondary.label}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
