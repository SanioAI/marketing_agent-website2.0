import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { CatalogAgentsGrid } from "@/components/landing/CatalogAgentsGrid";
import { ProductsSection } from "@/components/landing/ProductsSection";
import { TrustSection } from "@/components/landing/TrustSection";
import { UseCases } from "@/components/landing/UseCases";
import { DemoSection } from "@/components/landing/DemoSection";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCta } from "@/components/landing/FinalCta";
import { ContactSection } from "@/components/landing/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <ProblemSection />
      <CatalogAgentsGrid />
      <ProductsSection />
      <TrustSection />
      <UseCases />
      <DemoSection />
      <FAQ />
      <FinalCta />
      <ContactSection />
    </main>
  );
}
