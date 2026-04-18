import Link from "next/link";

import { cn } from "@/lib/cn";

const hrClass = "border-border";
const h2Class =
  "type-h3 scroll-mt-24 font-heading font-medium tracking-tight text-primary";
const pClass = "text-base leading-[var(--text-base--line-height)] text-primary/90";
const listClass =
  "list-disc space-y-2 pl-6 text-base leading-[var(--text-base--line-height)] text-primary/90 marker:text-accent";
const strongClass = "font-semibold text-primary";
const policyLinkClass =
  "font-semibold text-accent underline underline-offset-2 transition-colors hover:text-primary";

export function TermsPolicySectionsSecondary() {
  return (
    <>
      <section aria-labelledby="terms-s6">
        <h2 id="terms-s6" className={h2Class}>
          6. Liability &amp; Disclaimers
        </h2>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            Results may vary;{" "}
            <strong className={strongClass}>no guarantees</strong> are made
            regarding treatment outcomes.
          </li>
          <li>
            We are <strong className={strongClass}>not liable</strong> for
            allergic reactions or complications arising from non-disclosure of
            medical information.
          </li>
          <li>
            Our liability is limited to the extent permitted by{" "}
            <strong className={strongClass}>Irish law</strong>.
          </li>
        </ul>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="terms-s7">
        <h2 id="terms-s7" className={h2Class}>
          7. Age Restriction
        </h2>
        <p className={cn(pClass, "mt-4")}>
          Clients under <strong className={strongClass}>18</strong> must be
          accompanied by a parent/guardian or provide written consent for
          treatments.
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="terms-s8">
        <h2 id="terms-s8" className={h2Class}>
          8. Intellectual Property
        </h2>
        <p className={cn(pClass, "mt-4")}>
          All website content is the property of{" "}
          <strong className={strongClass}>Skinbar by Inna Chernovol</strong> and
          may not be copied or used without permission.
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="terms-s9">
        <h2 id="terms-s9" className={h2Class}>
          9. Governing Law
        </h2>
        <p className={cn(pClass, "mt-4")}>
          These Terms &amp; Conditions are governed by the laws of{" "}
          <strong className={strongClass}>Ireland</strong>.
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="terms-s10">
        <h2 id="terms-s10" className={h2Class}>
          10. Cookie Consent
        </h2>
        <p className={cn(pClass, "mt-4")}>
          By using our website, you consent to our use of cookies as described in
          our{" "}
          <Link href="/privacy" className={policyLinkClass}>
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </>
  );
}
