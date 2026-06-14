/** Normalize concern pane id from structure URL (slug or full document _id). */
export function resolveConcernDocumentId(concernId: string): string {
  return concernId.startsWith("treatmentConcern-")
    ? concernId
    : `treatmentConcern-${concernId}`;
}
