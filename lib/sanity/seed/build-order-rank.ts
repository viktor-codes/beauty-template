/** Stable lexorank-like strings for seed — compatible with @sanity/orderable-document-list sorting. */
export function buildSeedOrderRank(index: number): string {
  const bucket = (index + 1) * 4096;
  return `0|${bucket.toString(16).padStart(6, "0")}:`;
}
