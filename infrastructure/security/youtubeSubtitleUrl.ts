const YOUTUBE_TIMEDTEXT_HOSTS = new Set(["www.youtube.com", "youtube.com"]);
const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/**
 * Validates the only remote resource this proxy is allowed to retrieve.
 * Do not broaden this allowlist without a security review: this endpoint is a
 * server-side fetch primitive and a permissive URL check would reintroduce SSRF.
 */
export function isAllowedYouTubeTimedTextUrl(value: string): boolean {
  if (!value || value.length > 2_048) return false;

  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    if (!YOUTUBE_TIMEDTEXT_HOSTS.has(url.hostname)) return false;
    if (url.pathname !== "/api/timedtext") return false;

    const videoId = url.searchParams.get("v");
    return Boolean(videoId && VIDEO_ID_PATTERN.test(videoId));
  } catch {
    return false;
  }
}
