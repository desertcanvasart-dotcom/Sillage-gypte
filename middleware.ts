import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Locale routing: Spanish lives under /es/*, English stays unprefixed at the
 * root. For an /es path we rewrite to the unprefixed route (so the same page
 * renders) and pass the locale to the app via the x-locale request header.
 * Everything stays server-rendered and crawlable; hreflang links the pair.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  let locale = "en";
  let rest = pathname;
  for (const l of ["es", "fr", "nl", "de"]) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      locale = l;
      rest = pathname.slice(l.length + 1) || "/";
      break;
    }
  }

  const headers = new Headers(req.headers);
  headers.set("x-locale", locale);
  headers.set("x-pathname", rest);

  if (locale === "en") {
    return NextResponse.next({ request: { headers } });
  }

  const url = req.nextUrl.clone();
  url.pathname = rest;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  // Skip Next internals, the API, static images and any file with an extension.
  matcher: ["/((?!_next/|api/|images/|favicon).*)"],
};
