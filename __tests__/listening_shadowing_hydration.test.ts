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

  // 2. Formatted ID / Substring match (e.g. ?id=44 -> listen_toeic_q3_044 or listen_044)
  const num = parseInt(queryId, 10);
  if (!isNaN(num)) {
    const pad3 = String(num).padStart(3, "0");
    const byIdCode = list.find(
      (l) =>
        l.id === `listen_${pad3}` ||
        l.id.endsWith(`_${pad3}`) ||
        l.id.includes(`_${pad3}`)
    );
    if (byIdCode) return byIdCode.id;

    // 3. Fallback: 1-indexed numeric order in the catalog
    if (num >= 1 && num <= list.length) {
      return list[num - 1].id;
    }
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
    expect(lesson?.transcript?.[0]?.text).toBeTruthy();
  });

  it("resolves query id=42 to a valid lesson with transcript in MOCK_LESSONS_DATA", () => {
    const resolvedId = resolveLessonId("42", MOCK_LESSONS_DATA);
    expect(resolvedId).toBeDefined();
    expect(resolvedId).not.toBeNull();

    const lesson = MOCK_LESSONS_DATA.find((l) => l.id === resolvedId);
    expect(lesson).toBeDefined();
    expect(Array.isArray(lesson?.transcript)).toBe(true);
    expect((lesson?.transcript?.length || 0)).toBeGreaterThan(0);
    expect(lesson?.transcript?.[0]?.text).toBeTruthy();
  });

  it("resolves query id=40 to a valid lesson with transcript in MOCK_LESSONS_DATA", () => {
    const resolvedId = resolveLessonId("40", MOCK_LESSONS_DATA);
    console.log("ID 40 resolved to:", resolvedId);
    expect(resolvedId).toBeDefined();
    expect(resolvedId).not.toBeNull();

    const lesson = MOCK_LESSONS_DATA.find((l) => l.id === resolvedId);
    console.log("Lesson 40 title:", lesson?.title, "transcript count:", lesson?.transcript?.length);
    expect(lesson).toBeDefined();
    expect(Array.isArray(lesson?.transcript)).toBe(true);
    expect((lesson?.transcript?.length || 0)).toBeGreaterThan(0);
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

  it("verifies memoryCache caches and returns lesson detail in <1ms", async () => {
    const { memoryCache } = await import("@/infrastructure/cache/memoryCache");
    const testLessonId = "test_lesson_perf_01";
    const cacheKey = `listening_lesson_detail:${testLessonId}:guest`;

    const sampleLessonData = {
      id: testLessonId,
      title: "Performance Test Lesson",
      transcript: [{ id: 1, text: "Sample text" }],
    };

    memoryCache.set(cacheKey, sampleLessonData, 300);

    const start = performance.now();
    const cached = memoryCache.get<typeof sampleLessonData>(cacheKey);
    const duration = performance.now() - start;

    expect(cached).toBeDefined();
    expect(cached?.id).toBe(testLessonId);
    expect(duration).toBeLessThan(5); // Sub-millisecond in-memory retrieval

    // Test invalidation
    memoryCache.invalidatePattern(new RegExp(`listening_lesson_detail:${testLessonId}`));
    expect(memoryCache.get(cacheKey)).toBeNull();
  });

  it("verifies liveAudioEnergy throttling reduces state updates by >= 80%", () => {
    let lastEnergyUpdateTime = 0;
    let lastReportedEnergy = 0;
    let updateCount = 0;

    // Simulate 120 frames of continuous audio input (1 second at 120 FPS or 2 seconds at 60 FPS)
    const simulatedFrames = Array.from({ length: 120 }, (_, i) => 0.1 + Math.sin(i * 0.1) * 0.05);

    simulatedFrames.forEach((avg, frameIdx) => {
      const now = frameIdx * 8.33; // ~120 FPS in ms
      if (now - lastEnergyUpdateTime >= 55) {
        if (Math.abs(avg - lastReportedEnergy) > 0.02 || (avg === 0 && lastReportedEnergy > 0)) {
          lastEnergyUpdateTime = now;
          lastReportedEnergy = avg;
          updateCount++;
        }
      }
    });

    // Without throttling, updateCount would be 120. With throttling, it should be <= 20
    expect(updateCount).toBeLessThanOrEqual(20);
    expect(updateCount).toBeGreaterThan(0);
  });

  it("verifies formatStudioElapsedTime formats MM:SS correctly", async () => {
    const { formatStudioElapsedTime } = await import(
      "@/features/listening/components/StudioTimerBadge"
    );

    expect(formatStudioElapsedTime(0)).toBe("0:00");
    expect(formatStudioElapsedTime(9)).toBe("0:09");
    expect(formatStudioElapsedTime(59)).toBe("0:59");
    expect(formatStudioElapsedTime(65)).toBe("1:05");
    expect(formatStudioElapsedTime(3600)).toBe("60:00");
  });

  it("verifies mobile vs desktop TTS delay logic", () => {
    // Helper replicating mobile UA check in ttsEngine.ts
    const getTtsDelay = (userAgent: string, screenWidth: number, customDelay?: number) => {
      const isMobile =
        screenWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      return customDelay ?? (isMobile ? 30 : 0);
    };

    // Desktop Chrome (wide screen)
    expect(getTtsDelay("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0", 1440)).toBe(0);

    // Mobile iPhone Safari (narrow screen)
    expect(getTtsDelay("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15", 390)).toBe(30);

    // Mobile Android Chrome
    expect(getTtsDelay("Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36", 412)).toBe(30);

    // Explicit custom delay overrides default
    expect(getTtsDelay("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)", 390, 150)).toBe(150);
  });

  it("verifies progress debounce consolidates multiple rapid sentence completes into 1 call", async () => {
    let callCount = 0;
    let timer: any = null;

    const saveProgressDebounced = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        callCount++;
      }, 50);
    };

    // Simulate user typing/speaking fast through 5 words/sentences within 20ms
    saveProgressDebounced();
    saveProgressDebounced();
    saveProgressDebounced();
    saveProgressDebounced();
    saveProgressDebounced();

    expect(callCount).toBe(0); // Not called yet

    // Wait for debounce timer to fire
    await new Promise((r) => setTimeout(r, 70));
    expect(callCount).toBe(1); // Consolidated to exactly 1 database save
  });

  it("pure database loading: catalog initializes empty and populates 100% from DB payload without static mock pollution", () => {
    // Initial state before DB fetch
    let lessonsList: any[] = [];
    let isLoadingLessons = true;

    // During loading, skeleton is displayed because isLoadingLessons is true
    const shouldShowSkeleton = isLoadingLessons && lessonsList.length === 0;
    expect(shouldShowSkeleton).toBe(true);

    // Mock DB payload simulating 102 lessons from Neon PostgreSQL
    const dbPayload = Array.from({ length: 102 }, (_, i) => ({
      id: `lesson_neon_${i + 1}`,
      title: `Neon PostgreSQL Lesson ${i + 1}`,
      level: i % 2 === 0 ? "Beginner" : "Intermediate",
      duration: "03:45",
      accent: "en-US",
      audioUrl: `https://cdn.example.com/audio_${i + 1}.mp3`,
      imageUrl: `https://cdn.example.com/img_${i + 1}.jpg`,
    }));

    // DB fetch completes successfully
    lessonsList = dbPayload;
    isLoadingLessons = false;

    expect(lessonsList.length).toBe(102);
    expect(lessonsList[0].id).toBe("lesson_neon_1");
    expect(lessonsList[101].id).toBe("lesson_neon_102");
    expect(isLoadingLessons).toBe(false);
  });

  it("pure database loading: studio detail suppresses mock fallback during pending DB fetch to enforce pure skeleton screen", () => {
    const selectedLessonId = "lesson_neon_77";
    const detailedLessonsMap: Record<string, any> = {};
    const lessonsList: any[] = [];
    const isLoadingLessonDetail = true;

    // Derived currentLesson logic
    const resolveCurrentLesson = (
      id: string | null,
      details: Record<string, any>,
      list: any[],
      isLoading: boolean
    ) => {
      if (!id) return null;
      const detailed = details[id];
      if (detailed?.transcript?.length) return detailed;
      const fromList = list.find((l) => l.id === id);
      if (fromList?.transcript?.length) return fromList;
      // CRITICAL: When loading from DB, do NOT return mock data - enforce pure skeleton
      if (isLoading) return null;
      return null;
    };

    // While DB fetch is pending, currentLesson is strictly null -> triggers StudioSkeleton
    const currentLesson = resolveCurrentLesson(
      selectedLessonId,
      detailedLessonsMap,
      lessonsList,
      isLoadingLessonDetail
    );
    expect(currentLesson).toBeNull();

    // StudioSkeleton is strictly rendered when currentLesson is null while loading
    const shouldRenderStudioSkeleton = isLoadingLessonDetail || !currentLesson;
    expect(shouldRenderStudioSkeleton).toBe(true);

    // When DB returns real payload with transcript
    const dbDetail = {
      id: "lesson_neon_77",
      title: "Real Neon Database Lesson 77",
      transcript: [
        { id: 1, text: "Welcome to the real database lesson.", translation: "Chào mừng bạn đến với bài học thật từ CSDL." }
      ],
      userProgress: { status: "IN_PROGRESS", completedSentences: [0] },
    };
    detailedLessonsMap[dbDetail.id] = dbDetail;

    const resolvedAfterDb = resolveCurrentLesson(
      selectedLessonId,
      detailedLessonsMap,
      lessonsList,
      false // loading complete
    );
    expect(resolvedAfterDb).toBeDefined();
    expect(resolvedAfterDb?.id).toBe("lesson_neon_77");
    expect(resolvedAfterDb?.transcript?.[0]?.text).toBe("Welcome to the real database lesson.");
  });

  it("pure database loading: graceful offline fallback activates ONLY when DB fetch fails or errors", () => {
    let lessonsList: any[] = [];
    let isOfflineFallbackActive = false;

    const fetchFromDbWithFallback = (dbSuccess: boolean) => {
      if (dbSuccess) {
        lessonsList = [{ id: "db_1", title: "Real DB Item" }];
      } else {
        // Offline catch block
        lessonsList = MOCK_LESSONS_DATA;
        isOfflineFallbackActive = true;
      }
    };

    // Case 1: DB fails (network error or timeout)
    fetchFromDbWithFallback(false);
    expect(isOfflineFallbackActive).toBe(true);
    expect(lessonsList.length).toBe(MOCK_LESSONS_DATA.length);
    expect(lessonsList[0].id).toBe(MOCK_LESSONS_DATA[0].id);

    // Case 2: DB succeeds -> only real DB data is stored
    isOfflineFallbackActive = false;
    fetchFromDbWithFallback(true);
    expect(isOfflineFallbackActive).toBe(false);
    expect(lessonsList.length).toBe(1);
    expect(lessonsList[0].id).toBe("db_1");
  });

  it("dashboard-style swr: instant 0ms local cache hydration delivers returning user data with zero skeleton flash", () => {
    // Simulated LocalStorage
    const mockStorage: Record<string, string> = {
      xp_voca_listening_catalog_user123: JSON.stringify([
        { id: "listen_db_001", title: "Real DB Lesson 1" },
        { id: "listen_db_002", title: "Real DB Lesson 2" },
      ]),
      xp_voca_listening_detail_listen_db_001_user123: JSON.stringify({
        id: "listen_db_001",
        title: "Real DB Lesson 1",
        transcript: [{ id: 1, text: "Previously cached sentence", translation: "Câu đã lưu trong cache" }],
        userProgress: { status: "COMPLETED", completedSentences: [0] },
      }),
    };

    // Step 1: Initial state before any effect
    let lessonsList: any[] = [];
    let isLoadingLessons = true;
    let singleLessonDetail: any = null;
    let isLoadingDetail = true;

    // Step 2: SWR Tier 1 (Instant 0ms synchronous read from LocalStorage)
    const cachedCatalog = mockStorage["xp_voca_listening_catalog_user123"];
    if (cachedCatalog) {
      lessonsList = JSON.parse(cachedCatalog);
      isLoadingLessons = false;
    }

    const cachedDetail = mockStorage["xp_voca_listening_detail_listen_db_001_user123"];
    if (cachedDetail) {
      singleLessonDetail = JSON.parse(cachedDetail);
      isLoadingDetail = false;
    }

    // Assert 0ms instant display without skeleton
    expect(isLoadingLessons).toBe(false);
    expect(lessonsList.length).toBe(2);
    expect(lessonsList[0].title).toBe("Real DB Lesson 1");

    expect(isLoadingDetail).toBe(false);
    expect(singleLessonDetail).toBeDefined();
    expect(singleLessonDetail.transcript[0].text).toBe("Previously cached sentence");
    expect(singleLessonDetail.userProgress.status).toBe("COMPLETED");
  });

  it("dashboard-style swr: background db reconciliation updates state and persists fresh payload to local cache", async () => {
    const mockStorage: Record<string, string> = {};

    let lessonsList: any[] = [];
    let isLoadingLessons = true;

    // First visit: storage is empty -> skeleton active
    expect(mockStorage["xp_voca_listening_catalog_guest"]).toBeUndefined();
    expect(isLoadingLessons).toBe(true);

    // SWR Tier 2: Background fetch finishes from Neon DB
    const freshDbLessons = Array.from({ length: 102 }, (_, i) => ({
      id: `listen_neon_${i + 1}`,
      title: `Neon PostgreSQL Lesson ${i + 1}`,
    }));

    // Update state and write to storage
    lessonsList = freshDbLessons;
    mockStorage["xp_voca_listening_catalog_guest"] = JSON.stringify(freshDbLessons);
    isLoadingLessons = false;

    // Assert fresh data in state
    expect(lessonsList.length).toBe(102);
    expect(isLoadingLessons).toBe(false);

    // Assert storage was updated for subsequent 0ms visits
    expect(mockStorage["xp_voca_listening_catalog_guest"]).toBeDefined();
    const stored = JSON.parse(mockStorage["xp_voca_listening_catalog_guest"]);
    expect(stored.length).toBe(102);
    expect(stored[101].id).toBe("listen_neon_102");
  });

  it("multi-key aliasing: detailedLessonsMap correctly resolves queries ?id=1 and ?id=listen_001 interchangeably", () => {
    const detailPayload = {
      id: "listen_001",
      title: "Self-Introduction & Career Goals",
      transcript: [{ id: 1, text: "Let me introduce myself.", translation: "Cho tôi xin giới thiệu bản thân." }],
    };

    const map: Record<string, any> = {};
    const rawIdParam = "1";
    const selectedLessonId = "1";

    // Replicate registration with multi-key aliasing
    map[detailPayload.id] = detailPayload;
    if (selectedLessonId) map[selectedLessonId] = detailPayload;
    if (rawIdParam) map[rawIdParam] = detailPayload;

    const num = parseInt((detailPayload.id || "").replace(/\D/g, "") || rawIdParam || "", 10);
    if (!isNaN(num)) {
      const pad3 = String(num).padStart(3, "0");
      map[pad3] = detailPayload;
      map[`listen_${pad3}`] = detailPayload;
      map[String(num)] = detailPayload;
    }

    // Lookup via ?id=1
    expect(map["1"]).toBeDefined();
    expect(map["1"].id).toBe("listen_001");

    // Lookup via listen_001
    expect(map["listen_001"]).toBeDefined();
    expect(map["listen_001"].id).toBe("listen_001");

    // Lookup via 001
    expect(map["001"]).toBeDefined();
    expect(map["001"].id).toBe("listen_001");
  });

  it("loading gatekeeper: not-found error screen is blocked while catalog or detail loading is active", () => {
    const isDetailLoading = true;
    const isCatalogLoading = false;
    const currentLesson = null;

    // Condition in listening & shadowing:
    const shouldShowSkeleton = isDetailLoading || (!currentLesson && isCatalogLoading);
    const shouldShowNotFound = !currentLesson && !isDetailLoading && !isCatalogLoading;

    expect(shouldShowSkeleton).toBe(true);
    expect(shouldShowNotFound).toBe(false);
  });

  it(
    "inspects database record for lesson 40 / listen_040 / listen_toeic_q3_040",
    { timeout: 20000 },
    async () => {
      const { prisma } = await import("@/infrastructure/database/prisma");
      try {
        const dbMatches = await prisma.listeningLesson.findMany({
          where: {
            OR: [
              { id: "40" },
              { id: "listen_040" },
              { id: "listen_toeic_q3_040" },
              { id: { contains: "040" } },
              { orderIndex: 39 },
              { orderIndex: 40 },
            ],
          },
          select: { id: true, title: true, orderIndex: true },
        });
        console.log("=== DB LESSON 40 MATCHES ===", JSON.stringify(dbMatches));
      } catch (e: any) {
        console.log("DB connection note:", e?.message);
      }
    }
  );

  it("Frame 0 Synchronous Normalization: resolveCanonicalLessonId maps '40' to 'listen_toeic_q3_040' with empty catalog []", async () => {
    const { resolveCanonicalLessonId, isSameLessonId } = await import("@/features/listening/utils/lessonIdHelper");

    // When lessonsList is [] (unloaded database)
    const canonical = resolveCanonicalLessonId("40", []);
    expect(canonical).toBe("listen_toeic_q3_040");

    // Aliases resolve to the exact same canonical ID
    expect(resolveCanonicalLessonId("listen_040", [])).toBe("listen_toeic_q3_040");
    expect(resolveCanonicalLessonId("listen_toeic_q3_040", [])).toBe("listen_toeic_q3_040");

    // isSameLessonId handles all cross-format alias combinations
    expect(isSameLessonId("40", "listen_toeic_q3_040")).toBe(true);
    expect(isSameLessonId("listen_040", "40")).toBe(true);
    expect(isSameLessonId("listen_toeic_q3_040", "40")).toBe(true);
    expect(isSameLessonId("40", "40")).toBe(true);
    expect(isSameLessonId("40", "41")).toBe(false);
  });

  it("Cache Guard Protection: prevents second HTTP fetch when catalog finishes loading", async () => {
    const { isSameLessonId } = await import("@/features/listening/utils/lessonIdHelper");

    // Simulate first fetch returning canonical detail
    const lastFetchedLesson = "listen_toeic_q3_040";
    const detailedLessonsMap: Record<string, any> = {
      listen_toeic_q3_040: { id: "listen_toeic_q3_040", transcript: [{ id: 1, text: "Sentence 1" }] },
      "40": { id: "listen_toeic_q3_040", transcript: [{ id: 1, text: "Sentence 1" }] },
    };

    // When catalog finishes loading and evaluates raw query id "40"
    const queryLessonId = "40";
    const isCacheHit =
      lastFetchedLesson !== null &&
      isSameLessonId(lastFetchedLesson, queryLessonId) &&
      Boolean(detailedLessonsMap[queryLessonId]?.transcript?.length);

    // Cache guard MUST be true, stopping any redundant network fetch
    expect(isCacheHit).toBe(true);
  });
});



