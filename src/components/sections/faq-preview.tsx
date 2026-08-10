import { faqItems } from "@/data/faq";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { FaqAccordion } from "@/components/sections/faq-accordion";

export function FaqPreview() {
  const shown = faqItems.slice(0, 6);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: shown.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id="faq" className="bg-paper py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          kicker="Questions fréquentes"
          title="Ce que les artisans me demandent le plus souvent."
          subtitle="Des réponses simples, sans jargon. Une autre question ? Écrivez-moi directement."
        />

        <Reveal>
          <FaqAccordion items={shown} />
          <ButtonLink href="/contact" variant="secondary-light" className="mt-8">
            Poser ma question
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
