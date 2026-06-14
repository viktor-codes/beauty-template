/**
 * Static fallback for category visibility flags when Sanity fields are unset.
 * Source of truth in CMS: `serviceCategory.featuredOnHomepage` / `featuredInNav`.
 */
export interface CategoryFeatureFlags {
  featuredOnHomepage?: boolean;
  featuredInNav?: boolean;
  sortOrder?: number;
}

/** Matches legacy landing static: 4 homepage cards, 5 nav dropdown items. */
export const STATIC_CATEGORY_FEATURE_FLAGS: Record<string, CategoryFeatureFlags> = {
  cosmetology: { featuredOnHomepage: true, featuredInNav: true, sortOrder: 0 },
  "body-slimming": { featuredOnHomepage: true, featuredInNav: true, sortOrder: 1 },
  "aesthetic-treatments": { featuredOnHomepage: true, sortOrder: 2 },
  "vitamin-shots": { featuredOnHomepage: true, featuredInNav: true, sortOrder: 3 },
  "blood-tests": { featuredInNav: true, sortOrder: 4 },
  "aesthetic-injections": { featuredInNav: true, sortOrder: 5 },
};

export function getStaticCategoryFeatureFlags(categoryId: string): CategoryFeatureFlags {
  return STATIC_CATEGORY_FEATURE_FLAGS[categoryId] ?? {};
}
