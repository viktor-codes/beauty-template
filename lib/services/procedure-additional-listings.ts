import type {
  ServiceCategory,
  ServiceProcedure,
  ServicesCatalog,
  ServiceSubcategory,
} from "@/lib/types/services";

/** Secondary catalog placements — canonical copy lives in cosmetology / body-treatment / aesthetic-treatments. */
export const ADDITIONAL_PROCEDURE_LISTINGS = [
  { procedureSlug: "stylage-m", categorySlug: "aesthetic-injections", subcategorySlug: "lip-fillers", sortOrder: 0 },
  { procedureSlug: "radiesse-1-5ml-lidocaine", categorySlug: "aesthetic-injections", subcategorySlug: "collagen-stimulators", sortOrder: 0 },
  { procedureSlug: "lenisna-6ml", categorySlug: "aesthetic-injections", subcategorySlug: "collagen-stimulators", sortOrder: 3 },
  { procedureSlug: "juvelook-eye-2ml", categorySlug: "aesthetic-injections", subcategorySlug: "collagen-stimulators", sortOrder: 4 },
  { procedureSlug: "revacoll-dmae-5ml", categorySlug: "aesthetic-injections", subcategorySlug: "collagen-stimulators", sortOrder: 6 },
  { procedureSlug: "lennea-booster-pdrn", categorySlug: "aesthetic-injections", subcategorySlug: "collagen-stimulators", sortOrder: 7 },
  { procedureSlug: "profhilo-2ml", categorySlug: "aesthetic-injections", subcategorySlug: "biorevitalisation", sortOrder: 0 },
  { procedureSlug: "aquashine-ptx", categorySlug: "aesthetic-injections", subcategorySlug: "biorevitalisation", sortOrder: 2 },
  { procedureSlug: "hyalual-1-1", categorySlug: "aesthetic-injections", subcategorySlug: "biorevitalisation", sortOrder: 8 },
  { procedureSlug: "hyalual-2-2", categorySlug: "aesthetic-injections", subcategorySlug: "biorevitalisation", sortOrder: 9 },
  { procedureSlug: "plinest", categorySlug: "aesthetic-injections", subcategorySlug: "biorevitalisation", sortOrder: 10 },
  { procedureSlug: "dermaheal-hl", categorySlug: "aesthetic-injections", subcategorySlug: "mesotherapy-for-hair-loss", sortOrder: 0 },
  { procedureSlug: "prf", categorySlug: "aesthetic-injections", subcategorySlug: "plasma-therapy", sortOrder: 1 },
  { procedureSlug: "sclerotherapy-1-vial", categorySlug: "aesthetic-injections", subcategorySlug: "sclerotherapy", sortOrder: 0 },
  { procedureSlug: "sclerotherapy-2-vials", categorySlug: "aesthetic-injections", subcategorySlug: "sclerotherapy", sortOrder: 1 },
  { procedureSlug: "hifu-face-lift", categorySlug: "advanced-aesthetic-treatments", subcategorySlug: "hifu-face-lift", sortOrder: 0 },
  { procedureSlug: "rf-microneedling", categorySlug: "advanced-aesthetic-treatments", subcategorySlug: "rf-microneedling", sortOrder: 0 },
  { procedureSlug: "rf-microneedling-exosomes", categorySlug: "advanced-aesthetic-treatments", subcategorySlug: "rf-microneedling", sortOrder: 1 },
] as const;

type AdditionalProcedureListing = (typeof ADDITIONAL_PROCEDURE_LISTINGS)[number];

const additionalListingKeys = new Set(
  ADDITIONAL_PROCEDURE_LISTINGS.map(
    (entry) => `${entry.categorySlug}/${entry.subcategorySlug}/${entry.procedureSlug}`,
  ),
);

function buildProcedureLookup(catalog: ServicesCatalog): Map<string, ServiceProcedure> {
  const lookup = new Map<string, ServiceProcedure>();

  for (const category of catalog.categories) {
    for (const subcategory of category.subcategories) {
      for (const procedure of subcategory.procedures) {
        if (!lookup.has(procedure.id)) {
          lookup.set(procedure.id, procedure);
        }
      }
    }
  }

  return lookup;
}

/** Removes duplicate procedure rows from static category sources (keeps first catalog occurrence). */
export function dedupeCanonicalProcedurePlacements(catalog: ServicesCatalog): ServicesCatalog {
  const seenSlugs = new Set<string>();

  return {
    ...catalog,
    categories: catalog.categories.map((category) => ({
      ...category,
      subcategories: category.subcategories.map((subcategory) => ({
        ...subcategory,
        procedures: subcategory.procedures.filter((procedure) => {
          const listingKey = `${category.id}/${subcategory.id}/${procedure.id}`;
          if (additionalListingKeys.has(listingKey)) {
            return false;
          }

          if (seenSlugs.has(procedure.id)) {
            return false;
          }

          seenSlugs.add(procedure.id);
          return true;
        }),
      })),
    })),
  };
}

function sortProcedures(procedures: ServiceProcedure[], orderById: Map<string, number>): ServiceProcedure[] {
  return [...procedures].sort((left, right) => {
    const leftOrder = orderById.get(left.id) ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = orderById.get(right.id) ?? Number.MAX_SAFE_INTEGER;
    if (leftOrder !== rightOrder) return leftOrder - rightOrder;
    return left.title.localeCompare(right.title, undefined, { sensitivity: "base" });
  });
}

/** Re-applies shared procedures to secondary subcategories for site + seed listing index. */
export function applyAdditionalProcedureListings(catalog: ServicesCatalog): ServicesCatalog {
  const procedureLookup = buildProcedureLookup(catalog);
  const placementsBySubcategory = new Map<string, AdditionalProcedureListing[]>();

  for (const entry of ADDITIONAL_PROCEDURE_LISTINGS) {
    const key = `${entry.categorySlug}/${entry.subcategorySlug}`;
    const bucket = placementsBySubcategory.get(key) ?? [];
    bucket.push(entry);
    placementsBySubcategory.set(key, bucket);
  }

  return {
    ...catalog,
    categories: catalog.categories.map((category) => ({
      ...category,
      subcategories: category.subcategories.map((subcategory) => {
        const key = `${category.id}/${subcategory.id}`;
        const extraPlacements = placementsBySubcategory.get(key) ?? [];
        if (extraPlacements.length === 0) {
          return subcategory;
        }

        const orderById = new Map<string, number>();
        const extraProcedures: ServiceProcedure[] = [];

        for (const placement of extraPlacements) {
          const procedure = procedureLookup.get(placement.procedureSlug);
          if (!procedure) continue;
          orderById.set(procedure.id, placement.sortOrder);
          extraProcedures.push(procedure);
        }

        const mergedIds = new Set(subcategory.procedures.map((procedure) => procedure.id));
        const mergedProcedures = [
          ...subcategory.procedures,
          ...extraProcedures.filter((procedure) => !mergedIds.has(procedure.id)),
        ];

        return {
          ...subcategory,
          procedures: sortProcedures(mergedProcedures, orderById),
        } satisfies ServiceSubcategory;
      }),
    })) satisfies ServiceCategory[],
  };
}

export function finalizeStaticServicesCatalog(catalog: ServicesCatalog): ServicesCatalog {
  return applyAdditionalProcedureListings(dedupeCanonicalProcedurePlacements(catalog));
}
