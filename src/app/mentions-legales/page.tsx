import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

/**
 * TODO(client) : forme juridique définitive, SIRET et adresse du siège à
 * intégrer dès qu'ils existent (remplacer le paragraphe "en cours de
 * finalisation" ci-dessous) — jamais inventés d'ici là, voir brief §8/§9.
 * Le reste (nom, hébergeur, propriété intellectuelle) est vérifiable dès
 * maintenant : Vercel est le vrai hébergeur de ce déploiement.
 */
export default function MentionsLegalesPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal text-ink">Mentions légales</h1>
        <p className="mt-4 text-sm text-ink-faint">
          Certaines informations administratives (forme juridique, SIRET, adresse du siège) sont en cours de
          finalisation et seront complétées avant tout premier contrat signé.
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-ink-soft">
          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Éditeur du site</h2>
            <p>
              {siteConfig.legalName}
              <br />
              {siteConfig.founder.name} — {siteConfig.founder.role}
              <br />
              {siteConfig.founder.location}
              <br />
              Forme juridique, SIRET et adresse du siège : en cours de finalisation.
              <br />
              Contact : {siteConfig.email.address}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Directeur de la publication</h2>
            <p>{siteConfig.founder.name}</p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Hébergement</h2>
            <p>
              Vercel Inc.
              <br />
              340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
              <br />
              <a href="https://vercel.com" className="font-medium text-clay-600 hover:underline">
                vercel.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Propriété intellectuelle</h2>
            <p>
              L&apos;ensemble des contenus présents sur ce site (textes, visuels, logo) est protégé par le droit
              d&apos;auteur. Toute reproduction sans autorisation préalable est interdite.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
