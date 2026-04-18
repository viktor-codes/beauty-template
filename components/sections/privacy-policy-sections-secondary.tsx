import Link from "next/link";

import { PrivacyContactChannels } from "@/components/sections/privacy-contact-channels";
import { cn } from "@/lib/cn";

const hrClass = "border-border";
const h2Class =
  "type-h3 scroll-mt-24 font-heading font-medium tracking-tight text-primary";
const h3Class = "type-h4 mt-6 text-primary";
const pClass = "text-base leading-[var(--text-base--line-height)] text-primary/90";
const listClass =
  "list-disc space-y-2 pl-6 text-base leading-[var(--text-base--line-height)] text-primary/90 marker:text-accent";
const strongClass = "font-semibold text-primary";

export interface PrivacyPolicySectionsSecondaryProps {
  email: string;
  phone: string;
}

export function PrivacyPolicySectionsSecondary({
  email,
  phone,
}: PrivacyPolicySectionsSecondaryProps) {
  return (
    <>
      <section aria-labelledby="privacy-s6">
        <h2 id="privacy-s6" className={h2Class}>
          6. Your Rights Under GDPR
        </h2>
        <p className={cn(pClass, "mt-4")}>You have the right to:</p>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            <strong className={strongClass}>Access</strong>,{" "}
            <strong className={strongClass}>rectify</strong>, or{" "}
            <strong className={strongClass}>erase</strong> your personal data.
          </li>
          <li>
            <strong className={strongClass}>Restrict</strong> or{" "}
            <strong className={strongClass}>object</strong> to processing.
          </li>
          <li>
            <strong className={strongClass}>Data portability</strong> (receive
            your data in a structured format).
          </li>
          <li>
            <strong className={strongClass}>Withdraw consent</strong> for
            cookies or marketing communications.
          </li>
        </ul>
        <p className={cn(pClass, "mt-4")}>
          To exercise these rights, contact us at{" "}
          <Link
            href={`mailto:${encodeURIComponent(email)}`}
            className="text-accent underline underline-offset-2 hover:text-primary"
          >
            {email}
          </Link>
          .
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="privacy-s7">
        <h2 id="privacy-s7" className={h2Class}>
          7. Cookie Policy
        </h2>
        <h3 className={h3Class}>What Are Cookies?</h3>
        <p className={pClass}>
          Cookies are small text files stored on your device when you visit our
          website. They help us analyze traffic, improve performance, and
          personalize your experience.
        </p>
        <h3 className={h3Class}>Types of Cookies We Use</h3>
        <ul className={listClass}>
          <li>
            <strong className={strongClass}>Strictly necessary</strong>: Required
            to operate the site and to store your cookie choices. These cannot
            be turned off in our banner without breaking core functionality.
          </li>
          <li>
            <strong className={strongClass}>Analytics (optional)</strong>: If you
            consent, Google Analytics helps us understand aggregate traffic and
            usage. You can withdraw consent anytime via &quot;Cookie
            settings&quot;.
          </li>
        </ul>
        <h3 className={h3Class}>Google Consent Mode (v2)</h3>
        <p className={pClass}>
          We integrate Google tags using <strong className={strongClass}>Consent Mode v2</strong>.
          This means consent types such as <strong className={strongClass}>analytics_storage</strong>{" "}
          default to <strong className={strongClass}>denied</strong> until you
          accept optional analytics, then update to reflect your choice. We do
          not enable advertising personalization through this integration by
          default.
        </p>
        <h3 className={h3Class}>Managing Cookies</h3>
        <p className={pClass}>
          Use our in-site <strong className={strongClass}>Cookie settings</strong>{" "}
          link (footer) to change your preferences. You can also control or
          delete cookies in your browser; blocking strictly necessary cookies
          may affect how the site remembers your consent.
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="privacy-s8">
        <h2 id="privacy-s8" className={h2Class}>
          8. Security &amp; Confidentiality
        </h2>
        <p className={cn(pClass, "mt-4")}>
          Your data is stored securely and accessed only by authorized personnel.
          We implement technical and organizational measures to protect your
          information.
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="privacy-s9">
        <h2 id="privacy-s9" className={h2Class}>
          9. Contact for Privacy Queries
        </h2>
        <p className={cn(pClass, "mt-4")}>
          For questions or concerns, contact us at{" "}
          <PrivacyContactChannels email={email} phone={phone} />.
        </p>
      </section>
    </>
  );
}
