import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="grain relative overflow-hidden bg-ink-950 text-sand">
      {/* Ligne d'accent argile — même traitement (dégradé + double lueur)
          que les jonctions sombre/clair utilisées ailleurs sur le site
          (voir problem.tsx), plutôt que le simple `border-t` plat d'origine :
          le footer doit fermer la page avec la même signature graphique que
          le reste, pas un filet générique. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-clay-400 to-transparent shadow-[0_0_16px_2px_rgba(217,119,20,0.55),0_0_28px_10px_rgba(217,119,20,0.08)]"
        aria-hidden
      />

      <Container className="pt-20 pb-14 sm:pt-24">
        {/* Dernière prise de parole avant les liens — le footer d'origine
            passait directement de la description courte aux colonnes de
            liens, donc se lisait comme un footer Tailwind générique plutôt
            que la marque qui a porté tout le reste de la page. */}
        <p className="max-w-2xl border-b border-ink-800 pb-14 font-[family-name:var(--font-display)] text-3xl leading-[1.15] font-normal text-white sm:pb-16 sm:text-4xl">
          Votre métier mérite mieux qu&apos;un site qui{" "}
          <span className="text-clay-400 italic">fait juste joli.</span>
        </p>

        <div className="grid grid-cols-1 gap-12 pt-14 sm:grid-cols-2 sm:pt-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            {/* Même logo que le header (pensé pour fond sombre) — bien plus
                de présence que le simple libellé texte d'origine. */}
            <Image
              src="/images/logo-webuild.png"
              alt={siteConfig.name}
              width={326}
              height={109}
              className="h-14 w-[167px] max-w-none shrink-0 sm:h-16 sm:w-[191px]"
            />
            <p className="max-w-xs text-sm leading-relaxed text-sand-faint">{siteConfig.description}</p>
          </div>

          <FooterColumn title="Le site">
            {siteConfig.footerNav.site.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn title="Métiers">
            {siteConfig.metiers.slice(0, 6).map((metier) => (
              <span key={metier} className="text-sm text-sand-faint">
                {metier}
              </span>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <a
              href={`mailto:${siteConfig.email.address}`}
              className="text-sm text-sand-faint transition-colors hover:text-white"
            >
              {siteConfig.email.address}
            </a>
            <span className="text-sm text-sand-faint">
              {siteConfig.address.city}, {siteConfig.address.region}
            </span>
            <ButtonLink href={siteConfig.ctaSecondary.href} variant="secondary" size="sm" className="mt-2 w-fit">
              {siteConfig.ctaSecondary.label}
            </ButtonLink>
          </FooterColumn>
        </div>

      </Container>

      {/* Bandeau défilant décoratif — même vocabulaire visuel que le Hero,
          pour que la première et la dernière impression se répondent. */}
      <div className="overflow-hidden border-t border-ink-800 py-6" aria-hidden>
        <div className="flex w-max shrink-0 animate-[marquee_30s_linear_infinite] items-center gap-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-10 font-[family-name:var(--font-display)] text-4xl font-normal whitespace-nowrap text-white/[0.06] italic sm:text-6xl"
            >
              {siteConfig.name}
              <span className="text-clay-500/20">·</span>
            </span>
          ))}
        </div>
      </div>

      <Container>
        <div className="flex flex-col-reverse items-start justify-between gap-4 border-t border-ink-800 py-8 sm:flex-row sm:items-center">
          <p className="text-xs text-sand-faint">
            © {year} {siteConfig.legalName}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {siteConfig.footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-sand-faint hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-semibold tracking-[0.14em] text-sand-faint uppercase">{title}</span>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm text-sand-faint transition-colors hover:text-white">
      {children}
    </Link>
  );
}
