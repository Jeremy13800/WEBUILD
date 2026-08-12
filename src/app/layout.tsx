import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import { siteConfig } from "@/data/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CursorFollower } from "@/components/motion/cursor-follower";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#1c1712",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "création site internet artisan",
    "création site web artisan",
    "site internet plombier",
    "site internet électricien",
    "création site artisan Istres",
    "création site internet Bouches-du-Rhône",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  areaServed: siteConfig.serviceArea,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    addressCountry: "FR",
  },
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Création de site internet pour artisans" } },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${instrumentSerif.variable} ${geistSans.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-clay-600 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Aller au contenu
        </a>
        <CursorFollower />
        <ScrollProgress />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
