
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ status: 400, message: "Invalid User" }, { status: 400, })
        }
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return NextResponse.json({ status: 404, message: "User not found" }, {status: 404,})
        }

        return NextResponse.json({ status: 201, message: "User Deleted successfully", }, { status: 201 });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 })
    }
}