import { X, Check, ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem, revealItemVariants } from "@/components/motion/reveal";

const before = [
  "Aucun site, ou une simple page Facebook",
  "Un site créé il y a dix ans, jamais mis à jour",
  "Illisible ou mal cadré sur téléphone",
  "Impossible de savoir où vous intervenez ni ce que vous proposez",
  "Rien qui rassure un prospect qui ne vous connaît pas encore",
];

const after = [
  "Un site professionnel, à votre nom",
  "Un design actuel, pensé pour durer",
  "Parfaitement lisible sur tous les écrans",
  "Vos services et votre zone d'intervention clairement présentés",
  "Une image qui inspire confiance dès les premières secondes",
];

/**
 * Section Problème (brief §11). Ne jamais rabaisser l'artisan : le
 * message porte sur la réalité du secteur, pas sur le visiteur.
 *
 * Les deux cartes sont légèrement pivotées et se redressent au survol —
 * même vocabulaire que les mockups du portfolio — plutôt qu'une grille
 * plate à deux colonnes identiques. Le connecteur central rend la
 * transformation "avant → après" tangible au lieu de juste la suggérer.
 */
export function Problem() {
  return (
    <section id="apres-hero" className="relative bg-paper py-24 sm:py-32">
      {/* Ligne d'accent à la jonction avec le Hero — un premier essai en
          dégradé (noir → transparent) donnait une traînée grise sale sur
          le crème, pas un fondu propre. Ici, aucun mélange de couleur : une
          fine ligne ambre avec une légère lueur, en écho aux traits de
          lumière de la photo du Hero. Posée dans cette section (pas dans
          le Hero, qui a overflow-hidden) pour que la lueur déborde
          librement des deux côtés de la coupure.

          Deux couches supplémentaires, très discrètes, pour suggérer que
          la lumière du Hero "contamine" légèrement le début de cette
          section : un voile orange qui se dissout dans le crème sur 50px
          (pas un dégradé sombre comme le premier essai — uniquement de la
          couleur d'accent, jamais de noir), et un halo large mais très
          faible en plus du halo resserré existant sur la ligne elle-même. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12.5 bg-gradient-to-b from-clay-500/8 to-transparent" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-clay-400 to-transparent shadow-[0_0_16px_2px_rgba(217,119,20,0.55),0_0_28px_10px_rgba(217,119,20,0.08)]"
        aria-hidden
      />
      <Container>
        <SectionHeading
          kicker="Le constat"
          title="Votre travail est professionnel. Votre présence en ligne devrait l'être aussi."
          subtitle="Beaucoup d'artisans excellents dans leur métier restent invisibles ou mal représentés en ligne — non par manque de qualité, mais par manque de temps pour s'en occuper."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Connecteur central — visible seulement quand il y a la place de
              respirer entre les deux cartes. */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-paper shadow-[var(--shadow-md)] lg:flex"
            aria-hidden
          >
            <ArrowRight className="size-5 text-clay-600" strokeWidth={2.5} />
          </div>

          <Reveal className="group rounded-[var(--radius-lg)] border border-line bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:rotate-0 sm:p-10 lg:-rotate-1">
            <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">Trop souvent</p>
            <ul className="flex flex-col gap-4">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-paper-dim text-ink-faint">
                    <X className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <RevealGroup className="group rounded-[var(--radius-lg)] border border-clay-600/25 bg-ink-950 p-8 shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 hover:rotate-0 sm:p-10 lg:rotate-1">
            <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-clay-400 uppercase">Avec {siteConfig.name}</p>
            <ul className="flex flex-col gap-4">
              {after.map((item) => (
                <RevealItem key={item} variants={revealItemVariants} className="flex items-start gap-3 text-sand">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-clay-600/20 text-clay-400">
                    <Check className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
