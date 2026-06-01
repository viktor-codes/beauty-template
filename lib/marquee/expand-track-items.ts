export interface MarqueeTrackLayout {
  itemWidthPx: number;
  gapPx: number;
  /** Minimum width of one animation segment (one copy before clones). */
  minSegmentWidthPx: number;
}

function segmentWidthPx(itemCount: number, layout: MarqueeTrackLayout): number {
  if (itemCount === 0) {
    return 0;
  }

  const { itemWidthPx, gapPx } = layout;
  return itemCount * itemWidthPx + Math.max(0, itemCount - 1) * gapPx;
}

/**
 * Repeats `items` in order until one segment is wide enough for a seamless -50% loop.
 * WHY: With few logos, one segment can be narrower than the viewport; at -50% translate
 * the track ends before the viewport is filled, so the loop looks like it cuts off.
 */
export function expandMarqueeTrackItems<T>(
  items: readonly T[],
  layout: MarqueeTrackLayout,
): T[] {
  if (items.length === 0) {
    return [];
  }

  let expanded = [...items];
  while (segmentWidthPx(expanded.length, layout) < layout.minSegmentWidthPx) {
    expanded = expanded.concat(items);
  }

  return expanded;
}

/** Brand row in about-section: w-36 (144px) + gap-4 (16px), inside max-w-5xl. */
export const ABOUT_BRAND_MARQUEE_LAYOUT: MarqueeTrackLayout = {
  itemWidthPx: 144,
  gapPx: 16,
  minSegmentWidthPx: 1100,
};
