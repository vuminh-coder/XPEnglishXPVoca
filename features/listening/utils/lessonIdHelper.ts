import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";
import { MOCK_VIDEO_LESSONS } from "@/features/listening/data/videoCatalogMockData";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const LESSON_PREFIX_REGEX = /^(?:listen|lesson|toeic|ielts)[\w-]*?_?(\d+)$/i;

/**
 * Universal Lesson ID Resolver & Canonical Normalizer
 * Resolves any query representation ("40", "040", "listen_040", "listen_toeic_q3_040")
 * to the exact canonical lesson ID in 0ms synchronously without waiting for DB catalog.
 * Preserves VideoLesson UUIDs, video IDs, and slugs without false-positive numeric conversions.
 */
export const resolveCanonicalLessonId = (
  queryId: string | null | undefined,
  list?: any[]
): string | null => {
  if (!queryId) return null;
  const strId = String(queryId).trim();
  if (!strId) return null;

  // 1. Check direct match in provided list if available
  if (list && list.length > 0) {
    const directMatch = list.find((l) => l.id === strId);
    if (directMatch) return directMatch.id;
  }

  // 2. Direct match in MOCK_LESSONS_DATA
  const directMock = MOCK_LESSONS_DATA.find((l) => l.id === strId);
  if (directMock) return directMock.id;

  // 3. Direct match in MOCK_VIDEO_LESSONS (by id, slug, or externalId)
  const directVideo = MOCK_VIDEO_LESSONS.find(
    (v) => v.id === strId || v.slug === strId || v.externalId === strId
  );
  if (directVideo) return directVideo.id;

  // 4. UUID & non-numeric identifier protection:
  // Never pass UUIDs (e.g. "1481dc60-fe8a-4fa9-830b-9a227ede9b6e") or video prefixes to parseInt!
  if (UUID_REGEX.test(strId) || /^(?:vid_|video_|yt_|youtube_)/i.test(strId)) {
    return strId;
  }

  // 5. Extract numeric value ONLY for pure digits ("40", "040") or structured lesson prefixes ("listen_040", "listen_toeic_q3_040", "lesson_40")
  let num: number | null = null;
  if (/^\d+$/.test(strId)) {
    num = parseInt(strId, 10);
  } else {
    const prefixMatch = strId.match(LESSON_PREFIX_REGEX);
    if (prefixMatch) {
      num = parseInt(prefixMatch[1], 10);
    }
  }

  if (num !== null && !isNaN(num)) {
    const pad3 = String(num).padStart(3, "0");

    // Search in provided list first
    if (list && list.length > 0) {
      const byIdCode = list.find(
        (l) =>
          l.id === `listen_${pad3}` ||
          l.id.endsWith(`_${pad3}`) ||
          l.id.includes(`_${pad3}`)
      );
      if (byIdCode) return byIdCode.id;

      // 1-indexed fallback in list
      if (num >= 1 && num <= list.length) {
        return list[num - 1].id;
      }
    }

    // 6. Frame-0 Synchronous Resolution via in-memory MOCK_LESSONS_DATA (Instant 0ms)
    const mockMatch = MOCK_LESSONS_DATA.find(
      (l) =>
        l.id === `listen_${pad3}` ||
        l.id.endsWith(`_${pad3}`) ||
        l.id.includes(`_${pad3}`)
    );
    if (mockMatch) return mockMatch.id;

    // 1-indexed fallback in MOCK_LESSONS_DATA
    if (num >= 1 && num <= MOCK_LESSONS_DATA.length) {
      return MOCK_LESSONS_DATA[num - 1].id;
    }

    return `listen_${pad3}`;
  }

  return strId;
};

/**
 * Checks if two lesson ID representations point to the exact same lesson
 * E.g. isSameLessonId("40", "listen_toeic_q3_040") === true
 * E.g. isSameLessonId("listen_040", "40") === true
 */
export const isSameLessonId = (
  idA: string | null | undefined,
  idB: string | null | undefined,
  list?: any[]
): boolean => {
  if (!idA && !idB) return true;
  if (!idA || !idB) return false;
  if (idA === idB) return true;

  const strA = String(idA).trim();
  const strB = String(idB).trim();
  if (strA === strB) return true;

  // Exact UUID match check (case-insensitive) - do not match on trailing digits
  const isUuidA = UUID_REGEX.test(strA);
  const isUuidB = UUID_REGEX.test(strB);
  if (isUuidA || isUuidB) {
    return strA.toLowerCase() === strB.toLowerCase();
  }

  const canonA = resolveCanonicalLessonId(strA, list);
  const canonB = resolveCanonicalLessonId(strB, list);

  if (canonA && canonB && canonA === canonB) return true;

  // Secondary check: compare trailing numeric portion ONLY for pure digits or lesson-prefixed IDs
  const isLessonPatternA = /^\d+$/.test(strA) || LESSON_PREFIX_REGEX.test(strA);
  const isLessonPatternB = /^\d+$/.test(strB) || LESSON_PREFIX_REGEX.test(strB);
  if (isLessonPatternA && isLessonPatternB) {
    const matchA = strA.match(/_?(\d+)$/);
    const matchB = strB.match(/_?(\d+)$/);
    if (matchA && matchB && parseInt(matchA[1], 10) === parseInt(matchB[1], 10)) {
      return true;
    }
  }

  return false;
};

/**
 * Legacy compatibility alias for existing code
 */
export const resolveLessonId = resolveCanonicalLessonId;
