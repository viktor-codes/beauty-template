import { defineField, defineType } from "sanity";

/** Document i18n: one landing document per locale (plugin adds language field). */
export const landingPage = defineType({
  name: "landingPage",
  title: "Landing page",
  type: "document",
  groups: [
    { name: "chrome", title: "Header & footer", default: true },
    { name: "hero", title: "Hero" },
    { name: "about", title: "About" },
    { name: "services", title: "Services preview" },
    { name: "marketing", title: "Gallery, reviews, FAQ" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      readOnly: true,
      hidden: true,
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Ukrainian", value: "uk" },
          { title: "Russian", value: "ru" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "nav", type: "landingNavSection", group: "chrome" }),
    defineField({ name: "footer", type: "landingFooterSection", group: "chrome" }),
    defineField({ name: "hero", type: "landingHeroSection", group: "hero" }),
    defineField({ name: "about", type: "landingAboutSection", group: "about" }),
    defineField({ name: "services", type: "landingServicesSection", group: "services" }),
    defineField({ name: "gallery", type: "landingGallerySection", group: "marketing" }),
    defineField({ name: "reviews", type: "landingReviewsSection", group: "marketing" }),
    defineField({ name: "faq", type: "landingFaqSection", group: "marketing" }),
    defineField({ name: "contact", type: "landingContactSection", group: "contact" }),
    defineField({
      name: "contactForm",
      title: "Contact form copy",
      type: "landingContactForm",
      group: "contact",
    }),
  ],
  preview: {
    select: { language: "language", title: "hero.title" },
    prepare: ({ language, title }) => ({
      title: title ?? "Landing page",
      subtitle: language ? `Locale: ${language}` : undefined,
    }),
  },
});
