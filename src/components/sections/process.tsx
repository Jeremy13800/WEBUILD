import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Processus rassurant en 4 étapes (brief §13). Timeline connectée plutôt
 * que quatre cartes identiques, pour donner un vrai sentiment de
 * progression simple.
 */
export function Process() {
  return (
    <section className="bg-ink-950 py-24 text-white sm:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          kicker="Comment ça se passe"
          title="Un déroulé simple, sans surprise."
          subtitle="Vous n'avez rien à gérer techniquement : on avance ensemble, étape par étape."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-ink-700 lg:block" aria-hidden />
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="relative flex flex-col gap-4">
              <span className="relative z-10 w-fit bg-ink-950 pr-4 font-[family-name:var(--font-display)] text-4xl font-medium text-clay-400">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-sand-faint">{step.description}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
