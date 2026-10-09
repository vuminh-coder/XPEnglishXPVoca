/**
 * Shared media resolver for Listening (Dictation) and Shadowing studios.
 * Single source of truth for deciding whether a lesson is played through a
 * YouTube embed or through sentence-level TTS audio.
 *
 * Client-safe: no DB / Prisma dependencies.
 */
import { extractYouTubeVideoId } from "./videoUrlHelper";

export interface LessonMediaInfo {
  /** True when the lesson should be rendered with the YouTube cinema frame. */
  isVideoLesson: boolean;
  /** 11-char YouTube video id, or null for audio/TTS lessons. */
  youtubeId: string | null;
  /** Value to hand to `VideoCinemaFrame.sourceUrlOrId`. */
  sourceUrlOrId: string;
}

/**
 * Resolves media info from any lesson-like object (DB lesson, mock lesson,
 * mapped video lesson). Accepts both `audioUrl` and legacy `audio_url`.
 */
export function resolveLessonMedia(lesson: any): LessonMediaInfo {
  if (!lesson) {
    return { isVideoLesson: false, youtubeId: null, sourceUrlOrId: "" };
  }

  const audioUrl: string = lesson.youtubeUrl || lesson.audioUrl || lesson.audio_url || "";
  const externalId: string = lesson.videoMetadata?.externalId || "";
  const sourceUrlOrId: string = audioUrl || externalId || lesson.id || "";

  const youtubeId = extractYouTubeVideoId(sourceUrlOrId);

  const isVideoLesson = Boolean(
    lesson.videoMetadata ||
      lesson.sourceType === "YOUTUBE" ||
      audioUrl.includes("youtube.com") ||
      audioUrl.includes("youtu.be") ||
      youtubeId
  );

  return { isVideoLesson, youtubeId, sourceUrlOrId: String(sourceUrlOrId) };
}

/**
 * Returns the active (possibly merged) sentence used for playback, scoring
 * and rendering. Merging concatenates text/translation/IPA and extends the
 * end time to the next sentence so video playback covers both segments.
 */
export function buildEffectiveSentence<
  T extends {
    text: string;
    startTime?: number;
    endTime?: number;
    duration?: number;
    ipa?: string;
    vietnamese?: string;
    translation?: string;
  },
>(sentence: T | null, nextSentence: T | null, isMergedWithNext: boolean): (T & { duration?: number }) | null {
  if (!sentence) return null;
  if (!isMergedWithNext || !nextSentence) return sentence;

  const combinedText = `${sentence.text} ${nextSentence.text}`;
  const combinedVn = `${sentence.vietnamese || sentence.translation || ""} ${
    nextSentence.vietnamese || nextSentence.translation || ""
  }`.trim();
  const combinedIpa =
    sentence.ipa && nextSentence.ipa
      ? `${sentence.ipa} ${nextSentence.ipa}`
      : sentence.ipa || nextSentence.ipa;
  const start = sentence.startTime ?? 0;
  const combinedEndTime = nextSentence.endTime || (sentence.endTime ?? start) + 3;

  return {
    ...sentence,
    text: combinedText,
    vietnamese: combinedVn,
    translation: combinedVn,
    ipa: combinedIpa,
    endTime: combinedEndTime,
    duration: Math.max(3, combinedEndTime - start),
  };
}
