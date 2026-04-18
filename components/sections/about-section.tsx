import type { HTMLAttributes } from "react";

import Image from "next/image";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { AboutContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface AboutSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "content"
> {
  content: AboutContent;
}

export function AboutSection({
  content,
  className,
  id = "about",
  ...rest
}: AboutSectionProps) {
  return (
    <Section
      id={id}
      hasContainer={false}
      className={cn("relative overflow-hidden bg-background", className)}
      {...rest}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-[12%] right-[-8%] h-[min(28rem,70vw)] w-[min(42rem,95vw)] rounded-full bg-radial from-accent/9 via-accent/3 to-transparent blur-3xl" />
        <div className="absolute -bottom-[18%] -left-[12%] h-[min(24rem,60vw)] w-[min(36rem,90vw)] rounded-full bg-radial from-accent/6 via-transparent to-transparent blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              align="left"
              className="max-w-xl"
            />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
              {content.description
                .split("\n\n")
                .filter(Boolean)
                .map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md md:max-w-none">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-surface/50">
              <Image
                src="/about.webp"
                alt="Inna Chernovol in the studio"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {content.stats.map((stat) => (
          <li
            key={stat.label}
            className={cn(
              "relative rounded-2xl border border-border/90 bg-linear-to-b from-background to-surface/55",
              "px-6 py-8 text-center shadow-[0_2px_12px_-4px_rgba(44,44,44,0.1)]",
              "transition-[box-shadow,transform] duration-300",
              "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_10px_28px_-8px_rgba(44,44,44,0.14)]",
            )}
          >
            <p className="font-heading text-4xl text-accent">{stat.value}</p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-16 max-w-5xl">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
          {content.brandsEyebrow}
        </p>
        <div className="marquee-viewport mt-8 [--marquee-duration:48s] [--marquee-edge:var(--color-background)]">
          <div className="marquee-inner">
            <ul className="marquee-track list-none gap-4 py-2">
              {content.brandLogos.map((logo) => (
                <li
                  key={logo.src}
                  className="flex h-12 w-36 shrink-0 items-center justify-center rounded-xl bg-primary px-4"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width ?? 140}
                    height={logo.height ?? 44}
                    className="h-6 w-auto opacity-95 brightness-0 invert"
                    loading="lazy"
                  />
                </li>
              ))}
              {content.brandLogos.map((logo) => (
                <li
                  key={`${logo.src}-clone`}
                  className="marquee-item--clone flex h-12 w-36 shrink-0 items-center justify-center rounded-xl bg-primary px-4"
                  aria-hidden
                >
                  <Image
                    src={logo.src}
                    alt=""
                    width={logo.width ?? 140}
                    height={logo.height ?? 44}
                    className="h-6 w-auto opacity-95 brightness-0 invert"
                    loading="lazy"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      </div>
    </Section>
  );
}
