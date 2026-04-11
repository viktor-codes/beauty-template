import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/ssr";
import type { HTMLAttributes } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/shared/contact-form";
import type { ContactContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface ContactSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  content: ContactContent;
}

export function ContactSection({
  content,
  className,
  id = "contact",
  ...rest
}: ContactSectionProps) {
  return (
    <Section id={id} className={cn("bg-surface", className)} {...rest}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.description}
      />
      <div className="grid gap-12 lg:grid-cols-2">
        <ul className="space-y-6 text-sm">
          <li className="flex gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" weight="light" aria-hidden />
            <div>
              <p className="font-medium text-primary">Phone</p>
              <a
                href={`tel:${content.phone.replace(/\s/g, "")}`}
                className="text-muted hover:text-primary"
              >
                {content.phone}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <EnvelopeSimple
              className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              weight="light"
              aria-hidden
            />
            <div>
              <p className="font-medium text-primary">Email</p>
              <a
                href={`mailto:${content.email}`}
                className="text-muted hover:text-primary"
              >
                {content.email}
              </a>
            </div>
          </li>
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" weight="light" aria-hidden />
            <div>
              <p className="font-medium text-primary">Studio</p>
              <p className="text-muted">{content.address}</p>
            </div>
          </li>
        </ul>
        <ContactForm />
      </div>
    </Section>
  );
}
