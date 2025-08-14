import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const lat = searchParams.get("lat");
        const lon = searchParams.get("lon");

        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
        );
        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data);
        } else {
            console.log(res);
            return NextResponse.json(
                { message: "An error occured" },
                { status: 500 }
            );
        }
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
