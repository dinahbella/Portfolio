// middleware.js
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req) {
  const session = req.cookies.get("session");

  if (!session || session !== "valid") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Match protected paths
export const config = {
  matcher: ["/admin/:path*"],
};
