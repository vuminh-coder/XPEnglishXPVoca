import { CURATED_ROADMAP_STEPS, UNIT_CURRICULUM_CONFIGS } from "../data/curatedRoadmapPathway";
import {
  STORAGE_KEY_COMPLETED_STEPS,
  STORAGE_KEY_STEP_SESSIONS,
  getScopedCompletedStepsKey,
  getScopedStepSessionsKey,
} from "./roadmapSessionSync";
import { BASIC_VOCABULARIES } from "@/features/vocabulary/data/basicVocabularies";
import { ADVANCED_VOCABULARIES } from "@/features/vocabulary/data/advancedVocabularies";
import { BasicVocabularyItem } from "@/features/vocabulary/data/types";
import { isPureVocabularyWord } from "@/features/practice/utils/cleanText";
import { useAuthStore } from "@/stores/authStore";

export interface StageVocabBridgePayload {
  themeId?: string;
  unitNumber?: number;
  part?: number;
  matchedIds: string[];
  mistakeIds?: string[];
  matchedWords?: string[];
  /**
   * When true, existing mistakeIds from an earlier stage (e.g. Stage 1 Practice)
   * are preserved and merged with new mistakeIds rather than overwritten.
   */
  mergeExistingMistakes?: boolean;
}

export interface StageVocabBridgeRecord {
  matchedIds: string[];
  mistakeIds: string[];
  matchedWords: string[];
  updatedAt: number;
}

export interface ResolvedRoadmapContext {
  themeId: string;
  unitNumber: number;
  part: number;
  totalParts: number;
  isExplicitUrl: boolean;
}

const STORAGE_PREFIX = "xp_roadmap_vocab_bridge";
const memoryBridge = new Map<string, StageVocabBridgeRecord>();

export function getVocabBridgeKey(params: {
  themeId?: string;
  unitNumber?: number;
  part?: number;
}): string {
  const unitConfig =
    (params.themeId
      ? UNIT_CURRICULUM_CONFIGS.find((u) => u.themeId === params.themeId)
      : undefined) ||
    (params.unitNumber
      ? UNIT_CURRICULUM_CONFIGS.find((u) => u.unitNumber === params.unitNumber)
      : undefined);

  const theme = params.themeId || unitConfig?.themeId || "t_basic_greetings";
  const unit = params.unitNumber || unitConfig?.unitNumber || 1;
  const part = params.part || 1;
  return `${STORAGE_PREFIX}_${theme}_u${unit}_p${part}`;
}

function readExistingBridgeRecord(key: string): StageVocabBridgeRecord | undefined {
  let record = memoryBridge.get(key);
  if (!record && typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        record = JSON.parse(raw) as StageVocabBridgeRecord;
        if (record) {
          memoryBridge.set(key, record);
        }
      }
    } catch {}
  }
  return record;
}

/**
 * Saves the exact vocabulary items and mistake IDs practiced in Stage 1 (Practice),
 * Stage 2 (Word Link), or Stage 3 (Sentence Builder) so downstream stages and
 * Stage 6 (Checkpoint) reinforce the same vocabulary and prioritize weak words.
 */
export function saveStageMatchedVocab(payload: StageVocabBridgePayload): void {
  const key = getVocabBridgeKey(payload);
  const existing = payload.mergeExistingMistakes ? readExistingBridgeRecord(key) : undefined;

  const incomingMatchedIds = Array.from(new Set(payload.matchedIds.filter(Boolean)));
  const incomingMatchedWords = Array.from(
    new Set((payload.matchedWords || []).filter(Boolean))
  );
  const incomingMistakeIds = Array.from(
    new Set([
      ...((payload.mistakeIds || []).filter(Boolean)),
      ...(existing?.mistakeIds || []),
    ])
  );

  const record: StageVocabBridgeRecord = {
    matchedIds:
      incomingMatchedIds.length > 0
        ? incomingMatchedIds
        : existing?.matchedIds || [],
    mistakeIds: incomingMistakeIds,
    matchedWords:
      incomingMatchedWords.length > 0
        ? incomingMatchedWords
        : existing?.matchedWords || [],
    updatedAt: Date.now(),
  };

  memoryBridge.set(key, record);

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(record));
    } catch {}
  }
}

/**
 * Retrieves prioritized vocabulary IDs and words from earlier stages
 * with mistake words placed first so the learner reinforces weak words immediately.
 */
export function getStageMatchedVocab(params: {
  themeId?: string;
  unitNumber?: number;
  part?: number;
}): {
  priorityVocabIds: string[];
  priorityWords: string[];
  mistakeIds: string[];
} {
  const key = getVocabBridgeKey(params);
  const record = readExistingBridgeRecord(key);

  if (!record) {
    return { priorityVocabIds: [], priorityWords: [], mistakeIds: [] };
  }

  // Place mistakes that belong to the latest matchedIds first, followed by the remaining
  // matchedIds (guaranteeing all 4 Stage 2 Word Link words come first), then any earlier Stage 1 mistakes.
  const mistakeList = record.mistakeIds || [];
  const matchedList = record.matchedIds || [];
  const mistakeSet = new Set(mistakeList);
  const matchedSet = new Set(matchedList);

  const matchedMistakes = mistakeList.filter((id) => matchedSet.has(id));
  const matchedNonMistakes = matchedList.filter((id) => !mistakeSet.has(id));
  const extraMistakes = mistakeList.filter((id) => !matchedSet.has(id));

  const prioritizedIds = [...matchedMistakes, ...matchedNonMistakes, ...extraMistakes];

  return {
    priorityVocabIds: prioritizedIds,
    priorityWords: record.matchedWords || [],
    mistakeIds: record.mistakeIds || [],
  };
}

/**
 * Resolves the active Roadmap (themeId, unitNumber, part, totalParts) context.
 * - When URL query params (?theme=...&unit=...&part=...) are present, normalizes and completes them.
 * - When navigated directly from the Sidebar (no URL params), inspects the learner's active
 *   Roadmap progression in localStorage so Practice, Word Link, and Sentence Builder
 *   automatically stay synchronized with the learner's current Unit and Part.
 */
export function resolveActiveRoadmapContext(params: {
  themeId?: string | null;
  unit?: string | number | null;
  part?: string | number | null;
  totalParts?: string | number | null;
  skillType?: "VOCAB" | "MATCH" | "SENTENCE" | "CHECKPOINT";
}): ResolvedRoadmapContext {
  const rawTheme = params.themeId?.trim() || "";
  const parsedUnit =
    typeof params.unit === "number"
      ? params.unit
      : params.unit
      ? parseInt(String(params.unit), 10)
      : NaN;
  const parsedPart =
    typeof params.part === "number"
      ? params.part
      : params.part
      ? parseInt(String(params.part), 10)
      : NaN;
  const parsedTotalParts =
    typeof params.totalParts === "number"
      ? params.totalParts
      : params.totalParts
      ? parseInt(String(params.totalParts), 10)
      : NaN;

  const defaultTotalParts = params.skillType === "CHECKPOINT" ? 1 : 2;

  // Case 1: Explicit theme or unit in URL query parameters
  if (rawTheme || (!Number.isNaN(parsedUnit) && parsedUnit >= 1)) {
    const unitConfig =
      (rawTheme
        ? UNIT_CURRICULUM_CONFIGS.find((u) => u.themeId === rawTheme)
        : undefined) ||
      (!Number.isNaN(parsedUnit)
        ? UNIT_CURRICULUM_CONFIGS.find((u) => u.unitNumber === parsedUnit)
        : undefined) ||
      UNIT_CURRICULUM_CONFIGS[0];

    const resolvedThemeId = rawTheme || unitConfig.themeId;
    const resolvedUnitNumber =
      !Number.isNaN(parsedUnit) && parsedUnit >= 1 ? parsedUnit : unitConfig.unitNumber;
    const resolvedTotalParts =
      !Number.isNaN(parsedTotalParts) && parsedTotalParts >= 1
        ? parsedTotalParts
        : defaultTotalParts;
    const resolvedPart =
      !Number.isNaN(parsedPart) && parsedPart >= 1
        ? Math.min(parsedPart, resolvedTotalParts)
        : 1;

    return {
      themeId: resolvedThemeId,
      unitNumber: resolvedUnitNumber,
      part: resolvedPart,
      totalParts: resolvedTotalParts,
      isExplicitUrl: true,
    };
  }

  // Case 2: Direct navigation (e.g. Sidebar click) — infer active Unit & Part from Roadmap progress
  let completedSteps: string[] = [];
  let stepSessions: Record<string, number> = {};

  if (typeof window !== "undefined") {
    try {
      const userId = useAuthStore.getState().user?.id;
      const scopedCompletedKey = getScopedCompletedStepsKey(userId);
      const scopedSessionsKey = getScopedStepSessionsKey(userId);

      const rawCompleted =
        localStorage.getItem(scopedCompletedKey) ||
        localStorage.getItem(STORAGE_KEY_COMPLETED_STEPS);
      if (rawCompleted) {
        const parsed = JSON.parse(rawCompleted);
        if (Array.isArray(parsed)) completedSteps = parsed;
      }

      const rawSessions =
        localStorage.getItem(scopedSessionsKey) ||
        localStorage.getItem(STORAGE_KEY_STEP_SESSIONS);
      if (rawSessions) {
        const parsed = JSON.parse(rawSessions);
        if (parsed && typeof parsed === "object") stepSessions = parsed;
      }
    } catch {}
  }

  const completedSet = new Set(completedSteps);
  const firstIncompleteStep =
    CURATED_ROADMAP_STEPS.find((s) => !completedSet.has(s.id)) || CURATED_ROADMAP_STEPS[0];
  const activeUnitNumber = firstIncompleteStep?.unitNumber || 1;
  const unitConfig =
    UNIT_CURRICULUM_CONFIGS.find((u) => u.unitNumber === activeUnitNumber) ||
    UNIT_CURRICULUM_CONFIGS[0];

  const targetSkill = params.skillType || "VOCAB";
  const matchingSkillStep = CURATED_ROADMAP_STEPS.find(
    (s) => s.unitNumber === unitConfig.unitNumber && s.skillType === targetSkill
  );

  const stepTotalParts =
    !Number.isNaN(parsedTotalParts) && parsedTotalParts >= 1
      ? parsedTotalParts
      : matchingSkillStep?.totalSessions || defaultTotalParts;

  const doneSessions = matchingSkillStep ? stepSessions[matchingSkillStep.id] || 0 : 0;
  const inferredPart =
    !Number.isNaN(parsedPart) && parsedPart >= 1
      ? Math.min(parsedPart, stepTotalParts)
      : doneSessions < stepTotalParts
      ? doneSessions + 1
      : 1;

  return {
    themeId: unitConfig.themeId,
    unitNumber: unitConfig.unitNumber,
    part: inferredPart,
    totalParts: stepTotalParts,
    isExplicitUrl: false,
  };
}

/**
 * Returns the pure vocabulary pool (filtering out any multi-clause phrases)
 * for a given themeId so that Practice (Stage 1), Word Link (Stage 2),
 * Sentence Builder (Stage 3), and Checkpoint (Stage 6) share the exact same
 * 30-word base array and identical Part 1 / Part 2 partitions.
 */
export function getPureThemeVocabularyPool(themeId?: string | null): BasicVocabularyItem[] {
  const targetTheme = themeId?.trim() || "t_basic_greetings";

  const basicMatches = BASIC_VOCABULARIES.filter(
    (v) => v.themeId === targetTheme && isPureVocabularyWord(v)
  );
  if (basicMatches.length > 0) return basicMatches;

  const advMatches = ADVANCED_VOCABULARIES.filter(
    (v) => v.themeId === targetTheme && isPureVocabularyWord(v)
  );
  if (advMatches.length > 0) return advMatches as unknown as BasicVocabularyItem[];

  return BASIC_VOCABULARIES.filter(
    (v) => v.themeId === "t_basic_greetings" && isPureVocabularyWord(v)
  );
}
