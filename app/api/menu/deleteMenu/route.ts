import { connectDB } from "@/lib/mongodb";
import { SideMenu } from "@/models/UserMenu";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        await connectDB();
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ status: "error", message: "Invalid Menu" })
        }
        const deletedMenu = await SideMenu.findByIdAndDelete(id);
        if (!deletedMenu) {
            return NextResponse.json({ status: "error", message: "Menu not found" })
        }
        return NextResponse.json({ status: "success", message: "Menu Deleted successfully" });

    } catch (error) {
        console.error("Error updating menu:", error);
        return NextResponse.json({ status: "error", message: "Internal Server Error" });
    }

}