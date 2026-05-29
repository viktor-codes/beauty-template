import { color } from "@sanity/color";
import { buildTheme } from "@sanity/ui/theme";

/** Design tokens aligned with app/globals.css @theme */
const tokens = {
  background: "#fafaf8",
  primary: "#2c2c2c",
  accent: "#c4956a",
  muted: "#757575",
} as const;

function tintWithHex<T extends { hex: string; title: string }>(
  tint: T,
  hex: string,
): T {
  return { ...tint, hex };
}

/** Studio theme via @sanity/ui/theme (replaces deprecated buildLegacyTheme). */
export const skinbarStudioTheme = buildTheme({
  palette: {
    ...color,
    black: tokens.primary,
    white: tokens.background,
    orange: {
      ...color.orange,
      500: tintWithHex(color.orange[500], tokens.accent),
    },
    gray: {
      ...color.gray,
      500: tintWithHex(color.gray[500], tokens.muted),
    },
  },
  color: {
    base: {
      default: {
        // Token names only — palette maps white → background, black → primary
        bg: ["white", "black"],
        fg: ["black", "white"],
      },
    },
    selectable: {
      primary: { _hue: "orange" },
    },
  },
});
