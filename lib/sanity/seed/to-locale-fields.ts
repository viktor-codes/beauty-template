/** Duplicates EN copy into uk/ru until services translations exist in static data. */
export function toLocaleString(value: string) {
  return { en: value, uk: value, ru: value };
}

export function toLocaleText(value: string) {
  return { en: value, uk: value, ru: value };
}
