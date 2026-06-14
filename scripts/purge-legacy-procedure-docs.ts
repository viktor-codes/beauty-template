/**
 * Deletes legacy per-placement procedure documents (pre–Phase 5 dedupe).
 *
 * Run after seeding slug-based procedure docs:
 *   pnpm seed:sanity
 *   pnpm purge:sanity:legacy-procedures
 */
import { createClient } from "@sanity/client";

const LEGACY_PROCEDURE_QUERY = /* groq */ `
  *[
    _type == "serviceProcedure"
    && (
      _id match "serviceProcedure-cosmetology-*"
      || _id match "serviceProcedure-body-slimming-*"
      || _id match "serviceProcedure-vitamin-shots-*"
      || _id match "serviceProcedure-blood-tests-*"
      || _id match "serviceProcedure-aesthetic-treatments-*"
      || _id match "serviceProcedure-aesthetic-injections-*"
      || _id match "serviceProcedure-advanced-aesthetic-treatments-*"
      || _id match "serviceProcedure-laser-hair-removal-*"
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

async function deleteDocumentWithReferencingDrafts(
  client: ReturnType<typeof getWriteClient>,
  documentId: string,
): Promise<void> {
  const referencingIds = await client.fetch<string[]>(`*[references($id)]._id`, { id: documentId });

  const transaction = client.transaction();
  for (const referencingId of referencingIds) {
    transaction.delete(referencingId);
  }
  transaction.delete(documentId);

  await transaction.commit();
}

async function main() {
  const client = getWriteClient();
  const documentIds = await client.fetch<string[]>(LEGACY_PROCEDURE_QUERY);

  if (documentIds.length === 0) {
    console.log("No legacy procedure documents found.");
    return;
  }

  console.log(`Deleting ${documentIds.length} legacy procedure documents…`);

  for (let index = 0; index < documentIds.length; index += 1) {
    const documentId = documentIds[index]!;
    await deleteDocumentWithReferencingDrafts(client, documentId);

    if ((index + 1) % 25 === 0 || index + 1 === documentIds.length) {
      console.log(`  → ${index + 1}/${documentIds.length}`);
    }
  }

  console.log("Done.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
