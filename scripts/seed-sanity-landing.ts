/**
 * Seeds landingPage + siteSettings documents from static lib/content for en, uk, ru.
 *
 * Requires in .env.local (or env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN (Editor token from sanity.io/manage)
 *
 * Run: pnpm seed:sanity
 */
import { createClient } from "@sanity/client";

import type { AppLocale } from "@/i18n/routing";
import { getStaticLandingContent } from "@/lib/content/static";
import { INSTAGRAM_PROFILE_HREF, studioContact } from "@/lib/content/shared";
import { mapLandingContentToSanityDocument } from "@/lib/sanity/seed/map-landing-document";

const LOCALES: AppLocale[] = ["en", "uk", "ru"];

function getWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

  if (!projectId || !token) {
    throw new Error(
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.",
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-05-05",
    token,
    useCdn: false,
  });
}

function mapSiteSettings(locale: AppLocale) {
  return {
    _id: `siteSettings-${locale}`,
    _type: "siteSettings" as const,
    language: locale,
    phone: studioContact.phone,
    phoneTelHref: studioContact.phoneTelHref,
    email: studioContact.email,
    address: studioContact.address,
    instagramUrl: INSTAGRAM_PROFILE_HREF,
    telegramHref: studioContact.telegramHref,
    whatsappHref: studioContact.whatsappHref,
    directionsHref: studioContact.directionsHref,
  };
}

async function main() {
  const client = getWriteClient();
  const tx = client.transaction();

  for (const locale of LOCALES) {
    const landing = mapLandingContentToSanityDocument(
      locale,
      getStaticLandingContent(locale),
    );
    tx.createOrReplace(landing);
    tx.createOrReplace(mapSiteSettings(locale));
  }

  await tx.commit();
  console.log(`Seeded landingPage + siteSettings for: ${LOCALES.join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
