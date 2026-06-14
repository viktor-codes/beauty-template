import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { mapServicesCatalogSafe } from "@/lib/sanity/mappers/services";

describe("mapServicesCatalogSafe", () => {
  it("keeps empty procedures when Sanity-backed subcategory has no procedures", () => {
    const catalog = mapServicesCatalogSafe(
      {
        categories: [
          {
            slug: { current: "body-slimming" },
            title: { en: "Body slimming" },
            description: { en: "Desc" },
            subcategories: [
              {
                slug: { current: "peels" },
                title: { en: "Peels" },
                description: { en: "Peels desc" },
                procedures: [],
              },
            ],
          },
        ],
      },
      "en",
    );

    const category = catalog.categories.find((c) => c.id === "body-slimming");
    assert.ok(category);
    const subcategory = category.subcategories.find((s) => s.id === "peels");
    assert.ok(subcategory);
    assert.equal(subcategory.procedures.length, 0);
  });

  it("keeps empty subcategories when Sanity-backed category has no subcategories", () => {
    const catalog = mapServicesCatalogSafe(
      {
        categories: [
          {
            slug: { current: "body-slimming" },
            title: { en: "Body slimming" },
            description: { en: "Desc" },
            subcategories: [],
          },
        ],
      },
      "en",
    );

    const category = catalog.categories.find((c) => c.id === "body-slimming");
    assert.ok(category);
    assert.equal(category.subcategories.length, 0);
  });

  it("appends static categories that are missing from Sanity response", () => {
    const catalog = mapServicesCatalogSafe(
      {
        categories: [
          {
            slug: { current: "cosmetology" },
            title: { en: "Cosmetology" },
            description: { en: "Desc" },
            subcategories: [],
          },
        ],
      },
      "en",
    );

    assert.ok(catalog.categories.some((c) => c.id === "cosmetology"));
    assert.ok(catalog.categories.some((c) => c.id === "body-slimming"));
  });

  it("keeps CMS UK procedure title when locale field is set", () => {
    const catalog = mapServicesCatalogSafe(
      {
        categories: [
          {
            slug: { current: "cosmetology" },
            title: { en: "Cosmetology", uk: "Косметологія" },
            description: { en: "Desc", uk: "Desc" },
            subcategories: [
              {
                slug: { current: "biorevitalisation" },
                title: { en: "Biorevitalisation", uk: "Biorevitalisation" },
                description: { en: "Biorevitalisation desc", uk: "Biorevitalisation desc" },
                procedures: [
                  {
                    slug: { current: "profhilo-2ml" },
                    title: { en: "Profhilo 2 ml", uk: "Profhilo 2 ml" },
                    description: { en: "English description", uk: "UA description" },
                    price: { amount: 400, currency: "EUR" },
                  },
                ],
              },
            ],
          },
        ],
      },
      "uk",
    );

    const procedure = catalog.categories
      .find((c) => c.id === "cosmetology")
      ?.subcategories.find((s) => s.id === "biorevitalisation")
      ?.procedures.find((p) => p.id === "profhilo-2ml");

    assert.ok(procedure);
    assert.equal(procedure.title, "Profhilo 2 ml");
  });
});
