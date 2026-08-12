import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false, follow: true },
};

/**
 * TODO(client) : ces mentions légales contiennent des placeholders
 * clairement identifiés. À compléter avec le statut juridique réel
 * (micro-entreprise, SASU…), le SIREN/SIRET, et l'hébergeur définitif
 * avant toute mise en ligne — brief §39 : ne jamais inventer ces
 * informations.
 */
export default function MentionsLegalesPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal text-ink">Mentions légales</h1>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-ink-soft">
          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Éditeur du site</h2>
            <p>
              {siteConfig.legalName}
              <br />
              [TODO(client) : forme juridique — ex. Entreprise Individuelle / Micro-entreprise]
              <br />
              [TODO(client) : numéro SIREN/SIRET]
              <br />
              [TODO(client) : adresse du siège]
              <br />
              Contact : {siteConfig.email.address}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Directeur de la publication</h2>
            <p>[TODO(client) : nom du responsable de la publication]</p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">Hébergement</h2>
            <p>[TODO(client) : nom, adresse et contact de l&apos;hébergeur définitif]</p>
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
