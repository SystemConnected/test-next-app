//update user Menu and Permainssion

import { connectDB } from "@/lib/mongodb";
import { SideMenu } from "@/models/UserMenu";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {

    try{
        await connectDB();
        const { id, title, path, permissions, isActive, subMenus } = await req.json();
        if (!id) {
            return NextResponse.json({ status: 400, message: "Invalid Menu" }, { status: 400 })
        }
        const updatedMenu = await SideMenu.findByIdAndUpdate(id, {
            title,
            path,
            permissions,
            isActive,
            subMenus,
        }, { new: true });
        if (!updatedMenu) {
            return NextResponse.json({ status: "error", message: "Menu not found" })
        }
        return NextResponse.json({ status: "success", message: "Menu Updated successfully"});
    }
    catch (error) {
        console.error("Error updating menu:", error);
        return NextResponse.json({ status: "error", message: "Internal Server Error" });
      }
    }