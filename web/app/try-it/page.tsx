import { TryItYourselfSection } from "@/components/try-it/TryItYourselfSection";
import { PageHero } from "@/components/ui/PageHero";

export const metadata = {
  title: "Try It",
};

export default function TryItPage() {
  return (
    <main className="pt-16">
      <PageHero
        kicker="Live demo"
        title="Enrich a catalog in minutes"
        description="Upload a CSV or paste PDP URLs. Watch the pipeline work across data quality, content and SEO, and compliance—then download full exports in XLSX, CSV, or JSON."
      />
      <TryItYourselfSection showPageTitle={false} underPageHero />
    </main>
  );
}

