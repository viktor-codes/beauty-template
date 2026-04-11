import type { HTMLAttributes } from "react";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center" | "right";
}

export function SectionHeading(props: SectionHeadingProps) {
  void props;
  return null;
}
