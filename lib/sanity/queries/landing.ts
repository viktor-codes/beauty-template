import {
  contactMessengerFields,
  contentLinkFields,
  faqGroupFields,
  faqItemFields,
  footerLinkGroupFields,
  sanityImageFields,
  servicesCategoryPreviewFields,
  servicesGoalPreviewFields,
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
      }
    },
    hero {
      eyebrow,
      title,
      subtitle,
      primaryCtaLabel,
      secondaryCtaLabel,
      primaryCtaHref,
      secondaryCtaHref
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
    services {
      eyebrow,
      title,
      description,
      categories[] {
        ${servicesCategoryPreviewFields}
      },
      goals[] {
        ${servicesGoalPreviewFields}
      },
      cta {
        ${contentLinkFields}
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
    },
    contact {
      eyebrow,
      title,
      description,
      phone,
      email,
      address,
      phoneLabel,
      emailLabel,
      locationTitle,
      messengers[] {
        ${contactMessengerFields}
      }
    }
  }
`;
