import { z } from "zod";

export interface ContactFormValidationMessages {
  nameRequired: string;
  nameTooLong: string;
  emailInvalid: string;
  phoneRequired: string;
  phoneInvalid: string;
  messageMin: string;
  messageTooLong: string;
}

function countPhoneDigits(value: string): number {
  return value.replace(/\D/g, "").length;
}

export function createContactFormSchema(messages: ContactFormValidationMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, messages.nameRequired)
      .max(120, messages.nameTooLong),
    email: z.string().trim().email(messages.emailInvalid),
    phone: z
      .string()
      .trim()
      .min(1, messages.phoneRequired)
      .refine((value) => {
        const digitCount = countPhoneDigits(value);
        return digitCount >= 7 && digitCount <= 15;
      }, messages.phoneInvalid),
    message: z
      .string()
      .trim()
      .min(10, messages.messageMin)
      .max(4000, messages.messageTooLong),
  });
}

export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};
