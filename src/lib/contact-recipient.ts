/**
 * Garde-fou sur les adresses email de contact — utilisé côté serveur par la
 * route API (destinataire des demandes) et côté affichage par les liens
 * email publics.
 *
 * `webuild.fr` appartient à une entreprise tierce (concurrente, domaine
 * enregistré depuis 2017 avec une messagerie active) : aucune donnée de
 * prospect ne doit jamais y partir, même si une ancienne variable
 * d'environnement la référence encore.
 */
export const BLOCKED_EMAIL_DOMAINS = ["webuild.fr"] as const;

const EMAIL_PATTERN = /^[^\s@<>,]+@[^\s@<>,]+\.[^\s@<>,]+$/;

/** Vrai si l'adresse appartient à un domaine bloqué (ou à l'un de ses sous-domaines). */
export function isBlockedEmailAddress(address: string): boolean {
  const domain = address
    .slice(address.lastIndexOf("@") + 1)
    .trim()
    .toLowerCase()
    .replace(/\.$/, "");
  return BLOCKED_EMAIL_DOMAINS.some((blocked) => domain === blocked || domain.endsWith(`.${blocked}`));
}

export type ContactRecipientCheck =
  | { ok: true; to: string[] }
  | { ok: false; reason: "missing" | "invalid" | "blocked_domain" };

/**
 * Valide la valeur brute de `CONTACT_TO_EMAIL` (une adresse, ou plusieurs
 * séparées par des virgules, éventuellement au format `Nom <adresse>`).
 * Une seule adresse invalide ou bloquée suffit à refuser l'ensemble.
 */
export function resolveContactRecipients(raw: string | undefined): ContactRecipientCheck {
  if (!raw || !raw.trim()) return { ok: false, reason: "missing" };

  const entries = raw
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  if (entries.length === 0) return { ok: false, reason: "missing" };

  for (const entry of entries) {
    const address = (entry.match(/<([^>]+)>\s*$/)?.[1] ?? entry).trim();
    if (!EMAIL_PATTERN.test(address)) return { ok: false, reason: "invalid" };
    if (isBlockedEmailAddress(address)) return { ok: false, reason: "blocked_domain" };
  }

  return { ok: true, to: entries };
}
