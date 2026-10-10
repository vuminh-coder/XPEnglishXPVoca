import { create } from "zustand";
import {
  MOCK_EXAM_PAPERS,
  ExamPaper,
  SkillType,
} from "@/features/exam-prep/data/exam-papers";
import {
  ExamResultSummary,
  UserExamAnswers,
} from "@/features/exam-prep/utils/examScoringEngine";

export interface CachedExamEntry<T> {
  data: T;
  timestamp: number;
}

/** Default cache stale time: 5 minutes (300,000 ms) */
export const EXAM_CATALOG_STALE_TIME_MS = 5 * 60 * 1000;

export function isExamEntryStale(
  timestamp: number,
  maxAgeMs = EXAM_CATALOG_STALE_TIME_MS
): boolean {
  if (!timestamp) return true;
  return Date.now() - timestamp > maxAgeMs;
}

export interface ExamCatalogFilters {
  filterType: string;
  searchQuery: string;
  configMode: "PRESET" | "AI_GEN";
  activeSkills: SkillType[];
  aiTopic: string;
  aiTargetScore: string;
  aiQuestionCount: number;
  scrollPosition: number;
}

export const DEFAULT_EXAM_FILTERS: ExamCatalogFilters = {
  filterType: "ALL",
  searchQuery: "",
  configMode: "PRESET",
  activeSkills: ["LISTENING", "READING", "SPEAKING", "WRITING"],
  aiTopic: "Business & Travel",
  aiTargetScore: "700+",
  aiQuestionCount: 20,
  scrollPosition: 0,
};

export interface ExamWorkspaceSession {
  examId: string;
  currentQuestionIndex: number;
  userAnswers: UserExamAnswers;
  flaggedQuestions: Record<string, boolean>;
  secondsRemaining: number;
  timeSpentSeconds: number;
}

interface ExamCatalogStoreState {
  // Exam Papers Catalog Cache
  examPapers: ExamPaper[];
  examPapersTimestamp: number;
  isExamPapersLoading: boolean;
  examPapersError: string | null;

  // Single Exam Detail Cache (keyed by ID e.g. "toeic_lr_2026_01" or numeric alias "1")
  examDetailCache: Record<string, CachedExamEntry<ExamPaper>>;
  isLoadingDetail: boolean;

  // Active Live Exam State
  selectedExam: ExamPaper | null;
  activeMode: "HUB" | "WORKSPACE" | "REPORT";
  workspaceSession: ExamWorkspaceSession | null;
  lastSubmittedResult: ExamResultSummary | null;
  lastSubmittedPaper: ExamPaper | null;

  // Preserved Filter States
  filters: ExamCatalogFilters;

  // SWR Actions
  fetchExamPapers: (options?: {
    forceRefresh?: boolean;
    type?: string;
    skill?: string;
    search?: string;
  }) => Promise<ExamPaper[]>;
  fetchExamDetail: (
    examIdOrIndex: string | number,
    options?: { forceRefresh?: boolean }
  ) => Promise<ExamPaper | null>;

  // Exam Lifecycle & Workspace Navigation
  setSelectedExam: (exam: ExamPaper | null) => void;
  setActiveMode: (mode: "HUB" | "WORKSPACE" | "REPORT") => void;
  startExam: (paper: ExamPaper) => void;
  quitExamToHub: () => void;
  setLastSubmittedResult: (
    result: ExamResultSummary | null,
    paper?: ExamPaper | null
  ) => void;
  updateWorkspaceSession: (session: Partial<ExamWorkspaceSession>) => void;
  clearWorkspaceSession: () => void;

  // Filter Setters
  setFilterType: (type: string) => void;
  setSearchQuery: (query: string) => void;
  setConfigMode: (mode: "PRESET" | "AI_GEN") => void;
  setActiveSkills: (skills: SkillType[]) => void;
  toggleSkill: (skill: SkillType) => void;
  setAiTopic: (topic: string) => void;
  setAiTargetScore: (score: string) => void;
  setAiQuestionCount: (count: number) => void;
  setScrollPosition: (pos: number) => void;
  resetFilters: () => void;

  // Cache Invalidation
  invalidateCache: (scope?: "all" | "papers" | "detail") => void;
}

/** Pre-populate initial cache with verified standardized mock papers for Frame 0 instant display */
function buildInitialDetailCache(): Record<string, CachedExamEntry<ExamPaper>> {
  const cache: Record<string, CachedExamEntry<ExamPaper>> = {};
  const now = Date.now();
  MOCK_EXAM_PAPERS.forEach((paper, idx) => {
    const entry: CachedExamEntry<ExamPaper> = { data: paper, timestamp: now };
    cache[paper.id] = entry;
    cache[String(idx + 1)] = entry;
  });
  return cache;
}

export const useExamCatalogStore = create<ExamCatalogStoreState>((set, get) => ({
  // Initialize synchronously with MOCK_EXAM_PAPERS for 0ms Frame-0 rendering
  examPapers: MOCK_EXAM_PAPERS,
  examPapersTimestamp: Date.now(),
  isExamPapersLoading: false,
  examPapersError: null,

  examDetailCache: buildInitialDetailCache(),
  isLoadingDetail: false,

  selectedExam: null,
  activeMode: "HUB",
  workspaceSession: null,
  lastSubmittedResult: null,
  lastSubmittedPaper: null,

  filters: { ...DEFAULT_EXAM_FILTERS },

  /**
   * SWR Exam Papers Fetch:
   * 1. Returns existing papers instantly (0ms)
   * 2. Background revalidation when cache is stale (> 5 min) or forceRefresh
   * 3. Falls back gracefully to MOCK_EXAM_PAPERS on network or DB issue
   */
  fetchExamPapers: async (options = {}) => {
    const { forceRefresh = false, type = "ALL", skill = "", search = "" } = options;
    const { examPapers, examPapersTimestamp } = get();

    const hasCache = examPapers.length > 0;
    const stale = isExamEntryStale(examPapersTimestamp);

    // Cache hit: 0ms instant return
    if (hasCache && !stale && !forceRefresh) {
      return examPapers;
    }

    try {
      if (typeof window !== "undefined") {
        // Quiet background revalidation
        const queryParams = new URLSearchParams();
        if (type !== "ALL") queryParams.set("type", type);
        if (skill) queryParams.set("skill", skill);
        if (search) queryParams.set("search", search);
        queryParams.set("limit", "50");

        fetch(`/api/exams?${queryParams.toString()}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data && Array.isArray(data.exams) && data.exams.length > 0) {
              // Merge full question bodies from local mock bank if API only provides summary metadata
              const merged: ExamPaper[] = data.exams.map((apiItem: any) => {
                const fullMock = MOCK_EXAM_PAPERS.find((p) => p.id === apiItem.id);
                if (fullMock) {
                  return { ...fullMock, ...apiItem, questions: fullMock.questions };
                }
                return apiItem;
              });

              set((state) => ({
                examPapers: merged.length > 0 ? merged : state.examPapers,
                examPapersTimestamp: Date.now(),
                isExamPapersLoading: false,
              }));
            }
          })
          .catch((err) => {
            console.warn("[ExamCatalogStore] Background revalidate warning:", err);
          });
      }

      set({ examPapersTimestamp: Date.now() });
      return examPapers.length > 0 ? examPapers : MOCK_EXAM_PAPERS;
    } catch (err: any) {
      console.warn("[ExamCatalogStore] Fetch exam papers fallback:", err);
      return MOCK_EXAM_PAPERS;
    }
  },

  /**
   * SWR Exam Detail Fetch:
   * Resolves canonical IDs ("toeic_lr_2026_01", "1", 1).
   * 0ms Frame-0 synchronous cache probe.
   */
  fetchExamDetail: async (examIdOrIndex: string | number, options = {}) => {
    if (!examIdOrIndex && examIdOrIndex !== 0) return null;
    const { forceRefresh = false } = options;

    const rawKey = String(examIdOrIndex).trim();
    const num = parseInt(rawKey, 10);

    // 1. Resolve numeric index alias (e.g. "1" -> first exam paper)
    let canonicalId = rawKey;
    if (!isNaN(num) && num >= 1 && num <= MOCK_EXAM_PAPERS.length) {
      canonicalId = MOCK_EXAM_PAPERS[num - 1].id;
    }

    const { examDetailCache } = get();
    const cachedEntry = examDetailCache[rawKey] || examDetailCache[canonicalId];
    const hasCache = Boolean(cachedEntry && cachedEntry.data);
    const stale = cachedEntry ? isExamEntryStale(cachedEntry.timestamp) : true;

    // Cache hit: 0ms instant return
    if (hasCache && !stale && !forceRefresh) {
      return cachedEntry.data;
    }

    // Check in-memory mock bank fallback
    const mockMatch =
      MOCK_EXAM_PAPERS.find((p) => p.id === canonicalId) ||
      (!isNaN(num) && num >= 1 && num <= MOCK_EXAM_PAPERS.length
        ? MOCK_EXAM_PAPERS[num - 1]
        : null);

    if (hasCache && stale && !forceRefresh) {
      // Revalidate in background if stale
      if (typeof window !== "undefined") {
        fetch(`/api/exams/${encodeURIComponent(canonicalId)}`)
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (data?.exam) {
              const fullPaper: ExamPaper = {
                ...mockMatch,
                ...data.exam,
                questions:
                  data.exam.questions && data.exam.questions.length > 0
                    ? data.exam.questions
                    : mockMatch?.questions || [],
              };
              set((state) => ({
                examDetailCache: {
                  ...state.examDetailCache,
                  [canonicalId]: { data: fullPaper, timestamp: Date.now() },
                  [rawKey]: { data: fullPaper, timestamp: Date.now() },
                },
              }));
            }
          })
          .catch((err) => {
            console.warn("[ExamCatalogStore] Background detail revalidate notice:", err);
          });
      }
      return cachedEntry.data;
    }

    // Initial fetch / forced refresh
    try {
      if (typeof window !== "undefined") {
        const res = await fetch(`/api/exams/${encodeURIComponent(canonicalId)}`);
        if (res.ok) {
          const data = await res.json();
          if (data?.exam) {
            const resolvedPaper: ExamPaper = {
              ...mockMatch,
              ...data.exam,
              questions:
                data.exam.questions && data.exam.questions.length > 0
                  ? data.exam.questions
                  : mockMatch?.questions || [],
            };
            const now = Date.now();
            set((state) => ({
              examDetailCache: {
                ...state.examDetailCache,
                [canonicalId]: { data: resolvedPaper, timestamp: now },
                [rawKey]: { data: resolvedPaper, timestamp: now },
              },
            }));
            return resolvedPaper;
          }
        }
      }
    } catch (err) {
      console.warn("[ExamCatalogStore] Detail fetch fallback:", err);
    }

    // Resilient fallback to mock bank
    if (mockMatch) {
      const now = Date.now();
      set((state) => ({
        examDetailCache: {
          ...state.examDetailCache,
          [canonicalId]: { data: mockMatch, timestamp: now },
          [rawKey]: { data: mockMatch, timestamp: now },
        },
      }));
      return mockMatch;
    }

    return null;
  },

  // Exam Lifecycle & Workspace Navigation
  setSelectedExam: (exam) => set({ selectedExam: exam }),
  setActiveMode: (mode) => set({ activeMode: mode }),

  startExam: (paper) =>
    set({
      selectedExam: paper,
      activeMode: "WORKSPACE",
      workspaceSession: {
        examId: paper.id,
        currentQuestionIndex: 0,
        userAnswers: {},
        flaggedQuestions: {},
        secondsRemaining: paper.timeLimitMinutes * 60,
        timeSpentSeconds: 0,
      },
      lastSubmittedResult: null,
    }),

  quitExamToHub: () =>
    set({
      activeMode: "HUB",
      workspaceSession: null,
    }),

  setLastSubmittedResult: (result, paper) =>
    set({
      lastSubmittedResult: result,
      lastSubmittedPaper: paper || null,
      activeMode: "REPORT",
    }),

  updateWorkspaceSession: (patch) =>
    set((state) => ({
      workspaceSession: state.workspaceSession
        ? { ...state.workspaceSession, ...patch }
        : null,
    })),

  clearWorkspaceSession: () => set({ workspaceSession: null }),

  // Filter Setters
  setFilterType: (type) =>
    set((state) => ({ filters: { ...state.filters, filterType: type } })),

  setSearchQuery: (query) =>
    set((state) => ({ filters: { ...state.filters, searchQuery: query } })),

  setConfigMode: (mode) =>
    set((state) => ({ filters: { ...state.filters, configMode: mode } })),

  setActiveSkills: (skills) =>
    set((state) => ({ filters: { ...state.filters, activeSkills: skills } })),

  toggleSkill: (skill) =>
    set((state) => {
      const current = state.filters.activeSkills;
      if (current.includes(skill)) {
        if (current.length === 1) return state; // Keep at least one skill selected
        return {
          filters: {
            ...state.filters,
            activeSkills: current.filter((s) => s !== skill),
          },
        };
      }
      return {
        filters: {
          ...state.filters,
          activeSkills: [...current, skill],
        },
      };
    }),

  setAiTopic: (topic) =>
    set((state) => ({ filters: { ...state.filters, aiTopic: topic } })),

  setAiTargetScore: (score) =>
    set((state) => ({ filters: { ...state.filters, aiTargetScore: score } })),

  setAiQuestionCount: (count) =>
    set((state) => ({ filters: { ...state.filters, aiQuestionCount: count } })),

  setScrollPosition: (pos) =>
    set((state) => ({ filters: { ...state.filters, scrollPosition: pos } })),

  resetFilters: () =>
    set({
      filters: { ...DEFAULT_EXAM_FILTERS },
    }),

  // Cache Invalidation
  invalidateCache: (scope = "all") =>
    set((state) => {
      if (scope === "papers") {
        return { examPapersTimestamp: 0 };
      }
      if (scope === "detail") {
        return { examDetailCache: {} };
      }
      return {
        examPapersTimestamp: 0,
        examDetailCache: {},
      };
    }),
}));
