import { NextRequest, NextResponse } from "next/server";


export async function middleware(req: NextRequest) {
  const token = req.cookies.get("better-auth.session_token")?.value;
  const origin = req.nextUrl.origin;
  const apiBase = process.env.NEXT_PUBLIC_BACKEND_URL ?? origin;
  const sessionUrl = `${apiBase.replace(/\/$/, "")}/api/me`;

  let session: { user?: { role?: string } } | null = null;
  if (token) {
    try {
      const res = await fetch(sessionUrl, {
        credentials: "include",
        headers: { cookie: `better-auth.session_token=${token}` },
      });
      if (res.ok) session = await res.json();
    } catch {}
  }

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/sign-in") && session) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && session?.user?.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/dashboard") && !session) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/sign-in"],
};
