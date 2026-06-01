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
              S.documentTypeListItem("landingPage").title(
                "Landing pages (About → brand logos)",
              ),
              S.listItem()
                .title("Site settings (phone · email · address)")
                .child(
                  S.documentList()
                    .title("Site settings — updates contact & footer")
                    .filter('_type == "siteSettings"')
                    .defaultOrdering([{ field: "language", direction: "asc" }]),
                ),
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
              S.listItem()
                .title("Treatments hub page (/treatments)")
                .child(
                  S.document().schemaType("treatmentsHub").documentId("treatmentsHub"),
                ),
              S.documentTypeListItem("treatmentConcern").title(
                "Treatment concerns (goals)",
              ),
              S.divider(),
              S.documentTypeListItem("serviceCategory").title(
                "1. Categories (homepage & menu flags)",
              ),
              S.documentTypeListItem("serviceSubcategory").title(
                "2. Subcategories — pick a parent category",
              ),
              S.documentTypeListItem("serviceProcedure").title(
                "3. Procedures — pick a subcategory + concerns",
              ),
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
