
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ status: "error", message: "Invalid User" })
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ status: "error", message: "User not found" })
        }

        return NextResponse.json({ status: "success", message: "User Deleted successfully", });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ status: "error", message: "Internal Server Error" })
    }
}