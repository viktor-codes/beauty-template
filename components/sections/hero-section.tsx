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
      className={cn(
        "relative overflow-hidden pt-24 pb-0 md:pt-32 md:pb-0",
        className,
      )}
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
          className="object-cover opacity-40 transform-[scaleX(-1)]"
          aria-hidden
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-surface/75"
        aria-hidden
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-stretch md:gap-14">
          <div className="order-1 text-center md:order-0 md:col-span-2 md:row-start-1 md:text-left lg:col-span-1 lg:col-start-1">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {content.eyebrow}
            </p>
            <h1 className="text-pretty mt-4 font-heading text-[clamp(2.25rem,calc(4vw+1.5rem),5rem)] font-medium leading-[1.1] text-primary">
              {content.title}
            </h1>
          </div>
          <div className="order-3 relative flex w-full justify-center md:order-0 md:col-start-2 md:row-start-2 md:min-h-0 md:items-center md:justify-end lg:row-span-2 lg:row-start-1">
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[8%] left-[2%] z-1 hidden max-w-[28vw] max-md:block"
            >
              <Image
                src="/leave.svg"
                alt=""
                width={187}
                height={356}
                className="h-auto w-full opacity-70 -scale-y-100 blur-[0.6px]"
              />
            </div>
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              priority
              fetchPriority="high"
              sizes="(max-width: 800px) 100vw, 50vw"
              className="relative z-10 w-2/3 h-auto md:w-full max-w-full object-contain object-bottom self-end"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute top-[8%] right-[2%] z-20 hidden max-w-[28vw] max-md:block"
            >
              <Image
                src="/leave.svg"
                alt=""
                width={187}
                height={356}
                className="h-auto w-full -scale-x-100  opacity-90"
              />
            </div>
          </div>
          <div className="order-2 mb-0 text-center md:order-0 md:mb-8 md:col-start-1 md:row-start-2 md:text-left">
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
