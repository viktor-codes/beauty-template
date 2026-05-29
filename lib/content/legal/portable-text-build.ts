import type { PortableTextBlock } from "@portabletext/types";

type InlinePart =
  | string
  | { text: string; isStrong?: boolean }
  | { text: string; href: string };

let blockKey = 0;

function nextKey(prefix: string): string {
  blockKey += 1;
  return `${prefix}-${blockKey}`;
}

function inlinePartsToBlock(
  parts: InlinePart[],
  style: "normal" | "h3" = "normal",
  listItem?: "bullet",
): PortableTextBlock {
  const markDefs: Array<{ _key: string; _type: "link"; href: string }> = [];
  const children: Array<{
    _type: "span";
    _key: string;
    text: string;
    marks: string[];
  }> = [];

  for (const part of parts) {
    if (typeof part === "string") {
      children.push({
        _type: "span",
        _key: nextKey("span"),
        text: part,
        marks: [],
      });
      continue;
    }

    if ("href" in part) {
      const markKey = nextKey("link");
      markDefs.push({ _key: markKey, _type: "link", href: part.href });
      children.push({
        _type: "span",
        _key: nextKey("span"),
        text: part.text,
        marks: [markKey],
      });
      continue;
    }

    children.push({
      _type: "span",
      _key: nextKey("span"),
      text: part.text,
      marks: part.isStrong ? ["strong"] : [],
    });
  }

  return {
    _type: "block",
    _key: nextKey("block"),
    style,
    listItem,
    markDefs,
    children,
  } as PortableTextBlock;
}

/** Resets keys between page builds (seed script). */
export function resetPortableTextKeys(): void {
  blockKey = 0;
}

export function legalParagraph(...parts: InlinePart[]): PortableTextBlock {
  return inlinePartsToBlock(parts, "normal");
}

export function legalSubheading(text: string): PortableTextBlock {
  return inlinePartsToBlock([text], "h3");
}

export function legalBulletItem(...parts: InlinePart[]): PortableTextBlock {
  return inlinePartsToBlock(parts, "normal", "bullet");
}
