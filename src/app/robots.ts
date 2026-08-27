import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/mentions-legales", "/politique-de-confidentialite", "/cgv"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
