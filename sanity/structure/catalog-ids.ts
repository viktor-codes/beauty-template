/** Normalize category pane id from structure URL (slug or full document _id). */
export function resolveCategoryContext(categoryId: string): {
  categoryDocumentId: string;
  categorySlug: string;
  subcategoryRefPattern: string;
} {
  const categoryDocumentId = categoryId.startsWith("serviceCategory-")
    ? categoryId
    : `serviceCategory-${categoryId}`;
  const categorySlug = categoryDocumentId.replace(/^serviceCategory-/, "");

  return {
    categoryDocumentId,
    categorySlug,
    subcategoryRefPattern: `serviceSubcategory-${categorySlug}-*`,
  };
}
