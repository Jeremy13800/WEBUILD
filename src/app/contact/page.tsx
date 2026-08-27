import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Lock,
  LifeBuoy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre projet de site internet. Réponse rapide, sans engagement — je prends le temps de comprendre votre activité avant tout devis.",
};

/** Trois réassurances sous l'intro du Hero — promesses de service réelles
 * (même registre que data/benefits.ts), jamais une preuve chiffrée inventée. */
const heroReassurance: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Phone, title: "Réponse sous 24 à 48h", text: "Nous vous recontactons rapidement" },
  { icon: MessageCircle, title: "Un échange sans engagement", text: "Vous restez libre de vos décisions" },
  { icon: Lock, title: "Vos données sont confidentielles", text: "Aucune diffusion, jamais" },
];

const nextSteps = ["Vous envoyez votre demande", "On échange par téléphone ou par écrit", "Vous recevez une proposition claire"];

/** Quatre piliers après la carte — reformulation, pour cette page, des
 * bénéfices déjà établis dans data/benefits.ts (jamais une fonctionnalité
 * technique, toujours un résultat concret pour l'artisan). */
const pillars: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: "Des sites qui inspirent confiance", text: "Une image professionnelle qui valorise votre savoir-faire." },
  { icon: Phone, title: "Plus d'appels et de demandes", text: "Pensés pour transformer vos visiteurs en prospects." },
  { icon: Zap, title: "Rapides, sécurisés, optimisés", text: "Une expérience fluide pour vos futurs clients." },
  { icon: LifeBuoy, title: "Un accompagnement durable", text: "Maintenance, évolutions et support selon l'offre choisie." },
];

/**
 * Refonte à partir d'une référence visuelle fournie par le client (capture
 * d'écran) : composition, proportions et rythme des sections reproduits
 * fidèlement, adaptés au design system et aux données réelles de WeBuild.
 *
 * Écarts assumés par rapport à la référence littérale, en faveur du contenu
 * vérifiable déjà établi ailleurs sur le site :
 * - pas de numéro de téléphone (siteConfig.phone.display est vide) ;
 * - pas de "+350 artisans accompagnés" ni de "ils nous ont confié…" (aucun
 *   client confirmé dans data/projects.ts — tous en status "concept") ;
 * - pas de colonne footer "Ressources" (aucune de ces pages n'existe —
 *   éviterait des liens morts) ;
 * - "réponse sous 24 à 48h" partout (pas "24h") : c'est l'engagement déjà
 *   pris ailleurs sur le site (voir le message de succès du formulaire).
 */
export default function ContactPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      {/* `pb-28 sm:pb-32 lg:pb-36` : calé sur le chevauchement de la carte
          juste en dessous (`-mt-12 sm:-mt-16 lg:-mt-20`) pour garantir
          ~56-64px de respiration entre le bas des réassurances et le haut
          de la carte, à CHAQUE palier — jamais un `pb` fixe ne fonctionnant
          qu'à une résolution donnée. Aucun override au-delà de `lg` : le
          rapport reste identique de 1024px à 1920px et au-delà. */}
      <section className="grain relative -mt-18 flex flex-col overflow-hidden bg-ink-950 pt-24 pb-28 text-white sm:pt-28 sm:pb-32 lg:pb-36">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-hero-aurora-a absolute top-[-30%] right-[5%] size-[560px] rounded-full bg-clay-600/20 blur-[140px]" />
          <div className="animate-hero-aurora-b absolute bottom-[-35%] left-[10%] size-[420px] rounded-full bg-clay-500/10 blur-[130px]" />
        </div>

        {/* Visuel chantier — recadré depuis `hero-bg.png` (voir
            public/images/contact-hero-bg.png) sur juste l'artisan de dos et
            la structure, SANS les mockups de sites incrustés dans la photo
            d'origine : la même image telle quelle recréait une scène
            incohérente sur cette page (voir tentative précédente). Panneau
            contenu (pas plein cadre) : la source ne fait que 656×245px,
            l'étirer sur toute la hauteur du Hero l'aurait rendue floue.
            Le masque radial fait disparaître les bords progressivement dans
            le noir environnant — même intention que le dégradé du Hero de
            l'accueil, traitement différent (contenu plutôt que plein cadre)
            pour ne pas le copier à l'identique. */}
        <div className="pointer-events-none absolute inset-0 hidden lg:flex lg:items-center lg:justify-end">
          <div
            className="relative aspect-[656/245] w-[52%] max-w-[760px] overflow-hidden"
            style={{
              maskImage: "radial-gradient(ellipse 75% 75% at 66% 50%, black 42%, transparent 92%)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 66% 50%, black 42%, transparent 92%)",
            }}
          >
            <Image
              src="/images/contact-hero-bg.png"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 52vw, 0px"
              className="object-cover object-[70%_45%]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink-950)_0%,transparent_60%)]"
              aria-hidden
            />
          </div>
        </div>

        {/* Trame de points très légère, sur toute la section */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />

        <Container className="relative flex-1">
          <div className="flex max-w-xl flex-col items-start gap-5">
            <Reveal>
              <Kicker className="text-clay-400">Contact</Kicker>
            </Reveal>

            {/* Même traitement typographique que le H1 de l'accueil (sans
                grasse, pas le serif display utilisé partout ailleurs) :
                c'est la comparaison directe demandée par le client.
                Deux `SplitText` empilés en `block` (pas un seul flux avec
                retour à la ligne naturel) : garantit exactement "Parlons
                de" / "votre projet." à toutes les tailles d'écran, plutôt
                que de dépendre d'une largeur de conteneur qui tombe pile
                au bon endroit — fragile, et déjà tombé sur 3 lignes en
                pratique (voir la capture précédente). */}
            <h1 className="font-sans text-5xl leading-[0.95] font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
              <SplitText trigger="mount" delay={0.05} segments={[{ text: "Parlons de" }]} className="block" />
              <SplitText
                trigger="mount"
                delay={0.15}
                segments={[{ text: "votre projet.", className: "text-clay-500" }]}
                className="block"
              />
            </h1>

            <Reveal delay={0.35}>
              <p className="max-w-lg text-lg leading-relaxed text-sand">
                Un site internet professionnel peut transformer votre activité. Discutons ensemble de vos objectifs,
                de vos besoins et de la meilleure façon de les atteindre.
              </p>
            </Reveal>

            <Reveal delay={0.4} className="mt-2 flex flex-col gap-5">
              {heroReassurance.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-clay-500/25 bg-white/5 text-clay-400">
                    <item.icon className="size-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold tracking-[0.02em] text-clay-400 uppercase">{item.title}</p>
                    <p className="text-sm text-sand-faint">{item.text}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ============ TRANSITION + CARTE ============ */}
      <section className="relative bg-paper pb-24 sm:pb-32">
        {/* Fine jonction sombre → crème — même traitement que Problem/
            AboutTeaser (jamais de vague ni de diagonale). */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12.5 bg-gradient-to-b from-clay-500/8 to-transparent" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-clay-400 to-transparent shadow-[0_0_16px_2px_rgba(217,119,20,0.55),0_0_28px_10px_rgba(217,119,20,0.08)]"
          aria-hidden
        />

        <Container>
          <div className="relative -mt-4 grid grid-cols-1 overflow-hidden rounded-[28px] border border-line bg-card shadow-[var(--shadow-lg)] sm:-mt-8 lg:-mt-12 lg:grid-cols-[35%_65%]">
            {/* Panneau gauche — coordonnées directes + ce qui se passe après
                l'envoi. Pas de numéro de téléphone : siteConfig.phone.display
                est vide tant que le client ne l'a pas fourni. */}
            <div className="grain relative flex flex-col gap-10 overflow-hidden bg-ink-950 p-7 text-white sm:p-11 lg:p-12">
              <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-clay-500/20 blur-[90px]" aria-hidden />

              {/* "@" géant en filigrane — demandé explicitement par le
                  client, très faible opacité, purement décoratif. */}
              <span
                className="pointer-events-none absolute -right-6 -bottom-10 font-[family-name:var(--font-display)] text-[13rem] leading-none font-normal text-clay-500/[0.07] select-none"
                aria-hidden
              >
                @
              </span>

              <Reveal className="relative flex flex-col gap-6">
                <h2 className="font-[family-name:var(--font-display)] text-2xl leading-[1.15] font-normal text-white sm:text-3xl">
                  Un premier échange, <span className="text-clay-400">sans détour.</span>
                </h2>
                <div className="flex flex-col gap-4">
                  <a
                    href={`mailto:${siteConfig.email.address}`}
                    className="flex items-center gap-3 text-sm font-medium text-sand transition-colors hover:text-white"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-clay-400">
                      <Mail className="size-4" strokeWidth={2} />
                    </span>
                    {siteConfig.email.address}
                  </a>
                  <span className="flex items-center gap-3 text-sm text-sand-faint">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-clay-400">
                      <MapPin className="size-4" strokeWidth={2} />
                    </span>
                    {siteConfig.address.city}, {siteConfig.address.region}
                  </span>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="relative flex flex-col gap-4">
                <span className="text-xs font-semibold tracking-[0.14em] text-sand-faint uppercase">Comment ça se passe ?</span>
                <ol className="flex flex-col gap-4">
                  {nextSteps.map((step, i) => (
                    <li key={step} className="flex items-start gap-3">
                      <span className="font-[family-name:var(--font-display)] text-lg leading-none font-normal text-clay-400">
                        0{i + 1}
                      </span>
                      <span className="text-sm leading-relaxed text-sand">{step}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-xs text-sand-faint">La réponse moyenne est sous 24 à 48h.</p>
              </Reveal>
            </div>

            {/* Panneau droit — le formulaire n'a pas sa propre bordure/ombre
                (voir contact-form.tsx) : ce panneau fait déjà office de
                carte. `justify-center` : cette colonne suit la hauteur fixe
                du panneau gauche (grid stretch) alors que le contenu du
                formulaire varie selon l'étape. */}
            <div className="relative flex flex-col justify-center p-7 sm:p-11 lg:p-12">
              {/* Lumière argile à la jonction des deux panneaux — demandée
                  explicitement par le client, même traitement (dégradé +
                  double lueur) que les autres jonctions sombre/clair du
                  site (voir problem.tsx). */}
              <div
                className="pointer-events-none absolute inset-y-10 left-0 z-10 hidden w-0.5 bg-gradient-to-b from-transparent via-clay-400 to-transparent shadow-[0_0_16px_2px_rgba(217,119,20,0.55),0_0_28px_10px_rgba(217,119,20,0.08)] lg:block"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-10 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-clay-400 to-transparent shadow-[0_0_16px_2px_rgba(217,119,20,0.55),0_0_28px_10px_rgba(217,119,20,0.08)] lg:hidden"
                aria-hidden
              />
              <Suspense>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>

      {/* ============ RÉASSURANCE / 4 PILIERS ============ */}
      <section className="bg-paper pb-20 sm:pb-28">
        <Container className="flex flex-col items-center text-center">
          <Reveal>
            <Kicker className="justify-center">Pensé pour les artisans du bâtiment</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 max-w-xl font-[family-name:var(--font-display)] text-3xl font-normal text-ink sm:text-4xl">
              Votre site doit faire plus que <span className="text-clay-600 italic">simplement être en ligne.</span>
            </h2>
          </Reveal>

          {/* `mt-16`→`mt-14` et `gap-y-12`→`gap-y-10` : ~15% d'espace
              vertical "inutile" en moins, sans toucher au gap interne de
              chaque colonne (icône/titre/texte) qui reste nécessaire à la
              lisibilité. Icônes et titres légèrement agrandis (size-11→12,
              size-5→5.5 via size-[22px], text-lg→xl) — toujours pas de
              carte : aucun fond, bordure ou padding en boîte autour de
              chaque colonne. */}
          <div className="mt-14 grid w-full grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, i) => (
              <Reveal
                key={pillar.title}
                delay={i * 0.05}
                className="flex flex-col items-center gap-4 px-4 lg:border-l lg:border-line lg:first:border-l-0"
              >
                <span className="grid size-12 place-items-center rounded-full bg-clay-50 text-clay-600">
                  <pillar.icon className="size-[22px]" strokeWidth={1.75} />
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-normal text-ink">{pillar.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{pillar.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ CTA FINAL SOMBRE ============ */}
      <section className="grain relative overflow-hidden bg-ink-950 py-20 text-white sm:py-24">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="animate-hero-aurora-a absolute top-[-40%] left-[15%] size-[420px] rounded-full bg-clay-600/15 blur-[130px]" />
        </div>
        <Container className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.3fr_auto_1fr] lg:gap-12">
          <Reveal>
            <Kicker className="text-clay-400">Prêt à passer au niveau supérieur ?</Kicker>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-[1.15] font-normal sm:text-4xl">
              Votre prochain client est déjà <span className="text-clay-400 italic">en ligne.</span>
            </h2>
          </Reveal>

          <div className="hidden h-full w-px bg-ink-700 lg:block" aria-hidden />

          <Reveal delay={0.1} className="flex flex-col items-start gap-4">
            <p className="text-base text-sand">Discutons de votre projet dès maintenant.</p>
            <ButtonLink href={siteConfig.ctaSecondary.href} size="lg">
              {siteConfig.ctaSecondary.label}
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
