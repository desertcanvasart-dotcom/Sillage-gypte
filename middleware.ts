import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/admin/auth";

/**
 * Locale routing: Spanish lives under /es/*, English stays unprefixed at the
 * root. For an /es path we rewrite to the unprefixed route (so the same page
 * renders) and pass the locale to the app via the x-locale request header.
 * Everything stays server-rendered and crawlable; hreflang links the pair.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // The admin is English-only and unprefixed; everything but the login page needs a session.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const headers = new Headers(req.headers);
    headers.set("x-locale", "en");
    headers.set("x-pathname", pathname);
    // Server actions check the session themselves and answer with a message the
    // editor can show; a redirect here would make an expired save fail silently.
    const isAction = req.method === "POST" && req.headers.has("next-action");
    if (pathname !== "/admin/login" && !isAction && !(await verifySession(req.cookies.get(SESSION_COOKIE)?.value))) {
      const login = req.nextUrl.clone();
      login.pathname = "/admin/login";
      login.search = "";
      return NextResponse.redirect(login);
    }
    return NextResponse.next({ request: { headers } });
  }

  let locale = "en";
  let rest = pathname;
  for (const l of ["es", "fr", "nl", "de"]) {
    if (pathname === `/${l}` || pathname.startsWith(`/${l}/`)) {
      locale = l;
      rest = pathname.slice(l.length + 1) || "/";
      break;
    }
  }

  // A locale-prefixed admin path must not be rewritten past the session check above.
  if (rest === "/admin" || rest.startsWith("/admin/")) {
    const admin = req.nextUrl.clone();
    admin.pathname = rest;
    return NextResponse.redirect(admin);
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
