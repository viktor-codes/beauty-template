"use client";

import type { HTMLAttributes } from "react";
import { useMemo } from "react";

import { cn } from "@/lib/cn";

export interface CalendlyEmbedProps extends HTMLAttributes<HTMLDivElement> {
  calendlyUrl: string;
  height?: number;
  minHeight?: number;
}

function toEmbedSrc(url: string, host: string): string {
  try {
    const u = new URL(url.trim());
    if (!u.searchParams.has("embed")) {
      u.searchParams.set("embed", "true");
    }
    u.searchParams.set("embed_domain", host);
    u.searchParams.set("embed_type", "Inline");
    return u.toString();
  } catch {
    return url.trim();
  }
}

export function CalendlyEmbed({
  calendlyUrl,
  height = 720,
  minHeight = 520,
  className,
  style,
  ...rest
}: CalendlyEmbedProps) {
  const src = useMemo(() => {
    const host =
      typeof window !== "undefined" ? window.location.hostname : "localhost";
    return toEmbedSrc(calendlyUrl, host);
  }, [calendlyUrl]);

  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-2xl border border-border bg-surface",
        className,
      )}
      style={{ minHeight, ...style }}
      {...rest}
    >
      <iframe
        title="Schedule an appointment"
        src={src}
        className="w-full border-0"
        style={{ height, minHeight: 520 }}
        loading="lazy"
      />
    </div>
  );
}
