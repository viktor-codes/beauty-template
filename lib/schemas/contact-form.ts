import { z } from "zod";

export interface ContactFormValidationMessages {
  nameRequired: string;
  nameTooLong: string;
  emailInvalid: string;
  messageMin: string;
  messageTooLong: string;
}

export function createContactFormSchema(messages: ContactFormValidationMessages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, messages.nameRequired)
      .max(120, messages.nameTooLong),
    email: z.string().trim().email(messages.emailInvalid),
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
  message: string;
};
