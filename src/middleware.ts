import { betterFetch } from "@better-fetch/fetch";
import type { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

type Session = typeof auth.$Infer.Session;

const publicRoutes = [
  { path: "/auth/sign-in", whenAuthenticated: "redirect" },
  { path: "/auth/sign-up", whenAuthenticated: "redirect" },
  { path: "/", whenAuthenticated: "next" },
] as const;

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicRoute = publicRoutes.find((route) => route.path === path);

  const { data: session } = await betterFetch<Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "", // Forward the cookies from the request
      },
    }
  );

  if (!session && publicRoute) {
    return NextResponse.next();
  }

  if (!session && !publicRoute) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  if (session && publicRoute && publicRoute.whenAuthenticated === "redirect") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
