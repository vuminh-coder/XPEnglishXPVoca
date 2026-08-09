import { NextRequest, NextResponse } from "next/server";

/**
 * Hybrid Same-Origin Proxy Endpoint for YouTube TimedText & Caption Tracks.
 * When direct fetch fails (YouTube blocks Vercel datacenter IP),
 * automatically retries through external proxy services with different IPs.
 * 
 * GET /api/youtube/subtitles/proxy?url=<encoded_youtube_timedtext_url>
 */

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
  "Accept": "*/*",
};

function isGoogleRateLimitPage(text: string): boolean {
  if (!text) return true;
  const lower = text.toLowerCase();
  return (
    lower.includes("we're sorry") ||
    lower.includes("<title>sorry...") ||
    lower.includes("automated queries") ||
    (lower.startsWith("<!doctype html") && !lower.includes("<text"))
  );
}

function isValidSubtitleContent(text: string): boolean {
  if (!text || text.trim().length < 30) return false;
  if (isGoogleRateLimitPage(text)) return false;
  return true;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl || !targetUrl.startsWith("http")) {
    return NextResponse.json({ error: "Missing or invalid target URL" }, { status: 400 });
  }

  // Tier 1: Direct server fetch
  try {
    const res = await fetch(targetUrl, {
      headers: REQUEST_HEADERS,
      cache: "no-store",
    });
    if (res.ok) {
      const text = await res.text();
      if (isValidSubtitleContent(text)) {
        console.log(`[Proxy Tier 1] Direct fetch SUCCESS (${text.length} chars)`);
        return new NextResponse(text, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      }
      console.warn(`[Proxy Tier 1] Direct fetch returned invalid content (${text.length} chars, rate-limited: ${isGoogleRateLimitPage(text)})`);
    } else {
      console.warn(`[Proxy Tier 1] Direct fetch HTTP ${res.status}`);
    }
  } catch (e: any) {
    console.warn(`[Proxy Tier 1] Direct fetch error: ${e?.message}`);
  }

  // Tier 2: AllOrigins proxy (Cloudflare-based, different IP)
  try {
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl, { cache: "no-store" });
    if (res.ok) {
      const text = await res.text();
      if (isValidSubtitleContent(text)) {
        console.log(`[Proxy Tier 2] AllOrigins SUCCESS (${text.length} chars)`);
        return new NextResponse(text, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      }
      console.warn(`[Proxy Tier 2] AllOrigins returned invalid content`);
    }
  } catch (e: any) {
    console.warn(`[Proxy Tier 2] AllOrigins error: ${e?.message}`);
  }

  // Tier 3: CodeTabs proxy (different infrastructure)
  try {
    const proxyUrl = `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl, { cache: "no-store" });
    if (res.ok) {
      const text = await res.text();
      if (isValidSubtitleContent(text)) {
        console.log(`[Proxy Tier 3] CodeTabs SUCCESS (${text.length} chars)`);
        return new NextResponse(text, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      }
      console.warn(`[Proxy Tier 3] CodeTabs returned invalid content`);
    }
  } catch (e: any) {
    console.warn(`[Proxy Tier 3] CodeTabs error: ${e?.message}`);
  }

  // Tier 4: CorsProxy.io
  try {
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    const res = await fetch(proxyUrl, { cache: "no-store" });
    if (res.ok) {
      const text = await res.text();
      if (isValidSubtitleContent(text)) {
        console.log(`[Proxy Tier 4] CorsProxy.io SUCCESS (${text.length} chars)`);
        return new NextResponse(text, {
          status: 200,
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      }
    }
  } catch (e: any) {
    console.warn(`[Proxy Tier 4] CorsProxy.io error: ${e?.message}`);
  }

  console.error(`[Proxy] ALL TIERS FAILED for URL: ${targetUrl.substring(0, 120)}...`);
  return NextResponse.json(
    { error: "All proxy tiers failed to fetch subtitle content from YouTube" },
    { status: 502 }
  );
}
