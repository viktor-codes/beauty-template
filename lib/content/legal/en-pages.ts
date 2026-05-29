import { studioContact } from "@/lib/content/shared";
import {
  legalBulletItem,
  legalParagraph,
  legalSubheading,
  resetPortableTextKeys,
} from "@/lib/content/legal/portable-text-build";
import type { LegalPageContent, LegalPageSlug } from "@/lib/types/legal";

const { email, phone, phoneTelHref } = studioContact;

function buildPrivacyPage(): LegalPageContent {
  return {
    slug: "privacy",
    title: "Privacy policy",
    metaDescription:
      "GDPR-aligned privacy policy for The Skinbar: data controller, legal bases, Resend and analytics processors, retention, cookies, and your rights.",
    sections: [
      {
        heading: "1. Data Controller",
        body: [
          legalParagraph(
            { text: "The Skinbar by Inna Chernovol", isStrong: true },
            ", located in Athlone, Ireland, is the Data Controller for your personal data. For inquiries, contact us at ",
            { text: email, href: `mailto:${encodeURIComponent(email)}` },
            " or ",
            { text: phone, href: phoneTelHref },
            ".",
          ),
        ],
      },
      {
        heading: "2. Legal Basis for Processing",
        body: [
          legalParagraph("We process your personal data based on:"),
          legalBulletItem(
            { text: "Consent", isStrong: true },
            ": When you submit your details via our contact form, book an appointment, or accept cookies.",
          ),
          legalBulletItem(
            { text: "Legitimate Interest", isStrong: true },
            ": To provide services, communicate with you, and ensure safe and effective treatments.",
          ),
        ],
      },
      {
        heading: "3. Data Collection",
        body: [
          legalParagraph("We collect:"),
          legalBulletItem({ text: "Name", isStrong: true }),
          legalBulletItem({ text: "Phone number", isStrong: true }),
          legalBulletItem({ text: "Email address", isStrong: true }, " (if provided)"),
          legalBulletItem(
            { text: "Relevant medical information", isStrong: true },
            " (for treatment safety)",
          ),
          legalBulletItem(
            { text: "Cookie and similar data", isStrong: true },
            " (strictly necessary cookies, your consent preferences, and — if you opt in — analytics cookies for Google Analytics)",
          ),
        ],
      },
      {
        heading: "4. Use of Third-Party Processors",
        body: [
          legalBulletItem(
            { text: '"Resend"', isStrong: true },
            " is used to deliver contact form submissions. Resend complies with GDPR and processes data only as instructed.",
          ),
          legalBulletItem(
            { text: "Google Analytics (optional)", isStrong: true },
            ": If you enable analytics in our cookie banner, Google Analytics (GA4) may process usage data as described in Google's terms. We load GA4 only after you grant analytics consent. We use ",
            { text: "Google Consent Mode v2", isStrong: true },
            " so that analytics and advertising storage signals default to denied until you consent, and are updated when you make a choice in the banner.",
          ),
          legalParagraph(
            "We do not share your personal data with other third parties unless required by law or with your explicit consent.",
          ),
        ],
      },
      {
        heading: "5. Data Retention",
        body: [
          legalBulletItem(
            { text: "Appointment data", isStrong: true },
            ": Retained for ",
            { text: "2 years", isStrong: true },
            " after your last appointment.",
          ),
          legalBulletItem(
            { text: "Medical information", isStrong: true },
            ": Retained for ",
            { text: "7 years", isStrong: true },
            " as required by Irish law.",
          ),
          legalBulletItem(
            { text: "Cookie consent preferences", isStrong: true },
            ': Stored for up to ',
            { text: "12 months", isStrong: true },
            ' so we remember your choices (you can change them anytime via "Cookie settings" in the footer).',
          ),
          legalBulletItem(
            { text: "Analytics cookies (if enabled)", isStrong: true },
            ": Retained for up to ",
            { text: "26 months", isStrong: true },
            " (or as specified by Google Analytics / your browser).",
          ),
        ],
      },
      {
        heading: "6. Your Rights Under GDPR",
        body: [
          legalParagraph("You have the right to:"),
          legalBulletItem(
            { text: "Access", isStrong: true },
            ", ",
            { text: "rectify", isStrong: true },
            ", or ",
            { text: "erase", isStrong: true },
            " your personal data.",
          ),
          legalBulletItem(
            { text: "Restrict", isStrong: true },
            " or ",
            { text: "object", isStrong: true },
            " to processing.",
          ),
          legalBulletItem(
            { text: "Data portability", isStrong: true },
            " (receive your data in a structured format).",
          ),
          legalBulletItem(
            { text: "Withdraw consent", isStrong: true },
            " for cookies or marketing communications.",
          ),
          legalParagraph("To exercise these rights, contact us at ", {
            text: email,
            href: `mailto:${encodeURIComponent(email)}`,
          }, "."),
        ],
      },
      {
        heading: "7. Cookie Policy",
        body: [
          legalSubheading("What Are Cookies?"),
          legalParagraph(
            "Cookies are small text files stored on your device when you visit our website. They help us analyze traffic, improve performance, and personalize your experience.",
          ),
          legalSubheading("Types of Cookies We Use"),
          legalBulletItem(
            { text: "Strictly necessary", isStrong: true },
            ": Required to operate the site and to store your cookie choices. These cannot be turned off in our banner without breaking core functionality.",
          ),
          legalBulletItem(
            { text: "Analytics (optional)", isStrong: true },
            ': If you consent, Google Analytics helps us understand aggregate traffic and usage. You can withdraw consent anytime via "Cookie settings".',
          ),
          legalSubheading("Google Consent Mode (v2)"),
          legalParagraph(
            "We integrate Google tags using ",
            { text: "Consent Mode v2", isStrong: true },
            ". This means consent types such as ",
            { text: "analytics_storage", isStrong: true },
            " default to ",
            { text: "denied", isStrong: true },
            " until you accept optional analytics, then update to reflect your choice. We do not enable advertising personalization through this integration by default.",
          ),
          legalSubheading("Managing Cookies"),
          legalParagraph(
            'Use our in-site ',
            { text: "Cookie settings", isStrong: true },
            " link (footer) to change your preferences. You can also control or delete cookies in your browser; blocking strictly necessary cookies may affect how the site remembers your consent.",
          ),
        ],
      },
      {
        heading: "8. Security & Confidentiality",
        body: [
          legalParagraph(
            "Your data is stored securely and accessed only by authorized personnel. We implement technical and organizational measures to protect your information.",
          ),
        ],
      },
      {
        heading: "9. Contact for Privacy Queries",
        body: [
          legalParagraph("For questions or concerns, contact us at ", {
            text: email,
            href: `mailto:${encodeURIComponent(email)}`,
          }, " or ", { text: phone, href: phoneTelHref }, "."),
        ],
      },
    ],
  };
}

function buildTermsPage(): LegalPageContent {
  return {
    slug: "terms",
    title: "Terms & conditions",
    metaDescription:
      "Full Terms & Conditions for The Skinbar: services, client duties, cancellations (€20 fee), payment, liability, age rules, IP, Irish law, and cookie consent.",
    sections: [
      {
        heading: "1. Agreement to Terms",
        body: [
          legalParagraph(
            "By accessing this website or booking an appointment, you agree to these Terms & Conditions.",
          ),
        ],
      },
      {
        heading: "2. Services & Professional Standards",
        body: [
          legalBulletItem(
            "All treatments are performed by qualified, insured practitioners in compliance with Irish professional standards.",
          ),
          legalBulletItem(
            "We reserve the right to refuse or postpone treatment if it is deemed unsafe or unsuitable.",
          ),
        ],
      },
      {
        heading: "3. Client Responsibilities",
        body: [
          legalBulletItem(
            "Provide ",
            { text: "accurate and complete", isStrong: true },
            " personal/medical information before treatment.",
          ),
          legalBulletItem(
            "Disclose ",
            { text: "allergies, medical conditions, or pregnancy", isStrong: true },
            " to avoid adverse reactions.",
          ),
          legalBulletItem(
            "Arrive on time. Late arrivals may result in ",
            { text: "reduced treatment time", isStrong: true },
            " or cancellation.",
          ),
        ],
      },
      {
        heading: "4. Appointment & Cancellation Policy",
        body: [
          legalBulletItem(
            { text: "24-hour notice", isStrong: true },
            " is required for cancellations or rescheduling.",
          ),
          legalBulletItem(
            "Late cancellations or no-shows may incur a fee of ",
            { text: "€20", isStrong: true },
            ".",
          ),
        ],
      },
      {
        heading: "5. Payment",
        body: [
          legalParagraph(
            "Payment is due ",
            { text: "at the time of service", isStrong: true },
            " unless otherwise agreed.",
          ),
        ],
      },
      {
        heading: "6. Liability & Disclaimers",
        body: [
          legalBulletItem(
            "Results may vary; ",
            { text: "no guarantees", isStrong: true },
            " are made regarding treatment outcomes.",
          ),
          legalBulletItem(
            "We are ",
            { text: "not liable", isStrong: true },
            " for allergic reactions or complications arising from non-disclosure of medical information.",
          ),
          legalBulletItem(
            "Our liability is limited to the extent permitted by ",
            { text: "Irish law", isStrong: true },
            ".",
          ),
        ],
      },
      {
        heading: "7. Age Restriction",
        body: [
          legalParagraph(
            "Clients under ",
            { text: "18", isStrong: true },
            " must be accompanied by a parent/guardian or provide written consent for treatments.",
          ),
        ],
      },
      {
        heading: "8. Intellectual Property",
        body: [
          legalParagraph(
            "All website content is the property of ",
            { text: "The Skinbar by Inna Chernovol", isStrong: true },
            " and may not be copied or used without permission.",
          ),
        ],
      },
      {
        heading: "9. Governing Law",
        body: [
          legalParagraph(
            "These Terms & Conditions are governed by the laws of ",
            { text: "Ireland", isStrong: true },
            ".",
          ),
        ],
      },
      {
        heading: "10. Cookie Consent",
        body: [
          legalParagraph(
            "By using our website, you consent to our use of cookies as described in our ",
            { text: "Privacy Policy", href: "/privacy" },
            ".",
          ),
        ],
      },
    ],
  };
}

const PAGE_BUILDERS: Record<LegalPageSlug, () => LegalPageContent> = {
  privacy: buildPrivacyPage,
  terms: buildTermsPage,
};

/** Localized titles/descriptions; body stays EN until translated in CMS. */
const LOCALIZED_META: Record<
  LegalPageSlug,
  Record<"en" | "uk" | "ru", Pick<LegalPageContent, "title" | "metaDescription">>
> = {
  privacy: {
    en: {
      title: "Privacy policy",
      metaDescription:
        "GDPR-aligned privacy policy for The Skinbar: data controller, legal bases, Resend and analytics processors, retention, cookies, and your rights.",
    },
    uk: {
      title: "Політика конфіденційності",
      metaDescription:
        "Політика конфіденційності The Skinbar: контролер даних, правові підстави, процесори, зберігання, cookie та ваші права за GDPR.",
    },
    ru: {
      title: "Политика конфиденциальности",
      metaDescription:
        "Политика конфиденциальности The Skinbar: контроллер данных, правовые основания, процессоры, хранение, cookie и ваши права по GDPR.",
    },
  },
  terms: {
    en: {
      title: "Terms & conditions",
      metaDescription:
        "Full Terms & Conditions for The Skinbar: services, client duties, cancellations (€20 fee), payment, liability, age rules, IP, Irish law, and cookie consent.",
    },
    uk: {
      title: "Умови використання",
      metaDescription:
        "Умови використання The Skinbar: послуги, обов'язки клієнта, скасування (€20), оплата, відповідальність, вік, IP та ірландське право.",
    },
    ru: {
      title: "Условия использования",
      metaDescription:
        "Условия использования The Skinbar: услуги, обязанности клиента, отмена (€20), оплата, ответственность, возраст, IP и ирландское право.",
    },
  },
};

export function getStaticLegalPage(
  locale: "en" | "uk" | "ru",
  slug: LegalPageSlug,
): LegalPageContent {
  resetPortableTextKeys();
  const page = PAGE_BUILDERS[slug]();
  const meta = LOCALIZED_META[slug][locale];
  return {
    ...page,
    title: meta.title,
    metaDescription: meta.metaDescription,
  };
}
