import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Kicker } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { BrowserFrame } from "@/components/mockups/browser-frame";
import { PhoneFrame } from "@/components/mockups/phone-frame";

/**
 * Hero — section la plus importante du site (brief §9). Répond en un
 * regard à QUOI / POUR QUI / POURQUOI / QUE FAIRE ENSUITE, et donne une
 * preuve visuelle immédiate via une composition de vraies réalisations
 * plutôt qu'une illustration générique de développeur.
 */
export function Hero() {
  const [istreen, bkPlus, daiselec] = projects;

  return (
    <section className="relative overflow-hidden bg-ink-950 pt-16 pb-24 sm:pt-20 sm:pb-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <Container className="relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        <div className="flex flex-col items-start gap-7">
          <Reveal>
            <Kicker className="text-clay-400">
              <span className="h-px w-6 bg-clay-400" aria-hidden />
              Sites internet pour artisans
            </Kicker>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="max-w-xl font-[family-name:var(--font-display)] text-[2.6rem] leading-[1.06] font-medium tracking-[-0.015em] text-white sm:text-[3.4rem] lg:text-[3.75rem]">
              Un site à la hauteur de <span className="text-clay-400 italic">votre savoir-faire.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-sand">
              {siteConfig.name} conçoit des sites internet sur mesure pour les artisans du bâtiment — clairs,
              rapides, et pensés pour transformer vos visiteurs en appels et en devis.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={siteConfig.ctaPrimary.href} size="lg">
              {siteConfig.ctaPrimary.label}
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </ButtonLink>
            <ButtonLink href={siteConfig.ctaSecondary.href} variant="secondary" size="lg">
              {siteConfig.ctaSecondary.label}
            </ButtonLink>
          </Reveal>

          <Reveal delay={0.2} className="flex items-center gap-3 pt-2 text-sm text-sand-faint">
            <span>Plombiers · Électriciens · Chauffagistes · Couvreurs · Paysagistes…</span>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative hidden lg:block">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -top-8 -right-4 w-[72%] rotate-[4deg] opacity-70">
              <BrowserFrame project={daiselec} />
            </div>
            <div className="relative z-10 rotate-[-3deg]">
              <BrowserFrame project={bkPlus} />
            </div>
            <div className="absolute -bottom-10 -left-10 z-20 w-[42%]">
              <PhoneFrame project={istreen} className="w-full" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
