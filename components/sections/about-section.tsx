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
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        align="center"
        className="mx-auto max-w-3xl"
      />
      <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-muted">
        {content.description}
      </p>
      <ul className="mt-12 grid gap-6 sm:grid-cols-3">
        {content.stats.map((stat) => (
          <li
            key={stat.label}
            className="rounded-2xl border border-border bg-surface/50 px-6 py-8 text-center"
          >
            <p className="font-heading text-3xl text-accent">{stat.value}</p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-10 max-w-5xl">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
          Trusted brands I work with
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-4">
          {[
            { src: "/logos/esse.png", alt: "Esse" },
            { src: "/logos/jan-marini.png", alt: "Jan Marini" },
            { src: "/logos/obagi.png", alt: "Obagi" },
            { src: "/logos/zo.png", alt: "ZO Skin Health" },
          ].map((logo) => (
            <li
              key={logo.src}
              className="flex h-12 w-36 shrink-0 items-center justify-center rounded-xl bg-primary px-4"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={140}
                height={44}
                className="h-6 w-auto opacity-95 brightness-0 invert"
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
