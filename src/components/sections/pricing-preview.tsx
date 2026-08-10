import { ArrowRight } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Version condensée des tarifs pour l'accueil — le détail complet vit sur /offres. */
export function PricingPreview() {
  return (
    <section id="offres" className="bg-paper-dim py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Offres & tarifs"
          title="Des tarifs clairs, sans jargon ni surprise."
          subtitle="Trois formules simples à comprendre. Le détail complet vous attend sur la page Offres."
        />

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {pricingTiers.map((tier, i) => (
            <Reveal
              key={tier.slug}
              delay={i * 0.06}
              className={cn(
                "flex flex-col gap-4 rounded-[var(--radius-lg)] border p-7",
                tier.recommended ? "border-clay-600 bg-card shadow-[var(--shadow-md)]" : "border-line bg-card",
              )}
            >
              {tier.recommended && (
                <span className="w-fit rounded-full bg-clay-100 px-3 py-1 text-xs font-semibold text-clay-700">
                  Recommandée
                </span>
              )}
              <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-ink">{tier.name}</h3>
              <span className="font-[family-name:var(--font-display)] text-3xl font-medium text-ink">
                {tier.fromPrice} €
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">{tier.description}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/offres" variant="secondary-light">
            Voir le détail des offres
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
