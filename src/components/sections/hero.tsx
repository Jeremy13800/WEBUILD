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
import { Container } from "@/components/ui/container";
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
  { icon: TrendingUp, label: "Optimisé pour Google" },
  { icon: Smartphone, label: "Impeccable sur mobile" },
  { icon: ShieldCheck, label: "Sécurisé & performant" },
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
 * Hero — section la plus importante du site (brief §9).
 *
 * Traitement volontairement différent du reste du site (référence visuelle
 * fournie par le client) : typographie sans-serif grasse plutôt que le
 * display serif utilisé partout ailleurs, ligne de bénéfices à icônes,
 * barre de métiers en pied de section. Restreint au Hero pour l'instant —
 * le reste du site garde sa typographie serif habituelle.
 *
 * Photo fournie par le client comme fond (public/images/hero-bg.png),
 * desktop uniquement : la recadrer en portrait sur mobile ferait passer
 * les mockups qu'elle contient derrière le texte plutôt qu'à côté.
 */
export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Halo radial qui suit le curseur — motion values pour éviter tout
  // re-render React au déplacement de la souris (perf).
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
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
      className="grain relative overflow-hidden bg-ink-950 pt-16 pb-12 sm:pt-20"
    >
      {/* Photo de fond — desktop uniquement (voir le commentaire du
          composant), et largeur plafonnée à 1920px : la hauteur du Hero
          est fixe (pilotée par le contenu, pas par le viewport), donc sur
          un écran très large `object-fit: cover` devait recadrer
          verticalement de plus en plus fort pour couvrir toute la largeur
          — jusqu'à perdre la moitié de la photo en haut/bas sur un écran
          ultra-large. Au-delà de 1920px, l'excédent affiche simplement le
          fond encre uni de la section, qui se fond naturellement avec la
          partie sombre de la photo. */}
      <div className="absolute inset-y-0 right-0 hidden w-full max-w-[1920px] lg:block">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="(min-width: 1920px) 1920px, 100vw"
          className="object-cover object-right"
        />

        {/* Dégradé de lisibilité — arrêts explicites plutôt que from/via/to
            par défaut : la zone sombre doit rester pleine au moins jusqu'à
            la largeur réelle du bloc de texte. */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink-950)_0%,var(--color-ink-950)_54%,transparent_82%)]"
          aria-hidden
        />
      </div>

      {/* Halo qui suit le curseur (desktop uniquement) */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: spotlightBackground }}
        aria-hidden
      />

      <Container className="relative">
        <div className="flex max-w-2xl flex-col items-start gap-7">
          <Reveal>
            <Kicker className="text-clay-400">
              <span className="h-px w-6 bg-clay-400" aria-hidden />
              Sites internet pour artisans du bâtiment
            </Kicker>
          </Reveal>

          <h1 className="max-w-2xl font-sans text-[2.6rem] leading-[1.05] font-black tracking-tight text-white sm:text-[3.4rem] lg:text-[4rem]">
            <SplitText
              trigger="mount"
              delay={0.05}
              segments={[{ text: "Un site qui travaille autant" }, { text: "que vous.", className: "text-clay-500" }]}
            />
          </h1>

          <Reveal delay={0.35}>
            <p className="max-w-lg text-lg leading-relaxed text-sand">
              Des sites internet sur-mesure pour les artisans du bâtiment — clairs, rapides et pensés pour
              transformer vos visiteurs en <span className="font-semibold text-clay-400">appels</span> et en{" "}
              <span className="font-semibold text-clay-400">devis</span>.
            </p>
          </Reveal>

          <Reveal delay={0.4} className="flex flex-col gap-3 sm:flex-row">
            <Magnetic>
              <ButtonLink href={siteConfig.ctaPrimary.href} size="lg" className="group relative overflow-hidden">
                <span className="relative z-10 inline-flex items-center gap-2">
                  {siteConfig.ctaPrimary.label}
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </span>
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  aria-hidden
                />
              </ButtonLink>
            </Magnetic>
            <ButtonLink href={siteConfig.ctaSecondary.href} variant="secondary" size="lg">
              {siteConfig.ctaSecondary.label}
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.45} className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
            {heroBenefits.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 text-clay-400">
                  <b.icon className="size-4" strokeWidth={1.75} />
                </span>
                <span className="text-sm font-medium text-sand">{b.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </Container>

      {/* Barre de métiers — pied de section, données réelles uniquement
          (siteConfig.metiers), jamais une liste dupliquée en dur. */}
      <Reveal delay={0.5} className="relative z-10 mt-14 border-t border-white/10">
        <Container className="flex flex-wrap items-center gap-x-10 gap-y-4 py-6">
          <span className="text-xs font-semibold tracking-[0.14em] text-sand-faint uppercase">
            Au service des artisans du bâtiment
          </span>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            {shownMetiers.map((metier) => {
              const Icon = metierIcons[metier];
              return (
                <span key={metier} className="flex items-center gap-2 text-sm text-sand">
                  {Icon && <Icon className="size-4 text-clay-400" strokeWidth={1.75} />}
                  {metier}
                </span>
              );
            })}
            {hasMoreMetiers && <span className="text-sm font-medium text-clay-400">&amp; plus encore</span>}
          </div>
        </Container>
      </Reveal>

      {/* Fondu vers la section suivante */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24 bg-gradient-to-b from-transparent to-ink-950"
        aria-hidden
      />
    </section>
  );
}
