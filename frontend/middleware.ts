import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {

  const authToken = req.cookies.get("token")?.value;
  const origin = req.nextUrl.origin;

  
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
      

      
      if (res.ok) {
        const data = await res.json();

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

    return NextResponse.redirect(url);
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!session?.data) {
      const url = req.nextUrl.clone();
      url.pathname = "/sign-in";
      return NextResponse.redirect(url);
    }
    
    if (session.data.role !== "ADMIN") {
      const url = req.nextUrl.clone();
      url.pathname = "/dashboard";

      return NextResponse.redirect(url);
    }
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && !session?.data) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/sign-in"],
};