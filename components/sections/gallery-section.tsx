import { ArrowSquareOut } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
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
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {Array.from({ length: GRID_SLOT_COUNT }, (_, i) => {
          const photo = LANDING_GALLERY_IMAGES[i % LANDING_GALLERY_IMAGES.length];
          const isHero = i === 0;

          return (
            <div
              key={i}
              className={cn(
                "relative min-h-[200px] w-full overflow-hidden rounded-xl bg-surface",
                isHero &&
                  "sm:col-span-2 sm:row-span-2 sm:min-h-[min(70vh,520px)]",
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes={
                  isHero
                    ? "(min-width: 768px) 60vw, (min-width: 640px) 66vw, 50vw"
                    : "(min-width: 768px) 28vw, (min-width: 640px) 33vw, 50vw"
                }
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}
