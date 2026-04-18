import type { ContactContent } from "@/lib/types/content";
import {
  SITE_BRAND,
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME_FULL,
  SITE_PRACTITIONER,
} from "@/lib/site-metadata";
import { getSiteUrl, toAbsoluteUrl } from "@/lib/site-url";

function collectSameAs(messengers: ContactContent["messengers"]): string[] {
  const urls = messengers
    .map((m) => m.href)
    .filter((href) => href.startsWith("http://") || href.startsWith("https://"));
  return [...new Set(urls)];
}

function buildOrganization(contact: ContactContent): Record<string, unknown> {
  return {
    "@type": "HealthAndBeautyBusiness",
    name: contact.locationTitle || SITE_NAME_FULL,
    alternateName: [SITE_BRAND, SITE_PRACTITIONER],
    description: SITE_DEFAULT_DESCRIPTION,
    url: getSiteUrl() ?? "/",
    telephone: contact.phone,
    email: contact.email,
    image: toAbsoluteUrl("/favicon/apple-touch-icon.png"),
    logo: {
      "@type": "ImageObject",
      url: toAbsoluteUrl("/favicon/apple-touch-icon.png"),
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
    },
    founder: {
      "@type": "Person",
      name: SITE_PRACTITIONER,
    },
    sameAs: collectSameAs(contact.messengers),
  };
}

export function buildSiteGraphJsonLd(contact: ContactContent): Record<string, unknown> {
  const base = getSiteUrl();
  const organization = buildOrganization(contact);

  if (!base) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          url: "/",
          name: SITE_BRAND,
          description: SITE_DEFAULT_DESCRIPTION,
          inLanguage: "en",
          publisher: organization,
        },
      ],
    };
  }

  const orgId = `${base}/#organization`;
  const websiteId = `${base}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...organization, "@id": orgId, url: base },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: base,
        name: SITE_BRAND,
        description: SITE_DEFAULT_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
    ],
  };
}
