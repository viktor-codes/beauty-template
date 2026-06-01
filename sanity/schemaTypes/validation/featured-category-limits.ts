import type { ValidationContext } from "sanity";

const API_VERSION = "2025-05-05";

async function countFeaturedCategories(
  context: ValidationContext,
  field: "featuredOnHomepage" | "featuredInNav",
): Promise<number> {
  const client = context.getClient({ apiVersion: API_VERSION });
  const documentId = context.document?._id?.replace(/^drafts\./, "") ?? "";

  return client.fetch<number>(
    `count(*[_type == "serviceCategory" && ${field} == true && !(_id in [$draftId, $publishedId])])`,
    {
      draftId: `drafts.${documentId}`,
      publishedId: documentId,
    },
  );
}

export function validateFeaturedOnHomepageLimit(value: boolean | undefined, context: ValidationContext) {
  if (!value) return true;

  return countFeaturedCategories(context, "featuredOnHomepage").then((count) =>
    count >= 4
      ? "Maximum 4 categories can be featured on the homepage. Turn off another category first."
      : true,
  );
}

export function validateFeaturedInNavLimit(value: boolean | undefined, context: ValidationContext) {
  if (!value) return true;

  return countFeaturedCategories(context, "featuredInNav").then((count) =>
    count >= 5
      ? "Maximum 5 categories can appear in the header menu. Turn off another category first."
      : true,
  );
}
