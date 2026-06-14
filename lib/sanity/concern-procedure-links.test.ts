import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  appendConcernReference,
  computeLinkDiff,
  filterProcedureOptions,
  removeConcernReference,
} from "../../sanity/lib/concern-procedure-links";

describe("concern-procedure-links", () => {
  it("computes added and removed procedure ids", () => {
    const diff = computeLinkDiff(["a", "b"], ["b", "c"]);
    assert.deepEqual(diff, { added: ["c"], removed: ["a"] });
  });

  it("appends concern reference without duplicates", () => {
    const concernId = "treatmentConcern-acne";
    const first = appendConcernReference(undefined, concernId, "key-1");
    const second = appendConcernReference(first, concernId, "key-2");

    assert.equal(first.length, 1);
    assert.equal(second.length, 1);
    assert.equal(second[0]?._ref, concernId);
  });

  it("removes concern reference from procedure concerns array", () => {
    const concernId = "treatmentConcern-acne";
    const refs = appendConcernReference(undefined, concernId, "key-1");
    const next = removeConcernReference(refs, concernId);

    assert.equal(next.length, 0);
  });

  it("filters procedure options by title and subcategory", () => {
    const filtered = filterProcedureOptions(
      [
        { _id: "1", title: "TCA peel", subcategory: "Peels" },
        { _id: "2", title: "Botox", subcategory: "Injections" },
      ],
      "peel",
    );

    assert.equal(filtered.length, 1);
    assert.equal(filtered[0]?._id, "1");
  });
});
