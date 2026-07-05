"use client";

import { useServerInsertedHTML } from "next/navigation";

export interface JsonLdProps {
  data: Record<string, unknown>;
}

function serializeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  useServerInsertedHTML(() => (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  ));

  return null;
}
