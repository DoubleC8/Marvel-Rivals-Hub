// app/api/update-player/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { uid } = await req.json();

  try {
    const response = await fetch(
      `https://marvelrivalsapi.com/api/v1/player/${uid}/update`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.API_KEY!,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to update player:", error);
    return NextResponse.json(
      { message: "Failed to update player" },
      { status: 500 }
    );
  }
}