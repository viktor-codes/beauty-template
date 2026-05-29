/** Adds `_key` to array objects missing it (required by Studio; seed/API often omit them). */
export function addMissingArrayKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => {
      const next = addMissingArrayKeys(item);
      if (next === null || typeof next !== "object" || Array.isArray(next)) {
        return next;
      }

      const record = next as Record<string, unknown>;
      if (record._key !== undefined && record._key !== "") {
        return record;
      }

      return { ...record, _key: createArrayItemKey(record) };
    }) as T;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;
    const out: Record<string, unknown> = {};

    for (const [key, child] of Object.entries(record)) {
      if (key === "_ref" || key === "_id" || key === "_rev") {
        out[key] = child;
        continue;
      }
      out[key] = addMissingArrayKeys(child);
    }

    return out as T;
  }

  return value;
}

function createArrayItemKey(item: Record<string, unknown>): string {
  const candidates = [
    item.id,
    item.href,
    item.label,
    item.heading,
    item.question,
    item.value,
    item.authorName,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      const slug = candidate
        .trim()
        .toLowerCase()
        .replace(/\W+/g, "-")
        .replace(/-+/g, "-")
        .slice(0, 48);
      if (slug) return slug;
    }
  }

  return crypto.randomUUID().replace(/-/g, "").slice(0, 12);
}
