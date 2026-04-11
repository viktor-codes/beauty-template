import type { HTMLAttributes } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { AboutContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface AboutSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
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
    </Section>
  );
}
