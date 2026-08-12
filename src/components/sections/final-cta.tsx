import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { SplitText } from "@/components/motion/split-text";

/**
 * Dernier temps fort du site — même langage visuel que le Hero (aurores,
 * grain) pour que l'ouverture et la clôture se répondent, CTA magnétique
 * pour l'action la plus importante de la page.
 */
export function FinalCta() {
  return (
    <section className="grain relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-hero-aurora-a absolute top-[-30%] left-[10%] size-[480px] rounded-full bg-clay-600/20 blur-[130px]" />
        <div className="animate-hero-aurora-b absolute right-[5%] bottom-[-35%] size-[440px] rounded-full bg-clay-500/15 blur-[130px]" />
      </div>

      <Container className="relative flex flex-col items-center gap-7 text-center">
        <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-normal tracking-[-0.01em] text-white sm:text-5xl">
          <SplitText
            trigger="inView"
            segments={[
              { text: "Votre entreprise mérite une" },
              { text: "vraie vitrine.", className: "text-clay-400 italic" },
            ]}
          />
        </h2>
        <Reveal delay={0.05}>
          <p className="max-w-lg text-lg text-sand">
            Parlons de votre projet — sans engagement, pour comprendre votre activité et voir ce qui a du sens pour
            vous.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Magnetic>
            <ButtonLink href={siteConfig.ctaSecondary.href} size="lg">
              {siteConfig.ctaSecondary.label}
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </ButtonLink>
          </Magnetic>
          <ButtonLink href="/offres" variant="secondary" size="lg">
            Voir les tarifs
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
