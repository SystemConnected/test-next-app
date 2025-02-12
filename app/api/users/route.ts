import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(req: NextRequest) {
  // Check the request method
  if (req.method !== 'GET') {
    return NextResponse.json(
      { message: 'Method not allowed' },
      { status: 405 }
    );
  }

  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all users
    const allUser = await User.find();

    // Return success response
    return NextResponse.json(
      { status: 200, message: "Users Data Fetched Successfully", user: allUser },
      { status: 200 }
    );
  } catch (error) {
    // Log the error and return an error response
    console.error("Users Data Fetching Error:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}