import type { Project } from "@/types";

/**
 * Portfolio — chaque entrée correspond à un projet réellement conçu.
 *
 * `status` reste "concept" tant qu'un projet n'est pas confirmé comme
 * client payant en ligne (voir brief : ne jamais inventer de résultat
 * commercial). À repasser en "client" au cas par cas une fois confirmé.
 *
 * `palette` reprend fidèlement les tokens CSS réels de chaque projet — elle
 * sert de fallback aux mockups pour un projet qui n'a pas encore de vraie
 * capture d'écran (voir components/mockups). Dès qu'un projet a un
 * `screenshots`, BrowserFrame/PhoneFrame affichent la vraie capture à la
 * place de l'aperçu simulé — la structure de la carte ne change pas.
 *
 * Pour ajouter un projet : ajouter une entrée ici, rien d'autre à toucher.
 */
export const projects: Project[] = [
  {
    slug: "le-plombier-istreen",
    name: "Le Plombier Istréen",
    metier: "Plombier",
    ville: "Istres",
    status: "concept",
    summary: "Un artisan plombier local, une présence en ligne enfin à la hauteur de son métier.",
    objectif:
      "Donner à un plombier indépendant un site clair, rassurant et pensé pour générer des appels — recherche de fuite, dépannage, installation sanitaire.",
    probleme:
      "Comme beaucoup d'artisans indépendants, l'activité reposait uniquement sur le bouche-à-oreille et une fiche Google. Aucune vitrine en ligne pour rassurer un prospect avant qu'il décroche le téléphone.",
    approche:
      "Un site one-page pensé mobile en premier : les services en tête, une zone d'intervention claire, et un accès immédiat au téléphone depuis n'importe quel écran.",
    design:
      "Une palette bleu marine profond et blanc, sobre et professionnelle — l'objectif était d'inspirer la confiance sans détourner l'attention du geste principal : appeler.",
    resultat:
      "Un site en ligne, structuré pour le référencement local sur Istres et les communes voisines, avec les données Schema.org d'un artisan local en place.",
    caracteristiques: [
      "Numéro de téléphone accessible en un geste",
      "Zone d'intervention détaillée",
      "Structure pensée pour le référencement local",
      "Site 100 % responsive",
    ],
    palette: {
      fond: { color: "#f6f8fa", label: "Brume claire" },
      fondSombre: { color: "#0b1b2b", label: "Encre marine" },
      accent: { color: "#0f4c81", label: "Bleu marine" },
    },
    typeStyle: "sans-bold",
    liveUrl: "https://le-plombier-istreen.vercel.app/",
    screenshots: {
      desktop: "/projects/le-plombier-istreen/desktop.webp",
      mobile: "/projects/le-plombier-istreen/mobile.webp",
      desktopWidth: 1400,
      desktopHeight: 620,
    },
  },
  {
    slug: "bk-plomberie",
    name: "BK+ Plomberie",
    metier: "Plomberie · Chauffage",
    ville: "Istres",
    status: "concept",
    summary: "Une équipe de quatre professionnels, un site aussi structuré que leur organisation.",
    objectif:
      "Valoriser une équipe établie et sa disponibilité 24h/24 avec un site orienté devis, capable de couvrir plusieurs services et plusieurs zones d'intervention.",
    probleme:
      "Une entreprise avec une vraie réputation locale (note de 5,0/5 sur Google) mais aucune vitrine capable de présenter l'étendue réelle de ses services : plomberie, chauffage, climatisation, traitement de l'eau.",
    approche:
      "Une hiérarchie claire par service, un formulaire de devis structuré, et une mise en avant de la note Google directement dans les sections clés.",
    design:
      "Palette « Bleu Pétrole / Ambre Signal » : un fond neutre et chaleureux, un bleu pétrole profond pour la structure, un ambre réservé exclusivement aux actions — jamais utilisé ailleurs, pour qu'il garde tout son pouvoir de signal.",
    resultat:
      "Un site multi-sections avec galerie de réalisations, formulaire de devis dédié et zones d'intervention détaillées, prêt pour la mise en ligne.",
    caracteristiques: [
      "Formulaire de devis détaillé",
      "Mise en avant de la note Google",
      "Galerie de réalisations",
      "Neuf zones d'intervention détaillées",
    ],
    palette: {
      fond: { color: "#f4f5f1", label: "Papier chaud" },
      fondSombre: { color: "#071820", label: "Pétrole profond" },
      accent: { color: "#c1560f", label: "Ambre signal" },
    },
    typeStyle: "serif",
    liveUrl: "https://bk-plomberie.vercel.app/",
    screenshots: {
      desktop: "/projects/bk-plomberie/desktop.webp",
      mobile: "/projects/bk-plomberie/mobile.webp",
      desktopWidth: 1400,
      desktopHeight: 716,
    },
  },
  {
    slug: "daiselec",
    name: "Daiselec",
    metier: "Électricien",
    ville: "Istres",
    status: "concept",
    summary: "Un électricien reconnu localement, un site construit sans une seule information inventée.",
    objectif:
      "Professionnaliser la présence en ligne d'un électricien avec des installations, mises aux normes et interventions de dépannage, en s'appuyant uniquement sur des informations vérifiées.",
    probleme:
      "Peu d'informations officielles disponibles au départ (pas de date de création confirmée, pas d'adresse postale précise) : le défi était de construire un site crédible sans jamais présenter une supposition comme un fait.",
    approche:
      "Chaque donnée affichée a été vérifiée ou volontairement omise plutôt qu'inventée — jusqu'à la formulation de l'ancienneté, présentée avec prudence plutôt qu'avec une date précise non confirmée.",
    design:
      "Une palette neutre et chaleureuse, un accent cuivré qui évoque le métier sans tomber dans le cliché, et un fond sombre réservé aux temps forts de la page.",
    resultat:
      "Un site honnête, structuré autour des prestations réellement attestées par les avis clients, prêt à évoluer dès que de nouvelles informations sont confirmées.",
    caracteristiques: [
      "Prise de contact accessible dès le premier écran",
      "Structure orientée dépannage et mise aux normes",
      "Note Google mise en avant",
      "Base solide pour un futur enrichissement",
    ],
    palette: {
      fond: { color: "#faf8f4", label: "Sable clair" },
      fondSombre: { color: "#14120f", label: "Noir chaud" },
      accent: { color: "#a9652f", label: "Cuivre" },
    },
    typeStyle: "sans-condensed",
    liveUrl: "https://daiselec.vercel.app/",
    screenshots: {
      desktop: "/projects/daiselec/desktop.webp",
      mobile: "/projects/daiselec/mobile.webp",
      desktopWidth: 1400,
      desktopHeight: 751,
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
