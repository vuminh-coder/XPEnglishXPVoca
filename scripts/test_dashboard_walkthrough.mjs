import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/dashboard";

async function runDashboardWalkthrough() {
  console.log("================================================================================");
  console.log("📊 STARTING FULL CHROMIUM WALKTHROUGH FOR /dashboard");
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
    if (url.includes("/api/")) {
      apiCalls.push({ url, method: req.method() });
    }
  });

  console.log("1. Navigating to /dashboard...");
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("body");
  console.log("  Waiting for dashboard to hydrate...");
  await new Promise((r) => setTimeout(r, 6000));

  const shot1 = path.join(ARTIFACTS_DIR, "dashboard_01_overview.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 (Dashboard Overview): ${shot1}`);

  console.log("2. Scrolling to inspect Learning Roadmap & Activity widgets...");
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot2 = path.join(ARTIFACTS_DIR, "dashboard_02_roadmap_widgets.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 (Roadmap & Widgets): ${shot2}`);

  console.log("3. Scrolling to bottom mini-leaderboard and recommendations...");
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot3 = path.join(ARTIFACTS_DIR, "dashboard_03_bottom_sections.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 (Bottom Sections): ${shot3}`);

  await browser.close();
}

runDashboardWalkthrough().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
