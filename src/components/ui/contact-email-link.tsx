import Link from "next/link";
import { siteConfig } from "@/data/site";
import { isBlockedEmailAddress } from "@/lib/contact-recipient";

/**
 * Lien email public. Tant que `siteConfig.email.address` est vide (aucune
 * adresse professionnelle vérifiée) ou pointe vers un domaine bloqué (voir
 * lib/contact-recipient.ts), renvoie vers le formulaire au lieu d'un
 * `mailto:` — jamais une adresse dont on n'est pas sûr qu'elle nous
 * appartient.
 */
export function ContactEmailLink({
  className,
  icon,
  fallbackLabel = "Contact par formulaire",
  fallbackHref = "/contact",
}: {
  className?: string;
  icon?: React.ReactNode;
  fallbackLabel?: string;
  fallbackHref?: string;
}) {
  const address = siteConfig.email.address;

  if (address && !isBlockedEmailAddress(address)) {
    return (
      <a href={`mailto:${address}`} className={className}>
        {icon}
        {address}
      </a>
    );
  }

  return (
    <Link href={fallbackHref} className={className}>
      {icon}
      {fallbackLabel}
    </Link>
  );
}
