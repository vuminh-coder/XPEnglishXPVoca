import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Universal Mobile-Safe TTS Proxy Route.
 * Streams clean MP3 audio to mobile browsers without CORS, Referer, or 403 Forbidden blocking.
 */
// In-Memory TTS Audio Buffer Cache with max 500 items to prevent repeated network hops
const ttsBufferCache = new Map<string, { buffer: ArrayBuffer; timestamp: number }>();
const inFlightTtsMap = new Map<string, Promise<ArrayBuffer>>();
const MAX_TTS_CACHE_ITEMS = 500;
const TTS_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

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

    const cacheKey = `${lang}:${cleanText.toLowerCase()}`;

    // 1. Check in-memory buffer cache (0ms instant response)
    const cached = ttsBufferCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < TTS_CACHE_TTL_MS) {
      return new NextResponse(cached.buffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
          "Accept-Ranges": "bytes",
          "X-Cache": "HIT",
        },
      });
    }

    // 2. In-flight request coalescing
    if (inFlightTtsMap.has(cacheKey)) {
      const inFlightBuffer = await inFlightTtsMap.get(cacheKey)!;
      return new NextResponse(inFlightBuffer, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=31536000, immutable",
          "Accept-Ranges": "bytes",
          "X-Cache": "IN_FLIGHT_COALESCED",
        },
      });
    }

    // 3. Fetch from Google TTS with customized desktop User-Agent to avoid mobile 403 blocking
    const fetchTtsAudio = async (): Promise<ArrayBuffer> => {
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
          throw new Error("TTS upstream error");
        }

        return await fallbackRes.arrayBuffer();
      }

      return await response.arrayBuffer();
    };

    const ttsPromise = fetchTtsAudio();
    inFlightTtsMap.set(cacheKey, ttsPromise);

    let audioBuffer: ArrayBuffer;
    try {
      audioBuffer = await ttsPromise;
    } finally {
      inFlightTtsMap.delete(cacheKey);
    }

    // Cache the audio buffer in memory with size limit
    if (ttsBufferCache.size >= MAX_TTS_CACHE_ITEMS) {
      const oldestKey = ttsBufferCache.keys().next().value;
      if (oldestKey) ttsBufferCache.delete(oldestKey);
    }
    ttsBufferCache.set(cacheKey, { buffer: audioBuffer, timestamp: Date.now() });

    return new NextResponse(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Accept-Ranges": "bytes",
        "X-Cache": "MISS",
      },
    });
  } catch (error: any) {
    console.error("[TTS API Error]:", error);
    return NextResponse.json({ error: error?.message || "Internal server error" }, { status: 500 });
  }
}
