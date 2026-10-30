export function computeSimilarityScore(target: string, spoken: string): number {
  const normalize = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, " ");

  const tFull = normalize(target);
  const sFull = normalize(spoken);
  const t = tFull.replace(/\s+/g, "");
  const s = sFull.replace(/\s+/g, "");

  if (!t || !s) return 0;
  if (t === s || tFull === sFull) return 100;

  // Check if any spoken word matches the target word directly
  const spokenWords = sFull.split(" ");
  if (spokenWords.includes(tFull)) return 95;
  if (s.includes(t) || t.includes(s)) return 85;

  // Levenshtein Edit Distance for resilient phonetic/character alignment
  const m = t.length;
  const n = s.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = t[i - 1] === s[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // deletion
        dp[i][j - 1] + 1,      // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  return Math.max(0, Math.min(100, Math.round(((maxLen - distance) / maxLen) * 100)));
}
