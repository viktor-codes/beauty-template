import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

function rewriteLegacyServicesPath(pathname: string): string | null {
  const rewritten = pathname.replace(/\/services(?=\/|$)/, "/treatments");
  return rewritten === pathname ? null : rewritten;
}

export function proxy(request: NextRequest) {
  const legacyRewrite = rewriteLegacyServicesPath(request.nextUrl.pathname);
  if (legacyRewrite) {
    const url = request.nextUrl.clone();
    url.pathname = legacyRewrite;
    return NextResponse.redirect(url, 308);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
