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

    if (!name || !email || !password ) {
      return NextResponse.json({ status: "error", message: "All fields are required" });
    }
    // check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ status: "error", message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = generateUsername(email); 
    
    // Fetch default menu
     const defaultMenu = await SideMenu.find(); // Fetch all available menus
     const assignedMenus = defaultMenu
     .filter(menu=>menu.isActive && menu.permissions.includes("user")) // Filter active menus
     .map(menu => ({
       menuId: menu._id,
       permissions: menu.permissions, // Default permission
     }));
    
    const newUser = { name, email, username, password: hashedPassword, menuPermissions: assignedMenus };
    await User.create(newUser);
    return NextResponse.json({ status: "success", message: "User created successfully", });
  }
  catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ status: "error", message: "Internal Server Error" })
  }
}
