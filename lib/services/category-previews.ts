import type { ServicesCategoryPreview } from "@/lib/types/content";
import type { ServiceCategory, ServicesCatalog } from "@/lib/types/services";

const HOMEPAGE_CATEGORY_LIMIT = 4;
const NAV_CATEGORY_LIMIT = 5;

function compareBySortOrder(a: ServiceCategory, b: ServiceCategory): number {
  return (a.sortOrder ?? 0) - (b.sortOrder ?? 0);
}

function categoryToPreview(category: ServiceCategory): ServicesCategoryPreview {
  return {
    id: category.id,
    title: category.title,
    description: category.description,
    href: `/treatments/${category.id}`,
    featuredInNav: category.featuredInNav,
  };
}

function selectFeaturedCategories(
  categories: ServiceCategory[],
  flag: "featuredOnHomepage" | "featuredInNav",
  limit: number,
): ServiceCategory[] {
  const featured = categories.filter((category) => category[flag] === true).sort(compareBySortOrder);

  if (featured.length > 0) {
    return featured.slice(0, limit);
  }

  return [...categories].sort(compareBySortOrder).slice(0, limit);
}

/** Up to 4 categories for the landing services grid (`featuredOnHomepage`). */
export function buildHomepageCategoryPreviews(
  catalog: ServicesCatalog,
): ServicesCategoryPreview[] {
  return selectFeaturedCategories(
    catalog.categories,
    "featuredOnHomepage",
    HOMEPAGE_CATEGORY_LIMIT,
  ).map(categoryToPreview);
}

/** Up to 5 categories for the treatments nav dropdown (`featuredInNav`). */
export function buildNavCategoryPreviews(catalog: ServicesCatalog): ServicesCategoryPreview[] {
  return selectFeaturedCategories(catalog.categories, "featuredInNav", NAV_CATEGORY_LIMIT).map(
    categoryToPreview,
  );
}
