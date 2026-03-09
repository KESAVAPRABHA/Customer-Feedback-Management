// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const role = req.cookies.get("role")?.value;

//   if (req.nextUrl.pathname.startsWith("/admin")) {
//     if (role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }
// }


// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Public routes that should never block
  const PUBLIC_PATHS = ['/', '/login', '/api/login', '/favicon.ico']
  const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
  if (isPublic) return NextResponse.next()

  // Protect /dashboard (and everything under it)
  if (pathname.startsWith('/admin')) {
    const role = req.cookies.get('role')?.value
    const userId = req.cookies.get('userId')?.value

    // Not logged in → go to login (with ?next= so we can send them back after login)
    if (!role || !userId) {
      const loginUrl = new URL('/login', req.url)
      // preserve original path for post-login redirect
      loginUrl.searchParams.set('next', pathname + search)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Default allow
  return NextResponse.next()
}

export const config = {
  // match everything except static assets and image optimizer
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}