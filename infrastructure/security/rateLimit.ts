import { memoryRateLimiter } from "./rateLimiter";

/**
 * Checks if a user has exceeded the rate limit.
 * Delegates to the shared self-pruning MemoryRateLimiter singleton to avoid
 * duplicate in-memory Maps and unbounded growth.
 *
 * @param userId Unique identifier for the user (e.g., user ID or IP address)
 * @param limit Maximum number of allowed requests in the window
 * @param windowMs Time window in milliseconds
 * @returns boolean true if rate limited (exceeded), false otherwise
 */
export function isRateLimited(userId: string, limit: number, windowMs: number): boolean {
  return !memoryRateLimiter.check(`rl:${userId}`, limit, windowMs).allowed;
}
