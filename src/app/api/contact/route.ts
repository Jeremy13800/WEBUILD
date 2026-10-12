import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { contactEmailBody, contactEmailSubject } from "@/lib/contact-email";
import { resolveContactRecipients } from "@/lib/contact-recipient";
import { MAX_BODY_BYTES, MIN_FILL_TIME_MS, validateContactPayload } from "@/lib/contact-validation";

/**
 * Point de chute du formulaire de contact (voir aussi
 * components/sections/contact-form.tsx).
 *
 * Le destinataire vient UNIQUEMENT de `CONTACT_TO_EMAIL` (variable serveur,
 * jamais exposée au navigateur) : aucune adresse par défaut dans le code.
 * Si elle est absente, invalide ou sur un domaine bloqué (voir
 * lib/contact-recipient.ts), ou si `RESEND_API_KEY` manque, la route
 * refuse avec 503 `not_configured` AVANT même de lire la demande — aucune
 * donnée n'est envoyée nulle part, et le formulaire affiche une erreur.
 *
 * Ensuite, dans l'ordre : type de contenu, taille du corps, JSON, validation
 * stricte de chaque champ (lib/contact-validation.ts), champ piège
 * (honeypot) et délai minimal de remplissage — avant tout appel à Resend.
 *
 * Les logs ne contiennent jamais le contenu de la demande (données
 * personnelles) : seulement la raison technique ou le statut HTTP.
 *
 * Pas de SDK `resend` ajouté : leur API HTTP est un simple POST JSON, ce
 * qui évite une dépendance supplémentaire pour un unique endpoint.
 */

function reject(status: number, error: string, extra?: Record<string, unknown>) {
  return NextResponse.json({ ok: false, error, ...extra }, { status });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = resolveContactRecipients(process.env.CONTACT_TO_EMAIL);
  if (!apiKey || !recipients.ok) {
    console.error(
      "Contact route misconfigured:",
      !apiKey ? "RESEND_API_KEY missing" : `CONTACT_TO_EMAIL ${recipients.ok ? "ok" : recipients.reason}`,
    );
    return reject(503, "not_configured");
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reject(415, "invalid_body");
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (declaredLength > MAX_BODY_BYTES) return reject(413, "payload_too_large");

  let body: unknown;
  try {
    const text = await request.text();
    if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return reject(413, "payload_too_large");
    body = JSON.parse(text);
  } catch {
    return reject(400, "invalid_body");
  }

  const result = validateContactPayload(body);
  if (!result.ok) {
    return result.error === "invalid_fields"
      ? reject(422, "invalid_fields", { fields: result.fields })
      : reject(400, "invalid_body");
  }

  // Champ piège rempli : un robot. Réponse identique à un succès pour ne
  // pas lui indiquer qu'il a été détecté — rien n'est envoyé.
  if (result.honeypotFilled) {
    console.warn("Contact route: honeypot triggered");
    return NextResponse.json({ ok: true });
  }

  // Envoi plus rapide qu'un humain ne peut remplir 4 étapes : refus
  // explicite (un humain qui réessaie passera, le délai ayant augmenté).
  if (result.elapsedMs < MIN_FILL_TIME_MS) {
    console.warn("Contact route: submitted too fast");
    return reject(429, "too_fast");
  }

  const form = result.data;
  const from = process.env.CONTACT_FROM_EMAIL || `${siteConfig.name} <onboarding@resend.dev>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipients.to,
        reply_to: form.email || undefined,
        subject: contactEmailSubject(form),
        text: contactEmailBody(form),
      }),
    });

    if (!res.ok) {
      // Statut seul : le corps de la réponse Resend peut reprendre des
      // éléments de la demande.
      console.error("Resend error: HTTP", res.status);
      return reject(502, "send_failed");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err instanceof Error ? err.name : "unknown");
    return reject(502, "send_failed");
  }
}
