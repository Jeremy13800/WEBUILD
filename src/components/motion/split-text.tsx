"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

interface Segment {
  text: string;
  className?: string;
}

/**
 * Titre à révélation mot par mot (masque + translation verticale) — l'effet
 * signature des sites premium, bien plus marquant qu'un simple fondu.
 * `trigger="mount"` pour un titre déjà visible au chargement (Hero),
 * `trigger="inView"` pour un titre plus bas dans la page (CTA final,
 * SectionHeading).
 *
 * La détection de visibilité (`whileInView`) est posée sur le conteneur
 * englobant, jamais sur les mots eux-mêmes : chaque mot est décalé sous
 * son propre masque `overflow-hidden` avant révélation (`y: "110%"`), donc
 * un mot pris individuellement se trouve géométriquement hors de la zone
 * visible de SON PROPRE wrapper — pour l'IntersectionObserver qui sous-tend
 * `whileInView`, il ne "voit" jamais son propre élément, et l'animation ne
 * se déclenche donc jamais (piège classique de ce pattern). Le conteneur
 * externe, lui, n'est ni masqué ni transformé : sa géométrie est stable, et
 * l'état d'animation se propage aux mots via `variants` partagés — même
 * mécanisme que `RevealGroup`/`RevealItem` dans reveal.tsx.
 */
export function SplitText({
  segments,
  className,
  delay = 0,
  trigger = "mount",
}: {
  segments: Segment[];
  className?: string;
  delay?: number;
  trigger?: "mount" | "inView";
}) {
  const reduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduced ? 0 : 0.045, delayChildren: delay } },
  };

  const wordVariants: Variants = {
    hidden: { y: reduced ? 0 : "110%" },
    show: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  const triggerProps =
    trigger === "mount"
      ? { animate: "show" }
      : { whileInView: "show", viewport: { once: true, margin: "-80px" } };

  return (
    <motion.span className={className} initial="hidden" variants={containerVariants} {...triggerProps}>
      {segments.map((seg, si) => (
        <span key={si} className={seg.className}>
          {seg.text.split(" ").map((word, wi, words) => (
            // L'espace entre les mots est un nœud texte SIBLING du wrapper,
            // jamais à l'intérieur d'un `inline-block` : un espace en toute
            // fin de contenu d'un inline-block est rogné par les règles de
            // collapsing CSS (chaque mot fusionnerait avec le suivant).
            <Fragment key={wi}>
              <span className="inline-block overflow-hidden align-top pb-[0.1em]">
                <motion.span className="inline-block" variants={wordVariants}>
                  {word}
                </motion.span>
              </span>
              {wi < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
          {si < segments.length - 1 ? " " : ""}
        </span>
      ))}
    </motion.span>
  );
}
