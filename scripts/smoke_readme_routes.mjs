/**
 * Smoke test các trang & API GET theo README.
 * Chạy: node scripts/smoke_readme_routes.mjs
 * Chạy có đăng nhập: $env:SESSION="<giá trị cookie xp_voca_session>"; node scripts/smoke_readme_routes.mjs
 */
const base = process.env.BASE_URL || "http://localhost:3000";
const cookie = process.env.SESSION ? `xp_voca_session=${process.env.SESSION}` : "";

const pages = [
  "/", "/login", "/register", "/forgot-password", "/privacy", "/terms",
  "/dashboard", "/analytics", "/roadmap", "/study/practice", "/study/dictation",
  "/study/shadowing", "/study/reading", "/study/reading/r1", "/study/grammar", "/study/grammar/1",
  "/study/ipa", "/study/ipa/practice", "/study/ipa/minimal-pairs", "/study/exam-prep",
  "/study/exam-prep/result", "/study/games", "/study/pvp", "/study/rooms", "/study/plan",
  "/ai", "/ai/tutor", "/ai/conversation", "/vocabulary", "/myvocab", "/myvideo", "/review",
  "/community", "/community/leaderboard", "/community/friends", "/community/groups",
  "/profile", "/profile/achievements", "/shop", "/premium", "/premium/checkout",
  "/settings", "/leaderboard", "/onboarding",
];

const apis = [
  "/api/health/ping", "/api/auth/me", "/api/leaderboard?period=week&limit=3",
  "/api/leaderboard?period=month&criterion=time&limit=3", "/api/vocabulary",
  "/api/vocabulary/themes", "/api/listening/lessons", "/api/exams", "/api/exams/stats",
  "/api/exams/attempts", "/api/user/daily-checkin", "/api/user/challenges",
  "/api/user/analytics", "/api/user/vocab", "/api/user/profile", "/api/dashboard/overview",
  "/api/study-plan/current", "/api/study-rooms", "/api/groups", "/api/friends",
  "/api/friends/requests", "/api/friends/suggestions", "/api/posts",
  "/api/shop/inventory", "/api/subscription/status", "/api/subscription/history",
  "/api/ai/sessions", "/api/ai/chatbot/recommendations", "/api/ai/grammar/progress",
  "/api/dictionary/lookup?word=hello",
];

async function hit(path) {
  const t = Date.now();
  try {
    const res = await fetch(base + path, {
      redirect: "manual",
      headers: cookie ? { cookie } : {},
      signal: AbortSignal.timeout(120000),
    });
    const loc = res.headers.get("location") || "";
    return { path, status: res.status, ms: Date.now() - t, loc };
  } catch (e) {
    return { path, status: "ERR", ms: Date.now() - t, loc: String(e.message) };
  }
}

const results = [];
for (const p of [...pages, ...apis]) {
  const r = await hit(p);
  results.push(r);
  const bad = r.status === "ERR" || r.status >= 500;
  console.log(`${bad ? "FAIL" : "ok  "} ${String(r.status).padEnd(4)} ${String(r.ms).padStart(5)}ms ${r.path} ${r.loc ? "-> " + r.loc : ""}`);
}
const fails = results.filter((r) => r.status === "ERR" || r.status >= 500);
console.log(`\n${results.length} requests, ${fails.length} failures`);
process.exit(fails.length ? 1 : 0);
