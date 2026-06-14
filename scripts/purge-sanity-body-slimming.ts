/**
 * Deletes the legacy body-slimming branch from Sanity (category, subcategories, procedures).
 *
 * Run after seeding body-treatment in the static catalog:
 *   pnpm seed:sanity
 *   pnpm purge:sanity:body-slimming
 */
import { createClient } from "@sanity/client";

const BODY_SLIMMING_DOC_QUERY = /* groq */ `
  *[
    _type in ["serviceCategory", "serviceSubcategory", "serviceProcedure"]
    && (
      _id match "serviceCategory-body-slimming"
      || _id match "serviceSubcategory-body-slimming-*"
      || _id match "serviceProcedure-body-slimming-*"
    )
  ]._id
`;

/** Removed from catalog — only existed under body-slimming laser tattoo subcategory. */
const ORPHAN_PROCEDURE_IDS = ["serviceProcedure-laser-tattoo-pmu-1-zone"] as const;

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

  for (const documentId of ORPHAN_PROCEDURE_IDS) {
    const exists = await client.fetch<boolean>(`*[_id == $id][0]._id != null`, { id: documentId });
    if (!exists) continue;

    console.log(`Deleting orphan procedure ${documentId}…`);
    await deleteDocumentWithReferencingDrafts(client, documentId);
  }

  const documentIds = await client.fetch<string[]>(BODY_SLIMMING_DOC_QUERY);

  if (documentIds.length === 0) {
    console.log("No body-slimming catalog documents found in Sanity.");
    return;
  }

  console.log(`Deleting ${documentIds.length} body-slimming catalog documents…`);

  for (const documentId of documentIds) {
    await deleteDocumentWithReferencingDrafts(client, documentId);
  }

  console.log("Done.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
