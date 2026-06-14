import type { GiftableProcedure } from "@/lib/types/gift-voucher";
import type { ServicesCatalog } from "@/lib/types/services";
import { getCategoryProcedures } from "@/lib/services/flat-categories";

/** Procedures with a fixed EUR price — eligible for gift checkout. */
export function buildGiftableProcedures(
  catalog: ServicesCatalog,
): GiftableProcedure[] {
  // WHY: Cosmetology and injectables share some procedure slugs across category trees.
  const bySlug = new Map<string, GiftableProcedure>();

  for (const category of catalog.categories) {
    for (const { procedure } of getCategoryProcedures(category)) {
      if (!procedure.price || procedure.price.amount <= 0) continue;
      if (bySlug.has(procedure.id)) continue;

      bySlug.set(procedure.id, {
        slug: procedure.id,
        title: procedure.title,
        categoryTitle: category.title,
        price: procedure.price,
      });
    }
  }

  return Array.from(bySlug.values()).sort((a, b) =>
    a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
  );
}

export function findGiftableProcedure(
  procedures: GiftableProcedure[],
  slug: string,
): GiftableProcedure | null {
  return procedures.find((item) => item.slug === slug) ?? null;
}
