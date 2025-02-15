"use server";
import { connectDB } from "@/lib/mongodb";
import { getUserFromToken } from "@/lib/utils";
import { User } from "@/models/User";
import { SideMenu } from "@/models/UserMenu";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json({ status: "error", message: "Unauthorized" });
        }
        const user:any = getUserFromToken(token);
        if (!user) {
            return NextResponse.json({ status: "error", message: "Invalid Token" });
        }
        console.log("userData:", user);
       

        const menu = await SideMenu.find();
        const menuData = menu.map(menu => (menu.isActive ? { id: menu.id, title: menu.title, path: menu.path, subMenus: menu.subMenus } : null)).filter(Boolean);
        return NextResponse.json({ status: "success", message: "Menu Data Fetched Successfully", menuData });

    } catch (error) {
        console.error("Error fetching menu:", error);
        return NextResponse.json({ status: "error", message: "Internal Server Error" });

    }

}