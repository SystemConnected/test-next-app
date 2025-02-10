import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Store securely in .env
export async function POST(req: Request) {
debugger;
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ status: 400, message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    const user = await User.create(newUser);
    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
    return NextResponse.json({ status: 201, token, message: "User created successfully", user });
  }
  catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" })
  }
}
