"use client";

import { useServerInsertedHTML } from "next/navigation";

export function ConsentModeDefaultScript() {
  useServerInsertedHTML(() => (
    <script id="consent-mode-default-v2" src="/scripts/consent-mode-default.js" />
  ));

  return null;
}
