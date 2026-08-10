import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950 text-sand">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <span className="font-[family-name:var(--font-display)] text-2xl font-medium text-white">
              {siteConfig.name}
            </span>
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

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row sm:items-center">
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
