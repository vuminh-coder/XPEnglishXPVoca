export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

class MemoryRateLimiter {
  private store = new Map<string, RateLimitRecord>();
  private lastCleanup = Date.now();
  private cleanupIntervalMs = 60 * 1000; // Cleanup every 1 minute

  private cleanupExpired() {
    const now = Date.now();
    if (now - this.lastCleanup < this.cleanupIntervalMs) return;

    this.lastCleanup = now;
    for (const [key, record] of this.store.entries()) {
      if (record.resetTime <= now) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Check and increment rate limit for a key
   * @param key Unique identifier (IP, userId, etc.)
   * @param limit Max requests allowed in timeframe
   * @param windowMs Time window in milliseconds
   */
  public check(key: string, limit: number, windowMs: number): RateLimitResult {
    this.cleanupExpired();

    const now = Date.now();
    const record = this.store.get(key);

    if (!record || record.resetTime <= now) {
      // New window or expired
      const newRecord: RateLimitRecord = {
        count: 1,
        resetTime: now + windowMs,
      };
      this.store.set(key, newRecord);

      return {
        allowed: true,
        limit,
        remaining: limit - 1,
        resetSeconds: Math.ceil(windowMs / 1000),
      };
    }

    if (record.count >= limit) {
      // Exceeded limit
      const resetSeconds = Math.ceil((record.resetTime - now) / 1000);
      return {
        allowed: false,
        limit,
        remaining: 0,
        resetSeconds: Math.max(1, resetSeconds),
      };
    }

    // Increment count
    record.count += 1;
    const remaining = Math.max(0, limit - record.count);
    const resetSeconds = Math.ceil((record.resetTime - now) / 1000);

    return {
      allowed: true,
      limit,
      remaining,
      resetSeconds: Math.max(1, resetSeconds),
    };
  }
}

// Singleton rate limiter instance
export const memoryRateLimiter = new MemoryRateLimiter();
