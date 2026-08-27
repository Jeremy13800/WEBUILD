/**
 * Mise en forme du contenu du formulaire de contact en texte brut —
 * partagée entre le corps de la requête `mailto:` (repli côté client) et
 * l'email envoyé par la route API (src/app/api/contact/route.ts), pour que
 * les deux chemins produisent exactement le même contenu.
 */
export type ContactFormFields = {
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

export function contactEmailSubject(form: Pick<ContactFormFields, "nom" | "entreprise">) {
  return `Nouveau projet — ${form.entreprise || form.nom}`;
}

export function contactEmailBody(form: ContactFormFields) {
  return [
    `Nom : ${form.nom}`,
    form.entreprise && `Entreprise : ${form.entreprise}`,
    form.telephone && `Téléphone : ${form.telephone}`,
    form.email && `Email : ${form.email}`,
    "",
    `Métier : ${form.metier}`,
    `Ville : ${form.ville}`,
    form.zoneIntervention && `Zone d'intervention : ${form.zoneIntervention}`,
    form.siteActuel && `Site actuel : ${form.siteActuel}`,
    "",
    form.objectif && `Objectif principal : ${form.objectif}`,
    form.budget && `Budget indicatif : ${form.budget}`,
    form.delai && `Délai souhaité : ${form.delai}`,
    form.googleBusiness && `Fiche Google Business : ${form.googleBusiness}`,
    form.logo && `Logo disponible : ${form.logo}`,
    form.photos && `Photos disponibles : ${form.photos}`,
    form.source && `Comment il/elle nous a connus : ${form.source}`,
    "",
    form.commentaires && `Commentaires :\n${form.commentaires}`,
  ]
    .filter(Boolean)
    .join("\n");
}
