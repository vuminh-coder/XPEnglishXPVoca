export function computeSimilarityScore(target: string, spoken: string): number {
  const t = target.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
  const s = spoken.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
  if (!t || !s) return 0;
  if (t === s) return 100;
  if (s.includes(t) || t.includes(s)) return 85;

  let matches = 0;
  const minLen = Math.min(t.length, s.length);
  for (let i = 0; i < minLen; i++) {
    if (t[i] === s[i]) matches++;
  }
  return Math.min(100, Math.round((matches / Math.max(t.length, s.length)) * 100));
}
