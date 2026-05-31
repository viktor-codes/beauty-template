/**
 * Seeds Sanity with all static site content (landing, settings, services tree).
 *
 * Prerequisites (.env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET (optional, default production)
 *   SANITY_API_WRITE_TOKEN — Editor token from sanity.io/manage → API → Tokens
 *
 * Run: pnpm seed:sanity
 */
import { createClient } from "@sanity/client";

import type { AppLocale } from "@/i18n/routing";
import { getStaticLandingContent } from "@/lib/content/static";
import { INSTAGRAM_PROFILE_HREF, studioContact } from "@/lib/content/shared";
import { servicesCatalog } from "@/lib/services";
import { addMissingArrayKeys } from "@/lib/sanity/seed/add-array-keys";
import { commitDocumentsInChunks } from "@/lib/sanity/seed/commit-documents";
import { enrichLandingDocumentWithImages } from "@/lib/sanity/seed/enrich-landing-images";
import { buildLegalDocuments } from "@/lib/sanity/seed/map-legal-documents";
import { buildServiceDocuments } from "@/lib/sanity/seed/map-services-documents";

const LOCALES: AppLocale[] = ["en", "uk", "ru"];

function getWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

  if (!projectId || !token) {
    throw new Error(
      [
        "Missing Sanity seed credentials.",
        "Add to .env.local:",
        "  NEXT_PUBLIC_SANITY_PROJECT_ID=…",
        "  SANITY_API_WRITE_TOKEN=…  (Editor token, sanity.io/manage → API → Tokens)",
      ].join("\n"),
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

  console.log("Seeding services catalog…");
  const serviceDocs = buildServiceDocuments(servicesCatalog);
  await commitDocumentsInChunks(client, serviceDocs);
  console.log(`Services: ${serviceDocs.length} documents`);

  console.log("Seeding landing pages + site settings + legal pages…");
  for (const locale of LOCALES) {
    const content = getStaticLandingContent(locale);
    const landing = await enrichLandingDocumentWithImages(client, locale, content);
    const settings = mapSiteSettings(locale);
    const legalDocs = buildLegalDocuments(locale);

    const tx = client.transaction();
    tx.createOrReplace(addMissingArrayKeys(landing));
    tx.createOrReplace(addMissingArrayKeys(settings));
    for (const legal of legalDocs) {
      tx.createOrReplace(addMissingArrayKeys(legal));
    }
    await tx.commit({ autoGenerateArrayKeys: true });
    console.log(`  ✓ ${locale}: landingPage + siteSettings + 2 legal pages`);
  }

  console.log("\nDone. Open Studio → Structure; content should be filled. Publish if drafts appear.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
