"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Dévoile son contenu façon "rideau" (clip-path) plutôt qu'un simple fondu
 * — réservé à l'imagerie qui doit le plus impressionner (mockups du
 * portfolio). `direction` fait varier le sens du dévoilement pour suivre
 * la position de l'image dans une mise en page qui alterne gauche/droite.
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

  return (
    <motion.div
      className={cn(className)}
      initial={reduced ? undefined : { clipPath: hiddenClip }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
