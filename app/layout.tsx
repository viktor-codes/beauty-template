import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

import { ConsentModeDefaultScript } from "@/components/consent/consent-mode-default-script";
import { CookieConsentRoot } from "@/components/consent/cookie-consent-root";
import { SiteGraphJsonLd } from "@/components/shared/site-graph-jsonld";
import { content } from "@/lib/content";
import {
  SITE_BRAND,
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
  SITE_KEYWORDS,
  SITE_NAME_FULL,
  SITE_PRACTITIONER,
  SITE_TITLE_TEMPLATE,
  resolveMetadataBase,
} from "@/lib/site-metadata";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["500", "700"],
});

const metadataBase = resolveMetadataBase();

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: SITE_TITLE_TEMPLATE,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  keywords: [...SITE_KEYWORDS],
  authors: [
    metadataBase
      ? { name: SITE_PRACTITIONER, url: metadataBase.origin }
      : { name: SITE_PRACTITIONER },
  ],
  creator: SITE_PRACTITIONER,
  applicationName: SITE_BRAND,
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME_FULL,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      {
        url: "/favicon/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className={[
            "fixed left-4 top-0 z-600 -translate-y-full rounded-b-md bg-primary px-4 py-2.5",
            "text-sm font-medium text-background shadow-md transition-transform",
            "focus:translate-y-4 focus:outline-none focus:ring-2 focus:ring-accent/50",
          ].join(" ")}
        >
          Skip to main content
        </a>
        <SiteGraphJsonLd contact={content.contact} />
        <ConsentModeDefaultScript />
        <CookieConsentRoot>{children}</CookieConsentRoot>
      </body>
    </html>
  );
}
