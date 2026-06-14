import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureBuilder, StructureResolverContext } from "sanity/structure";

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
  return S.list()
    .title("Category")
    .items([
      S.listItem()
        .title("All procedures in category")
        .child(
          S.documentList()
            .title("All procedures")
            .schemaType("serviceProcedure")
            .filter(
              '_type == "serviceProcedure" && subcategory._ref in *[_type == "serviceSubcategory" && category._ref == $categoryId][]._id',
            )
            .params({ categoryId })
            .defaultOrdering(NESTED_ORDERING),
        ),
      S.listItem()
        .title("Edit category")
        .child(S.document().schemaType("serviceCategory").documentId(categoryId)),
      S.listItem()
        .title("Subcategories")
        .child(
          S.documentTypeList("serviceSubcategory")
            .title("Subcategories")
            .filter('_type == "serviceSubcategory" && category._ref == $categoryId')
            .params({ categoryId })
            .defaultOrdering(NESTED_ORDERING)
            .initialValueTemplates([
              S.initialValueTemplateItem("subcategory-in-category", { categoryId }),
            ])
            .child((subcategoryId) => buildSubcategoryPane(S, context, subcategoryId)),
        ),
      orderableDocumentListDeskItem({
        type: "serviceSubcategory",
        title: "Reorder subcategories",
        id: `orderable-subcategories-${categoryId}`,
        filter: '_type == "serviceSubcategory" && category._ref == $categoryId',
        params: { categoryId },
        createIntent: false,
        menuItems: [
          S.menuItem()
            .title("Create subcategory")
            .intent({
              type: "create",
              params: {
                type: "serviceSubcategory",
                template: "subcategory-in-category",
                categoryId,
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
