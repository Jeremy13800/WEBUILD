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
              className="flex size-14 items-center justify-center rounded-full border border-clay-200/70 bg-paper shadow-[var(--shadow-md),0_4px_20px_-6px_rgba(199,108,52,0.25)] transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <ArrowRight className="size-5 text-clay-600" strokeWidth={2.5} />
            </Reveal>
          </div>

          {/* Carte "Trop souvent" — volontairement sobre et neutre : c'est
              la situation actuelle, pas le point focal. Fond légèrement
              distinct du crème de la section (`color-mix` entre les tokens
              --color-card et --color-paper, pas une nouvelle couleur), ombre
              très diffuse plutôt qu'un simple `shadow-sm`, hover à peine
              perceptible (max -2px, contre -10px pour la carte WeBuild). */}
          <Reveal className="rounded-[18px] border border-line bg-[color-mix(in_srgb,var(--color-card)_88%,var(--color-paper)_12%)] p-8 shadow-[0_10px_35px_rgba(40,25,15,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:rotate-0 sm:p-12 lg:-rotate-1">
            <p className="mb-5 flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
              <span className="h-px w-3 bg-ink-faint/40" aria-hidden />
              Trop souvent
            </p>
            <ul className="flex flex-col divide-y divide-line/70">
              {before.map((item) => (
                <li key={item} className="flex items-center gap-3.5 py-3.5 text-ink-soft first:pt-0 last:pb-0">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line bg-paper-dim text-ink-faint">
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
              className="flex size-11 items-center justify-center rounded-full border border-clay-200/70 bg-paper shadow-[var(--shadow-md)]"
            >
              <ArrowDown className="size-4 text-clay-600" strokeWidth={2.5} />
            </Reveal>
          </div>

          {/* Carte WeBuild — l'objet premium de la section. Fond quasi noir
              avec un dégradé à peine perceptible (pas un aplat uniforme),
              bordure "dégradé cuivre" via mask-composite (jamais un simple
              `border: 1px solid orange`), halo ambiant très diffus derrière
              la carte plutôt qu'un glow net. `group/webuild` scope le hover
              (border/glow qui s'intensifient à peine) sans interférer avec
              le `group` du comparateur (qui ne gère que la flèche). */}
          <div className="group/webuild relative">
            <div
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[26px] opacity-60 blur-[60px] transition-opacity duration-400 group-hover/webuild:opacity-90"
              style={{ background: "radial-gradient(60% 60% at 30% 15%, rgba(199,108,52,0.16), transparent 72%)" }}
              aria-hidden
            />

            {/* `RevealGroup` n'accepte pas de prop `style` (voir
                motion/reveal.tsx) — dégradé exprimé en classe Tailwind
                arbitraire plutôt que d'étendre l'API du composant partagé
                pour ce seul besoin. */}
            <RevealGroup className="relative rounded-[18px] bg-[linear-gradient(145deg,#15100c_0%,#0d0a08_45%,#080706_100%)] p-8 shadow-[0_25px_70px_rgba(30,15,5,0.18),0_8px_30px_rgba(199,108,52,0.08)] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2.5 hover:rotate-0 hover:shadow-[0_32px_80px_rgba(30,15,5,0.24),0_10px_36px_rgba(199,108,52,0.14)] sm:p-13 lg:-translate-y-1.5 lg:rotate-1">
              <div
                className="pointer-events-none absolute inset-0 rounded-[18px] opacity-80 transition-opacity duration-400 group-hover/webuild:opacity-100"
                style={{
                  padding: 1,
                  background:
                    "linear-gradient(135deg, rgba(199,108,52,0.4) 0%, rgba(199,108,52,0.1) 32%, transparent 60%)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
                aria-hidden
              />

              <p className="relative mb-5 flex items-center gap-2.5 text-xs font-semibold tracking-[0.14em] text-clay-400 uppercase">
                <span className="h-px w-3 bg-clay-500/70" aria-hidden />
                Avec {siteConfig.name}
              </p>
              <ul className="relative flex flex-col divide-y divide-clay-500/10">
                {after.map((item) => (
                  <RevealItem
                    key={item}
                    variants={revealItemVariants}
                    className="group/row flex items-center gap-3.5 py-3.5 text-[rgba(255,248,240,0.92)] transition-transform duration-300 first:pt-0 last:pb-0 hover:translate-x-1"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-clay-500/40 text-clay-400 shadow-[0_0_12px_rgba(199,108,52,0.08)] transition-colors duration-300 group-hover/row:border-clay-400/70 group-hover/row:text-clay-300">
                      <Check className="size-4" strokeWidth={2.5} />
                    </span>
                    <span className="transition-colors duration-300 group-hover/row:text-[rgba(255,248,240,1)]">
                      {item}
                    </span>
                  </RevealItem>
                ))}
              </ul>
            </RevealGroup>
          </div>
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
