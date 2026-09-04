import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Kicker } from "@/components/ui/badge";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { BlueprintMarks } from "@/components/motion/blueprint-marks";
import { Tilt } from "@/components/motion/tilt";
import { HoverTag } from "@/components/motion/hover-tag";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Découvrez les sites internet conçus pour des artisans du bâtiment : plombiers, électriciens et plus. Chaque projet, ses objectifs et son approche.",
};

export default function RealisationsPage() {
  return (
    <>
      <section className="grain relative -mt-18 overflow-hidden bg-ink-950 pt-24 pb-20 text-white sm:pt-28 sm:pb-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-hero-aurora-a absolute top-[-30%] left-[-10%] size-[420px] rounded-full bg-clay-600/15 blur-[130px]" />
        </div>
        <BlueprintMarks />
        <Container className="relative">
          <Reveal>
            <Kicker className="text-clay-400">Projets & concepts</Kicker>
          </Reveal>
          <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-normal tracking-[-0.01em] sm:text-5xl">
            <SplitText
              trigger="mount"
              delay={0.05}
              segments={[{ text: "Des sites conçus pour des artisans, pas pour des développeurs." }]}
            />
          </h1>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg text-sand">
              Des concepts imaginés pour montrer concrètement comment WeBuild peut transformer la présence en ligne
              d&apos;un artisan.
            </p>
          </Reveal>
          {/* Ligne de transparence — même traitement discret que sur la
              homepage : visible, mais pas un disclaimer qui casse la
              force commerciale de la section. */}
          <Reveal delay={0.12}>
            <p className="mt-3 max-w-lg text-sm text-sand-faint">
              Ces projets sont des démonstrations non commanditées et n&apos;impliquent aucune collaboration
              commerciale avec les entreprises présentées.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 max-w-md">
            <Marquee items={siteConfig.metiers} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container className="flex flex-col gap-24">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              className={cn(
                "grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.15fr_0.95fr] lg:gap-16",
                i % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <HoverTag label="Voir l'étude de projet">
                <Tilt className="relative pb-[8%]">
                  <Link href={`/realisations/${project.slug}`} data-cursor-hover className="block">
                    <BrowserFrame project={project} className={cn(i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1")} />
                    <PhoneFrame
                      project={project}
                      className="absolute -bottom-2 right-[8%] hidden w-[21%] sm:block"
                    />
                  </Link>
                </Tilt>
              </HoverTag>

              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{project.metier}</Badge>
                  <Badge>{project.ville}</Badge>
                  {project.status === "concept" && (
                    <Badge className="border-clay-200 bg-clay-50 font-semibold text-clay-700">Projet concept</Badge>
                  )}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-normal text-ink sm:text-4xl">
                  {project.name}
                </h2>
                <p className="text-base leading-relaxed text-ink-soft">{project.objectif}</p>
                <ul className="flex flex-col gap-2">
                  {project.caracteristiques.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-clay-600" />
                      {c}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={`/realisations/${project.slug}`} className="mt-2">
                  Voir l&apos;étude de projet
                  <ArrowUpRight className="size-4" strokeWidth={2.5} />
                </ButtonLink>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="border-t border-line bg-paper-dim py-20 text-center">
        <Container className="flex flex-col items-center gap-5">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink sm:text-3xl">
            <SplitText trigger="inView" segments={[{ text: "Votre entreprise pourrait être la prochaine." }]} />
          </h2>
          <ButtonLink href={siteConfig.ctaSecondary.href} size="lg">
            {siteConfig.ctaSecondary.label}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
