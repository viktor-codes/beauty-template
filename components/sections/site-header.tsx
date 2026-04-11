import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { NavContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface SiteHeaderProps {
  content: NavContent;
  className?: string;
}

export function SiteHeader({ content, className }: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="#hero"
          className="shrink-0 font-heading text-lg tracking-tight text-primary"
        >
          Studio
        </Link>
        <nav
          className="hidden min-w-0 flex-1 justify-center gap-6 lg:flex"
          aria-label="Primary"
        >
          {content.links.map((link) => (
            <Link
              key={`${link.label}-${link.href}`}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button href={content.cta.href} size="sm" className="shrink-0">
          {content.cta.label}
        </Button>
      </div>
      <nav
        className="flex gap-4 overflow-x-auto border-t border-border px-4 py-2 lg:hidden"
        aria-label="Primary mobile"
      >
        {content.links.map((link) => (
          <Link
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="shrink-0 text-xs text-muted hover:text-primary"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
