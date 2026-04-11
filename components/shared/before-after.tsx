import type { HTMLAttributes } from "react";

export interface BeforeAfterImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BeforeAfterProps extends HTMLAttributes<HTMLDivElement> {
  beforeImage: BeforeAfterImage;
  afterImage: BeforeAfterImage;
  caption?: string;
}

export function BeforeAfter(props: BeforeAfterProps) {
  void props;
  return null;
}
