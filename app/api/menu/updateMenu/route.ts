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
            return NextResponse.json({ status: 404, message: "Menu not found" }, { status: 404 })
        }
        return NextResponse.json({ status: 201, message: "Menu Updated successfully"}, { status: 201 });
    }
    catch (error) {
        console.error("Error updating menu:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 });
      }
    }