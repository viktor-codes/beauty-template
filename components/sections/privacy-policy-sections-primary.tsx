import Link from "next/link";

import { PrivacyContactChannels } from "@/components/sections/privacy-contact-channels";
import { cn } from "@/lib/cn";

const hrClass = "border-border";
const h2Class =
  "type-h3 scroll-mt-24 font-heading font-medium tracking-tight text-primary";
const pClass = "text-base leading-[var(--text-base--line-height)] text-primary/90";
const listClass =
  "list-disc space-y-2 pl-6 text-base leading-[var(--text-base--line-height)] text-primary/90 marker:text-accent";
const strongClass = "font-semibold text-primary";

export interface PrivacyPolicySectionsPrimaryProps {
  email: string;
  phone: string;
}

export function PrivacyPolicySectionsPrimary({
  email,
  phone,
}: PrivacyPolicySectionsPrimaryProps) {
  return (
    <>
      <section aria-labelledby="privacy-s1">
        <h2 id="privacy-s1" className={h2Class}>
          1. Data Controller
        </h2>
        <p className={cn(pClass, "mt-4")}>
          <strong className={strongClass}>Skinbar by Inna Chernovol</strong>
          {", "}
          located in Athlone, Ireland, is the Data Controller for your personal
          data. For inquiries, contact us at{" "}
          <PrivacyContactChannels email={email} phone={phone} />.
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="privacy-s2">
        <h2 id="privacy-s2" className={h2Class}>
          2. Legal Basis for Processing
        </h2>
        <p className={cn(pClass, "mt-4")}>
          We process your personal data based on:
        </p>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            <strong className={strongClass}>Consent</strong>: When you submit
            your details via our contact form, book an appointment, or accept
            cookies.
          </li>
          <li>
            <strong className={strongClass}>Legitimate Interest</strong>: To
            provide services, communicate with you, and ensure safe and
            effective treatments.
          </li>
        </ul>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="privacy-s3">
        <h2 id="privacy-s3" className={h2Class}>
          3. Data Collection
        </h2>
        <p className={cn(pClass, "mt-4")}>We collect:</p>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            <strong className={strongClass}>Name</strong>
          </li>
          <li>
            <strong className={strongClass}>Phone number</strong>
          </li>
          <li>
            <strong className={strongClass}>Email address</strong> (if
            provided)
          </li>
          <li>
            <strong className={strongClass}>Relevant medical information</strong>{" "}
            (for treatment safety)
          </li>
          <li>
            <strong className={strongClass}>Cookie and similar data</strong>{" "}
            (strictly necessary cookies, your consent preferences, and — if you
            opt in — analytics cookies for Google Analytics)
          </li>
        </ul>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="privacy-s4">
        <h2 id="privacy-s4" className={h2Class}>
          4. Use of Third-Party Processors
        </h2>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            <strong className={strongClass}>&quot;Resend&quot;</strong> is used
            to deliver contact form submissions. Resend complies with GDPR and
            processes data only as instructed.
          </li>
          <li>
            <strong className={strongClass}>
              Google Analytics (optional)
            </strong>
            : If you enable analytics in our cookie banner, Google Analytics
            (GA4) may process usage data as described in Google&apos;s terms.
            We load GA4 only after you grant analytics consent. We use{" "}
            <strong className={strongClass}>Google Consent Mode v2</strong> so
            that analytics and advertising storage signals default to denied
            until you consent, and are updated when you make a choice in the
            banner.
          </li>
        </ul>
        <p className={cn(pClass, "mt-4")}>
          We do not share your personal data with other third parties unless
          required by law or with your explicit consent.
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="privacy-s5">
        <h2 id="privacy-s5" className={h2Class}>
          5. Data Retention
        </h2>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            <strong className={strongClass}>Appointment data</strong>: Retained
            for <strong className={strongClass}>2 years</strong> after your last
            appointment.
          </li>
          <li>
            <strong className={strongClass}>Medical information</strong>:
            Retained for <strong className={strongClass}>7 years</strong> as
            required by Irish law.
          </li>
          <li>
            <strong className={strongClass}>Cookie consent preferences</strong>:
            Stored for up to <strong className={strongClass}>12 months</strong>{" "}
            so we remember your choices (you can change them anytime via
            &quot;Cookie settings&quot; in the footer).
          </li>
          <li>
            <strong className={strongClass}>Analytics cookies (if enabled)</strong>
            : Retained for up to <strong className={strongClass}>26 months</strong>{" "}
            (or as specified by Google Analytics / your browser).
          </li>
        </ul>
      </section>

      <hr className={hrClass} />
    </>
  );
}
