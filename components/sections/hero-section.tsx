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
      className={cn("relative overflow-hidden py-24 md:py-32", className)}
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch md:gap-14">
          <div className="text-center md:col-start-1 md:row-start-1 md:text-left">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {content.eyebrow}
            </p>
            <h1 className="text-pretty mt-4 font-heading text-[clamp(2.25rem,calc(4vw+1.5rem),5rem)] font-medium leading-[1.1] text-primary">
              {content.title}
            </h1>
          </div>
          <div className="relative flex w-full justify-center md:col-start-2 md:row-span-2 md:row-start-1 md:min-h-0 md:items-center md:justify-center">
            <div
              aria-hidden
              className="pointer-events-none absolute top-[45%] left-1/2 z-0 h-[min(60rem,calc(72vw*2))] w-[min(78rem,calc(92vw*2))] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_55%_50%_at_50%_50%,color-mix(in_srgb,var(--color-accent)_55%,transparent)_0%,transparent_68%)] blur-3xl md:top-1/2"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[8%] left-[2%] z-1 hidden max-w-[28vw] max-md:block"
            >
              <Image
                src="/leave.svg"
                alt=""
                width={187}
                height={356}
                className="h-auto w-full opacity-90"
              />
            </div>
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              priority
              fetchPriority="high"
              sizes="(max-width: 767px) 100vw, 50vw"
              className="relative z-10 h-auto w-full max-w-full object-contain translate-x-3"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-[8%] right-[2%] z-1 hidden max-w-[28vw] max-md:block"
            >
              <Image
                src="/leave.svg"
                alt=""
                width={187}
                height={356}
                className="h-auto w-full -scale-x-100 opacity-90"
              />
            </div>
          </div>
          <div className="text-center md:col-start-1 md:row-start-2 md:text-left">
            <p className="mx-auto max-w-xl text-base leading-relaxed text-muted md:mx-0">
              {content.subtitle}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
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
        </div>
      </div>
    </Section>
  );
}
