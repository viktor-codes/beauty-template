import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  appendSubcategoryListing,
  computeLinkDiff,
  removeSubcategoryListing,
  resolveNextSortOrder,
} from "../../sanity/lib/subcategory-procedure-links";

describe("subcategory-procedure-links", () => {
  it("appends and removes subcategory listings", () => {
    const subcategoryId = "serviceSubcategory-cosmetology-biorevitalisation";
    const withListing = appendSubcategoryListing([], subcategoryId, 0);

    assert.equal(withListing.length, 1);
    assert.equal(withListing[0]?.subcategory?._ref, subcategoryId);

    const withoutListing = removeSubcategoryListing(withListing, subcategoryId);
    assert.equal(withoutListing.length, 0);
  });

  it("computes added and removed procedure ids", () => {
    const diff = computeLinkDiff(["a", "b"], ["b", "c"]);
    assert.deepEqual(diff, { added: ["c"], removed: ["a"] });
  });

  it("resolves next sort order from existing listings", () => {
    assert.equal(resolveNextSortOrder([{ sortOrder: 2 }, { sortOrder: 5 }]), 6);
  });
});
