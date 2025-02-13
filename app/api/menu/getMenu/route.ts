import { connectDB } from "@/lib/mongodb";
import { SideMenu } from "@/models/UserMenu";
import {  NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDB();
       const menu = await SideMenu.find();
       const menuData = menu.map(menu => (menu.isActive ? { id: menu.id, title: menu.title, path: menu.path, permissions: menu.permissions,  subMenus: menu.subMenus }: null)).filter(Boolean);
       return NextResponse.json({ status: 200, message: "Menu Data Fetched Successfully", menuData }, { status: 200 });
 
    } catch (error) {
        console.error("Error fetching menu:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 });

    }

}