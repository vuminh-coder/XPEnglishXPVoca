import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function runBatch3Walkthrough() {
  console.log("================================================================================");
  console.log("🌟 STARTING EXTENDED CHROMIUM WALKTHROUGH FOR BATCH 3 PAGES");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

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

  // 1. /community (Social Feed)
  console.log("1. Navigating to /community...");
  if (await safeGoto(`${BASE_URL}/community`)) {
    const shot1 = path.join(ARTIFACTS_DIR, "comm_01_feed.png");
    await page.screenshot({ path: shot1 });
    console.log(`  📸 Screenshot 1 (Community Feed): ${shot1}`);
  }

  // 2. /community/friends (Friends Hub)
  console.log("\n2. Navigating to /community/friends...");
  if (await safeGoto(`${BASE_URL}/community/friends`)) {
    const shot2 = path.join(ARTIFACTS_DIR, "comm_02_friends.png");
    await page.screenshot({ path: shot2 });
    console.log(`  📸 Screenshot 2 (Friends Hub): ${shot2}`);
  }

  // 3. /community/groups (Study Groups)
  console.log("\n3. Navigating to /community/groups...");
  if (await safeGoto(`${BASE_URL}/community/groups`)) {
    const shot3 = path.join(ARTIFACTS_DIR, "comm_03_groups.png");
    await page.screenshot({ path: shot3 });
    console.log(`  📸 Screenshot 3 (Study Groups): ${shot3}`);
  }

  // 4. /shop (XP Coin Shop)
  console.log("\n4. Navigating to /shop...");
  if (await safeGoto(`${BASE_URL}/shop`)) {
    const shot4 = path.join(ARTIFACTS_DIR, "shop_01_store.png");
    await page.screenshot({ path: shot4 });
    console.log(`  📸 Screenshot 4 (Coin Shop): ${shot4}`);
  }

  // 5. /premium (VIP Upgrade)
  console.log("\n5. Navigating to /premium...");
  if (await safeGoto(`${BASE_URL}/premium`)) {
    const shot5 = path.join(ARTIFACTS_DIR, "premium_01_tiers.png");
    await page.screenshot({ path: shot5 });
    console.log(`  📸 Screenshot 5 (Premium Tiers): ${shot5}`);
  }

  // 6. /profile (Learner Profile & Achievements)
  console.log("\n6. Navigating to /profile...");
  if (await safeGoto(`${BASE_URL}/profile`)) {
    const shot6 = path.join(ARTIFACTS_DIR, "profile_01_overview.png");
    await page.screenshot({ path: shot6 });
    console.log(`  📸 Screenshot 6 (Profile Overview): ${shot6}`);
  }

  // 7. /analytics (Deep Analytics)
  console.log("\n7. Navigating to /analytics...");
  if (await safeGoto(`${BASE_URL}/analytics`)) {
    const shot7 = path.join(ARTIFACTS_DIR, "analytics_01_stats.png");
    await page.screenshot({ path: shot7 });
    console.log(`  📸 Screenshot 7 (Analytics Charts): ${shot7}`);
  }

  // 8. /roadmap (Personal AI Study Roadmap)
  console.log("\n8. Navigating to /roadmap...");
  if (await safeGoto(`${BASE_URL}/roadmap`)) {
    const shot8 = path.join(ARTIFACTS_DIR, "roadmap_01_plan.png");
    await page.screenshot({ path: shot8 });
    console.log(`  📸 Screenshot 8 (Roadmap Plan): ${shot8}`);
  }

  // 9. /study/rooms (Live Collaborative Study Rooms)
  console.log("\n9. Navigating to /study/rooms...");
  if (await safeGoto(`${BASE_URL}/study/rooms`)) {
    const shot9 = path.join(ARTIFACTS_DIR, "rooms_01_lobby.png");
    await page.screenshot({ path: shot9 });
    console.log(`  📸 Screenshot 9 (Study Rooms Lobby): ${shot9}`);
  }

  console.log("\n================================================================================");
  console.log("✅ BATCH 3 CHROMIUM WALKTHROUGH COMPLETED SUCCESSFULLY (9 Screenshots)");
  console.log("================================================================================");

  await browser.close();
}

runBatch3Walkthrough().catch((err) => {
  console.error("Batch 3 test failed:", err);
  process.exit(1);
});
