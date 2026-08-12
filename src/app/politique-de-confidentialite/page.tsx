import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  robots: { index: false, follow: true },
};

/**
 * TODO(client) : à faire relire par un professionnel avant mise en ligne
 * si un traitement de données personnelles significatif est mis en place
 * (ex. envoi à un CRM, newsletter). En l'état, seul le formulaire de
 * contact (envoi d'un email) est concerné.
 */
export default function PolitiqueConfidentialitePage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal text-ink">
          Politique de confidentialité
        </h1>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-ink-soft">
          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Données collectées</h2>
            <p>
              Le formulaire de contact de ce site vous demande votre nom, votre entreprise, vos coordonnées
              (téléphone et/ou email) ainsi que des informations sur votre projet. Ces informations sont
              transmises directement par email à {siteConfig.legalName} et ne sont stockées sur aucun serveur
              tiers.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Utilisation des données</h2>
            <p>
              Ces informations sont utilisées uniquement pour répondre à votre demande de projet. Elles ne sont
              ni revendues, ni transmises à des tiers à des fins commerciales.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Vos droits</h2>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d&apos;un
              droit d&apos;accès, de rectification et de suppression des données vous concernant. Pour l&apos;exercer,
              contactez-nous à l&apos;adresse{" "}
              <a href={`mailto:${siteConfig.email.address}`} className="font-medium text-clay-600 hover:underline">
                {siteConfig.email.address}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Cookies</h2>
            <p>
              Ce site n&apos;utilise actuellement aucun cookie de suivi ou de mesure d&apos;audience.
              [TODO(client) : mettre à jour cette section si un outil d&apos;analytics (Google Analytics, Plausible…)
              est ajouté — un bandeau de consentement sera alors nécessaire.]
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
