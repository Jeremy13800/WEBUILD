"use client";

import { ArrowRight, ChevronDown, Search, Smartphone } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Kicker } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/reveal";
import { BlueprintMarks } from "@/components/motion/blueprint-marks";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { Tilt } from "@/components/motion/tilt";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import { cn } from "@/lib/utils";

/**
 * Badges flottants au-dessus de la composition — repris mot pour mot des
 * bénéfices déjà validés ailleurs sur le site (data/benefits.ts), jamais
 * une preuve inventée : ce sont des promesses de service, pas des
 * statistiques.
 */
const floatingBadges = [
  { label: "Impeccable sur mobile", icon: Smartphone, position: "top-[4%] -left-7 sm:-left-14", floatDelay: "-1s" },
  { label: "Trouvé sur Google", icon: Search, position: "bottom-[8%] -right-6 sm:-right-12", floatDelay: "-3.5s" },
];

/**
 * Hero — section la plus importante du site (brief §9). Répond en un
 * regard à QUOI / POUR QUI / POURQUOI / QUE FAIRE ENSUITE, et donne une
 * preuve visuelle immédiate via une composition de vraies réalisations
 * plutôt qu'une illustration générique de développeur.
 *
 * Les effets réutilisent le même vocabulaire que le reste du site plutôt
 * que d'en réinventer un local : `.grain`, `<Marquee>`, `<Tilt>`,
 * `<Magnetic>` et `<SplitText>` sont les mêmes composants qu'on retrouve
 * sur /offres, /realisations, le CTA final, etc. Seul le halo qui suit le
 * curseur est propre au Hero (aucune autre section n'a cette surface pour
 * le justifier). Tout s'efface sous `prefers-reduced-motion`.
 */
export function Hero() {
  const [istreen, bkPlus, daiselec] = projects;
  const shouldReduceMotion = useReducedMotion();

  // Halo radial qui suit le curseur — motion values pour éviter tout
  // re-render React au déplacement de la souris (perf).
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(560px circle at ${spotX}px ${spotY}px, rgba(221,140,87,0.16), transparent 72%)`;

  function handleHeroPointerMove(e: React.PointerEvent<HTMLElement>) {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  }

  return (
    <section
      onPointerMove={handleHeroPointerMove}
      className="grain relative overflow-hidden bg-ink-950 pt-16 pb-28 sm:pt-20 sm:pb-36"
    >
      {/* Trame de points */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      {/* Aurores — halos flous en lente dérive, palette argile exclusivement */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-hero-aurora-a absolute top-[-22%] left-[-10%] size-[560px] rounded-full bg-clay-600/25 blur-[120px]" />
        <div className="animate-hero-aurora-b absolute right-[-15%] bottom-[-28%] size-[520px] rounded-full bg-clay-500/20 blur-[130px]" />
      </div>

      {/* Halo qui suit le curseur (desktop uniquement) */}
      <motion.div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: spotlightBackground }}
        aria-hidden
      />

      {/* Repères "plan d'architecte" — signature visuelle liée à l'identité
          bâtisseur plutôt qu'un effet générique, voir le composant. */}
      <BlueprintMarks />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <Kicker className="text-clay-400">
              <span className="h-px w-6 bg-clay-400" aria-hidden />
              Sites internet pour artisans
            </Kicker>
          </Reveal>

          <h1 className="max-w-xl font-[family-name:var(--font-display)] text-[2.6rem] leading-[1.06] font-normal tracking-[-0.015em] text-white sm:text-[3.4rem] lg:text-[3.75rem]">
            <SplitText
              trigger="mount"
              delay={0.05}
              segments={[
                { text: "Un site à la hauteur de" },
                {
                  text: "votre savoir-faire.",
                  className:
                    "animate-hero-text-shimmer bg-[linear-gradient(90deg,var(--color-clay-200),var(--color-clay-400),var(--color-clay-200))] bg-[length:200%_auto] bg-clip-text text-transparent italic",
                },
              ]}
            />
          </h1>

          <Reveal delay={0.35}>
            <p className="max-w-md text-lg leading-relaxed text-sand">
              {siteConfig.name} conçoit des sites internet sur mesure pour les artisans du bâtiment — clairs,
              rapides, et pensés pour transformer vos visiteurs en appels et en devis.
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

          <Reveal delay={0.45} className="w-full max-w-md pt-2">
            <Marquee items={siteConfig.metiers} />
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative hidden lg:block">
          <div className="relative mx-auto max-w-md">
            {/* Lueur derrière la composition */}
            <div className="absolute inset-0 -z-10 rounded-full bg-clay-600/20 blur-[100px]" aria-hidden />

            {/* Ligne de cote — même motif que BlueprintMarks, au plus près
                du produit qu'elle "mesure" plutôt qu'en fond générique. */}
            <svg
              className="pointer-events-none absolute -top-5 right-[10%] w-28"
              viewBox="0 0 220 20"
              fill="none"
              aria-hidden
            >
              <path
                className="blueprint-draw"
                style={{ strokeDasharray: 232, strokeDashoffset: 232, animationDelay: "0.8s" }}
                d="M0 4 L0 10 L220 10 L220 4"
              />
            </svg>

            {/*
              Le flottement (CSS) porte sur ce conteneur unique, le tilt 3D
              (composant partagé Tilt) sur celui du dessous : les trois
              pièces ne doivent JAMAIS flotter indépendamment avec des
              délais propres, sous peine de désynchroniser leur
              chevauchement calibré au pixel près (le téléphone recouvre
              volontairement un coin précis de la carte principale — un
              flottement décalé les fait dériver l'une sur l'autre et peut
              cacher du texte).
            */}
            <div className="animate-hero-float">
              <Tilt className="relative">
                <div className="absolute -top-8 -right-4 w-[72%] rotate-[4deg] opacity-70">
                  <BrowserFrame project={daiselec} />
                </div>
                <div className="relative z-10 rotate-[-3deg]">
                  <BrowserFrame project={bkPlus} />
                </div>
                <div className="absolute -bottom-10 -left-10 z-20 w-[42%]">
                  <PhoneFrame project={istreen} className="w-full" />
                </div>
              </Tilt>
            </div>

            {floatingBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={cn("absolute z-30", badge.position)}
              >
                <div
                  className="animate-hero-float flex items-center gap-2 rounded-full border border-white/10 bg-ink-900/85 py-2 pr-4 pl-3 text-xs font-medium text-sand shadow-[var(--shadow-lg)] backdrop-blur"
                  style={{ animationDelay: badge.floatDelay }}
                >
                  <span className="grid size-6 place-items-center rounded-full bg-clay-500/20 text-clay-400">
                    <badge.icon className="size-3.5" strokeWidth={2.25} />
                  </span>
                  {badge.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Container>

      {/* Repère de défilement — promesse concrète plutôt qu'un "découvrir" générique,
          pour donner une vraie raison de continuer à faire défiler. */}
      <a
        href="#realisations"
        aria-label="Voir les réalisations"
        className="group absolute inset-x-0 bottom-8 z-30 hidden flex-col items-center gap-2 text-sand-faint transition-colors hover:text-clay-400 sm:flex"
      >
        <span className="text-[11px] font-medium tracking-[0.14em] uppercase">3 réalisations à voir</span>
        <ChevronDown
          className="animate-hero-float size-4 transition-transform group-hover:translate-y-0.5"
          strokeWidth={2}
          style={{ animationDuration: "2s" }}
        />
      </a>

      {/* Fondu vers la section suivante */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-b from-transparent to-ink-950"
        aria-hidden
      />
    </section>
  );
}
