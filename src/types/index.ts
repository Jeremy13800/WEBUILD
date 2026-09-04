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
  /**
   * Courte phrase éditoriale affichée au-dessus de la grande capture du
   * site sur la page projet (case study) — adaptée à chaque projet, jamais
   * dupliquée telle quelle. Optionnel : n'est utilisé que par la nouvelle
   * mise en page case study (voir realisations/[slug]/page.tsx).
   */
  showcaseTitle?: string;
  /**
   * Vraies captures d'écran du site (desktop + mobile). Quand elles sont
   * présentes, BrowserFrame/PhoneFrame les affichent à la place de l'aperçu
   * simulé en CSS (qui reste le fallback tant qu'un projet n'a pas encore
   * de capture — voir components/mockups). Chemins vers /public.
   */
  screenshots?: {
    desktop: string;
    mobile: string;
    /**
     * Dimensions réelles du fichier desktop (px). Le cadre du mockup
     * adopte exactement ce ratio (voir BrowserFrame) — jamais de crop du
     * Hero, jamais de déformation : le ratio original est toujours
     * respecté, quel que soit le conteneur qui l'accueille.
     */
    desktopWidth: number;
    desktopHeight: number;
  };
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
