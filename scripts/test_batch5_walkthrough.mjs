import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function prewarm(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    console.log(`  🔥 Prewarmed ${url} -> status ${res.status}`);
  } catch (e) {
    console.warn(`  ⚠️ Prewarm notice for ${url}:`, e.message);
  }
}

async function runBatch5Walkthrough() {
  console.log("================================================================================");
  console.log("🌟 STARTING CHROMIUM WALKTHROUGH FOR BATCH 5 (WITH ROUTE PRE-WARMING)");
  console.log("================================================================================\n");

  const routes = [
    `${BASE_URL}/ai`,
    `${BASE_URL}/onboarding`,
    `${BASE_URL}/vocabulary/t1`,
    `${BASE_URL}/study/grammar/present_simple`,
    `${BASE_URL}/premium/checkout?plan=year`,
    `${BASE_URL}/study/exam-prep/result`,
    `${BASE_URL}/privacy`,
    `${BASE_URL}/terms`,
  ];

  console.log("Pre-warming all Batch 5 routes...");
  for (const r of routes) {
    await prewarm(r);
  }

  console.log("\nLaunching Chrome for visual capture & interactions...");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  async function safeGoto(url, waitMs = 2500) {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
      await page.waitForSelector("body");
      await new Promise((r) => setTimeout(r, waitMs));
      return true;
    } catch (e) {
      console.warn(`Warning navigating to ${url}:`, e.message);
      return false;
    }
  }

  // 1. /ai
  console.log("\n1. Navigating to /ai...");
  if (await safeGoto(`${BASE_URL}/ai`)) {
    const shot = path.join(ARTIFACTS_DIR, "batch5_01_ai_hub.png");
    await page.screenshot({ path: shot });
    console.log(`  📸 Screenshot 1: ${shot}`);
  }

  // 2. /onboarding
  console.log("\n2. Navigating to /onboarding...");
  if (await safeGoto(`${BASE_URL}/onboarding`)) {
    const shot = path.join(ARTIFACTS_DIR, "batch5_02_onboarding_quiz.png");
    await page.screenshot({ path: shot });
    console.log(`  📸 Screenshot 2: ${shot}`);

    try {
      const optionButtons = await page.$$("button");
      for (const btn of optionButtons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes("goes")) {
          await btn.click();
          await new Promise((r) => setTimeout(r, 600));
          break;
        }
      }
      const shot2b = path.join(ARTIFACTS_DIR, "batch5_02b_onboarding_answered.png");
      await page.screenshot({ path: shot2b });
      console.log(`  📸 Screenshot 2b: ${shot2b}`);
    } catch (e) {
      console.warn("Could not click option:", e.message);
    }
  }

  // 3. /vocabulary/t1
  console.log("\n3. Navigating to /vocabulary/t1...");
  if (await safeGoto(`${BASE_URL}/vocabulary/t1`)) {
    const shot = path.join(ARTIFACTS_DIR, "batch5_03_vocab_theme_flashcard.png");
    await page.screenshot({ path: shot });
    console.log(`  📸 Screenshot 3: ${shot}`);

    try {
      const buttons = await page.$$("button");
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes("Danh sách")) {
          await btn.click();
          await new Promise((r) => setTimeout(r, 800));
          break;
        }
      }
      const shot3b = path.join(ARTIFACTS_DIR, "batch5_03b_vocab_theme_list.png");
      await page.screenshot({ path: shot3b });
      console.log(`  📸 Screenshot 3b: ${shot3b}`);
    } catch (e) {
      console.warn("Could not switch mode:", e.message);
    }
  }

  // 4. /study/grammar/present_simple
  console.log("\n4. Navigating to /study/grammar/present_simple...");
  if (await safeGoto(`${BASE_URL}/study/grammar/present_simple`)) {
    const shot = path.join(ARTIFACTS_DIR, "batch5_04_grammar_theory.png");
    await page.screenshot({ path: shot });
    console.log(`  📸 Screenshot 4: ${shot}`);

    try {
      const buttons = await page.$$("button");
      for (const btn of buttons) {
        const text = await page.evaluate(el => el.textContent, btn);
        if (text && text.includes("Luyện tập")) {
          await btn.click();
          await new Promise((r) => setTimeout(r, 800));
          break;
        }
      }
      const shot4b = path.join(ARTIFACTS_DIR, "batch5_04b_grammar_practice.png");
      await page.screenshot({ path: shot4b });
      console.log(`  📸 Screenshot 4b: ${shot4b}`);
    } catch (e) {
      console.warn("Could not switch grammar tab:", e.message);
    }
  }

  // 5. /premium/checkout?plan=year
  console.log("\n5. Navigating to /premium/checkout?plan=year...");
  if (await safeGoto(`${BASE_URL}/premium/checkout?plan=year`)) {
    const shot = path.join(ARTIFACTS_DIR, "batch5_05_checkout_vietqr.png");
    await page.screenshot({ path: shot });
    console.log(`  📸 Screenshot 5: ${shot}`);
  }

  // 6. /study/exam-prep/result
  console.log("\n6. Navigating to /study/exam-prep/result...");
  if (await safeGoto(`${BASE_URL}/study/exam-prep/result`)) {
    const shot = path.join(ARTIFACTS_DIR, "batch5_06_exam_result_hub.png");
    await page.screenshot({ path: shot });
    console.log(`  📸 Screenshot 6: ${shot}`);
  }

  // 7. /privacy
  console.log("\n7. Navigating to /privacy...");
  if (await safeGoto(`${BASE_URL}/privacy`)) {
    const shot = path.join(ARTIFACTS_DIR, "batch5_07_privacy_policy.png");
    await page.screenshot({ path: shot });
    console.log(`  📸 Screenshot 7: ${shot}`);
  }

  // 8. /terms
  console.log("\n8. Navigating to /terms...");
  if (await safeGoto(`${BASE_URL}/terms`)) {
    const shot = path.join(ARTIFACTS_DIR, "batch5_08_terms_of_service.png");
    await page.screenshot({ path: shot });
    console.log(`  📸 Screenshot 8: ${shot}`);
  }

  console.log("\n================================================================================");
  console.log("✅ BATCH 5 CHROMIUM WALKTHROUGH COMPLETED SUCCESSFULLY");
  console.log("================================================================================");

  await browser.close();
}

runBatch5Walkthrough().catch((err) => {
  console.error("Batch 5 test failed:", err);
  process.exit(1);
});
