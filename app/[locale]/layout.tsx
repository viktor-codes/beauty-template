import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ConsentModeDefaultScript } from "@/components/consent/consent-mode-default-script";
import { CookieConsentRoot } from "@/components/consent/cookie-consent-root";
import { SiteGraphJsonLd } from "@/components/shared/site-graph-jsonld";
import { SmoothHashNavigation } from "@/components/shared/smooth-hash-navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { getLandingContent } from "@/lib/content";
import {
  buildLanguageAlternates,
  getOpenGraphLocale,
} from "@/lib/i18n/metadata";
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

const metadataBase = resolveMetadataBase();

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    return {};
  }

  const appLocale = locale as AppLocale;

  return {
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
    alternates: buildLanguageAlternates("/", appLocale),
    openGraph: {
      type: "website",
      locale: getOpenGraphLocale(appLocale),
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
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations("Accessibility");
  const landingContent = await getLandingContent(locale as AppLocale);

  return (
    <>
      <a
        href="#main-content"
        className={[
          "fixed left-4 top-[-9999px] z-550 rounded-b-md bg-primary px-4 py-2.5",
          "text-sm font-medium text-background shadow-md",
          "transition-[top] duration-200 ease-out",
          "focus:top-[max(1rem,env(safe-area-inset-top,0px))] focus:outline-none focus:ring-2 focus:ring-accent/50",
        ].join(" ")}
      >
        {t("skipToContent")}
      </a>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SiteGraphJsonLd contact={landingContent.contact} />
        <SmoothHashNavigation />
        <ConsentModeDefaultScript />
        <CookieConsentRoot>{children}</CookieConsentRoot>
      </NextIntlClientProvider>
    </>
  );
}
