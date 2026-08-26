import { Home } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Pastille de marque — hexagone argile avec un pictogramme de toit, ajoutée
 * dans le header (donc visible sur tout le site, pas seulement le Hero)
 * suite à une référence visuelle fournie par le client.
 *
 * Construite en CSS pur (`clip-path`) plutôt qu'en SVG dessiné à la main :
 * reproduire l'hexagone exact d'une capture d'écran au pixel près n'est ni
 * possible ni utile — l'esprit (badge argile + pictogramme bâtiment) l'est.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn("grid size-9 shrink-0 place-items-center bg-clay-600 text-white", className)}
      style={{ clipPath: "polygon(25% 3%, 75% 3%, 100% 50%, 75% 97%, 25% 97%, 0% 50%)" }}
      aria-hidden
    >
      <Home className="size-4" strokeWidth={2.25} />
    </span>
  );
}
