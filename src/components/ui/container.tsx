import { cn } from "@/lib/utils";

/**
 * Largeur maximale unique du site (1240px) — toutes les sections
 * s'alignent sur ce même conteneur pour garder une grille cohérente.
 */
export function Container({
  className,
  children,
  as: Tag = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return <Tag className={cn("mx-auto w-full max-w-[1240px] px-6 sm:px-8 lg:px-10", className)}>{children}</Tag>;
}

/**
 * Override de largeur/marge utilisé UNIQUEMENT par le Hero (bloc de texte
 * + bandeau métiers) et par le Header sur la page d'accueil — un seul
 * endroit pour cette valeur, pour que le logo du header et le H1 du Hero
 * démarrent exactement à la même position horizontale plutôt que de
 * dériver chacun de son côté. Ne s'active qu'à partir de 1416px (voir
 * hero.tsx pour le détail du seuil) ; en dessous, tout le monde garde le
 * `Container` par défaut ci-dessus.
 *
 * Volontairement pas le nouveau défaut de `Container` : le reste du site
 * (Offres, Réalisations, À propos, etc.) garde sa grille à 1240px.
 */
export const wideContainer = "min-[1416px]:max-w-[1600px]! min-[1416px]:px-16!";
