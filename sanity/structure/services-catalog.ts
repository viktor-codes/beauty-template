import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureBuilder, StructureResolverContext } from "sanity/structure";

import { resolveCategoryContext } from "./catalog-ids";

const CATEGORY_ORDERING = [
  { field: "orderRank", direction: "asc" as const },
  { field: "sortOrder", direction: "asc" as const },
  { field: "title.en", direction: "asc" as const },
];

const NESTED_ORDERING = [
  { field: "orderRank", direction: "asc" as const },
  { field: "sortOrder", direction: "asc" as const },
  { field: "title.en", direction: "asc" as const },
];

function buildSubcategoryPane(
  S: StructureBuilder,
  context: StructureResolverContext,
  subcategoryId: string,
) {
  return S.list()
    .title("Subcategory")
    .items([
      S.listItem()
        .title("Edit subcategory")
        .child(S.document().schemaType("serviceSubcategory").documentId(subcategoryId)),
      orderableDocumentListDeskItem({
        type: "serviceProcedure",
        title: "Procedures",
        id: `orderable-procedures-${subcategoryId}`,
        filter: '_type == "serviceProcedure" && subcategory._ref == $subcategoryId',
        params: { subcategoryId },
        createIntent: false,
        menuItems: [
          S.menuItem()
            .title("Create procedure")
            .intent({
              type: "create",
              params: {
                type: "serviceProcedure",
                template: "procedure-in-subcategory",
                subcategoryId,
              },
            }),
        ],
        S,
        context,
      }),
    ]);
}

function buildCategoryPane(
  S: StructureBuilder,
  context: StructureResolverContext,
  categoryId: string,
) {
  const { categoryDocumentId, subcategoryRefPattern } = resolveCategoryContext(categoryId);

  return S.list()
    .title("Category")
    .items([
      S.listItem()
        .title("All procedures in category")
        .child(
          S.documentTypeList("serviceProcedure")
            .title("All procedures")
            // WHY: Structure Builder filters cannot use GROQ joins (`->`).
            // Match subcategory _id prefix instead: serviceSubcategory-{slug}-*
            .filter("subcategory._ref match $subcategoryRefPattern")
            .params({ subcategoryRefPattern })
            .defaultOrdering(NESTED_ORDERING),
        ),
      S.listItem()
        .title("Edit category")
        .child(S.document().schemaType("serviceCategory").documentId(categoryDocumentId)),
      S.listItem()
        .title("Subcategories")
        .child(
          S.documentTypeList("serviceSubcategory")
            .title("Subcategories")
            .filter('category._ref == $categoryDocumentId')
            .params({ categoryDocumentId })
            .defaultOrdering(NESTED_ORDERING)
            .initialValueTemplates([
              S.initialValueTemplateItem("subcategory-in-category", {
                categoryId: categoryDocumentId,
              }),
            ])
            .child((subcategoryId) => buildSubcategoryPane(S, context, subcategoryId)),
        ),
      orderableDocumentListDeskItem({
        type: "serviceSubcategory",
        title: "Reorder subcategories",
        id: `orderable-subcategories-${categoryDocumentId}`,
        filter: 'category._ref == $categoryDocumentId',
        params: { categoryDocumentId },
        createIntent: false,
        menuItems: [
          S.menuItem()
            .title("Create subcategory")
            .intent({
              type: "create",
              params: {
                type: "serviceSubcategory",
                template: "subcategory-in-category",
                categoryId: categoryDocumentId,
              },
            }),
        ],
        S,
        context,
      }),
    ]);
}

export function buildCatalogDeskItem(S: StructureBuilder, context: StructureResolverContext) {
  return S.listItem()
    .title("Catalog")
    .child(
      S.list()
        .title("Catalog")
        .items([
          S.listItem()
            .title("All procedures")
            .child(
              S.documentTypeList("serviceProcedure")
                .title("All procedures")
                .defaultOrdering(NESTED_ORDERING),
            ),
          S.listItem()
            .title("Browse by category")
            .child(
              S.documentTypeList("serviceCategory")
                .title("Categories")
                .defaultOrdering(CATEGORY_ORDERING)
                .child((categoryId) => buildCategoryPane(S, context, categoryId)),
            ),
          orderableDocumentListDeskItem({
            type: "serviceCategory",
            title: "Reorder categories",
            id: "orderable-service-categories",
            S,
            context,
          }),
        ]),
    );
}

export function buildOrderableConcernsDeskItem(
  S: StructureBuilder,
  context: StructureResolverContext,
) {
  return orderableDocumentListDeskItem({
    type: "treatmentConcern",
    title: "Browse by concern",
    id: "orderable-treatment-concerns",
    S,
    context,
  });
}
