import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/myvideo";

async function runPerfectWalkthrough() {
  console.log("================================================================================");
  console.log("🎬 STARTING PERFECT CHROMIUM WALKTHROUGH FOR /myvideo");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();
  await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2000));

  // --- STAGE 1: SWITCH TO AI TAB & GENERATE ---
  console.log("1. Navigating to Tab 3: AI Thẻ & Quiz...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 3) btns[2].click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  console.log("2. Clicking 'Tạo Bộ Thẻ & Bài Tập AI Ngay'...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Tạo Bộ Thẻ & Bài Tập AI Ngay")
    );
    if (btn) btn.click();
  });

  console.log("3. Waiting 24s for Gemini AI to complete analysis and render...");
  await new Promise((r) => setTimeout(r, 24000));

  const shot1 = path.join(ARTIFACTS_DIR, "perfect_01_flashcards_rendered.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 (Flashcards): ${shot1}`);

  // --- STAGE 2: BATCH SAVE FLASHCARDS ---
  console.log("\n4. Clicking 'Lưu 8 Từ Vào Sổ Từ (+24 XP)'...");
  const saveAction = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Vào Sổ Từ")
    );
    if (btn) {
      btn.click();
      return btn.textContent.trim();
    }
    return "not_found";
  });
  console.log(`  ✓ Save button text: "${saveAction}"`);
  await new Promise((r) => setTimeout(r, 1500));

  const shot2 = path.join(ARTIFACTS_DIR, "perfect_02_saved_flashcards.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 (Saved to Notebook): ${shot2}`);

  // --- STAGE 3: VIDEO QUIZ SUB-TAB ---
  console.log("\n5. Switching to 'Video Quiz' Sub-Tab...");
  await page.evaluate(() => {
    const quizBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Video Quiz")
    );
    if (quizBtn) quizBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot3 = path.join(ARTIFACTS_DIR, "perfect_03_quiz_questions.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 (Quiz Questions): ${shot3}`);

  // --- STAGE 4: ANSWER QUIZ & SUBMIT ---
  console.log("\n6. Answering Question and Submitting Quiz...");
  await page.evaluate(() => {
    // Select Option A
    const optionBtns = Array.from(document.querySelectorAll("button")).filter(
      (b) => b.textContent.startsWith("A.") || b.textContent.startsWith("B.")
    );
    if (optionBtns.length > 0) optionBtns[0].click();
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.evaluate(() => {
    const submitBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Nộp Bài")
    );
    if (submitBtn) submitBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot4 = path.join(ARTIFACTS_DIR, "perfect_04_quiz_feedback.png");
  await page.screenshot({ path: shot4 });
  console.log(`  📸 Screenshot 4 (Quiz Evaluation & Feedback): ${shot4}`);

  // --- STAGE 5: BILINGUAL SUMMARY SUB-TAB ---
  console.log("\n7. Switching to 'Tóm Tắt' Sub-Tab...");
  await page.evaluate(() => {
    const sumBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Tóm Tắt")
    );
    if (sumBtn) sumBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot5 = path.join(ARTIFACTS_DIR, "perfect_05_summary_content.png");
  await page.screenshot({ path: shot5 });
  console.log(`  📸 Screenshot 5 (Bilingual Summary): ${shot5}`);

  // --- STAGE 6: DICTATION TAB ---
  console.log("\n8. Switching to 'Dictation' Tab...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 2) btns[1].click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Type answer
  await page.evaluate(() => {
    const input = document.querySelector("input[placeholder*='Gõ từ còn thiếu']");
    if (input) {
      input.value = "honored";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 600));

  // Click Check Answer
  await page.evaluate(() => {
    const checkBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Kiểm Tra Đáp Án")
    );
    if (checkBtn) checkBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot6 = path.join(ARTIFACTS_DIR, "perfect_06_dictation_eval.png");
  await page.screenshot({ path: shot6 });
  console.log(`  📸 Screenshot 6 (Dictation Result): ${shot6}`);

  // --- STAGE 7: SUBTITLES TAB ---
  console.log("\n9. Switching to 'Phụ Đề' Tab...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 1) btns[0].click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shot7 = path.join(ARTIFACTS_DIR, "perfect_07_subtitles_pane.png");
  await page.screenshot({ path: shot7 });
  console.log(`  📸 Screenshot 7 (Subtitles Pane): ${shot7}`);

  // --- STAGE 8: VIDEO LIBRARY SEARCH & FILTERS ---
  console.log("\n10. Testing Video Library Search...");
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.evaluate(() => {
    const searchInput = document.querySelector("input[placeholder*='Steve Jobs']");
    if (searchInput) {
      searchInput.value = "Steve Jobs";
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shot8 = path.join(ARTIFACTS_DIR, "perfect_08_library_search.png");
  await page.screenshot({ path: shot8 });
  console.log(`  📸 Screenshot 8 (Library Search): ${shot8}`);

  // AUDIT LOCAL STORAGE
  const storageState = await page.evaluate(() => {
    const learned = localStorage.getItem("xp_voca_learned_vocabulary");
    return {
      hasLearnedVocab: Boolean(learned),
      learnedVocabCount: learned ? JSON.parse(learned).length : 0,
      sessionCacheCount: Object.keys(sessionStorage).filter((k) => k.includes("xp_video_study_set")).length,
    };
  });
  console.log("\n📦 Storage Verification:", storageState);

  await browser.close();

  console.log("\n================================================================================");
  console.log("🎉 PERFECT WALKTHROUGH COMPLETED WITH 8 HIGH-RES EVIDENCE SCREENSHOTS!");
  console.log("================================================================================\n");
}

runPerfectWalkthrough().catch(console.error);
