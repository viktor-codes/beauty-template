import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { servicesCatalog } from "@/lib/services/catalog";
import { ADDITIONAL_PROCEDURE_LISTINGS } from "@/lib/services/procedure-additional-listings";
import { collectProcedureListingIndex } from "@/lib/services/procedure-listings";

describe("procedure additional listings", () => {
  it("keeps shared procedures in secondary subcategories after catalog finalize", () => {
    const index = collectProcedureListingIndex(servicesCatalog);

    assert.equal(ADDITIONAL_PROCEDURE_LISTINGS.length, 18);
    assert.equal(index.get("profhilo-2ml")?.length, 2);
    assert.equal(index.get("stylage-m")?.length, 2);
  });
});
