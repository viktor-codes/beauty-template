import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Skinbar")
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
        .title("Services (shared structure)")
        .child(
          S.list()
            .title("Services")
            .items([
              S.documentTypeListItem("serviceCategory").title("Categories"),
              S.documentTypeListItem("serviceSubcategory").title("Subcategories"),
              S.documentTypeListItem("serviceProcedure").title("Procedures"),
            ]),
        ),
    ]);
