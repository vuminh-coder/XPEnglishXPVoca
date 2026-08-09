import { NextRequest, NextResponse } from "next/server";

/**
 * Same-Origin Proxy Endpoint for YouTube TimedText & Caption Tracks.
 * Completely eliminates Browser CORS errors and bypasses Cloud IP blocks.
 * GET /api/youtube/subtitles/proxy?url=<encoded_youtube_timedtext_url>
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl || !targetUrl.startsWith("http")) {
    return NextResponse.json({ error: "Missing or invalid target URL" }, { status: 400 });
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
        "Accept": "*/*",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: `YouTube returned HTTP ${res.status}` }, { status: res.status });
    }

    const text = await res.text();
    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Proxy fetch failed", details: error?.message }, { status: 500 });
  }
}
