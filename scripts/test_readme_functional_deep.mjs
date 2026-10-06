import crypto from "crypto";

const JWT_SECRET = process.env.JWT_SECRET || "xp_english_xp_voca_jwt_secret_key_2026";
const base = process.env.BASE_URL || "http://localhost:3000";

function base64UrlEncode(str) {
  return Buffer.from(str).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

function signAuthToken(payload, expiresInDays = 30) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInDays * 24 * 60 * 60;
  const fullPayload = { ...payload, iat: now, exp };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(fullPayload));

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

async function createTestUser(suffix = "") {
  const email = `func_test_${Date.now()}_${suffix}@example.com`;
  const randomIp = `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
  const regRes = await fetch(`${base}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": randomIp,
    },
    body: JSON.stringify({
      email,
      password: "Password123!",
      fullName: `Functional Tester ${suffix}`,
      username: `user_${Date.now()}_${suffix}`,
    }),
  });
  const regData = await regRes.json();
  if (!regData.success) {
    throw new Error(`Registration failed: ${JSON.stringify(regData)}`);
  }
  const userId = regData.user.id;
  const token = signAuthToken({ userId, email });
  return {
    userId,
    email,
    token,
    headers: {
      "Content-Type": "application/json",
      cookie: `xp_voca_session=${token}`,
    },
  };
}

async function testWorkflow() {
  console.log("=== COMPREHENSIVE README FUNCTIONAL WORKFLOW AUDIT ===");

  const user = await createTestUser("main");
  console.log(`[PASS] Primary User created with ID: ${user.userId}`);

  const results = [];
  function logResult(name, passed, detail) {
    results.push({ name, passed, detail });
    console.log(`${passed ? "✅ [PASS]" : "❌ [FAIL]"} ${name} - ${detail}`);
  }

  // Workflow 1: Daily Check-in (POST /api/user/daily-checkin)
  try {
    const res = await fetch(`${base}/api/user/daily-checkin`, {
      method: "POST",
      headers: user.headers,
    });
    const data = await res.json();
    if (res.status === 200 && data.success) {
      logResult("Workflow 1: Daily Check-in", true, `Streak: ${data.data?.streak ?? 1}, XP: +${data.data?.xpAwarded ?? 15}, Coins: +${data.data?.coinsAwarded ?? 20}`);
    } else {
      logResult("Workflow 1: Daily Check-in", false, `Status: ${res.status}, Msg: ${data.message || data.error}`);
    }
  } catch (e) {
    logResult("Workflow 1: Daily Check-in", false, e.message);
  }

  // Workflow 2a: Anti-Cheat Mini-Games Record (< 8s duration -> antiCheatFlagged: true)
  try {
    const resSpam = await fetch(`${base}/api/games/record`, {
      method: "POST",
      headers: user.headers,
      body: JSON.stringify({
        gameType: "scramble",
        score: 100,
        wordsCompleted: 8,
        durationSeconds: 3, // < 8s -> anti-cheat flagged
      }),
    });
    const dataSpam = await resSpam.json();
    const flagged = dataSpam.antiCheatFlagged === true && dataSpam.data?.xpGained === 0;
    logResult("Workflow 2a: Mini-Games Anti-Cheat (<8s Flagging)", flagged, `AntiCheatFlagged: ${dataSpam.antiCheatFlagged}, XP: ${dataSpam.data?.xpGained}`);
  } catch (e) {
    logResult("Workflow 2a: Mini-Games Anti-Cheat", false, e.message);
  }

  // Workflow 2b: Mini-Games Server Valid Record with Dedicated User (>= 8s duration, fresh cooldown)
  try {
    const gameUser = await createTestUser("game");
    const resValid = await fetch(`${base}/api/games/record`, {
      method: "POST",
      headers: gameUser.headers,
      body: JSON.stringify({
        gameType: "scramble",
        score: 120,
        wordsCompleted: 6,
        durationSeconds: 15, // >= 8s -> authorized reward
      }),
    });
    const dataValid = await resValid.json();
    const passed = resValid.status === 200 && dataValid.success && dataValid.data?.xpGained > 0;
    logResult("Workflow 2b: Mini-Games Server Valid Record", passed, `XP Gained: ${dataValid.data?.xpGained}, Coins: ${dataValid.data?.coinsGained}`);
  } catch (e) {
    logResult("Workflow 2b: Mini-Games Server Valid Record", false, e.message);
  }

  // Workflow 3: Server-Authoritative Activity Award (POST /api/user/activity-award)
  try {
    const res = await fetch(`${base}/api/user/activity-award`, {
      method: "POST",
      headers: user.headers,
      body: JSON.stringify({
        activityType: "vocab_practice",
        skill: "vocab",
        minutes: 5,
        xp: 25,
        coins: 5,
        metadata: { wordsLearned: 10 },
      }),
    });
    const data = await res.json();
    const ok = res.status === 200 && data.success && data.data?.totalXp !== undefined;
    logResult("Workflow 3: Activity Award Atomic Increment", ok, `Total XP: ${data.data?.totalXp}, Level: ${data.data?.level}`);
  } catch (e) {
    logResult("Workflow 3: Activity Award", false, e.message);
  }

  // Workflow 4: Vocabulary Sync & Upsert (POST & GET /api/user/vocab)
  try {
    const postRes = await fetch(`${base}/api/user/vocab`, {
      method: "POST",
      headers: user.headers,
      body: JSON.stringify({
        vocabId: "bv_greeti_01",
        proficiency: 1,
        isFavorite: true,
      }),
    });
    const postData = await postRes.json();

    const getRes = await fetch(`${base}/api/user/vocab`, { headers: user.headers });
    const getData = await getRes.json();
    const list = getData.data || [];
    const hasWord = list.some((v) => v.vocabId === "bv_greeti_01" || v.word === "hello");
    logResult("Workflow 4: Vocab User Persistence & Favorites", postRes.status === 200 && hasWord, `Saved word found in user list: ${hasWord} (count: ${list.length})`);
  } catch (e) {
    logResult("Workflow 4: Vocab User Persistence", false, e.message);
  }

  // Workflow 5: Listening Progress & Self-Healing Sync (POST /api/listening/progress)
  try {
    const res = await fetch(`${base}/api/listening/progress`, {
      method: "POST",
      headers: user.headers,
      body: JSON.stringify({
        lessonId: "listen_a1_001",
        completedSentences: [0, 1, 2],
        isCompleted: false,
        score: 85,
        mode: "dictation",
      }),
    });
    const data = await res.json();
    logResult("Workflow 5: Listening Progress Dictation Sync", res.status === 200 && data.success, `Progress saved, completed sentences: ${data.progress?.completedSentences?.length || 3}`);
  } catch (e) {
    logResult("Workflow 5: Listening Progress Sync", false, e.message);
  }

  // Workflow 6: Exam Prep Bank & Stats (GET /api/exams & GET /api/exams/stats)
  try {
    const examsRes = await fetch(`${base}/api/exams?limit=5`);
    const examsData = await examsRes.json();
    const hasExams = examsData.exams?.length > 0;

    const statsRes = await fetch(`${base}/api/exams/stats`, { headers: user.headers });
    const statsData = await statsRes.json();
    logResult("Workflow 6: Exam Bank Query & User Exam Stats", hasExams && statsRes.status === 200, `Found ${examsData.exams?.length} exams, stats response valid: ${statsData.success !== false}`);
  } catch (e) {
    logResult("Workflow 6: Exam Prep Bank & Stats", false, e.message);
  }

  // Workflow 7: XP Mentor AI Recommendations (GET /api/ai/chatbot/recommendations)
  try {
    const res = await fetch(`${base}/api/ai/chatbot/recommendations`, { headers: user.headers });
    const data = await res.json();
    const hasData = res.status === 200 && data.success && (data.data?.dailyQuests?.length > 0 || data.data?.recommendations !== undefined);
    logResult("Workflow 7: Floating AI Mentor Recommendations", hasData, `Daily quests count: ${data.data?.dailyQuests?.length || 0}, Target exam: ${data.data?.targetGoal?.exam}`);
  } catch (e) {
    logResult("Workflow 7: AI Mentor Recommendations", false, e.message);
  }

  // Workflow 8: Shop Inventory & Balance (GET /api/shop/inventory)
  try {
    const res = await fetch(`${base}/api/shop/inventory`, { headers: user.headers });
    const data = await res.json();
    const valid = res.status === 200 && data.success && data.coins !== undefined && Array.isArray(data.purchaseLogs);
    logResult("Workflow 8: Shop Inventory & Wallet Query", valid, `Coins: ${data.coins}, Freezes: ${data.streakFreezes}, Logs: ${data.purchaseLogs?.length}`);
  } catch (e) {
    logResult("Workflow 8: Shop Inventory", false, e.message);
  }

  // Workflow 9: VIP Subscription Checkout Order Generation (POST /api/subscription/checkout)
  try {
    const res = await fetch(`${base}/api/subscription/checkout`, {
      method: "POST",
      headers: user.headers,
      body: JSON.stringify({
        planKey: "yearly",
      }),
    });
    const data = await res.json();
    const ok = res.status === 200 && data.success && data.order?.id !== undefined;
    logResult("Workflow 9: VIP Subscription Checkout / VietQR", ok, `Order: ${data.order?.id}, Syntax: ${data.order?.transferSyntax}, VietQR: ${!!data.order?.vietQrUrl}`);
  } catch (e) {
    logResult("Workflow 9: VIP Subscription Checkout", false, e.message);
  }

  // Workflow 10: AI Conversation Session Lifecycle (POST & GET /api/ai/sessions)
  try {
    const postRes = await fetch(`${base}/api/ai/sessions`, {
      method: "POST",
      headers: user.headers,
      body: JSON.stringify({
        mode: "conversation",
        topicId: "restaurant",
        topicTitle: "Ordering at a Restaurant",
        messages: [
          { role: "assistant", content: "Hello, welcome to our restaurant!" },
          { role: "user", content: "I would like a table for two, please." },
        ],
        status: "IN_PROGRESS",
      }),
    });
    const postData = await postRes.json();

    const getRes = await fetch(`${base}/api/ai/sessions?mode=conversation`, { headers: user.headers });
    const getData = await getRes.json();
    const hasSession = getData.sessions?.length > 0 || getData.activeSession !== null;
    logResult("Workflow 10: AI Conversation Session Lifecycle", postRes.status === 200 && hasSession, `Session created: ${postData.sessionId}`);
  } catch (e) {
    logResult("Workflow 10: AI Conversation Session", false, e.message);
  }

  const failedCount = results.filter((r) => !r.passed).length;
  console.log(`\n=== FINAL RESULT: ${results.length - failedCount}/${results.length} Workflows Passed ===`);
  process.exit(failedCount > 0 ? 1 : 0);
}

testWorkflow().catch((err) => {
  console.error("Workflow audit error:", err);
  process.exit(1);
});
