import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("authToken")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = ["/admin", "/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Auth routes
  const authRoutes = ["/login"];
  const isAuthRoute = authRoutes.includes(pathname);

  // Redirect to login if trying to access protected route without auth
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if trying to access auth route while authenticated
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}
