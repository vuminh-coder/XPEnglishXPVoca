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

export {
  extractYouTubeVideoId,
  cleanSubtitleLine,
  detectProperNounsInSentence,
  extractKeywordsFromSentence,
  estimateCefrLevel,
  formatDurationSeconds,
  normalizeSentenceText,
} from "../utils/videoUrlHelper";

import {
  extractYouTubeVideoId,
  cleanSubtitleLine,
  detectProperNounsInSentence,
  extractKeywordsFromSentence,
  estimateCefrLevel,
  formatDurationSeconds,
  normalizeSentenceText,
} from "../utils/videoUrlHelper";

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
