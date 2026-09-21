import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";

/**
 * Universal Lesson ID Resolver & Canonical Normalizer
 * Resolves any query representation ("40", "040", "listen_040", "listen_toeic_q3_040")
 * to the exact canonical lesson ID in 0ms synchronously without waiting for DB catalog.
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

  // 3. Extract numeric value (supporting "40", "040", "listen_040", "listen_toeic_q3_040", "lesson_40")
  let num = parseInt(strId, 10);
  if (isNaN(num)) {
    const trailingMatch = strId.match(/_(\d+)$/) || strId.match(/(\d+)$/);
    if (trailingMatch) {
      num = parseInt(trailingMatch[1], 10);
    }
  }

  if (!isNaN(num)) {
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

    // 4. Frame-0 Synchronous Resolution via in-memory MOCK_LESSONS_DATA (Instant 0ms)
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

  const canonA = resolveCanonicalLessonId(idA, list);
  const canonB = resolveCanonicalLessonId(idB, list);

  if (canonA && canonB && canonA === canonB) return true;

  // Secondary check: compare trailing numeric portion if both have numbers
  const matchA = String(idA).match(/_?(\d+)$/);
  const matchB = String(idB).match(/_?(\d+)$/);
  if (matchA && matchB && parseInt(matchA[1], 10) === parseInt(matchB[1], 10)) {
    return true;
  }

  return false;
};

/**
 * Legacy compatibility alias for existing code
 */
export const resolveLessonId = resolveCanonicalLessonId;
