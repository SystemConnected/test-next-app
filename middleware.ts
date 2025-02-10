// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes } from "./config/protectedRoutes";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: protectedRoutes, // Dynamically protects routes
};