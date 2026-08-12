import { cn } from "@/lib/utils";

/**
 * Repères de "plan d'architecte" — un clin d'œil direct à l'identité
 * bâtisseur plutôt qu'un effet générique. Purement décoratif
 * (`aria-hidden`), traits fins argile à faible opacité : de la texture,
 * jamais un élément qui rivalise avec le contenu.
 *
 * `preserveAspectRatio="none"` est sûr ici : tous les traits sont
 * strictement horizontaux ou verticaux, une mise à l'échelle non uniforme
 * ne les fait donc jamais dévier de l'angle droit — seule leur longueur
 * relative varie légèrement, imperceptible pour des repères aussi courts.
 *
 * Se dessine une fois au montage via `stroke-dashoffset` (classe
 * `.blueprint-draw`, définie dans globals.css) : pur CSS, pas de JS, et
 * neutralisé comme toute animation du site par `prefers-reduced-motion`.
 */
export function BlueprintMarks({ className }: { className?: string }) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 hidden sm:block", className)}
      viewBox="0 0 1200 600"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path className="blueprint-draw" style={{ animationDelay: "0.15s" }} d="M40 100 L40 40 L100 40" />
      <path className="blueprint-draw" style={{ animationDelay: "0.3s" }} d="M1100 40 L1160 40 L1160 100" />
      <path className="blueprint-draw" style={{ animationDelay: "0.45s" }} d="M1160 500 L1160 560 L1100 560" />
      <path className="blueprint-draw" style={{ animationDelay: "0.6s" }} d="M100 560 L40 560 L40 500" />
    </svg>
  );
}
