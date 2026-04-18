import Link from "next/link";

import { toTelHref } from "@/lib/tel-href";
import { cn } from "@/lib/cn";

const linkClass =
  "text-accent underline underline-offset-2 transition-colors hover:text-primary";

export interface PrivacyContactChannelsProps {
  email: string;
  phone: string;
  className?: string;
}

export function PrivacyContactChannels({
  email,
  phone,
  className,
}: PrivacyContactChannelsProps) {
  const telHref = toTelHref(phone);

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-1", className)}>
      <Link href={`mailto:${encodeURIComponent(email)}`} className={linkClass}>
        {email}
      </Link>
      <span className="text-primary/90">or</span>
      <Link href={telHref} className={linkClass}>
        {phone}
      </Link>
    </span>
  );
}
