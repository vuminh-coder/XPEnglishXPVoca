import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/study/ipa";

async function runIpaWalkthrough() {
  console.log("================================================================================");
  console.log("🗣️ STARTING FULL CHROMIUM WALKTHROUGH FOR /study/ipa");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  console.log("1. Navigating to /study/ipa...");
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("body");
  console.log("  Waiting for IPA Matrix Board to hydrate...");
  await new Promise((r) => setTimeout(r, 4000));

  const shot1 = path.join(ARTIFACTS_DIR, "ipa_01_matrix_board.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 (IPA Matrix Board): ${shot1}`);

  // --- STAGE 2: SWITCH TO MINIMAL PAIRS TAB ---
  console.log("2. Navigating to Minimal Pairs (Cặp âm dễ nhầm)...");
  await page.goto("http://localhost:3000/study/ipa/minimal-pairs", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("body");
  await new Promise((r) => setTimeout(r, 3500));

  const shot2 = path.join(ARTIFACTS_DIR, "ipa_02_minimal_pairs.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 (IPA Minimal Pairs): ${shot2}`);

  // --- STAGE 3: NAVIGATE TO IPA PRACTICE LAB ---
  console.log("3. Navigating to IPA Practice Lab...");
  await page.goto("http://localhost:3000/study/ipa/practice", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("body");
  await new Promise((r) => setTimeout(r, 3500));

  const shot3 = path.join(ARTIFACTS_DIR, "ipa_03_practice_lab.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 (IPA Practice Lab): ${shot3}`);

  await browser.close();
}

runIpaWalkthrough().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
