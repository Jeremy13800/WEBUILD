import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { Kicker } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlons de votre projet de site internet. Réponse rapide, sans engagement — je prends le temps de comprendre votre activité avant tout devis.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Reveal>
            <Kicker>Contact</Kicker>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-[1.1] font-medium tracking-[-0.01em] text-ink sm:text-4xl">
              Parlons de votre projet.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
              Quelques questions simples sur votre activité pour bien démarrer. Aucun engagement, aucune pression —
              juste un premier échange.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex flex-col gap-4">
            <a
              href={`mailto:${siteConfig.email.address}`}
              className="flex items-center gap-3 text-sm font-medium text-ink hover:text-clay-600"
            >
              <span className="grid size-9 place-items-center rounded-full bg-clay-50 text-clay-600">
                <Mail className="size-4" strokeWidth={2} />
              </span>
              {siteConfig.email.address}
            </a>
            <span className="flex items-center gap-3 text-sm text-ink-soft">
              <span className="grid size-9 place-items-center rounded-full bg-paper-dim text-ink-faint">
                <MapPin className="size-4" strokeWidth={2} />
              </span>
              {siteConfig.address.city}, {siteConfig.address.region}
            </span>
          </Reveal>
        </div>

        <Suspense>
          <ContactForm />
        </Suspense>
      </Container>
    </section>
  );
}
