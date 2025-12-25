import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authToken");

  if (!token && request.nextUrl.pathname.startsWith("/courses")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
