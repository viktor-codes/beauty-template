import { ArrowSquareOut } from "@phosphor-icons/react/ssr";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GalleryGridWithLightbox } from "@/components/sections/gallery-grid-with-lightbox";
import type { GalleryContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

/** Temporary hardcoded assets; replace with CMS / content model later. */
const LANDING_GALLERY_IMAGES = [
  {
    src: "/gallery/1.jpg",
    alt: "Calm studio interior with soft natural light",
  },
  {
    src: "/gallery/2.jpg",
    alt: "Minimal treatment room detail",
  },
  {
    src: "/gallery/3.jpg",
    alt: "Spa atmosphere and neutral tones",
  },
  {
    src: "/gallery/4.jpg",
    alt: "Beauty studio mood and texture",
  },
] as const;

const GRID_SLOT_COUNT = 6;

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
      <div className="mt-10">
        <GalleryGridWithLightbox
          photos={LANDING_GALLERY_IMAGES}
          slotCount={GRID_SLOT_COUNT}
        />
      </div>
    </Section>
  );
}
