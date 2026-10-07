/**
 * Client-safe, pure isomorphic utilities for video ingestion, URLs, proper nouns, and timestamps.
 * This file contains NO database or Prisma dependencies and is 100% safe to bundle into browser components.
 */

/**
 * Common English stop words to exclude from proper noun & keyword detection
 */
const COMMON_LOWER_WORDS = new Set([
  "the", "and", "that", "have", "for", "not", "with", "you", "this", "but", "his", "from",
  "they", "say", "her", "she", "will", "one", "all", "would", "there", "their", "what",
  "out", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time",
  "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some",
  "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its",
  "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first",
  "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "is", "am", "are", "was", "were", "been", "being", "do", "does", "did", "done", "a", "an",
  "to", "of", "in", "on", "at", "by", "up", "off", "if", "or", "so", "as", "my", "your"
]);

/**
 * Extracts 11-character YouTube video ID from various link formats:
 * - https://www.youtube.com/watch?v=UF8uR6Z6KLc
 * - https://youtu.be/UF8uR6Z6KLc
 * - https://www.youtube.com/shorts/UF8uR6Z6KLc
 * - UF8uR6Z6KLc
 */
export function extractYouTubeVideoId(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

/**
 * Strips subtitle noise such as [Music], [Applause], (cheers), HTML tags
 */
export function cleanSubtitleLine(text: string): string {
  if (!text) return "";
  return text
    .replace(/<[^>]+>/g, "")
    .replace(/\[(?:Music|Applause|Laughter|Cheering|Audio|Sound|Silence|Singing)\]/gi, "")
    .replace(/\((?:Music|Applause|Laughter|Cheering|Audio|Sound|Silence|Singing)\)/gi, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Detects Proper Nouns (Names, Places, Organizations)
 * E.g., "Steve Jobs", "Stanford", "UNESCO", "California"
 */
export function detectProperNounsInSentence(sentence: string): string[] {
  if (!sentence) return [];
  const words = sentence.split(/\s+/);
  const properNouns: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const rawWord = words[i].replace(/[^\w'-]/g, "");
    if (!rawWord || rawWord.length < 2) continue;

    const isFirstWordInSentence = i === 0;
    const isCapitalized = /^[A-Z][a-zA-Z'’-]+/.test(rawWord);
    const isAllUpperAcronym = /^[A-Z]{2,6}$/.test(rawWord);

    if (isAllUpperAcronym) {
      if (!properNouns.includes(rawWord)) properNouns.push(rawWord);
      continue;
    }

    if (isCapitalized) {
      const lower = rawWord.toLowerCase();
      // If it's the first word, check if it's a typical common word
      if (isFirstWordInSentence) {
        if (!COMMON_LOWER_WORDS.has(lower) && rawWord.length > 3) {
          // Check if followed by another capitalized word (e.g. "Steve Jobs")
          const nextWord = words[i + 1]?.replace(/[^\w'-]/g, "");
          if (nextWord && /^[A-Z][a-zA-Z'’-]+/.test(nextWord)) {
            const combined = `${rawWord} ${nextWord}`;
            if (!properNouns.includes(combined)) properNouns.push(combined);
            i++; // skip next word
            continue;
          }
        }
      } else {
        // Not first word, strongly likely a proper noun
        if (!COMMON_LOWER_WORDS.has(lower)) {
          const nextWord = words[i + 1]?.replace(/[^\w'-]/g, "");
          if (nextWord && /^[A-Z][a-zA-Z'’-]+/.test(nextWord) && !COMMON_LOWER_WORDS.has(nextWord.toLowerCase())) {
            const combined = `${rawWord} ${nextWord}`;
            if (!properNouns.includes(combined)) properNouns.push(combined);
            i++; // skip next word
          } else {
            if (!properNouns.includes(rawWord)) properNouns.push(rawWord);
          }
        }
      }
    }
  }

  return properNouns;
}

/**
 * Extracts high-value vocabulary keywords from sentence
 */
export function extractKeywordsFromSentence(sentence: string, count: number = 3): string[] {
  if (!sentence) return [];
  const tokens = sentence
    .replace(/[^\p{L}\s]/gu, "")
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 4 && !COMMON_LOWER_WORDS.has(w));

  const unique = Array.from(new Set(tokens));
  // Prefer longer and richer academic/descriptive words
  unique.sort((a, b) => b.length - a.length);
  return unique.slice(0, count);
}

/**
 * Estimates CEFR level based on vocabulary length and density
 */
export function estimateCefrLevel(textSample: string, wpm: number = 140): string {
  const words = textSample.toLowerCase().match(/[a-z]{3,}/g) || [];
  if (words.length === 0) return "B1";

  const avgLength = words.reduce((acc, w) => acc + w.length, 0) / words.length;

  if (avgLength > 6.2 && wpm > 150) return "C1";
  if (avgLength > 5.7) return "B2";
  if (avgLength > 5.0 || wpm > 130) return "B1";
  if (avgLength > 4.4) return "A2";
  return "A1";
}

/**
 * Formats seconds into "MM:SS" or "HH:MM:SS"
 */
export function formatDurationSeconds(seconds: number): string {
  const totalSec = Math.max(0, Math.floor(seconds));
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  if (hrs > 0) {
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
  }
  return `${pad(mins)}:${pad(secs)}`;
}

/**
 * Normalizes text for comparison (lowercased, punctuation removed)
 */
export function normalizeSentenceText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}
