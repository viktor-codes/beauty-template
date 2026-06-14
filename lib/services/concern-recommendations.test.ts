import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getConcernRecommendations } from "@/lib/services/concern-recommendations";
import { servicesCatalog } from "@/lib/services/catalog";

describe("getConcernRecommendations", () => {
  it("returns each procedure once even when listed in multiple categories", () => {
    const hits = getConcernRecommendations("glow", servicesCatalog);
    const profhiloHits = hits.filter((hit) => hit.procedure.id === "profhilo-2ml");

    assert.ok(profhiloHits.length <= 1);
  });
});
