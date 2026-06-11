import { localeStringFields } from "@/lib/sanity/queries/fragments";

export const giftVoucherSettingsQuery = /* groq */ `
  *[_type == "giftVoucherSettings" && _id == "giftVoucherSettings"][0] {
    isEnabled,
    heroTitle { ${localeStringFields} },
    heroSubtitle { ${localeStringFields} },
    termsBlurb { ${localeStringFields} },
    validityMonths
  }
`;

export const giftVoucherProcedureRefQuery = /* groq */ `
  *[_type == "serviceProcedure" && slug.current == $slug][0]._id
`;

export const giftVoucherOrderBySessionQuery = /* groq */ `
  *[_type == "giftVoucherOrder" && stripeSessionId == $sessionId][0] {
    _id,
    status,
    code,
    emailsSentAt
  }
`;

export const giftVoucherOrderByIdQuery = /* groq */ `
  *[_type == "giftVoucherOrder" && _id == $id][0] {
    _id,
    status,
    code,
    emailsSentAt,
    recipientEmail,
    recipientName,
    senderEmail,
    senderName,
    personalMessage,
    procedureTitle,
    amount,
    currency,
    locale
  }
`;
