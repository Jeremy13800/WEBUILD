"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Dévoile son contenu façon "rideau" (clip-path) plutôt qu'un simple fondu
 * — réservé à l'imagerie qui doit le plus impressionner (mockups du
 * portfolio). `direction` fait varier le sens du dévoilement pour suivre
 * la position de l'image dans une mise en page qui alterne gauche/droite.
 *
 * La détection de visibilité (`whileInView`) est posée sur un conteneur
 * externe SANS `clip-path`, jamais sur l'élément animé lui-même : constaté
 * en testant réellement le rendu (pas en le supposant) qu'un `clip-path`
 * initial à 100% posé directement sur l'élément observé empêche parfois le
 * déclenchement de `whileInView` une fois la grille repassée en une seule
 * colonne (mobile/tablette — la mise en page 2 colonnes du desktop n'est
 * pas touchée). Même mécanisme de propagation par `variants` que le
 * correctif appliqué à SplitText pour un piège de nature différente mais
 * de la même famille : ne jamais faire dépendre `whileInView` d'un élément
 * dont l'état "caché" altère sa propre détectabilité.
 */
export function ClipReveal({
  children,
  className,
  direction = "left",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right";
}) {
  const reduced = useReducedMotion();
  const hiddenClip = direction === "left" ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)";

  const variants: Variants = {
    hidden: { clipPath: reduced ? "inset(0%)" : hiddenClip },
    show: { clipPath: "inset(0%)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div className={cn(className)} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }}>
      <motion.div variants={variants}>{children}</motion.div>
    </motion.div>
  );
}
