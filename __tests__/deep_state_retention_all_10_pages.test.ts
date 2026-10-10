import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// Trang 1: Grammar
import { useGrammarProgressStore } from "../stores/grammarProgressStore";

// Trang 2, 3, 4: Vocabulary, Review, MyVocab
import { useVocabularyCatalogStore } from "../stores/vocabularyCatalogStore";

// Trang 5: MyVideo
import { useVideoStore } from "../stores/videoStore";

// Trang 6: Games
import {
  useGameCatalogStore,
} from "../stores/gameCatalogStore";

// Trang 7: Analytics
import {
  useAnalyticsCatalogStore,
} from "../stores/analyticsCatalogStore";

// Trang 8: AI Sessions
import {
  useAiSessionStore,
  getInitialTutorSessionProbe,
  getInitialConversationSessionProbe,
} from "../stores/aiSessionStore";

// Trang 9: Study Rooms & Pomodoro
import {
  useStudyRoomStore,
  getInitialActiveRoomProbe,
  getInitialPomodoroProbe,
  getInitialRoomMessagesProbe,
  PRE_SEEDED_STUDY_ROOMS,
} from "../stores/studyRoomStore";

// Trang 10: Dashboard
import {
  useDashboardStore,
  getInitialDashboardOverviewProbe,
  getInitialDashboardFiltersProbe,
  getInitialLeaderboardProbe,
} from "../stores/dashboardStore";

describe("DEEP VERIFICATION SUITE: 10-Page State Retention & 0ms Instant Render", () => {
  let localStoreMap: Record<string, string> = {};
  let sessionStoreMap: Record<string, string> = {};

  const localStorageMock = {
    getItem: (key: string) => localStoreMap[key] || null,
    setItem: (key: string, value: string) => {
      localStoreMap[key] = String(value);
    },
    removeItem: (key: string) => {
      delete localStoreMap[key];
    },
    clear: () => {
      localStoreMap = {};
    },
  };

  const sessionStorageMock = {
    getItem: (key: string) => sessionStoreMap[key] || null,
    setItem: (key: string, value: string) => {
      sessionStoreMap[key] = String(value);
    },
    removeItem: (key: string) => {
      delete sessionStoreMap[key];
    },
    clear: () => {
      sessionStoreMap = {};
    },
  };

  beforeEach(() => {
    localStoreMap = {};
    sessionStoreMap = {};
    (globalThis as any).window = globalThis;
    (globalThis as any).localStorage = localStorageMock;
    (globalThis as any).sessionStorage = sessionStorageMock;

    // Reset toàn bộ 10 stores về trạng thái ban đầu sạch sẽ
    useGrammarProgressStore.getState().resetProgress();
    useGrammarProgressStore.getState().resetCatalogFilters();
    useVocabularyCatalogStore.getState().resetReviewFilters();
    useVocabularyCatalogStore.getState().resetMyVocabFilters();
    useVideoStore.getState().resetSession();
    useGameCatalogStore.getState().resetSession();
    useAnalyticsCatalogStore.getState().resetSession();
    useAiSessionStore.setState({ tutorSession: null, conversationSession: null });
    useStudyRoomStore.setState({
      rooms: PRE_SEEDED_STUDY_ROOMS,
      roomsLoadedAt: 0,
      selectedCategory: "ALL",
      isCreateOpen: false,
      activeRoom: null,
      pomodoro: {
        timerSeconds: 25 * 60,
        isTimerRunning: false,
        timerMode: "FOCUS",
        lastTickTimestamp: 0,
      },
      roomMessages: {},
      draftMessage: "",
    });
    useDashboardStore.getState().resetDashboardState();
  });

  afterEach(() => {
    localStoreMap = {};
    sessionStoreMap = {};
    (globalThis as any).localStorage = localStorageMock;
    vi.restoreAllMocks();
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 1: CONTINUOUS 10-PAGE LEARNER JOURNEY STRESS TEST
  // ─────────────────────────────────────────────────────────────────────────────
  describe("1. Continuous 10-Page Inter-Tab Journey Stress Test", () => {
    it("should retain active learning context across all 10 pages in a continuous traversal", () => {
      // ══════════════════════════════════════════════════════════
      // BƯỚC 1: Học viên truy cập Trang 1 (/study/grammar/[id])
      // ══════════════════════════════════════════════════════════
      const topicId = "g_tenses_present";
      useGrammarProgressStore.getState().setTopicTab(topicId, "practice");
      useGrammarProgressStore.getState().saveExerciseSession(topicId, {
        currentIndex: 3,
        answers: { 0: "goes", 1: "plays", 2: "watches" },
        submitted: false,
        showResults: false,
      });
      useGrammarProgressStore.getState().saveAiChatSession(topicId, {
        messages: [
          { role: "user", text: "Giải thích giúp em thì hiện tại hoàn thành" },
          { role: "ai", text: "Thì hiện tại hoàn thành diễn tả hành động bắt đầu ở quá khứ..." },
        ],
      });

      // ══════════════════════════════════════════════════════════
      // BƯỚC 2: Chuyển sang Trang 2 (/review)
      // ══════════════════════════════════════════════════════════
      useVocabularyCatalogStore.getState().setReviewFilter({
        selectedPos: "verb",
        selectedProficiency: "learning",
        selectedBookmark: "bookmarked",
        searchTerm: "resilience",
        expandedWordId: "w_res_101",
      });

      // ══════════════════════════════════════════════════════════
      // BƯỚC 3: Chuyển sang Trang 3 (/myvocab)
      // ══════════════════════════════════════════════════════════
      useVocabularyCatalogStore.getState().setMyVocabFilter({
        filterTab: "favorite",
        searchQuery: "extraordinary",
      });

      // ══════════════════════════════════════════════════════════
      // BƯỚC 4: Chuyển sang Trang 4 (/vocabulary/t_business)
      // ══════════════════════════════════════════════════════════
      const themeId = "t_business_negotiation";
      useVocabularyCatalogStore.getState().setThemeViewMode(themeId, "quiz");
      useVocabularyCatalogStore.getState().setThemeQuizSession(themeId, {
        quizIndex: 4,
        quizScore: 40,
        selectedAnswer: 2,
        isQuizSubmitted: true,
        quizFinished: false,
      });
      useVocabularyCatalogStore.getState().setThemeAiCoachSession(themeId, {
        aiQuestion: "Từ leverage dùng thế nào trong đàm phán?",
        aiResponse: "Leverage có nghĩa là đòn bẩy hoặc lợi thế...",
      });

      // ══════════════════════════════════════════════════════════
      // BƯỚC 5: Chuyển sang Trang 5 (/myvideo)
      // ══════════════════════════════════════════════════════════
      const videoId = "UF8uR6Z6KLc"; // Steve Jobs video
      useVideoStore.getState().setSession({
        activeVideoId: videoId,
        rightPanelTab: "dictation",
        subViewMode: "full",
        selectedCategory: "TED Talks",
        selectedFilter: "learning",
      });
      useVideoStore.getState().setVideoExercisePosition(videoId, 6);

      // ══════════════════════════════════════════════════════════
      // BƯỚC 6: Chuyển sang Trang 6 (/study/games)
      // ══════════════════════════════════════════════════════════
      useGameCatalogStore.getState().setActiveGame("scramble");
      useGameCatalogStore.getState().setSelectedDeck("ielts");
      useGameCatalogStore.getState().setSelectedCategory("Business");

      // ══════════════════════════════════════════════════════════
      // BƯỚC 7: Chuyển sang Trang 7 (/analytics)
      // ══════════════════════════════════════════════════════════
      useAnalyticsCatalogStore.getState().setSession({
        activeTab: "LEADERBOARD",
        modeFilter: "Shadowing",
        selectedDayIndex: 2,
        visibleLeaderboardCount: 16,
      });

      // ══════════════════════════════════════════════════════════
      // BƯỚC 8: Chuyển sang Trang 8 (/ai/tutor & /ai/conversation)
      // ══════════════════════════════════════════════════════════
      useAiSessionStore.getState().setTutorSession({
        sessionId: "tutor_alex_1",
        personaId: "alex",
        speechSpeed: 1.0,
        soundEnabled: true,
        messages: [
          { id: "m1", role: "ai", text: "Hello there!" },
          { id: "m2", role: "user", text: "Hi Alex, teach me business idioms." },
        ],
        elapsedTime: 95,
      });
      useAiSessionStore.getState().setConversationSession({
        sessionId: "conv_cafe_1",
        selectedTopicId: "topic_cafe",
        selectedPersonaId: "emma",
        selectedDifficulty: "Intermediate",
        soundEnabled: true,
        messages: [
          { id: "cm1", role: "ai", text: "What drink would you like?" },
          { id: "cm2", role: "user", text: "I would like an iced caramel macchiato please." },
        ],
        elapsedTime: 45,
        currentSuggestions: { words: [], phrases: [] },
      });

      // ══════════════════════════════════════════════════════════
      // BƯỚC 9: Chuyển sang Trang 9 (/study/rooms)
      // ══════════════════════════════════════════════════════════
      const activeRoom = PRE_SEEDED_STUDY_ROOMS[1];
      useStudyRoomStore.getState().enterRoom(activeRoom);
      useStudyRoomStore.getState().setPomodoro({
        timerSeconds: 1200, // 20 phút còn lại
        isTimerRunning: true,
        timerMode: "FOCUS",
        lastTickTimestamp: Date.now(),
      });
      useStudyRoomStore.getState().appendRoomMessage(activeRoom.id, {
        id: "msg_room_1",
        content: "Chào mọi người, mình đang học Pomodoro 20 phút!",
        isAi: false,
        isSystem: false,
        createdAt: new Date().toISOString(),
      });

      // ══════════════════════════════════════════════════════════
      // BƯỚC 10: Chuyển sang Trang 10 (/dashboard)
      // ══════════════════════════════════════════════════════════
      useDashboardStore.getState().setFilter({
        activeSkillTab: "shadowing",
        leaderboardTab: "month",
        leaderboardCriterion: "xp",
        showAnnouncement: false,
      });
      useDashboardStore.getState().setOverview({
        checkin: {
          isCheckedInToday: true,
          activeDaysInWeek: ["2026-10-10", "2026-10-11"],
          currentStreak: 6,
          longestStreak: 15,
          totalXp: 3450,
          coins: 520,
          wordsLearned: 220,
          minutesStudied: 310,
        },
        challenges: [{ id: "q1", title: "Luyện 15 câu", isClaimed: true }],
        studyPlan: { todayTask: "Luyện 20 câu Shadowing bài Steve Jobs" },
      });

      // ══════════════════════════════════════════════════════════
      // 🔄 VÒNG KIỂM TRA ĐẢO NGƯỢC (REVERSE PROBE VALIDATION)
      // Kiểm tra Frame 0 Probe của từng trang một khi quay lại:
      // ══════════════════════════════════════════════════════════

      // 1. Kiểm tra Trang 1:
      const gTab = useGrammarProgressStore.getState().getTopicTab(topicId);
      expect(gTab).toBe("practice");
      const gEx = useGrammarProgressStore.getState().getExerciseSession(topicId);
      expect(gEx).not.toBeNull();
      expect(gEx?.currentIndex).toBe(3);
      expect(gEx?.answers[0]).toBe("goes");
      const gAi = useGrammarProgressStore.getState().getAiChatSession(topicId);
      expect(gAi?.messages.length).toBe(2);
      expect(gAi?.messages[0].text).toContain("hiện tại hoàn thành");

      // 2. Kiểm tra Trang 2:
      const rFilters = useVocabularyCatalogStore.getState().reviewFilters;
      expect(rFilters.selectedPos).toBe("verb");
      expect(rFilters.searchTerm).toBe("resilience");
      expect(rFilters.expandedWordId).toBe("w_res_101");

      // 3. Kiểm tra Trang 3:
      const myVocabFilters = useVocabularyCatalogStore.getState().myVocabFilters;
      expect(myVocabFilters.filterTab).toBe("favorite");
      expect(myVocabFilters.searchQuery).toBe("extraordinary");

      // 4. Kiểm tra Trang 4:
      const themeState = useVocabularyCatalogStore.getState();
      expect(themeState.themeViewModes[themeId]).toBe("quiz");
      expect(themeState.themeQuizSessions[themeId]?.quizIndex).toBe(4);
      expect(themeState.themeQuizSessions[themeId]?.quizScore).toBe(40);
      expect(themeState.themeAiCoachSessions[themeId]?.aiQuestion).toContain("leverage");

      // 5. Kiểm tra Trang 5:
      const videoSession = useVideoStore.getState().session;
      expect(videoSession.activeVideoId).toBe(videoId);
      expect(videoSession.rightPanelTab).toBe("dictation");
      expect(videoSession.subViewMode).toBe("full");
      expect(videoSession.videoExercisePositions[videoId]).toBe(6);

      // 6. Kiểm tra Trang 6:
      const gameSession = useGameCatalogStore.getState().session;
      expect(gameSession.activeGame).toBe("scramble");
      expect(gameSession.selectedDeck).toBe("ielts");
      expect(gameSession.selectedCategory).toBe("Business");

      // 7. Kiểm tra Trang 7:
      const anSession = useAnalyticsCatalogStore.getState().session;
      expect(anSession.activeTab).toBe("LEADERBOARD");
      expect(anSession.modeFilter).toBe("Shadowing");
      expect(anSession.selectedDayIndex).toBe(2);
      expect(anSession.visibleLeaderboardCount).toBe(16);

      // 8. Kiểm tra Trang 8:
      const tutorProbe = getInitialTutorSessionProbe();
      expect(tutorProbe).not.toBeNull();
      expect(tutorProbe?.messages.length).toBe(2);
      expect(tutorProbe?.messages[1].text).toContain("business idioms");
      const convProbe = getInitialConversationSessionProbe();
      expect(convProbe?.selectedTopicId).toBe("topic_cafe");
      expect(convProbe?.messages[1].text).toContain("iced caramel macchiato");

      // 9. Kiểm tra Trang 9:
      const roomProbe = getInitialActiveRoomProbe();
      expect(roomProbe).not.toBeNull();
      expect(roomProbe?.id).toBe(activeRoom.id);
      const roomMsgProbe = getInitialRoomMessagesProbe(activeRoom.id);
      expect(roomMsgProbe.length).toBe(1);
      expect(roomMsgProbe[0].content).toContain("Pomodoro");

      // 10. Kiểm tra Trang 10:
      const dbOverviewProbe = getInitialDashboardOverviewProbe();
      expect(dbOverviewProbe.hasData).toBe(true);
      expect(dbOverviewProbe.overview?.checkin?.currentStreak).toBe(6);
      expect(dbOverviewProbe.overview?.challenges?.[0]?.isClaimed).toBe(true);
      const dbFiltersProbe = getInitialDashboardFiltersProbe();
      expect(dbFiltersProbe.activeSkillTab).toBe("shadowing");
      expect(dbFiltersProbe.showAnnouncement).toBe(false);
      expect(dbFiltersProbe.leaderboardTab).toBe("month");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 2: RESILIENCE AGAINST CORRUPTED STORAGE & CRASH IMMUNITY
  // ─────────────────────────────────────────────────────────────────────────────
  describe("2. Resilience Against Corrupted Storage & Crash Immunity", () => {
    it("should gracefully handle malformed JSON in localStorage without throwing in Frame 0 probes", () => {
      // Giả lập người dùng có localStorage bị hỏng/dính chuỗi rác
      const corruptedString = "{ malformed: json, syntax-error [[[";
      localStorageMock.setItem("xp_grammar_progress", corruptedString);
      localStorageMock.setItem("xp_dashboard_filters", corruptedString);
      localStorageMock.setItem("xp_voca_dashboard_overview_user_1", corruptedString);
      localStorageMock.setItem("xp_game_catalog_search", corruptedString);
      localStorageMock.setItem("xp_study_rooms_active_room", corruptedString);
      localStorageMock.setItem("xp_voca_my_vocab_filters", corruptedString);
      sessionStorageMock.setItem("xp_analytics_data_week", corruptedString);

      // Kiểm tra tất cả các probe: không được ném unhandled exception (White Screen of Death)
      expect(() => useGrammarProgressStore.getState().getTopicTab("any_topic")).not.toThrow();
      expect(() => useGrammarProgressStore.getState().getExerciseSession("any_topic")).not.toThrow();
      expect(() => useGrammarProgressStore.getState().getAiChatSession("any_topic")).not.toThrow();
      expect(() => useVocabularyCatalogStore.getState().myVocabFilters).not.toThrow();
      expect(() => getInitialActiveRoomProbe()).not.toThrow();
      expect(() => getInitialPomodoroProbe()).not.toThrow();
      expect(() => getInitialDashboardOverviewProbe("user_1")).not.toThrow();
      expect(() => getInitialDashboardFiltersProbe()).not.toThrow();
      expect(() => getInitialLeaderboardProbe("week", "time")).not.toThrow();

      // Kết quả phải an toàn fallback về giá trị mặc định chuẩn xác
      expect(useGrammarProgressStore.getState().getTopicTab("any_topic")).toBe("lesson");
      expect(useVocabularyCatalogStore.getState().myVocabFilters.filterTab).toBe("all");
      expect(getInitialDashboardFiltersProbe().activeSkillTab).toBe("dictation");
      expect(getInitialActiveRoomProbe()).toBeNull();
    });

    it("should survive Storage Quota Exceeded exceptions without affecting RAM store operations", () => {
      const originalSetItem = (globalThis as any).localStorage.setItem;
      const mockSetItem = vi.fn().mockImplementation(() => {
        const error = new Error("QuotaExceededError: The quota has been exceeded.");
        error.name = "QuotaExceededError";
        throw error;
      });
      (globalThis as any).localStorage.setItem = mockSetItem;

      try {
        // Thao tác cập nhật filter dashboard khi bộ nhớ đầy
        expect(() => {
          useDashboardStore.getState().setFilter({ activeSkillTab: "writing" });
        }).not.toThrow();
        // RAM store vẫn hoạt động mượt mà
        expect(useDashboardStore.getState().filters.activeSkillTab).toBe("writing");

        // Thao tác cập nhật filter game khi bộ nhớ đầy
        expect(() => {
          useGameCatalogStore.getState().setSelectedCategory("memory");
        }).not.toThrow();
        expect(useGameCatalogStore.getState().session.selectedCategory).toBe("memory");

        // Thao tác cập nhật filter MyVocab khi bộ nhớ đầy
        expect(() => {
          useVocabularyCatalogStore.getState().setMyVocabFilter({ filterTab: "mastered" });
        }).not.toThrow();
        expect(useVocabularyCatalogStore.getState().myVocabFilters.filterTab).toBe("mastered");
      } finally {
        (globalThis as any).localStorage.setItem = originalSetItem;
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 3: POMODORO BACKGROUND TIME DRIFT ACCURACY (Trang 9: Study Rooms)
  // ─────────────────────────────────────────────────────────────────────────────
  describe("3. Pomodoro Background Time Drift Accuracy", () => {
    it("should accurately compute elapsed seconds when user leaves room and returns after 5 minutes", () => {
      const now = Date.now();
      const fiveMinutesAgo = now - 5 * 60 * 1000; // 300 giây trước

      useStudyRoomStore.setState({
        pomodoro: {
          timerSeconds: 1500, // 25 phút lúc bắt đầu
          isTimerRunning: true,
          timerMode: "FOCUS",
          lastTickTimestamp: fiveMinutesAgo,
        },
      });

      // Frame 0 Probe khi người dùng chuyển lại vào Trang 9
      const probe = getInitialPomodoroProbe();
      expect(probe.isTimerRunning).toBe(true);
      // Bù giờ: 1500 - 300 = 1200 giây (20 phút)
      expect(probe.timerSeconds).toBe(1200);
      expect(probe.timerMode).toBe("FOCUS");
    });

    it("should clamp timer to 0 and stop running when elapsed time exceeds duration", () => {
      const now = Date.now();
      const thirtyMinutesAgo = now - 30 * 60 * 1000; // 30 phút trước (> 25 phút)

      useStudyRoomStore.setState({
        pomodoro: {
          timerSeconds: 1500, // 25 phút
          isTimerRunning: true,
          timerMode: "FOCUS",
          lastTickTimestamp: thirtyMinutesAgo,
        },
      });

      const probe = getInitialPomodoroProbe();
      // Phải chặn tại 0, không được ra số âm, và dừng chạy
      expect(probe.timerSeconds).toBe(0);
      expect(probe.isTimerRunning).toBe(false);
    });

    it("should not drift timer when Pomodoro is paused", () => {
      const tenMinutesAgo = Date.now() - 10 * 60 * 1000;

      useStudyRoomStore.setState({
        pomodoro: {
          timerSeconds: 900,
          isTimerRunning: false, // Tạm dừng
          timerMode: "FOCUS",
          lastTickTimestamp: tenMinutesAgo,
        },
      });

      const probe = getInitialPomodoroProbe();
      // Giữ nguyên 900 giây vì đang pause
      expect(probe.timerSeconds).toBe(900);
      expect(probe.isTimerRunning).toBe(false);
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 4: MULTI-USER ISOLATION (Cách ly dữ liệu phiên giữa các tài khoản)
  // ─────────────────────────────────────────────────────────────────────────────
  describe("4. Multi-User Session Isolation", () => {
    it("should isolate Dashboard Overview cache strictly by userId", () => {
      const aliceData = {
        checkin: { isCheckedInToday: true, currentStreak: 12, totalXp: 5000 },
        challenges: [{ id: "alice_q", title: "Alice Quest", isClaimed: true }],
      };
      const bobData = {
        checkin: { isCheckedInToday: false, currentStreak: 1, totalXp: 150 },
        challenges: [{ id: "bob_q", title: "Bob Quest", isClaimed: false }],
      };

      // Lưu 2 cache riêng trong localStorage
      localStorageMock.setItem(
        "xp_voca_dashboard_overview_alice_123",
        JSON.stringify(aliceData)
      );
      localStorageMock.setItem(
        "xp_voca_dashboard_overview_bob_456",
        JSON.stringify(bobData)
      );

      // Probe Alice
      useDashboardStore.getState().resetDashboardState();
      const aliceProbe = getInitialDashboardOverviewProbe("alice_123");
      expect(aliceProbe.hasData).toBe(true);
      expect(aliceProbe.overview?.checkin?.currentStreak).toBe(12);
      expect(aliceProbe.overview?.challenges?.[0]?.id).toBe("alice_q");

      // Probe Bob
      useDashboardStore.getState().resetDashboardState();
      const bobProbe = getInitialDashboardOverviewProbe("bob_456");
      expect(bobProbe.hasData).toBe(true);
      expect(bobProbe.overview?.checkin?.currentStreak).toBe(1);
      expect(bobProbe.overview?.challenges?.[0]?.id).toBe("bob_q");
    });
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // SUITE 5: BASE POOL IMMUTABILITY & FRAME 0 INSTANT RENDERING (Trang 6: Games)
  // ─────────────────────────────────────────────────────────────────────────────
  describe("5. Game Base Pool Immutability & Instant Frame 0 Seeding", () => {
    it("should provide at least 100 verified vocabulary items in Game Base Pool at Frame 0", () => {
      const basePool = useGameCatalogStore.getState().basePool;
      expect(Array.isArray(basePool)).toBe(true);
      expect(basePool.length).toBeGreaterThanOrEqual(100);

      // Kiểm tra tính toàn vẹn của cấu trúc dữ liệu từ vựng
      const sample = basePool[0];
      expect(sample).toHaveProperty("id");
      expect(sample).toHaveProperty("word");
      expect(sample).toHaveProperty("definitionVn");
      expect(sample).toHaveProperty("phonetic");
    });

    it("should not mutate the original Game Base Pool when shuffling or filtering questions", () => {
      const originalLength = useGameCatalogStore.getState().basePool.length;
      const firstWordBefore = useGameCatalogStore.getState().basePool[0].word;

      // Thực hiện filter và sort
      const filtered = [...useGameCatalogStore.getState().basePool]
        .filter((w) => w.pos === "noun" || w.word.length > 3)
        .sort(() => Math.random() - 0.5);

      expect(filtered.length).toBeGreaterThan(0);
      // Base pool gốc trong store không bị thay đổi
      expect(useGameCatalogStore.getState().basePool.length).toBe(originalLength);
      expect(useGameCatalogStore.getState().basePool[0].word).toBe(firstWordBefore);
    });
  });
});
