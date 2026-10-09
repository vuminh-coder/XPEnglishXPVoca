import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

interface TestReport {
  name: string;
  url: string;
  passed: boolean;
  errors: string[];
  consoleErrors: string[];
  details: any;
}

async function runChromeE2ETest() {
  console.log("🚀 Starting Chrome Deep E2E Tests with Google Chrome across 6 Core Scenarios...\n");
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-web-security",
      "--window-size=1440,900",
    ],
  });

  const reports: TestReport[] = [];
  const artifactsDir = path.join(process.cwd(), "public", "test-artifacts");
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  try {
    // ==========================================
    // TEST 1: Dictation Audio Studio (id=51)
    // ==========================================
    {
      const testName = "Dictation Audio Studio (id=51)";
      const targetUrl = `${BASE_URL}/study/dictation/audio?id=51`;
      console.log(`▶ [TEST 1] Testing ${targetUrl}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err: any) => pageErrors.push(err?.message || String(err)));

      let passed = true;
      const details: any = {};

      try {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 35000 });
        const inputElement = await page.waitForSelector(
          "input[placeholder*='Điền câu'], input[placeholder*='nghe'], input[type='text']",
          { timeout: 15000 }
        );
        if (!inputElement) throw new Error("Cannot find dictation input field!");
        await new Promise((r) => setTimeout(r, 1000));

        // 1. Title
        const titleText = await page.evaluate(() => {
          const h = document.querySelector("h1, h2, .font-display, [data-testid='lesson-title']");
          return h ? h.textContent?.trim() : document.title;
        });
        details.titleText = titleText;
        console.log(`  - Page Title: "${titleText}"`);

        // 2. Tokens
        const initialTokensCount = await page.evaluate(() => {
          return document.querySelectorAll("[data-token-clean], .select-none button, .font-mono").length;
        });
        details.initialTokensCount = initialTokensCount;
        console.log(`  - Token elements count: ${initialTokensCount}`);

        // 3. Typing
        await inputElement.focus();
        await page.keyboard.type("Welcome ");
        await new Promise((r) => setTimeout(r, 500));

        const matchedCount = await page.evaluate(() => {
          return document.querySelectorAll(".text-emerald-700, .bg-emerald-50, .border-emerald-300, .border-emerald-500").length;
        });
        details.matchedCount = matchedCount;
        console.log(`  - Typed 'Welcome ', matched tokens: ${matchedCount}`);

        // 4. Xem chữ đầu (Alt+H)
        const hintBtn = await page.evaluateHandle(() => {
          const btns = Array.from(document.querySelectorAll("button"));
          return btns.find((b) => (b.textContent || "").includes("Xem chữ") || (b.title || "").includes("Alt+H"));
        });
        if (hintBtn && (await hintBtn.asElement())) {
          await (hintBtn.asElement() as any)?.click();
          await new Promise((r) => setTimeout(r, 500));
          const firstLetterTokens = await page.evaluate(() => {
            return document.querySelectorAll(".text-amber-700, .border-amber-400, .border-amber-500, .bg-amber-50").length;
          });
          details.firstLetterTokens = firstLetterTokens;
          console.log(`  - Tokens with first letter revealed: ${firstLetterTokens}`);
        }

        // 5. Xem từ (Alt+R)
        const revealBtn = await page.evaluateHandle(() => {
          const btns = Array.from(document.querySelectorAll("button"));
          return btns.find((b) => (b.textContent || "").includes("Xem từ") || (b.title || "").includes("Alt+R"));
        });
        if (revealBtn && (await revealBtn.asElement())) {
          await (revealBtn.asElement() as any)?.click();
          await new Promise((r) => setTimeout(r, 500));
        }

        // 6. Meta Bar
        const metaBarText = await page.evaluate(() => {
          const el = document.querySelector(".font-mono.font-bold");
          return el ? el.textContent : null;
        });
        details.metaBarText = metaBarText;
        console.log(`  - Meta bar text: "${metaBarText}"`);

        const screenshotPath = path.join(artifactsDir, "test1_dictation_audio_51.png");
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  - Screenshot saved: ${screenshotPath}`);
      } catch (err: any) {
        passed = false;
        pageErrors.push(err.message);
        console.error(`  ❌ Error in Test 1:`, err.message);
      }

      reports.push({
        name: testName,
        url: targetUrl,
        passed: passed && pageErrors.length === 0,
        errors: pageErrors,
        consoleErrors,
        details,
      });
      await page.close();
    }

    // ==========================================
    // TEST 2: Dictation Video Studio
    // ==========================================
    {
      const testName = "Dictation Video Studio (vid_ted_bilingual_brain)";
      const targetUrl = `${BASE_URL}/study/dictation/video?id=vid_ted_bilingual_brain`;
      console.log(`\n▶ [TEST 2] Testing ${targetUrl}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err: any) => pageErrors.push(err?.message || String(err)));

      let passed = true;
      const details: any = {};

      try {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 35000 });
        const inputElement = await page.waitForSelector(
          "input[placeholder*='Điền câu'], input[placeholder*='nghe'], input[type='text']",
          { timeout: 15000 }
        );
        if (!inputElement) throw new Error("Cannot find dictation input field in video studio!");
        await new Promise((r) => setTimeout(r, 1000));

        // Video container / iframe check
        const hasVideoFrame = await page.evaluate(() => {
          return !!document.querySelector("iframe, [data-video-player], .aspect-video");
        });
        details.hasVideoFrame = hasVideoFrame;
        console.log(`  - Video Cinema Frame present: ${hasVideoFrame}`);

        // Title check
        const titleText = await page.evaluate(() => {
          const h = document.querySelector("h1, h2, .font-display");
          return h ? h.textContent?.trim() : document.title;
        });
        details.titleText = titleText;
        console.log(`  - Video Lesson Title: "${titleText}"`);

        const screenshotPath = path.join(artifactsDir, "test2_dictation_video_studio.png");
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  - Screenshot saved: ${screenshotPath}`);
      } catch (err: any) {
        passed = false;
        pageErrors.push(err.message);
        console.error(`  ❌ Error in Test 2:`, err.message);
      }

      reports.push({
        name: testName,
        url: targetUrl,
        passed: passed && pageErrors.length === 0,
        errors: pageErrors,
        consoleErrors,
        details,
      });
      await page.close();
    }

    // ==========================================
    // TEST 3: Dictation Video Hub Catalog
    // ==========================================
    {
      const testName = "Dictation Video Hub Catalog";
      const targetUrl = `${BASE_URL}/study/dictation/video`;
      console.log(`\n▶ [TEST 3] Testing ${targetUrl}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err: any) => pageErrors.push(err?.message || String(err)));

      let passed = true;
      const details: any = {};

      try {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 35000 });
        await page.waitForSelector("a[href*='/study/dictation/audio'], a[href*='/study/dictation/video']", {
          timeout: 15000,
        });
        await new Promise((r) => setTimeout(r, 2000));

        // Verify tabs
        const tabsText = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll("a[href*='/study/dictation/']"));
          return links.map((l) => l.textContent?.trim());
        });
        details.tabsText = tabsText;
        console.log(`  - StudyMediaHubTabs detected:`, tabsText);

        const screenshotPath = path.join(artifactsDir, "test3_dictation_video_hub.png");
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  - Screenshot saved: ${screenshotPath}`);
      } catch (err: any) {
        passed = false;
        pageErrors.push(err.message);
        console.error(`  ❌ Error in Test 3:`, err.message);
      }

      reports.push({
        name: testName,
        url: targetUrl,
        passed: passed && pageErrors.length === 0,
        errors: pageErrors,
        consoleErrors,
        details,
      });
      await page.close();
    }

    // ==========================================
    // TEST 4: Shadowing Audio Studio (id=1)
    // ==========================================
    {
      const testName = "Shadowing Audio Studio (id=1)";
      const targetUrl = `${BASE_URL}/study/shadowing/audio?id=1`;
      console.log(`\n▶ [TEST 4] Testing ${targetUrl}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err: any) => pageErrors.push(err?.message || String(err)));

      let passed = true;
      const details: any = {};

      try {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 35000 });
        // Wait for active shadowing workspace hydration
        await page.waitForSelector("#active-shadowing-workspace", { timeout: 25000 });
        await new Promise((r) => setTimeout(r, 2000));

        // Waveform card
        const waveformCard = await page.$("canvas, svg.lucide-play, [data-waveform='true']");
        details.waveformCard = !!waveformCard;
        console.log(`  - Waveform card present: ${!!waveformCard}`);

        // Mic recording button
        const hasMic = await page.evaluate(() => {
          return !!document.querySelector("svg.lucide-mic");
        });
        details.hasMic = hasMic;
        console.log(`  - Recording Mic button present: ${hasMic}`);

        // Meta counter
        const metaCounter = await page.evaluate(() => {
          const el = document.querySelector(".font-mono.font-bold");
          return el ? el.textContent : null;
        });
        details.metaCounter = metaCounter;
        console.log(`  - Meta counter: "${metaCounter}"`);

        const screenshotPath = path.join(artifactsDir, "test4_shadowing_audio_studio.png");
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  - Screenshot saved: ${screenshotPath}`);
      } catch (err: any) {
        passed = false;
        pageErrors.push(err.message);
        console.error(`  ❌ Error in Test 4:`, err.message);
      }

      reports.push({
        name: testName,
        url: targetUrl,
        passed: passed && pageErrors.length === 0,
        errors: pageErrors,
        consoleErrors,
        details,
      });
      await page.close();
    }

    // ==========================================
    // TEST 5: Shadowing Video Studio
    // ==========================================
    {
      const testName = "Shadowing Video Studio (vid_ted_bilingual_brain)";
      const targetUrl = `${BASE_URL}/study/shadowing/video?id=vid_ted_bilingual_brain`;
      console.log(`\n▶ [TEST 5] Testing ${targetUrl}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err: any) => pageErrors.push(err?.message || String(err)));

      let passed = true;
      const details: any = {};

      try {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 35000 });
        await page.waitForSelector("#active-shadowing-workspace", { timeout: 25000 });
        await new Promise((r) => setTimeout(r, 2000));

        const hasVideoFrame = await page.evaluate(() => {
          return !!document.querySelector("iframe, [data-video-player], .aspect-video");
        });
        details.hasVideoFrame = hasVideoFrame;
        console.log(`  - Video Cinema Frame present: ${hasVideoFrame}`);

        const hasMic = await page.evaluate(() => {
          return !!document.querySelector("svg.lucide-mic");
        });
        details.hasMic = hasMic;
        console.log(`  - Recording Mic button present: ${hasMic}`);

        const screenshotPath = path.join(artifactsDir, "test5_shadowing_video_studio.png");
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  - Screenshot saved: ${screenshotPath}`);
      } catch (err: any) {
        passed = false;
        pageErrors.push(err.message);
        console.error(`  ❌ Error in Test 5:`, err.message);
      }

      reports.push({
        name: testName,
        url: targetUrl,
        passed: passed && pageErrors.length === 0,
        errors: pageErrors,
        consoleErrors,
        details,
      });
      await page.close();
    }

    // ==========================================
    // TEST 6: Shadowing Video Hub Catalog
    // ==========================================
    {
      const testName = "Shadowing Video Hub Catalog";
      const targetUrl = `${BASE_URL}/study/shadowing/video`;
      console.log(`\n▶ [TEST 6] Testing ${targetUrl}...`);

      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });

      const consoleErrors: string[] = [];
      const pageErrors: string[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err: any) => pageErrors.push(err?.message || String(err)));

      let passed = true;
      const details: any = {};

      try {
        await page.goto(targetUrl, { waitUntil: "domcontentloaded", timeout: 35000 });
        await page.waitForSelector("a[href*='/study/shadowing/audio'], a[href*='/study/shadowing/video']", {
          timeout: 15000,
        });
        await new Promise((r) => setTimeout(r, 2000));

        const tabsText = await page.evaluate(() => {
          const links = Array.from(document.querySelectorAll("a[href*='/study/shadowing/']"));
          return links.map((l) => l.textContent?.trim());
        });
        details.tabsText = tabsText;
        console.log(`  - StudyMediaHubTabs detected:`, tabsText);

        const screenshotPath = path.join(artifactsDir, "test6_shadowing_video_hub.png");
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`  - Screenshot saved: ${screenshotPath}`);
      } catch (err: any) {
        passed = false;
        pageErrors.push(err.message);
        console.error(`  ❌ Error in Test 6:`, err.message);
      }

      reports.push({
        name: testName,
        url: targetUrl,
        passed: passed && pageErrors.length === 0,
        errors: pageErrors,
        consoleErrors,
        details,
      });
      await page.close();
    }
  } finally {
    await browser.close();
  }

  console.log("\n==========================================");
  console.log("📊 CHROME 6-SUITE E2E RESULTS");
  console.log("==========================================");
  let allPassed = true;
  for (const rep of reports) {
    const statusIcon = rep.passed ? "✅ PASS" : "❌ FAIL";
    console.log(`${statusIcon} - ${rep.name} (${rep.url})`);
    if (rep.errors.length > 0) {
      console.log(`     Errors:`, rep.errors);
      allPassed = false;
    }
    if (rep.consoleErrors.length > 0) {
      console.log(`     Console Errors:`, rep.consoleErrors);
    }
  }

  if (!allPassed) {
    process.exit(1);
  } else {
    console.log("\n🎉 ALL 6 CHROME E2E SUITES PASSED SUCCESSFULLY!");
    process.exit(0);
  }
}

runChromeE2ETest().catch((err) => {
  console.error("FATAL ERROR in Chrome test:", err);
  process.exit(1);
});
