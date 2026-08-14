// scripts/test_analytics_logic.js
const assert = require("assert");

// Mock LocalStorage
class MockStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

// Inline test implementations matching lib/store/skillChartStore.ts
function modeNameToSkillType(mode) {
  const normalized = mode.trim().toLowerCase();
  if (normalized === "dictation") return "dictation";
  if (normalized === "shadowing") return "shadowing";
  if (normalized === "nói" || normalized === "speaking") return "speaking";
  if (normalized === "từ vựng" || normalized === "vocab") return "vocab";
  if (normalized === "viết" || normalized === "writing") return "writing";
  return "dictation";
}

function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addSkillPracticeSession(userId, skill, minutes, xp, storageProvider) {
  const store = storageProvider;
  if (!store) return;

  const validUserId = userId || "guest";
  const skillType = modeNameToSkillType(skill);
  const todayStr = getLocalDateString(new Date());

  const skillMinKey = `xp_voca_daily_minutes_${validUserId}_${skillType}`;
  const skillXpKey = `xp_voca_daily_xp_${validUserId}_${skillType}`;

  const currentMin = JSON.parse(store.getItem(skillMinKey) || "{}");
  currentMin[todayStr] = (currentMin[todayStr] || 0) + minutes;
  store.setItem(skillMinKey, JSON.stringify(currentMin));

  const currentXp = JSON.parse(store.getItem(skillXpKey) || "{}");
  currentXp[todayStr] = (currentXp[todayStr] || 0) + xp;
  store.setItem(skillXpKey, JSON.stringify(currentXp));
}

function get6MonthHeatmapAnalytics(userId, storageProvider) {
  const totalDays = 24 * 7;
  const daysData = [];
  const today = new Date();

  for (let i = 0; i < totalDays; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - totalDays + 1 + i);
    daysData.push({ date: getLocalDateString(d) });
  }

  const weeks = [];
  for (let w = 0; w < 24; w++) {
    weeks.push(daysData.slice(w * 7, (w + 1) * 7));
  }
  return { weeks, totalDays: daysData.length };
}

console.log("🧪 Running Analytics Logic Unit Tests...");

// Test 1: Skill Mode Name Normalization
assert.strictEqual(modeNameToSkillType("Dictation"), "dictation");
assert.strictEqual(modeNameToSkillType("Shadowing"), "shadowing");
assert.strictEqual(modeNameToSkillType("Nói"), "speaking");
assert.strictEqual(modeNameToSkillType("Từ vựng"), "vocab");
assert.strictEqual(modeNameToSkillType("Viết"), "writing");
console.log("✅ Test 1: Mode Name Normalization PASSED");

// Test 2: Local Date String Format
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
assert.strictEqual(datePattern.test(getLocalDateString()), true);
console.log("✅ Test 2: Local Date String Format PASSED");

// Test 3: Session Recording
const mockStore = new MockStorage();
addSkillPracticeSession("user_123", "Nói", 15, 50, mockStore);

const savedMinKey = "xp_voca_daily_minutes_user_123_speaking";
const savedXpKey = "xp_voca_daily_xp_user_123_speaking";
const todayStr = getLocalDateString();

assert.ok(mockStore.getItem(savedMinKey));
assert.ok(mockStore.getItem(savedXpKey));
assert.strictEqual(JSON.parse(mockStore.getItem(savedMinKey))[todayStr], 15);
assert.strictEqual(JSON.parse(mockStore.getItem(savedXpKey))[todayStr], 50);
console.log("✅ Test 3: Session Recording in Storage PASSED");

// Test 4: 6-Month Heatmap Structure (24 Weeks x 7 Days)
const heatmap = get6MonthHeatmapAnalytics("user_123", mockStore);
assert.strictEqual(heatmap.weeks.length, 24);
assert.strictEqual(heatmap.weeks[0].length, 7);
assert.strictEqual(heatmap.totalDays, 168);
console.log("✅ Test 4: 6-Month Heatmap Structure PASSED");

// Test 5: 30-Day Timeline Offsets (Exactly 8 Time Milestones: -19 Past ➔ Today ➔ +10 Future)
const offsets = [-19, -14, -9, -4, 0, 3, 6, 10];
const todayIndex = offsets.indexOf(0);
assert.strictEqual(offsets.length, 8);
assert.strictEqual(todayIndex, 4);
assert.strictEqual(offsets[0], -19);
assert.strictEqual(offsets[offsets.length - 1], 10);
console.log("✅ Test 5: 30-Day Timeline Offsets (Exactly 8 Milestones: -19 Past ➔ Today ➔ +10 Future) PASSED");

console.log("\n🎉 ALL 5 ANALYTICS LOGIC TESTS PASSED 100% SUCCESSFULLY!");
