// app/api/seasons/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://marvelrivalsapi.com/api/v1/seasons", {
      headers: {
        "x-api-key": process.env.API_KEY!,
      },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data.seasons);
  } catch (error) {
    console.error("Error fetching seasons:", error);
    return new NextResponse("Failed to fetch seasons", { status: 500 });
  }
}