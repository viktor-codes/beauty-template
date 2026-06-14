/**
 * Captures slug + price baseline from the static EN catalog.
 * Used before services-catalog CMS UX changes (Phase 0.3).
 *
 * Run: pnpm baseline:catalog
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { servicesCatalog } from "@/lib/services";
import { buildProcedurePath } from "@/lib/services/procedure-path";

interface ProcedureBaselineEntry {
  documentId: string;
  categorySlug: string;
  subcategorySlug: string;
  procedureSlug: string;
  title: string;
  price: { amount: number; currency: "EUR" } | null;
  path: string;
}

function buildDocumentId(
  categorySlug: string,
  subcategorySlug: string,
  procedureSlug: string,
): string {
  return `serviceProcedure-${categorySlug}-${subcategorySlug}-${procedureSlug}`;
}

function captureBaseline(): {
  capturedAt: string;
  source: string;
  counts: {
    categories: number;
    subcategories: number;
    procedures: number;
    uniqueProcedureSlugs: number;
  };
  procedures: ProcedureBaselineEntry[];
} {
  const procedures: ProcedureBaselineEntry[] = [];
  let subcategoryCount = 0;

  for (const category of servicesCatalog.categories) {
    for (const subcategory of category.subcategories) {
      subcategoryCount += 1;

      for (const procedure of subcategory.procedures) {
        procedures.push({
          documentId: buildDocumentId(category.id, subcategory.id, procedure.id),
          categorySlug: category.id,
          subcategorySlug: subcategory.id,
          procedureSlug: procedure.id,
          title: procedure.title,
          price: procedure.price ?? null,
          path: buildProcedurePath({
            category,
            subcategory,
            procedure,
          }),
        });
      }
    }
  }

  procedures.sort((a, b) => a.path.localeCompare(b.path));

  const uniqueProcedureSlugs = new Set(procedures.map((p) => p.procedureSlug)).size;

  return {
    capturedAt: new Date().toISOString().slice(0, 10),
    source: "static catalog (servicesCatalog en)",
    counts: {
      categories: servicesCatalog.categories.length,
      subcategories: subcategoryCount,
      procedures: procedures.length,
      uniqueProcedureSlugs,
    },
    procedures,
  };
}

const baseline = captureBaseline();
const outputPath = resolve(
  process.cwd(),
  "docs/checklists/catalog-ux-baseline-snapshot.json",
);

writeFileSync(outputPath, `${JSON.stringify(baseline, null, 2)}\n`, "utf8");

console.log(
  `Baseline captured: ${baseline.counts.procedures} paths (${baseline.counts.uniqueProcedureSlugs} unique slugs)`,
);
console.log(`Written to ${outputPath}`);
