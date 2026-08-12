"use client";

import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Fait légèrement "coller" son enfant au curseur quand la souris passe à
 * proximité — réservé aux CTA principaux (Hero, CTA final) pour ne pas
 * diluer l'effet. Désactivé si `prefers-reduced-motion`.
 */
export function Magnetic({ children, strength = 16 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 14, mass: 0.4 });

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(((e.clientX - (rect.left + rect.width / 2)) / rect.width) * strength);
    y.set(((e.clientY - (rect.top + rect.height / 2)) / rect.height) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
