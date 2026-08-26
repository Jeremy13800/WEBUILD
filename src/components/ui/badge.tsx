import { cn } from "@/lib/utils";

/** Petit repère typographique (kicker/eyebrow) placé au-dessus d'un titre de section. */
export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        // `flex-wrap` : sur les très petits écrans, un kicker long (cas du
        // Hero) ne doit pas forcer sa ligne à déborder du viewport — il
        // doit pouvoir repasser sur deux lignes comme n'importe quel texte.
        "inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-[0.16em] text-clay-600 uppercase",
        className,
      )}
    >
      <span className="h-px w-6 bg-clay-600" aria-hidden />
      {children}
    </span>
  );
}

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line-strong bg-card px-3 py-1 text-xs font-medium text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}
