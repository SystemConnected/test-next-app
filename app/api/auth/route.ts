import { NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";

export async function GET() {

    try {
        await connectDB();
        const sessionToken = cookies().get("sessionToken").value;
        if (!sessionToken) {
            return NextResponse.json({ user: null, status: 401 }, { status: 401 });
        }
        // Mock authentication (in real apps, decode JWT or fetch session)
        const user = User.find((user: any) => `token-${user.id}` === sessionToken);

        if (!user) {
            return NextResponse.json({ user: null, status: 401 }, { status: 401 });
        }
        return NextResponse.json({ user, status: 200 }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error, status: 500 }, { status: 500 });
    }
}