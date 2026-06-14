/**
 * Removes Botox subcategory and procedure documents from Sanity.
 *
 * Run after catalog changes:
 *   pnpm purge:sanity:botox
 *   pnpm seed:sanity
 */
import { createClient } from "@sanity/client";

const BOTOX_DOC_QUERY = /* groq */ `
  *[
    _type in ["serviceSubcategory", "serviceProcedure"]
    && (
      _id match "serviceSubcategory-*-botox"
      || _id match "serviceProcedure-botox-*"
    )
  ]._id
`;

function getWriteClient() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN?.trim();

  if (!projectId || !token) {
    throw new Error("Missing Sanity credentials in .env.local");
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
  const documentIds = await client.fetch<string[]>(BOTOX_DOC_QUERY);

  if (documentIds.length === 0) {
    console.log("No Botox catalog documents found.");
    return;
  }

  console.log(`Deleting ${documentIds.length} Botox catalog documents…`);

  for (const documentId of documentIds) {
    await deleteDocumentWithReferencingDrafts(client, documentId);
  }

  console.log("Done.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
