"use client";

import Image from "next/image";
import {
  ArrowRight,
  Building,
  Building2,
  Car,
  Flame,
  Hammer,
  Home,
  PaintRoller,
  Phone,
  ShieldCheck,
  Smartphone,
  Snowflake,
  TrendingUp,
  Trees,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Container, wideContainer } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Kicker } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";

/**
 * Ligne de bénéfices sous les CTA — reprend des formulations déjà validées
 * ailleurs sur le site (data/benefits.ts), jamais une preuve inventée : ce
 * sont des promesses de service, pas des statistiques.
 */
const heroBenefits: { icon: LucideIcon; label: string }[] = [
  { icon: Phone, label: "Pensé pour vos clients" },
  { icon: TrendingUp, label: "Optimisé Google" },
  { icon: Smartphone, label: "Mobile parfait" },
  { icon: ShieldCheck, label: "Rapide & sécurisé" },
];

/** Icône par métier pour la barre du bas — seuls les métiers réellement
 * listés dans siteConfig.metiers apparaissent, jamais une liste dupliquée
 * en dur ici. */
const metierIcons: Record<string, LucideIcon> = {
  Plombiers: Wrench,
  Électriciens: Zap,
  Chauffagistes: Flame,
  Climaticiens: Snowflake,
  Couvreurs: Home,
  Peintres: PaintRoller,
  Menuisiers: Hammer,
  Maçons: Building2,
  Paysagistes: Trees,
  Garages: Car,
  "Entreprises du bâtiment": Building,
};
const shownMetiers = siteConfig.metiers.slice(0, 7);
const hasMoreMetiers = siteConfig.metiers.length > shownMetiers.length;

/**
 * `wideContainer` (voir ui/container.tsx) : le seuil est 1416px, pas
 * 1440 — à 1440px de fenêtre, la barre de scroll verticale réduit le
 * viewport CSS réel (`clientWidth`) à ~1425px, donc un seuil pile à 1440
 * ne s'activerait jamais sur un vrai écran 1440px. Idem pour les `!` : un
 * variant arbitraire (`min-[…]`) n'est pas garanti de se classer après
 * `lg:`/`xl:` dans la feuille de styles générée, donc sans `!` le padding
 * `lg:px-10` d'origine peut rester prioritaire par simple ordre du CSS.
 *
 * Élargir le plafond du container (1240px → 1600px) sans toucher à la
 * largeur de la colonne de texte (max-w-2xl, inchangée) augmente
 * simplement la marge de centrage sur grand écran, ce qui décale toute la
 * composition vers la gauche — sans jamais forcer le H1 à se retourner à
 * la ligne différemment. Le Header (page d'accueil uniquement) applique la
 * même valeur, pour que le logo démarre au même niveau que le H1.
 */

/**
 * Hero — section la plus importante du site (brief §9).
 *
 * Traitement volontairement différent du reste du site (référence visuelle
 * fournie par le client) : typographie sans-serif très grasse et quasi
 * plein écran, plutôt que le display serif plus retenu utilisé partout
 * ailleurs. Restreint au Hero pour l'instant — le reste du site garde sa
 * typographie serif habituelle.
 *
 * Photo fournie par le client comme fond (public/images/hero-bg.png),
 * desktop uniquement : la recadrer en portrait sur mobile ferait passer
 * les mockups qu'elle contient derrière le texte plutôt qu'à côté.
 *
 * `lg:min-h-[min(100vh,75vw)]` + `-mt-18` (voir plus bas) : le Hero occupe
 * quasi tout l'écran au chargement, le header transparent flottant
 * par-dessus sans consommer d'espace vertical supplémentaire.
 *
 * Le plafond `75vw` (pas juste `100vh`) est nécessaire : sur un écran
 * large-mais-pas-très-haut, `100vh` est raisonnable, mais sur un iPad en
 * portrait (ex. 1024×1366 pour l'iPad Pro 12.9", ≥1024px donc la photo
 * s'affiche) `100vh` ferait un Hero de 1366px de haut — le contenu texte,
 * centré verticalement dans cet espace énorme, se retrouve avec un vide
 * géant au-dessus, tandis que la photo (centrée sur toute la hauteur de
 * la section, indépendamment du texte) tombe à une tout autre hauteur :
 * les deux se chevauchent au lieu de coïncider. `75vw` reproduit la
 * hauteur d'un desktop 1024×768 classique (déjà vérifié sans ce
 * problème) quelle que soit la hauteur réelle de l'écran.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Halo radial qui suit le curseur — motion values pour éviter tout
  // re-render React au déplacement de la souris (perf). Position de départ
  // hors cadre (pas 0,0) : sinon, tant que la souris n'a pas encore bougé
  // dans le Hero, le halo reste visible planté dans le coin supérieur
  // gauche — un artefact visible sur toute capture ou premier chargement.
  const spotX = useMotionValue(-9999);
  const spotY = useMotionValue(-9999);
  const spotlightBackground = useMotionTemplate`radial-gradient(560px circle at ${spotX}px ${spotY}px, rgba(221,140,87,0.14), transparent 72%)`;

  function handleHeroPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }

  return (
    <section
      onPointerMove={handleHeroPointerMove}
      className="grain relative -mt-18 flex min-h-[min(100svh,75vw)] flex-col overflow-hidden bg-ink-950 pt-20 sm:pt-24 lg:min-h-[min(100vh,75vw)] lg:pt-20"
    >
      {/* Photo de fond — desktop uniquement (voir le commentaire du
          composant), et largeur plafonnée à 1920px. `object-contain` (pas
          `cover`) : la photo doit rester ENTIÈRE, jamais rognée — avec
          `cover`, la hauteur quasi plein écran du Hero forçait un recadrage
          vertical (le haut du chantier et le bas du reflet disparaissaient).
          `contain` cale la photo sur la hauteur disponible sans jamais la
          couper, mais laisse un vide horizontal (elle ne remplit plus toute
          la largeur du cadre) qu'il faut répartir avec `object-position`.

          Repassé à `object-right` (100%) : centrer/décaler vers le texte
          (essayé aux réglages précédents) laissait un vide sombre visible
          sur le bord droit — la photo ne touchait plus l'écran, ce qui
          donnait l'impression que le Hero ne le remplissait plus. Priorité
          confirmée : combler ce bord plutôt que rapprocher davantage du
          texte. */}
      <div className="absolute inset-y-0 right-0 hidden w-full max-w-[1920px] overflow-hidden lg:block">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="object-contain object-right"
        />

        {/* Dégradé de lisibilité — plein noir uniquement tout contre le
            bord gauche (où le texte a vraiment besoin d'un fond opaque),
            puis dégressif via `color-mix` plutôt qu'un plein noir jusqu'à
            54% : avec la photo recentrée, le téléphone tombe justement
            dans cette zone-là, et un aplat opaque le masquait entièrement.
            Le dégradé reste protecteur (jamais totalement transparent
            avant 70%) sans pour autant noyer complètement la photo. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink-950)_0%,color-mix(in_srgb,var(--color-ink-950)_78%,transparent)_38%,color-mix(in_srgb,var(--color-ink-950)_35%,transparent)_54%,transparent_70%)]"
          aria-hidden
        />
      </div>

      {/* Halo qui suit le curseur (desktop uniquement) */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: spotlightBackground }}
        aria-hidden
      />

      <Container className={`${wideContainer} relative flex flex-1 items-center py-5 lg:py-6`}>
        {/* Toute la colonne (titre/texte/CTA/arguments) reste au ras du
            dégradé de lisibilité (max-w-2xl) : le téléphone de la photo est
            maintenant nettement plus visible (voir le zoom sur l'<Image>
            ci-dessus), donc juste après cette largeur — une ligne de
            bénéfices plus large viendrait littéralement se superposer à son
            écran. */}
        <div className="flex w-full max-w-2xl flex-col items-start gap-5 lg:gap-6">
          <div className="flex max-w-2xl flex-col items-start gap-4 lg:gap-5">
            <Reveal>
              <Kicker className="text-clay-400">
                <span className="h-px w-6 bg-clay-400" aria-hidden />
                Sites internet pour artisans du bâtiment
              </Kicker>
            </Reveal>

            <h1 className="max-w-2xl font-sans text-[2.75rem] leading-[1.02] font-black tracking-tight text-white sm:text-[3.75rem] lg:text-[4rem] lg:leading-[0.95] xl:text-[4.75rem] 2xl:text-[5.5rem]">
              <SplitText
                trigger="mount"
                delay={0.05}
                segments={[{ text: "Un site qui travaille autant" }, { text: "que vous.", className: "text-clay-500" }]}
              />
            </h1>

            <Reveal delay={0.35}>
              <p className="max-w-xl text-xl leading-relaxed text-sand sm:text-2xl">
                Des sites internet sur-mesure pour les artisans du bâtiment — clairs, rapides et pensés pour
                transformer vos visiteurs en <span className="font-semibold text-clay-400">appels</span> et en{" "}
                <span className="font-semibold text-clay-400">devis</span>.
              </p>
            </Reveal>

            {/* `w-full sm:w-auto` + gabarit progressif : les boutons du
                Button/ButtonLink partagé sont `whitespace-nowrap` (choix
                assumé du design system — jamais de bouton sur deux lignes).
                Avec le texte agrandi du Hero (`text-xl`), ce nowrap dépasse
                la largeur d'un petit mobile (ex. 320px) et débordait,
                rogné en silence par le `overflow-hidden` de la section.
                Rétabli en triple palier : confortable dès le plus petit
                écran, puis la taille "Hero" actuelle à partir de sm/lg. */}
            <Reveal delay={0.4} className="flex flex-col gap-4 sm:flex-row">
              <Magnetic>
                <ButtonLink
                  href={siteConfig.ctaPrimary.href}
                  size="lg"
                  className="group relative h-14 w-full overflow-hidden px-6 text-base sm:h-16 sm:w-auto sm:px-9 sm:text-lg lg:h-18 lg:px-10 lg:text-xl"
                >
                  <span className="relative z-10 inline-flex items-center gap-2">
                    {siteConfig.ctaPrimary.label}
                    <ArrowRight
                      className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 sm:size-5"
                      strokeWidth={2.5}
                    />
                  </span>
                  <span
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    aria-hidden
                  />
                </ButtonLink>
              </Magnetic>
              {/* `bg-ink-950/60 backdrop-blur-md` en plus du style
                  "secondary" partagé (transparent, juste une bordure) :
                  avec le fondu de la photo assoupli pour laisser voir le
                  téléphone, ce bouton peut se retrouver juste par-dessus
                  son écran — sans fond propre, son texte blanc devenait
                  illisible, mélangé au contenu de la photo derrière lui. */}
              <ButtonLink
                href={siteConfig.ctaSecondary.href}
                variant="secondary"
                size="lg"
                className="h-14 w-full bg-ink-950/60 px-6 text-base backdrop-blur-md sm:h-16 sm:w-auto sm:px-9 sm:text-lg lg:h-18 lg:px-10 lg:text-xl"
              >
                {siteConfig.ctaSecondary.label}
              </ButtonLink>
            </Reveal>
          </div>

          {/* Mini-section de réassurance — volontairement détachée de la
              colonne étroite ci-dessus pour avoir la place de s'étaler. */}
          <Reveal delay={0.45} className="flex w-full flex-wrap gap-x-10 gap-y-5 pt-1">
            {heroBenefits.map((b) => (
              <div key={b.label} className="flex shrink-0 items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-clay-400">
                  <b.icon className="size-6" strokeWidth={1.75} />
                </span>
                <span className="text-lg font-medium whitespace-nowrap text-sand">{b.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>

      {/* Barre de métiers — panneau flottant plutôt qu'un simple filet de
          séparation, pour un vrai poids de composant premium. Données
          réelles uniquement (siteConfig.metiers), jamais une liste
          dupliquée en dur ici.

          Le wrapper ne porte plus que du padding vertical : le padding
          horizontal qu'il portait en plus de celui du <Container>
          insérait le panneau plus loin que les bords réels du bloc de
          contenu au-dessus — la cause du léger désalignement. `wideContainer`
          (même valeur que le Container du contenu) garantit désormais des
          bords identiques, et le pb un peu plus généreux remonte le
          panneau au lieu de le laisser collé au bord de l'écran. */}
      <div className="relative z-10 pb-4 lg:pb-6 min-[1416px]:pb-11!">
        <Container className={`${wideContainer} relative`}>
          <Reveal delay={0.5}>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-ink-900/50 px-7 py-6 shadow-[var(--shadow-lg)] backdrop-blur-md sm:flex-row sm:items-center sm:gap-10 sm:px-10 lg:py-7 min-[1416px]:py-8!">
              <span className="shrink-0 text-base leading-tight font-bold tracking-tight text-white uppercase sm:text-lg">
                Au service des
                <br />
                artisans du bâtiment
              </span>
              <div className="hidden h-12 w-px shrink-0 bg-white/10 sm:block" aria-hidden />
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {shownMetiers.map((metier) => {
                  const Icon = metierIcons[metier];
                  return (
                    <span key={metier} className="flex items-center gap-2.5 text-base text-sand">
                      {Icon && <Icon className="size-5 text-clay-400" strokeWidth={1.75} />}
                      {metier}
                    </span>
                  );
                })}
                {hasMoreMetiers && <span className="text-base font-medium text-clay-400">&amp; plus encore</span>}
              </div>
            </div>
          </Reveal>
        </Container>
      </div>

      {/* Fondu vers la section suivante */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-b from-transparent to-ink-950"
        aria-hidden
      />
    </section>
  );
}
