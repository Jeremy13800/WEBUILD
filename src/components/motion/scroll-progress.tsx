"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Fine ligne d'avancement de lecture, collée au sommet du header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.2 });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-51 h-[2px] origin-left bg-clay-500"
      style={{ scaleX }}
    />
  );
}
