import Image from "next/image";
import type { HTMLAttributes } from "react";

import heroBg from "@/assets/hero-bg.webp";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
import type { HeroContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface HeroSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "content"
> {
  content: HeroContent;
}

export function HeroSection({
  content,
  className,
  id = "hero",
  ...rest
}: HeroSectionProps) {
  return (
    <Section
      id={id}
      hasContainer={false}
      className={cn("relative overflow-hidden", className)}
      {...rest}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={heroBg}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          className="object-cover opacity-90 transform-[scaleX(-1)]"
          aria-hidden
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-surface/75"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {content.eyebrow}
            </p>
            <h1 className="text-pretty mt-4 font-heading text-[clamp(2.25rem,calc(6vw+1.5rem),5rem)] font-medium leading-[1.1] text-primary">
              {content.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {content.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={content.primaryCta.href} size="lg">
                {content.primaryCta.label}
              </Button>
              <Button
                href={content.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {content.secondaryCta.label}
              </Button>
            </div>
          </div>
          <div className="relative w-full overflow-hidden">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
