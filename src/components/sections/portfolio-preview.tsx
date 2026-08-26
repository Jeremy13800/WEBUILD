import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { ClipReveal } from "@/components/motion/clip-reveal";
import { Tilt } from "@/components/motion/tilt";
import { HoverTag } from "@/components/motion/hover-tag";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import { cn } from "@/lib/utils";

/**
 * Portfolio — section prioritaire (brief §10). Chaque projet occupe une
 * grande partie de l'écran, en alternance gauche/droite : jamais une
 * grille de petites cartes identiques. Le mockup entier est cliquable et
 * bascule légèrement en 3D au survol (Tilt) — invite naturelle au clic.
 */
export function PortfolioPreview() {
  return (
    <section id="realisations" className="bg-paper py-24 sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            kicker="Réalisations"
            title="Voir avant de croire."
            subtitle="Des projets réels, conçus pour des artisans du bâtiment. Aucun résultat inventé — le travail parle de lui-même."
          />
          <ButtonLink href="/realisations" variant="secondary-light" className="hidden shrink-0 sm:inline-flex">
            Toutes les réalisations
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </ButtonLink>
        </div>

        <div className="mt-16 flex flex-col gap-24">
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={cn(
                "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16",
                i % 2 === 1 && "lg:[&>*:first-child]:order-2",
              )}
            >
              {/* Dévoilement en rideau plutôt qu'un simple fondu — la section
                  qui doit le plus donner envie de cliquer mérite le geste
                  le plus marquant. Le sens suit la position de l'image. */}
              <ClipReveal direction={i % 2 === 0 ? "left" : "right"}>
                <HoverTag label="Voir l'étude de projet">
                  <Tilt className="relative pb-[8%]">
                    <Link
                      href={`/realisations/${project.slug}`}
                      data-cursor-hover
                      className="block transition-shadow duration-300 hover:drop-shadow-[0_28px_44px_rgba(28,23,18,0.16)]"
                    >
                      <BrowserFrame project={project} className={cn(i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1")} />
                      <PhoneFrame project={project} className="absolute -bottom-2 right-[8%] hidden w-[24%] sm:block" />
                    </Link>
                  </Tilt>
                </HoverTag>
              </ClipReveal>

              <Reveal className="flex flex-col items-start gap-5">
                <div className="flex items-center gap-2">
                  <Badge>{project.metier}</Badge>
                  <Badge>{project.ville}</Badge>
                  {project.status === "concept" && <Badge>Projet concept</Badge>}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-3xl font-normal text-ink sm:text-4xl">
                  {project.name}
                </h3>
                <p className="text-base leading-relaxed text-ink-soft">{project.summary}</p>
                <ul className="flex flex-col gap-2">
                  {project.caracteristiques.slice(0, 3).map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-ink-soft">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-clay-600" />
                      {c}
                    </li>
                  ))}
                </ul>
                <ButtonLink href={`/realisations/${project.slug}`} variant="secondary-light" className="mt-2 group">
                  Voir le projet
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </ButtonLink>
              </Reveal>
            </div>
          ))}
        </div>

        <ButtonLink href="/realisations" variant="secondary-light" className="mt-16 w-full sm:hidden">
          Toutes les réalisations
          <ArrowRight className="size-4" strokeWidth={2.5} />
        </ButtonLink>
      </Container>
    </section>
  );
}
