import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { generateUsername } from "@/lib/utils";
import { SideMenu } from "@/models/UserMenu";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();
    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ status: 400, message: "User already exists" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
     // Fetch default menu
     const defaultMenu = await SideMenu.find(); // Fetch all available menus
     const assignedMenus = defaultMenu.map(menu => ({
       menuId: menu._id,
       permissions: ["admin"], // Default permission
     }));
    const username = generateUsername(email);
    const newUser = { name, email, username, password: hashedPassword, menus: assignedMenus };
    await User.create(newUser);
    // Generate JWT token
    return NextResponse.json({ status: 201, message: "User created successfully", }, { status: 201 });
  }
  catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 })
  }
}
