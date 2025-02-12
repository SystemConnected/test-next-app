import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { generateToken, validateEmail } from "@/lib/utils";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {

    if (!email) {
      return NextResponse.json({ message: "Email is required", status: 400 }, { status: 400 });
    }

    if (validateEmail(email) === false) {
      return NextResponse.json({ message: "Invalid email", status: 400 }, { status: 400 });
    }

    if (!password) {
      return NextResponse.json({ message: "Password is required", status: 400 }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });

    //Create Login APi
    if (!user) {
      return NextResponse.json({ message: "User Not Found", status: 404 }, { status: 404 });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials", status: 401 }, { status: 401 });
    } 

    // Generate JWT token
    const token = generateToken(user);
    // Store JWT in an HttpOnly cookie

    const response = NextResponse.json({user,status: 200,token }, { status: 200 });
    response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600`);

    return response;
  }
  catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 })
  }
}
