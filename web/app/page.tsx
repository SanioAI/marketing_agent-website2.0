import { Hero } from "@/components/landing/Hero";
import { SocialProof } from "@/components/landing/SocialProof";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ProductsSection } from "@/components/landing/ProductsSection";
import { BeforeAfter } from "@/components/landing/BeforeAfter";
import { UseCases } from "@/components/landing/UseCases";
import { DemoSection } from "@/components/landing/DemoSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { ContactSection } from "@/components/landing/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <ProblemSection />
      <ProductsSection />
      <BeforeAfter />
      <UseCases />
      <DemoSection />
      <FinalCta />
      <ContactSection />
    </main>
  );
}
