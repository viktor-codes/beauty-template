import { buildSeedOrderRank } from "@/lib/sanity/seed/build-order-rank";
import type { ServicesCatalog } from "@/lib/types/services";

import { getStaticCategoryFeatureFlags } from "@/lib/services/category-feature-flags";
import { STATIC_CATEGORY_SHORT_TITLES } from "@/lib/services/category-short-titles";
import { getProcedureConcernRefs } from "@/lib/sanity/seed/map-treatment-concerns";
import {
  getCategoryLocaleCopyField,
  getProcedureLocaleCopy,
  getSubcategoryLocaleCopy,
} from "@/lib/services/locale-copy/get";
import {
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
    const ukCopy = getCategoryLocaleCopyField(category.id, "uk");
    const ruCopy = getCategoryLocaleCopyField(category.id, "ru");

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
      isActive: true,
      orderRank: buildSeedOrderRank(categoryOrder),
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
        title: toLocaleStringI18n(
          subcategory.title,
          getSubcategoryLocaleCopy(subcategory.id, "uk")?.title,
          getSubcategoryLocaleCopy(subcategory.id, "ru")?.title,
        ),
        description: toLocaleTextI18n(
          subcategory.description,
          getSubcategoryLocaleCopy(subcategory.id, "uk")?.description,
          getSubcategoryLocaleCopy(subcategory.id, "ru")?.description,
        ),
        sortOrder: subOrder,
        isActive: true,
        orderRank: buildSeedOrderRank(subOrder),
      });
      subOrder += 1;

      let procOrder = 0;
      for (const procedure of subcategory.procedures) {
        const concernRefs = getProcedureConcernRefs(
          category.id,
          subcategory.id,
          procedure.id,
        );

        docs.push({
          _id: procedureDocId(category.id, subcategory.id, procedure.id),
          _type: "serviceProcedure",
          subcategory: { _type: "reference", _ref: subId },
          slug: { _type: "slug", current: procedure.id },
          title: toLocaleStringI18n(
            procedure.title,
            getProcedureLocaleCopy(procedure.id, "uk")?.title,
            getProcedureLocaleCopy(procedure.id, "ru")?.title,
          ),
          description: toLocaleTextI18n(
            procedure.description,
            getProcedureLocaleCopy(procedure.id, "uk")?.description,
            getProcedureLocaleCopy(procedure.id, "ru")?.description,
          ),
          price: procedure.price
            ? { amount: procedure.price.amount, currency: procedure.price.currency }
            : undefined,
          sortOrder: procOrder,
          isActive: true,
          orderRank: buildSeedOrderRank(procOrder),
          ...(concernRefs.length > 0 ? { concerns: concernRefs } : {}),
        });
        procOrder += 1;
      }
    }
  }

  return docs;
}
