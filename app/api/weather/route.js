import { NextResponse } from "next/server";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");
    const API_KEY = process.env.WEATHER_API;

    const res = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
    );
    if (res.status === 200) {
        const data = await res.json();
        return NextResponse.json(data);
    }
}
