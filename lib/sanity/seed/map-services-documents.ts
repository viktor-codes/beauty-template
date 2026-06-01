import type { ServicesCatalog } from "@/lib/types/services";

import { getStaticCategoryFeatureFlags } from "@/lib/services/category-feature-flags";
import { STATIC_CATEGORY_SHORT_TITLES } from "@/lib/services/category-short-titles";
import { getCategoryLocaleCopy } from "@/lib/sanity/seed/service-category-locale-copy";
import {
  toLocaleStringEnOnly,
  toLocaleStringI18n,
  toLocaleTextI18n,
} from "@/lib/sanity/seed/to-locale-fields";

type SanitySeedDoc = Record<string, unknown> & { _id: string; _type: string };

function categoryDocId(slug: string) {
  return `serviceCategory-${slug}`;
}

function subcategoryDocId(categorySlug: string, subSlug: string) {
  return `serviceSubcategory-${categorySlug}-${subSlug}`;
}

function procedureDocId(categorySlug: string, subSlug: string, procedureSlug: string) {
  return `serviceProcedure-${categorySlug}-${subSlug}-${procedureSlug}`;
}

/** Builds serviceCategory / serviceSubcategory / serviceProcedure documents from static catalog. */
export function buildServiceDocuments(catalog: ServicesCatalog): SanitySeedDoc[] {
  const docs: SanitySeedDoc[] = [];
  let categoryOrder = 0;

  for (const category of catalog.categories) {
    const categoryId = categoryDocId(category.id);
    const flags = getStaticCategoryFeatureFlags(category.id);
    const shortTitle = STATIC_CATEGORY_SHORT_TITLES[category.id];
    const ukCopy = getCategoryLocaleCopy(category.id, "uk");
    const ruCopy = getCategoryLocaleCopy(category.id, "ru");

    docs.push({
      _id: categoryId,
      _type: "serviceCategory",
      slug: { _type: "slug", current: category.id },
      title: toLocaleStringI18n(category.title, ukCopy?.title, ruCopy?.title),
      ...(shortTitle ? { shortTitle } : {}),
      description: toLocaleTextI18n(
        category.description,
        ukCopy?.description,
        ruCopy?.description,
      ),
      sortOrder: flags.sortOrder ?? categoryOrder,
      featuredOnHomepage: flags.featuredOnHomepage ?? false,
      featuredInNav: flags.featuredInNav ?? false,
    });
    categoryOrder += 1;

    let subOrder = 0;
    for (const subcategory of category.subcategories) {
      const subId = subcategoryDocId(category.id, subcategory.id);
      docs.push({
        _id: subId,
        _type: "serviceSubcategory",
        category: { _type: "reference", _ref: categoryId },
        slug: { _type: "slug", current: subcategory.id },
        title: toLocaleStringEnOnly(subcategory.title),
        description: toLocaleTextI18n(subcategory.description),
        sortOrder: subOrder,
      });
      subOrder += 1;

      let procOrder = 0;
      for (const procedure of subcategory.procedures) {
        docs.push({
          _id: procedureDocId(category.id, subcategory.id, procedure.id),
          _type: "serviceProcedure",
          subcategory: { _type: "reference", _ref: subId },
          slug: { _type: "slug", current: procedure.id },
          title: toLocaleStringEnOnly(procedure.title),
          description: toLocaleTextI18n(procedure.description),
          price: procedure.price
            ? { amount: procedure.price.amount, currency: procedure.price.currency }
            : undefined,
          sortOrder: procOrder,
        });
        procOrder += 1;
      }
    }
  }

  return docs;
}
