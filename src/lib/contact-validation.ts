import {
  budgetOptions,
  delaiOptions,
  metierOptions,
  objectifOptions,
  sourceOptions,
  yesNoOptions,
} from "@/data/contact-form";
import type { ContactFormFields } from "@/lib/contact-email";

/**
 * Validation du formulaire de contact — exécutée par la route API
 * (source de vérité, indépendante du navigateur) et réutilisée par le
 * formulaire pour prévenir l'utilisateur avant l'envoi.
 */

/** Taille maximale acceptée pour le corps JSON d'une demande (octets). */
export const MAX_BODY_BYTES = 16_000;

/** En dessous de ce délai (ms) entre l'affichage et l'envoi, ce n'est pas un humain qui a rempli 4 étapes. */
export const MIN_FILL_TIME_MS = 3_000;

/** Nom du champ piège (honeypot), invisible pour les visiteurs. */
export const HONEYPOT_FIELD = "website";

export type ContactField = keyof ContactFormFields;

type FieldRule = {
  label: string;
  max: number;
  min?: number;
  required?: boolean;
  multiline?: boolean;
  options?: readonly string[];
  format?: (value: string) => boolean;
};

const EMAIL_PATTERN = /^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[a-z]{2,}$/i;

export function isValidEmail(value: string) {
  return value.length <= 254 && EMAIL_PATTERN.test(value);
}

/** Chiffres, espaces, points, tirets, parenthèses et "+" initial ; 8 à 15 chiffres. */
export function isValidPhone(value: string) {
  if (!/^\+?[0-9 .()-]+$/.test(value)) return false;
  const digits = value.replace(/\D/g, "").length;
  return digits >= 8 && digits <= 15;
}

export const contactFieldRules: Record<ContactField, FieldRule> = {
  nom: { label: "Nom complet", min: 2, max: 100, required: true },
  entreprise: { label: "Entreprise", max: 120 },
  telephone: { label: "Téléphone", max: 30, format: isValidPhone },
  email: { label: "Email", max: 254, format: isValidEmail },
  metier: { label: "Votre métier", max: 60, required: true, options: metierOptions },
  ville: { label: "Ville", min: 2, max: 100, required: true },
  zoneIntervention: { label: "Zone d'intervention", max: 200 },
  siteActuel: { label: "Site actuel", max: 200 },
  objectif: { label: "Objectif principal", max: 100, options: objectifOptions },
  budget: { label: "Budget indicatif", max: 100, options: budgetOptions },
  delai: { label: "Délai souhaité", max: 60, options: delaiOptions },
  googleBusiness: { label: "Fiche Google Business", max: 20, options: yesNoOptions },
  logo: { label: "Logo disponible", max: 20, options: yesNoOptions },
  photos: { label: "Photos disponibles", max: 20, options: yesNoOptions },
  source: { label: "Comment nous avez-vous connus", max: 60, options: sourceOptions },
  commentaires: { label: "Commentaire", max: 3000, multiline: true },
};

const contactFields = Object.keys(contactFieldRules) as ContactField[];

// Caractères de contrôle interdits partout ; retours à la ligne et
// tabulations tolérés uniquement dans les champs multilignes.
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const LINE_BREAKS = /[\r\n\t]/;

/** Erreur d'un champ déjà normalisé (trim), ou `null` s'il est valide. Une valeur vide n'est jamais en erreur ici. */
export function fieldError(field: ContactField, value: string): string | null {
  if (!value) return null;
  const rule = contactFieldRules[field];
  if (value.length > rule.max) return `${rule.label} : ${rule.max} caractères maximum.`;
  if (rule.min && value.length < rule.min) return `${rule.label} : ${rule.min} caractères minimum.`;
  if (CONTROL_CHARS.test(value) || (!rule.multiline && LINE_BREAKS.test(value))) {
    return `${rule.label} : caractères non autorisés.`;
  }
  if (rule.options && !rule.options.includes(value)) return `${rule.label} : choix non reconnu.`;
  if (rule.format && !rule.format(value)) return `${rule.label} : format invalide.`;
  return null;
}

export type ContactValidation =
  | { ok: true; data: ContactFormFields; honeypotFilled: boolean; elapsedMs: number }
  | { ok: false; error: "invalid_body" }
  | { ok: false; error: "invalid_fields"; fields: ContactField[] };

/**
 * Valide un corps de requête déjà parsé. Refuse les clés inconnues, les
 * types autres que chaîne, les valeurs hors liste, trop longues ou mal
 * formées. Les champs absents valent "".
 */
export function validateContactPayload(raw: unknown): ContactValidation {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return { ok: false, error: "invalid_body" };
  const body = raw as Record<string, unknown>;

  const allowedKeys = new Set<string>([...contactFields, HONEYPOT_FIELD, "elapsedMs"]);
  if (Object.keys(body).some((key) => !allowedKeys.has(key))) return { ok: false, error: "invalid_body" };

  const honeypot = body[HONEYPOT_FIELD];
  if (honeypot !== undefined && typeof honeypot !== "string") return { ok: false, error: "invalid_body" };
  const elapsedMs = body.elapsedMs;
  if (typeof elapsedMs !== "number" || !Number.isFinite(elapsedMs) || elapsedMs < 0) {
    return { ok: false, error: "invalid_body" };
  }

  const data = {} as ContactFormFields;
  const invalid: ContactField[] = [];

  for (const field of contactFields) {
    const value = body[field] ?? "";
    if (typeof value !== "string") return { ok: false, error: "invalid_body" };
    const trimmed = value.trim();
    data[field] = trimmed;
    if ((contactFieldRules[field].required && !trimmed) || fieldError(field, trimmed)) invalid.push(field);
  }

  if (!data.telephone && !data.email) invalid.push("telephone", "email");

  if (invalid.length > 0) return { ok: false, error: "invalid_fields", fields: [...new Set(invalid)] };
  return { ok: true, data, honeypotFilled: Boolean(honeypot?.trim()), elapsedMs };
}
