/**
 * Sanitize string to prevent basic XSS attacks
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return input;

  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
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
 * Check if request payload size exceeds specified limit in bytes
 */
export function isPayloadTooLarge(contentLengthHeader: string | null, maxSizeBytes: number): boolean {
  if (!contentLengthHeader) return false;
  const size = parseInt(contentLengthHeader, 10);
  if (isNaN(size)) return false;
  return size > maxSizeBytes;
}
