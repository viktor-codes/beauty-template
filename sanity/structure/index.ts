import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("The Skinbar")
    .items([
      S.listItem()
        .title("Site (per locale)")
        .child(
          S.list()
            .title("Site")
            .items([
              S.documentTypeListItem("landingPage").title("Landing pages"),
              S.documentTypeListItem("siteSettings").title("Site settings"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Services (edit prices & copy here)")
        .child(
          S.list()
            .title("Services")
            .items([
              S.documentTypeListItem("serviceCategory").title("1. Categories"),
              S.documentTypeListItem("serviceSubcategory").title("2. Subcategories"),
              S.documentTypeListItem("serviceProcedure").title("3. Procedures"),
              S.divider(),
              S.listItem()
                .title("Browse by category")
                .child(
                  S.documentTypeList("serviceCategory")
                    .title("Categories")
                    .child((categoryId) =>
                      S.list()
                        .title("Category tree")
                        .items([
                          S.listItem()
                            .title("Edit category")
                            .child(
                              S.document()
                                .schemaType("serviceCategory")
                                .documentId(categoryId),
                            ),
                          S.documentTypeList("serviceSubcategory")
                            .title("Subcategories")
                            .filter(
                              '_type == "serviceSubcategory" && category._ref == $categoryId',
                            )
                            .params({ categoryId })
                            .child((subcategoryId) =>
                              S.documentTypeList("serviceProcedure")
                                .title("Procedures")
                                .filter(
                                  '_type == "serviceProcedure" && subcategory._ref == $subcategoryId',
                                )
                                .params({ subcategoryId }),
                            ),
                        ]),
                    ),
                ),
            ]),
        ),
    ]);
