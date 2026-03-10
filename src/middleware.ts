import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuthToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("site_auth");

  if (authCookie && (await verifyAuthToken(authCookie.value))) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /login (the login page itself)
     * - /api/login (the login API route)
     * - /_next/* (Next.js internals)
     * - /favicon.png, /og-image.png, /apple-touch-icon.png (social/browser assets)
     * - /kayvon-cursor.png (custom cursor)
     */
    "/((?!login|api/login|_next|favicon\\.png|og-image\\.png|apple-touch-icon\\.png|kayvon-cursor\\.png).*)",
  ],
};
