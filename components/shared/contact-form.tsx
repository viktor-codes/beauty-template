import type { FormHTMLAttributes } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export type ContactFormProps = FormHTMLAttributes<HTMLFormElement>;

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export function ContactForm({ className, ...rest }: ContactFormProps) {
  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      {...rest}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-primary">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Alex Morgan"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-primary">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className={fieldClass}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-primary">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          required
          placeholder="What would you like me to know?"
          className={cn(fieldClass, "resize-y min-h-[120px]")}
        />
      </div>
      <Button type="submit" className="self-start">
        Send message
      </Button>
    </form>
  );
}
