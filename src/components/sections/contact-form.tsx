"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Send } from "lucide-react";
import { pricingTiers } from "@/data/pricing";
import {
  budgetLabel,
  budgetOptions,
  delaiOptions,
  metierOptions,
  objectifOptions,
  sourceOptions,
  yesNoOptions,
} from "@/data/contact-form";
import {
  HONEYPOT_FIELD,
  contactFieldRules,
  fieldError,
  type ContactField,
} from "@/lib/contact-validation";
import { cn } from "@/lib/utils";

// `+10%` sur la taille/l'espacement des champs par rapport à un input
// standard du site (voir ui/button.tsx `size: "default"` = h-12) : ce
// formulaire vit maintenant dans un grand panneau premium (voir
// app/contact/page.tsx) où des champs de gabarit courant se perdaient —
// "grosse carte, petits champs".
const inputClass =
  "w-full rounded-[11px] border border-line bg-paper px-5 py-3.5 text-base text-ink placeholder:text-ink-faint transition-all focus:border-clay-400 focus:outline-none focus:shadow-[0_0_0_3px_rgba(199,108,52,0.14)]";

const steps = ["Vous", "Votre activité", "Votre projet", "Derniers détails"];

/** Étape où se trouve chaque champ — pour y ramener l'utilisateur en cas d'erreur. */
const fieldsByStep: ContactField[][] = [
  ["nom", "entreprise", "telephone", "email"],
  ["metier", "ville", "zoneIntervention", "siteActuel"],
  ["objectif", "budget", "delai"],
  ["googleBusiness", "logo", "photos", "source", "commentaires"],
];
const stepOf = (field: ContactField) => fieldsByStep.findIndex((fields) => fields.includes(field));

/** Première erreur des champs donnés (déjà saisis), ou "". */
function firstFieldError(form: Record<ContactField, string>, fields: ContactField[]) {
  for (const field of fields) {
    const message = fieldError(field, form[field].trim());
    if (message) return message;
  }
  return "";
}

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

/** Messages affichés selon le code d'erreur renvoyé par `/api/contact`. */
const submitErrors = {
  not_configured:
    "Le formulaire est temporairement indisponible : votre demande n'a pas été envoyée. Vos informations sont conservées, vous pourrez réessayer un peu plus tard.",
  too_fast:
    "Votre demande n'a pas été envoyée : merci de patienter quelques secondes, puis de cliquer à nouveau sur « Envoyer ma demande ».",
  rate_limited:
    "Votre demande n'a pas été envoyée : trop de tentatives depuis votre connexion. Vos informations sont conservées, réessayez dans une dizaine de minutes.",
  payload_too_large:
    "Votre demande n'a pas été envoyée : elle est trop longue. Raccourcissez votre commentaire, puis réessayez.",
  default:
    "L'envoi a échoué : votre demande n'a pas été transmise. Vos informations sont conservées, vous pouvez réessayer.",
};

/**
 * Formulaire de contact progressif (brief §16-17), envoyé uniquement via
 * `/api/contact`. Le succès n'est affiché QUE sur une réponse `{ ok: true }`
 * du serveur — jamais de repli `mailto:` ni de fausse confirmation : en cas
 * d'échec, la saisie est conservée, un message d'erreur s'affiche et le
 * bouton d'envoi reste disponible pour réessayer.
 */
export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedOffer = searchParams.get("offre");
  const preselectedTier = pricingTiers.find((t) => t.slug === preselectedOffer);

  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    budget: preselectedTier ? budgetLabel(preselectedTier) : "",
  });
  // Champ piège (honeypot) : invisible et hors tabulation, seul un robot
  // qui remplit tous les champs du HTML y écrit quelque chose.
  const [honeypot, setHoneypot] = useState("");
  // Moment d'affichage du formulaire, pour le délai minimal de remplissage
  // contrôlé côté serveur ; verrou synchrone contre le double envoi (un
  // second clic/Entrée peut arriver avant que `status` ne soit re-rendu).
  const startedAt = useRef(0);
  const submitting = useRef(false);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function update<K extends keyof FormState>(field: K) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function goNext() {
    if (step === 0 && (!form.nom.trim() || (!form.telephone.trim() && !form.email.trim()))) {
      setError("Indiquez au moins votre nom et un moyen de vous recontacter (téléphone ou email).");
      return;
    }
    if (step === 1 && (!form.metier || !form.ville.trim())) {
      setError("Indiquez votre métier et votre ville pour continuer.");
      return;
    }
    const stepError = firstFieldError(form, fieldsByStep[step]);
    if (stepError) {
      setError(stepError);
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, steps.length - 1));
  }

  function goBack() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  /** Affiche l'erreur et ramène à l'étape du premier champ concerné. */
  function showFieldErrors(fields: ContactField[]) {
    const first = fields[0];
    const message = first ? fieldError(first, form[first].trim()) : null;
    const labels = fields.map((f) => contactFieldRules[f].label).join(", ");
    setError(`Votre demande n'a pas été envoyée. ${message ?? `Vérifiez : ${labels}.`}`);
    if (first) setStep(stepOf(first));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting.current) return;

    const invalid = (Object.keys(contactFieldRules) as ContactField[]).filter((f) => fieldError(f, form[f].trim()));
    if (invalid.length > 0) {
      showFieldErrors(invalid);
      return;
    }

    submitting.current = true;
    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, [HONEYPOT_FIELD]: honeypot, elapsedMs: Date.now() - startedAt.current }),
      });
      const data: { ok?: unknown; error?: unknown; fields?: unknown } | null = await res.json().catch(() => null);
      if (res.ok && data?.ok === true) {
        setStatus("sent");
        return;
      }
      const code = data?.error;
      if (code === "invalid_fields" && Array.isArray(data?.fields)) {
        showFieldErrors(data.fields.filter((f): f is ContactField => typeof f === "string" && f in contactFieldRules));
      } else if (code === "not_configured" || code === "too_fast" || code === "payload_too_large") {
        setError(submitErrors[code]);
      } else if (res.status === 429) {
        // Limite du pare-feu Vercel (règle "Contact Form Rate Limit") :
        // réponse qui ne vient pas de la route, souvent non JSON.
        setError(submitErrors.rate_limited);
      } else {
        setError(submitErrors.default);
      }
    } catch {
      setError(submitErrors.default);
    } finally {
      submitting.current = false;
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 text-center">
        <div className="grid size-12 place-items-center rounded-full bg-clay-50 text-clay-600">
          <CheckCircle2 className="size-6" strokeWidth={2} />
        </div>
        <div>
          <p className="font-semibold text-ink">Votre demande est bien partie</p>
          <p className="mt-1 max-w-sm text-sm text-ink-soft">Je vous réponds généralement sous 24 à 48h.</p>
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
      {/* Champ piège : hors écran (pas `display:none`, que certains robots
          savent ignorer), retiré de la tabulation et des lecteurs d'écran. */}
      <div aria-hidden style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Ne pas remplir ce champ
          <input
            type="text"
            name={HONEYPOT_FIELD}
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>
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
            <input
              type="text"
              required
              maxLength={contactFieldRules.nom.max}
              value={form.nom}
              onChange={update("nom")}
              placeholder="Jean Dupont"
              className={inputClass}
            />
          </Field>
          <Field label="Entreprise">
            <input
              type="text"
              maxLength={contactFieldRules.entreprise.max}
              value={form.entreprise}
              onChange={update("entreprise")}
              placeholder="Nom de votre entreprise"
              className={inputClass}
            />
          </Field>
          <Field label="Téléphone">
            <input
              type="tel"
              maxLength={contactFieldRules.telephone.max}
              value={form.telephone}
              onChange={update("telephone")}
              placeholder="06 12 34 56 78"
              className={inputClass}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              maxLength={contactFieldRules.email.max}
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
              {metierOptions.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Ville" required>
            <input
              type="text"
              required
              maxLength={contactFieldRules.ville.max}
              value={form.ville}
              onChange={update("ville")}
              placeholder="Istres"
              className={inputClass}
            />
          </Field>
          <Field label="Zone d'intervention">
            <input
              type="text"
              maxLength={contactFieldRules.zoneIntervention.max}
              value={form.zoneIntervention}
              onChange={update("zoneIntervention")}
              placeholder="Ex : Istres, Fos-sur-Mer, Martigues…"
              className={inputClass}
            />
          </Field>
          <Field label="Site actuel (si vous en avez un)">
            <input
              type="text"
              maxLength={contactFieldRules.siteActuel.max}
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
              {objectifOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Budget indicatif">
            <select value={form.budget} onChange={update("budget")} className={cn(inputClass, "appearance-none")}>
              <option value="">Sélectionnez une fourchette</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Délai souhaité" className="sm:col-span-2">
            <select value={form.delai} onChange={update("delai")} className={cn(inputClass, "appearance-none")}>
              <option value="">Sélectionnez un délai</option>
              {delaiOptions.map((d) => (
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
              {sourceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Un commentaire à ajouter ?">
            <textarea
              rows={4}
              maxLength={contactFieldRules.commentaires.max}
              value={form.commentaires}
              onChange={update("commentaires")}
              placeholder="Tout ce qui peut m'aider à comprendre votre projet…"
              className={cn(inputClass, "resize-none")}
            />
          </Field>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm font-medium text-clay-700">
          {error}
        </p>
      )}

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
  return (
    <div className="flex flex-col gap-2 text-sm">
      <span className="font-medium text-ink">{label}</span>
      <div className="flex flex-col gap-1.5">
        {yesNoOptions.map((opt) => (
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
