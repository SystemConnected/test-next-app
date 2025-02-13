import { connectDB } from "@/lib/mongodb";
import { SideMenu } from "@/models/UserMenu";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ status: 400, message: "Invalid Menu" }, { status: 400 })
        }
        const deletedMenu = await SideMenu.findByIdAndDelete(id);
        if (!deletedMenu) {
            return NextResponse.json({ status: 404, message: "Menu not found" }, { status: 404 })
        }
        return NextResponse.json({ status: 201, message: "Menu Deleted successfully" }, { status: 201 });

    } catch (error) {
        console.error("Error updating menu:", error);
        return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 });
    }

}