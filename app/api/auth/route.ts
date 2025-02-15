import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import LoginDetail from "@/models/LoginDetails";

export async function POST(req: NextResponse) {
    try {
        const { token } = await req.json();
        if (!token) {
            return NextResponse.json({ message: "Token is required", status: "error" });
        };

        await connectDB();
        const user = await LoginDetail.findOne({ token: token });
        if (!user) {
            return NextResponse.json({ message: "Invalid token", isValid: false, status: "error" });
        }
        return NextResponse.json({ isValid: true, status: 200 });

    } catch {
        return NextResponse.json({ isValid: false, status: "error" });
    }
}