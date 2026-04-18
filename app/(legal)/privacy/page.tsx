import type { Metadata } from "next";

import { LegalStaticPage } from "@/components/sections/legal-static-page";
import { PrivacyPolicyDocument } from "@/components/sections/privacy-policy-document";
import { content } from "@/lib/content";
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

export default function PrivacyPolicyPage() {
  const { email, phone } = content.contact;

  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <LegalStaticPage title={PAGE_TITLE}>
        <PrivacyPolicyDocument email={email} phone={phone} />
      </LegalStaticPage>
    </main>
  );
}
