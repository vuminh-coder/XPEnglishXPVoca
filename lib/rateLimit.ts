interface RateLimitStore {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitStore>();

/**
 * Checks if a user has exceeded the rate limit.
 *
 * @param userId Unique identifier for the user (e.g., user ID or IP address)
 * @param limit Maximum number of allowed requests in the window
 * @param windowMs Time window in milliseconds
 * @returns boolean true if rate limited (exceeded), false otherwise
 */
export function isRateLimited(userId: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const userRecord = rateLimitMap.get(userId) || { timestamps: [] };

  // Filter out timestamps outside the sliding window
  userRecord.timestamps = userRecord.timestamps.filter((ts) => now - ts < windowMs);

  if (userRecord.timestamps.length >= limit) {
    return true; // Limit exceeded
  }

  // Record this request timestamp
  userRecord.timestamps.push(now);
  rateLimitMap.set(userId, userRecord);
  return false;
}
