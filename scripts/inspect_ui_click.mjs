import puppeteer from "puppeteer-core";
import path from "node:path";

const ARTIFACTS_DIR = "C:\\Users\\VU VAN MINH\\.gemini\\antigravity\\brain\\b6337096-43ba-46f5-87d9-4e47a4778102";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000/myvideo";

async function inspectUiClick() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--window-size=1440,900"],
    defaultViewport: { width: 1440, height: 900 },
  });

  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log(`[Browser Console ${msg.type()}]:`, msg.text());
  });

  page.on("pageerror", (err) => {
    console.error("[Browser Page Error]:", err.message);
  });

  page.on("response", async (res) => {
    if (res.url().includes("/api/youtube/study-set")) {
      console.log(`[Network Response] /api/youtube/study-set: ${res.status()}`);
      try {
        const json = await res.json();
        console.log(`[Response Data] Flashcards: ${json.flashcards?.length}, Quizzes: ${json.quizzes?.length}`);
      } catch (e) {
        console.log("[Response Data] not json");
      }
    }
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle0", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 2000));

  // Click 3rd tab button
  console.log("Switching to tab 3 (AI Thẻ & Quiz)...");
  await page.evaluate(() => {
    const btns = document.querySelectorAll("div.grid.grid-cols-4 button");
    if (btns.length >= 3) btns[2].click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Click the Generate button
  console.log("Clicking 'Tạo Bộ Thẻ & Bài Tập AI Ngay'...");
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll("button")).find((b) =>
      b.textContent.includes("Tạo Bộ Thẻ & Bài Tập AI Ngay")
    );
    if (btn) btn.click();
  });

  // Wait 25s
  console.log("Waiting 25s for completion...");
  await new Promise((r) => setTimeout(r, 25000));

  const shot = path.join(ARTIFACTS_DIR, "inspect_ai_generation_result.png");
  await page.screenshot({ path: shot });
  console.log("Screenshot saved:", shot);

  await browser.close();
}

inspectUiClick().catch(console.error);
