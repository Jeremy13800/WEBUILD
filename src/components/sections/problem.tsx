import { X, Check, ArrowRight, ArrowDown } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Kicker } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem, revealItemVariants } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";

const before = [
  "Aucun site ou simple page Facebook",
  "Site vieillissant, rarement mis à jour",
  "Mauvaise expérience sur mobile",
  "Services et zone d'intervention peu clairs",
  "Peu d'éléments pour rassurer un prospect",
];

const after = [
  "Un vrai site professionnel",
  "Un design moderne et durable",
  "Parfait sur tous les écrans",
  "Services et zone clairement présentés",
  "Une image qui inspire confiance",
];

/**
 * Section Problème (brief §11). Ne jamais rabaisser l'artisan : le
 * message porte sur la réalité du secteur, pas sur le visiteur.
 *
 * Les deux cartes sont légèrement pivotées et se redressent au survol —
 * même vocabulaire que les mockups du portfolio — plutôt qu'une grille
 * plate à deux colonnes identiques. Le connecteur central rend la
 * transformation "avant → après" tangible au lieu de juste la suggérer.
 *
 * Titre à deux tons composé directement ici (Kicker + SplitText multi-
 * segments), comme le Hero et FinalCta le font déjà ailleurs sur le site —
 * pas via <SectionHeading>, dont le prop `title` est une simple chaîne
 * monochrome et ne permet pas de ne colorer qu'un segment. Modifier
 * SectionHeading pour ce seul besoin aurait un effet de bord sur toutes les
 * autres sections qui l'utilisent ; cette page reste donc la seule touchée.
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
      {/* `max-w-[1300px]` : un peu plus large que la grille par défaut du
          site (1240px, voir ui/container.tsx) pour que titre, cartes et
          conclusion respirent davantage sur grand écran, sans atteindre la
          largeur `wideContainer` réservée au Hero de l'accueil. */}
      <Container className="max-w-[1300px]">
        <Reveal>
          <Kicker>Le constat</Kicker>
        </Reveal>

        <h2 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-5xl leading-[1] font-normal tracking-[-0.01em] text-ink sm:text-6xl lg:text-[4.2rem]">
          <SplitText
            trigger="inView"
            segments={[
              { text: "Votre travail est professionnel." },
              { text: "Votre présence en ligne", className: "text-clay-600" },
              { text: "devrait l'être aussi." },
            ]}
          />
        </h2>

        <Reveal delay={0.05}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Beaucoup d&apos;artisans excellents dans leur métier restent invisibles ou mal représentés en ligne — non
            par manque de qualité, mais par manque de temps pour s&apos;en occuper.
          </p>
        </Reveal>

        {/* Comparateur — gap volontairement resserré (`gap-4` en 2 colonnes,
            contre `gap-8/10` avant) : la flèche centrale doit chevaucher les
            deux cartes, pas flotter dans un grand vide entre elles. Bascule
            en 2 colonnes dès `sm` (pas seulement `lg`) pour que la tablette
            garde la comparaison côte à côte tant que la lisibilité le
            permet. */}
        <div className="group relative mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 sm:mt-16">
          {/* Connecteur horizontal — desktop/tablette (`sm:` et plus) : passe
              au-dessus des deux cartes (voir le centrage ci-dessous). Le
              centrage (`-translate-x/y-1/2`) reste sur un élément statique :
              Framer Motion prend le contrôle intégral du `transform` dès
              qu'il anime `y` (voir Reveal), ce qui écraserait ce centrage
              CSS si on l'appliquait directement dessus. */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 z-10 hidden size-14 -translate-x-1/2 -translate-y-1/2 sm:block"
            aria-hidden
          >
            <Reveal
              delay={0.15}
              className="flex size-14 items-center justify-center rounded-full border border-line bg-paper shadow-[var(--shadow-md)] transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <ArrowRight className="size-5 text-clay-600" strokeWidth={2.5} />
            </Reveal>
          </div>

          <Reveal className="rounded-[18px] border border-line bg-card p-8 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:rotate-0 sm:p-12 lg:-rotate-1">
            <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">Trop souvent</p>
            <ul className="flex flex-col divide-y divide-line">
              {before.map((item) => (
                <li key={item} className="flex items-center gap-3.5 py-3.5 text-ink-soft first:pt-0 last:pb-0">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-paper-dim text-ink-faint">
                    <X className="size-4" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Connecteur vertical — mobile uniquement (sous `sm`), en flux
              normal entre les deux cartes empilées : une flèche horizontale
              n'a pas de sens entre deux blocs verticaux. */}
          <div className="flex items-center justify-center py-1 sm:hidden" aria-hidden>
            <Reveal
              delay={0.1}
              className="flex size-11 items-center justify-center rounded-full border border-line bg-paper shadow-[var(--shadow-md)]"
            >
              <ArrowDown className="size-4 text-clay-600" strokeWidth={2.5} />
            </Reveal>
          </div>

          {/* Carte WeBuild — présence très légèrement supérieure à la carte
              de gauche (padding sm:p-13 contre sm:p-12, léger décalage vers
              le haut) et une lueur chaude diffuse sur les contours (pas un
              blob interne façon "glow SaaS"), pour que le regard soit
              naturellement attiré ici plutôt que sur "Trop souvent". Le nom
              de la marque reste dynamique (`siteConfig.name`, pas de chaîne
              en dur) — convention déjà en place sur `main`. */}
          <RevealGroup className="rounded-[18px] border border-clay-600/30 bg-ink-950 p-8 shadow-[0_28px_64px_rgba(18,14,10,0.28),0_0_50px_-18px_rgba(199,108,52,0.4)] transition-all duration-300 hover:-translate-y-1 hover:rotate-0 sm:p-13 lg:-translate-y-2 lg:rotate-1">
            <p className="mb-5 text-xs font-semibold tracking-[0.14em] text-clay-400 uppercase">Avec {siteConfig.name}</p>
            <ul className="flex flex-col divide-y divide-white/10">
              {after.map((item) => (
                <RevealItem
                  key={item}
                  variants={revealItemVariants}
                  className="flex items-center gap-3.5 py-3.5 text-sand first:pt-0 last:pb-0"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-clay-500/40 text-clay-400">
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                  <span>{item}</span>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>

        {/* Conclusion — referme le raisonnement de la section sans devenir
            un second H2 ni introduire de CTA (celui-ci vient plus bas, dans
            Portfolio/FinalCta). Deux lignes forcées via `<br />` (texte
            simple, pas de SplitText ici) plutôt qu'un retour à la ligne
            naturel qui dépendrait de la largeur — fragile, voir le H1 de
            /contact qui tombait sur 3 lignes avant ce même correctif. */}
        <Reveal delay={0.1} className="mt-16 text-center sm:mt-20">
          <span className="mx-auto mb-5 block h-px w-10 bg-clay-500" aria-hidden />
          <p className="mx-auto max-w-lg font-[family-name:var(--font-display)] text-2xl leading-snug font-normal text-ink sm:text-3xl">
            Votre savoir-faire est déjà là.
            <br />
            <span className="text-clay-600 italic">À nous de le rendre visible.</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
