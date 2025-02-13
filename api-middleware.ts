import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "./lib/mongodb";
import { LoginDetail } from "./models/LoginDetails";
import jwt from "jsonwebtoken";

const publicAPIs = ["/api/login", "/api/register", "/api/logout"]; // APIs without auth
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Store securely in .env

export async function middleware(req: NextRequest) {
    try {
        if (publicAPIs.includes(req.nextUrl.pathname)) {
            return NextResponse.next();
        }
        await connectDB();
        const token = req.headers.get("Authorization")?.split(" ")[1] || req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json({ status: 401, message: "Unauthorized: Missing token" }, { status: 401 });
        }
        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY) as { username: string; email: string };

        const userSession = await LoginDetail.findOne({ username: decoded.username, token });
        if (!userSession) {
            return NextResponse.json({ status: 401, message: "Unauthorized: Invalid token" }, { status: 401 });
        }
        return NextResponse.next();

    } catch (error) {
        console.error("API Middleware Error:", error);
        return NextResponse.json({ status: 401, message: "Unauthorized: Invalid token" }, { status: 401 });
    }
};

export const config = {
    matcher: "/api/*",
};
