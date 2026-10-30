/**
 * Deterministic pseudo-random number generator for SSR-safe consistent shuffling.
 * Prevents hydration mismatches between SSR and Client components.
 */
export function getDeterministicRandom(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return () => {
    hash = Math.imul(hash, 48271) + 1;
    return ((hash >>> 0) % 1000) / 1000;
  };
}

/**
 * Unbiased Fisher-Yates shuffle using a deterministic PRNG seed.
 */
export function seededShuffle<T>(items: T[], seed: string): T[] {
  const result = [...items];
  const prng = getDeterministicRandom(seed);
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(prng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
