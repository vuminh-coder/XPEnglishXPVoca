import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Universal Mobile-Safe TTS Proxy Route.
 * Streams clean MP3 audio to mobile browsers without CORS, Referer, or 403 Forbidden blocking.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || searchParams.get("q") || "";
    const rawLang = searchParams.get("lang") || searchParams.get("tl") || "en-US";

    const cleanText = text.slice(0, 300).trim();
    if (!cleanText) {
      return NextResponse.json({ error: "Missing text parameter" }, { status: 400 });
    }

    // Normalize language code (e.g. en-US, en-GB, en-AU)
    let lang = "en";
    if (rawLang.toLowerCase().includes("gb") || rawLang.toLowerCase().includes("uk")) {
      lang = "en-GB";
    } else if (rawLang.toLowerCase().includes("au")) {
      lang = "en-AU";
    } else {
      lang = "en-US";
    }

    // Use Google TTS with customized desktop User-Agent to avoid mobile 403 blocking
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=${lang}&client=tw-ob`;

    const response = await fetch(ttsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
    });

    if (!response.ok) {
      // Fallback with simpler lang parameter if regional code failed
      const fallbackUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=en&client=tw-ob`;
      const fallbackRes = await fetch(fallbackUrl, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Referer: "https://translate.google.com/",
        },
      });

      if (!fallbackRes.ok) {
        return NextResponse.json({ error: "TTS upstream error" }, { status: 502 });
      }

      const audioBuffer = await fallbackRes.arrayBuffer();
      return new NextResponse(audioBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
          "Accept-Ranges": "bytes",
        },
      });
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Accept-Ranges": "bytes",
      },
    });
  } catch (error: any) {
    console.error("[TTS API Error]:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
