import { prisma } from "@/infrastructure/database/prisma";
import { extractYouTubeCaptionsOnServer } from "@/features/listening/services/youtubeTrackExtractor";
import { cleanSubtitleText, normalizeSubtitlePipeline, NormalizedCue } from "@/features/listening/services/subtitleNormalizer";

export interface PreExtractedSegmentInput {
  startTime?: number;
  startSeconds?: number;
  endTime?: number;
  duration?: number;
  textEn?: string;
  english?: string;
  text?: string;
  textVn?: string;
  vietnamese?: string;
  translation?: string;
  wordTimings?: { word: string; start: number; end: number }[];
}

export interface IngestOptions {
  youtubeUrl: string;
  categorySlug?: string;
  playlistSlug?: string;
  customTitle?: string;
  customDescription?: string;
  cefrLevel?: string;
  submittedByUserId?: string;
  preferredLang?: string;
  preExtractedSegments?: PreExtractedSegmentInput[];
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
  wordTimings?: { word: string; start: number; end: number }[];
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
  detectProperNounsInSentence,
  extractKeywordsFromSentence,
  estimateCefrLevel,
  formatDurationSeconds,
  normalizeSentenceText,
} from "../utils/videoUrlHelper";

export class VideoCaptionsNotFoundError extends Error {
  code = "NO_CAPTIONS";
  constructor(message: string) {
    super(message);
    this.name = "VideoCaptionsNotFoundError";
  }
}

/**
 * Core Video Ingestion Pipeline:
 * Extracts captions in-process (never loopback HTTP), or uses client-provided pre-extracted/SRT/transcript segments,
 * normalizes segments, tags proper nouns & keywords, and saves to VideoLesson + LessonSegment database tables.
 */
export async function ingestYouTubeVideo(options: IngestOptions) {
  const {
    youtubeUrl,
    categorySlug,
    playlistSlug,
    customTitle,
    customDescription,
    submittedByUserId,
    preferredLang,
    preExtractedSegments,
  } = options;
  const videoId = extractYouTubeVideoId(youtubeUrl);

  if (!videoId) {
    throw new Error(`URL YouTube không hợp lệ: "${youtubeUrl}"`);
  }

  // 1. Resolve VideoCategory if specified
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

  // 3. Use pre-extracted segments (browser rescue / SRT / transcript) OR extract directly in-process
  let serverMetaTitle = "";
  let serverMetaAuthor = "";
  let rawItems: NormalizedCue[] = [];
  let rawVnItems: { startTime: number; endTime?: number; textVn: string }[] = [];

  if (Array.isArray(preExtractedSegments) && preExtractedSegments.length > 0) {
    for (const seg of preExtractedSegments) {
      const textEn = cleanSubtitleText(seg.textEn || seg.english || seg.text || "");
      if (!textEn) continue;

      const startRaw = seg.startTime ?? seg.startSeconds ?? 0;
      const startTime = Number.isFinite(Number(startRaw)) ? Math.max(0, Number(startRaw)) : 0;
      const durRaw =
        seg.duration ?? (typeof seg.endTime === "number" ? seg.endTime - startTime : 3.2);
      const duration = Math.max(0.4, Number.isFinite(Number(durRaw)) ? Number(durRaw) : 3.2);
      const endTime =
        typeof seg.endTime === "number" && seg.endTime > startTime
          ? Number(seg.endTime)
          : parseFloat((startTime + duration).toFixed(3));

      rawItems.push({
        startTime,
        endTime,
        duration,
        textEn,
        wordTimings: seg.wordTimings,
      });

      const vn = (seg.translation || seg.vietnamese || seg.textVn || "").trim();
      if (vn) {
        rawVnItems.push({ startTime, endTime, textVn: vn });
      }
    }
  } else {
    const extracted = await extractYouTubeCaptionsOnServer(videoId, { preferredLang });
    serverMetaTitle = extracted.title;
    serverMetaAuthor = extracted.authorName;

    if (!extracted.subtitles || extracted.subtitles.length === 0) {
      throw new VideoCaptionsNotFoundError(
        `Video YouTube (${videoId}) chưa trích xuất được phụ đề tự động (${extracted.failureReason}). Vui lòng nạp từ trình duyệt, file .srt/.vtt hoặc transcript.`
      );
    }

    rawItems = extracted.subtitles.map((sub) => {
      const startTime = Number.isFinite(sub.startSeconds) ? sub.startSeconds : 0;
      const duration = Math.max(0.4, sub.duration || 3);
      const endTime = parseFloat((startTime + duration).toFixed(3));
      if (sub.vietnamese) {
        rawVnItems.push({ startTime, endTime, textVn: sub.vietnamese });
      }
      return {
        startTime,
        endTime,
        duration,
        textEn: sub.english,
        wordTimings: sub.wordTimings,
      };
    });
  }

  const normalizedPipeline = normalizeSubtitlePipeline(rawItems, rawVnItems);
  if (normalizedPipeline.length === 0) {
    throw new VideoCaptionsNotFoundError(
      `Không tìm thấy phân đoạn phụ đề hợp lệ cho video ${videoId}.`
    );
  }

  const videoTitle = customTitle?.trim() || serverMetaTitle || `YouTube Lesson: ${videoId}`;
  const videoAuthor = serverMetaAuthor || "YouTube";
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  let totalWordsCount = 0;
  const segmentsData: IngestedSegmentData[] = normalizedPipeline.map((item, idx) => {
    const tokenCount = item.textEn.split(/\s+/).filter(Boolean).length;
    totalWordsCount += tokenCount;

    return {
      orderIndex: idx + 1,
      startTime: item.startTime,
      endTime: item.endTime,
      text: item.textEn,
      normalizedText: normalizeSentenceText(item.textEn),
      translationVi: item.textVn,
      properNouns: detectProperNounsInSentence(item.textEn),
      keywords: extractKeywordsFromSentence(item.textEn, 3),
      tokenCount,
      wordTimings: item.wordTimings,
    };
  });

  const lastSegment = segmentsData[segmentsData.length - 1];
  const durationSeconds = Math.ceil(lastSegment.endTime);
  const durationFormatted = formatDurationSeconds(durationSeconds);
  const wpm = durationSeconds > 0 ? Math.round((totalWordsCount / durationSeconds) * 60) : 120;
  const sampleCombinedText = segmentsData.slice(0, 30).map((s) => s.text).join(" ");
  const calculatedCefr = options.cefrLevel || estimateCefrLevel(sampleCombinedText, wpm);

  // Check if lesson with this externalId already exists
  const existing = await prisma.videoLesson.findFirst({
    where: { externalId: videoId },
    include: { segments: { select: { id: true } } },
  });

  if (existing) {
    const shouldReplaceSegments =
      existing.segments.length === 0 ||
      Boolean(preExtractedSegments && preExtractedSegments.length > 0);

    const updated = await prisma.$transaction(async (tx) => {
      const lesson = await tx.videoLesson.update({
        where: { id: existing.id },
        data: {
          title: customTitle?.trim() || existing.title || videoTitle,
          durationSeconds,
          durationFormatted,
          cefrLevel: calculatedCefr,
          wpmSpeed: wpm,
          categoryId: categoryId || existing.categoryId,
          playlistId: playlistId || existing.playlistId,
        },
      });

      if (shouldReplaceSegments) {
        await tx.lessonSegment.deleteMany({ where: { lessonId: existing.id } });
        await tx.lessonSegment.createMany({
          data: segmentsData.map((s) => ({
            lessonId: existing.id,
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
      }
      return lesson;
    });

    return {
      lesson: updated,
      segmentCount: shouldReplaceSegments ? segmentsData.length : existing.segments.length,
      isExisting: true,
    };
  }

  const slug = `yt-${videoId}-${Date.now().toString(36)}`;
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
