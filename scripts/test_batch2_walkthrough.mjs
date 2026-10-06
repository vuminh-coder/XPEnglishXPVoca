import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function runBatch2Walkthrough() {
  console.log("================================================================================");
  console.log("🚀 STARTING EXTENDED CHROMIUM WALKTHROUGH FOR BATCH 2 PAGES");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  // Helper safe navigation
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

  // 1. /study/listening
  console.log("1. Navigating to /study/listening...");
  if (await safeGoto(`${BASE_URL}/study/listening`)) {
    const shot1 = path.join(ARTIFACTS_DIR, "listening_01_listing.png");
    await page.screenshot({ path: shot1 });
    console.log(`  📸 Screenshot 1 (Listening Listing): ${shot1}`);

    console.log("  Entering first listening lesson studio...");
    await page.evaluate(() => {
      const card = document.querySelector("a[href*='/study/listening?id='], button[class*='lesson'], div[class*='cursor-pointer']");
      if (card) card.click();
    });
    await new Promise((r) => setTimeout(r, 3000));
    const shot2 = path.join(ARTIFACTS_DIR, "listening_02_studio.png");
    await page.screenshot({ path: shot2 });
    console.log(`  📸 Screenshot 2 (Listening Studio Workspace): ${shot2}`);
  }

  // 2. /study/shadowing
  console.log("\n2. Navigating to /study/shadowing...");
  if (await safeGoto(`${BASE_URL}/study/shadowing`)) {
    const shot3 = path.join(ARTIFACTS_DIR, "shadowing_01_listing.png");
    await page.screenshot({ path: shot3 });
    console.log(`  📸 Screenshot 3 (Shadowing Listing): ${shot3}`);

    console.log("  Entering first shadowing lesson studio...");
    await page.evaluate(() => {
      const card = document.querySelector("a[href*='/study/shadowing?id='], button[class*='lesson'], div[class*='cursor-pointer']");
      if (card) card.click();
    });
    await new Promise((r) => setTimeout(r, 3000));
    const shot4 = path.join(ARTIFACTS_DIR, "shadowing_02_studio.png");
    await page.screenshot({ path: shot4 });
    console.log(`  📸 Screenshot 4 (Shadowing Studio Workspace): ${shot4}`);
  }

  // 3. /study/grammar
  console.log("\n3. Navigating to /study/grammar...");
  if (await safeGoto(`${BASE_URL}/study/grammar`)) {
    const shot5 = path.join(ARTIFACTS_DIR, "grammar_01_catalog.png");
    await page.screenshot({ path: shot5 });
    console.log(`  📸 Screenshot 5 (Grammar Catalog): ${shot5}`);
  }

  // 4. /study/games
  console.log("\n4. Navigating to /study/games...");
  if (await safeGoto(`${BASE_URL}/study/games`)) {
    const shot6 = path.join(ARTIFACTS_DIR, "games_01_catalog.png");
    await page.screenshot({ path: shot6 });
    console.log(`  📸 Screenshot 6 (Games Catalog Grid): ${shot6}`);

    console.log("  Launching 'Word Scramble' game...");
    await page.evaluate(() => {
      const scrambleCard = Array.from(document.querySelectorAll("button, div[class*='cursor-pointer']")).find((el) =>
        el.textContent.includes("Word Scramble") || el.textContent.includes("Xếp Từ")
      );
      if (scrambleCard) scrambleCard.click();
    });
    await new Promise((r) => setTimeout(r, 2500));
    const shot7 = path.join(ARTIFACTS_DIR, "games_02_interactive.png");
    await page.screenshot({ path: shot7 });
    console.log(`  📸 Screenshot 7 (Game Interactive Screen): ${shot7}`);
  }

  // 5. /study/pvp
  console.log("\n5. Navigating to /study/pvp...");
  if (await safeGoto(`${BASE_URL}/study/pvp`)) {
    const shot8 = path.join(ARTIFACTS_DIR, "pvp_01_lobby.png");
    await page.screenshot({ path: shot8 });
    console.log(`  📸 Screenshot 8 (PvP Lobby): ${shot8}`);
  }

  // 6. /review
  console.log("\n6. Navigating to /review...");
  if (await safeGoto(`${BASE_URL}/review`)) {
    const shot9 = path.join(ARTIFACTS_DIR, "review_01_sm2_deck.png");
    await page.screenshot({ path: shot9 });
    console.log(`  📸 Screenshot 9 (Review SM-2 Deck): ${shot9}`);
  }

  // 7. /myvocab
  console.log("\n7. Navigating to /myvocab...");
  if (await safeGoto(`${BASE_URL}/myvocab`)) {
    const shot10 = path.join(ARTIFACTS_DIR, "myvocab_01_notebook.png");
    await page.screenshot({ path: shot10 });
    console.log(`  📸 Screenshot 10 (Personal Vocabulary Notebook): ${shot10}`);
  }

  console.log("\n================================================================================");
  console.log("✅ BATCH 2 CHROMIUM WALKTHROUGH COMPLETED SUCCESSFULLY");
  console.log("================================================================================");

  await browser.close();
}

runBatch2Walkthrough().catch((err) => {
  console.error("Batch 2 test failed:", err);
  process.exit(1);
});
