import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

/**
 * Section humaine (brief §19) : le visiteur doit sentir qu'il parle à une
 * vraie personne, pas à une agence anonyme. Emplacement photo prévu et
 * clairement identifié en attendant un vrai portrait professionnel.
 */
export function AboutTeaser() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          {/* TODO(client) : remplacer par une vraie photographie professionnelle. */}
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] bg-ink-950">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-[family-name:var(--font-display)] text-7xl font-medium text-clay-400 italic">
                {siteConfig.name.charAt(0)}
              </span>
            </div>
            <div className="absolute right-5 bottom-5 left-5 rounded-[var(--radius-sm)] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <p className="text-xs text-sand-faint">Photo à venir</p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 flex flex-col items-start gap-6 lg:order-2">
          <SectionHeading
            kicker="Qui se cache derrière WeBatisseur"
            title="Une personne qui comprend les petites entreprises."
            subtitle="Pas une agence anonyme avec un chargé de compte différent à chaque appel : vous échangez directement avec la personne qui conçoit votre site, du premier échange à la mise en ligne."
          />
          <p className="max-w-lg text-sm leading-relaxed text-ink-soft">
            Je me suis spécialisé dans les sites web pour artisans parce que ce sont des entreprises qui font un
            travail exigeant, souvent sans le temps ni les outils pour le montrer correctement en ligne. Mon rôle :
            vous rendre ce temps, avec un site qui représente vraiment la qualité de ce que vous livrez.
          </p>
          <ButtonLink href="/a-propos" variant="secondary-light">
            En savoir plus sur WeBatisseur
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
