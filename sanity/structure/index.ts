import type { StructureResolver } from "sanity/structure";

import { buildCatalogDeskItem } from "./services-catalog";
import { buildConcernsDeskItem } from "./concerns";

export const structure: StructureResolver = (S, context) =>
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
        .title("Services")
        .child(
          S.list()
            .title("Services")
            .items([
              S.listItem()
                .title("Treatments hub (/treatments)")
                .child(
                  S.document().schemaType("treatmentsHub").documentId("treatmentsHub"),
                ),
              buildConcernsDeskItem(S, context),
              buildCatalogDeskItem(S, context),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Gift voucher (/gift-voucher)")
        .child(
          S.document().schemaType("giftVoucherSettings").documentId("giftVoucherSettings"),
        ),
      S.documentTypeListItem("giftVoucherOrder").title("Gift voucher orders"),
    ]);
