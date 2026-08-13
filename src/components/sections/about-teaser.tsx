import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";

/**
 * Section humaine (brief §19) : le visiteur doit sentir qu'il parle à une
 * vraie personne, pas à une agence anonyme. Emplacement photo prévu et
 * clairement identifié en attendant un vrai portrait professionnel.
 *
 * Même traitement que la photo équivalente sur /a-propos (Tilt, lueur) —
 * cette variante homepage ne doit pas avoir l'air d'une version au rabais.
 */
export function AboutTeaser() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 -z-10 rounded-full bg-clay-500/20 blur-[90px]" aria-hidden />

            {/* TODO(client) : remplacer par une vraie photographie professionnelle. */}
            <Tilt className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-ink-950 shadow-[var(--shadow-lg)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-7xl font-normal text-clay-400 italic">
                  {siteConfig.name.charAt(0)}
                </span>
              </div>
              <div className="absolute right-5 bottom-5 left-5 rounded-[var(--radius-sm)] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-xs text-sand-faint">Photo à venir</p>
              </div>
            </Tilt>

            {/* Repères d'angle — même motif que le Hero, en tons sombres
                pour rester lisibles sur fond clair. */}
            <div
              className="pointer-events-none absolute -top-4 -left-4 size-8 border-t-2 border-l-2 border-clay-500/40"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-4 -bottom-4 size-8 border-r-2 border-b-2 border-clay-500/40"
              aria-hidden
            />

            <div className="absolute -right-5 top-8 hidden rounded-full border border-line bg-card px-4 py-2.5 text-xs font-semibold whitespace-nowrap text-ink shadow-[var(--shadow-md)] sm:block">
              Un seul interlocuteur, du début à la fin
            </div>
          </div>
        </Reveal>

        <div className="order-1 flex flex-col items-start gap-6 lg:order-2">
          <SectionHeading
            kicker={`Qui se cache derrière ${siteConfig.name}`}
            title="Une personne qui comprend les petites entreprises."
            subtitle="Pas une agence anonyme avec un chargé de compte différent à chaque appel : vous échangez directement avec la personne qui conçoit votre site, du premier échange à la mise en ligne."
          />
          <p className="max-w-lg text-sm leading-relaxed text-ink-soft">
            Je me suis spécialisé dans les sites web pour artisans parce que ce sont des entreprises qui font un
            travail exigeant, souvent sans le temps ni les outils pour le montrer correctement en ligne. Mon rôle :
            vous rendre ce temps, avec un site qui représente vraiment la qualité de ce que vous livrez.
          </p>
          <ButtonLink href="/a-propos" variant="secondary-light">
            En savoir plus sur {siteConfig.name}
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
