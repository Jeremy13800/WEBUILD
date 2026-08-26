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
    <section id="faq" className="relative overflow-hidden bg-paper py-24 sm:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* Moitié basse de la ligne d'accent partagée avec FinalCta (juste
          après) — voir le commentaire dans benefits.tsx pour la logique
          (les deux sections ont `overflow-hidden`, la lueur ne peut pas
          déborder de l'une vers l'autre). */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-clay-400 to-transparent shadow-[0_0_16px_2px_rgba(217,119,20,0.55),0_0_28px_10px_rgba(217,119,20,0.08)]"
        aria-hidden
      />
      <Container className="relative grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="relative">
          {/* Point d'interrogation géant en filigrane — même langage que le
              numéro en filigrane des Bénéfices, pour que la colonne de
              gauche ne soit pas qu'un bloc de texte nu à côté de
              l'accordéon. */}
          <span
            className="pointer-events-none absolute -top-10 -left-4 font-[family-name:var(--font-display)] text-[11rem] leading-none font-normal text-clay-600/[0.06] italic select-none"
            aria-hidden
          >
            ?
          </span>
          <SectionHeading
            className="relative"
            kicker="Questions fréquentes"
            title="Ce que les artisans me demandent le plus souvent."
            subtitle="Des réponses simples, sans jargon. Une autre question ? Écrivez-moi directement."
          />
        </div>

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
