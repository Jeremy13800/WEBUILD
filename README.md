# WeBuild — sites web pour artisans

Site vitrine de l'activité de création de sites internet premium pour
artisans du bâtiment (plombiers, électriciens, chauffagistes, couvreurs…).

## Stack

Next.js (App Router) · TypeScript strict · Tailwind CSS v4 · Framer Motion.

## Démarrer

```bash
npm install
npm run dev
```

## Où modifier le contenu business

Tout le contenu commercial est centralisé dans `src/data/` :

- `site.ts` — nom, coordonnées, navigation, positionnement.
- `pricing.ts` — offres, tarifs et formule de maintenance (facilement modifiables).
- `projects.ts` — réalisations du portfolio.
- `faq.ts` — questions fréquentes.
- `process.ts` — étapes du processus de travail.
- `benefits.ts` — bénéfices mis en avant sur l'accueil.

Aucune de ces informations ne doit être dupliquée en dur dans les
composants : ils lisent tous ces fichiers.

## Formulaire de contact

Le formulaire (`/contact`) fonctionne dès aujourd'hui via un repli
`mailto:`, sans configuration. Pour activer l'envoi silencieux côté
serveur (email direct, sans ouvrir le client mail du visiteur), copiez
`.env.example` en `.env.local` et renseignez `RESEND_API_KEY` (voir
[resend.com](https://resend.com/api-keys)) — détails dans
`src/app/api/contact/route.ts`.

## Pages légales

`/mentions-legales`, `/politique-de-confidentialite` et `/cgv` suivent
toutes le même principe : le contenu vérifiable est déjà rempli, le reste
est marqué `[TODO(client)]` plutôt qu'inventé. Aucune des trois ne doit
être mise en ligne sans relecture par un professionnel du droit — en
particulier les CGV (droit de rétractation, responsabilité, juridiction).

## À faire avant mise en ligne

Cherchez `TODO(client)` dans le code : ce sont les informations réelles
(nom de domaine définitif, email définitif, éventuel téléphone, réseaux
sociaux, mentions légales, CGV, captures d'écran des réalisations,
photographie professionnelle) qui restent à fournir.
