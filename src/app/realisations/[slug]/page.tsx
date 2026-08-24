import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

const stages = (project: NonNullable<ReturnType<typeof getProjectBySlug>>) => [
  { label: "Problème", text: project.probleme },
  { label: "Approche", text: project.approche },
  { label: "Design", text: project.design },
  { label: "Résultat", text: project.resultat },
];

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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

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
                  <Badge className="border-white/15 bg-white/5 text-sand">Projet concept</Badge>
                )}
                {project.caracteristiques.slice(0, 2).map((c) => (
                  <Badge key={c} className="border-white/15 bg-white/5 text-sand">
                    {c}
                  </Badge>
                ))}
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-paper pt-0">
        <Container className="-mt-14 sm:-mt-16">
          <Reveal>
            <Tilt className="relative pb-[6%]">
              <BrowserFrame project={project} />
              <PhoneFrame project={project} className="absolute -bottom-4 right-[8%] hidden w-[22%] sm:block" />
            </Tilt>
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

      <section className="border-t border-line bg-paper-dim py-16">
        <Container className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link
            href={`/realisations/${next.slug}`}
            className="group flex items-center gap-4 text-left"
          >
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
