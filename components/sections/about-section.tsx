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
    <Section id={id} className={cn("bg-background", className)} {...rest}>
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              align="left"
              className="max-w-xl"
            />
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
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
      </div>
      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {content.stats.map((stat) => (
          <li
            key={stat.label}
            className="rounded-2xl border border-border bg-surface/50 px-6 py-8 text-center"
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
            <ul className="marquee-track list-none gap-4 py-1">
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
    </Section>
  );
}
