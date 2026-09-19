import { NextRequest, NextResponse } from "next/server";
import { memoryRateLimiter } from "@/infrastructure/security/rateLimiter";
import { isAllowedYouTubeTimedTextUrl } from "@/infrastructure/security/youtubeSubtitleUrl";

const REQUEST_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
  Accept: "application/json, application/xml, text/xml, text/plain;q=0.9, */*;q=0.1",
};

const MAX_SUBTITLE_BYTES = 1_000_000;

function isValidSubtitleContent(text: string): boolean {
  if (!text || text.trim().length < 30) return false;
  const lower = text.toLowerCase();
  return !(
    lower.includes("we're sorry") ||
    lower.includes("automated queries") ||
    (lower.startsWith("<!doctype html") && !lower.includes("<text") && !lower.includes('"events"'))
  );
}

function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/**
 * Same-origin proxy for a narrowly allowlisted YouTube timedtext resource.
 * It intentionally never follows redirects or uses public proxy relays.
 */
export async function GET(request: NextRequest) {
  const targetUrl = request.nextUrl.searchParams.get("url") || "";
  if (!isAllowedYouTubeTimedTextUrl(targetUrl)) {
    return NextResponse.json({ error: "Invalid subtitle URL" }, { status: 400 });
  }

  const limit = memoryRateLimiter.check(`youtube-subtitle-proxy:${getClientIp(request)}`, 30, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many subtitle requests" },
      { status: 429, headers: { "Retry-After": String(limit.resetSeconds) } }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(targetUrl, {
      headers: REQUEST_HEADERS,
      cache: "no-store",
      redirect: "error",
      signal: controller.signal,
    });

    const contentLength = Number(response.headers.get("content-length") || 0);
    if (!response.ok || (contentLength > MAX_SUBTITLE_BYTES && Number.isFinite(contentLength))) {
      return NextResponse.json({ error: "Subtitle upstream unavailable" }, { status: 502 });
    }

    const text = await response.text();
    if (text.length > MAX_SUBTITLE_BYTES || !isValidSubtitleContent(text)) {
      return NextResponse.json({ error: "Invalid subtitle content" }, { status: 502 });
    }

    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return NextResponse.json({ error: "Subtitle upstream unavailable" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }
}
