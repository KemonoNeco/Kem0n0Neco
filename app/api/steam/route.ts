import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.STEAM_API_KEY;
  const steamId = process.env.STEAM_ID;

  if (!apiKey || !steamId) {
    return NextResponse.json(null, { status: 404 });
  }

  try {
    const res = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`,
      { next: { revalidate: 30 } }
    );

    if (!res.ok) {
      return NextResponse.json(null, { status: 502 });
    }

    const data = await res.json();
    const player = data?.response?.players?.[0];

    if (!player) {
      return NextResponse.json(null, { status: 404 });
    }

    return NextResponse.json(
      {
        personaname: player.personaname,
        personastate: player.personastate,
        gameextrainfo: player.gameextrainfo ?? null,
        gameid: player.gameid ?? null,
        avatarfull: player.avatarfull,
        profileurl: player.profileurl,
      },
      {
        headers: { "Cache-Control": "public, max-age=30" },
      }
    );
  } catch {
    return NextResponse.json(null, { status: 500 });
  }
}
