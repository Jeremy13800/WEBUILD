import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { pricingTiers, maintenancePlan } from "@/data/pricing";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  robots: { index: false, follow: true },
};

/**
 * TODO(client) : à faire relire par un professionnel du droit avant tout
 * premier contrat signé — en particulier l'article 7 "Droit de
 * rétractation", dont l'applicabilité dépend de la taille de l'entreprise
 * cliente et du lien entre le site commandé et son activité principale
 * (art. L221-3 du Code de la consommation), un point qui se tranche au cas
 * par cas et ne doit pas être affirmé à la légère ici.
 *
 * Contenu vérifiable repris tel quel depuis data/pricing.ts et les réponses
 * déjà publiées dans la FAQ (data/faq.ts). Le reste (SIRET, juridiction,
 * délais exacts de résiliation, clause de responsabilité) reste explicitement
 * en attente — jamais inventé, jamais affirmé comme réglé.
 */
export default function CgvPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="max-w-2xl">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-normal text-ink">
          Conditions générales de vente
        </h1>
        <p className="mt-4 text-sm text-ink-faint">
          Ce document est en cours de finalisation avec un professionnel du droit et sera complété avant tout
          premier contrat signé.
        </p>

        <div className="mt-10 flex flex-col gap-8 text-sm leading-relaxed text-ink-soft">
          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">1. Objet</h2>
            <p>
              Les présentes conditions régissent les prestations de création de site internet et
              d&apos;accompagnement proposées par {siteConfig.legalName} à des artisans et entreprises du bâtiment.
              Toute commande implique l&apos;acceptation pleine et entière de ces conditions.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">2. Devis et commande</h2>
            <p>
              Chaque prestation fait l&apos;objet d&apos;un devis préalable détaillant le périmètre, le prix et le
              délai indicatif. La commande est considérée comme ferme à réception de l&apos;acompte mentionné à
              l&apos;article 3.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">3. Tarifs et modalités de paiement</h2>
            <p>
              Les tarifs indicatifs des offres de création sont publiés sur la page{" "}
              <a href="/offres" className="font-medium text-clay-600 hover:underline">
                Offres &amp; tarifs
              </a>{" "}
              ({pricingTiers.map((t) => `${t.name} à partir de ${t.fromPrice} €`).join(", ")}). Le paiement
              s&apos;effectue en général par un acompte au démarrage du projet, puis le solde à la mise en ligne du
              site — les modalités précises (montant de l&apos;acompte, moyens de paiement acceptés) sont convenues
              ensemble avant le début de la prestation. Le pourcentage exact de l&apos;acompte, les moyens de
              paiement acceptés et les conditions en cas de retard de paiement sont en cours de finalisation.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">4. Accompagnement mensuel</h2>
            <p>
              La formule &laquo; {maintenancePlan.name} &raquo; (à partir de {maintenancePlan.fromPrice} €/
              {maintenancePlan.period}) est optionnelle et reconductible tacitement. Elle peut être résiliée à tout
              moment ; le délai de préavis et le sort du nom de domaine et de l&apos;hébergement en cas d&apos;arrêt
              sont en cours de finalisation.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">5. Délais de réalisation</h2>
            <p>
              Un calendrier indicatif est communiqué au démarrage du projet. Les délais dépendent notamment de la
              disponibilité et de la rapidité de transmission des contenus (textes, photos, logo) par le client.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">6. Propriété du site livré</h2>
            <p>
              Une fois le projet livré et le solde réglé, le site et son contenu appartiennent entièrement au
              client.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">7. Droit de rétractation</h2>
            <p>
              L&apos;applicabilité d&apos;un droit de rétractation dépend de la qualification exacte du client
              (particulier ou professionnel) et, pour un professionnel, du lien entre la prestation commandée et son
              activité principale. Ce point est en cours de validation avec un professionnel du droit et sera
              précisé avant tout premier contrat signé.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">8. Responsabilité</h2>
            <p>
              La clause de limitation de responsabilité (notamment en cas d&apos;indisponibilité de l&apos;hébergeur
              tiers ou de contenu fourni par le client) est en cours de rédaction avec un professionnel du droit.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">9. Droit applicable et litiges</h2>
            <p>
              Le droit applicable et la juridiction compétente seront précisés une fois la forme juridique
              définitive de {siteConfig.legalName} arrêtée.
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-base font-semibold text-ink">10. Contact</h2>
            <p>
              Pour toute question relative à ces conditions, contactez-nous à{" "}
              <a href={`mailto:${siteConfig.email.address}`} className="font-medium text-clay-600 hover:underline">
                {siteConfig.email.address}
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
