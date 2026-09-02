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

- `site.ts` — nom, coordonnées, identité du fondateur (`founder`), navigation, positionnement.
- `pricing.ts` — offres, tarifs et formule de maintenance (facilement modifiables).
- `projects.ts` — réalisations du portfolio.
- `faq.ts` — questions fréquentes.
- `process.ts` — étapes du processus de travail.
- `benefits.ts` — bénéfices mis en avant sur l'accueil.

Aucune de ces informations ne doit être dupliquée en dur dans les
composants : ils lisent tous ces fichiers.

## Formulaire de contact

Le formulaire (`/contact`) fonctionne via un repli `mailto:` sans
configuration, ou via un envoi direct (Resend) une fois `RESEND_API_KEY`
renseignée — copiez `.env.example` en `.env.local` (voir
[resend.com/api-keys](https://resend.com/api-keys)), détails dans
`src/app/api/contact/route.ts`. Envoi direct testé et fonctionnel en
production comme en local.

## Pages légales

`/mentions-legales`, `/politique-de-confidentialite` et `/cgv` affichent
tout ce qui est déjà vérifiable (identité, hébergeur réel) ; le reste
(forme juridique, SIRET, adresse du siège, clauses CGV sensibles) est
formulé comme "en cours de finalisation" plutôt qu'inventé ou laissé en
`TODO(client)` brut. Aucune des trois ne doit être considérée définitive
sans relecture par un professionnel du droit — en particulier les CGV
(droit de rétractation, responsabilité, juridiction).

## Indexation par les moteurs de recherche

Bloquée par défaut (`robots.ts`) tant que `NEXT_PUBLIC_SITE_READY` n'est
pas explicitement à `"true"` dans les variables d'env Vercel — sécurité
volontaire pour ne pas indexer une version encore incomplète. À activer
seulement une fois le domaine définitif branché et les pages légales
complétées.

## À faire avant mise en ligne définitive

Cherchez `TODO(client)` dans le code : nom de domaine définitif (piloté
par `NEXT_PUBLIC_SITE_URL`), email professionnel à confirmer, éventuel
téléphone, réseaux sociaux, forme juridique/SIRET pour les mentions
légales et les CGV, captures d'écran des réalisations.
