"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { pricingTiers } from "@/data/pricing";
import { contactEmailBody, contactEmailSubject } from "@/lib/contact-email";
import { cn } from "@/lib/utils";

// `+10%` sur la taille/l'espacement des champs par rapport à un input
// standard du site (voir ui/button.tsx `size: "default"` = h-12) : ce
// formulaire vit maintenant dans un grand panneau premium (voir
// app/contact/page.tsx) où des champs de gabarit courant se perdaient —
// "grosse carte, petits champs".
const inputClass =
  "w-full rounded-[11px] border border-line bg-paper px-5 py-3.5 text-base text-ink placeholder:text-ink-faint transition-all focus:border-clay-400 focus:outline-none focus:shadow-[0_0_0_3px_rgba(199,108,52,0.14)]";

const steps = ["Vous", "Votre activité", "Votre projet", "Derniers détails"];

const objectifs = [
  "Être trouvé sur Google",
  "Avoir plus d'appels et de devis",
  "Présenter mes réalisations",
  "Remplacer un site existant",
  "Je ne sais pas encore précisément",
];

const budgets = pricingTiers
  .map((t) => `${t.name} — à partir de ${t.fromPrice} €`)
  .concat("Je ne sais pas encore");

const delais = ["Dès que possible", "Dans le mois", "Dans les 3 mois", "Pas de délai précis"];

const sources = [
  "Recherche Google",
  "Réseaux sociaux",
  "Recommandation / bouche-à-oreille",
  "Autre",
];

type FormState = {
  nom: string;
  entreprise: string;
  telephone: string;
  email: string;
  metier: string;
  ville: string;
  zoneIntervention: string;
  siteActuel: string;
  objectif: string;
  budget: string;
  delai: string;
  googleBusiness: string;
  logo: string;
  photos: string;
  source: string;
  commentaires: string;
};

const emptyForm: FormState = {
  nom: "",
  entreprise: "",
  telephone: "",
  email: "",
  metier: "",
  ville: "",
  zoneIntervention: "",
  siteActuel: "",
  objectif: "",
  budget: "",
  delai: "",
  googleBusiness: "",
  logo: "",
  photos: "",
  source: "",
  commentaires: "",
};

/**
 * Formulaire de contact progressif (brief §16-17). Envoi en deux temps :
 * on tente d'abord `/api/contact` (voir cette route) pour un vrai envoi
 * silencieux ; si elle répond "not_configured" (pas de RESEND_API_KEY —
 * voir .env.example) ou échoue pour une autre raison, on retombe sur le
 * repli `mailto:` d'origine, qui fonctionne sans aucune configuration.
 * L'utilisateur n'a jamais à savoir lequel des deux chemins a été pris.
 */
export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedOffer = searchParams.get("offre");
  const preselectedTier = pricingTiers.find((t) => t.slug === preselectedOffer);

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent-api" | "sent-mailto">("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    budget: preselectedTier ? `${preselectedTier.name} — à partir de ${preselectedTier.fromPrice} €` : "",
  });

  function update<K extends keyof FormState>(field: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function goNext() {
    if (step === 0 && (!form.nom || (!form.telephone && !form.email))) {
      setError("Indiquez au moins votre nom et un moyen de vous recontacter (téléphone ou email).");
      return;
    }
    if (step === 1 && (!form.metier || !form.ville)) {
      setError("Indiquez votre métier et votre ville pour continuer.");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  function fallbackToMailto() {
    const subject = contactEmailSubject(form);
    const body = contactEmailBody(form);
    window.location.href = `mailto:${siteConfig.email.address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent-mailto");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { ok: boolean } = await res.json();
      if (res.ok && data.ok) {
        setStatus("sent-api");
      } else {
        fallbackToMailto();
      }
    } catch {
      fallbackToMailto();
    }
  }

  if (status === "sent-api" || status === "sent-mailto") {
    return (
      <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 text-center">
        <div className="grid size-12 place-items-center rounded-full bg-clay-50 text-clay-600">
          <CheckCircle2 className="size-6" strokeWidth={2} />
        </div>
        <div>
          {status === "sent-api" ? (
            <>
              <p className="font-semibold text-ink">Votre demande est bien partie</p>
              <p className="mt-1 max-w-sm text-sm text-ink-soft">
                Je vous réponds généralement sous 24 à 48h. En attendant, vous pouvez toujours m&apos;écrire
                directement à{" "}
                <a href={`mailto:${siteConfig.email.address}`} className="font-medium text-clay-600 hover:underline">
                  {siteConfig.email.address}
                </a>
                .
              </p>
            </>
          ) : (
            <>
              <p className="font-semibold text-ink">Votre client mail va s&apos;ouvrir</p>
              <p className="mt-1 max-w-sm text-sm text-ink-soft">
                Votre demande est pré-remplie — il ne reste plus qu&apos;à cliquer sur envoyer. Pas de messagerie
                configurée sur cet appareil ? Écrivez-moi directement à{" "}
                <a href={`mailto:${siteConfig.email.address}`} className="font-medium text-clay-600 hover:underline">
                  {siteConfig.email.address}
                </a>
                .
              </p>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setStep(0);
          }}
          className="text-sm font-medium text-clay-600 underline-offset-4 hover:underline"
        >
          Modifier ma demande
        </button>
      </div>
    );
  }

  // Entrée dans un champ (typiquement en validant un <select>) soumet
  // nativement le <form> — même sans bouton "submit" visible à l'écran, le
  // navigateur soumet quand même le formulaire dès qu'aucun autre geste ne
  // l'empêche. Sur une étape intermédiaire, ça envoyait la demande en
  // sautant directement les étapes suivantes au lieu de les afficher.
  // Interceptée ici pour avancer d'une étape à la place, tant qu'on n'est
  // pas sur la dernière (où Entrée doit continuer à soumettre normalement).
  function handleKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter" && step < steps.length - 1) {
      e.preventDefault();
      goNext();
    }
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="flex w-full flex-col gap-7">
      {/* Progression */}
      <div>
        <div className="flex items-center justify-between text-sm font-medium text-ink-faint">
          <span>
            Étape {step + 1} / {steps.length}
          </span>
          <span>{steps[step]}</span>
        </div>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-clay-600 transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Nom complet" required>
            <input type="text" required value={form.nom} onChange={update("nom")} placeholder="Jean Dupont" className={inputClass} />
          </Field>
          <Field label="Entreprise">
            <input
              type="text"
              value={form.entreprise}
              onChange={update("entreprise")}
              placeholder="Nom de votre entreprise"
              className={inputClass}
            />
          </Field>
          <Field label="Téléphone">
            <input
              type="tel"
              value={form.telephone}
              onChange={update("telephone")}
              placeholder="06 12 34 56 78"
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              value={form.email}
              onChange={update("email")}
              placeholder="vous@exemple.fr"
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Votre métier" required>
            <select value={form.metier} onChange={update("metier")} className={cn(inputClass, "appearance-none")}>
              <option value="">Sélectionnez votre métier</option>
              {siteConfig.metiers.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
              <option value="Autre">Autre</option>
            </select>
          </Field>
          <Field label="Ville" required>
            <input type="text" required value={form.ville} onChange={update("ville")} placeholder="Istres" className={inputClass} />
          </Field>
          <Field label="Zone d'intervention">
            <input
              type="text"
              value={form.zoneIntervention}
              onChange={update("zoneIntervention")}
              placeholder="Ex : Istres, Fos-sur-Mer, Martigues…"
              className={inputClass}
            />
          </Field>
          <Field label="Site actuel (si vous en avez un)">
            <input
              type="text"
              value={form.siteActuel}
              onChange={update("siteActuel")}
              placeholder="URL ou « aucun pour l'instant »"
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Objectif principal">
            <select value={form.objectif} onChange={update("objectif")} className={cn(inputClass, "appearance-none")}>
              <option value="">Sélectionnez un objectif</option>
              {objectifs.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Budget indicatif">
            <select value={form.budget} onChange={update("budget")} className={cn(inputClass, "appearance-none")}>
              <option value="">Sélectionnez une fourchette</option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Délai souhaité" className="sm:col-span-2">
            <select value={form.delai} onChange={update("delai")} className={cn(inputClass, "appearance-none")}>
              <option value="">Sélectionnez un délai</option>
              {delais.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </Field>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <RadioField label="Fiche Google Business ?" name="googleBusiness" value={form.googleBusiness} onChange={update("googleBusiness")} />
            <RadioField label="Logo disponible ?" name="logo" value={form.logo} onChange={update("logo")} />
            <RadioField label="Photos disponibles ?" name="photos" value={form.photos} onChange={update("photos")} />
          </div>
          <Field label="Comment nous avez-vous connus ?">
            <select value={form.source} onChange={update("source")} className={cn(inputClass, "appearance-none")}>
              <option value="">Sélectionnez une réponse</option>
              {sources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Un commentaire à ajouter ?">
            <textarea
              rows={4}
              value={form.commentaires}
              onChange={update("commentaires")}
              placeholder="Tout ce qui peut m'aider à comprendre votre projet…"
              className={cn(inputClass, "resize-none")}
            />
          </Field>
        </div>
      )}

      {error && <p className="text-sm font-medium text-clay-700">{error}</p>}

      <div className="flex items-center justify-between pt-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink"
          >
            <ArrowLeft className="size-4" strokeWidth={2.5} />
            Retour
          </button>
        ) : (
          <span />
        )}

        {step < steps.length - 1 ? (
          <button
            key="continue-btn"
            type="button"
            onClick={goNext}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-clay-600 px-7 text-base font-semibold text-white shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-clay)] active:translate-y-0"
          >
            Continuer
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </button>
        ) : (
          <button
            key="submit-btn"
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-md bg-clay-600 px-7 text-base font-semibold text-white shadow-[var(--shadow-sm)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-clay)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-60"
          >
            <Send className="size-4" strokeWidth={2.5} />
            {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
          </button>
        )}
      </div>

      {/* Réassurance discrète, visible à chaque étape — pas une case à
          cocher RGPD (aucun traitement tiers ici, voir api/contact/route.ts
          qui n'envoie qu'un email), juste la promesse simple demandée,
          reliée à la vraie page de politique de confidentialité. */}
      <p className="flex items-center gap-2 text-xs text-ink-faint">
        <Lock className="size-3.5 shrink-0" strokeWidth={2} />
        <span>
          Vos informations ne seront jamais partagées —{" "}
          <Link href="/politique-de-confidentialite" className="underline underline-offset-2 hover:text-ink-soft">
            politique de confidentialité
          </Link>
          .
        </span>
      </p>
    </form>
  );
}

function Field({
  label,
  required,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5 text-sm", className)}>
      <span className="font-medium text-ink">
        {label}
        {required && <span className="text-clay-600"> *</span>}
      </span>
      {children}
    </label>
  );
}

function RadioField({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const options = ["Oui", "Non", "Je ne sais pas"];
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-ink">{label}</span>
      <div className="flex flex-col gap-1.5">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 text-ink-soft">
            <input
              type="radio"
              name={name}
              value={opt}
              checked={value === opt}
              onChange={onChange}
              className="accent-[var(--color-clay-600)]"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
