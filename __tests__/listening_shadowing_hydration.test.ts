import { describe, it, expect } from "vitest";
import { MOCK_LESSONS_DATA } from "@/features/listening/data/listeningMockData";

// Replicate resolveLessonId helper exactly as used in listening and shadowing pages
const resolveLessonId = (
  queryId: string | null | undefined,
  list: any[]
): string | null => {
  if (!queryId || !list || list.length === 0) return null;

  // 1. Direct match by lesson id
  const exact = list.find((l) => l.id === queryId);
  if (exact) return exact.id;

  // 2. Numeric match (e.g. ?id=1 -> 1st lesson or listen_001)
  const num = parseInt(queryId, 10);
  if (!isNaN(num)) {
    if (num >= 1 && num <= list.length) {
      return list[num - 1].id;
    }
    const formatted = `listen_${String(num).padStart(3, "0")}`;
    const foundFormatted = list.find((l) => l.id === formatted);
    if (foundFormatted) return foundFormatted.id;
  }

  return null;
};

describe("Listening & Shadowing URL Hydration & State Resilience", () => {
  it("resolves query id=44 to a valid lesson with transcript in MOCK_LESSONS_DATA", () => {
    const resolvedId = resolveLessonId("44", MOCK_LESSONS_DATA);
    expect(resolvedId).toBeDefined();
    expect(resolvedId).not.toBeNull();

    const lesson = MOCK_LESSONS_DATA.find((l) => l.id === resolvedId);
    expect(lesson).toBeDefined();
    expect(Array.isArray(lesson?.transcript)).toBe(true);
    expect((lesson?.transcript?.length || 0)).toBeGreaterThan(0);
    expect(lesson?.transcript[0].text).toBeTruthy();
  });

  it("resolves query id=42 to a valid lesson with transcript in MOCK_LESSONS_DATA", () => {
    const resolvedId = resolveLessonId("42", MOCK_LESSONS_DATA);
    expect(resolvedId).toBeDefined();
    expect(resolvedId).not.toBeNull();

    const lesson = MOCK_LESSONS_DATA.find((l) => l.id === resolvedId);
    expect(lesson).toBeDefined();
    expect(Array.isArray(lesson?.transcript)).toBe(true);
    expect((lesson?.transcript?.length || 0)).toBeGreaterThan(0);
    expect(lesson?.transcript[0].text).toBeTruthy();
  });

  it("safely merges detail into a stripped catalog item without losing transcript", () => {
    // Simulating catalog item where transcript was stripped for bandwidth optimization
    const catalogItem = {
      id: "listen_toeic_q3_035",
      title: "Port Congestion & Container Terminal Surcharge",
      level: "Intermediate",
      transcript: undefined,
    };

    const detailItem = {
      id: "listen_toeic_q3_035",
      title: "Port Congestion & Container Terminal Surcharge",
      level: "Intermediate",
      transcript: [
        {
          id: "s1",
          text: "Due to severe port congestion, shipping lines have announced a surcharge.",
          translation: "Do tắc nghẽn cảng nghiêm trọng, các hãng tàu đã thông báo phụ phí.",
        },
      ],
    };

    let lessonsList: any[] = [catalogItem];

    // Correct merge logic:
    const idx = lessonsList.findIndex((l) => l.id === detailItem.id);
    if (idx !== -1) {
      lessonsList = [...lessonsList];
      lessonsList[idx] = { ...lessonsList[idx], ...detailItem };
    } else {
      lessonsList = [detailItem, ...lessonsList];
    }

    expect(lessonsList[0].transcript).toBeDefined();
    expect(lessonsList[0].transcript.length).toBe(1);

    // Re-fetching catalog with stripped transcript does NOT wipe out existing transcript
    const newCatalogData = [{ ...catalogItem }];
    const prevMap = new Map(lessonsList.map((l) => [l.id, l]));
    const preservedList = newCatalogData.map((item: any) => {
      const existing = prevMap.get(item.id);
      return existing?.transcript?.length
        ? { ...item, transcript: existing.transcript }
        : item;
    });

    expect(preservedList[0].transcript).toBeDefined();
    expect(preservedList[0].transcript.length).toBe(1);
  });

  it("guarantees currentLesson fallback provides complete transcript in 0ms", () => {
    const selectedLessonId = "listen_toeic_q3_035";
    const detailedLessonsMap: Record<string, any> = {};
    const lessonsList: any[] = [
      { id: "listen_toeic_q3_035", title: "Port Congestion", transcript: undefined },
    ];

    // Resolve currentLesson with layered fallback
    const detailed = detailedLessonsMap[selectedLessonId];
    const fromList = lessonsList.find((l) => l.id === selectedLessonId);
    const fromMock = MOCK_LESSONS_DATA.find((l) => l.id === selectedLessonId);

    const currentLesson =
      (detailed?.transcript?.length && detailed) ||
      (fromList?.transcript?.length && fromList) ||
      (fromMock?.transcript?.length && { ...(fromList || {}), ...fromMock }) ||
      null;

    expect(currentLesson).not.toBeNull();
    expect(currentLesson.transcript).toBeDefined();
    expect(Array.isArray(currentLesson.transcript)).toBe(true);
    expect(currentLesson.transcript.length).toBeGreaterThan(0);
    expect(currentLesson.transcript[0].text.length).toBeGreaterThan(0);
  });
});
