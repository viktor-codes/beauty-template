export interface ProcedureCatalogListing {
  _key?: string;
  subcategory?: { _type?: "reference"; _ref?: string };
  sortOrder?: number;
}

export interface ProcedureOption {
  _id: string;
  title: string;
  primarySubcategory: string | null;
}

export function appendSubcategoryListing(
  existing: ProcedureCatalogListing[] | null | undefined,
  subcategoryId: string,
  sortOrder: number,
): ProcedureCatalogListing[] {
  const listings = existing ?? [];
  if (listings.some((listing) => listing.subcategory?._ref === subcategoryId)) {
    return listings;
  }

  return [
    ...listings,
    {
      _key: subcategoryId,
      subcategory: { _type: "reference", _ref: subcategoryId },
      sortOrder,
    },
  ];
}

export function removeSubcategoryListing(
  existing: ProcedureCatalogListing[] | null | undefined,
  subcategoryId: string,
): ProcedureCatalogListing[] {
  return (existing ?? []).filter((listing) => listing.subcategory?._ref !== subcategoryId);
}

export function computeLinkDiff(
  previousIds: string[],
  nextIds: string[],
): { added: string[]; removed: string[] } {
  const previous = new Set(previousIds);
  const next = new Set(nextIds);

  return {
    added: nextIds.filter((id) => !previous.has(id)),
    removed: previousIds.filter((id) => !next.has(id)),
  };
}

export function filterProcedureOptions(
  options: ProcedureOption[],
  query: string,
): ProcedureOption[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return options;

  return options.filter((option) => {
    const haystack = `${option.title} ${option.primarySubcategory ?? ""}`.toLowerCase();
    return haystack.includes(normalized);
  });
}

export function resolveNextSortOrder(
  existing: ProcedureCatalogListing[] | null | undefined,
): number {
  const orders = (existing ?? [])
    .map((listing) => listing.sortOrder)
    .filter((value): value is number => typeof value === "number");

  if (orders.length === 0) return 0;
  return Math.max(...orders) + 1;
}
