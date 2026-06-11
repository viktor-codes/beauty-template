import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { routing } from "@/i18n/routing";
import { resolveLegacyConcernRedirectPath } from "@/lib/services/legacy-concern-redirect";

const handleI18nRouting = createMiddleware(routing);

function rewriteLegacyServicesPath(pathname: string): string | null {
  const rewritten = pathname.replace(/\/services(?=\/|$)/, "/treatments");
  return rewritten === pathname ? null : rewritten;
}

export default function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  const legacyRewrite = rewriteLegacyServicesPath(pathname);
  if (legacyRewrite) {
    const url = request.nextUrl.clone();
    url.pathname = legacyRewrite;
    return NextResponse.redirect(url, 308);
  }

  const legacyConcernPath = resolveLegacyConcernRedirectPath(pathname, searchParams);
  if (legacyConcernPath) {
    const url = request.nextUrl.clone();
    url.pathname = legacyConcernPath;
    url.search = "";
    return NextResponse.redirect(url, 308);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
