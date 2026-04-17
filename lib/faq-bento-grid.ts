import { cn } from "@/lib/cn";

export const FAQ_BENTO_ROOT_GRID = cn(
  "grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6",
  "md:grid-cols-2 md:items-stretch",
  "xl:grid-cols-12 xl:grid-flow-dense xl:gap-5",
);

export const FAQ_BENTO_TOPIC_CHIPS = cn(
  "mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none]",
  "md:mt-5 md:flex-wrap md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden xl:flex xl:flex-col xl:gap-2",
);

export const FAQ_BENTO_TOPIC_LINK = cn(
  "shrink-0 snap-start rounded-2xl border border-(--color-border) bg-background/80 px-3 py-2",
  "text-left text-xs font-medium text-primary",
  "transition-colors hover:border-accent/35 hover:text-accent",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30",
  "md:max-w-none xl:w-full",
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
