import {
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { SiteFooterLinkGroup } from "@/components/sections/site-footer-link-group";
import { Divider } from "@/components/ui/divider";
import type { FooterContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface SiteFooterProps {
  content: FooterContent;
  className?: string;
}

export function SiteFooter({ content, className }: SiteFooterProps) {
  const { contact } = content;

  return (
    <footer className={cn("border-t border-border bg-surface", className)}>
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <p className="font-heading text-xl text-primary">{content.brandTitle}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {content.tagline}
            </p>
          </div>
          <div className="lg:col-span-2">
            <SiteFooterLinkGroup group={content.navigation} />
          </div>
          <div className="lg:col-span-3">
            <SiteFooterLinkGroup group={content.services} />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <p className="font-heading text-sm font-medium tracking-wide text-primary">
              {contact.heading}
            </p>
            <ul className="mt-4 space-y-4 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <PhoneIcon
                  className="h-4 w-4 shrink-0 text-accent"
                  weight="light"
                  aria-hidden
                />
                <Link
                  href={contact.phone.href}
                  className="transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {contact.phone.label}
                </Link>
              </li>
              <li className="flex items-start gap-2.5">
                <EnvelopeSimpleIcon
                  className="h-4 w-4 shrink-0 text-accent"
                  weight="light"
                  aria-hidden
                />
                <Link
                  href={contact.email.href}
                  className="break-all transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  {contact.email.label}
                </Link>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPinIcon
                  className="h-4 w-4 shrink-0 text-accent"
                  weight="light"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="leading-snug">{contact.address}</p>
                  {contact.directionsHref ? (
                    <a
                      href={contact.directionsHref}
                      className="mt-2 inline-block text-xs text-muted underline-offset-2 transition-colors hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.directionsLabel ?? "Directions"}
                    </a>
                  ) : null}
                </div>
              </li>
            </ul>
            <div className="mt-8">
              <SiteFooterLinkGroup group={content.social} />
            </div>
          </div>
        </div>

        <Divider className="my-10" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted">{content.legal.notice}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {content.legal.links.map((link) => (
              <Link
                key={`legal-${link.label}-${link.href}`}
                href={link.href}
                className="text-xs text-muted transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label}
              </Link>
            ))}
            <CookieSettingsButton className="text-xs" />
          </div>
        </div>
      </div>
    </footer>
  );
}
