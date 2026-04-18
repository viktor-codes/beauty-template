import type { Metadata } from "next";

import { LegalStaticPage } from "@/components/sections/legal-static-page";
import { TermsPolicyDocument } from "@/components/sections/terms-policy-document";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

const PAGE_TITLE = "Terms & conditions";
const DESCRIPTION =
  "Full Terms & Conditions for Skinbar: services, client duties, cancellations (€20 fee), payment, liability, age rules, IP, Irish law, and cookie consent.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${PAGE_TITLE} | ${SITE_BRAND} · ${SITE_PRACTITIONER}`,
    description: DESCRIPTION,
    type: "website",
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <LegalStaticPage title={PAGE_TITLE}>
        <TermsPolicyDocument />
      </LegalStaticPage>
    </main>
  );
}
