import type { AppLocale } from "@/i18n/routing";
import type { ContactFormCopy } from "@/lib/types/content";

const contactFormCopyEn = {
  nameLabel: "Name",
  namePlaceholder: "Alex Morgan",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  messageLabel: "Message",
  messagePlaceholder: "What would you like me to know?",
  submit: "Send message",
  submitPending: "Sending...",
  successMessage: "Message sent. Thank you.",
  errorMessage: "Message could not be sent. Please try again.",
  validation: {
    nameRequired: "Please enter your name.",
    nameTooLong: "Name is too long.",
    emailInvalid: "Enter a valid email address.",
    messageMin: "Please write at least 10 characters.",
    messageTooLong: "Message is too long.",
  },
} satisfies ContactFormCopy;

const contactFormCopyUk = {
  nameLabel: "Ім'я",
  namePlaceholder: "Олена Коваленко",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  messageLabel: "Повідомлення",
  messagePlaceholder: "Що б ви хотіли мені повідомити?",
  submit: "Надіслати повідомлення",
  submitPending: "Надсилаємо...",
  successMessage: "Повідомлення надіслано. Дякуємо.",
  errorMessage: "Не вдалося надіслати повідомлення. Спробуйте ще раз.",
  validation: {
    nameRequired: "Будь ласка, введіть ім'я.",
    nameTooLong: "Ім'я занадто довге.",
    emailInvalid: "Введіть коректну email-адресу.",
    messageMin: "Напишіть щонайменше 10 символів.",
    messageTooLong: "Повідомлення занадто довге.",
  },
} satisfies ContactFormCopy;

const contactFormCopyRu = {
  nameLabel: "Имя",
  namePlaceholder: "Анна Иванова",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",
  messageLabel: "Сообщение",
  messagePlaceholder: "Что бы вы хотели мне сообщить?",
  submit: "Отправить сообщение",
  submitPending: "Отправляем...",
  successMessage: "Сообщение отправлено. Спасибо.",
  errorMessage: "Не удалось отправить сообщение. Попробуйте ещё раз.",
  validation: {
    nameRequired: "Пожалуйста, введите имя.",
    nameTooLong: "Имя слишком длинное.",
    emailInvalid: "Введите корректный email.",
    messageMin: "Напишите не менее 10 символов.",
    messageTooLong: "Сообщение слишком длинное.",
  },
} satisfies ContactFormCopy;

export const contactFormCopyByLocale = {
  en: contactFormCopyEn,
  uk: contactFormCopyUk,
  ru: contactFormCopyRu,
} satisfies Record<AppLocale, ContactFormCopy>;

export function getStaticContactFormCopy(locale: AppLocale): ContactFormCopy {
  return contactFormCopyByLocale[locale] ?? contactFormCopyByLocale.en;
}
