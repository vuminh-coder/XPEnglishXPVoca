import { prisma } from "@/infrastructure/database/prisma";
import {
  parseTimedTextAny,
  formatTimestampMs,
  WordTimingItem,
} from "@/features/listening/services/youtubeSubtitleParser";

export interface IngestOptions {
  youtubeUrl: string;
  categorySlug?: string;
  playlistSlug?: string;
  customTitle?: string;
  customDescription?: string;
  cefrLevel?: string; // A1, A2, B1, B2, C1, C2
  submittedByUserId?: string;
}

export interface IngestedSegmentData {
  orderIndex: number;
  startTime: number;
  endTime: number;
  text: string;
  normalizedText: string;
  ipaUs?: string;
  ipaUk?: string;
  translationVi: string;
  explanationAi?: string;
  properNouns: string[];
  keywords: string[];
  tokenCount: number;
}

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
export function estimateCefrLevel(textSample: string, wpm: number): string {
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

/**
 * Core Video Ingestion Pipeline:
 * Fetches YouTube captions, splits into sentences, tags proper nouns & keywords,
 * and saves to VideoLesson + LessonSegment database tables.
 */
export async function ingestYouTubeVideo(options: IngestOptions) {
  const { youtubeUrl, categorySlug, playlistSlug, customTitle, customDescription, submittedByUserId } = options;
  const videoId = extractYouTubeVideoId(youtubeUrl);

  if (!videoId) {
    throw new Error(`URL YouTube không hợp lệ: "${youtubeUrl}"`);
  }

  // 1. Resolve or create VideoCategory if specified
  let categoryId: string | null = null;
  if (categorySlug) {
    const cat = await prisma.videoCategory.findUnique({
      where: { slug: categorySlug },
    });
    if (cat) categoryId = cat.id;
  }

  // 2. Resolve Playlist if specified
  let playlistId: string | null = null;
  if (playlistSlug) {
    const pl = await prisma.videoPlaylist.findUnique({
      where: { slug: playlistSlug },
    });
    if (pl) playlistId = pl.id;
  }

  // 3. Fetch Captions via YouTube Captions API / direct XML extraction
  let captionsData: any = null;
  try {
    // Attempt internal server fetch
    const host = process.env.NEXTAUTH_URL || process.env.APP_URL || "http://localhost:3000";
    const res = await fetch(`${host}/api/youtube/captions?videoId=${videoId}`);
    if (res.ok) {
      captionsData = await res.json();
    }
  } catch (err) {
    console.warn("[Video Ingestion] Internal captions API fetch failed, trying direct fallback:", err);
  }

  const rawSubtitles = captionsData?.subtitles || [];
  if (!rawSubtitles || rawSubtitles.length === 0) {
    throw new Error(`Video YouTube (${videoId}) không tìm thấy phụ đề khả dụng.`);
  }

  const videoTitle = customTitle || captionsData?.title || `YouTube Lesson: ${videoId}`;
  const videoAuthor = captionsData?.authorName || "YouTube";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  // 4. Transform raw subtitles into structured sentence segments
  let totalWordsCount = 0;
  const segmentsData: IngestedSegmentData[] = [];

  rawSubtitles.forEach((item: any, idx: number) => {
    const textEn = cleanSubtitleLine(item.english || item.textEn || "");
    if (!textEn) return;

    const startSeconds = parseFloat(item.startSeconds ?? item.startTime ?? 0);
    const duration = parseFloat(item.duration ?? (item.endTime ? item.endTime - item.startTime : 3));
    const endSeconds = parseFloat((startSeconds + duration).toFixed(3));

    const tokenCount = textEn.split(/\s+/).filter(Boolean).length;
    totalWordsCount += tokenCount;

    const properNouns = detectProperNounsInSentence(textEn);
    const keywords = extractKeywordsFromSentence(textEn, 3);
    const normalizedText = normalizeSentenceText(textEn);
    const translationVi = item.vietnamese || item.textVn || "";

    segmentsData.push({
      orderIndex: idx + 1,
      startTime: startSeconds,
      endTime: endSeconds,
      text: textEn,
      normalizedText,
      translationVi,
      properNouns,
      keywords,
      tokenCount,
    });
  });

  if (segmentsData.length === 0) {
    throw new Error(`Không thể trích xuất phân đoạn phụ đề hợp lệ cho video ${videoId}.`);
  }

  const lastSegment = segmentsData[segmentsData.length - 1];
  const durationSeconds = Math.ceil(lastSegment.endTime);
  const durationFormatted = formatDurationSeconds(durationSeconds);

  const wpm = durationSeconds > 0 ? Math.round((totalWordsCount / durationSeconds) * 60) : 120;
  const sampleCombinedText = segmentsData.slice(0, 30).map((s) => s.text).join(" ");
  const calculatedCefr = options.cefrLevel || estimateCefrLevel(sampleCombinedText, wpm);

  const slug = `yt-${videoId}-${Date.now().toString(36)}`;

  // 5. Check if lesson with this externalId already exists
  const existing = await prisma.videoLesson.findFirst({
    where: { externalId: videoId },
    include: { segments: { select: { id: true } } },
  });

  if (existing) {
    console.log(`[Video Ingestion] Video ${videoId} đã tồn tại trong CSDL (${existing.id}). Đang cập nhật metadata...`);
    const updated = await prisma.videoLesson.update({
      where: { id: existing.id },
      data: {
        title: videoTitle,
        durationSeconds,
        durationFormatted,
        cefrLevel: calculatedCefr,
        wpmSpeed: wpm,
        categoryId: categoryId || existing.categoryId,
        playlistId: playlistId || existing.playlistId,
      },
    });
    return {
      lesson: updated,
      segmentCount: existing.segments.length,
      isExisting: true,
    };
  }

  // 6. Create new VideoLesson and bulk insert LessonSegments
  const createdLesson = await prisma.$transaction(async (tx) => {
    const lesson = await tx.videoLesson.create({
      data: {
        slug,
        title: videoTitle,
        description: customDescription || `Bài học luyện nghe nói từ kênh ${videoAuthor}`,
        sourceType: "YOUTUBE",
        externalId: videoId,
        thumbnailUrl,
        durationSeconds,
        durationFormatted,
        cefrLevel: calculatedCefr,
        supportedTypes: "BOTH",
        categoryId,
        playlistId,
        wpmSpeed: wpm,
        accent: "en-US",
        submittedByUserId: submittedByUserId || null,
        isCommunityCurated: !!submittedByUserId,
      },
    });

    // Create segments in batch
    await tx.lessonSegment.createMany({
      data: segmentsData.map((s) => ({
        lessonId: lesson.id,
        orderIndex: s.orderIndex,
        startTime: s.startTime,
        endTime: s.endTime,
        text: s.text,
        normalizedText: s.normalizedText,
        translationVi: s.translationVi,
        properNouns: s.properNouns,
        keywords: s.keywords,
        tokenCount: s.tokenCount,
      })),
    });

    return lesson;
  });

  return {
    lesson: createdLesson,
    segmentCount: segmentsData.length,
    isExisting: false,
  };
}
