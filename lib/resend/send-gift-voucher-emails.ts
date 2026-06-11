import { getResendClient, getResendFromEmail } from "@/lib/resend/client";
import {
  buildGiftVoucherEmailBodies,
  type SendGiftVoucherEmailsInput,
} from "@/lib/resend/gift-voucher-email";

export async function sendGiftVoucherEmails(
  input: SendGiftVoucherEmailsInput,
): Promise<boolean> {
  const resend = getResendClient();
  const from = getResendFromEmail();

  if (!resend || !from) return false;

  const bodies = buildGiftVoucherEmailBodies(input);

  const [recipientResult, senderResult] = await Promise.all([
    resend.emails.send({
      from,
      to: input.recipientEmail,
      subject: bodies.recipientSubject,
      html: bodies.recipientHtml,
    }),
    resend.emails.send({
      from,
      to: input.senderEmail,
      subject: bodies.senderSubject,
      html: bodies.senderHtml,
    }),
  ]);

  return !recipientResult.error && !senderResult.error;
}
