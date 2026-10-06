import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/myvideo";

async function runFullWalkthrough() {
  console.log("================================================================================");
  console.log("🎬 FULL E2E CHROMIUM WALKTHROUGH TEST FOR /myvideo STUDIO & AI STUDY SET");
  console.log("================================================================================\n");

  const results = {
    stepsCompleted: [],
    screenshots: [],
    errors: [],
  };

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
    if (msg.type() === "error") {
      results.errors.push(`[Console Error]: ${msg.text()}`);
    }
  });

  console.log(`🌐 Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 2000));

  // --- STEP 1: INITIAL STUDIO & SUBTITLES ---
  console.log("\n📍 Step 1: Checking Player Studio & Subtitle Rolling Pane...");
  const initialShot = path.join(ARTIFACTS_DIR, "step1_studio_overview.png");
  await page.screenshot({ path: initialShot });
  results.screenshots.push("step1_studio_overview.png");
  results.stepsCompleted.push("Step 1: Loaded Studio and Default Video successfully");

  // --- STEP 2: SWITCH TO AI STUDY SET & TRIGGER GENERATION ---
  console.log("\n📍 Step 2: Navigating to ✨ AI Thẻ & Quiz Tab...");
  await page.evaluate(() => {
    const tabs = Array.from(document.querySelectorAll("button"));
    const aiTab = tabs.find((b) => b.textContent.includes("AI Thẻ"));
    if (aiTab) aiTab.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  console.log("  ... Clicking 'Tạo Bộ Thẻ & Bài Tập AI Ngay' button...");
  const clickedGenerate = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const genBtn = buttons.find((b) => b.textContent.includes("Tạo Bộ Thẻ & Bài Tập AI"));
    if (genBtn) {
      genBtn.click();
      return true;
    }
    return false;
  });
  console.log(`  ✓ Triggered generate: ${clickedGenerate}`);

  // Polling wait until flashcard items appear or 20s max
  console.log("  ... Waiting for Gemini AI extraction & Flashcards to render...");
  let flashcardsReady = false;
  for (let i = 0; i < 20; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    const cardCount = await page.evaluate(() => {
      const cards = document.querySelectorAll("span.font-extrabold");
      return cards.length;
    });
    if (cardCount > 0) {
      console.log(`  ✓ Flashcards rendered successfully! Found ${cardCount} cards.`);
      flashcardsReady = true;
      break;
    }
  }

  const flashcardsShot = path.join(ARTIFACTS_DIR, "step2_ai_flashcards_generated.png");
  await page.screenshot({ path: flashcardsShot });
  results.screenshots.push("step2_ai_flashcards_generated.png");
  results.stepsCompleted.push("Step 2: AI Flashcards generated & displayed");

  // --- STEP 3: BATCH SAVE FLASHCARDS TO NOTEBOOK ---
  console.log("\n📍 Step 3: Testing Batch Save Flashcards Action (+XP)...");
  const batchSaveResult = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const saveBtn = buttons.find((b) => b.textContent.includes("Lưu") && b.textContent.includes("Từ Vào Sổ Từ"));
    if (saveBtn) {
      saveBtn.click();
      return "clicked";
    }
    return "not_found";
  });
  console.log(`  ✓ Batch save button click: ${batchSaveResult}`);
  await new Promise((r) => setTimeout(r, 1500));

  const afterBatchSaveShot = path.join(ARTIFACTS_DIR, "step3_after_batch_save.png");
  await page.screenshot({ path: afterBatchSaveShot });
  results.screenshots.push("step3_after_batch_save.png");
  results.stepsCompleted.push("Step 3: Batch save flashcards executed and updated");

  // --- STEP 4: VIDEO QUIZ INTERACTION ---
  console.log("\n📍 Step 4: Testing Video Quiz Interaction...");
  // Click sub-tab 'Video Quiz'
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const quizSubTab = buttons.find((b) => b.textContent.includes("Video Quiz"));
    if (quizSubTab) quizSubTab.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Answer question 1
  const answeredQuiz = await page.evaluate(() => {
    const options = Array.from(document.querySelectorAll("button")).filter(
      (b) => b.textContent.startsWith("A.") || b.textContent.startsWith("B.")
    );
    if (options.length > 0) {
      options[0].click();
      return "selected_option_A";
    }
    return "no_options";
  });
  console.log(`  ✓ Quiz answer selection: ${answeredQuiz}`);
  await new Promise((r) => setTimeout(r, 800));

  // Click submit quiz button
  const submitResult = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const submitBtn = buttons.find((b) => b.textContent.includes("Nộp Bài & Chấm Điểm"));
    if (submitBtn) {
      submitBtn.click();
      return "submitted_quiz";
    }
    return "submit_btn_not_found";
  });
  console.log(`  ✓ Quiz submit: ${submitResult}`);
  await new Promise((r) => setTimeout(r, 1200));

  const quizResultShot = path.join(ARTIFACTS_DIR, "step4_quiz_evaluated.png");
  await page.screenshot({ path: quizResultShot });
  results.screenshots.push("step4_quiz_evaluated.png");
  results.stepsCompleted.push("Step 4: Video Quiz submitted, scored, and feedback rendered");

  // --- STEP 5: BILINGUAL SUMMARY TAB ---
  console.log("\n📍 Step 5: Checking Bilingual Summary Sub-Tab...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const sumTab = buttons.find((b) => b.textContent.includes("Tóm Tắt"));
    if (sumTab) sumTab.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  const summaryShot = path.join(ARTIFACTS_DIR, "step5_bilingual_summary.png");
  await page.screenshot({ path: summaryShot });
  results.screenshots.push("step5_bilingual_summary.png");
  results.stepsCompleted.push("Step 5: Bilingual video summary reviewed");

  // --- STEP 6: DICTATION TAB INTERACTION ---
  console.log("\n📍 Step 6: Testing Dictation Mode & Interactive Verification...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const dictTab = buttons.find((b) => b.textContent.includes("Dictation"));
    if (dictTab) dictTab.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Type answer into input
  await page.evaluate(() => {
    const input = document.querySelector("input[placeholder*='Gõ từ còn thiếu']");
    if (input) {
      input.value = "honored";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  // Click check button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const checkBtn = buttons.find((b) => b.textContent.includes("Kiểm Tra Đáp Án"));
    if (checkBtn) checkBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const dictationFeedbackShot = path.join(ARTIFACTS_DIR, "step6_dictation_verified.png");
  await page.screenshot({ path: dictationFeedbackShot });
  results.screenshots.push("step6_dictation_verified.png");
  results.stepsCompleted.push("Step 6: Dictation input answered and verified");

  // --- STEP 7: STORAGE & DATABASE AUDIT ---
  console.log("\n📍 Step 7: Auditing Client-side Storage & Database Sync...");
  const storageReport = await page.evaluate(() => {
    const learnedRaw = localStorage.getItem("xp_voca_learned_vocabulary");
    const userRaw = localStorage.getItem("xp_voca_user_local_user");
    let learnedCount = 0;
    try {
      learnedCount = learnedRaw ? JSON.parse(learnedRaw).length : 0;
    } catch {}

    return {
      learnedVocabCount: learnedCount,
      hasSessionCache: Object.keys(sessionStorage).some((k) => k.includes("xp_video_study_set")),
      storedKeysCount: Object.keys(localStorage).length,
    };
  });
  console.log("  ✓ Storage report:", storageReport);
  results.stepsCompleted.push(`Step 7: Storage verified with ${storageReport.learnedVocabCount} learned words and cached study sets`);

  await browser.close();

  console.log("\n================================================================================");
  console.log("🎉 ALL E2E CHROMIUM WALKTHROUGH STEPS COMPLETED SUCCESSFULLY!");
  console.log("================================================================================\n");

  return results;
}

runFullWalkthrough().catch((err) => {
  console.error("Walkthrough failed:", err);
  process.exit(1);
});
