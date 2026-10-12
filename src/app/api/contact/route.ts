import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { contactEmailBody, contactEmailSubject, type ContactFormFields } from "@/lib/contact-email";
import { resolveContactRecipients } from "@/lib/contact-recipient";

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
 * Les logs ne contiennent jamais le contenu de la demande (données
 * personnelles) : seulement la raison technique ou le statut HTTP.
 *
 * Pas de SDK `resend` ajouté : leur API HTTP est un simple POST JSON, ce
 * qui évite une dépendance supplémentaire pour un unique endpoint.
 */

const REQUIRED_FIELDS = ["nom", "metier", "ville"] as const;

function isValidPayload(body: unknown): body is ContactFormFields {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  const hasRequired = REQUIRED_FIELDS.every((f) => typeof b[f] === "string" && b[f].trim().length > 0);
  const hasContact =
    (typeof b.telephone === "string" && b.telephone.trim()) || (typeof b.email === "string" && b.email.trim());
  return hasRequired && Boolean(hasContact);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipients = resolveContactRecipients(process.env.CONTACT_TO_EMAIL);
  if (!apiKey || !recipients.ok) {
    console.error(
      "Contact route misconfigured:",
      !apiKey ? "RESEND_API_KEY missing" : `CONTACT_TO_EMAIL ${recipients.ok ? "ok" : recipients.reason}`,
    );
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

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
        reply_to: body.email || undefined,
        subject: contactEmailSubject(body),
        text: contactEmailBody(body),
      }),
    });

    if (!res.ok) {
      // Statut seul : le corps de la réponse Resend peut reprendre des
      // éléments de la demande.
      console.error("Resend error: HTTP", res.status);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err instanceof Error ? err.name : "unknown");
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
