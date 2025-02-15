import { connectDB } from "@/lib/mongodb";
import { SideMenu } from "@/models/UserMenu";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const { title, path, permissions, isActive, subMenus } = await req.json();
       
        const newMenu = new SideMenu({
            title,
            path,
            permissions,
            isActive,
            subMenus,
        });
        await newMenu.save();
        return NextResponse.json({ message: "Menu created successfully", status: "success" });
    } catch (error) {
        console.error("Error inserting menu:", error);
        return NextResponse.json({ status: "error", message: "Internal Server Error" });
    }
}