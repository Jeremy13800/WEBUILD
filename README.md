# WEBUILD — sites web pour artisans

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
- `pricing.ts` — offres et tarifs (facilement modifiables).
- `projects.ts` — réalisations du portfolio.
- `faq.ts` — questions fréquentes.
- `process.ts` — étapes du processus de travail.

Aucune de ces informations ne doit être dupliquée en dur dans les
composants : ils lisent tous ces fichiers.

## À faire avant mise en ligne

Cherchez `TODO(client)` dans le code : ce sont les informations réelles
(email définitif, éventuel téléphone, réseaux sociaux, mentions légales,
captures d'écran des réalisations) qui restent à fournir.
