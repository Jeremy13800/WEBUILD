import type { ProcessStep } from "@/types";

/**
 * Processus volontairement court et rassurant — un artisan ne doit jamais
 * avoir l'impression que le projet va être compliqué à gérer pour lui.
 */
export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Vous me présentez votre activité",
    description:
      "Un échange simple, par téléphone ou en direct : votre métier, vos services, votre zone d'intervention, vos objectifs. Pas de jargon, pas de questions techniques.",
  },
  {
    number: "02",
    title: "Je conçois votre site",
    description:
      "Je m'occupe du design, des textes et de la structure. Vous n'avez rien à rédiger ni à configurer : je vous tiens informé de l'avancée du projet.",
  },
  {
    number: "03",
    title: "Vous validez chaque étape",
    description:
      "Vous découvrez votre site avant sa mise en ligne et demandez les ajustements nécessaires. Rien n'est publié sans votre accord.",
  },
  {
    number: "04",
    title: "Votre site est mis en ligne",
    description:
      "Publication, nom de domaine et bonnes pratiques de référencement en place. Votre entreprise est visible, dès aujourd'hui.",
  },
];
