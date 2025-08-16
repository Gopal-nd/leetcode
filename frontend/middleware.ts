import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Get the correct Better Auth session token
  const authToken = req.cookies.get("token")?.value;
  const origin = req.nextUrl.origin;
  
  console.log('[MIDDLEWARE] Origin:', origin);
  console.log('[MIDDLEWARE] Session token present:', authToken);
  
  const sessionUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/validate`;

  let session: { data?: { role?: string; email?: string } } | null = null;
  
  if (authToken) {
    try {
      const res = await fetch(sessionUrl, {
        method: "GET",
        credentials: "include",
      headers: {
        'Content-Type': 'application/json', 
        cookie: `token=${authToken}`
      }

      });
      
      console.log('[MIDDLEWARE] Session API status:', res.status);
      
      if (res.ok) {
        const data = await res.json();
        console.log('[MIDDLEWARE] Session data:', data);
        session = data;
      }
    } catch (error) {
      console.error('[MIDDLEWARE] Session fetch error:', error);
    }
  }

  const { pathname } = req.nextUrl;
  


  // Redirect authenticated users away from sign-in page
  if (pathname.startsWith("/sign-in") && session?.data) {
    const url = req.nextUrl.clone();
    url.pathname = session.data.role === "ADMIN" ? "/admin" : "/dashboard";
    console.log('[MIDDLEWARE] Redirecting authenticated user to:', url.pathname);
    return NextResponse.redirect(url);
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!session?.data) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      console.log('[MIDDLEWARE] Redirecting unauthenticated user to sign-in');
      return NextResponse.redirect(url);
    }
    
    if (session.data.role !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";
      console.log('[MIDDLEWARE] Redirecting non-admin to dashboard');
      return NextResponse.redirect(url);
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && !session?.data) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    console.log('[MIDDLEWARE] Redirecting unauthenticated data to sign-in');
    return NextResponse.redirect(url);
  }

  console.log('[MIDDLEWARE] Allowing access to:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/sign-in"],
};