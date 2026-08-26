"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { processSteps } from "@/data/process";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";

/**
 * Processus rassurant en 4 étapes (brief §13). Timeline connectée plutôt
 * que quatre cartes identiques, avec un trait qui se remplit d'argile au
 * fil du scroll — une façon de rendre "la progression" tangible plutôt
 * que juste illustrée.
 */
export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.75", "end 0.4"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <section ref={sectionRef} className="grain relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      {/* Moitié haute de la ligne d'accent partagée avec Benefits (juste
          au-dessus) — voir le commentaire dans benefits.tsx. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-0.5 bg-gradient-to-r from-transparent via-clay-400 to-transparent shadow-[0_0_16px_2px_rgba(217,119,20,0.55),0_0_28px_10px_rgba(217,119,20,0.08)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-hero-aurora-a absolute top-[-25%] right-[-10%] size-[420px] rounded-full bg-clay-600/15 blur-[130px]" />
      </div>

      <Container className="relative">
        <SectionHeading
          tone="dark"
          kicker="Comment ça se passe"
          title="Un déroulé simple, sans surprise."
          subtitle="Vous n'avez rien à gérer techniquement : on avance ensemble, étape par étape."
        />

        <div className="relative mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute top-6 right-0 left-0 hidden h-px bg-ink-700 lg:block" aria-hidden />
          <motion.div
            className="absolute top-6 left-0 hidden h-px origin-left bg-clay-500 lg:block"
            style={{ scaleX: lineProgress, width: "100%" }}
            aria-hidden
          />
          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08} className="group relative flex flex-col gap-4">
              <span className="relative z-10 w-fit bg-ink-950 pr-4 font-[family-name:var(--font-display)] text-4xl font-normal text-clay-400 transition-colors duration-300 group-hover:text-clay-200">
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
