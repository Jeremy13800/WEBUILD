import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Kicker } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
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
      <section className="bg-ink-950 pt-16 pb-20 text-white sm:pt-20 sm:pb-24">
        <Container>
          <Reveal>
            <Kicker className="text-clay-400">Réalisations</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-medium tracking-[-0.01em] sm:text-5xl">
              Des sites conçus pour des artisans, pas pour des développeurs.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-lg text-lg text-sand">
              Chaque projet ci-dessous a été pensé pour un métier et une entreprise précis. Aucun résultat inventé —
              vous voyez exactement l&apos;approche et les choix de design.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container className="flex flex-col gap-24">
          {projects.map((project, i) => (
            <Reveal
              key={project.slug}
              className={cn(
                "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16",
                i % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              <div className="relative pb-[8%]">
                <BrowserFrame project={project} className={cn(i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1")} />
                <PhoneFrame
                  project={project}
                  className="absolute -bottom-2 right-[8%] hidden w-[24%] sm:block"
                />
              </div>

              <div className="flex flex-col items-start gap-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{project.metier}</Badge>
                  <Badge>{project.ville}</Badge>
                  {project.status === "concept" && <Badge>Projet concept</Badge>}
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-medium text-ink sm:text-4xl">
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
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink sm:text-3xl">
            Votre entreprise pourrait être la prochaine.
          </h2>
          <ButtonLink href={siteConfig.ctaSecondary.href} size="lg">
            {siteConfig.ctaSecondary.label}
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
