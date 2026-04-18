import { cn } from "@/lib/cn";

const hrClass = "border-border";
const h2Class =
  "type-h3 scroll-mt-24 font-heading font-medium tracking-tight text-primary";
const pClass = "text-base leading-[var(--text-base--line-height)] text-primary/90";
const listClass =
  "list-disc space-y-2 pl-6 text-base leading-[var(--text-base--line-height)] text-primary/90 marker:text-accent";
const strongClass = "font-semibold text-primary";

export function TermsPolicySectionsPrimary() {
  return (
    <>
      <section aria-labelledby="terms-s1">
        <h2 id="terms-s1" className={h2Class}>
          1. Agreement to Terms
        </h2>
        <p className={cn(pClass, "mt-4")}>
          By accessing this website or booking an appointment, you agree to
          these Terms &amp; Conditions.
        </p>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="terms-s2">
        <h2 id="terms-s2" className={h2Class}>
          2. Services &amp; Professional Standards
        </h2>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            All treatments are performed by qualified, insured practitioners in
            compliance with Irish professional standards.
          </li>
          <li>
            We reserve the right to refuse or postpone treatment if it is deemed
            unsafe or unsuitable.
          </li>
        </ul>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="terms-s3">
        <h2 id="terms-s3" className={h2Class}>
          3. Client Responsibilities
        </h2>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            Provide{" "}
            <strong className={strongClass}>accurate and complete</strong>{" "}
            personal/medical information before treatment.
          </li>
          <li>
            Disclose{" "}
            <strong className={strongClass}>
              allergies, medical conditions, or pregnancy
            </strong>{" "}
            to avoid adverse reactions.
          </li>
          <li>
            Arrive on time. Late arrivals may result in{" "}
            <strong className={strongClass}>reduced treatment time</strong> or
            cancellation.
          </li>
        </ul>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="terms-s4">
        <h2 id="terms-s4" className={h2Class}>
          4. Appointment &amp; Cancellation Policy
        </h2>
        <ul className={cn(listClass, "mt-4")}>
          <li>
            <strong className={strongClass}>24-hour notice</strong> is required
            for cancellations or rescheduling.
          </li>
          <li>
            Late cancellations or no-shows may incur a fee of{" "}
            <strong className={strongClass}>€20</strong>.
          </li>
        </ul>
      </section>

      <hr className={hrClass} />

      <section aria-labelledby="terms-s5">
        <h2 id="terms-s5" className={h2Class}>
          5. Payment
        </h2>
        <p className={cn(pClass, "mt-4")}>
          Payment is due{" "}
          <strong className={strongClass}>at the time of service</strong> unless
          otherwise agreed.
        </p>
      </section>

      <hr className={hrClass} />
    </>
  );
}
