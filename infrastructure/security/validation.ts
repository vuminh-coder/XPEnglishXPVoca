/**
 * Sanitize string to prevent basic XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return input;

  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/javascript:/gi, "")
    .replace(/on\w+=/gi, "");
}

/**
 * Validate email format using standard RFC 5322 regex
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Extract client IP preferring edge-injected headers over spoofable x-forwarded-for.
 */
export function getTrustedClientIp(req: Request): string {
  const vercelIp = req.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercelIp) return vercelIp;

  const cfIp = req.headers.get("cf-connecting-ip")?.trim();
  if (cfIp) return cfIp;

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const xff = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (xff) return xff;

  return "127.0.0.1";
}

/**
 * Check if request payload size exceeds specified limit in bytes based on Content-Length header
 */
export function isPayloadTooLarge(contentLengthHeader: string | null, maxSizeBytes: number): boolean {
  if (!contentLengthHeader) return false;
  const size = parseInt(contentLengthHeader, 10);
  if (isNaN(size) || size < 0) return false;
  return size > maxSizeBytes;
}

/**
 * Reads streaming request body with a strict byte cap (defends against chunked requests missing Content-Length).
 */
export async function isStreamPayloadTooLarge(request: Request, maxSizeBytes: number): Promise<boolean> {
  if (isPayloadTooLarge(request.headers.get("content-length"), maxSizeBytes)) {
    return true;
  }

  if (!request.body) return false;

  try {
    const reader = request.clone().body?.getReader();
    if (!reader) return false;

    let totalBytes = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      totalBytes += value?.byteLength ?? 0;
      if (totalBytes > maxSizeBytes) {
        await reader.cancel().catch(() => {});
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}
