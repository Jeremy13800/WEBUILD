/**
 * Types partagés du contenu business (src/data/**). Centralisés ici pour
 * que data/ et components/ pointent vers la même définition.
 */

export type ProjectStatus = "concept" | "client";

export interface ProjectPaletteSwatch {
  /** Couleur CSS (hex/rgb) — reprise fidèlement de la charte réelle du projet. */
  color: string;
  /** Nom lisible de la couleur (ex: "Bleu Pétrole"). */
  label: string;
}

export interface Project {
  slug: string;
  name: string;
  metier: string;
  ville: string;
  /** Statut affiché honnêtement : "concept" tant qu'il ne s'agit pas d'un client confirmé. */
  status: ProjectStatus;
  /** Résumé une ligne pour les vignettes / cartes. */
  summary: string;
  objectif: string;
  probleme: string;
  approche: string;
  design: string;
  resultat: string;
  caracteristiques: string[];
  /** Palette réelle du projet, utilisée pour les mockups tant qu'il n'y a pas de captures d'écran. */
  palette: {
    fond: ProjectPaletteSwatch;
    fondSombre: ProjectPaletteSwatch;
    accent: ProjectPaletteSwatch;
  };
  /** Style de composition typographique du mockup (display) pour varier les aperçus. */
  typeStyle: "serif" | "sans-condensed" | "sans-bold";
  /** URL réelle si le site est en ligne et confirmé publiable ; sinon undefined. */
  liveUrl?: string;
}

export interface PricingFeature {
  label: string;
  included: boolean;
}

export interface PricingTier {
  slug: string;
  name: string;
  fromPrice: number;
  recommended?: boolean;
  description: string;
  features: PricingFeature[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  title: string;
  description: string;
  icon: "smartphone" | "search" | "zap" | "shield" | "phone" | "trophy" | "clock" | "sparkles";
}
