import { NextRequest, NextResponse } from "next/server";

import {
  revalidateSanityContent,
  type SanityWebhookPayload,
} from "@/lib/sanity/revalidate-sanity-content";
import { isRevalidateRequestAuthorized } from "@/lib/sanity/verify-revalidate-secret";

export const runtime = "nodejs";

function parseWebhookPayload(body: unknown): SanityWebhookPayload {
  if (!body || typeof body !== "object") {
    return {};
  }

  const record = body as Record<string, unknown>;

  return {
    _type: typeof record._type === "string" ? record._type : undefined,
    _id: typeof record._id === "string" ? record._id : undefined,
    language: typeof record.language === "string" ? record.language : undefined,
    slug: typeof record.slug === "string" ? record.slug : undefined,
  };
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET?.trim();

  if (!secret) {
    return NextResponse.json(
      { message: "SANITY_REVALIDATE_SECRET is not configured" },
      { status: 501 },
    );
  }

  if (!isRevalidateRequestAuthorized(request, secret)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const payload = parseWebhookPayload(body);
  const revalidated = revalidateSanityContent(payload);

  return NextResponse.json({
    ok: true,
    documentType: payload._type ?? null,
    revalidated,
  });
}
