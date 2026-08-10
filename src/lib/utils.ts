import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne des classes Tailwind en résolvant les conflits (ex: px-2 + px-4).
 * Utilisé par tous les composants UI pour accepter un prop `className` sûr.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
