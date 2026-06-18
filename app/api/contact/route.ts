import { NextRequest, NextResponse } from "next/server";

import { createContactFormSchema } from "@/lib/schemas/contact-form";
import { sendTelegramContactMessage } from "@/lib/telegram/send-telegram-contact-message";

export const runtime = "nodejs";

const ContactRequestSchema = createContactFormSchema({
  nameRequired: "Name is required.",
  nameTooLong: "Name is too long.",
  emailInvalid: "Email is invalid.",
  messageMin: "Message is too short.",
  messageTooLong: "Message is too long.",
});

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = ContactRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const isSent = await sendTelegramContactMessage(parsed.data);
  if (!isSent) {
    return NextResponse.json(
      { message: "Unable to send contact request" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
