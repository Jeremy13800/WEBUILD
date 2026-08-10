import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <Container className="relative flex flex-col items-center gap-7 text-center">
        <Reveal>
          <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-medium tracking-[-0.01em] text-white sm:text-5xl">
            Votre entreprise mérite une <span className="text-clay-400 italic">vraie vitrine.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="max-w-lg text-lg text-sand">
            Parlons de votre projet — sans engagement, pour comprendre votre activité et voir ce qui a du sens pour
            vous.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3 pt-2 sm:flex-row">
          <ButtonLink href={siteConfig.ctaSecondary.href} size="lg">
            {siteConfig.ctaSecondary.label}
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </ButtonLink>
          <ButtonLink href="/offres" variant="secondary" size="lg">
            Voir les tarifs
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
