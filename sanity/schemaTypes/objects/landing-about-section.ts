import { defineArrayMember, defineField, defineType } from "sanity";

const MAX_BRAND_LOGOS = 12;

export const landingAboutSection = defineType({
  name: "landingAboutSection",
  title: "About",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 6 }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [defineArrayMember({ type: "aboutStat" })],
    }),
    defineField({ name: "brandsEyebrow", title: "Brands eyebrow", type: "string" }),
    defineField({
      name: "brandLogos",
      title: "Brand partner logos",
      description:
        "Logos shown in the marquee below the stats. Upload each file here — order matches left-to-right on the site. Re-run seed only if you need to reset all logos from the repo.",
      type: "array",
      validation: (rule) =>
        rule.max(MAX_BRAND_LOGOS).error(`Maximum ${MAX_BRAND_LOGOS} brand logos per landing page.`),
      of: [defineArrayMember({ type: "brandLogo" })],
    }),
  ],
});
