import { Link } from "@/i18n/navigation";
import Image from "next/image";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

interface ServiceCardImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

type ServiceCardImageSide = "left" | "right";

export interface ServiceCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  href?: string;
  icon?: ReactNode;
  image?: ServiceCardImage;
  imageSide?: ServiceCardImageSide;
}

export function ServiceCard({
  title,
  description,
  href,
  icon,
  image,
  imageSide = "right",
  className,
  ...rest
}: ServiceCardProps) {
  const imageAlt = image?.alt ?? `${title} category photo`;
  const isImageOnLeft = imageSide === "left";

  /* Right strip: fill from the right, soft diagonal cut on the left (toward text). */
  const clipImageRight = "polygon(32% 0%, 100% 0%, 100% 100%, 0% 100%)";
  /* Left strip: fill from the left, soft diagonal cut on the right (toward text). */
  const clipImageLeft = "polygon(68% 0%, 0% 0%, 0% 100%, 100% 100%)";
  const defaultDesktopClipPath = isImageOnLeft ? clipImageLeft : clipImageRight;
  const cardStyle = {
    ["--service-card-image-clip" as string]: defaultDesktopClipPath,
    ...rest.style,
  };

  const inner = (
    <div className="flex h-full flex-col justify-center">
      {image ? (
        <>
          {/* Mobile: full-card background with a top gradient for text contrast */}
          <div className="pointer-events-none absolute inset-0 sm:hidden">
            <Image
              src={image.src}
              alt={imageAlt}
              fill
              sizes="100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-b from-background/95 via-background/55 to-background/20" />
          </div>

          {/* Desktop+: image as a soft background on the side third */}
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 hidden w-1/3 sm:block",
              isImageOnLeft ? "left-0" : "right-0",
            )}
            style={{ clipPath: "var(--service-card-image-clip)" }}
          >
            <Image
              src={image.src}
              alt={imageAlt}
              fill
              sizes="(min-width: 640px) 33vw, 100vw"
              className="object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[0.6px]" />
          </div>
        </>
      ) : null}
      <div
        className={cn(
          "relative z-10",
          image && (isImageOnLeft ? "sm:pl-[40%]" : "sm:pr-[40%]"),
        )}
      >
        {icon ? <div className="mb-4 text-accent">{icon}</div> : null}
        <h3 className="font-heading text-xl text-primary">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );

  const cardClass = cn(
    "group relative flex overflow-hidden rounded-2xl border border-border/90 bg-linear-to-b from-background/80 to-surface/25 p-6",
    "shadow-[0_2px_12px_-4px_rgba(44,44,44,0.1)] transition-[box-shadow,transform] duration-300",
    image ? "min-h-[200px] sm:min-h-[150px]" : "min-h-[100px] sm:min-h-[150px]",
    href && "block h-full",
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(cardClass, "no-underline")}
        style={cardStyle}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={cardClass} {...rest} style={cardStyle}>
      {inner}
    </div>
  );
}
