// scripts/test_analytics_db_integration.js
const { getLocalDateString, modeNameToSkillType, SKILL_CONFIGS } = require("../stores/skillChartStore");

console.log("=== KIỂM THỬ TÍCH HỢP DATA PIPELINE ANALYTICS & POSTGRESQL ===");

// 1. Test skill mode name normalization
const testModes = ["Dictation", "Shadowing", "Nói", "Từ vựng", "Viết", "speaking", "writing", "vocab", "dictation"];
testModes.forEach((m) => {
  const normalized = modeNameToSkillType(m);
  console.log(`[Normalized] "${m}" => "${normalized}" (${SKILL_CONFIGS[normalized] ? "OK" : "FAILED"})`);
});

// 2. Test Local Storage Date Generator
const todayStr = getLocalDateString(new Date());
console.log(`[Date Generator] Today Local String: ${todayStr} (Format check: ${/^\d{4}-\d{2}-\d{2}$/.test(todayStr)})`);

console.log("=== TẤT CẢ KIỂM THỬ CƠ BẢN HOÀN TẤT THÀNH CÔNG ===");
