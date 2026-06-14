/**
 * Deletes the legacy anti-age branch from Sanity (category, subcategories, procedures).
 *
 * Run after removing anti-age from the static catalog, before re-seeding:
 *   pnpm purge:sanity:anti-age
 *   pnpm seed:sanity
 */
import { createClient } from "@sanity/client";

const ANTI_AGE_DOC_QUERY = /* groq */ `
  *[
    _type in ["serviceCategory", "serviceSubcategory", "serviceProcedure"]
    && (
      _id match "serviceCategory-anti-age"
      || _id match "serviceSubcategory-anti-age-*"
      || _id match "serviceProcedure-anti-age-*"
    )
  ]._id
`;

function getWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

  if (!projectId || !token) {
    throw new Error(
      [
        "Missing Sanity credentials.",
        "Add to .env.local:",
        "  NEXT_PUBLIC_SANITY_PROJECT_ID=…",
        "  SANITY_API_WRITE_TOKEN=…",
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

async function main() {
  const client = getWriteClient();
  const documentIds = await client.fetch<string[]>(ANTI_AGE_DOC_QUERY);

  if (documentIds.length === 0) {
    console.log("No anti-age catalog documents found in Sanity.");
    return;
  }

  console.log(`Deleting ${documentIds.length} anti-age catalog documents…`);

  const transaction = client.transaction();
  for (const documentId of documentIds) {
    transaction.delete(documentId);
  }

  await transaction.commit();
  console.log("Done.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
