import { z } from "zod";

const SanityEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default("production"),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().min(1).default("2025-05-05"),
  SANITY_API_READ_TOKEN: z.string().optional(),
});

export type SanityEnv = z.infer<typeof SanityEnvSchema>;

export function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
  return Boolean(projectId && dataset);
}

export function getSanityEnv(): SanityEnv | null {
  if (!isSanityConfigured()) return null;

  const parsed = SanityEnvSchema.safeParse({
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
    NEXT_PUBLIC_SANITY_API_VERSION:
      process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-05-05",
    SANITY_API_READ_TOKEN: process.env.SANITY_API_READ_TOKEN,
  });

  return parsed.success ? parsed.data : null;
}
