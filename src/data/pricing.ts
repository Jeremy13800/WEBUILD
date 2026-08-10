import type { PricingTier } from "@/types";

/**
 * Grille tarifaire — modifiable ici uniquement. Les prix affichés partout
 * sur le site (accueil, /offres, FAQ) viennent de ce fichier.
 *
 * Prix de base fournis à titre indicatif par le brief, à ajuster librement.
 */

export const pricingTiers: PricingTier[] = [
  {
    slug: "essentiel",
    name: "Essentiel",
    fromPrice: 690,
    description:
      "Un site professionnel pour présenter clairement votre activité et être trouvé par vos clients.",
    features: [
      { label: "Site one-page ou multi-pages simple", included: true },
      { label: "Présentation de votre activité et vos services", included: true },
      { label: "Design sur mesure adapté à votre métier", included: true },
      { label: "Parfaitement lisible sur mobile", included: true },
      { label: "Formulaire de contact", included: true },
      { label: "Mise en ligne incluse", included: true },
      { label: "Galerie de réalisations", included: false },
      { label: "Structure pensée pour le référencement local", included: false },
    ],
  },
  {
    slug: "business",
    name: "Business",
    fromPrice: 990,
    recommended: true,
    description:
      "L'offre la plus choisie : un site complet orienté visibilité et prise de contact.",
    features: [
      { label: "Tout ce qui est inclus dans Essentiel", included: true },
      { label: "Site multi-pages complet", included: true },
      { label: "Galerie de réalisations mise en valeur", included: true },
      { label: "Structure pensée pour le référencement local", included: true },
      { label: "Formulaire de devis détaillé", included: true },
      { label: "Zone d'intervention et avis Google mis en avant", included: true },
      { label: "Accompagnement à la mise en ligne", included: true },
      { label: "Pages dédiées par service", included: false },
    ],
  },
  {
    slug: "premium",
    name: "Premium",
    fromPrice: 1490,
    description:
      "Pour les entreprises qui veulent une présence digitale complète et la meilleure conversion possible.",
    features: [
      { label: "Tout ce qui est inclus dans Business", included: true },
      { label: "Pages dédiées par service ou par ville", included: true },
      { label: "Animations et micro-interactions soignées", included: true },
      { label: "Optimisations de conversion avancées", included: true },
      { label: "Accompagnement stratégique sur votre présence en ligne", included: true },
      { label: "Priorité sur les évolutions futures", included: true },
      { label: "Support renforcé au lancement", included: true },
      { label: "Intégration paiement / prise de rendez-vous en ligne", included: true },
    ],
  },
];

export const maintenancePlan = {
  name: "Maintenance & accompagnement",
  fromPrice: 39,
  period: "mois",
  description:
    "Hébergement, nom de domaine, mises à jour de contenu et disponibilité assurée — pour ne plus jamais avoir à vous soucier de votre site.",
  features: [
    "Hébergement et nom de domaine gérés pour vous",
    "Modifications de texte et de photos incluses",
    "Surveillance et mises à jour techniques",
    "Support par email prioritaire",
  ],
};
