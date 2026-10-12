import { siteConfig } from "@/data/site";
import { pricingTiers } from "@/data/pricing";

/**
 * Choix proposés par le formulaire de contact — source unique partagée
 * entre l'affichage (components/sections/contact-form.tsx) et la
 * validation serveur (lib/contact-validation.ts), qui refuse toute valeur
 * absente de ces listes.
 */

export const metierOptions: readonly string[] = [...siteConfig.metiers, "Autre"];

export const objectifOptions = [
  "Être trouvé sur Google",
  "Avoir plus d'appels et de devis",
  "Présenter mes réalisations",
  "Remplacer un site existant",
  "Je ne sais pas encore précisément",
];

export function budgetLabel(tier: { name: string; fromPrice: number }) {
  return `${tier.name} — à partir de ${tier.fromPrice} €`;
}

export const budgetOptions = pricingTiers.map(budgetLabel).concat("Je ne sais pas encore");

export const delaiOptions = ["Dès que possible", "Dans le mois", "Dans les 3 mois", "Pas de délai précis"];

export const sourceOptions = ["Recherche Google", "Réseaux sociaux", "Recommandation / bouche-à-oreille", "Autre"];

export const yesNoOptions = ["Oui", "Non", "Je ne sais pas"];
