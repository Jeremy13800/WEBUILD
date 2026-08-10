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
