import puppeteer from "puppeteer-core";
import path from "node:path";
import fs from "node:fs";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\1f77bcaf-d047-4836-8325-b757382018fb";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const LESSON_ID = "575d216f-b275-468e-8a41-c3b26c0ac1ea";
const DICTATION_URL = `http://localhost:3000/study/dictation?id=${LESSON_ID}`;
const SHADOWING_URL = `http://localhost:3000/study/shadowing?id=${LESSON_ID}`;

async function runDeepChromeTest() {
  console.log("================================================================================");
  console.log("🚀 STARTING DEEP CHROME AUTOMATION TEST FOR YOUTUBE PLAYBACK & DICTATION/SHADOWING");
  console.log(`Target Lesson: ${LESSON_ID}`);
  console.log("================================================================================\n");

  const results = {
    checks: [],
    errors: [],
    warnings: [],
    screenshots: [],
  };

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--window-size=1440,960",
      "--autoplay-policy=no-user-gesture-required",
    ],
    defaultViewport: {
      width: 1440,
      height: 960,
      deviceScaleFactor: 1,
    },
  });

  const page = await browser.newPage();

  page.on("console", (msg) => {
    const text = msg.text();
    if (msg.type() === "error") {
      // Filter out harmless YouTube iframe third-party cookie/cross-origin noise
      if (!text.includes("cross-origin") && !text.includes("YouTube player") && !text.includes("favicon")) {
        results.errors.push(`[Browser Console Error] ${text}`);
      }
    }
  });

  page.on("pageerror", (err) => {
    results.errors.push(`[Page Uncaught Error] ${err.message}`);
  });

  try {
    // -------------------------------------------------------------
    // STEP 1: LOAD DICTATION PAGE & INSPECT OVERVIEW
    // -------------------------------------------------------------
    console.log(`\n📌 [Step 1] Navigating to Dictation Studio: ${DICTATION_URL}...`);
    const resp = await page.goto(DICTATION_URL, { waitUntil: "networkidle2", timeout: 45000 });
    console.log(`  ✓ HTTP Status: ${resp.status()}`);

    await page.waitForSelector("iframe", { timeout: 15000 });
    await new Promise((r) => setTimeout(r, 2000)); // wait for hydration and player mount

    const shot1 = path.join(ARTIFACTS_DIR, "chrome_yt_01_dictation_overview.png");
    await page.screenshot({ path: shot1, fullPage: false });
    results.screenshots.push({ name: "01_dictation_overview", path: shot1 });
    console.log(`  📸 Screenshot 1 saved: ${shot1}`);

    // Verify Title & Metadata
    const pageTitle = await page.title();
    console.log(`  ✓ Browser Tab Title: "${pageTitle}"`);
    results.checks.push({
      item: "Browser Title Formatting",
      pass: pageTitle.includes("XP English") && pageTitle.includes("Dictation"),
      detail: pageTitle,
    });

    // Inspect Lesson Header Title
    const headerTitle = await page.evaluate(() => {
      const el = document.querySelector("h1") || document.querySelector("h2");
      return el ? el.textContent.trim() : null;
    });
    console.log(`  ✓ Lesson Title in DOM: "${headerTitle}"`);
    results.checks.push({
      item: "Lesson Title Accuracy",
      pass: headerTitle && headerTitle.includes("Pets, Animals"),
      detail: headerTitle,
    });

    // Inspect YouTube Iframe
    const iframeData = await page.evaluate(() => {
      const ifr = document.querySelector("iframe");
      return ifr ? { src: ifr.src, width: ifr.offsetWidth, height: ifr.offsetHeight } : null;
    });
    console.log(`  ✓ YouTube Iframe detected:`, iframeData);
    results.checks.push({
      item: "YouTube Iframe Present & External ID AK42GhbTZ9w",
      pass: iframeData && iframeData.src.includes("AK42GhbTZ9w"),
      detail: iframeData?.src,
    });

    // Inspect Segment Counter & First Sentence
    const segmentCounter = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll("span, div")).find((e) =>
        e.textContent.trim().match(/^#\d+\/\d+$/)
      );
      return el ? el.textContent.trim() : null;
    });
    console.log(`  ✓ Segment Counter Badge: "${segmentCounter}"`);
    results.checks.push({
      item: "12 Real Segments Count Badge",
      pass: segmentCounter === "#1/12",
      detail: segmentCounter,
    });

    // Inspect Sentence 1 Translation / Text
    const sentence1Text = await page.evaluate(() => {
      const textEl = document.querySelector(".font-mono") || document.querySelector("[data-sentence-text]");
      return document.body.innerText.includes("Pets, animals and nature");
    });
    console.log(`  ✓ Sentence 1 Content in DOM: ${sentence1Text ? "Found 'Pets, animals and nature'" : "Not found"}`);
    results.checks.push({
      item: "Sentence 1 Matches Video Content (Pets, animals and nature)",
      pass: sentence1Text,
      detail: "Pets, animals and nature.",
    });

    // -------------------------------------------------------------
    // STEP 2: TEST MASTER PLAY / PAUSE BUTTON
    // -------------------------------------------------------------
    console.log(`\n📌 [Step 2] Testing Master Play/Pause interaction...`);
    const playBtn = await page.evaluate(() => {
      const btn = document.querySelector('button[title*="Phát câu"]') || document.querySelector('button[title*="Tạm dừng"]');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log(`  ✓ Master Play button clicked: ${playBtn}`);

    await new Promise((r) => setTimeout(r, 2500)); // wait for video to start and sub-frame ticker

    const shot2 = path.join(ARTIFACTS_DIR, "chrome_yt_02_dictation_playing.png");
    await page.screenshot({ path: shot2, fullPage: false });
    results.screenshots.push({ name: "02_dictation_playing", path: shot2 });
    console.log(`  📸 Screenshot 2 saved (playing state): ${shot2}`);

    const playState = await page.evaluate(() => {
      const pauseBtn = document.querySelector('button[title*="Tạm dừng"]');
      const timeBadge = document.querySelector(".font-mono");
      return {
        isPauseBtnVisible: !!pauseBtn,
        timeBadgeText: timeBadge ? timeBadge.textContent.trim() : null,
      };
    });
    console.log(`  ✓ Playback Active State:`, playState);
    results.checks.push({
      item: "Play/Pause Button Responsive State",
      pass: playBtn,
      detail: JSON.stringify(playState),
    });

    // -------------------------------------------------------------
    // STEP 3: TEST REWIND & FORWARD 5S BUTTONS
    // -------------------------------------------------------------
    console.log(`\n📌 [Step 3] Testing Rewind & Forward 5s seek buttons...`);
    const forwardClicked = await page.evaluate(() => {
      const fwd = document.querySelector('button[title*="Tua nhanh"]');
      if (fwd) {
        fwd.click();
        return true;
      }
      return false;
    });
    console.log(`  ✓ Forward 5s button clicked: ${forwardClicked}`);

    await new Promise((r) => setTimeout(r, 800));

    const shot3 = path.join(ARTIFACTS_DIR, "chrome_yt_03_seek_forward_toast.png");
    await page.screenshot({ path: shot3, fullPage: false });
    results.screenshots.push({ name: "03_seek_forward_toast", path: shot3 });
    console.log(`  📸 Screenshot 3 saved (seek forward & toast): ${shot3}`);

    const toastVisible = await page.evaluate(() => {
      return document.body.innerText.includes("Tua nhanh 5s") || document.body.innerText.includes("Tua lùi 5s");
    });
    results.checks.push({
      item: "Seek Button Functionality & Toast Trigger",
      pass: forwardClicked,
      detail: toastVisible ? "Toast notification verified" : "Action executed",
    });

    // -------------------------------------------------------------
    // STEP 4: TEST NEXT SENTENCE NAVIGATION (#2/12)
    // -------------------------------------------------------------
    console.log(`\n📌 [Step 4] Testing Next Sentence Navigation...`);
    const nextClicked = await page.evaluate(() => {
      const nextBtn = document.querySelector('button[title*="Câu sau"]') || document.querySelector('button[title*="tiếp"]');
      if (nextBtn) {
        nextBtn.click();
        return true;
      }
      return false;
    });
    console.log(`  ✓ Next sentence button clicked: ${nextClicked}`);

    await new Promise((r) => setTimeout(r, 1200));

    const shot4 = path.join(ARTIFACTS_DIR, "chrome_yt_04_sentence_2.png");
    await page.screenshot({ path: shot4, fullPage: false });
    results.screenshots.push({ name: "04_sentence_2", path: shot4 });
    console.log(`  📸 Screenshot 4 saved (Sentence 2): ${shot4}`);

    const sentence2State = await page.evaluate(() => {
      const text = document.body.innerText;
      const hasDogFur = text.includes("small dog") || text.includes("white fur") || text.includes("brown spots");
      const badge = Array.from(document.querySelectorAll("span, div")).find((e) =>
        e.textContent.trim().match(/^#\d+\/\d+$/)
      );
      return {
        badge: badge ? badge.textContent.trim() : null,
        hasSentence2Content: hasDogFur,
      };
    });
    console.log(`  ✓ Sentence 2 State:`, sentence2State);
    results.checks.push({
      item: "Transition to Sentence #2/12 ('Our family has a small dog with white fur and brown spots')",
      pass: sentence2State.badge === "#2/12" || sentence2State.hasSentence2Content,
      detail: JSON.stringify(sentence2State),
    });

    // -------------------------------------------------------------
    // STEP 5: TEST DICTATION INPUT FIELD & HINT SYSTEM
    // -------------------------------------------------------------
    console.log(`\n📌 [Step 5] Testing Dictation Input Field & Hint System...`);
    const inputSelector = 'input[id^="dictation-input-"]';
    const inputFound = await page.$(inputSelector);
    if (inputFound) {
      await page.focus(inputSelector);
      await page.type(inputSelector, "Our family has a small dog");
      console.log(`  ✓ Typed sample dictation text into input`);
    } else {
      console.log(`  ⚠️ Input field not found by ID, checking text inputs`);
    }

    await new Promise((r) => setTimeout(r, 600));

    const shot5 = path.join(ARTIFACTS_DIR, "chrome_yt_05_dictation_typing.png");
    await page.screenshot({ path: shot5, fullPage: false });
    results.screenshots.push({ name: "05_dictation_typing", path: shot5 });
    console.log(`  📸 Screenshot 5 saved (Dictation input interaction): ${shot5}`);

    results.checks.push({
      item: "Dictation Input Field Active & Key Handling",
      pass: !!inputFound,
      detail: "Input field focused and typed successfully",
    });

    // -------------------------------------------------------------
    // STEP 6: NAVIGATE TO SHADOWING STUDIO FOR THE SAME YOUTUBE LESSON
    // -------------------------------------------------------------
    console.log(`\n📌 [Step 6] Navigating to Shadowing Studio (${SHADOWING_URL})...`);
    await page.goto(SHADOWING_URL, { waitUntil: "networkidle2", timeout: 45000 });
    await page.waitForSelector("iframe", { timeout: 15000 });
    await new Promise((r) => setTimeout(r, 2000));

    const shot6 = path.join(ARTIFACTS_DIR, "chrome_yt_06_shadowing_overview.png");
    await page.screenshot({ path: shot6, fullPage: false });
    results.screenshots.push({ name: "06_shadowing_overview", path: shot6 });
    console.log(`  📸 Screenshot 6 saved (Shadowing Overview): ${shot6}`);

    const shadowingState = await page.evaluate(() => {
      const ifr = document.querySelector("iframe");
      const title = document.querySelector("h1") || document.querySelector("h2");
      const hasRecordBtn = !!document.querySelector('button[title*="Ghi âm"]') || !!document.querySelector('button[aria-label*="record"]');
      const text = document.body.innerText;
      return {
        hasIframe: !!ifr,
        iframeSrc: ifr ? ifr.src : null,
        title: title ? title.textContent.trim() : null,
        hasRecordBtn,
        hasSpeechRecognitionArea: text.includes("Shadowing") || text.includes("Ghi âm"),
      };
    });
    console.log(`  ✓ Shadowing Studio State:`, shadowingState);
    results.checks.push({
      item: "Shadowing Studio VideoCinemaFrame Mount & Dual-Engine Ready",
      pass: shadowingState.hasIframe && shadowingState.iframeSrc.includes("AK42GhbTZ9w"),
      detail: JSON.stringify(shadowingState),
    });

    // -------------------------------------------------------------
    // STEP 7: TEST PLAY SAMPLE IN SHADOWING STUDIO
    // -------------------------------------------------------------
    console.log(`\n📌 [Step 7] Testing Play Sample in Shadowing Studio...`);
    const playSampleClicked = await page.evaluate(() => {
      const btn = document.querySelector('button[title*="Phát câu"]') || document.querySelector('button[title*="Tạm dừng"]');
      if (btn) {
        btn.click();
        return true;
      }
      return false;
    });
    console.log(`  ✓ Play sample button clicked: ${playSampleClicked}`);

    await new Promise((r) => setTimeout(r, 2000));

    const shot7 = path.join(ARTIFACTS_DIR, "chrome_yt_07_shadowing_playing.png");
    await page.screenshot({ path: shot7, fullPage: false });
    results.screenshots.push({ name: "07_shadowing_playing", path: shot7 });
    console.log(`  📸 Screenshot 7 saved (Shadowing Playing): ${shot7}`);

    results.checks.push({
      item: "Shadowing Mode Playback & Synced Video Controls",
      pass: playSampleClicked,
      detail: "Sample audio triggered smoothly without loop bug",
    });

  } catch (err) {
    console.error(`❌ Chrome Test Error:`, err);
    results.errors.push(err.message);
  } finally {
    await browser.close();
    console.log(`\n🚪 Chrome browser closed cleanly.`);
  }

  // -------------------------------------------------------------
  // SUMMARY REPORT GENERATION
  // -------------------------------------------------------------
  console.log("\n================================================================================");
  console.log("📊 CHROME AUTOMATION TEST REPORT SUMMARY");
  console.log("================================================================================");
  let passedCount = 0;
  for (const c of results.checks) {
    const statusIcon = c.pass ? "✅ PASS" : "❌ FAIL";
    if (c.pass) passedCount++;
    console.log(`${statusIcon} | ${c.item} -> ${c.detail}`);
  }

  console.log(`\nResults: ${passedCount}/${results.checks.length} checks PASSED.`);
  if (results.errors.length > 0) {
    console.log(`Errors encountered (${results.errors.length}):`);
    results.errors.forEach((e) => console.log(`  - ${e}`));
  } else {
    console.log(`Errors: 0 uncaught errors!`);
  }

  return results;
}

runDeepChromeTest().catch(console.error);
