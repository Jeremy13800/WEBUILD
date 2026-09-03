import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Kicker } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { BlueprintMarks } from "@/components/motion/blueprint-marks";
import { Tilt } from "@/components/motion/tilt";

/**
 * Architecture narrative en deux temps (voulue explicitement) :
 * 1. WeBuild — pourquoi le projet existe, sa philosophie (hero + "Ma façon
 *    de travailler"), à la troisième personne / voix de marque.
 * 2. La personne derrière WeBuild — Jérémy Cailleux, révélé seulement à ce
 *    stade, à la première personne. Ne pas fusionner les deux : le "reveal"
 *    perd son effet si le nom apparaît déjà dans le hero.
 */

export const metadata: Metadata = {
  title: "À propos",
  description: `${siteConfig.name} conçoit des sites internet pour les artisans du bâtiment, avec une approche personnalisée et une vraie compréhension des petites entreprises.`,
};

const values = [
  {
    title: "Spécialisé, pas généraliste",
    text: "Je ne conçois pas des sites pour tout le monde. En me concentrant sur les artisans du bâtiment, je comprends vite votre métier, vos contraintes et ce qui rassure vos clients.",
  },
  {
    title: "Un interlocuteur, du début à la fin",
    text: "Pas d'équipe changeante ni de chef de projet intermédiaire : vous échangez directement avec la personne qui construit votre site.",
  },
  {
    title: "La clarté avant tout",
    text: "Pas de jargon technique, pas de jargon marketing. Des explications simples, des choix expliqués, et un projet que vous comprenez à chaque étape.",
  },
  {
    title: "Des sites réellement utiles",
    text: "Un beau site qui ne génère aucun appel ne sert à rien. Chaque décision de design est prise en pensant à vos futurs clients, pas seulement à l'esthétique.",
  },
];

export default function AProposPage() {
  return (
    <>
      <section className="grain relative -mt-18 overflow-hidden bg-ink-950 pt-24 pb-24 text-white sm:pt-28 sm:pb-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-hero-aurora-b absolute top-[-15%] right-[-15%] size-[440px] rounded-full bg-clay-600/15 blur-[130px]" />
        </div>
        <BlueprintMarks />
        <Container className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            {/* Volontairement sans photo (choix assumé) — voir le
                commentaire équivalent sur about-teaser.tsx. */}
            <Tilt className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)] bg-ink-800">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-7xl font-normal text-clay-400 italic">
                  {siteConfig.name.charAt(0)}
                </span>
              </div>
            </Tilt>
          </Reveal>

          <div>
            <Reveal>
              <Kicker className="text-clay-400">À propos</Kicker>
            </Reveal>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-normal tracking-[-0.01em] sm:text-5xl">
              <SplitText trigger="mount" delay={0.05} segments={[{ text: "Le web, avec le même soin que votre métier." }]} />
            </h1>
            {/* Voix "marque" (WeBuild), pas encore personnelle — Jérémy est
                révélé plus bas, dans la section "Derrière WeBuild". */}
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-sand">
                WeBuild est né d&apos;un constat simple : les artisans du bâtiment font un travail exigeant, souvent
                sans le temps ni les outils pour le montrer correctement en ligne.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-sand-faint">
                L&apos;idée : proposer des sites clairs, modernes et efficaces, pensés pour mettre en valeur ce
                savoir-faire et faciliter le contact avec de futurs clients — sans jargon technique, sans
                complexité inutile.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <Reveal>
            <Kicker>Ma façon de travailler</Kicker>
          </Reveal>
          <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-3xl font-normal text-ink sm:text-4xl">
            <SplitText trigger="inView" segments={[{ text: "Ce que vous pouvez attendre de moi." }]} />
          </h2>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.05}
                className="group flex flex-col gap-3 border-t border-line pt-6 transition-colors duration-300 hover:border-clay-500"
              >
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink transition-colors duration-300 group-hover:text-clay-700">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* PARTIE 2 — la personne derrière WeBuild, révélée seulement ici.
          Message central : quand un artisan travaille avec WeBuild, il
          travaille directement avec la personne qui conçoit son site —
          pas de commercial, pas de chef de projet intermédiaire. Toujours
          sans photo (même logique qu'ailleurs) : un monogramme "W" géant en
          filigrane (même langage que le "?" de la FAQ) apporte de la
          personnalité graphique sans portrait. */}
      <section className="relative overflow-hidden border-t border-line bg-paper-dim py-24 sm:py-32">
        <span
          className="pointer-events-none absolute -right-6 -bottom-16 font-[family-name:var(--font-display)] text-[16rem] leading-none font-normal text-clay-600/[0.06] italic select-none"
          aria-hidden
        >
          W
        </span>
        <Container className="relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <Kicker>Derrière WeBuild</Kicker>
            </Reveal>
            <h2 className="mt-4 max-w-md font-[family-name:var(--font-display)] text-2xl font-normal text-ink sm:text-3xl">
              <SplitText
                trigger="inView"
                segments={[{ text: "Un interlocuteur, du premier échange à la mise en ligne." }]}
              />
            </h2>
          </div>

          <div className="flex flex-col items-start gap-6">
            <Reveal className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                Derrière WeBuild, il y a {siteConfig.founder.name}, développeur web et fondateur du projet, qui
                imagine et conçoit chaque site avec la même exigence : mettre le savoir-faire des artisans
                réellement en valeur.
              </p>
              <p>
                J&apos;ai créé WeBuild avec une idée simple : proposer aux artisans des sites professionnels sans
                les faire passer par une agence impersonnelle ou des solutions compliquées.
              </p>
              <p>
                Du premier échange à la mise en ligne, vous échangez directement avec moi. Je conçois le site,
                j&apos;intègre vos contenus et je reste votre interlocuteur pour la suite.
              </p>
            </Reveal>

            <Reveal delay={0.05} className="flex items-center gap-3">
              <span className="h-px w-8 shrink-0 bg-clay-500" aria-hidden />
              <p className="text-sm">
                <span className="font-[family-name:var(--font-display)] text-lg font-normal text-ink">
                  {siteConfig.founder.name}
                </span>
                <span className="text-ink-faint"> — {siteConfig.founder.role}</span>
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-paper py-20 text-center">
        <Container className="flex flex-col items-center gap-5">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink sm:text-3xl">
            <SplitText trigger="inView" segments={[{ text: "Envie d'échanger sur votre projet ?" }]} />
          </h2>
          <ButtonLink href={siteConfig.ctaSecondary.href} size="lg">
            {siteConfig.ctaSecondary.label}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
