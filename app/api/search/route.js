import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q");
        const res = await fetch(
            `http://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API}&q=${query}`
        );
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        return NextResponse.json({ results: data });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch data" },
            { status: 500 }
        );
    }
}
