import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Legal"
        title="Terms of Service"
        description="This is a placeholder terms page. Replace with your final legal text before going live."
      />
      <section className="bg-white py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-700">
            <p className="font-medium text-slate-900">Summary</p>
            <p className="mt-3 text-slate-600">
              Use of this site is provided as-is. Any demos are for evaluation only. Contact us for
              production terms and security requirements.
            </p>
            <p className="mt-6 text-xs text-slate-500">
              Replace this page with your final terms.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

