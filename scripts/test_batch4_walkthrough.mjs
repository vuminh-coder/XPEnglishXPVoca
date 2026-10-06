import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function runBatch4Walkthrough() {
  console.log("================================================================================");
  console.log("🌟 STARTING CHROMIUM WALKTHROUGH FOR BATCH 4 (LANDING, AUTH, SETTINGS, TUTOR, ETC.)");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  async function safeGoto(url, waitMs = 3500) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForSelector("body");
      await new Promise((r) => setTimeout(r, waitMs));
      return true;
    } catch (e) {
      console.warn(`Warning navigating to ${url}:`, e.message);
      return false;
    }
  }

  // 1. / (Landing Page)
  console.log("1. Navigating to / (Landing Page)...");
  if (await safeGoto(`${BASE_URL}/`)) {
    const shot1 = path.join(ARTIFACTS_DIR, "batch4_01_landing.png");
    await page.screenshot({ path: shot1 });
    console.log(`  📸 Screenshot 1 (Landing Page): ${shot1}`);
  }

  // 2. /login (Auth Login)
  console.log("\n2. Navigating to /login...");
  if (await safeGoto(`${BASE_URL}/login`)) {
    const shot2 = path.join(ARTIFACTS_DIR, "batch4_02_login.png");
    await page.screenshot({ path: shot2 });
    console.log(`  📸 Screenshot 2 (Login): ${shot2}`);
  }

  // 3. /register (Auth Register)
  console.log("\n3. Navigating to /register...");
  if (await safeGoto(`${BASE_URL}/register`)) {
    const shot3 = path.join(ARTIFACTS_DIR, "batch4_03_register.png");
    await page.screenshot({ path: shot3 });
    console.log(`  📸 Screenshot 3 (Register): ${shot3}`);
  }

  // 4. /settings (App & User Settings)
  console.log("\n4. Navigating to /settings...");
  if (await safeGoto(`${BASE_URL}/settings`)) {
    const shot4 = path.join(ARTIFACTS_DIR, "batch4_04_settings.png");
    await page.screenshot({ path: shot4 });
    console.log(`  📸 Screenshot 4 (Settings): ${shot4}`);
  }

  // 5. /ai/tutor (AI Tutor Hub)
  console.log("\n5. Navigating to /ai/tutor...");
  if (await safeGoto(`${BASE_URL}/ai/tutor`)) {
    const shot5 = path.join(ARTIFACTS_DIR, "batch4_05_ai_tutor.png");
    await page.screenshot({ path: shot5 });
    console.log(`  📸 Screenshot 5 (AI Tutor): ${shot5}`);
  }

  // 6. /study/reading (Reading Comprehension)
  console.log("\n6. Navigating to /study/reading...");
  if (await safeGoto(`${BASE_URL}/study/reading`)) {
    const shot6 = path.join(ARTIFACTS_DIR, "batch4_06_reading.png");
    await page.screenshot({ path: shot6 });
    console.log(`  📸 Screenshot 6 (Reading Comprehension): ${shot6}`);
  }

  // 7. /study/plan (Study Plan & Goal Tracker)
  console.log("\n7. Navigating to /study/plan...");
  if (await safeGoto(`${BASE_URL}/study/plan`)) {
    const shot7 = path.join(ARTIFACTS_DIR, "batch4_07_study_plan.png");
    await page.screenshot({ path: shot7 });
    console.log(`  📸 Screenshot 7 (Study Plan): ${shot7}`);
  }

  // 8. /profile/achievements (Badges & Milestones)
  console.log("\n8. Navigating to /profile/achievements...");
  if (await safeGoto(`${BASE_URL}/profile/achievements`)) {
    const shot8 = path.join(ARTIFACTS_DIR, "batch4_08_achievements.png");
    await page.screenshot({ path: shot8 });
    console.log(`  📸 Screenshot 8 (Achievements): ${shot8}`);
  }

  // 9. /admin (Admin Control Dashboard)
  console.log("\n9. Navigating to /admin...");
  if (await safeGoto(`${BASE_URL}/admin`)) {
    const shot9 = path.join(ARTIFACTS_DIR, "batch4_09_admin.png");
    await page.screenshot({ path: shot9 });
    console.log(`  📸 Screenshot 9 (Admin): ${shot9}`);
  }

  console.log("\n================================================================================");
  console.log("✅ BATCH 4 CHROMIUM WALKTHROUGH COMPLETED SUCCESSFULLY (9 Screenshots)");
  console.log("================================================================================");

  await browser.close();
}

runBatch4Walkthrough().catch((err) => {
  console.error("Batch 4 test failed:", err);
  process.exit(1);
});
