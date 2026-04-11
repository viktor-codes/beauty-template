import Image from "next/image";
import type { HTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
import type { HeroContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface HeroSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
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
        "bg-surface pb-16 pt-8 md:pb-24 md:pt-12",
        className,
      )}
      {...rest}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              {content.eyebrow}
            </p>
            <h1 className="mt-4 font-heading text-4xl leading-tight tracking-tight text-primary md:text-5xl lg:text-6xl">
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
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border shadow-sm lg:aspect-[3/4]">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
