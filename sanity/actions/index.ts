import { deleteSubcategoryWithChildrenAction } from "./delete-subcategory-with-children";
import { isToggleActiveType, toggleActiveAction } from "./toggle-active-action";

export { deleteSubcategoryWithChildrenAction, isToggleActiveType, toggleActiveAction };

export function resolveCatalogDocumentActions(
  prev: import("sanity").DocumentActionComponent[],
  context: { schemaType: string },
): import("sanity").DocumentActionComponent[] {
  const { schemaType } = context;

  if (schemaType === "serviceSubcategory") {
    return [toggleActiveAction, deleteSubcategoryWithChildrenAction, ...prev];
  }

  if (isToggleActiveType(schemaType)) {
    return [toggleActiveAction, ...prev];
  }

  return prev;
}
