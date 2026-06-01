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
              S.listItem()
                .title("Legal pages")
                .child(
                  S.list()
                    .title("Legal pages")
                    .items([
                      S.listItem()
                        .title("Privacy policy")
                        .child(
                          S.documentList()
                            .title("Privacy policy")
                            .filter('_type == "legalPage" && slug == "privacy"')
                            .defaultOrdering([{ field: "language", direction: "asc" }]),
                        ),
                      S.listItem()
                        .title("Terms & conditions")
                        .child(
                          S.documentList()
                            .title("Terms & conditions")
                            .filter('_type == "legalPage" && slug == "terms"')
                            .defaultOrdering([{ field: "language", direction: "asc" }]),
                        ),
                    ]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Services (edit prices & copy here)")
        .child(
          S.list()
            .title("Services")
            .items([
              S.documentTypeListItem("serviceCategory").title(
                "1. Categories (homepage & menu flags)",
              ),
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
                          S.listItem()
                            .title("Subcategories")
                            .child(
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
                            ),
                        ]),
                    ),
                ),
            ]),
        ),
    ]);
