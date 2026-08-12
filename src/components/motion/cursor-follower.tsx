"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Curseur personnalisé (point + anneau) qui réagit au survol des liens,
 * boutons et éléments marqués `data-cursor-hover`. Le curseur natif du
 * système reste la valeur par défaut : on ne bascule en `cursor: none`
 * (voir globals.css `.has-custom-cursor`) qu'une fois ce composant monté
 * et confirmé compatible (pointer fin, survol possible, pas de réduction
 * de mouvement) — si le JS ne charge jamais, l'utilisateur garde un
 * curseur natif fonctionnel, jamais un curseur invisible.
 */
export function CursorFollower() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { damping: 28, stiffness: 320, mass: 0.4 });
  const ringY = useSpring(y, { damping: 28, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "a, button, summary, [data-cursor-hover]",
      );
      setHovering(!!target);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-100 size-1.5 rounded-full bg-clay-400 mix-blend-difference"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-100 rounded-full border border-clay-400/70 mix-blend-difference"
        animate={{ width: hovering ? 52 : 26, height: hovering ? 52 : 26, opacity: hovering ? 1 : 0.55 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
