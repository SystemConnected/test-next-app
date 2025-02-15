import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, publicRoutes } from "./config/protectedRoutes";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Skip middleware for public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Protect only the necessary routes
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  

  return NextResponse.next();
}

// Ensure middleware only runs for relevant routes
export const config = {
  matcher: [...protectedRoutes.map(route => `${route}/:path*`)],
};
