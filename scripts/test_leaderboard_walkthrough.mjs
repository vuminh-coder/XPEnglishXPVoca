import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/community/leaderboard";

async function runLeaderboardWalkthrough() {
  console.log("================================================================================");
  console.log("🏆 STARTING FULL CHROMIUM WALKTHROUGH FOR /community/leaderboard");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  const apiCalls = [];
  page.on("request", (req) => {
    const url = req.url();
    if (url.includes("/api/leaderboard") || url.includes("/api/season")) {
      apiCalls.push({ url, method: req.method() });
    }
  });

  console.log("1. Navigating to /community/leaderboard...");
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("body");
  console.log("  Waiting for leaderboard and season data to hydrate...");
  await new Promise((r) => setTimeout(r, 6000));

  const shot1 = path.join(ARTIFACTS_DIR, "leaderboard_01_xp_podium.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 (Leaderboard XP Podium): ${shot1}`);

  // --- STAGE 2: SWITCH CRITERION TO "THỜI GIAN HỌC" ---
  console.log("2. Switching Criterion to 'Thời gian học' (Minutes)...");
  await page.evaluate(() => {
    const timeBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Thời gian học") || b.textContent.includes("Phút")
    );
    if (timeBtn) timeBtn.click();
  });
  console.log("  Waiting for 'Thời gian học' podium to finish loading...");
  await new Promise((r) => setTimeout(r, 6000));

  const shot2 = path.join(ARTIFACTS_DIR, "leaderboard_02_time_criterion.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 (Leaderboard Time Criterion): ${shot2}`);

  // --- STAGE 3: SCROLL & FOCUS ON SEASON RANK CARD ---
  console.log("3. Scrolling to inspect Season Rank Card & Rewards...");
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  });
  await new Promise((r) => setTimeout(r, 2000));

  const shot3 = path.join(ARTIFACTS_DIR, "leaderboard_03_season_rank_card.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 (Season Rank Card): ${shot3}`);

  // Check state and API calls
  const pageInspection = await page.evaluate(() => {
    return {
      title: document.title,
      hasPodium: !!document.querySelector("div[class*='Podium']"),
      hasSeasonCard: !!document.body.innerText.includes("Hạng Mùa") || !!document.body.innerText.includes("Đồng") || !!document.body.innerText.includes("Bạc") || !!document.body.innerText.includes("Vàng"),
    };
  });

  console.log("\n================================================================================");
  console.log("📊 SUMMARY OF /community/leaderboard TEST RESULTS:");
  console.log(`- API Calls Tracked: ${JSON.stringify(apiCalls)}`);
  console.log(`- Inspection Data: ${JSON.stringify(pageInspection)}`);
  console.log("================================================================================");

  await browser.close();
}

runLeaderboardWalkthrough().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
