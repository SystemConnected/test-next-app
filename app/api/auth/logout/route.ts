import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully",status:"success" });

  // Clear the session cookie
  response.headers.append("Set-Cookie", "token=; HttpOnly; Path=/; Max-Age=0");
  response.headers.append("Set-Cookies","user=; HttpOnly; Path=/; Max-Age=0");
  return response;
}
