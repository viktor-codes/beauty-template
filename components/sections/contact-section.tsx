import {
  ChatCircleIcon,
  EnvelopeSimpleIcon,
  InstagramLogoIcon,
  MapPinIcon,
  PhoneIcon,
  TelegramLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/ssr";
import type { HTMLAttributes } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ContactForm } from "@/components/shared/contact-form";
import type { ContactMessengerId, ContactContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface ContactSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "content"
> {
  content: ContactContent;
}

const rowIconClass = "mt-0.5 h-5 w-5 shrink-0 text-accent";
const messengerIconClass = "h-6 w-6 text-accent";

function ContactMessengerIcon({ id }: { id: ContactMessengerId }) {
  switch (id) {
    case "telegram":
      return (
        <TelegramLogoIcon
          className={messengerIconClass}
          weight="light"
          aria-hidden
        />
      );
    case "whatsapp":
      return (
        <WhatsappLogoIcon
          className={messengerIconClass}
          weight="light"
          aria-hidden
        />
      );
    case "viber":
      return (
        <ChatCircleIcon
          className={messengerIconClass}
          weight="light"
          aria-hidden
        />
      );
    case "instagram":
      return (
        <InstagramLogoIcon
          className={messengerIconClass}
          weight="light"
          aria-hidden
        />
      );
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
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
        <div className="flex flex-col gap-6 justify-between">
          <ul className="space-y-6 text-sm">
            <li className="flex gap-3">
              <PhoneIcon className={rowIconClass} weight="light" aria-hidden />
              <div>
                <p className="font-medium text-primary">{content.phoneLabel}</p>
                <a
                  href={`tel:${content.phone.replace(/\s/g, "")}`}
                  className="text-muted hover:text-primary"
                >
                  {content.phone}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <EnvelopeSimpleIcon
                className={rowIconClass}
                weight="light"
                aria-hidden
              />
              <div>
                <p className="font-medium text-primary">{content.emailLabel}</p>
                <a
                  href={`mailto:${content.email}`}
                  className="text-muted hover:text-primary"
                >
                  {content.email}
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPinIcon className={rowIconClass} weight="light" aria-hidden />
              <div>
                <p className="font-medium text-primary">
                  {content.locationTitle}
                </p>
                <p className="text-muted">{content.address}</p>
              </div>
            </li>
          </ul>
          <div className="flex flex-row flex-wrap items-center gap-4">
            {content.messengers.map((m) => (
              <a
                key={`${m.id}-${m.href}`}
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label={m.ariaLabel}
              >
                <ContactMessengerIcon id={m.id} />
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
    </Section>
  );
}
