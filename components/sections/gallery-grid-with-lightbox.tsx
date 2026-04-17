"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

import { GalleryLightbox } from "@/components/sections/gallery-lightbox";
import { cn } from "@/lib/cn";

export interface GalleryPhoto {
  readonly src: string;
  readonly alt: string;
}

export interface GalleryGridWithLightboxProps {
  photos: readonly GalleryPhoto[];
  slotCount: number;
}

export function GalleryGridWithLightbox({
  photos,
  slotCount,
}: GalleryGridWithLightboxProps) {
  const slots = useMemo(
    () =>
      Array.from({ length: slotCount }, (_, i) => {
        const photo = photos[i % photos.length];
        if (!photo) {
          throw new Error("GalleryGridWithLightbox: photos array must not be empty");
        }
        return photo;
      }),
    [photos, slotCount],
  );

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + slots.length) % slots.length,
    );
  }, [slots.length]);

  const goNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % slots.length));
  }, [slots.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
        {slots.map((photo, i) => {
          const isHero = i === 0;
          return (
            <button
              key={i}
              type="button"
              className={cn(
                "group relative block min-h-[200px] w-full cursor-zoom-in overflow-hidden rounded-xl border-0 bg-surface p-0 text-left transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isHero &&
                  "sm:col-span-2 sm:row-span-2 sm:min-h-[min(70vh,520px)]",
              )}
              onClick={() => setOpenIndex(i)}
              aria-haspopup="dialog"
              aria-expanded={openIndex === i}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes={
                  isHero
                    ? "(min-width: 768px) 60vw, (min-width: 640px) 66vw, 50vw"
                    : "(min-width: 768px) 28vw, (min-width: 640px) 33vw, 50vw"
                }
              />
            </button>
          );
        })}
      </div>

      {openIndex !== null ? (
        <GalleryLightbox
          openIndex={openIndex}
          slides={slots}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
        />
      ) : null}
    </>
  );
}
