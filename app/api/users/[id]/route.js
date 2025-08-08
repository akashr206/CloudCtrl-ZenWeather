import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/db";
import User from "@/models/user";

export async function GET(req, { params }) {
    const { id } = await params;
    await connectMongoDB();
    const user = await User.findOne({ id });
    console.log(user);

    return NextResponse.json(user);
}
