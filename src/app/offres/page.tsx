import type { Metadata } from "next";
import { Kicker } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { PricingTable } from "@/components/sections/pricing-table";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "Offres & tarifs",
  description:
    "Trois offres simples et transparentes pour créer le site internet de votre entreprise artisanale : Essentiel, Business, Premium. Sans jargon, sans surprise.",
};

const pricingFaq = faqItems.filter((f) =>
  ["Combien coûte", "Comment se passe le paiement", "Le site m'appartient"].some((k) => f.question.includes(k)),
);

export default function OffresPage() {
  return (
    <>
      <section className="bg-ink-950 pt-16 pb-20 text-white sm:pt-20 sm:pb-24">
        <Container>
          <Reveal>
            <Kicker className="text-clay-400">Offres & tarifs</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-medium tracking-[-0.01em] sm:text-5xl">
              Des tarifs clairs, pensés pour une TPE — pas pour un grand compte.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg text-sand">
              Trois formules simples à comprendre, sans ligne cachée. Chaque offre est décrite avec ce qu&apos;elle
              apporte concrètement à votre entreprise.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-20 sm:py-28">
        <Container>
          <PricingTable />
        </Container>
      </section>

      {pricingFaq.length > 0 && (
        <section className="border-t border-line bg-paper-dim py-20 sm:py-28">
          <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Kicker>Questions sur les tarifs</Kicker>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium text-ink sm:text-3xl">
                Avant de vous décider
              </h2>
            </div>
            <FaqAccordion items={pricingFaq} />
          </Container>
        </section>
      )}
    </>
  );
}
