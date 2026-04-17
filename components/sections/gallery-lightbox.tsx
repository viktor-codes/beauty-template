"use client";

import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useEffect, type KeyboardEvent } from "react";

export interface GalleryLightboxSlide {
  readonly src: string;
  readonly alt: string;
}

export interface GalleryLightboxProps {
  openIndex: number;
  slides: readonly GalleryLightboxSlide[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function GalleryLightbox({
  openIndex,
  slides,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const active = slides[openIndex];

  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onClose, onPrev, onNext]);

  const onBackdropKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
  };

  if (!active) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-(--z-modal) flex items-center justify-center bg-background/85 p-4 backdrop-blur-[2px]"
      role="presentation"
      onClick={onClose}
      onKeyDown={onBackdropKeyDown}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={active.alt}
        className="relative flex max-h-[min(90vh,900px)] w-full max-w-[min(96vw,1200px)] flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute -right-1 -top-12 z-(--z-internal-top) flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors hover:bg-background md:-right-2 md:-top-2 md:border-0"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" weight="light" aria-hidden />
        </button>

        <div className="relative flex max-h-[85vh] w-full items-center justify-center">
          <Image
            src={active.src}
            alt={active.alt}
            width={1600}
            height={1200}
            className="h-auto max-h-[85vh] w-auto max-w-full rounded-lg object-contain shadow-lg"
            sizes="96vw"
            priority
          />
        </div>

        <div className="mt-4 flex w-full max-w-md items-center justify-between gap-4">
          <button
            type="button"
            onClick={onPrev}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors hover:bg-background"
            aria-label="Previous image"
          >
            <CaretLeft className="h-5 w-5" weight="light" aria-hidden />
          </button>
          <p className="type-caption text-center text-muted">
            {openIndex + 1} / {slides.length}
          </p>
          <button
            type="button"
            onClick={onNext}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary transition-colors hover:bg-background"
            aria-label="Next image"
          >
            <CaretRight className="h-5 w-5" weight="light" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
