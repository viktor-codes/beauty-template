import {
  contentLinkFields,
  faqGroupFields,
  faqItemFields,
  footerLinkGroupFields,
  sanityImageFields,
} from "@/lib/sanity/queries/fragments";

/** Document i18n: one `landingPage` per locale (`language` from plugin). */
export const landingPageQuery = /* groq */ `
  *[_type == "landingPage" && language == $locale][0]{
    _id,
    language,
    nav {
      links[] {
        ${contentLinkFields}
      },
      cta {
        ${contentLinkFields}
      }
    },
    footer {
      brandTitle,
      tagline,
      navigation {
        ${footerLinkGroupFields}
      },
      services {
        ${footerLinkGroupFields}
      },
      contact {
        heading,
        phone {
          ${contentLinkFields}
        },
        email {
          ${contentLinkFields}
        },
        address,
        directionsHref,
        directionsLabel
      },
      social {
        ${footerLinkGroupFields}
      },
      legal {
        notice,
        links[] {
          ${contentLinkFields}
        }
      },
      developerCredit {
        lead,
        brandLabel,
        tail,
        href
      }
    },
    hero {
      eyebrow,
      title,
      subtitle,
      primaryCtaLabel,
      secondaryCtaLabel,
      primaryCtaHref,
      secondaryCtaHref,
      image {
        ${sanityImageFields}
      }
    },
    about {
      eyebrow,
      title,
      description,
      stats[] {
        value,
        label
      },
      brandsEyebrow,
      brandLogos[] {
        alt,
        width,
        height,
        image {
          ${sanityImageFields}
        }
      }
    },
    gallery {
      eyebrow,
      title,
      instagramUrl
    },
    reviews {
      eyebrow,
      title,
      items[] {
        quote,
        authorName,
        authorRole
      }
    },
    faq {
      eyebrow,
      title,
      description,
      introBullets,
      groups[] {
        ${faqGroupFields}
      },
      items[] {
        ${faqItemFields}
      }
    }
  }
`;
