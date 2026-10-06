import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/vocabulary";

async function runVocabularyWalkthrough() {
  console.log("================================================================================");
  console.log("📚 STARTING FULL CHROMIUM WALKTHROUGH FOR /vocabulary");
  console.log("================================================================================\n");

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  console.log("1. Navigating to /vocabulary...");
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("body");
  console.log("  Waiting for vocabulary themes to hydrate...");
  await new Promise((r) => setTimeout(r, 4000));

  const shot1 = path.join(ARTIFACTS_DIR, "vocab_01_themes_basic.png");
  await page.screenshot({ path: shot1 });
  console.log(`  📸 Screenshot 1 (Vocab Basic Themes): ${shot1}`);

  // --- STAGE 2: SWITCH TO ADVANCED THEMES ---
  console.log("2. Switching to 'Nâng cao (B1-C2)' tab...");
  await page.evaluate(() => {
    const advBtn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Nâng cao") || b.textContent.includes("B1-C2")
    );
    if (advBtn) advBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot2 = path.join(ARTIFACTS_DIR, "vocab_02_themes_advanced.png");
  await page.screenshot({ path: shot2 });
  console.log(`  📸 Screenshot 2 (Vocab Advanced Themes): ${shot2}`);

  // --- STAGE 3: SEARCH FOR A TOPIC ---
  console.log("3. Searching for 'Business' in search bar...");
  const searchInput = await page.$("input[type='text'], input[placeholder*='tìm']");
  if (searchInput) {
    await searchInput.type("Business");
  }
  await new Promise((r) => setTimeout(r, 1500));

  const shot3 = path.join(ARTIFACTS_DIR, "vocab_03_search_filter.png");
  await page.screenshot({ path: shot3 });
  console.log(`  📸 Screenshot 3 (Search Filter): ${shot3}`);

  await browser.close();
}

runVocabularyWalkthrough().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
