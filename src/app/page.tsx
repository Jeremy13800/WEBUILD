import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
import { Benefits } from "@/components/sections/benefits";
import { Process } from "@/components/sections/process";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { PricingPreview } from "@/components/sections/pricing-preview";
import { FaqPreview } from "@/components/sections/faq-preview";
import { FinalCta } from "@/components/sections/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <PortfolioPreview />
      <Benefits />
      <Process />
      <AboutTeaser />
      <PricingPreview />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
