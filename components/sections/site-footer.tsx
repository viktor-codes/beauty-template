import Link from "next/link";

import { CookieSettingsButton } from "@/components/consent/cookie-settings-button";
import { Divider } from "@/components/ui/divider";
import type { FooterContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface SiteFooterProps {
  content: FooterContent;
  className?: string;
}

export function SiteFooter({ content, className }: SiteFooterProps) {
  return (
    <footer
      className={cn("border-t border-border bg-surface", className)}
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="font-heading text-lg text-primary">{content.tagline}</p>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          {content.links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Divider className="my-8" />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">{content.legal.notice}</p>
          <div className="flex flex-wrap items-center gap-4">
            {content.legal.links.map((link) => (
              <Link
                key={`legal-${link.label}-${link.href}`}
                href={link.href}
                className="text-xs text-muted hover:text-primary"
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
