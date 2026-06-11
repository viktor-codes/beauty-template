import { isFlatCategory } from "@/lib/services/flat-categories";
import type {
  ServiceCategory,
  ServiceProcedure,
  ServiceSubcategory,
} from "@/lib/types/services";

type ProcedurePathInput = {
  category: Pick<ServiceCategory, "id" | "isFlatCategory">;
  subcategory: Pick<ServiceSubcategory, "id">;
  procedure: Pick<ServiceProcedure, "id">;
};

/** Canonical procedure URL (flat or nested depending on category). */
export function buildProcedurePath({
  category,
  subcategory,
  procedure,
}: ProcedurePathInput): string {
  if (isFlatCategory(category)) {
    return `/treatments/${category.id}/${procedure.id}`;
  }
  return `/treatments/${category.id}/${subcategory.id}/${procedure.id}`;
}

/** Legacy nested URL — used for permanent redirects from old links. */
export function buildLegacyProcedurePath(
  categoryId: string,
  subcategoryId: string,
  procedureId: string,
): string {
  return `/treatments/${categoryId}/${subcategoryId}/${procedureId}`;
}
