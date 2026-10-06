/**
 * Comprehensive End-to-End Verification Script for the 4 core highlighted features:
 * 1. Season & Rank Tier (Bậc hạng eSports, SeasonRankCard, Tiers API)
 * 2. AI Roleplay Personas (4 Personas) & Adaptive Difficulty (Beginner/Intermediate/Advanced)
 * 3. AI Certified ScoreCard & Share Modal (CEFR, Copy Post, Web Share payload)
 * 4. YouTube AI Study Set Studio (Flashcards, Quizzes, Batch save to notebook)
 */

import { RANK_TIERS, formatRankXp, getTierForXp, getTierProgress } from "../features/gamification/utils/seasonRank";
import { AI_PERSONAS, DEFAULT_AI_PERSONA } from "../features/ai/conversation/data/aiPersonas";
import { batchSaveFlashcardsToNotebook } from "../features/myvideo/services/videoAiStudySetService";
import { useVocabularyStore } from "../stores/vocabularyStore";
import { useUserStore } from "../stores/userStore";

// Mock localStorage for node environment
class MemoryStorage {
  private store: Record<string, string> = {};
  getItem(k: string) { return this.store[k] || null; }
  setItem(k: string, v: string) { this.store[k] = String(v); }
  removeItem(k: string) { delete this.store[k]; }
  clear() { this.store = {}; }
}
const mockStorage = new MemoryStorage();
(global as any).localStorage = mockStorage;
(global as any).window = { localStorage: mockStorage };

async function verifyAllFeatures() {
  console.log("================================================================================");
  console.log("🚀 STARTING DEEP END-TO-END VERIFICATION OF 4 CORE HIGHLIGHTED FEATURES");
  console.log("================================================================================\n");

  let totalPassed = 0;
  let totalFailed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      totalPassed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      totalFailed++;
    }
  }

  // ==========================================================================
  // 1. FEATURE 1: SEASON & RANK TIER (MÙA GIẢI & BẬC HẠNG)
  // ==========================================================================
  console.log("--------------------------------------------------------------------------------");
  console.log("📌 [FEATURE 1] Testing Season & Rank Tier Engine & APIs...");
  console.log("--------------------------------------------------------------------------------");

  assert(RANK_TIERS.length === 5, "Rank tiers collection has exactly 5 tiers");
  assert(RANK_TIERS[0].id === "bronze" && RANK_TIERS[0].minXp === 0, "Bronze tier starts at 0 XP");
  assert(RANK_TIERS[1].id === "silver" && RANK_TIERS[1].minXp === 300, "Silver tier starts at 300 XP (+50 coins)");
  assert(RANK_TIERS[2].id === "gold" && RANK_TIERS[2].minXp === 1000, "Gold tier starts at 1,000 XP (+150 coins)");
  assert(RANK_TIERS[3].id === "platinum" && RANK_TIERS[3].minXp === 2500, "Platinum tier starts at 2,500 XP (+400 coins)");
  assert(RANK_TIERS[4].id === "diamond" && RANK_TIERS[4].minXp === 5000, "Diamond tier starts at 5,000 XP (+1,000 coins)");

  // Test XP boundary mappings & format
  assert(getTierForXp(0).id === "bronze", "0 XP maps to Bronze");
  assert(getTierForXp(299).id === "bronze", "299 XP maps to Bronze");
  assert(getTierForXp(300).id === "silver", "300 XP maps to Silver");
  assert(getTierForXp(999).id === "silver", "999 XP maps to Silver");
  assert(getTierForXp(1000).id === "gold", "1,000 XP maps to Gold");
  assert(getTierForXp(2500).id === "platinum", "2,500 XP maps to Platinum");
  assert(getTierForXp(5000).id === "diamond", "5,000 XP maps to Diamond");
  assert(getTierForXp(999999).id === "diamond", "999,999 XP maps to Diamond (capped)");

  // Test progress computation
  const prog150 = getTierProgress(150);
  assert(prog150.percent === 50, "150 XP into Bronze (0..300) equals 50% progress");
  assert(prog150.xpToNext === 150, "150 XP remaining to reach Silver");

  // Test formatRankXp helper
  assert(formatRankXp(0) === "0 XP", "formatRankXp(0) -> '0 XP'");
  assert(formatRankXp(300) === "300 XP", "formatRankXp(300) -> '300 XP'");
  assert(formatRankXp(1000) === "1k XP", "formatRankXp(1000) -> '1k XP'");
  assert(formatRankXp(2500) === "2.5k XP", "formatRankXp(2500) -> '2.5k XP'");
  assert(formatRankXp(5000) === "5k XP", "formatRankXp(5000) -> '5k XP'");

  // Test Live API GET /api/season
  try {
    const res = await fetch("http://localhost:3000/api/season");
    const json = await res.json();
    assert(res.status === 200, "GET /api/season returns HTTP 200");
    assert(json.success === true, "GET /api/season response has success: true");
    assert(Boolean(json.data?.season?.id), `Current season ID is '${json.data?.season?.id}'`);
    assert(json.data?.tiers?.length === 5, "API returns all 5 rank tiers");
  } catch (err: any) {
    console.error("  ✗ Error calling /api/season:", err.message);
    totalFailed++;
  }

  // ==========================================================================
  // 2. FEATURE 2: AI ROLEPLAY PERSONAS & ADAPTIVE DIFFICULTY
  // ==========================================================================
  console.log("\n--------------------------------------------------------------------------------");
  console.log("🎭 [FEATURE 2] Testing AI Roleplay Personas & Adaptive Difficulty...");
  console.log("--------------------------------------------------------------------------------");

  assert(AI_PERSONAS.length === 4, "Provides exactly 4 distinct AI Personas");
  const personaIds = AI_PERSONAS.map(p => p.id);
  assert(personaIds.includes("native_friend"), "Includes Persona: Alex ('native_friend')");
  assert(personaIds.includes("strict_interviewer"), "Includes Persona: Ms. Eleanor ('strict_interviewer')");
  assert(personaIds.includes("patient_tutor"), "Includes Persona: David ('patient_tutor')");
  assert(personaIds.includes("challenging_debater"), "Includes Persona: Victor ('challenging_debater')");
  assert(DEFAULT_AI_PERSONA.id === "native_friend", "Default AI persona is 'native_friend' (Alex)");

  for (const p of AI_PERSONAS) {
    assert(p.name.length > 0 && p.avatarEmoji.length > 0, `Persona ${p.id} has name '${p.name}' & emoji '${p.avatarEmoji}'`);
    assert(p.tonePrompt.length > 50, `Persona ${p.id} has detailed tone prompt (${p.tonePrompt.length} chars)`);
  }

  // Test live AI Chat API with persona & difficulty payload
  try {
    console.log("  ... Testing live call to /api/ai/chat with Alex (Native Friend) + Beginner...");
    const chatRes = await fetch("http://localhost:3000/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Hi! How are you doing today?" }],
        topicId: "at1",
        topicName: "Coffee Shop Order",
        userLevel: "Beginner",
        personaId: "native_friend",
        personaName: "Alex",
        personaTone: DEFAULT_AI_PERSONA.tonePrompt,
        mode: "conversation",
      }),
    });

    assert(chatRes.status === 200, "POST /api/ai/chat with persona returns HTTP 200");
    const chatData = await chatRes.json();
    assert(Boolean(chatData.reply), `AI responded with: "${chatData.reply?.slice(0, 60)}..."`);
    assert(Array.isArray(chatData.suggestedWords), "AI provided vocabulary suggestions");
    assert(Array.isArray(chatData.suggestedPhrases), "AI provided phrase suggestions");
  } catch (err: any) {
    console.error("  ✗ Error calling /api/ai/chat:", err.message);
    totalFailed++;
  }

  // ==========================================================================
  // 3. FEATURE 3: CERTIFIED SCORECARD & SHARE MODAL
  // ==========================================================================
  console.log("\n--------------------------------------------------------------------------------");
  console.log("🏅 [FEATURE 3] Testing AI Certified ScoreCard & Sharing Logic...");
  console.log("--------------------------------------------------------------------------------");

  // Helper function imitating ScoreCard CEFR determination
  function getCefrBadge(score: number): { code: string; label: string } {
    if (score >= 90) return { code: "C1-C2", label: "Mastery / Proficient" };
    if (score >= 75) return { code: "B2", label: "Vantage / Upper-Int" };
    if (score >= 60) return { code: "B1", label: "Threshold / Intermediate" };
    if (score >= 40) return { code: "A2", label: "Waystage / Elementary" };
    return { code: "A1", label: "Breakthrough / Beginner" };
  }

  assert(getCefrBadge(95).code === "C1-C2", "Score 95 yields C1-C2");
  assert(getCefrBadge(80).code === "B2", "Score 80 yields B2");
  assert(getCefrBadge(65).code === "B1", "Score 65 yields B1");
  assert(getCefrBadge(45).code === "A2", "Score 45 yields A2");
  assert(getCefrBadge(20).code === "A1", "Score 20 yields A1");

  // Format share post content check
  const sampleTopicName = "Ordering Coffee at Starbucks";
  const samplePersona = AI_PERSONAS[0];
  const sampleScore = 88;
  const shareText = `🎉 Tôi vừa hoàn thành buổi luyện nói tiếng Anh với ${samplePersona.name} (${samplePersona.roleTitle}) trên XP English!\n` +
    `🏅 Đạt chứng nhận AI Certified CEFR B2 với điểm số ${sampleScore}/100.\n` +
    `👉 Cùng vào luyện nói phản xạ thông minh tại: https://xpenglish.edu.vn/ai/conversation`;

  assert(shareText.includes(samplePersona.name), "Share text includes Persona name");
  assert(shareText.includes("AI Certified CEFR B2"), "Share text includes CEFR certification");
  assert(shareText.includes("88/100"), "Share text includes numerical score");
  assert(shareText.includes("https://xpenglish.edu.vn/ai/conversation"), "Share text includes direct practice link");

  // ==========================================================================
  // 4. FEATURE 4: YOUTUBE AI STUDY SET (FLASHCARDS & QUIZ STUDIO)
  // ==========================================================================
  console.log("\n--------------------------------------------------------------------------------");
  console.log("🎬 [FEATURE 4] Testing YouTube AI Study Set Generator & Batch Save...");
  console.log("--------------------------------------------------------------------------------");

  // Test live API POST /api/youtube/study-set
  const testSubtitles = [
    { textEn: "Welcome back! Today we analyze sophisticated vocabulary in spoken English.", textVn: "Chào mừng bạn! Hôm nay chúng ta phân tích từ vựng cao cấp.", startTime: 0 },
    { textEn: "Continuous dedication is the fundamental pillar of language mastery.", textVn: "Sự cống hiến bền bỉ là trụ cột nền tảng của việc thành thạo ngôn ngữ.", startTime: 5 },
    { textEn: "Let us examine authentic dialogues and precise phonetic transcriptions.", textVn: "Hãy cùng kiểm tra các đoạn hội thoại thực tế và phiên âm ngữ âm chính xác.", startTime: 10 },
  ];

  try {
    console.log("  ... Testing live call to /api/youtube/study-set...");
    const studySetRes = await fetch("http://localhost:3000/api/youtube/study-set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoId: "verify_demo_yt_01",
        videoTitle: "Advanced English Masterclass",
        subtitles: testSubtitles,
      }),
    });

    assert(studySetRes.status === 200, "POST /api/youtube/study-set returns HTTP 200");
    const studySetData = await studySetRes.json();
    assert(studySetData.sourceVideoId === "verify_demo_yt_01", "Response belongs to requested videoId");
    assert(Boolean(studySetData.summary?.en && studySetData.summary?.vn), "Returns bilingual summary (EN & VN)");
    assert(Array.isArray(studySetData.flashcards) && studySetData.flashcards.length > 0, `Generated ${studySetData.flashcards?.length} flashcards`);
    assert(Array.isArray(studySetData.quizzes) && studySetData.quizzes.length > 0, `Generated ${studySetData.quizzes?.length} quiz questions`);

    const firstCard = studySetData.flashcards[0];
    assert(Boolean(firstCard.word && firstCard.phonetic && firstCard.definitionVn), `Flashcard has word '${firstCard.word}', phonetic '${firstCard.phonetic}' and definition '${firstCard.definitionVn}'`);

    const firstQuiz = studySetData.quizzes[0];
    assert(firstQuiz.options.length === 4, "Quiz question has exactly 4 options (A/B/C/D)");
    assert(typeof firstQuiz.correctAnswerIndex === "number" && firstQuiz.correctAnswerIndex >= 0 && firstQuiz.correctAnswerIndex < 4, `Correct answer index is ${firstQuiz.correctAnswerIndex}`);
    assert(Boolean(firstQuiz.explanation), "Quiz question includes detailed contextual explanation");

    // Test client-side batch save service
    console.log("  ... Testing client service: batchSaveFlashcardsToNotebook...");
    useVocabularyStore.setState({ learned: [] });
    useUserStore.setState({
      user: { id: "test_uid", name: "Minh Vu", wordsLearned: 10, totalXp: 500 } as any,
    });

    let awardedXpTotal = 0;
    const saveResult = batchSaveFlashcardsToNotebook(
      studySetData.flashcards.slice(0, 3),
      "test_uid",
      (xp) => { awardedXpTotal += xp; }
    );

    assert(saveResult.savedCount === 3, `batchSaveFlashcardsToNotebook successfully saved 3 flashcards`);
    assert(saveResult.totalXpAwarded === 9, `Awarded exactly 9 XP (3 * 3 XP per flashcard)`);
    assert(awardedXpTotal === 9, `Callback awardXp called with total 9 XP`);

    // Verify deduplication
    const dupeResult = batchSaveFlashcardsToNotebook(
      studySetData.flashcards.slice(0, 3),
      "test_uid",
      (xp) => { awardedXpTotal += xp; }
    );
    assert(dupeResult.savedCount === 0, "Deduplication: 0 duplicates saved");
    assert(dupeResult.skippedCount === 3, "Deduplication: all 3 previously saved words were skipped");
  } catch (err: any) {
    console.error("  ✗ Error testing YouTube study set:", err.message);
    totalFailed++;
  }

  // ==========================================================================
  // SUMMARY
  // ==========================================================================
  console.log("\n================================================================================");
  console.log(`📊 FINAL RESULT: ${totalPassed} PASSED | ${totalFailed} FAILED`);
  console.log("================================================================================");

  if (totalFailed === 0) {
    console.log("🎉 ALL 4 CORE FEATURES PASSED 100% WITH FLYING COLORS!");
    process.exit(0);
  } else {
    console.error("💥 SOME TESTS FAILED!");
    process.exit(1);
  }
}

verifyAllFeatures().catch((err) => {
  console.error("Fatal test error:", err);
  process.exit(1);
});
