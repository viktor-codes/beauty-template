import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { buildServiceDocuments } from "@/lib/sanity/seed/map-services-documents";
import { servicesCatalog } from "@/lib/services/catalog";
import {
  collectProcedureListingIndex,
  procedureDocumentId,
} from "@/lib/services/procedure-listings";

describe("procedure dedupe seed", () => {
  it("builds one Sanity document per unique procedure slug", () => {
    const listingIndex = collectProcedureListingIndex(servicesCatalog);
    const docs = buildServiceDocuments(servicesCatalog);
    const procedureDocs = docs.filter((doc) => doc._type === "serviceProcedure");

    assert.equal(listingIndex.size, 105);
    assert.equal(procedureDocs.length, 105);

    for (const [slug, placements] of listingIndex) {
      assert.equal(procedureDocumentId(slug), `serviceProcedure-${slug}`);
      const doc = procedureDocs.find((item) => item._id === procedureDocumentId(slug));
      assert.ok(doc, `missing doc for ${slug}`);

      const listedIn = doc.listedIn as Array<{ subcategory: { _ref: string }; sortOrder: number }>;
      assert.equal(listedIn.length, placements.length);
    }
  });

  it("lists profhilo-2ml in cosmetology and aesthetic-injections", () => {
    const docs = buildServiceDocuments(servicesCatalog);
    const doc = docs.find((item) => item._id === "serviceProcedure-profhilo-2ml");
    assert.ok(doc);

    const listedIn = doc?.listedIn as Array<{ subcategory: { _ref: string } }>;
    const subcategoryIds = listedIn.map((entry) => entry.subcategory._ref);

    assert.ok(subcategoryIds.includes("serviceSubcategory-cosmetology-biorevitalisation"));
    assert.ok(subcategoryIds.includes("serviceSubcategory-aesthetic-injections-biorevitalisation"));
  });
});
