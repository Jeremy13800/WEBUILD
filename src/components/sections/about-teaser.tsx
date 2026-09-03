import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";

/**
 * Section "Notre histoire" — construit LA MARQUE, pas la personne. La
 * homepage raconte pourquoi WeBuild existe ; /a-propos va plus loin et
 * révèle ensuite qui est derrière (voir la section dédiée sur cette page).
 * Distinction volontaire : mélanger les deux ici dilue le "reveal" plus
 * personnel de /a-propos.
 *
 * Volontairement sans photo (choix assumé, pas un manque) : le panneau
 * sombre reste un élément graphique abstrait (monogramme + repères), sans
 * aucune mention "à venir" qui donnerait une impression d'inachevé — voir
 * la même logique sur /a-propos.
 *
 * Même traitement que le panneau équivalent sur /a-propos (Tilt, lueur) —
 * cette variante homepage ne doit pas avoir l'air d'une version au rabais.
 */
export function AboutTeaser() {
  return (
    <section className="relative bg-paper py-24 sm:py-32">
      {/* Transition avec Process (juste avant, fond sombre) — même
          traitement qu'entre le Hero et "Le constat" : un voile ambre très
          faible qui se dissout dans le crème sur 50px, plus une ligne
          d'accent avec un halo resserré + un halo large très discret. Cette
          section n'a pas d'`overflow-hidden` (contrairement à Process) : la
          lueur peut donc déborder librement des deux côtés de la coupure. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12.5 bg-gradient-to-b from-clay-500/8 to-transparent" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-clay-400 to-transparent shadow-[0_0_16px_2px_rgba(217,119,20,0.55),0_0_28px_10px_rgba(217,119,20,0.08)]"
        aria-hidden
      />
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute inset-0 -z-10 rounded-full bg-clay-500/20 blur-[90px]" aria-hidden />

            <Tilt className="relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-lg)] bg-ink-950 shadow-[var(--shadow-lg)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-7xl font-normal text-clay-400 italic">
                  {siteConfig.name.charAt(0)}
                </span>
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
            kicker="Notre histoire"
            title="WeBuild est né d'un constat simple."
            subtitle="Les artisans consacrent leur énergie à leur métier, leurs chantiers et leurs clients. Pourtant, leur présence en ligne ne reflète pas toujours la qualité de leur travail."
          />
          <p className="max-w-lg text-sm leading-relaxed text-ink-soft">
            WeBuild est né pour réduire ce décalage : créer des sites clairs, modernes et efficaces, pensés pour
            mettre en valeur le savoir-faire des entreprises du bâtiment et faciliter le contact avec leurs futurs
            clients.
          </p>
          {/* Phrase signature de marque (pas une signature personnelle ici
              — celle-ci vit sur /a-propos, dans la section qui révèle qui
              se cache derrière WeBuild). Même trait cuivre que l'ancienne
              version, réutilisé pour introduire la phrase plutôt qu'un nom. */}
          <div className="flex items-start gap-3">
            <span className="mt-2.5 h-px w-8 shrink-0 bg-clay-500" aria-hidden />
            <p className="max-w-md font-[family-name:var(--font-display)] text-xl leading-snug font-normal text-ink">
              Votre métier mérite d&apos;être aussi bien présenté en ligne que sur le terrain.
            </p>
          </div>
          <ButtonLink href="/a-propos" variant="secondary-light">
            Découvrir l&apos;histoire de WeBuild
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
