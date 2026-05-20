import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { LegalStaticPage } from "@/components/sections/legal-static-page";
import { PrivacyPolicyDocument } from "@/components/sections/privacy-policy-document";
import { WebPageJsonLd } from "@/components/shared/web-page-jsonld";
import { getLandingContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

const PAGE_TITLE = "Privacy policy";
const DESCRIPTION =
  "GDPR-aligned privacy policy for Skinbar: data controller, legal bases, Resend and analytics processors, retention, cookies, and your rights.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_BRAND} · ${SITE_PRACTITIONER}`,
    description: DESCRIPTION,
    type: "website",
    url: "/privacy",
  },
};

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const landingContent = getLandingContent(locale as AppLocale);
  const { email, phone } = landingContent.contact;

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <WebPageJsonLd
        title={PAGE_TITLE}
        description={DESCRIPTION}
        path="/privacy"
      />
      <LegalStaticPage title={PAGE_TITLE}>
        <PrivacyPolicyDocument email={email} phone={phone} />
      </LegalStaticPage>
    </main>
  );
}
