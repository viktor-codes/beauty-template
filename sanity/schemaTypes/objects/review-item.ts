import { defineField, defineType } from "sanity";

export const reviewItem = defineType({
  name: "reviewItem",
  title: "Review",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({
      name: "authorName",
      title: "Author name",
      type: "string",
      description: "Use the client’s real name or initials only with their consent to publish on the site.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "authorRole", title: "Author role / treatment", type: "string" }),
    defineField({
      name: "instagramSourceUrl",
      title: "Instagram source URL",
      type: "url",
      description:
        "Optional link to a post, Reel, or saved Highlight. Expired Stories need a Highlight permalink.",
      validation: (rule) =>
        rule.uri({
          scheme: ["http", "https"],
          allowRelative: false,
        }),
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "authorRole" },
  },
});
