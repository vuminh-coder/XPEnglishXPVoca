/**
 * High-Performance In-Memory TTL Cache for Next.js Server & API Routes.
 * Eliminates repeated remote DB queries across US East cross-continental latency.
 *
 * Optimized for serverless: aggressive TTLs, automatic eviction,
 * and size limits to prevent memory leaks in long-lived instances.
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const MAX_CACHE_SIZE = 500; // Prevent unbounded memory growth

class MemoryCache {
  private get store(): Map<string, CacheEntry<any>> {
    const g = globalThis as any;
    if (!g.__sharedMemoryCacheStore) {
      g.__sharedMemoryCacheStore = new Map<string, CacheEntry<any>>();
    }
    return g.__sharedMemoryCacheStore;
  }

  /**
   * Retrieves an item from cache if it exists and has not expired.
   */
  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }

    return entry.data as T;
  }

  /**
   * Sets an item in cache with a Time-To-Live in seconds.
   * Automatically evicts oldest entries when cache exceeds MAX_CACHE_SIZE.
   */
  set<T>(key: string, data: T, ttlSeconds = 60): void {
    // Evict expired entries first, then oldest if still over limit
    if (this.store.size >= MAX_CACHE_SIZE) {
      this.evictExpired();
      if (this.store.size >= MAX_CACHE_SIZE) {
        // Delete oldest 20% of entries
        const keysToDelete = Math.ceil(MAX_CACHE_SIZE * 0.2);
        const iter = this.store.keys();
        for (let i = 0; i < keysToDelete; i++) {
          const next = iter.next();
          if (!next.done) this.store.delete(next.value);
        }
      }
    }

    this.store.set(key, {
      data,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  /**
   * Checks if an item exists and is still valid.
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Deletes a specific cache key.
   */
  delete(key: string): void {
    this.store.delete(key);
  }

  /** @deprecated Use delete() instead */
  del(key: string): void {
    this.store.delete(key);
  }

  /**
   * Deletes all keys matching a prefix or regex pattern.
   */
  invalidatePattern(pattern: string | RegExp): void {
    for (const key of this.store.keys()) {
      if (typeof pattern === "string" ? key.includes(pattern) : pattern.test(key)) {
        this.store.delete(key);
      }
    }
  }

  /**
   * Helper: gets from cache, or executes the async fallback producer and caches the result.
   */
  async getOrSet<T>(key: string, fallback: () => Promise<T>, ttlSeconds = 60): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    const freshData = await fallback();
    if (freshData !== null && freshData !== undefined) {
      this.set(key, freshData, ttlSeconds);
    }
    return freshData;
  }

  /**
   * Removes all expired entries from the cache.
   */
  private evictExpired(): void {
    const now = Date.now();
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
      }
    }
  }
}

// Preserve across dev hot-reloads on globalThis
const globalForCache = globalThis as unknown as {
  appMemoryCache?: MemoryCache;
};

export const memoryCache = globalForCache.appMemoryCache ?? new MemoryCache();

if (process.env.NODE_ENV !== "production") {
  globalForCache.appMemoryCache = memoryCache;
}
