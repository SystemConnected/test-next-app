import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { generateToken, setCookie, validateEmail } from "@/lib/utils";
import { connectDB } from "@/lib/mongodb";
import  LoginDetail  from "@/models/LoginDetails";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  try {

    if (!email) {
      return NextResponse.json({ message: "Email is required", status: "error" });
    }

    if (validateEmail(email) === false) {
      return NextResponse.json({ message: "Invalid email", status: "error" });
    }

    if (!password) {
      return NextResponse.json({ message: "Password is required", status: "error" });
    }

    await connectDB();

    const user = await User.findOne({ email });

    //Create Login APi
    if (!user) {
      return NextResponse.json({ message: "User Not Found", status: 'error' });
    }

    const passwordMatch = await bcrypt.compare(password, user?.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid credentials", status: 'error' });
    }

    // Generate JWT token
    const token = generateToken(user);
    // setCookie("user", JSON.stringify({ id: user.id, name: user.name, username: user.username, email: user.email, role: user.role }), 3600);
    // setCookie("token", token, 3600);
    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role
      },
      status: 'success',
      token,
      message: "Login successful"
    });

    // Securely store token & user data in cookies
    response.headers.append(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`
    );

    // response.headers.append(
    //   "Set-Cookie",
    //   `user=${Buffer.from(JSON.stringify({
    //     id: user.id,
    //     name: user.name,
    //     username: user.username,
    //     email: user.email,
    //     role: user.role
    //   })).toString("base64")}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`
    // );


    await LoginDetail.findOneAndUpdate(
      { username: user.username },
      { $set: { token: token } },
      { new: true, upsert: true });

    return response;
  }
  catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ status: 'error', message: "Internal Server Error" })
  }
}
