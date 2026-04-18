import { cn } from "@/lib/cn";

export const FAQ_BENTO_ROOT_GRID = cn(
  "grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6",
  "md:grid-cols-2 md:items-stretch",
  "xl:grid-cols-12 xl:grid-flow-dense xl:gap-5",
);

/** Desktop (xl) column spans — must sum to full rows where intended. */
export const FAQ_GROUP_BENTO_XL: Record<string, string> = {
  "faq-group-planning": "xl:col-span-6",
  "faq-group-peels": "xl:col-span-6",
  "faq-group-injectables": "xl:col-span-8",
  "faq-group-devices": "xl:col-span-4",
  "faq-group-laser-veins": "xl:col-span-7",
  "faq-group-safety": "xl:col-span-5",
};

export function faqBentoTileClassName({
  isAccent = false,
  isEmphasis = false,
}: {
  isAccent?: boolean;
  isEmphasis?: boolean;
} = {}) {
  return cn(
    "relative isolate flex min-h-0 flex-col overflow-hidden rounded-3xl border border-(--color-border)",
    "bg-background p-5 shadow-sm sm:p-6",
    "ring-1 ring-primary/5",
    isAccent && "border-accent/30 bg-surface ring-accent/15",
    isEmphasis && "shadow-md ring-accent/20",
  );
}
