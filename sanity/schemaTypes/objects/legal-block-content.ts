import { defineArrayMember, defineType } from "sanity";

/** Rich text for legal sections (paragraphs, subheadings, bullet lists, links). */
export const legalBlockContent = defineType({
  name: "legalBlockContent",
  title: "Section body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Subheading", value: "h3" },
      ],
      lists: [{ title: "Bullet", value: "bullet" }],
      marks: {
        decorators: [{ title: "Strong", value: "strong" }],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "string",
                description: "https://…, mailto:…, tel:…, or /privacy",
                validation: (rule) => rule.required(),
              },
            ],
          },
        ],
      },
    }),
  ],
});
