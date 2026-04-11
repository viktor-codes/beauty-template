import { ArrowSquareOut } from "@phosphor-icons/react/ssr";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { GalleryContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface GallerySectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  content: GalleryContent;
}

export function GallerySection({
  content,
  className,
  id = "gallery",
  ...rest
}: GallerySectionProps) {
  return (
    <Section id={id} className={cn("bg-background", className)} {...rest}>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          className="mb-0"
        />
        <Button
          href={content.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="secondary"
          className="shrink-0 gap-2"
        >
          <ArrowSquareOut className="h-4 w-4" weight="light" aria-hidden />
          Instagram
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted md:hidden">
        Opens Instagram in a new tab.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square rounded-xl bg-surface",
              i === 0 && "sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[280px]",
            )}
            aria-hidden
          />
        ))}
      </div>
    </Section>
  );
}
