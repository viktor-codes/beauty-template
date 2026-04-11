import Image from "next/image";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export interface BeforeAfterImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BeforeAfterProps extends HTMLAttributes<HTMLDivElement> {
  beforeImage: BeforeAfterImage;
  afterImage: BeforeAfterImage;
  caption?: string;
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  caption,
  className,
  ...rest
}: BeforeAfterProps) {
  return (
    <figure className={cn("space-y-3", className)} {...rest}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Before
          </p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image
              src={beforeImage.src}
              alt={beforeImage.alt}
              width={beforeImage.width}
              height={beforeImage.height}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            After
          </p>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border">
            <Image
              src={afterImage.src}
              alt={afterImage.alt}
              width={afterImage.width}
              height={afterImage.height}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
      {caption ? (
        <figcaption className="text-center text-sm text-muted">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
