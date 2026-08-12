"use client";

import { useState, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * Étiquette flottante qui suit le curseur au survol — réservée au
 * portfolio, la section qui doit le plus donner envie de cliquer.
 * Desktop uniquement (le survol n'a pas de sens au tactile).
 */
export function HoverTag({ children, label }: { children: React.ReactNode; label: string }) {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onMouseMove={onMove}
    >
      {children}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 z-40 hidden items-center gap-1.5 rounded-full bg-ink-950 py-2.5 pr-3 pl-4 text-xs font-semibold whitespace-nowrap text-white shadow-[var(--shadow-lg)] lg:flex"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-130%" }}
        animate={{ opacity: hovering ? 1 : 0, scale: hovering ? 1 : 0.85 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {label}
        <ArrowUpRight className="size-3.5 text-clay-400" strokeWidth={2.5} />
      </motion.div>
    </div>
  );
}
