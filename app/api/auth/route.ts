import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const users = [];

export async function GET() {
    const sessionToken = cookies().get("sessionToken").value;
    if (!sessionToken) {
        return NextResponse.json({user:null},{status:401});
    }
    // Mock authentication (in real apps, decode JWT or fetch session)
    const user = users.find((user) => `token-${user.id}` === sessionToken);


    if(!user){
        return NextResponse.json({user:null},{status:401});
    }

    return NextResponse.json({user},{status:200});
}