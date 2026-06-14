import { defineField } from "sanity";

interface CatalogSlugFieldOptions {
  urlHint: string;
  source?: string;
}

export function catalogSlugField({ urlHint, source = "title.en" }: CatalogSlugFieldOptions) {
  return defineField({
    name: "slug",
    title: "Slug",
    type: "slug",
    description: `${urlHint} Auto-generated from English title. Contact developer to change after publish.`,
    options: { source, maxLength: 96 },
    readOnly: ({ value }) => Boolean(value?.current),
    validation: (rule) => rule.required(),
  });
}
