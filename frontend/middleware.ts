import { Session } from 'better-auth';
import { betterFetch } from '@better-fetch/fetch';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import  from 'better-auth/react'

export default async function middleware(request: NextRequest){
    const token = request.cookies.get("better-auth.session_token")?.value

    const origin = request.nextUrl.origin;
    const base = process.env.NEXT_PUBLIC_BACKEND_URL! || origin;

    const sessionUrl = `${base.replace(/\/$/, "")}/api/me`;
    let session: any | null = null;
    

    try {

    const res = await betterFetch<Session>(sessionUrl, {
      headers: { cookie: request.headers.get("cookie") || "" },
    });

    session = res.data;

    } catch (err) {

    console.error("failed to fetch session in middleware:", err);
    
    }


    if (request.nextUrl.pathname.startsWith('/admin') && session?.user?.role !== "ADMIN") {
        return NextResponse.rewrite(new URL('/', request.url))
    }
 
    if (request.nextUrl.pathname.startsWith('/dashboard') && !session) {
        return NextResponse.rewrite(new URL('/', request.url))
    }

  return NextResponse.next()
}
 

export const config = {
  matcher: ['/dashboard', '/dashboard/:path*', '/admin', '/admin/:path*'],
}