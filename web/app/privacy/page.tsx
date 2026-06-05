import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Legal"
        title="Privacy Policy"
        description="This is a placeholder privacy policy page. Replace with your final legal text before going live."
      />
      <section className="gradient-surface py-14 sm:py-16">
        <Container>
          <div className="mx-auto max-w-3xl text-sm leading-relaxed text-surface-muted">
            <p className="font-medium text-surface">Summary</p>
            <p className="mt-3">
              Paladio.ai collects contact details you submit (name, email, phone) only to respond to
              your request. We do not sell personal information.
            </p>
            <p className="mt-6 text-xs text-surface-muted">
              Replace this page with your final policy.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}

