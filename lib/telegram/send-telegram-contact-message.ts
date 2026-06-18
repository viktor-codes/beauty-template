import type { ContactFormValues } from "@/lib/schemas/contact-form";

interface TelegramSendMessageResponse {
  ok: boolean;
}

function isTelegramSendMessageResponse(
  value: unknown,
): value is TelegramSendMessageResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "ok" in value &&
    typeof value.ok === "boolean"
  );
}

function buildContactMessage(values: ContactFormValues): string {
  return [
    "New contact request",
    "",
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    "",
    "Message:",
    values.message,
  ].join("\n");
}

export async function sendTelegramContactMessage(
  values: ContactFormValues,
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) return false;

  let response: Response;

  try {
    response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: buildContactMessage(values),
      }),
    });
  } catch {
    return false;
  }

  if (!response.ok) return false;

  const result: unknown = await response.json().catch(() => null);
  return isTelegramSendMessageResponse(result) && result.ok;
}
