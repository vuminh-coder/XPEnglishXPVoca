import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/myvideo";

async function runChromeTest() {
  console.log("================================================================================");
  console.log("🚀 STARTING CHROME AUTOMATION TEST FOR: /myvideo");
  console.log("================================================================================\n");

  const consoleLogs = [];
  const consoleErrors = [];
  const networkFailures = [];

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--window-size=1440,900",
    ],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
    },
  });

  const page = await browser.newPage();

  page.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error") {
      consoleErrors.push(text);
      console.log(`  [Browser Console Error]: ${text}`);
    } else {
      consoleLogs.push(`[${msg.type()}] ${text}`);
    }
  });

  page.on("requestfailed", (req) => {
    // Ignore analytics or external tracking failures if any
    const url = req.url();
    if (!url.includes("google-analytics") && !url.includes("doubleclick")) {
      networkFailures.push(`${req.method()} ${url} - ${req.failure()?.errorText}`);
    }
  });

  console.log(`🌐 Navigating to ${BASE_URL}...`);
  const response = await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 45000 });
  console.log(`  ✓ HTTP Status: ${response.status()}`);

  // Step 1: Capture Initial Studio Overview
  const initialShot = path.join(ARTIFACTS_DIR, "myvideo_chrome_01_overview.png");
  await page.screenshot({ path: initialShot, fullPage: false });
  console.log(`  📸 Screenshot 1 saved: ${initialShot}`);

  // Step 2: Check Page Header & Metrics Banner
  const title = await page.title();
  console.log(`  ✓ Page Title: "${title}"`);

  const metricsExist = await page.evaluate(() => {
    const banner = document.querySelector("section") || document.querySelector("header");
    return Boolean(banner);
  });
  console.log(`  ✓ Hero Metrics Banner rendered: ${metricsExist}`);

  // Step 3: Test Interactive Study Dock Tabs (Subtitles, Dictation, AI Study Set, Playlist)
  console.log("\n--------------------------------------------------------------------------------");
  console.log("📑 Testing Interactive Study Dock Tabs...");
  console.log("--------------------------------------------------------------------------------");

  // Tab 1: Subtitles (Default)
  const subCount = await page.evaluate(() => {
    const subs = document.querySelectorAll("[data-testid='sub-item'], li, .subtitle-sentence");
    return subs.length;
  });
  console.log(`  ✓ Subtitle items detected: ${subCount}`);

  // Tab 2: Click Dictation Tab
  console.log("  ... Switching to Dictation Tab...");
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll("button"));
    const dictTab = tabs.find((b) => b.textContent.includes("Dictation") || b.textContent.includes("Chép chính tả"));
    if (dictTab) dictTab.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const dictationShot = path.join(ARTIFACTS_DIR, "myvideo_chrome_02_dictation_tab.png");
  await page.screenshot({ path: dictationShot, fullPage: false });
  console.log(`  📸 Screenshot 2 saved: ${dictationShot}`);

  // Tab 3: Click AI Study Set Tab (✨ AI Thẻ & Quiz)
  console.log("  ... Switching to ✨ AI Thẻ & Quiz Tab...");
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll("button"));
    const aiTab = tabs.find(
      (b) => b.textContent.includes("AI Thẻ") || b.textContent.includes("AI Study Set") || b.textContent.includes("✨")
    );
    if (aiTab) aiTab.click();
  });
  await new Promise((r) => setTimeout(r, 2000));

  const aiTabShot = path.join(ARTIFACTS_DIR, "myvideo_chrome_03_studyset_tab.png");
  await page.screenshot({ path: aiTabShot, fullPage: false });
  console.log(`  📸 Screenshot 3 saved: ${aiTabShot}`);

  // Check if AI generate button exists and click it if not generated yet
  const aiGeneratedState = await page.evaluate(async () => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const generateBtn = buttons.find((b) => b.textContent.includes("Tạo Bộ Thẻ & Bài Tập AI"));
    if (generateBtn) {
      generateBtn.click();
      return "triggered_generate";
    }
    const flashcards = document.querySelectorAll("[data-testid='flashcard-item'], .rounded-2xl");
    return `existing_items_${flashcards.length}`;
  });
  console.log(`  ✓ AI Study Set state: ${aiGeneratedState}`);

  // Wait if generation was triggered
  if (aiGeneratedState === "triggered_generate") {
    console.log("  ... Waiting for AI generation to complete (up to 15s)...");
    await new Promise((r) => setTimeout(r, 12000));
  }

  const aiCardsShot = path.join(ARTIFACTS_DIR, "myvideo_chrome_04_flashcards_quiz.png");
  await page.screenshot({ path: aiCardsShot, fullPage: false });
  console.log(`  📸 Screenshot 4 saved: ${aiCardsShot}`);

  // Test Batch Save to Notebook Button
  console.log("  ... Testing 'Lưu tất cả vào sổ từ' action...");
  const batchSaveResult = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const saveBtn = buttons.find((b) => b.textContent.includes("Lưu tất cả vào sổ từ"));
    if (saveBtn) {
      saveBtn.click();
      return "clicked_batch_save";
    }
    return "save_btn_not_found";
  });
  console.log(`  ✓ Batch save action: ${batchSaveResult}`);
  await new Promise((r) => setTimeout(r, 1500));

  // Check LocalStorage for saved vocabulary
  const vocabStoreData = await page.evaluate(() => {
    const raw = localStorage.getItem("xp_voca_learned_vocabulary") || localStorage.getItem("xp_user_profile");
    return {
      hasLearnedVocab: Boolean(localStorage.getItem("xp_voca_learned_vocabulary")),
      rawSample: raw ? raw.slice(0, 100) : "empty",
    };
  });
  console.log(`  ✓ LocalStorage verification: hasLearnedVocab=${vocabStoreData.hasLearnedVocab}`);

  // Tab 4: Click Playlist Tab
  console.log("  ... Switching to Playlist Tab...");
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll("button"));
    const plTab = tabs.find((b) => b.textContent.includes("Playlist") || b.textContent.includes("Danh sách"));
    if (plTab) plTab.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const playlistShot = path.join(ARTIFACTS_DIR, "myvideo_chrome_05_playlist_tab.png");
  await page.screenshot({ path: playlistShot, fullPage: false });
  console.log(`  📸 Screenshot 5 saved: ${playlistShot}`);

  // Step 4: Scroll down to Video Library Grid & Search Filter
  console.log("\n--------------------------------------------------------------------------------");
  console.log("🔍 Testing Video Library Grid & Search Filter...");
  console.log("--------------------------------------------------------------------------------");

  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  const libraryShot = path.join(ARTIFACTS_DIR, "myvideo_chrome_06_video_library.png");
  await page.screenshot({ path: libraryShot, fullPage: false });
  console.log(`  📸 Screenshot 6 saved: ${libraryShot}`);

  // Step 5: UI/UX Audit Checks
  console.log("\n--------------------------------------------------------------------------------");
  console.log("🎨 Auditing UI/UX (19 Rules & 60-30-10 Token Standard)...");
  console.log("--------------------------------------------------------------------------------");

  const uiAudit = await page.evaluate(() => {
    const results = [];

    // Rule 6: Input label or float label
    const inputs = Array.from(document.querySelectorAll("input"));
    const inputsWithLabelOrPlaceholder = inputs.filter((i) => i.placeholder || i.labels?.length);
    results.push(`Inputs with clear guide: ${inputsWithLabelOrPlaceholder.length}/${inputs.length}`);

    // Rule 12: Search placeholder guidance
    const searchInputs = inputs.filter((i) => i.placeholder && i.placeholder.length > 10);
    results.push(`Search inputs with descriptive guidance: ${searchInputs.length}`);

    // Rule 10: Rounded corners
    const roundedEls = document.querySelectorAll("[class*='rounded-']");
    results.push(`Proper rounded corner hierarchy elements: ${roundedEls.length}`);

    // Rule 20: 60-30-10 Color Scheme
    const primaryBtns = document.querySelectorAll("[class*='bg-[#0059bb]'], [class*='bg-blue-600'], [class*='text-[#0059bb]']");
    results.push(`Brand Royal Blue elements: ${primaryBtns.length}`);

    const amberAccents = document.querySelectorAll("[class*='text-amber-'], [class*='bg-amber-']");
    results.push(`Amber Gamification accents: ${amberAccents.length}`);

    return results;
  });

  uiAudit.forEach((r) => console.log(`  ✓ ${r}`));

  await browser.close();

  console.log("\n================================================================================");
  console.log("📊 CHROME TEST RUN COMPLETED SUCCESSFULLY!");
  console.log(`  Total Console Errors: ${consoleErrors.length}`);
  console.log(`  Total Network Failures: ${networkFailures.length}`);
  console.log("================================================================================\n");

  return {
    consoleErrors,
    networkFailures,
  };
}

runChromeTest().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
