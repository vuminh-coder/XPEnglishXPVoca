export const BOOKMARK_KEY = "xp_bookmarked_words";

export function getBookmarkedWords(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleBookmark(wordId: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getBookmarkedWords();
  const idx = current.indexOf(wordId);
  if (idx >= 0) {
    current.splice(idx, 1);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(current));
    return false;
  } else {
    current.push(wordId);
    localStorage.setItem(BOOKMARK_KEY, JSON.stringify(current));
    return true;
  }
}
