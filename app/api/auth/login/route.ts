import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    password: bcrypt.hashSync("password123", 10),
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      password: bcrypt.hashSync("password123", 10),
      },
]; // Temporary in-memory user storage

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey"; // Store securely in .env

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  const user = users.find(user => user.email === email);
  if (!user) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

  // Store JWT in an HttpOnly cookie
  const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email },token,status:201 });
  response.headers.set("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=3600`);
  
  return response;
}
