import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("session")?.value;

  if (!session || decodeURIComponent(session) !== "valid") {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = `redirect=${encodeURIComponent(request.nextUrl.pathname)}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
