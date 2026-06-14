export interface SanityConcernReference {
  _type: "reference";
  _ref: string;
  _key: string;
}

export interface ProcedureOption {
  _id: string;
  title: string;
  subcategory: string | null;
}

export function createConcernReference(concernId: string, key: string): SanityConcernReference {
  return { _type: "reference", _ref: concernId, _key: key };
}

export function appendConcernReference(
  existing: SanityConcernReference[] | null | undefined,
  concernId: string,
  key: string,
): SanityConcernReference[] {
  const refs = existing ?? [];
  if (refs.some((ref) => ref._ref === concernId)) {
    return refs;
  }
  return [...refs, createConcernReference(concernId, key)];
}

export function removeConcernReference(
  existing: SanityConcernReference[] | null | undefined,
  concernId: string,
): SanityConcernReference[] {
  return (existing ?? []).filter((ref) => ref._ref !== concernId);
}

export function computeLinkDiff(
  previousIds: string[],
  nextIds: string[],
): { added: string[]; removed: string[] } {
  const previous = new Set(previousIds);
  const next = new Set(nextIds);

  return {
    added: nextIds.filter((id) => !previous.has(id)),
    removed: previousIds.filter((id) => !next.has(id)),
  };
}

export function filterProcedureOptions(
  options: ProcedureOption[],
  query: string,
): ProcedureOption[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return options;

  return options.filter((option) => {
    const haystack = `${option.title} ${option.subcategory ?? ""}`.toLowerCase();
    return haystack.includes(normalized);
  });
}
