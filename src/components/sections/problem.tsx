import { X, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal, RevealGroup, RevealItem, revealItemVariants } from "@/components/motion/reveal";

const before = [
  "Aucun site, ou une simple page Facebook",
  "Un site créé il y a dix ans, jamais mis à jour",
  "Illisible ou mal cadré sur téléphone",
  "Impossible de savoir où vous intervenez ni ce que vous proposez",
  "Rien qui rassure un prospect qui ne vous connaît pas encore",
];

const after = [
  "Un site professionnel, à votre nom",
  "Un design actuel, pensé pour durer",
  "Parfaitement lisible sur tous les écrans",
  "Vos services et votre zone d'intervention clairement présentés",
  "Une image qui inspire confiance dès les premières secondes",
];

/**
 * Section Problème (brief §11). Ne jamais rabaisser l'artisan : le
 * message porte sur la réalité du secteur, pas sur le visiteur.
 */
export function Problem() {
  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Le constat"
          title="Votre travail est professionnel. Votre présence en ligne devrait l'être aussi."
          subtitle="Beaucoup d'artisans excellents dans leur métier restent invisibles ou mal représentés en ligne — non par manque de qualité, mais par manque de temps pour s'en occuper."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[var(--radius-lg)] border border-line bg-card p-8 sm:p-10">
            <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-ink-faint uppercase">
              Trop souvent
            </p>
            <ul className="flex flex-col gap-4">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3 text-ink-soft">
                  <X className="mt-0.5 size-4 shrink-0 text-ink-faint" strokeWidth={2.5} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <RevealGroup className="rounded-[var(--radius-lg)] border border-clay-600/25 bg-ink-950 p-8 sm:p-10">
            <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-clay-400 uppercase">Avec WeBatisseur</p>
            <ul className="flex flex-col gap-4">
              {after.map((item) => (
                <RevealItem key={item} variants={revealItemVariants} className="flex items-start gap-3 text-sand">
                  <Check className="mt-0.5 size-4 shrink-0 text-clay-400" strokeWidth={2.5} />
                  <span>{item}</span>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
