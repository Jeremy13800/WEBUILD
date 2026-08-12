"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * `template.tsx` (contrairement à `layout.tsx`) se remonte à chaque
 * navigation — Header/Footer restent stables (ils vivent dans layout.tsx),
 * seul le contenu de la page rejoue une entrée. Volontairement une simple
 * transition d'ENTRÉE (fondu + léger décalage), sans tenter d'animer la
 * sortie : l'App Router démonte l'ancienne page dès la navigation, sans
 * attendre la fin d'une animation de sortie — vouloir la simuler ajoute de
 * la complexité (et des bugs potentiels) pour un gain quasi invisible.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
