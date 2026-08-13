import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";
import { contactEmailBody, contactEmailSubject, type ContactFormFields } from "@/lib/contact-email";

/**
 * Point de chute du formulaire de contact (brief §16-17, voir aussi
 * components/sections/contact-form.tsx).
 *
 * Tant que `RESEND_API_KEY` n'est pas configurée (voir .env.example), cette
 * route répond volontairement 503 `not_configured` : le formulaire bascule
 * alors sur son repli `mailto:` existant, qui fonctionne dès aujourd'hui
 * sans aucune configuration. Une fois la clé ajoutée, l'envoi se fait
 * silencieusement en arrière-plan et l'utilisateur n'a plus besoin d'un
 * client mail configuré sur son appareil pour que la demande parte.
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
  if (!apiKey) {
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

  const to = process.env.CONTACT_TO_EMAIL || siteConfig.email.address;
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
        to,
        reply_to: body.email || undefined,
        subject: contactEmailSubject(body),
        text: contactEmailBody(body),
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("Resend error:", res.status, detail);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
