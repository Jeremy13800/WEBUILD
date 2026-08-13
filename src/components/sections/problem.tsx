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
    <section id="apres-hero" className="bg-paper py-24 sm:py-32">
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
