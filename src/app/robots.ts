import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

/**
 * Bloque toute indexation tant que `NEXT_PUBLIC_SITE_READY` n'est pas
 * explicitement à "true" dans les variables d'env Vercel — sécurité par
 * défaut : sans ce flag, chaque nouveau déploiement (y compris celui-ci,
 * tant qu'il vit sur une URL Vercel provisoire) reste fermé aux moteurs de
 * recherche. À passer à "true" seulement une fois le vrai domaine branché
 * et les pages légales complétées (voir TODO(client) dans mentions-legales,
 * politique-de-confidentialite et cgv).
 */
export default function robots(): MetadataRoute.Robots {
  const ready = process.env.NEXT_PUBLIC_SITE_READY === "true";

  return {
    rules: {
      userAgent: "*",
      ...(ready
        ? { allow: "/", disallow: ["/mentions-legales", "/politique-de-confidentialite", "/cgv"] }
        : { disallow: "/" }),
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
