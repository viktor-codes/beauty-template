import { CalendarHeartIcon } from "@phosphor-icons/react/ssr";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { MobileMenuBurgerTrigger } from "@/components/sections/mobile-menu-burger-trigger";
import {
  NavDropdownPanel,
  NavDropdownTrigger,
} from "@/components/sections/nav-dropdown";
import { SiteHeaderContainer } from "@/components/sections/site-header-container";
import { Button } from "@/components/ui/button";
import type { NavContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";
import { SITE_NAME_FULL } from "@/lib/site-metadata";

const iconFrameClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary";

export interface SiteHeaderProps {
  content: NavContent;
  className?: string;
  homeHref?: string;
}

export function SiteHeader({
  content,
  className,
  homeHref = "#hero",
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-(--z-sticky) border-b border-border bg-background",
        "md:sticky md:inset-x-auto md:top-0 md:isolate md:py-1.5",
        className,
      )}
    >
      <SiteHeaderContainer>
        <div className="grid grid-cols-3 items-center gap-2 md:hidden">
          <div className="flex justify-start">
            <MobileMenuBurgerTrigger nav={content} />
          </div>
          <div className="flex min-w-0 justify-center">
            <Link
              href={homeHref}
              className="truncate font-heading text-lg tracking-tight text-primary"
            >
              <Image
                src="/logo.svg"
                alt={SITE_NAME_FULL}
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Link
              href={content.cta.href}
              className={cn(
                iconFrameClass,
                "transition-colors hover:bg-surface",
              )}
              aria-label={content.cta.label}
            >
              <CalendarHeartIcon
                className="h-6 w-6"
                weight="light"
                aria-hidden
              />
            </Link>
          </div>
        </div>
        <div className="hidden items-center justify-between gap-4 md:flex">
          <Link
            href={homeHref}
            className="shrink-0 font-heading text-lg tracking-tight text-primary"
          >
            <Image
              src="/logo.svg"
              alt={SITE_NAME_FULL}
              width={100}
              height={100}
            />
          </Link>
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-4 md:flex lg:gap-6"
            aria-label="Primary"
          >
            {content.links.map((link) =>
              link.children?.length ? (
                <NavDropdownTrigger
                  key={`${link.label}-${link.href}`}
                  link={link}
                />
              ) : (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  className="text-nav-link text-muted transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ),
            )}
          </nav>
          <div className="flex shrink-0 items-center gap-3">
            <Button
              href={content.cta.href}
              size="sm"
              aria-label={content.cta.label}
            >
              {content.cta.label}
            </Button>
            <div className="h-1 w-1 rounded-full bg-primary" />
            <LocaleSwitcher />
          </div>
        </div>
        {content.links.map((link) =>
          link.children?.length ? (
            <NavDropdownPanel
              key={`${link.label}-${link.href}-panel`}
              link={link}
            />
          ) : null,
        )}
      </SiteHeaderContainer>
    </header>
  );
}
