import { CalendarHeartIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

import { MobileMenuBurgerTrigger } from "@/components/sections/mobile-menu-burger-trigger";
import { Button } from "@/components/ui/button";
import type { NavContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

const iconFrameClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-primary";

export interface SiteHeaderProps {
  content: NavContent;
  className?: string;
}

export function SiteHeader({ content, className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-(--z-sticky) border-b border-border bg-background",
        "md:sticky md:inset-x-auto md:top-0 md:isolate",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 items-center gap-2 md:hidden">
          <div className="flex justify-start">
            <MobileMenuBurgerTrigger nav={content} />
          </div>
          <div className="flex min-w-0 justify-center">
            <Link
              href="#hero"
              className="truncate font-heading text-lg tracking-tight text-primary"
            >
              Studio
            </Link>
          </div>
          <div className="flex justify-end">
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
            href="#hero"
            className="shrink-0 font-heading text-lg tracking-tight text-primary"
          >
            Studio
          </Link>
          <nav
            className="hidden min-w-0 flex-1 justify-center gap-4 md:flex lg:gap-6"
            aria-label="Primary"
          >
            {content.links.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="text-lg text-muted transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Button href={content.cta.href} size="sm" className="shrink-0">
            {content.cta.label}
          </Button>
        </div>
      </div>
    </header>
  );
}
