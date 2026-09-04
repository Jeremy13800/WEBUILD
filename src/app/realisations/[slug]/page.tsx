import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Badge, Kicker } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { BlueprintMarks } from "@/components/motion/blueprint-marks";
import { Tilt } from "@/components/motion/tilt";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { PhoneFrame } from "@/components/mockups/phone-frame";
import type { Project } from "@/types";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Site internet pour ${project.metier.toLowerCase()}`,
    description: project.summary,
  };
}

const stages = (project: Project) => [
  { label: "Problème", text: project.probleme },
  { label: "Approche", text: project.approche },
  { label: "Design", text: project.design },
  { label: "Résultat", text: project.resultat },
];

/**
 * Labels éditoriaux des 4 points "Design & UX" de CaseStudyLayout — génériques
 * plutôt que spécifiques à un projet, pour rester utilisables tels quels une
 * fois cette direction répliquée aux deux autres pages.
 */
const uxLabels = ["Conversion", "Réassurance", "Preuve", "Local"];

/**
 * Ancienne mise en page "fiche projet" — conservée à l'identique pour Le
 * Plombier Istréen et Daiselec tant que la nouvelle direction "case study"
 * (voir CaseStudyLayout ci-dessous) n'a pas été validée sur les trois
 * projets. Ne pas modifier sans raison : c'est le comportement de
 * référence, pas un brouillon.
 */
function LegacyLayout({ project, next }: { project: Project; next: Project }) {
  return (
    <>
      <section className="grain relative -mt-18 overflow-hidden bg-ink-950 pt-24 pb-24 text-white sm:pt-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-hero-aurora-b absolute top-[-20%] right-[-15%] size-[440px] rounded-full bg-clay-600/15 blur-[130px]" />
        </div>
        <BlueprintMarks />
        <Container className="relative">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-sm font-medium text-sand-faint hover:text-white"
          >
            <ArrowLeft className="size-4" strokeWidth={2.5} />
            Toutes les réalisations
          </Link>

          <div className="mt-8 grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <Reveal>
                <Kicker className="text-clay-400">
                  {project.metier} · {project.ville}
                </Kicker>
              </Reveal>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-[1.08] font-normal tracking-[-0.01em] sm:text-6xl">
                <SplitText trigger="mount" delay={0.05} segments={[{ text: project.name }]} />
              </h1>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-lg text-sand">{project.summary}</p>
              </Reveal>
              <Reveal delay={0.15} className="mt-6 flex flex-wrap gap-2">
                {project.status === "concept" && (
                  <Badge className="border-clay-500/40 bg-clay-500/10 font-semibold text-clay-300">
                    Projet concept
                  </Badge>
                )}
                {project.caracteristiques.slice(0, 2).map((c) => (
                  <Badge key={c} className="border-white/15 bg-white/5 text-sand">
                    {c}
                  </Badge>
                ))}
              </Reveal>
              {project.liveUrl && (
                <Reveal delay={0.2} className="mt-7">
                  <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                    Visiter la démo
                    <ArrowUpRight className="size-4" strokeWidth={2.5} />
                  </ButtonLink>
                </Reveal>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Grande capture desktop — le vrai site est la vedette de cette page
          (brief : "voir le projet" doit vraiment montrer le projet). Pas de
          Tilt/rotation ici, volontairement : cet effet reste réservé à la
          composition desktop + mobile plus bas, pour ne pas complexifier le
          tout premier visuel que découvre le visiteur. */}
      <section className="bg-paper pt-0">
        <Container className="-mt-14 sm:-mt-16">
          <Reveal>
            <BrowserFrame project={project} className="mx-auto w-full" priority />
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-normal text-ink sm:text-3xl">
              <SplitText trigger="inView" segments={[{ text: "Objectif du projet" }]} />
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{project.objectif}</p>

            <h3 className="mt-10 text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Caractéristiques
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {project.caracteristiques.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-clay-600" />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-10">
            {stages(project).map((stage, i) => (
              <Reveal key={stage.label} delay={i * 0.05} className="flex gap-6">
                <span className="w-24 shrink-0 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.1em] text-clay-600 uppercase">
                  {stage.label}
                </span>
                <p className="text-base leading-relaxed text-ink-soft">{stage.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Desktop + mobile — preuve que le site n'est pas pensé que pour
          grand écran (brief : montrer explicitement les deux formats). */}
      <section className="border-t border-line bg-paper-dim py-24 sm:py-32">
        <Container>
          <Reveal>
            <Kicker>Sur tous les écrans</Kicker>
          </Reveal>
          <Reveal delay={0.05} className="mt-10">
            <Tilt className="relative pb-[6%]">
              <BrowserFrame project={project} className="max-w-3xl" />
              <PhoneFrame project={project} className="absolute -bottom-4 right-[8%] hidden w-[19%] sm:block" />
            </Tilt>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-paper py-16">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link href={`/realisations/${next.slug}`} className="group flex items-center gap-4 text-left">
            <span className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">Projet suivant</span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-normal text-ink">
              {next.name}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </span>
          </Link>
          <ButtonLink href={siteConfig.ctaSecondary.href}>{siteConfig.ctaSecondary.label}</ButtonLink>
        </Container>
      </section>
    </>
  );
}

/**
 * Nouvelle mise en page "case study" premium (brief : "SHOW FIRST. EXPLAIN
 * SECOND."). Entièrement pilotée par les données du projet — aucun texte
 * spécifique à un slug n'est codé en dur ici, pour qu'elle s'applique aux
 * deux autres projets sans réécriture le jour où elle sera validée (voir le
 * gate `useCaseStudyLayout` plus bas, à retirer à ce moment-là).
 *
 * Réutilise les champs existants (probleme/approche/design/resultat/
 * caracteristiques) en leur donnant un habillage éditorial différent,
 * plutôt que d'inventer un nouveau modèle de données : aucun contenu du
 * portfolio n'a été réécrit dans cette passe, uniquement sa présentation.
 */
function CaseStudyLayout({ project, next }: { project: Project; next: Project }) {
  return (
    <>
      {/* 01 — Hero, volontairement court : le visiteur doit atteindre la
          vraie capture du site en un scroll, pas après un plein écran. */}
      <section className="grain relative -mt-18 overflow-hidden bg-ink-950 pt-24 pb-16 text-white sm:pt-28 sm:pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-hero-aurora-b absolute top-[-20%] right-[-15%] size-[440px] rounded-full bg-clay-600/15 blur-[130px]" />
        </div>
        <BlueprintMarks />
        <Container className="relative">
          <Link
            href="/realisations"
            className="inline-flex items-center gap-2 text-sm font-medium text-sand-faint hover:text-white"
          >
            <ArrowLeft className="size-4" strokeWidth={2.5} />
            Toutes les réalisations
          </Link>

          <div className="mt-8 max-w-2xl">
            <Reveal className="flex flex-wrap items-center gap-2">
              {project.status === "concept" && (
                <Badge className="border-clay-500/40 bg-clay-500/10 font-semibold text-clay-300">
                  Projet concept
                </Badge>
              )}
              <Kicker className="text-clay-400">
                {project.metier} · {project.ville}
              </Kicker>
            </Reveal>
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-[1.08] font-normal tracking-[-0.01em] sm:text-6xl">
              <SplitText trigger="mount" delay={0.05} segments={[{ text: project.name }]} />
            </h1>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-lg text-sand">{project.summary}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary">
                  Explorer la démo
                  <ArrowUpRight className="size-4" strokeWidth={2.5} />
                </ButtonLink>
              )}
              <a
                href="#le-site"
                className="inline-flex items-center gap-2 text-sm font-medium text-sand-faint transition-colors hover:text-white"
              >
                Découvrir le projet
                <ArrowDown className="size-4" strokeWidth={2.5} />
              </a>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* 02 — Grande présentation visuelle du vrai site : la preuve avant
          l'explication. Pas de Tilt/rotation ici, volontairement — cet
          effet reste réservé à la section "Sur tous les écrans" plus bas,
          pour ne pas complexifier le tout premier visuel du projet. */}
      <section id="le-site" className="scroll-mt-24 bg-paper pt-16 pb-24 sm:pt-20 sm:pb-32">
        <Container>
          <Reveal className="max-w-xl">
            <Kicker>Le site</Kicker>
            {project.showcaseTitle && (
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-normal text-ink sm:text-3xl">
                <SplitText trigger="inView" segments={[{ text: project.showcaseTitle }]} />
              </h2>
            )}
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <BrowserFrame project={project} className="mx-auto w-full" priority />
          </Reveal>
        </Container>
      </section>

      {/* 03 + 04 — Contexte puis approche WeBuild, courts, jamais formulés
          comme une commande passée par l'entreprise (brief : "le concept a
          été pensé pour...", jamais "le client souhaitait..."). */}
      <section className="border-t border-line bg-paper py-20 sm:py-28">
        <Container className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-2">
          <Reveal>
            <Kicker>Le contexte</Kicker>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{project.probleme}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <Kicker>L&apos;approche WeBuild</Kicker>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">{project.approche}</p>
          </Reveal>
        </Container>
      </section>

      {/* 05 — Design & UX : 3-4 décisions, pas une liste de fonctionnalités
          exhaustive. Réutilise `caracteristiques` (déjà 3-4 éléments,
          contenu inchangé) plutôt que d'inventer une nouvelle formulation —
          seul ajout : un petit numéro + label éditorial par point, pour
          renforcer la hiérarchie sans jamais basculer en cards (brief :
          "le design doit rester silencieux"). Labels génériques, pas encore
          un champ de donnée dédié — à revoir si un futur projet a besoin
          d'intitulés différents une fois cette direction répliquée. */}
      <section className="border-t border-line bg-paper-dim py-24 sm:py-32">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Kicker>Design &amp; UX</Kicker>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-ink-soft">{project.design}</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
            {project.caracteristiques.map((c, i) => (
              <Reveal key={c} delay={i * 0.05} className="border-t border-line pt-5">
                <span className="flex items-baseline gap-2 text-xs font-semibold tracking-[0.14em] text-clay-600 uppercase">
                  <span className="font-[family-name:var(--font-display)] text-base font-normal not-italic text-clay-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {uxLabels[i % uxLabels.length]}
                </span>
                <p className="mt-2 text-lg leading-snug text-ink">{c}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 06 — Sur tous les écrans : preuve de cohérence responsive, pas de
          design (déjà montré plus haut). Fond sombre pour marquer une vraie
          rupture avec la grande capture cream du début. */}
      <section className="grain relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-hero-aurora-a absolute top-[10%] left-[-15%] size-105 rounded-full bg-clay-600/10 blur-[130px]" />
        </div>
        <Container className="relative">
          <Reveal>
            <Kicker className="text-clay-400">Sur tous les écrans</Kicker>
          </Reveal>
          <Reveal delay={0.05} className="mt-10">
            <Tilt className="relative pb-[6%]">
              <BrowserFrame project={project} className="max-w-3xl" />
              <PhoneFrame project={project} className="absolute -bottom-4 right-[8%] hidden w-[19%] sm:block" />
            </Tilt>
          </Reveal>
        </Container>
      </section>

      {/* 08 — La solution imaginée : jamais "résultat" (brief : éviter tout
          vocabulaire qui suggère une performance commerciale obtenue pour
          un client réel). */}
      <section className="border-t border-line bg-paper py-16 sm:py-20">
        <Container className="max-w-2xl">
          <Reveal>
            <Kicker>La solution imaginée</Kicker>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{project.resultat}</p>
          </Reveal>
        </Container>
      </section>

      {/* 09 — CTA démo : le vrai site reste la meilleure preuve. */}
      {project.liveUrl && (
        <section className="border-t border-line bg-ink-950 py-20 text-center text-white sm:py-24">
          <Container className="flex flex-col items-center gap-5">
            <h2 className="max-w-lg font-[family-name:var(--font-display)] text-2xl font-normal sm:text-3xl">
              <SplitText
                trigger="inView"
                segments={[{ text: "Le meilleur moyen de comprendre le projet reste de l'explorer." }]}
              />
            </h2>
            <ButtonLink href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
              Explorer la démo
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </ButtonLink>
            <span className="text-sm text-sand-faint">{project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
          </Container>
        </section>
      )}

      {/* 10 — Projet suivant, pour ne pas laisser le visiteur en cul-de-sac. */}
      <section className="border-t border-line bg-paper py-16">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link href={`/realisations/${next.slug}`} className="group flex items-center gap-4 text-left">
            <span className="text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">Projet suivant</span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-normal text-ink">
              {next.name}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </span>
          </Link>
          <ButtonLink href={siteConfig.ctaSecondary.href}>{siteConfig.ctaSecondary.label}</ButtonLink>
        </Container>
      </section>
    </>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Réalisations", item: `${siteConfig.url}/realisations` },
      { "@type": "ListItem", position: 2, name: project.name, item: `${siteConfig.url}/realisations/${project.slug}` },
    ],
  };

  // Nouvelle direction "case study" testée sur un seul projet avant
  // validation visuelle (brief §25) — repasser cette condition à `true`
  // inconditionnel (et supprimer LegacyLayout) une fois les trois pages
  // validées.
  const useCaseStudyLayout = project.slug === "bk-plomberie";

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {useCaseStudyLayout ? (
        <CaseStudyLayout project={project} next={next} />
      ) : (
        <LegacyLayout project={project} next={next} />
      )}
    </>
  );
}
