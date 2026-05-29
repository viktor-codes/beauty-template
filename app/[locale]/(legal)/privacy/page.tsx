import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalPageBody } from "@/components/sections/legal-page-body";
import { LegalStaticPage } from "@/components/sections/legal-static-page";
import { WebPageJsonLd } from "@/components/shared/web-page-jsonld";
import { getLegalPageContent } from "@/lib/content/get-legal-content";
import type { AppLocale } from "@/i18n/routing";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const page = await getLegalPageContent(locale as AppLocale, "privacy");

  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: `${page.title} | ${SITE_BRAND} · ${SITE_PRACTITIONER}`,
      description: page.metaDescription,
      type: "website",
      url: "/privacy",
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const page = await getLegalPageContent(locale as AppLocale, "privacy");

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <WebPageJsonLd
        title={page.title}
        description={page.metaDescription}
        path="/privacy"
      />
      <LegalStaticPage title={page.title}>
        <LegalPageBody sections={page.sections} slug={page.slug} />
      </LegalStaticPage>
    </main>
  );
}
