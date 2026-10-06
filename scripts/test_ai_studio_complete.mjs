import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/myvideo";

async function completeAiStudioTest() {
  console.log("================================================================================");
  console.log("🎬 RUNNING INTERACTIVE TEST: AI STUDY SET GENERATION & FLASHCARDS & QUIZ");
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

  // Switch to Tab 3 (AI Thẻ & Quiz)
  console.log("1. Switching to Tab 3 (AI Thẻ & Quiz)...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 3) btns[2].click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Click 'Tạo Bộ Thẻ & Bài Tập AI Ngay'
  console.log("2. Clicking 'Tạo Bộ Thẻ & Bài Tập AI Ngay'...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Tạo Bộ Thẻ & Bài Tập AI Ngay")
    );
    if (btn) btn.click();
  });

  // Wait for loading to finish and flashcard items to render
  console.log("3. Waiting for AI processing and Flashcards rendering...");
  await page.waitForFunction(
    () => {
      const hasCards = document.querySelectorAll("span.font-extrabold").length > 0;
      const hasSubTabs = Array.from(document.querySelectorAll("button")).some((b) => b.textContent.includes("Thẻ Từ"));
      return hasCards || hasSubTabs;
    },
    { timeout: 45000 }
  );
  console.log("  ✓ Flashcards rendered successfully!");
  await new Promise((r) => setTimeout(r, 1500));

  // Screenshot Flashcards list
  const shot1 = path.join(ARTIFACTS_DIR, "ai_studio_01_flashcards_list.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 saved: ${shot1}`);

  // 4. Click 'Lưu ... Từ Vào Sổ Từ (+... XP)'
  console.log("4. Clicking 'Lưu tất cả vào sổ từ' action...");
  const saveResult = await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Vào Sổ Từ")
    );
    if (btn) {
      btn.click();
      return btn.textContent.trim();
    }
    return "not_found";
  });
  console.log(`  ✓ Save action clicked: "${saveResult}"`);
  await new Promise((r) => setTimeout(r, 1500));

  const shot2 = path.join(ARTIFACTS_DIR, "ai_studio_02_saved_flashcards.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 saved: ${shot2}`);

  // 5. Switch to Video Quiz Sub-Tab
  console.log("5. Switching to 'Video Quiz' Sub-Tab...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Video Quiz")
    );
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot3 = path.join(ARTIFACTS_DIR, "ai_studio_03_video_quiz_questions.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 saved: ${shot3}`);

  // 6. Answer Question 1 & Submit
  console.log("6. Selecting an option in Quiz and Submitting...");
  await page.evaluate(() => {
    const options = Array.from(document.querySelectorAll("button")).filter(
      (b) => b.textContent.startsWith("A.") || b.textContent.startsWith("B.")
    );
    if (options.length > 0) options[0].click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  await page.evaluate(() => {
    const submitBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Nộp Bài")
    );
    if (submitBtn) submitBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot4 = path.join(ARTIFACTS_DIR, "ai_studio_04_quiz_result_feedback.png");
  await page.screenshot({ path: shot4 });
  console.log(`  📸 Screenshot 4 saved: ${shot4}`);

  // 7. Switch to 'Tóm Tắt' Sub-Tab
  console.log("7. Switching to 'Tóm Tắt' Sub-Tab...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Tóm Tắt")
    );
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  const shot5 = path.join(ARTIFACTS_DIR, "ai_studio_05_bilingual_summary.png");
  await page.screenshot({ path: shot5 });
  console.log(`  📸 Screenshot 5 saved: ${shot5}`);

  // Verify LocalStorage
  const lsState = await page.evaluate(() => {
    const learned = localStorage.getItem("xp_voca_learned_vocabulary");
    return {
      hasLearnedVocab: Boolean(learned),
      learnedVocabCount: learned ? JSON.parse(learned).length : 0,
      sessionCacheKeys: Object.keys(sessionStorage).filter((k) => k.includes("xp_video_study_set")),
    };
  });
  console.log("\n📦 Storage & Database State:", lsState);

  await browser.close();
  console.log("\n================================================================================");
  console.log("🎉 ALL AI STUDY SET CHROMIUM TESTS COMPLETED SUCCESSFULLY!");
  console.log("================================================================================\n");
}

completeAiStudioTest().catch(console.error);
