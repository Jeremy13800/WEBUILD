/**
 * Source unique de vérité pour l'identité, les coordonnées et la
 * navigation de WeBuild. Toute donnée affichée sur le site (header, footer,
 * metadata, JSON-LD, formulaires) doit venir d'ici — jamais codée en dur
 * dans un composant.
 *
 * Aucune preuve sociale n'est inventée (pas de faux nombre de clients, pas
 * de faux avis) : voir data/projects.ts pour la seule vraie preuve — le
 * portfolio.
 */

export const siteConfig = {
  name: "WeBuild",
  legalName: "WeBuild",
  tagline: "Des sites web pensés pour les artisans.",
  positioning:
    "Création de sites internet sur mesure pour les artisans et entreprises du bâtiment.",

  // TODO(client) : nom de domaine définitif — placeholder tant qu'aucun
  // domaine n'est réellement possédé/réservé.
  url: "https://webuild.fr",

  description:
    "WeBuild conçoit des sites internet modernes et professionnels pour les artisans du bâtiment : plombiers, électriciens, chauffagistes, couvreurs, menuisiers, paysagistes… Un site qui inspire confiance, se trouve sur Google et transforme vos visiteurs en appels.",

  email: {
    // TODO(client) : adresse email définitive à confirmer avant mise en ligne —
    // c'est ici qu'atterrissent les demandes du formulaire de contact.
    address: "bonjour@webuild.fr",
  },

  // TODO(client) : numéro de téléphone à renseigner si un contact
  // téléphonique direct doit être proposé sur le site.
  phone: {
    display: "",
    href: "",
  },

  address: {
    city: "Istres",
    region: "Bouches-du-Rhône",
    // TODO(client) : adresse postale complète, si nécessaire pour les
    // mentions légales ou un encart local.
  },

  social: {
    // TODO(client) : liens réels vers les réseaux/profils pros une fois créés.
    linkedin: "",
    instagram: "",
  },

  serviceArea: [
    "Istres",
    "Fos-sur-Mer",
    "Martigues",
    "Salon-de-Provence",
    "Aix-en-Provence",
    "Marseille",
    "Bouches-du-Rhône",
  ],

  metiers: [
    "Plombiers",
    "Électriciens",
    "Chauffagistes",
    "Climaticiens",
    "Couvreurs",
    "Peintres",
    "Menuisiers",
    "Maçons",
    "Paysagistes",
    "Garages",
    "Entreprises du bâtiment",
  ],

  nav: [
    { label: "Réalisations", href: "/realisations" },
    { label: "Offres", href: "/offres" },
    { label: "À propos", href: "/a-propos" },
    { label: "FAQ", href: "/#faq" },
  ],

  ctaPrimary: { label: "Découvrir mes réalisations", href: "/realisations" },
  ctaSecondary: { label: "Parler de mon projet", href: "/contact" },

  footerNav: {
    site: [
      { label: "Réalisations", href: "/realisations" },
      { label: "Offres & tarifs", href: "/offres" },
      { label: "À propos", href: "/a-propos" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;
