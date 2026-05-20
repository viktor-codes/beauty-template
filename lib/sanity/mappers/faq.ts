import type { FAQContent, FAQGroup, FAQItem } from "@/lib/types/content";

import { mapSlugSafe } from "@/lib/sanity/mappers/safe";

interface SanityFaqItemLike {
  id?: string | { current?: string } | null;
  question?: string;
  answer?: string;
  isDefaultOpen?: boolean;
}

interface SanityFaqGroupLike {
  id?: string | { current?: string } | null;
  title?: string;
  subtitle?: string;
  items?: SanityFaqItemLike[] | null;
}

export interface SanityFaqLike {
  eyebrow?: string;
  title?: string;
  description?: string;
  introBullets?: string[] | null;
  groups?: SanityFaqGroupLike[] | null;
  items?: SanityFaqItemLike[] | null;
}

function mapFaqItemSafe(raw: SanityFaqItemLike, fallback?: FAQItem): FAQItem | null {
  const question = raw.question?.trim();
  const answer = raw.answer?.trim();
  if (!question || !answer) return null;

  const id = mapSlugSafe(raw.id, fallback?.id ?? "");

  return {
    ...(id ? { id } : fallback?.id ? { id: fallback.id } : {}),
    question,
    answer,
    isDefaultOpen: raw.isDefaultOpen ?? fallback?.isDefaultOpen,
  };
}

function mapFaqGroupSafe(raw: SanityFaqGroupLike, fallback?: FAQGroup): FAQGroup | null {
  const title = raw.title?.trim();
  if (!title) return null;

  const id = mapSlugSafe(raw.id, fallback?.id ?? title);
  const fallbackItems = fallback?.items ?? [];
  const items = (raw.items ?? [])
    .map((item, index) => mapFaqItemSafe(item, fallbackItems[index]))
    .filter((item): item is FAQItem => item !== null);

  if (items.length === 0 && fallbackItems.length === 0) return null;

  return {
    id,
    title,
    subtitle: raw.subtitle?.trim() || fallback?.subtitle,
    items: items.length > 0 ? items : fallbackItems,
  };
}

function flattenFaqItems(groups: FAQGroup[]): FAQItem[] {
  const seen = new Set<string>();
  const result: FAQItem[] = [];

  for (const group of groups) {
    for (const item of group.items) {
      const key = item.id ?? item.question;
      if (seen.has(key)) continue;
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

export function mapFaqSafe(raw: SanityFaqLike | null | undefined, fallback: FAQContent): FAQContent {
  if (!raw?.title?.trim()) return fallback;

  const fallbackGroups = fallback.groups ?? [];
  const groups = (raw.groups ?? [])
    .map((group, index) => mapFaqGroupSafe(group, fallbackGroups[index]))
    .filter((group): group is FAQGroup => group !== null);

  const mappedFlat = (raw.items ?? [])
    .map((item, index) => mapFaqItemSafe(item, fallback.items[index]))
    .filter((item): item is FAQItem => item !== null);

  const resolvedGroups = groups.length > 0 ? groups : fallbackGroups;
  const items =
    mappedFlat.length > 0
      ? mappedFlat
      : resolvedGroups.length > 0
        ? flattenFaqItems(resolvedGroups)
        : fallback.items;

  const introBullets = raw.introBullets?.map((b) => b.trim()).filter(Boolean);

  return {
    eyebrow: raw.eyebrow?.trim() || fallback.eyebrow,
    title: raw.title.trim(),
    description: raw.description?.trim() || fallback.description,
    introBullets:
      introBullets && introBullets.length > 0 ? introBullets : fallback.introBullets,
    groups: resolvedGroups.length > 0 ? resolvedGroups : fallback.groups,
    items,
  };
}
