import type { NextRequest } from "next/server";

function readBearerToken(authorization: string | null): string | null {
  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice("Bearer ".length).trim();
  return token.length > 0 ? token : null;
}

/** Validates shared secret from Sanity webhook (header, bearer, or query param). */
export function isRevalidateRequestAuthorized(
  request: NextRequest,
  secret: string,
): boolean {
  const bearer = readBearerToken(request.headers.get("authorization"));
  if (bearer === secret) {
    return true;
  }

  const headerSecret = request.headers.get("x-sanity-revalidate-secret");
  if (headerSecret === secret) {
    return true;
  }

  const querySecret = request.nextUrl.searchParams.get("secret");
  return querySecret === secret;
}
