import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/myvideo";

async function deepInteractionTest() {
  console.log("================================================================================");
  console.log("🎬 DEEP CHROME INTERACTION TEST: /myvideo (STUDIO, AI STUDY SET, QUIZ, LOOKUP)");
  console.log("================================================================================\n");

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

  console.log(`🌐 Navigating to ${BASE_URL}...`);
  await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 45000 });
  await new Promise((r) => setTimeout(r, 2000));

  // 1. CLICK WORD TO LOOK UP
  console.log("\n🔤 Step 1: Testing Word Lookup Interaction on Subtitle sentence...");
  const lookupSuccess = await page.evaluate(() => {
    // Find words in subtitle
    const spans = Array.from(document.querySelectorAll("span, button"));
    const wordSpan = spans.find((s) => s.textContent.trim() === "honored" || s.textContent.trim() === "commencement");
    if (wordSpan) {
      wordSpan.click();
      return `clicked_word_${wordSpan.textContent.trim()}`;
    }
    return "word_not_found";
  });
  console.log(`  ✓ Word click status: ${lookupSuccess}`);
  await new Promise((r) => setTimeout(r, 1200));

  const wordLookupShot = path.join(ARTIFACTS_DIR, "myvideo_interactive_01_word_lookup.png");
  await page.screenshot({ path: wordLookupShot });
  console.log(`  📸 Screenshot saved: ${wordLookupShot}`);

  // 2. SWITCH TO DICTATION TAB AND TYPE
  console.log("\n🎧 Step 2: Testing Dictation Tab & User Input...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const dictTab = buttons.find((b) => b.textContent.includes("Dictation"));
    if (dictTab) dictTab.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Type something into dictation input
  const typedDictation = await page.evaluate(() => {
    const input = document.querySelector("input[placeholder*='nghe'], input[placeholder*='Gõ'], input[type='text']");
    if (input) {
      input.value = "I am honored to be with you";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      return "typed_answer";
    }
    return "input_not_found";
  });
  console.log(`  ✓ Dictation input status: ${typedDictation}`);
  await new Promise((r) => setTimeout(r, 1000));

  const dictationShot = path.join(ARTIFACTS_DIR, "myvideo_interactive_02_dictation_input.png");
  await page.screenshot({ path: dictationShot });
  console.log(`  📸 Screenshot saved: ${dictationShot}`);

  // 3. SWITCH TO ✨ AI THẺ & QUIZ TAB
  console.log("\n✨ Step 3: Testing AI Study Set Generation & Interactions...");
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const aiTab = buttons.find((b) => b.textContent.includes("AI Thẻ"));
    if (aiTab) aiTab.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Click Generate AI Study Set if available
  const genAction = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const genBtn = buttons.find((b) => b.textContent.includes("Tạo Bộ Thẻ & Bài Tập AI"));
    if (genBtn) {
      genBtn.click();
      return "clicked_generate";
    }
    return "already_generated_or_generating";
  });
  console.log(`  ✓ AI Study Set generation action: ${genAction}`);

  if (genAction === "clicked_generate") {
    console.log("  ... Waiting 12s for Gemini AI to extract flashcards and generate quizzes...");
    await new Promise((r) => setTimeout(r, 12000));
  } else {
    await new Promise((r) => setTimeout(r, 2000));
  }

  const aiStudySetShot = path.join(ARTIFACTS_DIR, "myvideo_interactive_03_studyset_content.png");
  await page.screenshot({ path: aiStudySetShot });
  console.log(`  📸 Screenshot saved: ${aiStudySetShot}`);

  // 4. TEST BATCH SAVE FLASHCARDS ACTION
  console.log("\n💾 Step 4: Testing 'Lưu tất cả vào sổ từ' Action & Local Storage...");
  const batchSaveResult = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll("button"));
    const saveBtn = buttons.find((b) => b.textContent.includes("Lưu tất cả vào sổ từ"));
    if (saveBtn) {
      saveBtn.click();
      return "clicked_batch_save_button";
    }
    return "save_btn_not_present";
  });
  console.log(`  ✓ Batch save click: ${batchSaveResult}`);
  await new Promise((r) => setTimeout(r, 1500));

  const afterSaveShot = path.join(ARTIFACTS_DIR, "myvideo_interactive_04_after_save.png");
  await page.screenshot({ path: afterSaveShot });
  console.log(`  📸 Screenshot saved: ${afterSaveShot}`);

  // 5. TEST VIDEO QUIZ INTERACTION
  console.log("\n📝 Step 5: Testing Video Quiz Option Click & Explanation Feedback...");
  const quizAnswerResult = await page.evaluate(() => {
    // Find quiz option button (A, B, C, D)
    const optionBtns = Array.from(document.querySelectorAll("button")).filter(
      (b) => b.textContent.startsWith("A.") || b.textContent.startsWith("B.") || b.textContent.startsWith("C.") || b.textContent.startsWith("D.")
    );
    if (optionBtns.length > 0) {
      optionBtns[0].click();
      return `clicked_quiz_option_${optionBtns[0].textContent.slice(0, 15)}`;
    }
    return "no_quiz_options_found";
  });
  console.log(`  ✓ Quiz answer click: ${quizAnswerResult}`);
  await new Promise((r) => setTimeout(r, 1500));

  const quizFeedbackShot = path.join(ARTIFACTS_DIR, "myvideo_interactive_05_quiz_feedback.png");
  await page.screenshot({ path: quizFeedbackShot });
  console.log(`  📸 Screenshot saved: ${quizFeedbackShot}`);

  // 6. TEST VIDEO SEARCH & CATEGORY FILTER
  console.log("\n🔎 Step 6: Testing Video Search & Topic Filtering in Library...");
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  });
  await new Promise((r) => setTimeout(r, 1000));

  const searchAction = await page.evaluate(() => {
    const searchInput = document.querySelector("input[placeholder*='tiêu đề'], input[placeholder*='Steve Jobs']");
    if (searchInput) {
      searchInput.value = "Steve Jobs";
      searchInput.dispatchEvent(new Event("input", { bubbles: true }));
      return "searched_steve_jobs";
    }
    return "search_input_not_found";
  });
  console.log(`  ✓ Search action: ${searchAction}`);
  await new Promise((r) => setTimeout(r, 1200));

  const searchShot = path.join(ARTIFACTS_DIR, "myvideo_interactive_06_search_results.png");
  await page.screenshot({ path: searchShot });
  console.log(`  📸 Screenshot saved: ${searchShot}`);

  // Check Storage Data
  const storageState = await page.evaluate(() => {
    return {
      vocabKey: localStorage.getItem("xp_voca_learned_vocabulary") ? "present" : "empty",
      profileKey: localStorage.getItem("xp_user_profile") ? "present" : "empty",
      studySessionKeys: Object.keys(localStorage).filter((k) => k.includes("xp")),
    };
  });
  console.log("\n📦 Storage & Database State:", storageState);

  await browser.close();
  console.log("\n================================================================================");
  console.log("🎉 ALL DEEP INTERACTION TESTS COMPLETED!");
  console.log("================================================================================\n");
}

deepInteractionTest().catch((err) => {
  console.error("Deep test failed:", err);
  process.exit(1);
});
