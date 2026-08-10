import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Kicker } from "@/components/ui/badge";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ink-950 py-24 text-white">
      <Container className="flex flex-col items-start gap-6">
        <Kicker className="text-clay-400">404</Kicker>
        <h1 className="max-w-lg font-[family-name:var(--font-display)] text-4xl leading-[1.1] font-medium tracking-[-0.01em] sm:text-5xl">
          Cette page n&apos;existe pas — mais votre futur site, lui, existera.
        </h1>
        <p className="max-w-md text-lg text-sand">
          La page que vous cherchez a été déplacée ou n&apos;a jamais existé. Retournez à l&apos;accueil ou
          découvrez nos réalisations.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <ButtonLink href="/">
            Retour à l&apos;accueil
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </ButtonLink>
          <ButtonLink href="/realisations" variant="secondary">
            Voir les réalisations
          </ButtonLink>
        </div>
        <p className="text-sm text-sand-faint">
          Ou écrivez-moi directement à{" "}
          <a href={`mailto:${siteConfig.email.address}`} className="font-medium text-white hover:underline">
            {siteConfig.email.address}
          </a>
        </p>
      </Container>
    </section>
  );
}
