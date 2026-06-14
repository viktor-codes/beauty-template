import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import type { StructureBuilder, StructureResolverContext } from "sanity/structure";

import { resolveConcernDocumentId } from "./concern-ids";

const CONCERN_ORDERING = [
  { field: "orderRank", direction: "asc" as const },
  { field: "sortOrder", direction: "asc" as const },
  { field: "title.en", direction: "asc" as const },
];

const LINKED_PROCEDURE_ORDERING = [
  { field: "orderRank", direction: "asc" as const },
  { field: "sortOrder", direction: "asc" as const },
  { field: "title.en", direction: "asc" as const },
];

function buildConcernPane(S: StructureBuilder, concernId: string) {
  const concernDocumentId = resolveConcernDocumentId(concernId);

  return S.list()
    .title("Concern")
    .items([
      S.listItem()
        .title("Edit concern")
        .child(S.document().schemaType("treatmentConcern").documentId(concernDocumentId)),
      S.listItem()
        .title("Linked procedures")
        .child(
          S.documentTypeList("serviceProcedure")
            .title("Linked procedures")
            .filter('references($concernDocumentId) && isActive != false')
            .params({ concernDocumentId })
            .defaultOrdering(LINKED_PROCEDURE_ORDERING)
            .canHandleIntent((intent) => intent.action !== "create"),
        ),
    ]);
}

export function buildConcernsDeskItem(S: StructureBuilder, context: StructureResolverContext) {
  return S.listItem()
    .title("Browse by concern")
    .child(
      S.list()
        .title("Browse by concern")
        .items([
          S.listItem()
            .title("Concerns")
            .child(
              S.documentTypeList("treatmentConcern")
                .title("Concerns")
                .defaultOrdering(CONCERN_ORDERING)
                .child((concernId) => buildConcernPane(S, concernId)),
            ),
          orderableDocumentListDeskItem({
            type: "treatmentConcern",
            title: "Reorder concerns",
            id: "orderable-treatment-concerns",
            S,
            context,
          }),
        ]),
    );
}
