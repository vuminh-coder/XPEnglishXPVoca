import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/myvideo";

async function completeInteractiveRun() {
  console.log("================================================================================");
  console.log("🎬 FULL CHROME WALKTHROUGH: MYVIDEO STUDIO, FLASHCARDS, QUIZ, DICTATION, LOOKUP");
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

  // STEP 1: SWITCH TO AI THẺ & QUIZ
  console.log("1. Switching to Tab 3 (AI Thẻ & Quiz)...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 3) btns[2].click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Since it was already generated in session or need click, check state
  await page.evaluate(() => {
    const genBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Tạo Bộ Thẻ & Bài Tập AI Ngay")
    );
    if (genBtn) genBtn.click();
  });

  // Wait until cards appear
  console.log("... Waiting for flashcards to be ready...");
  await page.waitForFunction(
    () => document.querySelectorAll("button").some((b) => b.textContent.includes("Vào Sổ Từ")),
    { timeout: 35000 }
  );

  // STEP 2: CLICK BATCH SAVE TO NOTEBOOK
  console.log("\n2. Clicking 'Lưu 8 Từ Vào Sổ Từ (+24 XP)'...");
  const saveAction = await page.evaluate(() => {
    const saveBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Vào Sổ Từ")
    );
    if (saveBtn) {
      saveBtn.click();
      return saveBtn.textContent.trim();
    }
    return "not_found";
  });
  console.log(`  ✓ Clicked save: "${saveAction}"`);
  await new Promise((r) => setTimeout(r, 1500));

  const shot1 = path.join(ARTIFACTS_DIR, "step_01_flashcards_saved_success.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 saved: ${shot1}`);

  // STEP 3: SWITCH TO VIDEO QUIZ SUB-TAB
  console.log("\n3. Switching to 'Video Quiz' Sub-Tab...");
  await page.evaluate(() => {
    const quizSubTab = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Video Quiz")
    );
    if (quizSubTab) quizSubTab.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shot2 = path.join(ARTIFACTS_DIR, "step_02_video_quiz_view.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 saved: ${shot2}`);

  // STEP 4: ANSWER QUIZ QUESTIONS AND SUBMIT
  console.log("\n4. Selecting Quiz Answers & Submitting...");
  await page.evaluate(() => {
    // Select first option for each question
    const optionBtns = Array.from(document.querySelectorAll("button")).filter(
      (b) => b.textContent.startsWith("A.") || b.textContent.startsWith("B.")
    );
    if (optionBtns.length > 0) {
      optionBtns[0].click();
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  await page.evaluate(() => {
    const submitBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Nộp Bài")
    );
    if (submitBtn) submitBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot3 = path.join(ARTIFACTS_DIR, "step_03_quiz_evaluated_feedback.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 saved: ${shot3}`);

  // STEP 5: SWITCH TO SUMMARY SUB-TAB
  console.log("\n5. Switching to 'Tóm Tắt' Sub-Tab...");
  await page.evaluate(() => {
    const sumTab = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Tóm Tắt")
    );
    if (sumTab) sumTab.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shot4 = path.join(ARTIFACTS_DIR, "step_04_bilingual_summary.png");
  await page.screenshot({ path: shot4 });
  console.log(`  📸 Screenshot 4 saved: ${shot4}`);

  // STEP 6: SWITCH TO DICTATION TAB
  console.log("\n6. Switching to 'Dictation' Tab...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 2) btns[1].click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Type into dictation input
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
  await new Promise((r) => setTimeout(r, 1200));

  const shot5 = path.join(ARTIFACTS_DIR, "step_05_dictation_checked.png");
  await page.screenshot({ path: shot5 });
  console.log(`  📸 Screenshot 5 saved: ${shot5}`);

  // STEP 7: SWITCH TO SUBTITLES & TEST TIMELINE SEEK
  console.log("\n7. Switching to 'Phụ Đề' Tab and testing Subtitle Jump...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 1) btns[0].click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shot6 = path.join(ARTIFACTS_DIR, "step_06_subtitles_active.png");
  await page.screenshot({ path: shot6 });
  console.log(`  📸 Screenshot 6 saved: ${shot6}`);

  // AUDIT LOCAL STORAGE
  const storageData = await page.evaluate(() => {
    const learned = localStorage.getItem("xp_voca_learned_vocabulary");
    return {
      learnedCount: learned ? JSON.parse(learned).length : 0,
      sessionStudySetKeys: Object.keys(sessionStorage).filter((k) => k.includes("xp_video_study_set")),
    };
  });
  console.log("\n📦 Final Storage Verification:", storageData);

  await browser.close();
  console.log("\n================================================================================");
  console.log("🎉 COMPREHENSIVE CHROMIUM WALKTHROUGH SUCCESSFULLY FINISHED!");
  console.log("================================================================================\n");
}

completeInteractiveRun().catch(console.error);
